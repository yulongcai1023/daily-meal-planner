import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../workout-engine.js", import.meta.url), "utf8");
const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(source)}`;
const {
  EXERCISES,
  generateWorkoutPlan,
  getExerciseAlternatives,
  scoreWeeklySchedule,
  validateSplitCompatibility,
  validateWeeklySchedule,
  validateWorkoutPlan
} = await import(moduleUrl);

const base = {
  primaryGoal: "muscleGain",
  secondaryGoal: "health",
  experienceLevel: "beginner",
  weeklyTrainingDays: 3,
  sessionDuration: 45,
  trainingLocation: "homeSimple",
  availableEquipment: ["无器械", "瑜伽垫", "弹力带", "可调哑铃", "固定哑铃"],
  limitations: ["无明显限制"],
  priorityMuscles: ["全身均衡"],
  preferredStyles: ["喜欢力量训练"],
  selectedSplit: "fullBody",
  cardioPreference: "after",
  dislikedExercises: []
};

const makePlan = (overrides = {}) => {
  const result = generateWorkoutPlan({ ...base, ...overrides }, { age: 30, sex: "male", height: 175, weight: 72 });
  assert.deepEqual(result.errors, [], `plan failed: ${(result.errors || []).join("; ")}`);
  assert.ok(result.plan, "plan should exist");
  return result.plan;
};

const trainingDays = plan => plan.days.filter(day => !day.isRest);
const exerciseNames = plan => trainingDays(plan).flatMap(day => day.exercises.map(exercise => exercise.name));
const allExercises = plan => trainingDays(plan).flatMap(day => day.exercises);
const equipmentUsed = plan => allExercises(plan).flatMap(exercise => exercise.equipment);
const trainingIndexes = plan => plan.days.map((day, index) => day.isRest ? null : index).filter(index => index !== null);

assert.ok(EXERCISES.length >= 60, "exercise library should be broad enough");

{
  const plan = makePlan({ weeklyTrainingDays: 3, selectedSplit: "fullBody" });
  assert.equal(trainingDays(plan).length, 3);
  assert.equal(plan.days.length, 7);
  assert.deepEqual(trainingIndexes(plan), [0, 2, 4], "3-day plan should be distributed across the week");
  assert.equal(validateWeeklySchedule(plan.days, plan.settings).ok, true);
  assert.ok(scoreWeeklySchedule(plan.days).score >= 90);
}

{
  const result = generateWorkoutPlan({ ...base, selectedSplit: "six", weeklyTrainingDays: 2 });
  assert.equal(result.plan, null);
  assert.ok(result.errors.some(text => text.includes("每周 2 练")));
}

{
  const result = generateWorkoutPlan({ ...base, selectedSplit: "five", weeklyTrainingDays: 3 });
  assert.equal(result.plan, null);
  assert.ok(result.errors.some(text => text.includes("每周 3 练")));
}

{
  assert.equal(validateSplitCompatibility({ weeklyTrainingDays: 2, selectedSplit: "six" }).ok, false);
  assert.equal(validateSplitCompatibility({ weeklyTrainingDays: 6, selectedSplit: "ppl" }).ok, true);
}

{
  const plan = makePlan({ trainingLocation: "homeNone", availableEquipment: ["无器械"] });
  assert.ok(equipmentUsed(plan).every(item => item === "无器械"));
}

{
  const plan = makePlan({ trainingLocation: "homeSimple", availableEquipment: ["无器械", "瑜伽垫", "可调哑铃"] });
  assert.ok(!equipmentUsed(plan).some(item => ["杠铃", "拉力器", "腿举机", "器械推胸"].includes(item)));
}

{
  const plan = makePlan({ trainingLocation: "commercialGym", selectedSplit: "ppl", availableEquipment: ["无器械", "瑜伽垫", "固定哑铃", "卧推凳"] });
  assert.ok(!equipmentUsed(plan).includes("杠铃"));
}

{
  const plan = makePlan({
    trainingLocation: "homeSimple",
    selectedSplit: "ppl",
    availableEquipment: ["无器械", "瑜伽垫", "器械推胸", "器械肩推", "高位下拉器", "腿举机", "腿屈伸机", "腿弯举机"]
  });
  assert.deepEqual(trainingDays(plan).map(day => day.theme), ["推", "拉", "腿"]);
  assert.ok(equipmentUsed(plan).some(item => ["器械推胸", "器械肩推", "高位下拉器", "腿举机"].includes(item)));
  const pullDay = trainingDays(plan).find(day => day.theme === "拉");
  assert.ok(!pullDay.exercises.some(row => /腿|臀/.test(row.category)));
}

{
  const plan = makePlan({ limitations: ["膝盖不适", "不适合高冲击"] });
  assert.ok(!exerciseNames(plan).some(name => /跑步|开合跳|高抬腿|跳绳/.test(name)));
}

{
  const plan = makePlan({ limitations: ["肩部不适"] });
  assert.ok(!exerciseNames(plan).some(name => /肩推|推举/.test(name)));
}

{
  const plan = makePlan({ limitations: ["腰部不适"], availableEquipment: ["无器械", "瑜伽垫", "可调哑铃", "固定哑铃"] });
  assert.ok(!exerciseNames(plan).some(name => /硬拉|杠铃划船|单臂哑铃划船|超人式|划船机/.test(name)));
}

{
  const plan = makePlan({ dislikedExercises: ["running"], trainingLocation: "commercialGym", availableEquipment: ["无器械", "瑜伽垫", "跑步机", "可调哑铃", "固定哑铃"] });
  assert.ok(!exerciseNames(plan).includes("跑步"));
}

{
  const plan = makePlan({ dislikedExercises: ["伏地挺身"], trainingLocation: "homeNone", availableEquipment: ["无器械"] });
  assert.ok(!exerciseNames(plan).includes("俯卧撑"));
}

{
  const plan = makePlan({ selectedSplit: "upperLower", weeklyTrainingDays: 4 });
  for (let i = 1; i < plan.days.length; i++) {
    assert.ok(!(/腿|臀/.test(plan.days[i - 1].theme) && /腿|臀/.test(plan.days[i].theme)), "no consecutive leg/glute days");
  }
}

{
  const plan = makePlan();
  assert.ok(trainingDays(plan).every(day => day.exercises.every(row => row.sets && row.reps && row.restSeconds !== undefined && row.intensity)));
}

{
  const alt = getExerciseAlternatives("push_up", base);
  assert.ok(Array.isArray(alt));
  assert.ok(alt.every(item => item.id !== "push_up"));
  assert.ok(alt.every(item => item.movementPattern === "水平推"));
}

{
  const settings = { ...base, limitations: ["肩部不适"], availableEquipment: ["无器械", "瑜伽垫", "可调哑铃", "固定哑铃"] };
  const alt = getExerciseAlternatives("push_up", settings);
  assert.ok(!alt.some(item => item.contraindications.includes("肩部不适") || item.movementPattern === "垂直推"));
}

{
  const settings = { ...base, trainingLocation: "homeNone", availableEquipment: ["无器械"] };
  const alt = getExerciseAlternatives("push_up", settings);
  assert.ok(alt.every(item => item.equipment.every(equipment => equipment === "无器械")));
}

{
  const plan = makePlan({ sessionDuration: 20, cardioPreference: "none" });
  assert.ok(trainingDays(plan).every(day => day.estimatedDuration <= 25));
}

{
  const plan = makePlan({ experienceLevel: "beginner0", weeklyTrainingDays: 3, sessionDuration: 35 });
  const totalSets = trainingDays(plan).reduce((sum, day) => sum + day.exercises.reduce((inner, row) => inner + row.sets, 0), 0);
  assert.ok(totalSets <= 36);
}

{
  const plan = makePlan({ selectedSplit: "ppl", weeklyTrainingDays: 3 });
  assert.deepEqual(trainingDays(plan).map(day => day.theme), ["推", "拉", "腿"]);
  assert.deepEqual(trainingIndexes(plan), [0, 2, 4]);
  const byTheme = Object.fromEntries(trainingDays(plan).map(day => [day.theme, day.exercises.map(row => row.name)]));
  assert.ok(!byTheme["拉"].some(name => /俯卧撑|深蹲|箭步蹲/.test(name)));
  assert.ok(!byTheme["腿"].some(name => /俯卧撑|下拉|引体|面拉/.test(name)));
  assert.equal(new Set(trainingDays(plan).map(day => day.exercises[0]?.name)).size, 3);
}

{
  const result = generateWorkoutPlan({ ...base, selectedSplit: "ppl", trainingLocation: "homeNone", availableEquipment: ["无器械"], cardioPreference: "none" });
  assert.deepEqual(result.errors, []);
  assert.ok(result.plan);
  const days = trainingDays(result.plan);
  assert.deepEqual(days.map(day => day.theme), ["推", "拉", "腿"]);
  assert.ok(days.find(day => day.theme === "拉").exercises.length > 0);
  assert.ok(days.find(day => day.theme === "腿").exercises.some(row => ["自重深蹲", "臀桥", "提踵", "靠墙静蹲", "箭步蹲", "台阶踏步"].includes(row.name)));
  assert.ok(equipmentUsed(result.plan).every(item => item === "无器械"));
}

{
  const result = generateWorkoutPlan({ ...base, selectedSplit: "ppl", trainingLocation: "homeNone", availableEquipment: ["无器械"], limitations: ["腰部不适"], cardioPreference: "none" });
  assert.deepEqual(result.errors, []);
  assert.ok(result.plan);
  const days = trainingDays(result.plan);
  assert.ok(days.find(day => day.theme === "拉").exercises.every(row => row.equipment.every(item => item === "无器械")));
  assert.ok(days.find(day => day.theme === "腿").exercises.length > 0);
}

{
  const plan = makePlan({ selectedSplit: "upperLower", weeklyTrainingDays: 4 });
  assert.deepEqual(trainingDays(plan).map(day => day.theme), ["上肢A", "下肢A", "上肢B", "下肢B"]);
}

{
  const plan = makePlan({ trainingLocation: "commercialGym", selectedSplit: "ppl", experienceLevel: "intermediate", availableEquipment: ["无器械", "瑜伽垫", "杠铃", "深蹲架", "卧推凳", "拉力器", "高位下拉器", "腿举机", "器械推胸", "器械肩推", "可调哑铃", "固定哑铃"] });
  assert.ok(equipmentUsed(plan).some(item => ["杠铃", "拉力器", "高位下拉器", "腿举机", "器械推胸", "器械肩推"].includes(item)));
}

{
  const plan = makePlan({ selectedSplit: "fullBody", weeklyTrainingDays: 3 });
  assert.ok(trainingDays(plan).some(day => day.exercises.some(row => row.category === "核心")));
}

{
  const plan = makePlan();
  plan.days[0].exercises[0].exerciseId = "fake_exercise";
  const validation = validateWorkoutPlan(plan, plan.settings);
  assert.equal(validation.ok, false);
  assert.ok(validation.errors.some(text => text.includes("动作不存在")));
}

{
  const plan = makePlan();
  plan.days[0].exercises[0].exerciseId = "barbell_squat";
  const validation = validateWorkoutPlan(plan, { ...plan.settings, trainingLocation: "homeNone", availableEquipment: ["无器械"] });
  assert.equal(validation.ok, false);
  assert.ok(validation.errors.some(text => text.includes("不适合")));
}

{
  const plan = makePlan({ primaryGoal: "strength", selectedSplit: "ppl", experienceLevel: "intermediate", trainingLocation: "commercialGym", availableEquipment: ["无器械", "杠铃", "深蹲架", "卧推凳", "拉力器", "高位下拉器", "可调哑铃", "固定哑铃"] });
  assert.ok(allExercises(plan).some(row => row.reps === "3–6次" && row.restSeconds === 180));
}

{
  const result = generateWorkoutPlan({ ...base, primaryGoal: "health", secondaryGoal: "health" });
  assert.equal(result.plan, null);
  assert.ok(result.errors.some(text => text.includes("不能相同")));
}

{
  const plan = makePlan();
  assert.ok(trainingDays(plan).every(day => day.estimatedCaloriesRange?.min < day.estimatedCaloriesRange?.max));
}

{
  const plan = makePlan();
  const uniqueInstructionBlocks = new Set(allExercises(plan).map(row => row.instructions.join("|")));
  assert.ok(uniqueInstructionBlocks.size > 2);
}

{
  const plan = makePlan({ cardioPreference: "none" });
  assert.ok(trainingDays(plan).every(day => day.cardio === null));
}

{
  const plan = makePlan({ cardioPreference: "after" });
  assert.ok(trainingDays(plan).some(day => day.cardio || day.estimatedDuration <= plan.settings.sessionDuration));
}

console.log("Workout engine tests passed: 34 cases");
