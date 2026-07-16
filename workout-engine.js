const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const DIFFICULTY_ORDER = {
  beginner0: 0,
  beginner: 1,
  novice: 2,
  intermediate: 3,
  advanced: 4
};

const LOCATION_EQUIPMENT = {
  homeNone: ["无器械", "瑜伽垫"],
  homeSimple: ["无器械", "瑜伽垫", "弹力带", "可调哑铃", "固定哑铃", "壶铃", "跳绳", "引体向上杆"],
  apartmentGym: ["无器械", "瑜伽垫", "弹力带", "可调哑铃", "固定哑铃", "壶铃", "跑步机", "椭圆机", "单车", "划船机", "引体向上杆", "卧推凳", "拉力器", "高位下拉器"],
  commercialGym: ["无器械", "瑜伽垫", "弹力带", "可调哑铃", "固定哑铃", "壶铃", "杠铃", "深蹲架", "史密斯机", "卧推凳", "拉力器", "高位下拉器", "腿举机", "腿屈伸机", "腿弯举机", "跑步机", "椭圆机", "单车", "划船机", "引体向上杆", "双杠", "牧师椅", "爬楼机", "器械推胸", "器械肩推", "髋外展机"],
  outdoor: ["无器械", "瑜伽垫", "弹力带", "跳绳"]
};

const ex = ({
  id, name, englishName, category, primaryMuscles, secondaryMuscles = [], movementPattern,
  equipment = ["无器械"], difficulty = "beginner", suitableLocations = ["homeNone", "homeSimple", "apartmentGym", "commercialGym", "outdoor"],
  contraindications = [], alternatives = [], instructions = [], commonMistakes = [], defaultRepRange = "8–12次",
  defaultRestSeconds = 90, isCompound = true, isUnilateral = false, tags = []
}) => ({
  id,
  name,
  englishName,
  category,
  primaryMuscles,
  secondaryMuscles,
  movementPattern,
  equipment,
  difficulty,
  suitableLocations,
  contraindications,
  alternatives,
  instructions: instructions.length ? instructions : defaultInstructions({ name, movementPattern, category }),
  commonMistakes: commonMistakes.length ? commonMistakes : defaultMistakes({ movementPattern, category }),
  videoUrl: "",
  imageUrl: "",
  defaultRepRange,
  defaultRestSeconds,
  isCompound,
  isUnilateral,
  tags
});

function defaultInstructions({ name, movementPattern, category }) {
  const sharedStop = "出现尖锐疼痛、眩晕或异常不适时立即停止。";
  if (/水平推|垂直推/.test(movementPattern)) return ["肩胛保持稳定，推起时不要耸肩。", "按目标次数完成，保留规定 RIR，避免反弹借力。", sharedStop];
  if (/水平拉|垂直拉/.test(movementPattern)) return ["先稳定肩胛，再带动手臂完成拉动。", "控制还原速度，感受背部或目标肌群发力。", sharedStop];
  if (/深蹲|弓步|膝伸|膝屈/.test(movementPattern)) return ["脚掌稳定踩实，膝盖方向与脚尖大致一致。", "保持躯干稳定，在可控范围内完成目标次数。", sharedStop];
  if (/髋铰链|髋伸|髋外展/.test(movementPattern)) return ["以髋部发力为主，保持脊柱中立。", "顶峰短暂停顿，避免用腰部代偿。", sharedStop];
  if (/抗|躯干|骨盆|核心/.test(`${movementPattern}${category}`)) return ["保持呼吸稳定，先收紧核心再开始动作。", "动作过程中避免腰椎塌陷或身体晃动。", sharedStop];
  if (/有氧|循环|稳态/.test(`${movementPattern}${category}`)) return ["从低强度开始，逐步进入目标节奏。", "保持可控呼吸，动作幅度以舒适安全为先。", sharedStop];
  return [`完成 ${name} 时保持节奏稳定。`, "按目标次数完成，保留规定 RIR。", sharedStop];
}

function defaultMistakes({ movementPattern, category }) {
  if (/水平推|垂直推/.test(movementPattern)) return ["耸肩代偿", "下放过快", "为了重量牺牲动作幅度"];
  if (/水平拉|垂直拉/.test(movementPattern)) return ["只用手臂拉", "身体大幅后仰借力", "还原阶段失控"];
  if (/深蹲|弓步/.test(movementPattern)) return ["膝盖内扣", "脚跟离地", "下蹲深度超过可控范围"];
  if (/髋铰链|髋伸/.test(movementPattern)) return ["弓背", "用腰硬顶", "重量离身体过远"];
  if (/核心/.test(category)) return ["憋气过久", "腰部塌陷", "动作速度过快"];
  return ["动作过快", "目标肌群失去控制", "为了完成次数牺牲动作质量"];
}

const chest = ["胸"];
const back = ["背"];
const shoulder = ["肩"];
const arm = ["手臂"];
const quad = ["腿"];
const glute = ["臀"];
const hamstring = ["腿", "臀"];
const core = ["核心"];

