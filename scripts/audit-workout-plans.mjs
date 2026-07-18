import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const sourcePath = resolve(root, "workout-engine.js");
const source = await readFile(sourcePath, "utf8");
const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(source)}`;
const {
  EXERCISES,
  generateWorkoutPlan,
  getExerciseAlternatives,
  isExerciseAllowed,
  PLANNER_SCORE_WEIGHTS,
  RECOMMENDED_WEEKLY_SETS,
  plannerScoreBreakdown,
  validateWorkoutPlan
} = await import(moduleUrl);

const GENERATED_AT = new Date().toISOString();
const SEED = "deterministic-v1";
const byId = new Map(EXERCISES.map(item => [item.id, item]));
const FAMILY_CAP_PER_DAY = new Map([
  ["bench_press", 1],
  ["push_up", 1],
  ["chest_fly", 1],
  ["vertical_pull", 1],
  ["horizontal_row", 1],
  ["single_leg", 1],
  ["biceps_curl", 1],
  ["triceps_extension", 1],
  ["lateral_raise", 1]
]);

const scenarios = [
  {
    name: "纯自重初学者全身 3 天",
    userProfile: { age: 30, sex: "male", height: 175, weight: 72 },
    settings: {
      primaryGoal: "health",
      secondaryGoal: "muscleGain",
      experienceLevel: "beginner",
      weeklyTrainingDays: 3,
      sessionDuration: 30,
      trainingLocation: "homeNone",
      availableEquipment: ["bodyweight"],
      selectedSplit: "fullBody",
      cardioPreference: "none"
    }
  },
  {
    name: "纯自重 + 椅子初学者全身 3 天",
    userProfile: { age: 30, sex: "female", height: 165, weight: 60 },
    settings: {
      primaryGoal: "health",
      secondaryGoal: "muscleGain",
      experienceLevel: "beginner",
      weeklyTrainingDays: 3,
      sessionDuration: 30,
      trainingLocation: "homeSimple",
      availableEquipment: ["bodyweight", "chair"],
      selectedSplit: "fullBody",
      cardioPreference: "none"
    }
  },
  {
    name: "家庭哑铃增肌 4 天",
    userProfile: { age: 32, sex: "male", height: 178, weight: 76 },
    settings: {
      primaryGoal: "muscleGain",
      secondaryGoal: "health",
      experienceLevel: "intermediate",
      weeklyTrainingDays: 4,
      sessionDuration: 45,
      trainingLocation: "homeSimple",
      availableEquipment: ["bodyweight", "adjustable_dumbbells", "adjustable_bench", "resistance_band", "band_anchor"],
      selectedSplit: "upperLower",
      cardioPreference: "none"
    }
  },
  {
    name: "完整健身房 PPL 增肌 3 天",
    userProfile: { age: 29, sex: "male", height: 180, weight: 82 },
    settings: {
      primaryGoal: "muscleGain",
      secondaryGoal: "health",
      experienceLevel: "intermediate",
      weeklyTrainingDays: 3,
      sessionDuration: 45,
      trainingLocation: "commercialGym",
      availableEquipment: [
        "bodyweight",
        "barbell",
        "squat_rack",
        "bench",
        "adjustable_bench",
        "cable_machine",
        "lat_pulldown_machine",
        "leg_press",
        "machine_chest_press",
        "machine_shoulder_press",
        "adjustable_dumbbells",
        "fixed_dumbbells",
        "parallel_bars",
        "smith_machine",
        "leg_extension_machine",
        "leg_curl_machine"
      ],
      selectedSplit: "ppl",
      cardioPreference: "none"
    }
  },
  ...[2, 3, 4, 5, 6].map(days => ({
    name: `频率审计 ${days} 天/周`,
    userProfile: { age: 34, sex: "male", height: 176, weight: 74 },
    settings: {
      primaryGoal: "muscleGain",
      secondaryGoal: "health",
      experienceLevel: "intermediate",
      weeklyTrainingDays: days,
      sessionDuration: days <= 3 ? 45 : 60,
      trainingLocation: "commercialGym",
      availableEquipment: [
        "bodyweight",
        "adjustable_dumbbells",
        "fixed_dumbbells",
        "barbell",
        "squat_rack",
        "bench",
        "adjustable_bench",
        "cable_machine",
        "lat_pulldown_machine",
        "leg_press",
        "leg_extension_machine",
        "leg_curl_machine",
        "machine_chest_press",
        "machine_shoulder_press"
      ],
      selectedSplit: days === 2 ? "fullBody" : days === 4 ? "upperLower" : "ppl",
      cardioPreference: "none"
    }
  })),
  {
    name: "失败场景：只有跳绳却要求增肌",
    userProfile: { age: 28, sex: "male", height: 172, weight: 68 },
    settings: {
      primaryGoal: "muscleGain",
      secondaryGoal: "health",
      experienceLevel: "intermediate",
      weeklyTrainingDays: 3,
      sessionDuration: 45,
      trainingLocation: "homeSimple",
      availableEquipment: ["jump_rope"],
      selectedSplit: "fullBody",
      cardioPreference: "none"
    },
    expectFailure: true
  }
];

function matchedEquipmentOption(exercise, settings) {
  const available = new Set(settings.availableEquipment || []);
  return (exercise.equipmentOptions || []).find(option => option.every(item => available.has(item))) || null;
}

function estimateRowMinutes(row) {
  if (row.category === "有氧") return 8;
  const perSetSeconds = ["reps_per_side", "duration_per_side"].includes(row.trackingMode) ? 70 : 45;
  const rest = Number(row.restSeconds || 0);
  const transitionSeconds = row.isCompound ? 75 : 45;
  return Math.ceil((row.sets * perSetSeconds + Math.max(0, row.sets - 1) * rest + transitionSeconds) / 60);
}

function summarizePlan(plan, settings) {
  const trainingDays = plan.days.filter(day => !day.isRest);
  const directSets = {};
  const indirectSets = {};
  const movementPatterns = {};
  const exerciseFamilies = {};
  const fatigueTags = {};
  const recoveryCosts = {};
  const difficultyBuckets = { "1-2": 0, "2.5-3": 0, "3.5-4": 0, "4.5-5": 0 };
  let totalWorkSets = 0;
  let highDifficultyCount = 0;
  let unilateralCount = 0;

  for (const day of trainingDays) {
    for (const row of day.exercises) {
      const exercise = byId.get(row.exerciseId);
      if (!exercise) continue;
      movementPatterns[exercise.movementPattern] = (movementPatterns[exercise.movementPattern] || 0) + 1;
      exerciseFamilies[exercise.exerciseFamily] = (exerciseFamilies[exercise.exerciseFamily] || 0) + 1;
      recoveryCosts[exercise.recoveryCost] = (recoveryCosts[exercise.recoveryCost] || 0) + 1;
      for (const tag of exercise.fatigueTags || []) fatigueTags[tag] = (fatigueTags[tag] || 0) + 1;
      if (exercise.countsAsWorkSet) totalWorkSets += row.sets || 0;
      if (exercise.countsTowardMuscleVolume) {
        for (const muscle of exercise.primaryMuscles || []) directSets[muscle] = (directSets[muscle] || 0) + (row.sets || 0);
        for (const muscle of exercise.secondaryMuscles || []) indirectSets[muscle] = (indirectSets[muscle] || 0) + Math.round((row.sets || 0) * 0.5 * 10) / 10;
      }
      const score = Number(exercise.difficultyScore || 1);
      if (score <= 2) difficultyBuckets["1-2"] += 1;
      else if (score <= 3) difficultyBuckets["2.5-3"] += 1;
      else if (score <= 4) difficultyBuckets["3.5-4"] += 1;
      else difficultyBuckets["4.5-5"] += 1;
      if (score >= 4.5) highDifficultyCount += 1;
      if (["reps_per_side", "duration_per_side"].includes(row.trackingMode)) unilateralCount += 1;
    }
  }

  return {
    totalWorkSets,
    directSets,
    indirectSets,
    movementPatterns,
    exerciseFamilies,
    fatigueTags,
    recoveryCosts,
    difficultyBuckets,
    highDifficultyCount,
    unilateralCount,
    estimatedTotalMinutes: trainingDays.reduce((sum, day) => sum + day.estimatedDuration, 0),
    durationLimitMinutes: settings.sessionDuration
  };
}

function validateScenario(plan, settings) {
  const errors = [];
  if (!plan) return errors;
  const validation = validateWorkoutPlan(plan, settings);
  errors.push(...validation.errors);
  const trainingDays = plan.days.filter(day => !day.isRest);
  for (const day of trainingDays) {
    const ids = new Set();
    const familyCounts = {};
    const movementPatterns = new Set();
    let highRecoveryStreak = 0;
    if (day.estimatedDuration > settings.sessionDuration * 1.2) {
      errors.push(`${day.day} estimatedDuration ${day.estimatedDuration} exceeds 20% tolerance for ${settings.sessionDuration} minutes`);
    }
    for (const row of day.exercises) {
      const exercise = byId.get(row.exerciseId);
      if (!exercise) {
        errors.push(`${day.day}: missing exercise ${row.exerciseId}`);
        continue;
      }
      familyCounts[exercise.exerciseFamily] = (familyCounts[exercise.exerciseFamily] || 0) + 1;
      movementPatterns.add(exercise.movementPattern);
      highRecoveryStreak = exercise.recoveryCost >= 4 ? highRecoveryStreak + 1 : 0;
      if (highRecoveryStreak >= 3) errors.push(`${day.day}: stacks three high-recovery-cost exercises`);
      if (ids.has(row.exerciseId)) errors.push(`${day.day}: duplicate exercise ${row.exerciseId}`);
      ids.add(row.exerciseId);
      if (exercise.programRole === "deprecated") errors.push(`${day.day}: deprecated exercise ${row.exerciseId}`);
      if (!isExerciseAllowed(exercise, settings)) errors.push(`${day.day}: disallowed exercise ${row.exerciseId}`);
      if (!row.trackingMode) errors.push(`${day.day}: missing trackingMode ${row.exerciseId}`);
      if (!row.plannerScoreDetails || !Number.isFinite(row.plannerScoreDetails.finalScore)) errors.push(`${day.day}: missing planner score details ${row.exerciseId}`);
      if (["reps_per_side", "duration_per_side"].includes(row.trackingMode) && !String(row.targetLabel).includes("每侧")) {
        errors.push(`${day.day}: unilateral target missing 每侧 ${row.exerciseId}`);
      }
    }
    for (const [family, count] of Object.entries(familyCounts)) {
      const cap = FAMILY_CAP_PER_DAY.get(family);
      if (cap && count > cap) errors.push(`${day.day}: family cap exceeded ${family} ${count}/${cap}`);
    }
    if (day.theme.includes("推")) {
      if (!movementPatterns.has("水平推")) errors.push(`${day.day}: push day missing horizontal press`);
      if (!movementPatterns.has("垂直推")) errors.push(`${day.day}: push day missing vertical press`);
    }
    if (day.theme.includes("拉")) {
      if (!movementPatterns.has("垂直拉")) errors.push(`${day.day}: pull day missing vertical pull`);
      if (!movementPatterns.has("水平拉")) errors.push(`${day.day}: pull day missing horizontal row`);
    }
    if (day.theme.includes("腿")) {
      if (!Object.keys(familyCounts).includes("squat")) errors.push(`${day.day}: leg day missing squat family`);
      if (!Object.keys(familyCounts).includes("hinge")) errors.push(`${day.day}: leg day missing hinge family`);
    }
  }

  if (settings.experienceLevel === "beginner") {
    const high = trainingDays.flatMap(day => day.exercises).filter(row => (byId.get(row.exerciseId)?.difficultyScore || 1) >= 4.5);
    if (high.length) errors.push(`beginner plan has unwhitelisted 4.5+ difficulty exercises: ${high.map(row => row.exerciseId).join(", ")}`);
  }
  return errors;
}

function dayRows(day, settings) {
  return day.exercises.map((row, index) => {
    const exercise = byId.get(row.exerciseId);
    const score = row.plannerScoreDetails || (exercise ? plannerScoreBreakdown(exercise, settings, { picked: day.exercises.slice(0, index), slotKey: "audit" }) : null);
    return {
      order: index + 1,
      exerciseId: row.exerciseId,
      name: row.name,
      movementPattern: exercise?.movementPattern || "-",
      exerciseFamily: exercise?.exerciseFamily || "-",
      exerciseRole: exercise?.exerciseRole || "-",
      priority: exercise?.exercisePriority ?? "-",
      recoveryCost: exercise?.recoveryCost ?? "-",
      fatigueTags: exercise?.fatigueTags?.join(", ") || "-",
      difficulty: exercise?.difficultyScore ?? "-",
      plannerScore: score?.finalScore ?? "-",
      plannerReason: score?.reason || "-",
      sets: row.sets,
      target: row.targetLabel,
      trackingMode: row.trackingMode,
      countsTowardMuscleVolume: Boolean(exercise?.countsTowardMuscleVolume),
      matchedEquipmentOption: matchedEquipmentOption(exercise, settings),
      estimatedMinutes: estimateRowMinutes(row),
      alternatives: getExerciseAlternatives(row.exerciseId, settings).map(item => item.id).slice(0, 3)
    };
  });
}

const audited = scenarios.map(scenario => {
  const result = generateWorkoutPlan(scenario.settings, scenario.userProfile);
  const plan = result.plan;
  return {
    name: scenario.name,
    seed: SEED,
    settings: scenario.settings,
    errors: result.errors || [],
    warnings: result.warnings || plan?.warnings || [],
    expectedFailure: Boolean(scenario.expectFailure),
    invariantErrors: plan ? validateScenario(plan, scenario.settings) : [],
    summary: plan ? summarizePlan(plan, scenario.settings) : null,
    days: plan ? plan.days.filter(day => !day.isRest).map(day => ({
      day: day.day,
      theme: day.theme,
      estimatedDuration: day.estimatedDuration,
      estimatedCaloriesRange: day.estimatedCaloriesRange,
      rows: dayRows(day, scenario.settings)
    })) : []
  };
});

const jsonPath = resolve(root, "workout-plan-audit.json");
const mdPath = resolve(root, "workout-plan-audit.md");

function table(rows, headers) {
  const escape = value => String(value ?? "-").replace(/\|/g, "\\|").replace(/\n/g, " ");
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map(row => `| ${headers.map(header => escape(row[header])).join(" | ")} |`)
  ].join("\n");
}

const familyStats = Object.entries(EXERCISES.reduce((counts, exercise) => {
  counts[exercise.exerciseFamily] = (counts[exercise.exerciseFamily] || 0) + 1;
  return counts;
}, {})).sort((a, b) => b[1] - a[1]).map(([family, count]) => ({ Family: family, 动作数: count }));

const priorityRows = [...EXERCISES]
  .sort((a, b) => b.exercisePriority - a.exercisePriority)
  .slice(0, 25)
  .map(exercise => ({
    动作ID: exercise.id,
    动作名称: exercise.name,
    Family: exercise.exerciseFamily,
    Priority: exercise.exercisePriority
  }));

const recoveryRows = Object.entries(EXERCISES.reduce((counts, exercise) => {
  counts[exercise.recoveryCost] = (counts[exercise.recoveryCost] || 0) + 1;
  return counts;
}, {})).sort((a, b) => Number(a[0]) - Number(b[0])).map(([cost, count]) => ({ RecoveryCost: cost, 动作数: count }));

const fatigueRows = Object.entries(EXERCISES.reduce((counts, exercise) => {
  for (const tag of exercise.fatigueTags || []) counts[tag] = (counts[tag] || 0) + 1;
  return counts;
}, {})).sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ FatigueTag: tag, 动作数: count }));

const md = [
  "# 训练计划生成审计报告",
  "",
  `生成时间：${GENERATED_AT}`,
  `随机 seed：${SEED}`,
  `动作数量：${EXERCISES.length}`,
  `真实生成器：${sourcePath}`,
  "",
  "## Planner V2 常量",
  "",
  table(Object.entries(PLANNER_SCORE_WEIGHTS).map(([权重项, 数值]) => ({ 权重项, 数值 })), ["权重项", "数值"]),
  "",
  "## Family 分类统计",
  "",
  table(familyStats, ["Family", "动作数"]),
  "",
  "## Priority Top 25",
  "",
  table(priorityRows, ["动作ID", "动作名称", "Family", "Priority"]),
  "",
  "## Recovery Cost 分布",
  "",
  table(recoveryRows, ["RecoveryCost", "动作数"]),
  "",
  "## Fatigue Tag 分布",
  "",
  table(fatigueRows, ["FatigueTag", "动作数"]),
  "",
  "## Recommended Weekly Sets",
  "",
  table(Object.entries(RECOMMENDED_WEEKLY_SETS).map(([肌群, range]) => ({ 肌群, 最低: range.min, 最高: range.max })), ["肌群", "最低", "最高"]),
  "",
  "## 场景总览",
  "",
  table(audited.map(item => ({
    场景: item.name,
    结果: item.expectedFailure ? (item.errors.length ? "按预期失败" : "未按预期失败") : (item.errors.length || item.invariantErrors.length ? "需检查" : "通过"),
    生成错误: item.errors.join("; ") || "-",
    不变量错误: item.invariantErrors.join("; ") || "-",
    周总工作组: item.summary?.totalWorkSets ?? "-",
    总预计分钟: item.summary?.estimatedTotalMinutes ?? "-"
  })), ["场景", "结果", "生成错误", "不变量错误", "周总工作组", "总预计分钟"]),
  "",
  ...audited.flatMap(item => [
    `## ${item.name}`,
    "",
    `用户水平：${item.settings.experienceLevel}`,
    `训练目标：${item.settings.primaryGoal}`,
    `每周频率：${item.settings.weeklyTrainingDays}`,
    `单次时长：${item.settings.sessionDuration} 分钟`,
    `用户器械：${item.settings.availableEquipment.join(", ")}`,
    `生成错误：${item.errors.join("; ") || "-"}`,
    `不变量错误：${item.invariantErrors.join("; ") || "-"}`,
    item.summary ? `有效组摘要：直接 ${JSON.stringify(item.summary.directSets)}；间接 ${JSON.stringify(item.summary.indirectSets)}；动作模式 ${JSON.stringify(item.summary.movementPatterns)}；难度 ${JSON.stringify(item.summary.difficultyBuckets)}` : "有效组摘要：-",
    item.summary ? `Planner 摘要：Family ${JSON.stringify(item.summary.exerciseFamilies)}；Fatigue ${JSON.stringify(item.summary.fatigueTags)}；Recovery ${JSON.stringify(item.summary.recoveryCosts)}` : "Planner 摘要：-",
    "",
    ...item.days.flatMap(day => [
      `### ${day.day} · ${day.theme} · ${day.estimatedDuration} 分钟`,
      "",
      table(day.rows.map(row => ({
        顺序: row.order,
        动作ID: row.exerciseId,
        动作名称: row.name,
        模式: row.movementPattern,
        Family: row.exerciseFamily,
        角色: row.exerciseRole,
        Priority: row.priority,
        Recovery: row.recoveryCost,
        Fatigue: row.fatigueTags,
        Score: row.plannerScore,
        难度: row.difficulty,
        组数: row.sets,
        目标: row.target,
        追踪: row.trackingMode,
        肌肉量: row.countsTowardMuscleVolume ? "是" : "否",
        匹配器械: row.matchedEquipmentOption?.join("+") || "-",
        估时: row.estimatedMinutes,
        替换候选: row.alternatives.join(", ") || "-"
      })), ["顺序", "动作ID", "动作名称", "模式", "Family", "角色", "Priority", "Recovery", "Fatigue", "Score", "难度", "组数", "目标", "追踪", "肌肉量", "匹配器械", "估时", "替换候选"]),
      "",
      table(day.rows.map(row => ({
        动作ID: row.exerciseId,
        选择原因: row.plannerReason
      })), ["动作ID", "选择原因"]),
      ""
    ])
  ]),
  "## 当前已知限制",
  "",
  "- 当前生成器是确定性排序，没有真正的随机 seed；报告记录固定 seed 作为审计标识。",
  "- 间接有效组采用简单 0.5 权重估算，只用于防止明显过量，不代表完整运动科学模型。",
  "- 中文历史编码污染仍存在于旧源码字符串中；本报告和新增测试优先使用稳定动作 ID / equipment ID。",
  ""
].join("\n");

await writeFile(jsonPath, JSON.stringify({
  generatedAt: GENERATED_AT,
  seed: SEED,
  plannerScoreWeights: PLANNER_SCORE_WEIGHTS,
  recommendedWeeklySets: RECOMMENDED_WEEKLY_SETS,
  familyStats,
  priorityRows,
  recoveryRows,
  fatigueRows,
  scenarios: audited
}, null, 2), "utf8");
await writeFile(mdPath, md, "utf8");

const failures = audited.filter(item => {
  if (item.expectedFailure) return item.errors.length === 0;
  return item.errors.length || item.invariantErrors.length;
});

console.log(JSON.stringify({
  generatedAt: GENERATED_AT,
  seed: SEED,
  scenarioCount: audited.length,
  report: mdPath,
  json: jsonPath,
  failures: failures.map(item => ({ name: item.name, errors: item.errors, invariantErrors: item.invariantErrors }))
}, null, 2));

if (failures.length) process.exitCode = 1;
