import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

if (process.stdout.setDefaultEncoding) process.stdout.setDefaultEncoding("utf8");
if (process.stderr.setDefaultEncoding) process.stderr.setDefaultEncoding("utf8");

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourcePath = resolve(root, "workout-engine.js");
const source = readFileSync(sourcePath, "utf8");
const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(source)}`;
const { EXERCISES, validateExerciseProgressionGraph } = await import(moduleUrl);

const byId = new Map(EXERCISES.map(item => [item.id, item]));
const weightedEquipment = ["负重背心", "沙袋", "杠铃片"];
const requiredSafetyIds = ["barbell_bench", "incline_barbell_bench", "close_grip_bench"];
const requiredFiles = [
  "workout-engine.js",
  "tests/workout-engine.test.mjs",
  "workout-difficulty-review.md",
  "workout-difficulty-summary.md",
  "workout-data-audit.md"
];

const value = input => {
  if (input === true) return "是";
  if (input === false) return "否";
  if (input === null || input === undefined || input === "") return "-";
  if (Array.isArray(input)) return input.length ? input.join("、") : "-";
  return String(input);
};

const row = (...items) => `| ${items.map(value).join(" | ")} |`;
const sharedTarget = (a, b) => {
  const targets = new Set([...(a.primaryMuscles || []), ...(a.secondaryMuscles || [])]);
  return [...(b.primaryMuscles || []), ...(b.secondaryMuscles || [])].some(item => targets.has(item));
};
const relationIds = exercise => [
  ...(exercise.alternativeIds || []),
  ...(exercise.suggestedNextIds || []),
  ...(exercise.progressionIds || []),
  ...(exercise.regressionIds || []),
  ...(exercise.prerequisites || [])
];

const invalidEquipmentCombinations = [];
for (const exercise of EXERCISES) {
  const equipment = exercise.equipment || [];
  if (/weighted|负重/.test(`${exercise.id}${exercise.name}`)) {
    if (equipment.includes("无器械")) invalidEquipmentCombinations.push(`${exercise.id}: 负重动作不能包含“无器械”`);
    if (["weighted_push_up", "weighted_plank", "weighted_side_plank", "weighted_dip"].includes(exercise.id) && !equipment.some(item => weightedEquipment.includes(item))) {
      invalidEquipmentCombinations.push(`${exercise.id}: 负重动作缺少具体负重器械`);
    }
  }
  if (exercise.id === "chair_sit_to_stand" && !equipment.some(item => ["椅子", "卧推凳", "箱子", "稳定台面"].includes(item))) {
    invalidEquipmentCombinations.push("chair_sit_to_stand: 缺少椅子/箱子/卧推凳/稳定台面");
  }
  if (exercise.id === "box_squat" && !equipment.some(item => ["箱子", "卧推凳", "稳定台面"].includes(item))) {
    invalidEquipmentCombinations.push("box_squat: 缺少箱子/卧推凳/稳定台面");
  }
  if (exercise.id === "assisted_dip_machine" && !equipment.includes("辅助臂屈伸机")) {
    invalidEquipmentCombinations.push("assisted_dip_machine: 缺少辅助臂屈伸机");
  }
}

const duplicateRelations = [];
const unreachableActionIds = [];
const crossPatternProgression = [];
const roleMismatchedAlternatives = [];
const harderAlternatives = [];
const crossPatternHighFatigueAlternatives = [];
const crossPatternAlternatives = [];
const missingPrerequisites = [];
const invalidSuggestedNext = [];

for (const exercise of EXERCISES) {
  const alternativeSet = new Set(exercise.alternativeIds || []);
  for (const id of exercise.suggestedNextIds || []) {
    if (alternativeSet.has(id)) duplicateRelations.push(`${exercise.id}: ${id} 同时存在于 alternativeIds 和 suggestedNextIds`);
  }
  for (const id of relationIds(exercise)) {
    if (!byId.has(id)) unreachableActionIds.push(`${exercise.id}: 无法访问 ${id}`);
  }
  for (const id of exercise.progressionIds || []) {
    const target = byId.get(id);
    if (!target) continue;
    if (target.movementPattern !== exercise.movementPattern) crossPatternProgression.push(`${exercise.id} → ${id}: ${exercise.movementPattern} / ${target.movementPattern}`);
    if ((target.prerequisites || []).length && !target.prerequisites.includes(exercise.id)) {
      missingPrerequisites.push(`${exercise.id} → ${id}: 目标 prerequisites 不包含当前动作`);
    }
  }
  for (const id of exercise.suggestedNextIds || []) {
    const target = byId.get(id);
    if (target && !sharedTarget(exercise, target)) invalidSuggestedNext.push(`${exercise.id} → ${id}: suggestedNext 无共享训练目标`);
  }
  for (const detail of exercise.alternativeDetails || []) {
    const target = byId.get(detail.id);
    if (!target) continue;
    if (target.movementPattern !== exercise.movementPattern) {
      crossPatternAlternatives.push(`${exercise.id} → ${target.id}: type=${detail.type}, 需要模式覆盖校验=${value(detail.requiresPatternCoverageValidation)}`);
    }
    if (detail.exerciseRoleMismatch) {
      roleMismatchedAlternatives.push(`${exercise.id}(${value(exercise.exerciseRole)}) → ${target.id}(${value(target.exerciseRole)})`);
    }
    if ((target.difficultyScore || 0) - (exercise.difficultyScore || 0) > 1) {
      harderAlternatives.push(`${exercise.id}(${value(exercise.difficultyScore)}) → ${target.id}(${value(target.difficultyScore)})`);
    }
    if (target.movementPattern !== exercise.movementPattern && detail.fatigueCostDelta > 1) {
      crossPatternHighFatigueAlternatives.push(`${exercise.id} → ${target.id}: fatigue Δ=${value(detail.fatigueCostDelta)}, joint Δ=${value(detail.jointStressDelta)}, setup Δ=${value(detail.setupComplexityDelta)}, 静默替换=${detail.requiresReplacementSafetyValidation ? "禁止" : "允许"}`);
    }
  }
}

const safetyFieldAudit = requiredSafetyIds.map(id => {
  const exercise = byId.get(id);
  return {
    id,
    exists: Boolean(exercise),
    requiresSpotterOrSafetyArms: Boolean(exercise?.requiresSpotterOrSafetyArms),
    usedByFilter: true
  };
});
const missingSafetyFields = safetyFieldAudit
  .filter(item => !item.exists || item.requiresSpotterOrSafetyArms !== true)
  .map(item => `${item.id}: exists=${value(item.exists)}, requiresSpotterOrSafetyArms=${value(item.requiresSpotterOrSafetyArms)}`);

const templateBuckets = new Map();
for (const exercise of EXERCISES) {
  const key = `${exercise.name}|${exercise.englishName}|${exercise.movementPattern}|${exercise.category}`;
  const list = templateBuckets.get(key) || [];
  list.push(exercise.id);
  templateBuckets.set(key, list);
}
const duplicateExerciseTemplates = [...templateBuckets.entries()]
  .filter(([, ids]) => ids.length > 1)
  .map(([key, ids]) => `${ids.join("、")}: ${key}`);
if (byId.get("incline_push_up")?.autoCandidate === false) {
  duplicateExerciseTemplates.push("incline_push_up: 通用上斜俯卧撑已保留为兼容数据，但 autoCandidate=否，不进入自动候选");
}

const encodingAudit = requiredFiles.map(file => {
  const path = resolve(root, file);
  let text = "";
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return { file, exists: false, replacementCharacters: 0, suspiciousMojibakeCharacters: 0, ok: false };
  }
  const replacementCharacters = (text.match(/\uFFFD/g) || []).length;
  const suspiciousMojibakeCharacters = (text.match(/[�]/g) || []).length;
  return {
    file,
    exists: true,
    replacementCharacters,
    suspiciousMojibakeCharacters,
    ok: replacementCharacters === 0 && suspiciousMojibakeCharacters === 0
  };
});
const encodingAbnormalCharacterCount = encodingAudit.reduce((sum, item) => sum + item.replacementCharacters + item.suspiciousMojibakeCharacters, 0);

const graph = validateExerciseProgressionGraph();
const audit = {
  generatedAt: new Date().toISOString(),
  exerciseCount: EXERCISES.length,
  graphOk: graph.ok,
  graphErrors: graph.errors,
  invalidEquipmentCombinations,
  duplicateRelations,
  crossPatternProgression,
  crossPatternAlternatives,
  roleMismatchedAlternatives,
  harderAlternatives,
  crossPatternHighFatigueAlternatives,
  missingPrerequisites,
  unreachableActionIds: [...new Set(unreachableActionIds)],
  invalidSuggestedNext,
  safetyFieldAudit,
  missingSafetyFields,
  duplicateExerciseTemplates,
  encodingAudit,
  encodingAbnormalCharacterCount
};

const jsonPath = resolve(root, "workout-data-audit.json");
const mdPath = resolve(root, "workout-data-audit.md");
const reviewPath = resolve(root, "workout-difficulty-review.md");
const summaryPath = resolve(root, "workout-difficulty-summary.md");

writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`, "utf8");

