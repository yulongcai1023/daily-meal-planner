import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

if (process.stdout.setDefaultEncoding) process.stdout.setDefaultEncoding("utf8");
if (process.stderr.setDefaultEncoding) process.stderr.setDefaultEncoding("utf8");

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const source = readFileSync(resolve(root, "workout-engine.js"), "utf8");
const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(source)}`;
const { EXERCISES, resolveExerciseTrackingMode, validateExerciseProgressionGraph, validateExerciseLibrary } = await import(moduleUrl);

const byId = new Map(EXERCISES.map(item => [item.id, item]));
const knownEquipmentIds = new Set([
  "bodyweight", "yoga_mat", "resistance_band", "band_anchor", "adjustable_dumbbells", "fixed_dumbbells", "kettlebell",
  "barbell", "squat_rack", "smith_machine", "bench", "adjustable_bench", "cable_machine", "lat_pulldown_machine",
  "leg_press_machine", "leg_extension_machine", "leg_curl_machine", "treadmill", "elliptical", "bike",
  "rowing_machine", "pull_up_bar", "parallel_bars", "assisted_dip_machine", "assisted_pull_up_machine",
  "preacher_bench", "stair_climber", "machine_chest_press", "machine_shoulder_press", "hip_abduction_machine",
  "chair", "box", "stable_platform", "weighted_vest", "secured_sandbag", "weight_plate", "dip_belt",
  "safety_arms", "safety_rack", "jump_rope"
]);
const weightedEquipmentIds = new Set(["weighted_vest", "secured_sandbag", "weight_plate", "dip_belt", "adjustable_dumbbells", "fixed_dumbbells", "kettlebell", "barbell"]);
const programRoles = new Set(["workset", "warmup", "activation", "deprecated"]);
const exerciseRoles = new Set(["primary_compound", "secondary_compound", "isolation", "accessory", "loaded_carry", "core", "cardio", "skill_drill", "activation", "warmup"]);
const raisedSupportEquipment = new Set(["bench", "chair", "box", "stable_platform"]);

const text = value => {
  if (value === true) return "是";
  if (value === false) return "否";
  if (value === null || value === undefined || value === "") return "-";
  if (Array.isArray(value)) return value.length ? value.join("、") : "-";
  return String(value);
};
const lineItems = items => items.length ? items.map(item => `- ${item}`).join("\n") : "- 无";
const relationIds = exercise => [
  ...(exercise.alternativeIds || []),
  ...(exercise.suggestedNextIds || []),
  ...(exercise.progressionIds || []),
  ...(exercise.regressionIds || []),
  ...(exercise.prerequisites || []),
  ...(exercise.replacedBy || [])
];
const optionKey = option => (option || []).join("+");
const normalizedOptionKey = option => (option || []).slice().sort().join("+");
const hasOption = (exercise, predicate) => (exercise.equipmentOptions || []).some(predicate);
const optionIncludesAny = (option, ids) => option.some(id => ids.includes(id));
const abnormalCharacters = input => (input.match(/\uFFFD/g) || []).length;
const dynamicAbsIds = new Set(["crunch", "reverse_crunch", "hanging_leg_raise", "lying_leg_raise"]);
const coreControlIds = new Set(["plank", "side_plank", "dead_bug", "bird_dog", "pallof_press", "incline_plank", "knee_plank", "long_lever_plank", "knee_side_plank", "side_plank_leg_raise", "weighted_plank", "weighted_side_plank"]);

const outOfRangeDifficulty = [];
const missingEquipmentOptionSemantics = [];
const weightedWithoutLoadEquipment = [];
const programRoleExerciseRoleConflicts = [];
const invalidCountingSemantics = [];
const skillDrillEffectiveSets = [];
const cardioMarkedCompoundOrAccessory = [];
const incompleteEquipmentCombinations = [];
const missingSafetyRequirements = [];
const invalidActionIds = [];
const unreachableEquipmentIds = [];
const deprecatedReplacementIssues = [];
const missingTrackingModes = [];

for (const exercise of EXERCISES) {
  if (!(exercise.difficultyScore >= 1 && exercise.difficultyScore <= 5)) {
    outOfRangeDifficulty.push(`${exercise.id}: difficultyScore=${text(exercise.difficultyScore)}`);
  }

  if (!Array.isArray(exercise.equipmentOptions) || !exercise.equipmentOptions.length || !exercise.equipmentOptions.every(option => Array.isArray(option) && option.length)) {
    missingEquipmentOptionSemantics.push(`${exercise.id}: equipmentOptions 缺少二维 AND/OR 语义`);
  }
  const normalizedOptionKeys = (exercise.equipmentOptions || []).map(normalizedOptionKey);
  if (normalizedOptionKeys.length !== new Set(normalizedOptionKeys).size) {
    missingEquipmentOptionSemantics.push(`${exercise.id}: equipmentOptions 存在重复组合`);
  }

  for (const option of exercise.equipmentOptions || []) {
    for (const equipmentId of option) {
      if (!knownEquipmentIds.has(equipmentId)) unreachableEquipmentIds.push(`${exercise.id}: 未知器械 ID ${equipmentId}`);
    }
  }

  if (/weighted|负重/.test(`${exercise.id}${exercise.name}`) && !hasOption(exercise, option => optionIncludesAny(option, [...weightedEquipmentIds]))) {
    weightedWithoutLoadEquipment.push(`${exercise.id}: 名称包含 weighted/负重，但 equipmentOptions 未包含负重器械`);
  }

  if (!programRoles.has(exercise.programRole)) {
    programRoleExerciseRoleConflicts.push(`${exercise.id}: programRole=${text(exercise.programRole)} 非法`);
  }
  if (!exerciseRoles.has(exercise.exerciseRole)) {
    programRoleExerciseRoleConflicts.push(`${exercise.id}: exerciseRole=${text(exercise.exerciseRole)} 非法`);
  }
  if (["warmup", "activation", "deprecated"].includes(exercise.programRole) && (exercise.countsAsWorkSet || exercise.countsTowardMuscleVolume)) {
    invalidCountingSemantics.push(`${exercise.id}: programRole=${exercise.programRole} 但仍计入工作组或肌肉有效组`);
  }
  if (["warmup", "activation", "skill_drill"].includes(exercise.exerciseRole) && (exercise.countsAsWorkSet || exercise.countsTowardMuscleVolume)) {
    skillDrillEffectiveSets.push(`${exercise.id}: ${exercise.exerciseRole} 仍计入工作组或肌肉有效组`);
  }
  if (exercise.exerciseRole === "cardio" && exercise.category !== "有氧") {
    programRoleExerciseRoleConflicts.push(`${exercise.id}: exerciseRole=cardio 但 category=${text(exercise.category)}`);
  }
  if (exercise.category === "有氧" && exercise.exerciseRole !== "cardio") {
    cardioMarkedCompoundOrAccessory.push(`${exercise.id}: 有氧动作 exerciseRole=${text(exercise.exerciseRole)}`);
  }
  if (exercise.exerciseRole === "cardio" && exercise.countsTowardMuscleVolume) {
    cardioMarkedCompoundOrAccessory.push(`${exercise.id}: 有氧动作错误计入肌肉有效组`);
  }
  if (exercise.countsAsWorkSet === undefined || exercise.countsTowardMuscleVolume === undefined) {
    invalidCountingSemantics.push(`${exercise.id}: 新统计字段为 undefined`);
  }
  const resolvedTrackingMode = resolveExerciseTrackingMode(exercise);
  if (exercise.programRole === "workset" && ["primary_compound", "secondary_compound", "isolation", "accessory", "core", "loaded_carry", "cardio"].includes(exercise.exerciseRole) && !resolvedTrackingMode) {
    missingTrackingModes.push(`${exercise.id}: 工作组动作缺少解析后的 trackingMode`);
  }
  if (exercise.exerciseRole === "cardio" && resolvedTrackingMode !== "duration") {
    missingTrackingModes.push(`${exercise.id}: 有氧动作应按 duration 追踪，当前=${text(resolvedTrackingMode)}`);
  }
  if (dynamicAbsIds.has(exercise.id) && (!exercise.countsAsWorkSet || !exercise.countsTowardMuscleVolume || exercise.trackingMode !== "reps")) {
    invalidCountingSemantics.push(`${exercise.id}: 动态腹肌动作必须计入核心直接训练量，并使用 reps 追踪`);
  }
  if (coreControlIds.has(exercise.id) && (!exercise.countsAsWorkSet || exercise.countsTowardMuscleVolume)) {
    invalidCountingSemantics.push(`${exercise.id}: 控制/抗动核心动作应计入正式训练段，但不计入肌肉有效组`);
  }
  if (exercise.id === "farmer_carry" && (!exercise.countsAsWorkSet || exercise.countsTowardMuscleVolume || !["distance", "duration"].includes(exercise.trackingMode))) {
    invalidCountingSemantics.push("farmer_carry: 应作为正式负重行走训练段追踪，但不计入普通肌肉有效组");
  }
  if (exercise.id === "wall_sit" && (!exercise.countsAsWorkSet || exercise.countsTowardMuscleVolume || exercise.trackingMode !== "duration")) {
    invalidCountingSemantics.push("wall_sit: 静力动作应按 duration 追踪，且不计入普通肌肉有效组");
  }

  if (exercise.programRole === "deprecated") {
    if (exercise.autoCandidate !== false) deprecatedReplacementIssues.push(`${exercise.id}: deprecated 动作仍可进入新计划候选池`);
    for (const replacementId of exercise.replacedBy || []) {
      const replacement = byId.get(replacementId);
      if (!replacement) deprecatedReplacementIssues.push(`${exercise.id}: replacedBy 指向不存在动作 ${replacementId}`);
      if (replacement?.programRole === "deprecated") deprecatedReplacementIssues.push(`${exercise.id}: replacedBy 指向弃用动作 ${replacementId}`);
    }
  }

  if (exercise.id === "db_shoulder_press" && !hasOption(exercise, option => optionIncludesAny(option, ["bench", "adjustable_bench"]) && optionIncludesAny(option, ["adjustable_dumbbells", "fixed_dumbbells"]))) {
    incompleteEquipmentCombinations.push("db_shoulder_press: 缺少 哑铃 + 卧凳 AND 组合");
  }
  if (exercise.id === "preacher_curl") {
    if (!hasOption(exercise, option => option.includes("preacher_bench") && option.includes("adjustable_dumbbells"))) incompleteEquipmentCombinations.push("preacher_curl: 缺少 preacher_bench + adjustable_dumbbells");
    if (!hasOption(exercise, option => option.includes("preacher_bench") && option.includes("fixed_dumbbells"))) incompleteEquipmentCombinations.push("preacher_curl: 缺少 preacher_bench + fixed_dumbbells");
    if (!hasOption(exercise, option => option.includes("preacher_bench") && option.includes("barbell"))) incompleteEquipmentCombinations.push("preacher_curl: 缺少 preacher_bench + barbell");
  }
  if (exercise.id === "weighted_push_up" && hasOption(exercise, option => option.length === 1 && option.includes("weight_plate"))) {
    incompleteEquipmentCombinations.push("weighted_push_up: 不应单独使用 weight_plate 作为安全完整方案");
  }
  if (exercise.id === "db_bench" && !hasOption(exercise, option => option.includes("bench") && optionIncludesAny(option, ["adjustable_dumbbells", "fixed_dumbbells"]))) {
    incompleteEquipmentCombinations.push("db_bench: 缺少 哑铃 + 卧推凳 AND 组合");
  }
  if (["barbell_bench", "close_grip_bench"].includes(exercise.id) && !((exercise.equipmentOptions || []).every(option => option.includes("barbell") && option.includes("bench") && option.includes("squat_rack")))) {
    incompleteEquipmentCombinations.push(`${exercise.id}: 杠铃卧推系列必须包含 barbell + bench + squat_rack，safety_rack 不能单独替代架体`);
  }
  if (exercise.id === "incline_db_bench" && !hasOption(exercise, option => option.includes("adjustable_bench") && optionIncludesAny(option, ["adjustable_dumbbells", "fixed_dumbbells"]))) {
    incompleteEquipmentCombinations.push("incline_db_bench: 上斜哑铃卧推必须包含 adjustable_bench");
  }
  if (exercise.id === "incline_barbell_bench" && !((exercise.equipmentOptions || []).every(option => option.includes("barbell") && option.includes("adjustable_bench") && option.includes("squat_rack")))) {
    incompleteEquipmentCombinations.push("incline_barbell_bench: 上斜杠铃卧推必须包含 barbell + adjustable_bench + squat_rack，safety_rack 不能单独替代架体");
  }
  if (exercise.id === "band_pulldown" && !hasOption(exercise, option => option.includes("resistance_band") && option.includes("band_anchor"))) {
    incompleteEquipmentCombinations.push("band_pulldown: 弹力带方案必须包含 band_anchor");
  }
  if (exercise.id === "face_pull" && hasOption(exercise, option => option.includes("resistance_band") && !option.includes("band_anchor"))) {
    incompleteEquipmentCombinations.push("face_pull: 弹力带方案必须包含 band_anchor");
  }
  if (exercise.id === "pallof_press" && hasOption(exercise, option => option.includes("resistance_band") && !option.includes("band_anchor"))) {
    incompleteEquipmentCombinations.push("pallof_press: 弹力带方案必须包含 band_anchor");
  }
  if (exercise.id === "hip_abduction" && hasOption(exercise, option => option.includes("resistance_band") && option.includes("band_anchor"))) {
    incompleteEquipmentCombinations.push("hip_abduction: 髋外展弹力带方案不应强制固定点");
  }
  if (exercise.id === "weighted_pull_up") {
    if (!hasOption(exercise, option => option.includes("pull_up_bar") && option.includes("weighted_vest"))) {
      incompleteEquipmentCombinations.push("weighted_pull_up: 缺少 pull_up_bar + weighted_vest");
    }
    if (!hasOption(exercise, option => option.includes("pull_up_bar") && option.includes("dip_belt") && option.includes("weight_plate"))) {
      incompleteEquipmentCombinations.push("weighted_pull_up: 缺少 pull_up_bar + dip_belt + weight_plate");
    }
  }
  if (exercise.id === "band_assisted_pull_up" && !hasOption(exercise, option => option.includes("pull_up_bar") && option.includes("resistance_band"))) {
    incompleteEquipmentCombinations.push("band_assisted_pull_up: 缺少 pull_up_bar + resistance_band");
  }
  if (exercise.id === "band_assisted_dip" && !hasOption(exercise, option => option.includes("parallel_bars") && option.includes("resistance_band"))) {
    incompleteEquipmentCombinations.push("band_assisted_dip: 缺少 parallel_bars + resistance_band");
  }
  if (exercise.id === "weighted_dip") {
    if (!hasOption(exercise, option => option.includes("parallel_bars") && option.includes("weighted_vest"))) {
      incompleteEquipmentCombinations.push("weighted_dip: 缺少 parallel_bars + weighted_vest");
    }
    if (!hasOption(exercise, option => option.includes("parallel_bars") && option.includes("dip_belt") && option.includes("weight_plate"))) {
      incompleteEquipmentCombinations.push("weighted_dip: 缺少 parallel_bars + dip_belt + weight_plate");
    }
  }
  if (exercise.id === "chair_sit_to_stand") {
    for (const required of ["chair", "bench", "stable_platform"]) {
      if (!hasOption(exercise, option => option.length === 1 && option[0] === required)) incompleteEquipmentCombinations.push(`chair_sit_to_stand: 缺少 OR option [${required}]`);
    }
  }
  if (exercise.id === "box_squat") {
    for (const required of ["box", "bench", "stable_platform"]) {
      if (!hasOption(exercise, option => option.length === 1 && option[0] === required)) incompleteEquipmentCombinations.push(`box_squat: 缺少 OR option [${required}]`);
    }
  }
  if (exercise.id === "single_leg_rdl" && hasOption(exercise, option => option.includes("weight_plate"))) {
    incompleteEquipmentCombinations.push("single_leg_rdl: 不应默认使用 weight_plate");
  }
  if (exercise.id === "step_up" && !((exercise.equipmentOptions || []).every(option => option.some(id => raisedSupportEquipment.has(id))))) {
    incompleteEquipmentCombinations.push("step_up: 每个器械方案都必须包含平台器械");
  }
  if (exercise.id === "bulgarian_split_squat" && !((exercise.equipmentOptions || []).every(option => option.some(id => raisedSupportEquipment.has(id))))) {
    incompleteEquipmentCombinations.push("bulgarian_split_squat: 每个器械方案都必须包含后脚支撑器械");
  }
  if (exercise.id === "incline_plank" && !((exercise.equipmentOptions || []).every(option => option.some(id => raisedSupportEquipment.has(id))))) {
    incompleteEquipmentCombinations.push("incline_plank: 每个器械方案都必须包含抬高支撑面");
  }
  if (exercise.id === "weighted_plank" && hasOption(exercise, option => option.includes("weight_plate"))) {
    incompleteEquipmentCombinations.push("weighted_plank: 与 weighted_push_up 保持一致，不保留单独 weight_plate 方案");
  }

  if (["weighted_push_up", "weighted_plank", "weighted_side_plank"].includes(exercise.id)) {
    const safety = exercise.equipmentOptionSafety || [];
    const safetyByOption = new Map(safety.map(item => [optionKey(item.option), item]));
    for (const option of exercise.equipmentOptions || []) {
      if (option.includes("weight_plate") && exercise.id !== "weighted_side_plank" && !safetyByOption.get(optionKey(option))?.requiresSpotter) {
        missingSafetyRequirements.push(`${exercise.id}: ${optionKey(option)} 缺少 requiresSpotter`);
      }
      if (option.includes("weight_plate") && exercise.id === "weighted_side_plank" && !safetyByOption.get(optionKey(option))?.canHoldLoadAlone) {
        missingSafetyRequirements.push(`${exercise.id}: ${optionKey(option)} 缺少 canHoldLoadAlone`);
      }
      if (option.includes("secured_sandbag") && !safetyByOption.get(optionKey(option))?.requiresSecuredLoad) {
        missingSafetyRequirements.push(`${exercise.id}: ${optionKey(option)} 缺少 requiresSecuredLoad`);
      }
      if (option.includes("weighted_vest") && safetyByOption.get(optionKey(option))?.canTrainAlone !== true) {
        missingSafetyRequirements.push(`${exercise.id}: ${optionKey(option)} 缺少 canTrainAlone=true`);
      }
    }
  }
  if (exercise.id === "barbell_squat") {
    if (!exercise.requiresRack) missingSafetyRequirements.push("barbell_squat: 缺少 requiresRack");
    if (!exercise.requiresSafetyArmsOrSpotterForHeavySets) missingSafetyRequirements.push("barbell_squat: 缺少 requiresSafetyArmsOrSpotterForHeavySets");
  }

  for (const id of relationIds(exercise)) {
    if (!byId.has(id)) invalidActionIds.push(`${exercise.id}: 无法访问动作 ID ${id}`);
  }
}

const graph = validateExerciseProgressionGraph();
const library = validateExerciseLibrary();
const encodingFiles = ["workout-engine.js", "tests/workout-engine.test.mjs", "scripts/audit-workout-data.mjs", "workout-data-audit.md", "workout-difficulty-review.md", "workout-difficulty-summary.md"];
const encodingAbnormalCharacterCount = encodingFiles.reduce((sum, file) => {
  try {
    return sum + abnormalCharacters(readFileSync(resolve(root, file), "utf8"));
  } catch {
    return sum;
  }
}, 0);

const audit = {
  generatedAt: new Date().toISOString(),
  exerciseCount: EXERCISES.length,
  graphOk: graph.ok,
  libraryOk: library.ok,
  graphErrors: graph.errors,
  libraryErrors: library.errors,
  outOfRangeDifficulty,
  missingEquipmentOptionSemantics,
  weightedWithoutLoadEquipment,
  programRoleExerciseRoleConflicts,
  invalidCountingSemantics,
  missingTrackingModes,
  skillDrillEffectiveSets,
  cardioMarkedCompoundOrAccessory,
  deprecatedReplacementIssues,
  incompleteEquipmentCombinations,
  missingSafetyRequirements,
  invalidActionIds: [...new Set(invalidActionIds)],
  unreachableEquipmentIds: [...new Set(unreachableEquipmentIds)],
  encodingAbnormalCharacterCount
};

const jsonPath = resolve(root, "workout-data-audit.json");
const mdPath = resolve(root, "workout-data-audit.md");
const reviewPath = resolve(root, "workout-difficulty-review.md");
const summaryPath = resolve(root, "workout-difficulty-summary.md");

writeFileSync(jsonPath, `${JSON.stringify(audit, null, 2)}\n`, "utf8");

const md = `# 健身动作数据结构收尾审计\n\n生成时间：${audit.generatedAt}\n\n`
  + `- 动作数量：${audit.exerciseCount}\n`
  + `- 进退阶图校验：${audit.graphOk ? "通过" : "失败"}\n`
  + `- 动作库完整性校验：${audit.libraryOk ? "通过" : "失败"}\n`
  + `- 编码异常字符数量：${audit.encodingAbnormalCharacterCount}\n\n`
  + `## 超出 1～5 的难度值\n\n${lineItems(outOfRangeDifficulty)}\n\n`
  + `## 器械组合缺少 AND/OR 语义\n\n${lineItems(missingEquipmentOptionSemantics)}\n\n`
  + `## 名称包含 weighted 但没有负重器械的动作\n\n${lineItems(weightedWithoutLoadEquipment)}\n\n`
  + `## programRole 与 exerciseRole 冲突\n\n${lineItems(programRoleExerciseRoleConflicts)}\n\n`
  + `## 统计语义异常\n\n${lineItems(invalidCountingSemantics)}\n\n`
  + `## 追踪模式异常\n\n${lineItems(missingTrackingModes)}\n\n`
  + `## warmup / activation / skill_drill 仍计入有效组\n\n${lineItems(skillDrillEffectiveSets)}\n\n`
  + `## cardio 被错误标记或计入肌肉有效组\n\n${lineItems(cardioMarkedCompoundOrAccessory)}\n\n`
  + `## 弃用动作迁移异常\n\n${lineItems(deprecatedReplacementIssues)}\n\n`
  + `## 组合器械不完整的动作\n\n${lineItems(incompleteEquipmentCombinations)}\n\n`
  + `## 需要安全条件但字段缺失的动作\n\n${lineItems(missingSafetyRequirements)}\n\n`
  + `## 无效动作 ID\n\n${lineItems(audit.invalidActionIds)}\n\n`
  + `## 无法访问的器械 ID\n\n${lineItems(audit.unreachableEquipmentIds)}\n\n`
  + `## 进退阶图错误\n\n${lineItems(graph.errors)}\n\n`
  + `## 动作库完整性错误\n\n${lineItems(library.errors)}\n`;
