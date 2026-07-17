import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourcePath = resolve(root, "workout-engine.js");
const source = readFileSync(sourcePath, "utf8");
const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(source)}`;
const { EXERCISES, validateExerciseProgressionGraph } = await import(moduleUrl);

const byId = new Map(EXERCISES.map(item => [item.id, item]));
const relationIds = exercise => [
  ...(exercise.alternativeIds || []),
  ...(exercise.suggestedNextIds || []),
  ...(exercise.progressionIds || []),
  ...(exercise.regressionIds || []),
  ...(exercise.prerequisites || [])
];
const sharedTarget = (a, b) => {
  const aTargets = new Set([...(a.primaryMuscles || []), ...(a.secondaryMuscles || [])]);
  return [...(b.primaryMuscles || []), ...(b.secondaryMuscles || [])].some(item => aTargets.has(item));
};

const invalidEquipmentConditions = [];
for (const exercise of EXERCISES) {
  if (/weighted/.test(exercise.id) && (exercise.equipment || []).includes("无器械")) {
    invalidEquipmentConditions.push(`${exercise.id}: weighted action cannot use 无器械`);
  }
  if (exercise.id === "chair_sit_to_stand" && !(exercise.equipment || []).some(item => ["椅子", "卧推凳", "稳定台面"].includes(item))) {
    invalidEquipmentConditions.push("chair_sit_to_stand: missing chair/bench/stable_platform equivalent");
  }
  if (exercise.id === "box_squat" && !(exercise.equipment || []).some(item => ["箱子", "卧推凳", "稳定台面"].includes(item))) {
    invalidEquipmentConditions.push("box_squat: missing box/bench/stable_platform equivalent");
  }
}

const duplicateRelations = [];
const unreachableActionIds = [];
const crossPatternProgression = [];
const crossPatternAlternative = [];
const missingPrerequisites = [];
const invalidSuggestedNext = [];

for (const exercise of EXERCISES) {
  const alternativeSet = new Set(exercise.alternativeIds || []);
  for (const id of exercise.suggestedNextIds || []) {
    if (alternativeSet.has(id)) duplicateRelations.push(`${exercise.id}: ${id} appears in both alternativeIds and suggestedNextIds`);
  }
  for (const id of relationIds(exercise)) {
    if (!byId.has(id)) unreachableActionIds.push(`${exercise.id}: missing relation id ${id}`);
  }
  for (const id of exercise.progressionIds || []) {
    const target = byId.get(id);
    if (!target) continue;
    if (target.movementPattern !== exercise.movementPattern) crossPatternProgression.push(`${exercise.id} -> ${id}: ${exercise.movementPattern} / ${target.movementPattern}`);
    if ((target.prerequisites || []).length && !target.prerequisites.includes(exercise.id)) {
      missingPrerequisites.push(`${exercise.id} -> ${id}: target prerequisites do not include current exercise`);
    }
  }
  for (const id of exercise.alternativeIds || []) {
    const target = byId.get(id);
    if (!target) continue;
    if (target.movementPattern !== exercise.movementPattern) {
      crossPatternAlternative.push(`${exercise.id} -> ${id}: ${exercise.movementPattern} / ${target.movementPattern}; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true`);
    }
  }
  for (const id of exercise.suggestedNextIds || []) {
    const target = byId.get(id);
    if (target && !sharedTarget(exercise, target)) invalidSuggestedNext.push(`${exercise.id} -> ${id}: no shared primary target`);
  }
}

const utf8Files = ["workout-engine.js", "tests/workout-engine.test.mjs", "workout-difficulty-review.md", "workout-difficulty-summary.md"];
const utf8Encoding = utf8Files.map(file => {
  const text = readFileSync(resolve(root, file), "utf8");
  const hasReplacementChar = text.includes("\uFFFD");
  const hasLikelyMojibake = /鏃|涓|鑲|鎷|鍝|绋|韫|櫒|姊/.test(text);
  return {
    file,
    utf8Readable: true,
    hasReplacementChar,
    hasLikelyMojibake,
    ok: !hasReplacementChar && !hasLikelyMojibake
  };
});

const graph = validateExerciseProgressionGraph();
const audit = {
  generatedAt: new Date().toISOString(),
  exerciseCount: EXERCISES.length,
  graphOk: graph.ok,
  graphErrors: graph.errors,
  invalidEquipmentConditions,
  duplicateRelations,
  crossPatternProgression,
  crossPatternAlternative,
  missingPrerequisites,
  unreachableActionIds: [...new Set(unreachableActionIds)],
  invalidSuggestedNext,
  utf8Encoding
};

const jsonPath = resolve(root, "workout-data-audit.json");
const mdPath = resolve(root, "workout-data-audit.md");
writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`, "utf8");

const section = (title, items) => `## ${title}\n\n${items.length ? items.map(item => `- ${item}`).join("\n") : "- 无"}\n\n`;
const md = `# 健身动作数据一致性审计\n\n生成时间：${audit.generatedAt}\n\n- 动作数量：${audit.exerciseCount}\n- 进退阶图谱：${audit.graphOk ? "通过" : "失败"}\n\n`
  + section("无效器械条件", invalidEquipmentConditions)
  + section("重复关系", duplicateRelations)
  + section("跨模式 progression", crossPatternProgression)
  + section("跨模式 alternative", crossPatternAlternative)
  + section("缺失 prerequisites", missingPrerequisites)
  + section("无法访问的动作 ID", audit.unreachableActionIds)
  + section("suggestedNext 目标异常", invalidSuggestedNext)
  + "## UTF-8 编码检测结果\n\n"
  + utf8Encoding.map(item => `- ${item.file}: ${item.ok ? "通过" : `异常 replacement=${item.hasReplacementChar}, mojibake=${item.hasLikelyMojibake}`}`).join("\n")
  + "\n";
writeFileSync(mdPath, md, "utf8");

console.log(JSON.stringify({
  exerciseCount: audit.exerciseCount,
  graphOk: audit.graphOk,
  invalidEquipmentConditions: invalidEquipmentConditions.length,
  duplicateRelations: duplicateRelations.length,
  crossPatternProgression: crossPatternProgression.length,
  crossPatternAlternative: crossPatternAlternative.length,
  missingPrerequisites: missingPrerequisites.length,
  unreachableActionIds: audit.unreachableActionIds.length,
  utf8Ok: utf8Encoding.every(item => item.ok),
  report: mdPath,
  json: jsonPath
}, null, 2));
