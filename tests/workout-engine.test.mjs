import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../workout-engine.js", import.meta.url), "utf8");
const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(source)}`;
const {
  EXERCISES,
  generateWorkoutPlan,
  getExerciseAlternatives,
  isExerciseAllowed,
  compareLoadProgress,
  isWorkoutSetComplete,
  normalizeWorkoutLogEntry,
  resolveExerciseTrackingMode,
  validateExerciseProgressionGraph,
  validateExerciseLibrary,
  scoreWeeklySchedule,
  shouldProgressExercise,
  shouldRegressExercise,
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
const exerciseIds = plan => allExercises(plan).map(exercise => exercise.exerciseId);

assert.ok(EXERCISES.length >= 60, "exercise library should be broad enough");
assert.ok(EXERCISES.every(exercise => exercise.difficultyScore && exercise.difficultyLevel), "all exercises should have expanded difficulty metadata");
assert.ok(EXERCISES.every(exercise => exercise.skillDifficulty && exercise.strengthRequirement && exercise.fatigueCost), "all exercises should have multi-factor difficulty metadata");
assert.ok(EXERCISES.every(exercise => Array.isArray(exercise.contraindications) && Array.isArray(exercise.cautions) && Array.isArray(exercise.painSensitiveAreas)), "all exercises should split limitation metadata");
assert.ok(EXERCISES.every(exercise => Array.isArray(exercise.regressionIds) && Array.isArray(exercise.progressionIds)), "all exercises should have progression and regression arrays");
assert.ok(EXERCISES.every(exercise => exercise.difficultyScore >= 1 && exercise.difficultyScore <= 5), "difficultyScore must stay within 1-5");
assert.ok(EXERCISES.every(exercise => Array.isArray(exercise.equipmentOptions) && exercise.equipmentOptions.every(option => Array.isArray(option) && option.length)), "all exercises should have AND/OR equipmentOptions");
assert.ok(EXERCISES.every(exercise => exercise.countsAsWorkSet !== undefined && exercise.countsTowardMuscleVolume !== undefined), "all exercises should expose split counting semantics");
assert.ok(EXERCISES.every(exercise => {
  const keys = exercise.equipmentOptions.map(option => [...option].sort().join("+"));
  return keys.length === new Set(keys).size;
}), "equipmentOptions should not contain duplicate normalized combinations");

{
  const graph = validateExerciseProgressionGraph();
  assert.equal(graph.ok, true, graph.errors.join("\n"));
}

{
  const library = validateExerciseLibrary();
  assert.equal(library.ok, true, library.errors.join("\n"));
}

{
  const byId = Object.fromEntries(EXERCISES.map(item => [item.id, item]));
  assert.equal(byId.push_up.difficultyLevel, "beginner");
  assert.equal(byId.barbell_press.difficultyLevel, "intermediate");
  assert.equal(byId.barbell_squat.difficultyLevel, "intermediate");
  assert.equal(byId.rdl.difficultyLevel, "intermediate");
  assert.equal(byId.pull_up.difficultyLevel, "intermediate");
  assert.equal(byId.pull_up.strengthRequirement, 5);
  assert.equal(byId.barbell_curl.difficultyLevel, "beginner");
  assert.equal(byId.preacher_curl.difficultyLevel, "beginner");
  assert.ok(byId.cable_kickback.difficultyScore <= 3);
  assert.ok(byId.lying_leg_raise.difficultyScore >= 3);
  assert.equal(byId.superman.beginnerFriendly, false);
  assert.equal(byId.dip.difficultyScore, 4);
  assert.equal(byId.weighted_dip.difficultyScore, 5);
  assert.equal(byId.bodyweight_single_leg_hinge.difficultyScore, 3.5);
  assert.equal(byId.single_leg_rdl.difficultyScore, 4.5);
}

{
  const byId = Object.fromEntries(EXERCISES.map(item => [item.id, item]));
  const beginnerBarbellSettings = {
    ...base,
    experienceLevel: "beginner",
    trainingLocation: "commercialGym",
    availableEquipment: ["无器械", "杠铃", "牧师椅", "可调哑铃", "固定哑铃"]
  };
  assert.equal(isExerciseAllowed(byId.barbell_curl, beginnerBarbellSettings), true, "beginner with barbell should still allow basic barbell curls");
  assert.equal(isExerciseAllowed(byId.preacher_curl, beginnerBarbellSettings), true, "beginner with equipment should still allow basic preacher curls");
  assert.equal(isExerciseAllowed(byId.bodyweight_squat, { ...base, experienceLevel: "advanced" }), true, "advanced users should still be allowed to use foundational exercises");
}

{
  const byId = Object.fromEntries(EXERCISES.map(item => [item.id, item]));
  assert.ok(!byId.wall_sit.progressionIds.includes("leg_press"));
  assert.ok(!byId.leg_press.progressionIds.includes("leg_extension"));
  assert.ok(!byId.db_rdl.regressionIds.includes("hip_abduction"));
  assert.ok(!byId.rdl.progressionIds.includes("barbell_hip_thrust"));
  assert.ok(!byId.barbell_hip_thrust.regressionIds.includes("rdl"));
  assert.ok(!byId.hip_abduction.progressionIds.includes("db_rdl"));
  assert.ok(!byId.side_plank.progressionIds.includes("lying_leg_raise"));
  assert.ok(!byId.lying_leg_raise.regressionIds.includes("side_plank"));
  assert.ok(!byId.stair_climber.progressionIds.includes("jump_rope"));
  assert.ok(!byId.rowing_machine.progressionIds.includes("stair_climber"));
  assert.ok(!byId.bike.progressionIds.includes("elliptical"));
}

{
  const byId = Object.fromEntries(EXERCISES.map(item => [item.id, item]));
  assert.deepEqual(byId.wall_push_up.progressionIds, ["high_incline_push_up"]);
  assert.deepEqual(byId.high_incline_push_up.progressionIds, ["low_incline_push_up"]);
  assert.deepEqual(byId.low_incline_push_up.progressionIds, ["push_up"]);
  assert.equal(byId.kneeling_push_up.progressionIds.length, 0, "kneeling push-up should not be the only linear progression");
  assert.ok(byId.kneeling_push_up.suggestedNextIds.includes("push_up"));
  assert.ok(byId.kneeling_push_up.alternativeIds.includes("high_incline_push_up"));
  assert.ok(!byId.machine_chest_press.progressionIds.includes("db_bench"));
  assert.ok(byId.machine_chest_press.suggestedNextIds.includes("db_bench"));
  assert.equal(byId.incline_db_bench.difficultyScore, 2.5);
  assert.ok(byId.incline_db_bench.equipmentOptions.every(option => option.includes("adjustable_bench")), "incline dumbbell bench must require adjustable bench");
  assert.equal(byId.barbell_row.difficultyLevel, "intermediate");
  assert.ok(byId.db_shoulder_press.equipmentOptions.every(option => option.some(id => ["bench", "adjustable_bench"].includes(id))), "seated dumbbell shoulder press must require a bench or adjustable bench");
  assert.equal(byId.standing_db_shoulder_press.spinalLoad > byId.db_shoulder_press.spinalLoad, true);
  assert.ok(byId.cable_kickback.coordinationDemand <= 3);
  assert.ok(!byId.step_up.progressionIds.includes("lunge"));
  assert.ok(byId.step_up.alternativeIds.includes("lunge"));
  assert.ok(byId.step_up.equipmentOptions.every(option => option.some(id => ["box", "bench", "stable_platform"].includes(id))), "step-up must always include a stable platform");
  assert.ok(byId.step_up.equipmentOptions.some(option => option.includes("adjustable_dumbbells") && option.includes("box")));
  assert.ok(byId.bulgarian_split_squat.equipmentOptions.every(option => option.some(id => ["bench", "box", "stable_platform"].includes(id))), "Bulgarian split squat must always include rear-foot support");
  assert.ok(byId.bulgarian_split_squat.equipmentOptions.some(option => option.length === 1 && option.includes("bench")), "Bulgarian split squat should support bodyweight version with bench");
  assert.ok(!byId.glute_bridge.alternativeIds.includes("barbell_hip_thrust"));
  assert.deepEqual(byId.glute_bridge.progressionIds, ["weighted_glute_bridge"]);
  assert.ok(byId.plank.regressionIds.includes("incline_plank"));
  assert.ok(byId.plank.regressionIds.includes("knee_plank"));
  assert.ok(byId.incline_plank.equipmentOptions.every(option => option.some(id => ["bench", "box", "chair", "stable_platform"].includes(id))), "incline plank must require raised support");
  assert.deepEqual(byId.plank.progressionIds, ["long_lever_plank"]);
  assert.deepEqual(byId.side_plank_leg_raise.prerequisites, ["side_plank"]);
}

{
  const commercialSettings = {
    ...base,
    experienceLevel: "advanced",
    trainingLocation: "commercialGym",
    availableEquipment: ["无器械", "瑜伽垫", "可调哑铃", "固定哑铃", "腿弯举机", "杠铃", "拉力器"]
  };
  assert.ok(!getExerciseAlternatives("leg_curl", commercialSettings).some(item => item.id === "db_rdl"), "leg curl alternatives shown in plan must preserve knee-flexion pattern");
  assert.ok(!getExerciseAlternatives("db_rdl", commercialSettings).some(item => item.id === "leg_curl"), "RDL alternatives shown in plan must preserve hip-hinge pattern");
}

{
  const byId = Object.fromEntries(EXERCISES.map(item => [item.id, item]));
  assert.equal(isExerciseAllowed(byId.side_plank_leg_raise, { ...base, masteredExerciseIds: [] }), false);
  assert.equal(isExerciseAllowed(byId.side_plank_leg_raise, { ...base, experienceLevel: "advanced", masteredExerciseIds: ["side_plank"] }), true);
  const progress = shouldProgressExercise({ sessionsCompleted: 3, successfulSessions: 3, readyForProgression: true }, byId.side_plank, [{ completed: true, rir: 3 }]);
  assert.ok(progress.nextExerciseIds.includes("side_plank_leg_raise"));
}

{
  const cardio = EXERCISES.filter(item => item.category === "有氧");
  assert.ok(cardio.length);
  assert.ok(cardio.every(item => item.impactLevel && item.intensityPrescription && item.duration && item.resistance && item.intervalStructure));
  assert.ok(new Set(cardio.map(item => item.resistance)).size > 3, "cardio progression copy should vary by modality");
}

{
  const byId = Object.fromEntries(EXERCISES.map(item => [item.id, item]));
  assert.ok(!byId.weighted_push_up.equipment.includes("无器械"));
  assert.ok(!byId.weighted_plank.equipment.includes("无器械"));
  assert.ok(!byId.weighted_side_plank.equipment.includes("无器械"));
  assert.ok(byId.chair_sit_to_stand.equipment.some(item => ["椅子", "卧推凳", "稳定台面"].includes(item)));
  assert.ok(byId.box_squat.equipment.some(item => ["箱子", "卧推凳", "稳定台面"].includes(item)));
  assert.ok(!byId.hip_abduction.alternativeIds.includes("cable_kickback"));
  assert.ok(!byId.cable_kickback.alternativeIds.includes("hip_abduction"));
  assert.equal(byId.standing_reverse_fly.programRole, "activation");
  assert.equal(byId.standing_scapular_retraction.programRole, "activation");
  assert.equal(byId.wall_angel.programRole, "warmup");
  assert.equal(byId.wall_angel.countsTowardEffectiveSets, false);
  assert.deepEqual(byId.assisted_dip_machine.progressionIds, ["band_assisted_dip"]);
  assert.equal(byId.assisted_dip_machine.equipment.includes("辅助臂屈伸机"), true);
  assert.deepEqual(byId.band_assisted_dip.progressionIds, ["dip"]);
  assert.deepEqual(byId.dip.progressionIds, ["weighted_dip"]);
  assert.equal(byId.dip.difficultyScore < byId.weighted_dip.difficultyScore, true);
  assert.equal(byId.barbell_bench.requiresSpotterOrSafetyArms, true);
  assert.equal(byId.incline_barbell_bench.requiresSpotterOrSafetyArms, true);
  assert.equal(byId.close_grip_bench.requiresSpotterOrSafetyArms, true);
  assert.ok(byId.barbell_bench.equipmentOptions.every(option => option.includes("barbell") && option.includes("bench") && option.includes("squat_rack")), "barbell bench must require a true rack, not safety rack alone");
  assert.ok(byId.close_grip_bench.equipmentOptions.every(option => option.includes("barbell") && option.includes("bench") && option.includes("squat_rack")), "close-grip bench must require a true rack, not safety rack alone");
  assert.ok(byId.incline_barbell_bench.equipmentOptions.every(option => option.includes("barbell") && option.includes("adjustable_bench") && option.includes("squat_rack")), "incline barbell bench must require adjustable bench and a true rack");
  assert.equal(isExerciseAllowed(byId.barbell_bench, { ...base, experienceLevel: "advanced", trainingLocation: "commercialGym", availableEquipment: ["杠铃", "卧推凳", "保护架"] }), false, "safety rack alone must not satisfy barbell bench setup");
  assert.equal(isExerciseAllowed(byId.barbell_bench, { ...base, experienceLevel: "advanced", trainingLocation: "commercialGym", availableEquipment: ["杠铃", "卧推凳", "深蹲架"] }), true);
  assert.equal(isExerciseAllowed(byId.incline_db_bench, { ...base, experienceLevel: "advanced", trainingLocation: "homeSimple", availableEquipment: ["可调哑铃", "卧推凳"] }), false, "flat bench must not satisfy incline dumbbell bench");
  assert.equal(isExerciseAllowed(byId.incline_db_bench, { ...base, experienceLevel: "advanced", trainingLocation: "homeSimple", availableEquipment: ["可调哑铃", "可调节卧凳"] }), true);
  assert.equal(isExerciseAllowed(byId.incline_barbell_bench, { ...base, experienceLevel: "advanced", trainingLocation: "commercialGym", availableEquipment: ["杠铃", "卧推凳", "深蹲架"] }), false, "flat bench must not satisfy incline barbell bench");
  assert.equal(isExerciseAllowed(byId.incline_barbell_bench, { ...base, experienceLevel: "advanced", trainingLocation: "commercialGym", availableEquipment: ["杠铃", "可调节卧凳", "深蹲架"] }), true);
  assert.ok(byId.band_pulldown.equipmentOptions.every(option => option.includes("resistance_band") && option.includes("band_anchor")));
  assert.ok(byId.face_pull.equipmentOptions.filter(option => option.includes("resistance_band")).every(option => option.includes("band_anchor")));
  assert.ok(byId.pallof_press.equipmentOptions.filter(option => option.includes("resistance_band")).every(option => option.includes("band_anchor")));
  assert.ok(!byId.hip_abduction.equipmentOptions.some(option => option.includes("resistance_band") && option.includes("band_anchor")));
  assert.equal(isExerciseAllowed(byId.band_pulldown, { ...base, trainingLocation: "homeSimple", availableEquipment: ["弹力带"] }), false);
  assert.equal(isExerciseAllowed(byId.band_pulldown, { ...base, trainingLocation: "homeSimple", availableEquipment: ["弹力带", "弹力带固定点"] }), true);
  assert.equal(isExerciseAllowed(byId.hip_abduction, { ...base, trainingLocation: "homeSimple", availableEquipment: ["弹力带"] }), true, "hip abduction band version should not require an anchor");
  assert.ok(byId.reverse_fly.aliases.includes("弹力带拉开"));
  assert.ok(byId.reverse_fly.instructions.join("").includes("不需要固定点"));
  assert.ok(byId.leg_curl.alternativeDetails.some(item => item.id === "db_rdl" && item.type === "sameMuscleDifferentPattern" && item.requiresPatternCoverageValidation));
  assert.ok(byId.db_rdl.alternativeDetails.some(item => item.id === "glute_bridge" && item.type === "sameMuscleDifferentPattern" && item.requiresPatternCoverageValidation));
  assert.equal(byId.incline_push_up.autoCandidate, false);
  assert.deepEqual(byId.incline_push_up.replacedBy, ["high_incline_push_up", "low_incline_push_up"]);
  assert.ok(byId.incline_push_up.replacedBy.every(id => byId[id] && byId[id].programRole !== "deprecated"));
  assert.equal(byId.chair_sit_to_stand.alternativeIds.includes("bodyweight_squat"), false);
  assert.equal(byId.hip_hinge_drill.alternativeIds.includes("db_rdl"), false);
  assert.equal(byId.lateral_raise.programRole, "workset");
  assert.equal(byId.db_curl.exerciseRole, "isolation");
  assert.equal(byId.triceps_pushdown.programRole, "workset");
  assert.equal(byId.leg_extension.exerciseRole, "isolation");
  assert.equal(byId.leg_curl.programRole, "workset");
  assert.equal(byId.cable_kickback.exerciseRole, "isolation");
  assert.equal(byId.superman.countsTowardEffectiveSets, false);
  assert.equal(byId.weighted_dip.difficultyScore, 5);
  assert.ok(byId.weighted_pull_up.equipmentOptions.some(option => option.includes("pull_up_bar") && option.includes("weighted_vest")));
  assert.ok(byId.weighted_pull_up.equipmentOptions.some(option => option.includes("pull_up_bar") && option.includes("dip_belt") && option.includes("weight_plate")));
  assert.deepEqual(byId.chair_sit_to_stand.equipmentOptions, [["chair"], ["bench"], ["stable_platform"]]);
  assert.equal(byId.weighted_push_up.equipmentOptions.some(option => option.includes("weight_plate")), false);
  assert.equal(byId.weighted_plank.equipmentOptions.some(option => option.includes("weight_plate")), false);
  assert.ok(byId.weighted_plank.equipmentOptions.some(option => option.includes("weighted_vest")));
  assert.ok(byId.weighted_plank.equipmentOptions.some(option => option.includes("secured_sandbag")));
  assert.ok(byId.weighted_plank.equipmentOptions.every(option => !option.includes("yoga_mat")));
  assert.ok(byId.weighted_side_plank.equipmentOptions.some(option => option.includes("weight_plate")));
  assert.ok(byId.weighted_side_plank.equipmentOptions.every(option => !option.includes("yoga_mat")));
  assert.ok(byId.weighted_plank.equipmentOptionSafety.some(item => item.option.includes("secured_sandbag") && item.requiresSecuredLoad));
  assert.ok(["plank", "side_plank", "dead_bug", "bird_dog", "crunch", "reverse_crunch", "lying_leg_raise", "superman", "glute_bridge"].every(id => byId[id].equipmentOptions.some(option => option.includes("bodyweight"))), "floor exercises must remain executable without yoga mat");
  assert.equal(byId.hip_hinge_drill.exerciseRole, "skill_drill");
  assert.equal(byId.hip_hinge_drill.programRole, "activation");
  assert.equal(byId.hip_hinge_drill.countsTowardEffectiveSets, false);
  assert.equal(byId.single_leg_rdl.equipment.includes("杠铃片"), false);
  assert.equal(byId.barbell_squat.requiresRack, true);
  assert.equal(byId.barbell_squat.requiresSafetyArmsOrSpotterForHeavySets, true);
  assert.equal(byId.farmer_carry.exerciseRole, "loaded_carry");
  assert.equal(byId.farmer_carry.countsAsWorkSet, true);
  assert.equal(byId.farmer_carry.countsTowardMuscleVolume, false);
  assert.equal(byId.farmer_carry.trackingMode, "distance");
  assert.equal(byId.farmer_carry.loadEntryMode, "per_implement");
  assert.equal(byId.farmer_carry.loadDirection, "resistance");
  assert.equal(isWorkoutSetComplete({ weight: 24, distanceMeters: 30 }, byId.farmer_carry), true);
  assert.equal(normalizeWorkoutLogEntry({ reps: 30 }, byId.farmer_carry).distanceMeters, undefined);
  assert.equal(byId.plank.countsAsWorkSet, true);
  assert.equal(byId.plank.countsTowardMuscleVolume, false);
  assert.equal(byId.plank.trackingMode, "duration");
  assert.equal(normalizeWorkoutLogEntry({ reps: 30 }, byId.plank).durationSeconds, undefined);
  assert.equal(byId.dead_bug.trackingMode, "reps_per_side");
  assert.equal(byId.pallof_press.trackingMode, "reps_per_side");
  assert.equal(byId.wall_sit.trackingMode, "duration");
  assert.equal(byId.wall_sit.countsTowardMuscleVolume, false);
  assert.ok(["crunch", "reverse_crunch", "hanging_leg_raise", "lying_leg_raise"].every(id => byId[id].countsAsWorkSet === true && byId[id].countsTowardMuscleVolume === true && byId[id].trackingMode === "reps"));
  assert.ok(["plank", "side_plank", "dead_bug", "bird_dog", "pallof_press", "incline_plank", "knee_plank", "long_lever_plank", "knee_side_plank", "side_plank_leg_raise", "weighted_plank", "weighted_side_plank"].every(id => byId[id].countsAsWorkSet === true && byId[id].countsTowardMuscleVolume === false));
  assert.ok(["push_up", "db_bench", "barbell_bench", "machine_chest_press", "lat_pulldown", "barbell_row", "db_curl", "bodyweight_squat", "glute_bridge"].every(id => resolveExerciseTrackingMode(byId[id]) === "reps"));
  assert.ok(["one_arm_db_row", "bulgarian_split_squat", "lunge", "step_up", "cable_kickback", "bodyweight_single_leg_hinge", "single_leg_rdl", "side_plank_leg_raise", "dead_bug", "bird_dog", "pallof_press"].every(id => byId[id].trackingMode === "reps_per_side"));
  assert.equal(normalizeWorkoutLogEntry({ reps: 10 }, byId.one_arm_db_row).repsPerSide, 10);
  assert.equal(isWorkoutSetComplete({ repsPerSide: 10 }, byId.step_up), true);
  assert.equal(byId.step_up.difficultyScope, "base_movement_pattern");
  assert.equal(byId.bulgarian_split_squat.difficultyScope, "base_movement_pattern");
  assert.equal(byId.box_squat.name, "徒手箱式深蹲");
  assert.ok(byId.box_squat.aliases.includes("箱式深蹲"));
  assert.equal(byId.pallof_press.name, "帕洛夫抗旋转推");
  assert.ok(byId.pallof_press.aliases.includes("Pallof Press"));
  assert.ok(byId.preacher_curl.equipmentOptions.every(option => option.includes("preacher_bench") && option.some(id => ["adjustable_dumbbells", "fixed_dumbbells", "barbell"].includes(id))));
  assert.ok(byId.bulgarian_split_squat.equipmentOptions.some(option => option.includes("kettlebell") && option.includes("bench")));
  assert.ok(byId.bulgarian_split_squat.equipmentOptions.some(option => option.includes("kettlebell") && option.includes("box")));
  assert.ok(byId.bulgarian_split_squat.equipmentOptions.some(option => option.includes("kettlebell") && option.includes("stable_platform")));
  const cardioIds = ["mountain_climber", "jumping_jack", "high_knee", "brisk_walk", "running", "elliptical", "bike", "rowing_machine", "stair_climber", "jump_rope", "low_impact_circuit"];
  assert.ok(cardioIds.every(id => byId[id].countsAsWorkSet === true && byId[id].countsTowardMuscleVolume === false && byId[id].trackingMode === "duration"));
  assert.equal(isWorkoutSetComplete({ durationSeconds: 600 }, byId.bike), true);
  assert.equal(byId.running.trackingMode, "duration");
  assert.equal(byId.jump_rope.trackingMode, "duration");
  assert.equal(byId.rowing_machine.countsTowardMuscleVolume, false);
  assert.equal(byId.assisted_pull_up_machine.loadDirection, "assistance");
  assert.equal(byId.weighted_pull_up.loadDirection, "resistance");
  assert.equal(compareLoadProgress({ weight: 40 }, { weight: 45 }, byId.assisted_pull_up_machine).improved, false);
  assert.equal(compareLoadProgress({ weight: 45 }, { weight: 40 }, byId.assisted_pull_up_machine).improved, true);
  assert.equal(compareLoadProgress({ weight: 10 }, { weight: 15 }, byId.weighted_pull_up).improved, true);
  assert.ok(["standing_scapular_retraction", "wall_angel", "hip_hinge_drill", "superman"].every(id => byId[id].countsAsWorkSet === false && byId[id].countsTowardMuscleVolume === false));
  assert.equal(byId.barbell_squat.alternativeIds.includes("leg_press"), false);
  const squatAlternatives = getExerciseAlternatives("barbell_squat", {
    ...base,
    experienceLevel: "advanced",
    trainingLocation: "commercialGym",
    availableEquipment: ["杠铃", "深蹲架", "史密斯机", "可调哑铃", "固定哑铃", "壶铃", "腿举机"]
  }).map(item => item.id);
  assert.ok(squatAlternatives.includes("smith_squat") || squatAlternatives.includes("goblet_squat"));
  assert.equal(squatAlternatives.includes("leg_press"), false);
}

{
  const plan = makePlan({ selectedSplit: "ppl", trainingLocation: "homeSimple", availableEquipment: ["无器械", "瑜伽垫", "可调哑铃", "固定哑铃"], cardioPreference: "none" });
  assert.ok(!exerciseIds(plan).includes("standing_reverse_fly"));
  assert.ok(!exerciseIds(plan).includes("standing_scapular_retraction"));
  assert.ok(!exerciseIds(plan).includes("wall_angel"));
  assert.ok(trainingDays(plan).every(day => !["推", "拉", "腿"].includes(day.theme) || day.exercises[0]?.exerciseId !== "farmer_carry"), "farmer carry must not be the sole leading compound for push/pull/leg days");
}

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
  assert.ok(equipmentUsed(plan).every(item => item === "无器械" || item === "瑜伽垫"));
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
  assert.ok(trainingDays(plan).every(day => day.exercises.every(row => row.sets && row.reps && row.targetLabel && row.trackingMode && row.restSeconds !== undefined && row.intensity)));
  assert.ok(allExercises(plan).filter(row => row.trackingMode === "reps_per_side").every(row => row.targetLabel.includes("每侧")));
  assert.ok(allExercises(plan).filter(row => ["duration", "distance"].includes(row.trackingMode)).every(row => !row.targetLabel.includes("次")));
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
  assert.ok(equipmentUsed(result.plan).every(item => item === "无器械" || item === "瑜伽垫"));
}

{
  const result = generateWorkoutPlan({ ...base, selectedSplit: "ppl", trainingLocation: "homeNone", availableEquipment: ["无器械"], limitations: ["腰部不适"], cardioPreference: "none" });
  assert.deepEqual(result.errors, []);
  assert.ok(result.plan);
  const days = trainingDays(result.plan);
  assert.ok(days.find(day => day.theme === "拉").exercises.every(row => row.equipment.every(item => item === "无器械" || item === "瑜伽垫")));
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

{
  const common = {
    trainingLocation: "commercialGym",
    selectedSplit: "ppl",
    weeklyTrainingDays: 3,
    availableEquipment: ["无器械", "瑜伽垫", "可调哑铃", "固定哑铃", "杠铃", "深蹲架", "卧推凳", "拉力器", "高位下拉器", "腿举机", "器械推胸", "器械肩推", "史密斯机", "双杠", "引体向上杆"]
  };
  const beginnerPlan = makePlan({ ...common, experienceLevel: "beginner" });
  const intermediatePlan = makePlan({ ...common, experienceLevel: "intermediate" });
  const advancedPlan = makePlan({ ...common, experienceLevel: "advanced" });
  assert.notDeepEqual(exerciseIds(beginnerPlan), exerciseIds(intermediatePlan), "beginner and intermediate should not only differ by sets");
  assert.notDeepEqual(exerciseIds(intermediatePlan), exerciseIds(advancedPlan), "intermediate and advanced should not only differ by sets");
  assert.ok(allExercises(beginnerPlan).every(row => (EXERCISES.find(item => item.id === row.exerciseId)?.difficultyScore || 2) <= 3));
  assert.ok(allExercises(intermediatePlan).some(row => (EXERCISES.find(item => item.id === row.exerciseId)?.difficultyScore || 2) >= 3));
  assert.ok(allExercises(advancedPlan).some(row => (EXERCISES.find(item => item.id === row.exerciseId)?.difficultyScore || 2) >= 4));
}

{
  const plan = makePlan({ experienceLevel: "beginner0", trainingLocation: "homeSimple", availableEquipment: ["无器械", "瑜伽垫", "弹力带", "引体向上杆"], selectedSplit: "fullBody" });
  assert.ok(!exerciseNames(plan).includes("引体向上"), "complete novice should not get standard pull-up");
  assert.ok(allExercises(plan).some(row => ["死虫", "鸟狗", "平板支撑"].includes(row.name)), "complete novice core should prioritize low-skill core drills");
}

{
  const plan = makePlan({ experienceLevel: "beginner", selectedSplit: "ppl", trainingLocation: "commercialGym", availableEquipment: ["无器械", "瑜伽垫", "杠铃", "深蹲架", "卧推凳", "器械推胸", "高位下拉器", "腿举机"] });
  assert.ok(!exerciseNames(plan).includes("杠铃深蹲"), "beginner should not default to high-load barbell squat");
}

{
  const alt = getExerciseAlternatives("push_up", { ...base, experienceLevel: "beginner", trainingLocation: "commercialGym", availableEquipment: ["无器械", "瑜伽垫", "杠铃", "卧推凳", "器械推胸", "可调哑铃", "固定哑铃"] });
  assert.ok(!alt.some(item => item.difficultyScore >= 4), "beginner replacement should not jump to advanced difficulty");
}

{
  const pushUp = EXERCISES.find(item => item.id === "push_up");
  const progress = shouldProgressExercise({ sessionsCompleted: 3, successfulSessions: 3, readyForProgression: true }, pushUp, [{ completed: true, rir: 3 }]);
  assert.equal(progress.shouldProgress, true);
  assert.ok(progress.nextExerciseIds.length);
  const regress = shouldRegressExercise({ painReported: true }, pushUp, []);
  assert.equal(regress.shouldRegress, true);
  assert.ok(regress.regressionExerciseIds.length);
}

console.log("Workout engine tests passed: 41 cases");