writeFileSync(mdPath, md, "utf8");

const rows = [
  "| 动作 ID | 名称 | 难度 | programRole | exerciseRole | 工作组 | 肌肉有效组 | 追踪模式 | equipmentOptions |",
  "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...EXERCISES.map(item => `| ${item.id} | ${item.name} | ${text(item.difficultyScore)} | ${text(item.programRole)} | ${text(item.exerciseRole)} | ${text(item.countsAsWorkSet)} | ${text(item.countsTowardMuscleVolume)} | ${text(resolveExerciseTrackingMode(item))} | ${text((item.equipmentOptions || []).map(option => `[${option.join("+")}]`).join(" / "))} |`)
];
writeFileSync(reviewPath, `# 健身动作结构报告\n\n生成时间：${audit.generatedAt}\n\n${rows.join("\n")}\n`, "utf8");
writeFileSync(summaryPath, `# 健身动作数据结构摘要\n\n`
  + `- 动作数量：${audit.exerciseCount}\n`
  + `- 进退阶图校验：${audit.graphOk ? "通过" : "失败"}\n`
  + `- 动作库完整性校验：${audit.libraryOk ? "通过" : "失败"}\n`
  + `- 超出 1～5 的难度值：${outOfRangeDifficulty.length}\n`
  + `- 器械组合缺少 AND/OR 语义：${missingEquipmentOptionSemantics.length}\n`
  + `- 名称包含 weighted 但没有负重器械：${weightedWithoutLoadEquipment.length}\n`
  + `- programRole 与 exerciseRole 冲突：${programRoleExerciseRoleConflicts.length}\n`
  + `- 统计语义异常：${invalidCountingSemantics.length}\n`
  + `- 追踪模式异常：${missingTrackingModes.length}\n`
  + `- warmup / activation / skill_drill 仍计入有效组：${skillDrillEffectiveSets.length}\n`
  + `- cardio 被错误标记或计入肌肉有效组：${cardioMarkedCompoundOrAccessory.length}\n`
  + `- 弃用动作迁移异常：${deprecatedReplacementIssues.length}\n`
  + `- 组合器械不完整：${incompleteEquipmentCombinations.length}\n`
  + `- 需要安全条件但字段缺失：${missingSafetyRequirements.length}\n`
  + `- 无效动作 ID：${audit.invalidActionIds.length}\n`
  + `- 无法访问的器械 ID：${audit.unreachableEquipmentIds.length}\n`
  + `- 编码异常字符数量：${encodingAbnormalCharacterCount}\n`, "utf8");

console.log(JSON.stringify({
  exerciseCount: audit.exerciseCount,
  graphOk: audit.graphOk,
  libraryOk: audit.libraryOk,
  outOfRangeDifficulty: outOfRangeDifficulty.length,
  missingEquipmentOptionSemantics: missingEquipmentOptionSemantics.length,
  weightedWithoutLoadEquipment: weightedWithoutLoadEquipment.length,
  programRoleExerciseRoleConflicts: programRoleExerciseRoleConflicts.length,
  invalidCountingSemantics: invalidCountingSemantics.length,
  skillDrillEffectiveSets: skillDrillEffectiveSets.length,
  cardioMarkedCompoundOrAccessory: cardioMarkedCompoundOrAccessory.length,
  deprecatedReplacementIssues: deprecatedReplacementIssues.length,
  incompleteEquipmentCombinations: incompleteEquipmentCombinations.length,
  missingSafetyRequirements: missingSafetyRequirements.length,
  invalidActionIds: audit.invalidActionIds.length,
  unreachableEquipmentIds: audit.unreachableEquipmentIds.length,
  encodingAbnormalCharacterCount,
  report: mdPath,
  json: jsonPath
}, null, 2));