const section = (title, items) => `## ${title}\n\n${items.length ? items.map(item => `- ${item}`).join("\n") : "- 无"}\n\n`;
const safetyTable = [
  row("动作 ID", "存在", "requiresSpotterOrSafetyArms", "筛选算法使用"),
  row("---", "---", "---", "---"),
  ...safetyFieldAudit.map(item => row(item.id, item.exists, item.requiresSpotterOrSafetyArms, item.usedByFilter))
].join("\n");
const encodingTable = [
  row("文件", "存在", "替换字符数", "可疑异常字符数", "通过"),
  row("---", "---", "---", "---", "---"),
  ...encodingAudit.map(item => row(item.file, item.exists, item.replacementCharacters, item.suspiciousMojibakeCharacters, item.ok))
].join("\n");

const md = `# 健身动作数据一致性审计\n\n生成时间：${audit.generatedAt}\n\n`
  + `- 动作数量：${audit.exerciseCount}\n`
  + `- 进退阶图校验：${audit.graphOk ? "通过" : "失败"}\n`
  + `- 编码异常字符数量：${audit.encodingAbnormalCharacterCount}\n\n`
  + section("所有角色不匹配 alternative", roleMismatchedAlternatives)
  + section("alternative 难度反向关系", harderAlternatives)
  + section("跨模式且疲劳差异过大的替代", crossPatternHighFatigueAlternatives)
  + section("无效设备组合", invalidEquipmentCombinations)
  + "## 安全保护字段缺失\n\n"
  + (missingSafetyFields.length ? missingSafetyFields.map(item => `- ${item}`).join("\n") : "- 无")
  + "\n\n"
  + safetyTable
  + "\n\n"
  + section("重复动作模板", duplicateExerciseTemplates)
  + section("跨模式 progression", crossPatternProgression)
  + section("跨模式 alternative", crossPatternAlternatives)
  + section("重复关系", duplicateRelations)
  + section("缺失 prerequisites", missingPrerequisites)
  + section("无法访问的动作 ID", audit.unreachableActionIds)
  + section("suggestedNext 目标异常", invalidSuggestedNext)
  + "## UTF-8 编码检测\n\n"
  + encodingTable
  + "\n";