export const EXERCISES = [
  ex({ id: "push_up", name: "俯卧撑", englishName: "Push-up", category: "胸", primaryMuscles: chest, secondaryMuscles: ["手臂", "核心"], movementPattern: "水平推", equipment: ["无器械"], difficulty: "beginner", contraindications: ["手腕不适", "肩部不适"], alternatives: ["incline_push_up", "machine_chest_press"] }),
  ex({ id: "kneeling_push_up", name: "跪姿俯卧撑", englishName: "Kneeling Push-up", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["无器械"], difficulty: "beginner0", contraindications: ["手腕不适"], alternatives: ["incline_push_up"], defaultRepRange: "8–15次", defaultRestSeconds: 60 }),
  ex({ id: "incline_push_up", name: "上斜俯卧撑", englishName: "Incline Push-up", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["无器械"], difficulty: "beginner0", alternatives: ["kneeling_push_up", "push_up"] }),
  ex({ id: "db_bench", name: "哑铃卧推", englishName: "Dumbbell Bench Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["可调哑铃", "固定哑铃", "卧推凳"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["push_up", "machine_chest_press"] }),
  ex({ id: "incline_db_bench", name: "上斜哑铃卧推", englishName: "Incline Dumbbell Bench Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["可调哑铃", "固定哑铃", "卧推凳"], difficulty: "intermediate", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_bench"] }),
  ex({ id: "barbell_bench", name: "杠铃卧推", englishName: "Barbell Bench Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["杠铃", "卧推凳"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_bench", "machine_chest_press"] }),
  ex({ id: "incline_barbell_bench", name: "上斜杠铃卧推", englishName: "Incline Barbell Bench Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["杠铃", "卧推凳"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["incline_db_bench"] }),
  ex({ id: "machine_chest_press", name: "器械推胸", englishName: "Machine Chest Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["器械推胸"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_bench", "push_up"] }),
  ex({ id: "db_fly", name: "哑铃飞鸟", englishName: "Dumbbell Fly", category: "胸", primaryMuscles: chest, movementPattern: "夹胸", equipment: ["可调哑铃", "固定哑铃", "卧推凳"], difficulty: "intermediate", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["cable_fly"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "cable_fly", name: "绳索夹胸", englishName: "Cable Fly", category: "胸", primaryMuscles: chest, movementPattern: "夹胸", equipment: ["拉力器"], difficulty: "intermediate", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_fly"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),

  ex({ id: "lat_pulldown", name: "高位下拉", englishName: "Lat Pulldown", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["高位下拉器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["band_pulldown", "assisted_pull_up"] }),
  ex({ id: "band_pulldown", name: "弹力带下拉", englishName: "Band Pulldown", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["弹力带"], difficulty: "beginner0", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym", "outdoor"], alternatives: ["lat_pulldown"] }),
  ex({ id: "assisted_pull_up", name: "辅助引体向上", englishName: "Assisted Pull-up", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["引体向上杆", "弹力带"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适", "肘部不适"], alternatives: ["lat_pulldown"] }),
  ex({ id: "pull_up", name: "引体向上", englishName: "Pull-up", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["引体向上杆"], difficulty: "advanced", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym", "outdoor"], contraindications: ["肩部不适", "肘部不适"], alternatives: ["lat_pulldown"] }),
  ex({ id: "seated_row", name: "坐姿划船", englishName: "Seated Cable Row", category: "背", primaryMuscles: back, movementPattern: "水平拉", equipment: ["拉力器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["腰部不适"], alternatives: ["one_arm_db_row"] }),
  ex({ id: "one_arm_db_row", name: "单臂哑铃划船", englishName: "One-arm Dumbbell Row", category: "背", primaryMuscles: back, movementPattern: "水平拉", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["腰部不适"], alternatives: ["chest_supported_row"], defaultRepRange: "8–12次/侧", isUnilateral: true }),
  ex({ id: "chest_supported_row", name: "胸托划船", englishName: "Chest-supported Row", category: "背", primaryMuscles: back, movementPattern: "水平拉", equipment: ["可调哑铃", "固定哑铃", "卧推凳"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], alternatives: ["seated_row"] }),
  ex({ id: "barbell_row", name: "杠铃划船", englishName: "Barbell Row", category: "背", primaryMuscles: back, movementPattern: "水平拉", equipment: ["杠铃"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["腰部不适"], alternatives: ["chest_supported_row"] }),
  ex({ id: "straight_arm_pulldown", name: "直臂下压", englishName: "Straight-arm Pulldown", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["拉力器"], difficulty: "intermediate", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["lat_pulldown"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "face_pull", name: "面拉", englishName: "Face Pull", category: "肩", primaryMuscles: shoulder, secondaryMuscles: back, movementPattern: "水平拉", equipment: ["拉力器", "弹力带"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], alternatives: ["reverse_fly"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "reverse_fly", name: "反向飞鸟", englishName: "Reverse Fly", category: "肩", primaryMuscles: shoulder, movementPattern: "水平拉", equipment: ["可调哑铃", "固定哑铃", "弹力带"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], alternatives: ["face_pull"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false }),

  ex({ id: "db_shoulder_press", name: "哑铃肩推", englishName: "Dumbbell Shoulder Press", category: "肩", primaryMuscles: shoulder, movementPattern: "垂直推", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["machine_shoulder_press"] }),
  ex({ id: "machine_shoulder_press", name: "器械肩推", englishName: "Machine Shoulder Press", category: "肩", primaryMuscles: shoulder, movementPattern: "垂直推", equipment: ["器械肩推"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_shoulder_press"] }),
  ex({ id: "barbell_press", name: "杠铃推举", englishName: "Barbell Overhead Press", category: "肩", primaryMuscles: shoulder, movementPattern: "垂直推", equipment: ["杠铃"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肩部不适", "腰部不适"], alternatives: ["db_shoulder_press"] }),
  ex({ id: "lateral_raise", name: "哑铃侧平举", englishName: "Dumbbell Lateral Raise", category: "肩", primaryMuscles: shoulder, movementPattern: "肩外展", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["cable_lateral_raise"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "cable_lateral_raise", name: "绳索侧平举", englishName: "Cable Lateral Raise", category: "肩", primaryMuscles: shoulder, movementPattern: "肩外展", equipment: ["拉力器"], difficulty: "intermediate", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["lateral_raise"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "front_raise", name: "前平举", englishName: "Front Raise", category: "肩", primaryMuscles: shoulder, movementPattern: "肩屈", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_shoulder_press"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),

  ex({ id: "db_curl", name: "哑铃弯举", englishName: "Dumbbell Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["hammer_curl"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "hammer_curl", name: "锤式弯举", englishName: "Hammer Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["db_curl"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "barbell_curl", name: "杠铃弯举", englishName: "Barbell Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["杠铃"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肘部不适", "手腕不适"], alternatives: ["db_curl"], defaultRepRange: "8–12次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "cable_curl", name: "绳索弯举", englishName: "Cable Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["拉力器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["db_curl"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "preacher_curl", name: "牧师椅弯举", englishName: "Preacher Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["牧师椅"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肘部不适"], alternatives: ["cable_curl"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "triceps_pushdown", name: "绳索下压", englishName: "Cable Triceps Pushdown", category: "手臂", primaryMuscles: arm, movementPattern: "肘伸", equipment: ["拉力器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["close_push_up"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "straight_bar_pushdown", name: "直杆下压", englishName: "Straight-bar Pushdown", category: "手臂", primaryMuscles: arm, movementPattern: "肘伸", equipment: ["拉力器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["triceps_pushdown"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "overhead_extension", name: "过头臂屈伸", englishName: "Overhead Triceps Extension", category: "手臂", primaryMuscles: arm, movementPattern: "肘伸", equipment: ["可调哑铃", "固定哑铃", "拉力器"], difficulty: "intermediate", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适", "肘部不适"], alternatives: ["triceps_pushdown"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "close_push_up", name: "窄距俯卧撑", englishName: "Close-grip Push-up", category: "手臂", primaryMuscles: arm, secondaryMuscles: chest, movementPattern: "水平推", equipment: ["无器械"], difficulty: "intermediate", contraindications: ["手腕不适", "肘部不适"], alternatives: ["triceps_pushdown"] }),
  ex({ id: "dip", name: "双杠臂屈伸", englishName: "Dip", category: "手臂", primaryMuscles: arm, secondaryMuscles: chest, movementPattern: "水平推", equipment: ["双杠"], difficulty: "advanced", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["close_push_up"] }),
  ex({ id: "close_grip_bench", name: "窄握卧推", englishName: "Close-grip Bench Press", category: "手臂", primaryMuscles: arm, secondaryMuscles: chest, movementPattern: "水平推", equipment: ["杠铃", "卧推凳"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肩部不适", "肘部不适"], alternatives: ["triceps_pushdown"] }),

  ex({ id: "bodyweight_squat", name: "自重深蹲", englishName: "Bodyweight Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["无器械"], difficulty: "beginner0", contraindications: ["膝盖不适", "不能做深蹲类动作"], alternatives: ["wall_sit"] }),
  ex({ id: "goblet_squat", name: "高脚杯深蹲", englishName: "Goblet Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["可调哑铃", "固定哑铃", "壶铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["膝盖不适", "不能做深蹲类动作"], alternatives: ["leg_press"] }),
  ex({ id: "barbell_squat", name: "杠铃深蹲", englishName: "Barbell Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["杠铃", "深蹲架"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["膝盖不适", "腰部不适", "不能做深蹲类动作"], alternatives: ["leg_press"] }),
  ex({ id: "smith_squat", name: "史密斯深蹲", englishName: "Smith Machine Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["史密斯机"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["膝盖不适", "不能做深蹲类动作"], alternatives: ["leg_press"] }),
  ex({ id: "leg_press", name: "腿举", englishName: "Leg Press", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["腿举机"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["膝盖不适"], alternatives: ["goblet_squat"] }),
  ex({ id: "bulgarian_split_squat", name: "保加利亚分腿蹲", englishName: "Bulgarian Split Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "弓步", equipment: ["可调哑铃", "固定哑铃"], difficulty: "intermediate", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["膝盖不适"], alternatives: ["step_up"], defaultRepRange: "8–10次/侧", isUnilateral: true }),
  ex({ id: "lunge", name: "箭步蹲", englishName: "Lunge", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "弓步", equipment: ["无器械", "可调哑铃", "固定哑铃"], difficulty: "beginner", contraindications: ["膝盖不适"], alternatives: ["step_up"], defaultRepRange: "8–12次/侧", isUnilateral: true }),
  ex({ id: "step_up", name: "台阶踏步", englishName: "Step-up", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "弓步", equipment: ["无器械", "可调哑铃", "固定哑铃"], difficulty: "beginner", contraindications: ["膝盖不适"], alternatives: ["glute_bridge"], defaultRepRange: "8–12次/侧", isUnilateral: true }),
  ex({ id: "leg_extension", name: "腿屈伸", englishName: "Leg Extension", category: "腿", primaryMuscles: quad, movementPattern: "膝伸", equipment: ["腿屈伸机"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["膝盖不适"], alternatives: ["leg_press"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "rdl", name: "罗马尼亚硬拉", englishName: "Romanian Deadlift", category: "腿", primaryMuscles: hamstring, movementPattern: "髋铰链", equipment: ["杠铃"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["腰部不适", "不能做硬拉类动作"], alternatives: ["glute_bridge"] }),
  ex({ id: "db_rdl", name: "哑铃罗马尼亚硬拉", englishName: "Dumbbell Romanian Deadlift", category: "腿", primaryMuscles: hamstring, movementPattern: "髋铰链", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["腰部不适", "不能做硬拉类动作"], alternatives: ["glute_bridge"] }),
  ex({ id: "leg_curl", name: "腿弯举", englishName: "Leg Curl", category: "腿", primaryMuscles: hamstring, movementPattern: "膝屈", equipment: ["腿弯举机"], difficulty: "beginner", suitableLocations: ["commercialGym"], alternatives: ["db_rdl"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "glute_bridge", name: "臀桥", englishName: "Glute Bridge", category: "臀", primaryMuscles: glute, movementPattern: "髋伸", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner0", alternatives: ["barbell_hip_thrust"] }),
  ex({ id: "barbell_hip_thrust", name: "杠铃臀推", englishName: "Barbell Hip Thrust", category: "臀", primaryMuscles: glute, movementPattern: "髋伸", equipment: ["杠铃", "卧推凳"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["腰部不适"], alternatives: ["glute_bridge"] }),
  ex({ id: "hip_abduction", name: "髋外展", englishName: "Hip Abduction", category: "臀", primaryMuscles: glute, movementPattern: "髋外展", equipment: ["弹力带", "髋外展机"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], alternatives: ["cable_kickback"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "cable_kickback", name: "绳索后踢", englishName: "Cable Kickback", category: "臀", primaryMuscles: glute, movementPattern: "髋伸", equipment: ["拉力器"], difficulty: "intermediate", suitableLocations: ["apartmentGym", "commercialGym"], alternatives: ["glute_bridge"], defaultRepRange: "12–15次/侧", defaultRestSeconds: 60, isCompound: false, isUnilateral: true }),
  ex({ id: "calf_raise", name: "提踵", englishName: "Calf Raise", category: "腿", primaryMuscles: ["小腿"], movementPattern: "踝伸", equipment: ["无器械", "可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeNone", "homeSimple", "apartmentGym", "commercialGym", "outdoor"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "wall_sit", name: "靠墙静蹲", englishName: "Wall Sit", category: "腿", primaryMuscles: quad, movementPattern: "静力", equipment: ["无器械"], difficulty: "beginner0", defaultRepRange: "20–45秒", defaultRestSeconds: 60, isCompound: false }),

  ex({ id: "plank", name: "平板支撑", englishName: "Plank", category: "核心", primaryMuscles: core, movementPattern: "抗伸展", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner0", defaultRepRange: "20–60秒", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "side_plank", name: "侧平板支撑", englishName: "Side Plank", category: "核心", primaryMuscles: core, movementPattern: "抗侧屈", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner", defaultRepRange: "15–45秒/侧", defaultRestSeconds: 60, isCompound: false, isUnilateral: true }),
  ex({ id: "dead_bug", name: "死虫", englishName: "Dead Bug", category: "核心", primaryMuscles: core, movementPattern: "抗伸展", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner0", contraindications: ["腰部不适"], alternatives: ["bird_dog"], defaultRepRange: "8–12次/侧", defaultRestSeconds: 45, isCompound: false, isUnilateral: true }),
  ex({ id: "bird_dog", name: "鸟狗", englishName: "Bird Dog", category: "核心", primaryMuscles: core, movementPattern: "抗旋转", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner0", alternatives: ["dead_bug"], defaultRepRange: "8–12次/侧", defaultRestSeconds: 45, isCompound: false, isUnilateral: true }),
  ex({ id: "crunch", name: "卷腹", englishName: "Crunch", category: "核心", primaryMuscles: core, movementPattern: "躯干屈曲", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner", contraindications: ["腰部不适"], alternatives: ["dead_bug"], defaultRepRange: "10–15次", defaultRestSeconds: 45, isCompound: false }),
  ex({ id: "reverse_crunch", name: "反向卷腹", englishName: "Reverse Crunch", category: "核心", primaryMuscles: core, movementPattern: "骨盆后倾", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner", contraindications: ["腰部不适"], alternatives: ["dead_bug"], defaultRepRange: "10–15次", defaultRestSeconds: 45, isCompound: false }),
  ex({ id: "hanging_leg_raise", name: "悬垂举腿", englishName: "Hanging Leg Raise", category: "核心", primaryMuscles: core, movementPattern: "髋屈", equipment: ["引体向上杆"], difficulty: "advanced", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适", "腰部不适"], alternatives: ["lying_leg_raise"], defaultRepRange: "8–12次", defaultRestSeconds: 75 }),
  ex({ id: "lying_leg_raise", name: "仰卧抬腿", englishName: "Lying Leg Raise", category: "核心", primaryMuscles: core, movementPattern: "髋屈", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner", contraindications: ["腰部不适"], alternatives: ["reverse_crunch"], defaultRepRange: "8–12次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "pallof_press", name: "Pallof Press", englishName: "Pallof Press", category: "核心", primaryMuscles: core, movementPattern: "抗旋转", equipment: ["弹力带", "拉力器"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], defaultRepRange: "8–12次/侧", defaultRestSeconds: 60, isCompound: false, isUnilateral: true }),
  ex({ id: "farmer_carry", name: "农夫行走", englishName: "Farmer Carry", category: "核心", primaryMuscles: core, secondaryMuscles: ["背", "手臂"], movementPattern: "负重行走", equipment: ["可调哑铃", "固定哑铃", "壶铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym", "outdoor"], defaultRepRange: "20–40米", defaultRestSeconds: 75 }),
  ex({ id: "superman", name: "超人式", englishName: "Superman", category: "核心", primaryMuscles: ["背", "臀"], movementPattern: "背伸", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner0", contraindications: ["腰部不适"], defaultRepRange: "10–15次", defaultRestSeconds: 45, isCompound: false }),

  ex({ id: "mountain_climber", name: "登山跑", englishName: "Mountain Climber", category: "有氧", primaryMuscles: ["全身"], movementPattern: "循环训练", equipment: ["无器械"], difficulty: "beginner", contraindications: ["膝盖不适", "手腕不适", "不适合高冲击"], defaultRepRange: "20–40秒", defaultRestSeconds: 45, tags: ["hiit"] }),
  ex({ id: "jumping_jack", name: "开合跳", englishName: "Jumping Jack", category: "有氧", primaryMuscles: ["全身"], movementPattern: "循环训练", equipment: ["无器械"], difficulty: "beginner", contraindications: ["膝盖不适", "不适合高冲击"], defaultRepRange: "30–60秒", defaultRestSeconds: 45, tags: ["jump"] }),
  ex({ id: "high_knee", name: "原地高抬腿", englishName: "High Knee", category: "有氧", primaryMuscles: ["全身"], movementPattern: "循环训练", equipment: ["无器械"], difficulty: "beginner", contraindications: ["膝盖不适", "不适合高冲击"], defaultRepRange: "20–40秒", defaultRestSeconds: 45, tags: ["jump"] }),
  ex({ id: "brisk_walk", name: "快走", englishName: "Brisk Walking", category: "有氧", primaryMuscles: ["全身"], movementPattern: "稳态有氧", equipment: ["无器械"], difficulty: "beginner0", suitableLocations: ["homeNone", "homeSimple", "apartmentGym", "commercialGym", "outdoor"], defaultRepRange: "20–45分钟", defaultRestSeconds: 0, isCompound: false, tags: ["lowImpact"] }),
  ex({ id: "running", name: "跑步", englishName: "Running", category: "有氧", primaryMuscles: ["全身"], movementPattern: "稳态有氧", equipment: ["无器械", "跑步机"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym", "outdoor"], contraindications: ["膝盖不适", "不喜欢跑步"], defaultRepRange: "15–40分钟", defaultRestSeconds: 0, isCompound: false }),
  ex({ id: "elliptical", name: "椭圆机", englishName: "Elliptical", category: "有氧", primaryMuscles: ["全身"], movementPattern: "稳态有氧", equipment: ["椭圆机"], difficulty: "beginner0", suitableLocations: ["apartmentGym", "commercialGym"], defaultRepRange: "20–45分钟", defaultRestSeconds: 0, isCompound: false, tags: ["lowImpact"] }),
  ex({ id: "bike", name: "固定单车", englishName: "Stationary Bike", category: "有氧", primaryMuscles: ["全身"], movementPattern: "稳态有氧", equipment: ["单车"], difficulty: "beginner0", suitableLocations: ["apartmentGym", "commercialGym"], defaultRepRange: "20–45分钟", defaultRestSeconds: 0, isCompound: false, tags: ["lowImpact"] }),
  ex({ id: "rowing_machine", name: "划船机", englishName: "Rowing Machine", category: "有氧", primaryMuscles: ["全身", "背"], movementPattern: "稳态有氧", equipment: ["划船机"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["腰部不适"], defaultRepRange: "10–30分钟", defaultRestSeconds: 0, isCompound: false }),
  ex({ id: "stair_climber", name: "爬楼机", englishName: "Stair Climber", category: "有氧", primaryMuscles: ["腿", "臀"], movementPattern: "稳态有氧", equipment: ["爬楼机"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["膝盖不适"], defaultRepRange: "10–30分钟", defaultRestSeconds: 0, isCompound: false }),
  ex({ id: "jump_rope", name: "跳绳", englishName: "Jump Rope", category: "有氧", primaryMuscles: ["全身"], movementPattern: "循环训练", equipment: ["跳绳"], difficulty: "beginner", suitableLocations: ["homeSimple", "outdoor"], contraindications: ["膝盖不适", "不适合高冲击"], defaultRepRange: "30–90秒", defaultRestSeconds: 45, tags: ["jump"] }),
  ex({ id: "low_impact_circuit", name: "低冲击循环训练", englishName: "Low-impact Circuit", category: "有氧", primaryMuscles: ["全身"], movementPattern: "循环训练", equipment: ["无器械"], difficulty: "beginner0", contraindications: ["膝盖不适"], defaultRepRange: "8–15分钟", defaultRestSeconds: 45, isCompound: false, tags: ["lowImpact"] })
];

const exerciseById = new Map(EXERCISES.map(item => [item.id, item]));

const normalizeText = value => String(value || "")
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "")
  .replace(/[·_\-—–]/g, "");

const EXERCISE_ALIASES = {
  push_up: ["伏地挺身"],
  barbell_squat: ["深蹲", "杠铃蹲"],
  bodyweight_squat: ["徒手深蹲", "深蹲"],
  goblet_squat: ["壶铃深蹲", "哑铃深蹲"],
  rdl: ["硬拉", "罗马尼亚硬拉"],
  db_rdl: ["哑铃硬拉", "硬拉"],
  running: ["跑步机跑步", "慢跑"],
  lat_pulldown: ["下拉"],
  seated_row: ["绳索划船", "划船"],
  triceps_pushdown: ["绳索臂屈伸", "绳索下拉"],
  cable_curl: ["绳索二头弯举"]
};

function exerciseSearchTerms(exercise) {
  return [
    exercise.id,
    exercise.name,
    exercise.englishName,
    ...(EXERCISE_ALIASES[exercise.id] || [])
  ].map(normalizeText).filter(Boolean);
}

function isDislikedExercise(exercise, dislikedExercises = []) {
  const terms = exerciseSearchTerms(exercise);
  return dislikedExercises
    .map(normalizeText)
    .filter(Boolean)
    .some(token => terms.some(term => term.includes(token) || token.includes(term)));
}

export const SPLITS = {
  fullBody: { name: "全身训练", minDays: 2, maxDays: 4, sequence: ["全身A", "全身B", "全身C", "全身D"] },
  upperLower: { name: "上肢 / 下肢", minDays: 3, maxDays: 4, sequence: ["上肢A", "下肢A", "上肢B", "下肢B"] },
  ppl: { name: "推 / 拉 / 腿", minDays: 3, maxDays: 6, sequence: ["推", "拉", "腿", "推", "拉", "腿"] },
  four: { name: "四分化", minDays: 4, maxDays: 5, sequence: ["胸三头", "背二头", "腿臀", "肩核心", "弱项补充"] },
  five: { name: "五分化", minDays: 5, maxDays: 6, sequence: ["胸", "背", "腿", "肩", "手臂核心", "弱项有氧"] },
  six: { name: "六天循环", minDays: 5, maxDays: 6, sequence: ["推", "拉", "腿", "推", "拉", "腿"] }
};

export function equipmentAllowed(exercise, settings) {
  const available = new Set(settings.availableEquipment || []);
  if (available.size === 1 && available.has("无器械")) return exercise.equipment.every(item => item === "无器械");
  const equipment = exercise.equipment || [];
  if (equipment.includes("无器械") && available.has("无器械")) return true;
  const hasAny = items => items.some(item => available.has(item));
  const dumbbells = ["可调哑铃", "固定哑铃"];
  if (equipment.includes("卧推凳") && equipment.some(item => dumbbells.includes(item))) {
    return available.has("卧推凳") && hasAny(dumbbells);
  }
  if (equipment.includes("杠铃") && (equipment.includes("卧推凳") || equipment.includes("深蹲架"))) {
    return equipment.every(item => available.has(item));
  }
  if (equipment.length > 1 && !equipment.includes("杠铃")) return hasAny(equipment);
  return equipment.every(item => available.has(item));
}

export function isExerciseAllowed(exercise, settings) {
  const level = DIFFICULTY_ORDER[settings.experienceLevel] ?? 1;
  const exerciseLevel = DIFFICULTY_ORDER[exercise.difficulty] ?? 1;
  const limitations = new Set(settings.limitations || []);
  if (settings.trainingLocation === "homeNone" && !exercise.equipment.every(item => item === "无器械" || item === "瑜伽垫")) return false;
  if (!equipmentAllowed(exercise, settings)) return false;
  if (exerciseLevel > level + 1) return false;
  if (isDislikedExercise(exercise, settings.dislikedExercises)) return false;
  if (exercise.contraindications.some(item => limitations.has(item))) return false;
  if (limitations.has("肩部不适") && exercise.movementPattern === "垂直推") return false;
  if (limitations.has("腰部不适") && /髋铰链|背伸|负重行走/.test(exercise.movementPattern)) return false;
  if (limitations.has("不能做深蹲类动作") && exercise.movementPattern === "深蹲") return false;
  if (limitations.has("不能做硬拉类动作") && /髋铰链|硬拉/.test(`${exercise.movementPattern}${exercise.name}`)) return false;
  if (limitations.has("手腕不适") && /俯卧撑|平板|支撑|登山跑/.test(exercise.name)) return false;
  if (limitations.has("肘部不适") && /弯举|下压|臂屈伸|引体/.test(exercise.name)) return false;
  if ((limitations.has("膝盖不适") || limitations.has("不适合高冲击")) && (exercise.tags.includes("jump") || /跑步|开合跳|高抬腿|跳绳/.test(exercise.name))) return false;
  if ((settings.preferredStyles || []).includes("不喜欢跑步") && /跑步/.test(exercise.name)) return false;
  if ((settings.preferredStyles || []).includes("不喜欢高强度间歇训练") && exercise.tags.includes("hiit")) return false;
  return true;
}

export function validateSplitCompatibility(settings = {}) {
  const days = Number(settings.weeklyTrainingDays) || 3;
  const splitType = settings.selectedSplit || "fullBody";
  const recommendations = {
    2: ["fullBody"],
    3: ["fullBody", "ppl"],
    4: ["upperLower", "four"],
    5: ["five", "four", "ppl"],
    6: ["ppl", "six"]
  };
  const allowed = recommendations[days] || ["fullBody"];
  const recommended = allowed[0];
  if (allowed.includes(splitType)) return { ok: true, recommended, allowed };
  return {
    ok: false,
    recommended,
    allowed,
    message: `每周 ${days} 练更适合${allowed.map(item => SPLITS[item]?.name || item).join("或")}，当前选择的${SPLITS[splitType]?.name || splitType}容易造成排程和恢复不合理。`
  };
}

function splitByDays(splitType, days) {
  const split = SPLITS[splitType] || SPLITS.fullBody;
  return Array.from({ length: days }, (_, index) => split.sequence[index % split.sequence.length]);
}

function categoriesForTheme(theme) {
  if (theme.includes("全身")) return ["腿", "胸", "背", "臀", "肩", "核心"];
  if (theme.includes("上肢")) return ["胸", "背", "肩", "手臂", "核心"];
  if (theme.includes("下肢")) return ["腿", "臀", "核心"];
  if (theme.includes("推")) return ["胸", "肩", "手臂"];
  if (theme.includes("拉")) return ["背", "肩", "手臂"];
  if (theme.includes("腿")) return ["腿", "臀", "核心"];
  if (theme.includes("胸")) return ["胸", "手臂", "肩"];
  if (theme.includes("背")) return ["背", "手臂", "肩"];
  if (theme.includes("肩")) return ["肩", "核心", "手臂"];
  if (theme.includes("手臂")) return ["手臂", "核心"];
  return ["全身", "核心"];
}

function exerciseMatchesTheme(exercise, theme) {
  const text = `${exercise.category}${exercise.movementPattern}${exercise.name}${exercise.primaryMuscles.join("")}`;
  if (theme.includes("全身")) return true;
  if ((theme.includes("推") || theme.includes("胸")) && /腿|臀/.test(exercise.category)) return false;
  if ((theme.includes("拉") || theme.includes("背")) && /腿|臀/.test(exercise.category)) return false;
  if (theme.includes("推") || theme.includes("胸")) return /胸|肩|手臂|水平推|垂直推|夹胸|肩外展|肩屈|肘伸|推胸|卧推|俯卧撑|臂屈伸/.test(text);
  if (theme.includes("拉") || theme.includes("背")) return /背|手臂|水平拉|垂直拉|肘屈|下拉|划船|引体|弯举|面拉|飞鸟|背伸/.test(text);
  if (theme.includes("腿") || theme.includes("下肢")) return /腿|臀|深蹲|弓步|髋|膝|踝|提踵|静蹲|臀桥/.test(text);
  if (theme.includes("上肢")) return /胸|背|肩|手臂|水平推|垂直推|水平拉|垂直拉|肘/.test(text);
  if (theme.includes("肩")) return /肩|肩外展|肩屈|垂直推|面拉|飞鸟/.test(text);
  if (theme.includes("手臂")) return /手臂|肘屈|肘伸|弯举|下压|臂屈伸/.test(text);
  return true;
}

function themeFamily(theme) {
  if (theme.includes("全身")) return "全身";
  if (theme.includes("推") || theme.includes("胸")) return "推";
  if (theme.includes("拉") || theme.includes("背")) return "拉";
  if (theme.includes("腿") || theme.includes("臀") || theme.includes("下肢")) return "腿";
  if (theme.includes("上肢")) return "上肢";
  if (theme.includes("肩")) return "肩";
  if (theme.includes("手臂")) return "手臂";
  return theme;
}

function targetExerciseCount(settings) {
  const byDuration = settings.sessionDuration <= 25 ? 2 : settings.sessionDuration <= 35 ? 3 : settings.sessionDuration <= 50 ? 4 : 5;
  if (settings.experienceLevel === "beginner0" && settings.weeklyTrainingDays >= 5) return 3;
  return settings.experienceLevel === "beginner0" ? Math.min(4, byDuration) : byDuration;
}

function prescription(exercise, settings) {
  const strength = settings.primaryGoal === "strength" && !["beginner0", "beginner"].includes(settings.experienceLevel) && exercise.isCompound;
  const fatLoss = settings.primaryGoal === "fatLoss" || settings.primaryGoal === "conditioning";
  const setsBase = settings.sessionDuration <= 25 ? 2 : settings.experienceLevel === "beginner0" ? 2 : settings.experienceLevel === "intermediate" || settings.experienceLevel === "advanced" ? 4 : 3;
  return {
    sets: exercise.category === "有氧" ? 1 : setsBase,
    reps: exercise.category === "有氧" ? exercise.defaultRepRange : strength ? "3–6次" : fatLoss ? "10–15次" : exercise.defaultRepRange,
    restSeconds: exercise.category === "有氧" ? 0 : strength ? 180 : fatLoss ? Math.min(75, exercise.defaultRestSeconds) : exercise.defaultRestSeconds,
    intensity: ["beginner0", "beginner"].includes(settings.experienceLevel) ? "RIR 2–4" : strength ? "RIR 1–3" : "RIR 1–2"
  };
}

function estimateExerciseMinutes(row) {
  if (row.category === "有氧") return 8;
  const perSetSeconds = 45;
  const transitionSeconds = 60;
  const totalSeconds = row.sets * perSetSeconds + Math.max(0, row.sets - 1) * Number(row.restSeconds || 0) + transitionSeconds;
  return Math.ceil(totalSeconds / 60);
}

function estimateWorkoutDuration(exercises, settings, cardio) {
  const warmup = settings.sessionDuration <= 25 ? 4 : 6;
  const cooldown = settings.sessionDuration <= 25 ? 3 : 5;
  const strength = exercises.reduce((sum, row) => sum + estimateExerciseMinutes(row), 0);
  const cardioMinutes = cardio && settings.cardioPreference === "after" ? Math.min(10, Math.max(6, Math.round(settings.sessionDuration * 0.2))) : 0;
  return warmup + strength + cardioMinutes + cooldown;
}

function calorieRange(duration, settings, userProfile = {}) {
  const weight = clamp(Number(userProfile.weight) || 70, 40, 160);
  const met = settings.primaryGoal === "conditioning" ? 6.2 : settings.primaryGoal === "strength" ? 5.4 : 5.8;
  const kcal = met * 3.5 * weight / 200 * duration;
  return {
    min: Math.round(kcal * 0.82 / 10) * 10,
    max: Math.round(kcal * 1.12 / 10) * 10,
    basis: "按体重、训练时长和中等强度 MET 粗略估算；实际消耗会受动作速度、组间休息、心率、技术熟练度影响。"
  };
}

function dayFocus(theme) {
  if (theme.includes("腿")) return "下肢力量、臀腿稳定和核心控制";
  if (theme.includes("推") || theme.includes("胸")) return "胸肩三头推类力量和肩胛稳定";
  if (theme.includes("拉") || theme.includes("背")) return "背部发力、肩胛控制和肱二头";
  if (theme.includes("全身")) return "全身动作学习和均衡训练量";
  return "动作质量、稳定节奏和适度训练量";
}

function pickExercises(theme, settings, usedGlobal) {
  const categories = categoriesForTheme(theme);
  const count = targetExerciseCount(settings);
  const pool = EXERCISES.filter(item => item.category !== "有氧" && isExerciseAllowed(item, settings));
  const themePool = pool.filter(item => exerciseMatchesTheme(item, theme));
  const picked = [];

  for (const category of categories) {
    const candidates = themePool
      .filter(item => item.category === category || item.primaryMuscles.includes(category))
      .sort((a, b) => Number(usedGlobal.has(a.id)) - Number(usedGlobal.has(b.id)) || Number(b.isCompound) - Number(a.isCompound));
    const next = candidates.find(item => !picked.some(row => row.id === item.id));
    if (next) picked.push(next);
    if (picked.length >= count) break;
  }

  if (picked.length < count) {
    for (const item of themePool.sort((a, b) => Number(usedGlobal.has(a.id)) - Number(usedGlobal.has(b.id)) || Number(b.isCompound) - Number(a.isCompound))) {
      if (!picked.some(row => row.id === item.id)) picked.push(item);
      if (picked.length >= count) break;
    }
  }

  if (theme.includes("全身") && count >= 4 && !picked.some(item => item.category === "核心")) {
    const coreCandidate = themePool.find(item => item.category === "核心" && !picked.some(row => row.id === item.id));
    if (coreCandidate) picked[Math.max(0, picked.length - 1)] = coreCandidate;
  }

  picked.forEach(item => usedGlobal.add(item.id));
  return picked;
}

function cardioFor(settings) {
  if (settings.cardioPreference === "none") return null;
  const allowed = EXERCISES.filter(item => item.category === "有氧" && isExerciseAllowed(item, settings));
  const preferred = allowed.find(item => item.tags.includes("lowImpact")) || allowed[0];
  if (!preferred) return null;
  return { ...preferred, ...prescription(preferred, settings), note: settings.cardioPreference === "after" ? "力量训练后完成，保持可说完整句子的强度。" : "可与力量训练分开到另一时段完成。" };
}

function buildDay(theme, index, settings, usedGlobal, userProfile = {}) {
  let exercises = pickExercises(theme, settings, usedGlobal).map(item => ({
    exerciseId: item.id,
    name: item.name,
    englishName: item.englishName,
    category: item.category,
    targetMuscles: [...item.primaryMuscles, ...item.secondaryMuscles].filter((value, i, arr) => arr.indexOf(value) === i),
    equipment: item.equipment,
    instructions: item.instructions,
    commonMistakes: item.commonMistakes,
    alternatives: getExerciseAlternatives(item.id, settings).map(alt => ({ id: alt.id, name: alt.name })),
    movementPattern: item.movementPattern,
    isCompound: item.isCompound,
    ...prescription(item, settings),
    completed: false
  }));
  let cardio = cardioFor(settings);
  let estimatedDuration = estimateWorkoutDuration(exercises, settings, cardio);
  while (estimatedDuration > settings.sessionDuration && exercises.length > 2) {
    const removeIndex = exercises.findLastIndex(row => !row.isCompound && !(theme.includes("全身") && row.category === "核心"));
    if (removeIndex < 0) break;
    exercises.splice(removeIndex >= 0 ? removeIndex : exercises.length - 1, 1);
    estimatedDuration = estimateWorkoutDuration(exercises, settings, cardio);
  }
  if (estimatedDuration > settings.sessionDuration && exercises.length) {
    let guard = 0;
    while (estimatedDuration > settings.sessionDuration + 5 && guard < 8) {
      const reduceIndex = exercises.findLastIndex((row, rowIndex) => rowIndex > 0 && row.sets > 2);
      if (reduceIndex < 0) break;
      exercises[reduceIndex] = { ...exercises[reduceIndex], sets: exercises[reduceIndex].sets - 1 };
      estimatedDuration = estimateWorkoutDuration(exercises, settings, cardio);
      guard += 1;
    }
    if (estimatedDuration > settings.sessionDuration + 5) {
      exercises = exercises.map((row, rowIndex) => rowIndex === 0 ? row : { ...row, sets: Math.max(2, row.sets - 1) });
    }
    estimatedDuration = estimateWorkoutDuration(exercises, settings, cardio);
  }
  if (estimatedDuration > settings.sessionDuration && cardio) {
    cardio = null;
    estimatedDuration = estimateWorkoutDuration(exercises, settings, cardio);
  }
  const calories = calorieRange(estimatedDuration, settings, userProfile);
  return {
    id: `day_${index + 1}`,
    day: `第 ${index + 1} 天`,
    theme,
    focus: dayFocus(theme),
    isRest: false,
    estimatedDuration,
    estimatedCalories: calories.max,
    estimatedCaloriesRange: calories,
    warmup: ["5分钟低强度热身", "目标关节动态活动", "第一个复合动作先做1–2组轻重量热身组"],
    exercises,
    cardio: settings.cardioPreference === "after" ? cardio : null,
    cooldown: ["训练后慢走或低强度单车3–5分钟", "拉伸当天主要训练肌群，每个动作20–30秒"]
  };
}

function preferredTrainingSlots(count) {
  return {
    1: [0],
    2: [0, 3],
    3: [0, 2, 4],
    4: [0, 1, 3, 5],
    5: [0, 1, 2, 4, 5],
    6: [0, 1, 2, 3, 4, 5]
  }[count] || [0, 2, 4];
}

function addRestDays(trainingDays) {
  const slots = preferredTrainingSlots(trainingDays.length);
  const week = Array.from({ length: 7 }, (_, i) => ({
    id: `rest_${i + 1}`,
    day: `第 ${i + 1} 天`,
    theme: "休息 / 恢复",
    isRest: true,
    recovery: ["轻松步行20–40分钟", "保证睡眠和饮水", "如果酸痛明显，下一次同肌群训练降低一组"]
  }));
  for (let i = 0; i < 7; i++) {
    const slotIndex = slots.indexOf(i);
    if (slotIndex >= 0 && trainingDays[slotIndex]) week[i] = { ...trainingDays[slotIndex], day: `第 ${i + 1} 天`, weekDayIndex: i };
  }
  return week;
}

export function scoreWeeklySchedule(days = []) {
  const trainingIndexes = days.map((day, index) => day?.isRest ? null : index).filter(index => index !== null);
  let score = 100;
  let maxConsecutiveTraining = 0;
  let maxConsecutiveRest = 0;
  let runTrain = 0;
  let runRest = 0;
  for (const day of days) {
    if (day?.isRest) {
      runRest += 1;
      runTrain = 0;
    } else {
      runTrain += 1;
      runRest = 0;
    }
    maxConsecutiveTraining = Math.max(maxConsecutiveTraining, runTrain);
    maxConsecutiveRest = Math.max(maxConsecutiveRest, runRest);
  }
  if (trainingIndexes.length <= 4 && maxConsecutiveTraining > 3) score -= 25;
  if (maxConsecutiveRest > 3 && trainingIndexes.length >= 3) score -= 25;
  for (let i = 1; i < trainingIndexes.length; i++) {
    const gap = trainingIndexes[i] - trainingIndexes[i - 1];
    if (gap === 1 && trainingIndexes.length <= 3) score -= 15;
  }
  return { score, trainingIndexes, maxConsecutiveTraining, maxConsecutiveRest };
}

export function validateWeeklySchedule(days = [], settings = {}) {
  const errors = [];
  const trainingDays = days.filter(day => !day.isRest);
  const expected = Number(settings.weeklyTrainingDays) || trainingDays.length;
  const schedule = scoreWeeklySchedule(days);
  if (trainingDays.length !== expected) errors.push("周计划训练日数量与设置不一致。");
  if (expected <= 4 && schedule.maxConsecutiveTraining > 3) errors.push("连续训练天数过多。");
  if (schedule.maxConsecutiveRest > 3 && expected >= 3) errors.push("训练日过于集中，导致连续休息过长。");
  if (expected === 3 && schedule.trainingIndexes.join(",") === "0,1,2") errors.push("每周3练不应集中在前三天。");
  for (let i = 1; i < days.length; i++) {
    const prev = days[i - 1];
    const cur = days[i];
    if (!prev.isRest && !cur.isRest && /腿|臀/.test(prev.theme) && /腿|臀/.test(cur.theme)) errors.push("同一高疲劳肌群恢复时间不足。");
  }
  return { ok: errors.length === 0, errors, ...schedule };
}

function safetyNotes(settings) {
  const notes = [
    "本计划不能替代医生、物理治疗师或持证教练的个体化评估。",
    "尖锐疼痛、胸痛、眩晕、明显麻木或异常呼吸困难时立即停止训练。"
  ];
  if ((settings.limitations || []).length && !settings.limitations.includes("无明显限制")) {
    notes.push(`已根据限制过滤动作：${settings.limitations.join("、")}。`);
  }
  return notes;
}

export function splitWarnings(settings) {
  const warnings = [];
  if (["beginner0", "beginner"].includes(settings.experienceLevel) && settings.weeklyTrainingDays >= 6 && settings.selectedSplit === "six") {
    warnings.push("你目前属于训练新手，每周6练可能影响恢复；更推荐从每周3次全身或每周4次上下肢开始。");
  }
  if (settings.weeklyTrainingDays <= 3 && ["five", "four"].includes(settings.selectedSplit)) {
    warnings.push("当前可训练天数不足以在一周内完成该分化，系统会按可训练天数滚动生成。");
  }
  const split = SPLITS[settings.selectedSplit] || SPLITS.fullBody;
  if (settings.weeklyTrainingDays < split.minDays || settings.weeklyTrainingDays > split.maxDays) {
    warnings.push(`${split.name} 通常更适合每周 ${split.minDays}–${split.maxDays} 天训练。`);
  }
  return warnings;
}

function normalizeSettings(settings) {
  const normalized = {
    primaryGoal: "muscleGain",
    secondaryGoal: "health",
    experienceLevel: "beginner",
    weeklyTrainingDays: 3,
    sessionDuration: 45,
    trainingLocation: "homeSimple",
    availableEquipment: ["无器械", "瑜伽垫", "可调哑铃"],
    limitations: ["无明显限制"],
    priorityMuscles: ["全身均衡"],
    dislikedExercises: [],
    preferredStyles: [],
    selectedSplit: "fullBody",
    cardioPreference: "after",
    allowRollingSplit: false,
    ...settings
  };
  normalized.weeklyTrainingDays = clamp(Number(normalized.weeklyTrainingDays) || 3, 1, 6);
  normalized.sessionDuration = clamp(Number(normalized.sessionDuration) || 45, 20, 120);
  normalized.limitations = (normalized.limitations || []).filter(item => item !== "无明显限制");
  if (!normalized.limitations.length) normalized.limitations = ["无明显限制"];
  normalized.availableEquipment = [...new Set(normalized.availableEquipment || [])];
  normalized.dislikedExercises = (normalized.dislikedExercises || []).map(item => item.trim()).filter(Boolean);
  return normalized;
}

export function generateWorkoutPlan(settings, userProfile = {}) {
  const normalized = normalizeSettings(settings);
  if (normalized.primaryGoal && normalized.secondaryGoal && normalized.primaryGoal === normalized.secondaryGoal) {
    return { plan: null, errors: ["主要目标和次要目标不能相同。"], warnings: [] };
  }
  const compatibility = validateSplitCompatibility(normalized);
  if (!compatibility.ok && !normalized.allowRollingSplit) {
    return { plan: null, errors: [compatibility.message], warnings: [`推荐改为：${SPLITS[compatibility.recommended]?.name || compatibility.recommended}`] };
  }

  const themes = splitByDays(normalized.selectedSplit, normalized.weeklyTrainingDays);
  const usedGlobal = new Set();
  const trainingDays = themes.map((theme, index) => buildDay(theme, index, normalized, usedGlobal, userProfile));
  const plan = {
    id: `plan_${Date.now()}`,
    userSnapshot: {
      age: userProfile.age || null,
      sex: userProfile.sex || null,
      height: userProfile.height || null,
      weight: userProfile.weight || null,
      goal: userProfile.goal || null
    },
    weekStart: new Date().toISOString().slice(0, 10),
    splitType: normalized.selectedSplit,
    goal: normalized.primaryGoal,
    settings: normalized,
    warnings: [...splitWarnings(normalized), ...(!compatibility.ok ? [compatibility.message] : [])],
    days: addRestDays(trainingDays),
    progression: [
      "双进阶法：同一重量下所有工作组都达到目标次数上限，且动作质量稳定，下次小幅加重。",
      "连续两次低于最低次数时，保持重量、降低5–10%或减少一组。",
      "每4–6周安排1周轻量恢复周，训练量降低约30%。"
    ],
    safety: safetyNotes(normalized),
    nutritionLink: normalized.primaryGoal === "muscleGain"
      ? "增肌期训练日前后优先安排蛋白质和碳水，帮助训练表现和恢复。"
      : normalized.primaryGoal === "fatLoss"
        ? "减脂期保留力量训练，不要把单次训练消耗全部吃回；优先保证蛋白质。"
        : "维持期保持稳定训练节奏，根据体重、围度和精神状态微调饮食。"
  };
  const validation = validateWorkoutPlan(plan, normalized);
  return validation.ok ? { plan, errors: [] } : { plan: null, errors: validation.errors, warnings: plan.warnings };
}

export function validateWorkoutPlan(plan, settings = plan?.settings || {}) {
  const errors = [];
  if (!plan || !Array.isArray(plan.days)) return { ok: false, errors: ["计划结构无效。"] };
  const trainingDays = plan.days.filter(day => !day.isRest);
  const normalized = normalizeSettings(settings);
  if (normalized.primaryGoal && normalized.secondaryGoal && normalized.primaryGoal === normalized.secondaryGoal) errors.push("主要目标和次要目标不能相同。");
  if (trainingDays.length !== Number(settings.weeklyTrainingDays)) errors.push("每周训练天数不符合用户设置。");
  const schedule = validateWeeklySchedule(plan.days, normalized);
  errors.push(...schedule.errors);
  for (const day of trainingDays) {
    if (day.estimatedDuration > Number(settings.sessionDuration) + 5) errors.push(`${day.day} 预计时长超出过多。`);
    if (!day.exercises.length) errors.push(`${day.day} 没有可用动作。`);
    const seen = new Set();
    for (const row of day.exercises) {
      const exercise = exerciseById.get(row.exerciseId);
      if (!exercise) {
        errors.push(`动作不存在：${row.exerciseId}`);
        continue;
      }
      if (!isExerciseAllowed(exercise, normalized)) errors.push(`动作不适合当前器械、地点、经验或限制：${exercise.name}`);
      if (!exerciseMatchesTheme(exercise, day.theme)) errors.push(`${day.day} 的动作不符合「${day.theme}」主题：${exercise.name}`);
      if (seen.has(exercise.id)) errors.push(`${day.day} 重复安排动作：${exercise.name}`);
      seen.add(exercise.id);
      if (!row.sets || !row.reps || row.restSeconds === undefined || !row.intensity) errors.push(`${row.name} 缺少组数、次数、休息或强度。`);
    }
  }
  const firstByTheme = trainingDays
    .map(day => ({ theme: themeFamily(day.theme), name: day.exercises[0]?.name }))
    .filter(item => item.name);
  const firstNamesOnDifferentThemes = firstByTheme.filter((item, index, arr) => arr.findIndex(other => other.name === item.name) !== index && arr.some(other => other.name === item.name && other.theme !== item.theme));
  if (firstNamesOnDifferentThemes.length) errors.push("不同训练主题使用了相同的首个动作。");
  for (let i = 1; i < plan.days.length; i++) {
    const prev = plan.days[i - 1];
    const cur = plan.days[i];
    if (!prev.isRest && !cur.isRest && /腿|臀/.test(prev.theme) && /腿|臀/.test(cur.theme)) errors.push("连续安排高疲劳腿部训练日。");
  }
  if (settings.experienceLevel === "beginner0") {
    const totalSets = trainingDays.reduce((sum, day) => sum + day.exercises.reduce((s, exercise) => s + exercise.sets, 0), 0);
    if (totalSets > 36) errors.push("新手总训练量过高。");
  }
  return { ok: errors.length === 0, errors };
}

export function getExerciseAlternatives(exerciseId, settings = {}) {
  const original = exerciseById.get(exerciseId);
  if (!original) return [];
  const normalized = normalizeSettings(settings);
  return EXERCISES
    .filter(item => item.id !== exerciseId)
    .filter(item => item.movementPattern === original.movementPattern)
    .filter(item => item.primaryMuscles.some(muscle => original.primaryMuscles.includes(muscle)))
    .filter(item => Math.abs((DIFFICULTY_ORDER[item.difficulty] ?? 1) - (DIFFICULTY_ORDER[original.difficulty] ?? 1)) <= 1)
    .filter(item => isExerciseAllowed(item, normalized))
    .slice(0, 5);
}

export const TRAINING_DATA_SHAPES = {
  trainingProfiles: ["userId", "primaryGoal", "secondaryGoal", "experienceLevel", "weeklyTrainingDays", "availableDays", "sessionDuration", "trainingLocation", "availableEquipment", "limitations", "priorityMuscles", "dislikedExercises", "preferredStyles", "selectedSplit", "createdAt", "updatedAt"],
  workoutPlans: ["id", "userId", "weekStart", "splitType", "goal", "days", "status", "version", "createdAt", "updatedAt"],
  workoutSessions: ["id", "planId", "userId", "date", "workoutDayId", "startedAt", "completedAt", "duration", "exercises", "notes", "perceivedDifficulty", "status"],
  exerciseLogs: ["userId", "sessionId", "exerciseId", "setNumber", "targetReps", "actualReps", "targetWeight", "actualWeight", "rir", "completed", "createdAt"]
};