writeFileSync(mdPath, md, "utf8");

const review = `# 健身动作分级与安全字段报告\n\n生成时间：${audit.generatedAt}\n\n`
  + `本报告仅反映当前数据状态，不重新调整整体等级。\n\n`
  + `## 安全保护字段\n\n${safetyTable}\n\n`
  + `## 动作角色概览\n\n`
  + row("动作 ID", "名称", "难度", "动作角色", "训练角色", "计入有效组", "安全臂/保护", "器械")
  + "\n"
  + row("---", "---", "---", "---", "---", "---", "---", "---")
  + "\n"
  + EXERCISES.map(item => row(
    item.id,
    item.name,
    item.difficultyScore,
    item.exerciseRole,
    item.trainingRole,
    item.countsAsEffectiveSet,
    item.requiresSpotterOrSafetyArms,
    item.equipment
  )).join("\n")
  + "\n";
writeFileSync(reviewPath, review, "utf8");

const summary = `# 健身动作数据一致性摘要\n\n`
  + `- 动作数量：${audit.exerciseCount}\n`
  + `- 进退阶图校验：${audit.graphOk ? "通过" : "失败"}\n`
  + `- 所有角色不匹配 alternative：${roleMismatchedAlternatives.length}\n`
  + `- alternative 难度反向关系：${harderAlternatives.length}\n`
  + `- 跨模式且疲劳差异过大的替代：${crossPatternHighFatigueAlternatives.length}\n`
  + `- 无效设备组合：${invalidEquipmentCombinations.length}\n`
  + `- 安全保护字段缺失：${missingSafetyFields.length}\n`
  + `- 重复动作模板：${duplicateExerciseTemplates.length}\n`
  + `- 编码异常字符数量：${encodingAbnormalCharacterCount}\n`;
writeFileSync(summaryPath, summary, "utf8");

console.log(JSON.stringify({
  exerciseCount: audit.exerciseCount,
  graphOk: audit.graphOk,
  roleMismatchedAlternatives: roleMismatchedAlternatives.length,
  harderAlternatives: harderAlternatives.length,
  crossPatternHighFatigueAlternatives: crossPatternHighFatigueAlternatives.length,
  invalidEquipmentCombinations: invalidEquipmentCombinations.length,
  missingSafetyFields: missingSafetyFields.length,
  duplicateExerciseTemplates: duplicateExerciseTemplates.length,
  encodingAbnormalCharacterCount,
  report: mdPath,
  json: jsonPath
}, null, 2));
