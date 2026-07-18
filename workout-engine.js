const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const DIFFICULTY_ORDER = {
  beginner0: 0,
  novice: 0,
  beginner: 1,
  intermediate: 2,
  advanced: 3
};

const DIFFICULTY_SCORE_BY_LEVEL = {
  beginner0: 1,
  novice: 1,
  beginner: 2,
  intermediate: 3,
  advanced: 4
};

const EXPERIENCE_MAX_DIFFICULTY_SCORE = {
  beginner0: 2,
  novice: 2,
  beginner: 3,
  intermediate: 4,
  advanced: 6
};

const LOCATION_EQUIPMENT = {
  homeNone: ["无器械", "瑜伽垫", "椅子", "箱子", "稳定台面"],
  homeSimple: ["无器械", "瑜伽垫", "弹力带", "弹力带固定点", "可调哑铃", "固定哑铃", "壶铃", "跳绳", "引体向上杆", "可调节卧凳", "椅子", "箱子", "稳定台面", "负重背心", "固定沙袋", "杠铃片", "负重腰带"],
  apartmentGym: ["无器械", "瑜伽垫", "弹力带", "弹力带固定点", "可调哑铃", "固定哑铃", "壶铃", "跑步机", "椭圆机", "单车", "划船机", "引体向上杆", "卧推凳", "可调节卧凳", "拉力器", "高位下拉器", "椅子", "箱子", "稳定台面", "负重背心", "固定沙袋", "杠铃片", "负重腰带", "安全臂", "保护架"],
  commercialGym: ["无器械", "瑜伽垫", "弹力带", "弹力带固定点", "可调哑铃", "固定哑铃", "壶铃", "杠铃", "深蹲架", "史密斯机", "卧推凳", "可调节卧凳", "拉力器", "高位下拉器", "腿举机", "腿屈伸机", "腿弯举机", "跑步机", "椭圆机", "单车", "划船机", "引体向上杆", "双杠", "辅助臂屈伸机", "辅助引体向上机", "牧师椅", "爬楼机", "器械推胸", "器械肩推", "髋外展机", "椅子", "箱子", "稳定台面", "负重背心", "固定沙袋", "杠铃片", "负重腰带", "安全臂", "保护架"],
  outdoor: ["无器械", "瑜伽垫", "弹力带", "弹力带固定点", "跳绳"]
};

const ex = ({
  id, name, englishName, category, primaryMuscles, secondaryMuscles = [], movementPattern,
  equipment = ["无器械"], difficulty = "beginner", suitableLocations = ["homeNone", "homeSimple", "apartmentGym", "commercialGym", "outdoor"],
  contraindications = [], alternatives = [], instructions = [], commonMistakes = [], defaultRepRange = "8–12次",
  defaultRestSeconds = 90, isCompound = true, isUnilateral = false, tags = [], equipmentOptions = null, equipmentOptionSafety = [],
  aliases = [], replacedBy = []
}) => ({
  id,
  name,
  englishName,
  category,
  primaryMuscles,
  secondaryMuscles,
  movementPattern,
  equipment,
  equipmentOptions,
  equipmentOptionSafety,
  difficulty,
  suitableLocations,
  contraindications,
  alternatives,
  instructions: instructions.length ? instructions : defaultInstructions({ name, movementPattern, category }),
  commonMistakes: commonMistakes.length ? commonMistakes : defaultMistakes({ movementPattern, category }),
  aliases,
  replacedBy,
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
const uniqueEquipmentOptions = options => {
  const seen = new Set();
  return options.filter(option => {
    const key = option.slice().sort().join("+");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
const loadWithSupportOptions = (supports, loads = []) => uniqueEquipmentOptions([
  ...supports.map(support => [support]),
  ...loads.flatMap(load => supports.map(support => [load, support]))
]);

export const EXERCISES = [
  ex({ id: "push_up", name: "俯卧撑", englishName: "Push-up", category: "胸", primaryMuscles: chest, secondaryMuscles: ["手臂", "核心"], movementPattern: "水平推", equipment: ["无器械"], difficulty: "beginner", contraindications: ["手腕不适", "肩部不适"], alternatives: ["incline_push_up", "machine_chest_press"] }),
  ex({ id: "kneeling_push_up", name: "跪姿俯卧撑", englishName: "Kneeling Push-up", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["无器械"], difficulty: "beginner0", contraindications: ["手腕不适"], alternatives: ["incline_push_up"], defaultRepRange: "8–15次", defaultRestSeconds: 60 }),
  ex({ id: "incline_push_up", name: "上斜俯卧撑", englishName: "Incline Push-up", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["无器械"], difficulty: "beginner0", alternatives: ["kneeling_push_up", "push_up"], replacedBy: ["high_incline_push_up", "low_incline_push_up"] }),
  ex({ id: "db_bench", name: "哑铃卧推", englishName: "Dumbbell Bench Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["可调哑铃", "固定哑铃", "卧推凳"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["push_up", "machine_chest_press"] }),
  ex({ id: "incline_db_bench", name: "上斜哑铃卧推", englishName: "Incline Dumbbell Bench Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["可调哑铃", "固定哑铃", "可调节卧凳"], equipmentOptions: [["可调哑铃", "可调节卧凳"], ["固定哑铃", "可调节卧凳"]], difficulty: "intermediate", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_bench"] }),
  // TODO(equipment-model): 后续可新增 bench_press_rack/power_rack 细分卧推架；当前用 squat_rack 表达可取放杠铃的架体，safety_rack 只作为附加保护条件。
  ex({ id: "barbell_bench", name: "杠铃卧推", englishName: "Barbell Bench Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["杠铃", "卧推凳", "深蹲架", "保护架"], equipmentOptions: [["杠铃", "卧推凳", "深蹲架"], ["杠铃", "卧推凳", "深蹲架", "保护架"]], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_bench", "machine_chest_press"] }),
  // TODO(equipment-model): 后续可新增 incline_bench_press_station；当前用 adjustable_bench + rack 组合表达上斜杠铃卧推。
  ex({ id: "incline_barbell_bench", name: "上斜杠铃卧推", englishName: "Incline Barbell Bench Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["杠铃", "可调节卧凳", "深蹲架", "保护架"], equipmentOptions: [["杠铃", "可调节卧凳", "深蹲架"], ["杠铃", "可调节卧凳", "深蹲架", "保护架"]], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["incline_db_bench"] }),
  ex({ id: "machine_chest_press", name: "器械推胸", englishName: "Machine Chest Press", category: "胸", primaryMuscles: chest, movementPattern: "水平推", equipment: ["器械推胸"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_bench", "push_up"] }),
  ex({ id: "db_fly", name: "哑铃飞鸟", englishName: "Dumbbell Fly", category: "胸", primaryMuscles: chest, movementPattern: "夹胸", equipment: ["可调哑铃", "固定哑铃", "卧推凳"], difficulty: "intermediate", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["cable_fly"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "cable_fly", name: "绳索夹胸", englishName: "Cable Fly", category: "胸", primaryMuscles: chest, movementPattern: "夹胸", equipment: ["拉力器"], difficulty: "intermediate", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_fly"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),

  ex({ id: "lat_pulldown", name: "高位下拉", englishName: "Lat Pulldown", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["高位下拉器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["band_pulldown", "band_assisted_pull_up", "assisted_pull_up_machine"] }),
  // TODO(equipment-model): 未来可继续区分 overhead_anchor / door_anchor；当前用通用“弹力带固定点”表达可靠固定点。
  ex({ id: "band_pulldown", name: "弹力带下拉", englishName: "Band Pulldown", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["弹力带", "弹力带固定点"], equipmentOptions: [["弹力带", "弹力带固定点"]], difficulty: "beginner0", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym", "outdoor"], alternatives: ["lat_pulldown"], instructions: ["将弹力带固定在高位固定点，确认固定牢靠后再开始。", "坐姿或跪姿保持躯干稳定，向下拉至胸前附近。", "控制回放速度，避免耸肩或用身体后仰借力。"] }),
  ex({ id: "band_assisted_pull_up", name: "弹力带辅助引体向上", englishName: "Band-assisted Pull-up", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["引体向上杆", "弹力带"], equipmentOptions: [["引体向上杆", "弹力带"]], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适", "肘部不适"], alternatives: ["lat_pulldown"] }),
  ex({ id: "assisted_pull_up_machine", name: "器械辅助引体向上", englishName: "Assisted Pull-up Machine", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["辅助引体向上机"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["肩部不适", "肘部不适"], alternatives: ["lat_pulldown", "band_assisted_pull_up"] }),
  ex({ id: "pull_up", name: "引体向上", englishName: "Pull-up", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["引体向上杆"], difficulty: "advanced", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym", "outdoor"], contraindications: ["肩部不适", "肘部不适"], alternatives: ["lat_pulldown"] }),
  ex({ id: "standing_scapular_retraction", name: "站姿肩胛后缩", englishName: "Standing Scapular Retraction", category: "背", primaryMuscles: back, secondaryMuscles: shoulder, movementPattern: "水平拉", equipment: ["无器械"], difficulty: "beginner0", contraindications: ["肩部不适"], alternatives: ["band_pulldown", "face_pull"], defaultRepRange: "12–20次", defaultRestSeconds: 45, isCompound: false }),
  ex({ id: "wall_angel", name: "墙天使", englishName: "Wall Angel", category: "背", primaryMuscles: back, secondaryMuscles: shoulder, movementPattern: "肩胛控制", equipment: ["无器械"], difficulty: "beginner0", contraindications: ["肩部不适"], alternatives: ["face_pull"], defaultRepRange: "8–12次", defaultRestSeconds: 45, isCompound: false }),
  ex({ id: "standing_reverse_fly", name: "站姿徒手反向飞鸟", englishName: "Standing Bodyweight Reverse Fly", category: "背", primaryMuscles: back, secondaryMuscles: shoulder, movementPattern: "水平拉", equipment: ["无器械"], difficulty: "beginner0", contraindications: ["肩部不适"], alternatives: ["reverse_fly"], defaultRepRange: "12–20次", defaultRestSeconds: 45, isCompound: false }),
  ex({ id: "seated_row", name: "坐姿划船", englishName: "Seated Cable Row", category: "背", primaryMuscles: back, movementPattern: "水平拉", equipment: ["拉力器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["腰部不适"], alternatives: ["one_arm_db_row"] }),
  ex({ id: "one_arm_db_row", name: "单臂哑铃划船", englishName: "One-arm Dumbbell Row", category: "背", primaryMuscles: back, movementPattern: "水平拉", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["腰部不适"], alternatives: ["chest_supported_row"], defaultRepRange: "8–12次/侧", isUnilateral: true }),
  ex({ id: "chest_supported_row", name: "胸托划船", englishName: "Chest-supported Row", category: "背", primaryMuscles: back, movementPattern: "水平拉", equipment: ["可调哑铃", "固定哑铃", "卧推凳"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], alternatives: ["seated_row"] }),
  ex({ id: "barbell_row", name: "杠铃划船", englishName: "Barbell Row", category: "背", primaryMuscles: back, movementPattern: "水平拉", equipment: ["杠铃"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["腰部不适"], alternatives: ["chest_supported_row"] }),
  ex({ id: "straight_arm_pulldown", name: "直臂下压", englishName: "Straight-arm Pulldown", category: "背", primaryMuscles: back, movementPattern: "垂直拉", equipment: ["拉力器"], difficulty: "intermediate", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["lat_pulldown"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "face_pull", name: "面拉", englishName: "Face Pull", category: "肩", primaryMuscles: shoulder, secondaryMuscles: back, movementPattern: "水平拉", equipment: ["拉力器", "弹力带", "弹力带固定点"], equipmentOptions: [["拉力器"], ["弹力带", "弹力带固定点"]], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], alternatives: ["reverse_fly"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false, instructions: ["使用拉力器或胸口至面部高度的弹力带固定点。", "向脸部方向拉动，肘部略高于肩线。", "保持肩胛稳定，避免腰背后仰借力。"] }),
  ex({ id: "reverse_fly", name: "反向飞鸟", englishName: "Reverse Fly", category: "肩", primaryMuscles: shoulder, movementPattern: "水平拉", equipment: ["可调哑铃", "固定哑铃", "弹力带"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], alternatives: ["face_pull"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false, aliases: ["弹力带拉开"], instructions: ["哑铃版本保持髋部折叠和背部稳定；弹力带版本采用双手拉开弹力带，不需要固定点。", "手臂向身体两侧打开，感受肩后束和上背发力。", "顶点短暂停顿，控制还原，避免耸肩。"] }),

  ex({ id: "db_shoulder_press", name: "坐姿哑铃肩推", englishName: "Seated Dumbbell Shoulder Press", category: "肩", primaryMuscles: shoulder, movementPattern: "垂直推", equipment: ["可调哑铃", "固定哑铃", "卧推凳", "可调节卧凳"], equipmentOptions: [["可调哑铃", "卧推凳"], ["固定哑铃", "卧推凳"], ["可调哑铃", "可调节卧凳"], ["固定哑铃", "可调节卧凳"]], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["machine_shoulder_press"] }),
  ex({ id: "machine_shoulder_press", name: "器械肩推", englishName: "Machine Shoulder Press", category: "肩", primaryMuscles: shoulder, movementPattern: "垂直推", equipment: ["器械肩推"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_shoulder_press"] }),
  ex({ id: "barbell_press", name: "杠铃推举", englishName: "Barbell Overhead Press", category: "肩", primaryMuscles: shoulder, movementPattern: "垂直推", equipment: ["杠铃"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肩部不适", "腰部不适"], alternatives: ["db_shoulder_press"] }),
  ex({ id: "lateral_raise", name: "哑铃侧平举", englishName: "Dumbbell Lateral Raise", category: "肩", primaryMuscles: shoulder, movementPattern: "肩外展", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["cable_lateral_raise"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "cable_lateral_raise", name: "绳索侧平举", englishName: "Cable Lateral Raise", category: "肩", primaryMuscles: shoulder, movementPattern: "肩外展", equipment: ["拉力器"], difficulty: "intermediate", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["lateral_raise"], defaultRepRange: "12–20次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "front_raise", name: "前平举", englishName: "Front Raise", category: "肩", primaryMuscles: shoulder, movementPattern: "肩屈", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适"], alternatives: ["db_shoulder_press"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),

  ex({ id: "db_curl", name: "哑铃弯举", englishName: "Dumbbell Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["hammer_curl"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "hammer_curl", name: "锤式弯举", englishName: "Hammer Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["db_curl"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "barbell_curl", name: "杠铃弯举", englishName: "Barbell Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["杠铃"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肘部不适", "手腕不适"], alternatives: ["db_curl"], defaultRepRange: "8–12次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "cable_curl", name: "绳索弯举", englishName: "Cable Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["拉力器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["db_curl"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "preacher_curl", name: "牧师椅弯举", englishName: "Preacher Curl", category: "手臂", primaryMuscles: arm, movementPattern: "肘屈", equipment: ["牧师椅", "可调哑铃", "固定哑铃", "杠铃"], equipmentOptions: [["牧师椅", "可调哑铃"], ["牧师椅", "固定哑铃"], ["牧师椅", "杠铃"]], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肘部不适"], alternatives: ["cable_curl"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "triceps_pushdown", name: "绳索下压", englishName: "Cable Triceps Pushdown", category: "手臂", primaryMuscles: arm, movementPattern: "肘伸", equipment: ["拉力器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["close_push_up"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "straight_bar_pushdown", name: "直杆下压", englishName: "Straight-bar Pushdown", category: "手臂", primaryMuscles: arm, movementPattern: "肘伸", equipment: ["拉力器"], difficulty: "beginner", suitableLocations: ["apartmentGym", "commercialGym"], contraindications: ["肘部不适"], alternatives: ["triceps_pushdown"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "overhead_extension", name: "过头臂屈伸", englishName: "Overhead Triceps Extension", category: "手臂", primaryMuscles: arm, movementPattern: "肘伸", equipment: ["可调哑铃", "固定哑铃", "拉力器"], difficulty: "intermediate", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["肩部不适", "肘部不适"], alternatives: ["triceps_pushdown"], defaultRepRange: "10–15次", defaultRestSeconds: 60, isCompound: false }),
  ex({ id: "close_push_up", name: "窄距俯卧撑", englishName: "Close-grip Push-up", category: "手臂", primaryMuscles: arm, secondaryMuscles: chest, movementPattern: "水平推", equipment: ["无器械"], difficulty: "intermediate", contraindications: ["手腕不适", "肘部不适"], alternatives: ["triceps_pushdown"] }),
  ex({ id: "dip", name: "双杠臂屈伸", englishName: "Dip", category: "手臂", primaryMuscles: arm, secondaryMuscles: chest, movementPattern: "水平推", equipment: ["双杠"], difficulty: "advanced", suitableLocations: ["commercialGym"], contraindications: ["肩部不适"], alternatives: ["close_push_up"] }),
  // TODO(equipment-model): 后续可新增 close_grip_bench_station；当前用 squat_rack 表达可取放杠铃的架体，safety_rack 只作为附加保护条件。
  ex({ id: "close_grip_bench", name: "窄握卧推", englishName: "Close-grip Bench Press", category: "手臂", primaryMuscles: arm, secondaryMuscles: chest, movementPattern: "水平推", equipment: ["杠铃", "卧推凳", "深蹲架", "保护架"], equipmentOptions: [["杠铃", "卧推凳", "深蹲架"], ["杠铃", "卧推凳", "深蹲架", "保护架"]], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["肩部不适", "肘部不适"], alternatives: ["triceps_pushdown"] }),

  ex({ id: "bodyweight_squat", name: "自重深蹲", englishName: "Bodyweight Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["无器械"], difficulty: "beginner0", contraindications: ["膝盖不适", "不能做深蹲类动作"], alternatives: ["wall_sit"] }),
  ex({ id: "goblet_squat", name: "高脚杯深蹲", englishName: "Goblet Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["可调哑铃", "固定哑铃", "壶铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["膝盖不适", "不能做深蹲类动作"], alternatives: ["leg_press"] }),
  ex({ id: "barbell_squat", name: "杠铃深蹲", englishName: "Barbell Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["杠铃", "深蹲架"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["膝盖不适", "腰部不适", "不能做深蹲类动作"], alternatives: ["leg_press"] }),
  ex({ id: "smith_squat", name: "史密斯深蹲", englishName: "Smith Machine Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["史密斯机"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["膝盖不适", "不能做深蹲类动作"], alternatives: ["leg_press"] }),
  ex({ id: "leg_press", name: "腿举", englishName: "Leg Press", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "深蹲", equipment: ["腿举机"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["膝盖不适"], alternatives: ["goblet_squat"] }),
  ex({ id: "bulgarian_split_squat", name: "保加利亚分腿蹲", englishName: "Bulgarian Split Squat", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "弓步", equipment: ["卧推凳", "箱子", "稳定台面", "可调哑铃", "固定哑铃", "壶铃"], equipmentOptions: loadWithSupportOptions(["卧推凳", "箱子", "稳定台面"], ["可调哑铃", "固定哑铃", "壶铃"]), difficulty: "intermediate", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["膝盖不适"], alternatives: ["step_up"], defaultRepRange: "8–10次/侧", isUnilateral: true }),
  ex({ id: "lunge", name: "箭步蹲", englishName: "Lunge", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "弓步", equipment: ["无器械", "可调哑铃", "固定哑铃"], difficulty: "beginner", contraindications: ["膝盖不适"], alternatives: ["step_up"], defaultRepRange: "8–12次/侧", isUnilateral: true }),
  ex({ id: "step_up", name: "台阶踏步", englishName: "Step-up", category: "腿", primaryMuscles: quad, secondaryMuscles: glute, movementPattern: "弓步", equipment: ["箱子", "卧推凳", "稳定台面", "可调哑铃", "固定哑铃", "壶铃"], equipmentOptions: loadWithSupportOptions(["箱子", "卧推凳", "稳定台面"], ["可调哑铃", "固定哑铃", "壶铃"]), difficulty: "beginner", contraindications: ["膝盖不适"], alternatives: ["glute_bridge"], defaultRepRange: "8–12次/侧", isUnilateral: true }),
  ex({ id: "leg_extension", name: "腿屈伸", englishName: "Leg Extension", category: "腿", primaryMuscles: quad, movementPattern: "膝伸", equipment: ["腿屈伸机"], difficulty: "beginner", suitableLocations: ["commercialGym"], contraindications: ["膝盖不适"], alternatives: ["leg_press"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "rdl", name: "罗马尼亚硬拉", englishName: "Romanian Deadlift", category: "腿", primaryMuscles: hamstring, movementPattern: "髋铰链", equipment: ["杠铃"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["腰部不适", "不能做硬拉类动作"], alternatives: ["glute_bridge"] }),
  ex({ id: "db_rdl", name: "哑铃罗马尼亚硬拉", englishName: "Dumbbell Romanian Deadlift", category: "腿", primaryMuscles: hamstring, movementPattern: "髋铰链", equipment: ["可调哑铃", "固定哑铃"], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], contraindications: ["腰部不适", "不能做硬拉类动作"], alternatives: ["glute_bridge"] }),
  ex({ id: "leg_curl", name: "腿弯举", englishName: "Leg Curl", category: "腿", primaryMuscles: hamstring, movementPattern: "膝屈", equipment: ["腿弯举机"], difficulty: "beginner", suitableLocations: ["commercialGym"], alternatives: ["db_rdl"], defaultRepRange: "10–15次", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "glute_bridge", name: "臀桥", englishName: "Glute Bridge", category: "臀", primaryMuscles: glute, movementPattern: "髋伸", equipment: ["无器械", "瑜伽垫"], difficulty: "beginner0", alternatives: ["barbell_hip_thrust"] }),
  ex({ id: "barbell_hip_thrust", name: "杠铃臀推", englishName: "Barbell Hip Thrust", category: "臀", primaryMuscles: glute, movementPattern: "髋伸", equipment: ["杠铃", "卧推凳"], difficulty: "intermediate", suitableLocations: ["commercialGym"], contraindications: ["腰部不适"], alternatives: ["glute_bridge"], instructions: ["上背稳定靠在卧推凳边缘，杠铃放在髋部折痕处。", "建议使用护垫、毛巾或软垫缓冲髋部压力；当前器械模型不把护垫设为硬性门槛。", "向上顶髋至躯干接近水平，控制下放，避免腰椎代偿。"] }),
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
  ex({ id: "pallof_press", name: "帕洛夫抗旋转推", englishName: "Pallof Press", category: "核心", primaryMuscles: core, movementPattern: "抗旋转", equipment: ["弹力带", "弹力带固定点", "拉力器"], equipmentOptions: [["弹力带", "弹力带固定点"], ["拉力器"]], difficulty: "beginner", suitableLocations: ["homeSimple", "apartmentGym", "commercialGym"], defaultRepRange: "8–12次/侧", defaultRestSeconds: 60, isCompound: false, isUnilateral: true, aliases: ["Pallof Press", "帕洛夫推"], instructions: ["使用胸口高度附近的拉力器或弹力带固定点。", "身体侧对阻力方向，双手从胸前向前推出。", "保持骨盆和肋骨稳定，避免身体被阻力拉转。"] }),
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

const exerciseSeed = id => EXERCISES.find(item => item.id === id);
const noEquipment = "无器械";
const yogaMat = "瑜伽垫";
const adjustableDumbbell = "可调哑铃";
const fixedDumbbell = "固定哑铃";
const bench = "卧推凳";
const pullupBar = "引体向上杆";
const weightedVest = "负重背心";
const securedSandbag = "固定沙袋";
const weightPlate = "杠铃片";
const dipBelt = "负重腰带";
const chair = "椅子";
const box = "箱子";
const stablePlatform = "稳定台面";
const parallelBars = "双杠";
const resistanceBand = "弹力带";
const assistedDipMachine = "辅助臂屈伸机";
const assistedPullUpMachine = "辅助引体向上机";
EXERCISES.push(
  ex({ id: "wall_push_up", name: "墙壁俯卧撑", englishName: "Wall Push-up", category: exerciseSeed("push_up").category, primaryMuscles: exerciseSeed("push_up").primaryMuscles, secondaryMuscles: exerciseSeed("push_up").secondaryMuscles, movementPattern: exerciseSeed("push_up").movementPattern, equipment: [noEquipment], difficulty: "beginner0", contraindications: exerciseSeed("push_up").contraindications, alternatives: ["high_incline_push_up"], defaultRepRange: "10–15次", defaultRestSeconds: 45 }),
  ex({ id: "high_incline_push_up", name: "高位上斜俯卧撑", englishName: "High Incline Push-up", category: exerciseSeed("push_up").category, primaryMuscles: exerciseSeed("push_up").primaryMuscles, secondaryMuscles: exerciseSeed("push_up").secondaryMuscles, movementPattern: exerciseSeed("push_up").movementPattern, equipment: [noEquipment], difficulty: "beginner0", contraindications: exerciseSeed("push_up").contraindications, alternatives: ["kneeling_push_up", "low_incline_push_up"], defaultRepRange: "8–15次", defaultRestSeconds: 45 }),
  ex({ id: "low_incline_push_up", name: "低位上斜俯卧撑", englishName: "Low Incline Push-up", category: exerciseSeed("push_up").category, primaryMuscles: exerciseSeed("push_up").primaryMuscles, secondaryMuscles: exerciseSeed("push_up").secondaryMuscles, movementPattern: exerciseSeed("push_up").movementPattern, equipment: [noEquipment], difficulty: "beginner0", contraindications: exerciseSeed("push_up").contraindications, alternatives: ["kneeling_push_up", "push_up"], defaultRepRange: "8–15次", defaultRestSeconds: 60 }),
  ex({ id: "weighted_push_up", name: "负重俯卧撑", englishName: "Weighted Push-up", category: exerciseSeed("push_up").category, primaryMuscles: exerciseSeed("push_up").primaryMuscles, secondaryMuscles: exerciseSeed("push_up").secondaryMuscles, movementPattern: exerciseSeed("push_up").movementPattern, equipment: [weightedVest, securedSandbag], equipmentOptions: [[weightedVest], [securedSandbag]], equipmentOptionSafety: [{ option: [weightedVest], canTrainAlone: true }, { option: [securedSandbag], requiresSecuredLoad: true }], difficulty: "advanced", contraindications: exerciseSeed("push_up").contraindications, alternatives: ["close_push_up"], defaultRepRange: "6–10次", defaultRestSeconds: 120 }),
  ex({ id: "chair_sit_to_stand", name: "椅子坐站", englishName: "Chair Sit-to-Stand", category: exerciseSeed("bodyweight_squat").category, primaryMuscles: exerciseSeed("bodyweight_squat").primaryMuscles, secondaryMuscles: exerciseSeed("bodyweight_squat").secondaryMuscles, movementPattern: exerciseSeed("bodyweight_squat").movementPattern, equipment: [chair, bench, stablePlatform], equipmentOptions: [[chair], [bench], [stablePlatform]], difficulty: "beginner0", contraindications: exerciseSeed("bodyweight_squat").contraindications, alternatives: [], defaultRepRange: "8–12次", defaultRestSeconds: 60 }),
  ex({ id: "box_squat", name: "徒手箱式深蹲", englishName: "Bodyweight Box Squat", category: exerciseSeed("bodyweight_squat").category, primaryMuscles: exerciseSeed("bodyweight_squat").primaryMuscles, secondaryMuscles: exerciseSeed("bodyweight_squat").secondaryMuscles, movementPattern: exerciseSeed("bodyweight_squat").movementPattern, equipment: [box, bench, stablePlatform], difficulty: "beginner0", contraindications: exerciseSeed("bodyweight_squat").contraindications, alternatives: ["bodyweight_squat"], defaultRepRange: "8–12次", defaultRestSeconds: 60, aliases: ["箱式深蹲"] }),
  ex({ id: "hip_hinge_drill", name: "徒手髋铰链", englishName: "Bodyweight Hip Hinge", category: exerciseSeed("db_rdl").category, primaryMuscles: exerciseSeed("db_rdl").primaryMuscles, secondaryMuscles: exerciseSeed("db_rdl").secondaryMuscles, movementPattern: exerciseSeed("db_rdl").movementPattern, equipment: [noEquipment], difficulty: "beginner0", contraindications: exerciseSeed("db_rdl").contraindications, alternatives: ["wall_hip_hinge"], defaultRepRange: "8–12次", defaultRestSeconds: 45, isCompound: false }),
  ex({ id: "wall_hip_hinge", name: "墙触臀髋铰链", englishName: "Wall Hip Hinge", category: exerciseSeed("db_rdl").category, primaryMuscles: exerciseSeed("db_rdl").primaryMuscles, secondaryMuscles: exerciseSeed("db_rdl").secondaryMuscles, movementPattern: exerciseSeed("db_rdl").movementPattern, equipment: [noEquipment], difficulty: "beginner0", contraindications: exerciseSeed("db_rdl").contraindications, alternatives: ["hip_hinge_drill"], defaultRepRange: "8–12次", defaultRestSeconds: 45, isCompound: false }),
  ex({ id: "bodyweight_single_leg_hinge", name: "徒手单腿髋铰链", englishName: "Bodyweight Single-leg Hip Hinge", category: exerciseSeed("db_rdl").category, primaryMuscles: exerciseSeed("db_rdl").primaryMuscles, secondaryMuscles: exerciseSeed("db_rdl").secondaryMuscles, movementPattern: exerciseSeed("db_rdl").movementPattern, equipment: [noEquipment], difficulty: "intermediate", contraindications: exerciseSeed("db_rdl").contraindications, alternatives: ["wall_hip_hinge"], defaultRepRange: "8–10次/侧", defaultRestSeconds: 60, isUnilateral: true }),
  ex({ id: "single_leg_rdl", name: "负重单腿罗马尼亚硬拉", englishName: "Weighted Single-leg Romanian Deadlift", category: exerciseSeed("db_rdl").category, primaryMuscles: exerciseSeed("db_rdl").primaryMuscles, secondaryMuscles: exerciseSeed("db_rdl").secondaryMuscles, movementPattern: exerciseSeed("db_rdl").movementPattern, equipment: [adjustableDumbbell, fixedDumbbell, "壶铃"], equipmentOptions: [[adjustableDumbbell], [fixedDumbbell], ["壶铃"]], difficulty: "advanced", contraindications: exerciseSeed("db_rdl").contraindications, alternatives: ["db_rdl", "bodyweight_single_leg_hinge"], defaultRepRange: "8–10次/侧", defaultRestSeconds: 90, isUnilateral: true }),
  ex({ id: "weighted_glute_bridge", name: "负重臀桥", englishName: "Weighted Glute Bridge", category: exerciseSeed("glute_bridge").category, primaryMuscles: exerciseSeed("glute_bridge").primaryMuscles, movementPattern: exerciseSeed("glute_bridge").movementPattern, equipment: [adjustableDumbbell, fixedDumbbell], difficulty: "beginner", alternatives: ["glute_bridge"], defaultRepRange: "10–15次", defaultRestSeconds: 75 }),
  ex({ id: "db_hip_thrust", name: "哑铃臀推", englishName: "Dumbbell Hip Thrust", category: exerciseSeed("glute_bridge").category, primaryMuscles: exerciseSeed("glute_bridge").primaryMuscles, movementPattern: exerciseSeed("glute_bridge").movementPattern, equipment: [adjustableDumbbell, fixedDumbbell, bench], difficulty: "beginner", alternatives: ["weighted_glute_bridge"], defaultRepRange: "8–12次", defaultRestSeconds: 90 }),
  ex({ id: "weighted_pull_up", name: "负重引体向上", englishName: "Weighted Pull-up", category: exerciseSeed("pull_up").category, primaryMuscles: exerciseSeed("pull_up").primaryMuscles, movementPattern: exerciseSeed("pull_up").movementPattern, equipment: [pullupBar, weightedVest, dipBelt, weightPlate], equipmentOptions: [[pullupBar, weightedVest], [pullupBar, dipBelt, weightPlate]], difficulty: "advanced", contraindications: exerciseSeed("pull_up").contraindications, alternatives: ["pull_up"], defaultRepRange: "4–8次", defaultRestSeconds: 150 }),
  ex({ id: "band_assisted_dip", name: "弹力带辅助双杠臂屈伸", englishName: "Band-assisted Dip", category: exerciseSeed("dip").category, primaryMuscles: exerciseSeed("dip").primaryMuscles, secondaryMuscles: exerciseSeed("dip").secondaryMuscles, movementPattern: exerciseSeed("dip").movementPattern, equipment: [parallelBars, resistanceBand], equipmentOptions: [[parallelBars, resistanceBand]], difficulty: "intermediate", contraindications: exerciseSeed("dip").contraindications, alternatives: ["close_push_up"], defaultRepRange: "6–10次", defaultRestSeconds: 90 }),
  ex({ id: "assisted_dip_machine", name: "器械辅助双杠臂屈伸", englishName: "Assisted Dip Machine", category: exerciseSeed("dip").category, primaryMuscles: exerciseSeed("dip").primaryMuscles, secondaryMuscles: exerciseSeed("dip").secondaryMuscles, movementPattern: exerciseSeed("dip").movementPattern, equipment: [assistedDipMachine], difficulty: "beginner", contraindications: exerciseSeed("dip").contraindications, alternatives: ["band_assisted_dip"], defaultRepRange: "8–12次", defaultRestSeconds: 90 }),
  ex({ id: "weighted_dip", name: "负重双杠臂屈伸", englishName: "Weighted Dip", category: exerciseSeed("dip").category, primaryMuscles: exerciseSeed("dip").primaryMuscles, secondaryMuscles: exerciseSeed("dip").secondaryMuscles, movementPattern: exerciseSeed("dip").movementPattern, equipment: [parallelBars, weightedVest, dipBelt, weightPlate], equipmentOptions: [[parallelBars, weightedVest], [parallelBars, dipBelt, weightPlate]], difficulty: "advanced", contraindications: exerciseSeed("dip").contraindications, alternatives: ["dip"], defaultRepRange: "4–8次", defaultRestSeconds: 150 }),
  ex({ id: "standing_db_shoulder_press", name: "站姿哑铃肩推", englishName: "Standing Dumbbell Shoulder Press", category: exerciseSeed("db_shoulder_press").category, primaryMuscles: exerciseSeed("db_shoulder_press").primaryMuscles, movementPattern: exerciseSeed("db_shoulder_press").movementPattern, equipment: [adjustableDumbbell, fixedDumbbell], difficulty: "intermediate", contraindications: exerciseSeed("db_shoulder_press").contraindications, alternatives: ["db_shoulder_press"], defaultRepRange: "8–12次", defaultRestSeconds: 90 }),
  ex({ id: "incline_plank", name: "上斜平板支撑", englishName: "Incline Plank", category: exerciseSeed("plank").category, primaryMuscles: exerciseSeed("plank").primaryMuscles, movementPattern: exerciseSeed("plank").movementPattern, equipment: [bench, box, chair, stablePlatform], equipmentOptions: [[bench], [box], [chair], [stablePlatform]], difficulty: "beginner0", alternatives: ["knee_plank"], defaultRepRange: "20–45秒", defaultRestSeconds: 45, isCompound: false }),
  ex({ id: "knee_plank", name: "跪姿平板支撑", englishName: "Knee Plank", category: exerciseSeed("plank").category, primaryMuscles: exerciseSeed("plank").primaryMuscles, movementPattern: exerciseSeed("plank").movementPattern, equipment: [noEquipment, yogaMat], difficulty: "beginner0", alternatives: ["incline_plank"], defaultRepRange: "20–45秒", defaultRestSeconds: 45, isCompound: false }),
  ex({ id: "long_lever_plank", name: "长杠杆平板支撑", englishName: "Long-lever Plank", category: exerciseSeed("plank").category, primaryMuscles: exerciseSeed("plank").primaryMuscles, movementPattern: exerciseSeed("plank").movementPattern, equipment: [noEquipment, yogaMat], difficulty: "intermediate", alternatives: ["plank"], defaultRepRange: "15–40秒", defaultRestSeconds: 60, isCompound: false }),
  // TODO(equipment-model): 瑜伽垫是地面动作的舒适可选项；当前 equipmentOptions 用 OR 近似表达，不会因没有瑜伽垫而禁止训练。
  ex({ id: "weighted_plank", name: "负重平板支撑", englishName: "Weighted Plank", category: exerciseSeed("plank").category, primaryMuscles: exerciseSeed("plank").primaryMuscles, movementPattern: exerciseSeed("plank").movementPattern, equipment: [weightedVest, securedSandbag], equipmentOptions: [[weightedVest], [securedSandbag]], equipmentOptionSafety: [{ option: [weightedVest], canTrainAlone: true }, { option: [securedSandbag], requiresSecuredLoad: true }], difficulty: "advanced", alternatives: ["long_lever_plank"], defaultRepRange: "20–45秒", defaultRestSeconds: 75, isCompound: false }),
  ex({ id: "knee_side_plank", name: "屈膝侧平板", englishName: "Knee Side Plank", category: exerciseSeed("side_plank").category, primaryMuscles: exerciseSeed("side_plank").primaryMuscles, movementPattern: exerciseSeed("side_plank").movementPattern, equipment: [noEquipment, yogaMat], difficulty: "beginner0", alternatives: ["side_plank"], defaultRepRange: "15–30秒/侧", defaultRestSeconds: 45, isCompound: false, isUnilateral: true }),
  ex({ id: "side_plank_leg_raise", name: "抬腿侧平板", englishName: "Side Plank Leg Raise", category: exerciseSeed("side_plank").category, primaryMuscles: exerciseSeed("side_plank").primaryMuscles, movementPattern: exerciseSeed("side_plank").movementPattern, equipment: [noEquipment, yogaMat], difficulty: "intermediate", alternatives: ["side_plank"], defaultRepRange: "8–12次/侧", defaultRestSeconds: 60, isCompound: false, isUnilateral: true }),
  ex({ id: "weighted_side_plank", name: "负重侧平板", englishName: "Weighted Side Plank", category: exerciseSeed("side_plank").category, primaryMuscles: exerciseSeed("side_plank").primaryMuscles, movementPattern: exerciseSeed("side_plank").movementPattern, equipment: [weightedVest, weightPlate, securedSandbag], equipmentOptions: [[weightedVest], [weightPlate], [securedSandbag]], equipmentOptionSafety: [{ option: [weightedVest], canTrainAlone: true }, { option: [weightPlate], canHoldLoadAlone: true }, { option: [securedSandbag], requiresSecuredLoad: true }], difficulty: "advanced", alternatives: ["side_plank_leg_raise"], defaultRepRange: "20–45秒/侧", defaultRestSeconds: 75, isCompound: false, isUnilateral: true })
);

const PROGRESSION_CHAINS = [
  ["wall_push_up", "high_incline_push_up", "low_incline_push_up", "push_up", "close_push_up", "weighted_push_up"],
  ["db_bench", "barbell_bench", "incline_barbell_bench"],
  ["band_pulldown", "lat_pulldown", "assisted_pull_up_machine", "band_assisted_pull_up", "pull_up", "weighted_pull_up"],
  ["seated_row", "chest_supported_row", "one_arm_db_row", "barbell_row"],
  ["assisted_dip_machine", "band_assisted_dip", "dip", "weighted_dip"],
  ["chair_sit_to_stand", "box_squat", "bodyweight_squat", "goblet_squat", "smith_squat", "barbell_squat"],
  ["hip_hinge_drill", "wall_hip_hinge", "bodyweight_single_leg_hinge", "rdl", "single_leg_rdl"],
  ["glute_bridge", "weighted_glute_bridge", "db_hip_thrust", "barbell_hip_thrust"],
  ["lunge", "bulgarian_split_squat"],
  ["incline_plank", "plank", "long_lever_plank", "weighted_plank"],
  ["knee_plank", "plank", "long_lever_plank", "weighted_plank"],
  ["knee_side_plank", "side_plank", "side_plank_leg_raise", "weighted_side_plank"],
  ["lying_leg_raise", "hanging_leg_raise"]
];

const DIFFICULTY_OVERRIDES = {
  wall_push_up: { difficultyLevel: "novice", difficultyScore: 1, beginnerFriendly: true, skillDifficulty: 1, strengthRequirement: 1, stabilityDemand: 1 },
  high_incline_push_up: { difficultyLevel: "novice", difficultyScore: 1.3, beginnerFriendly: true, skillDifficulty: 1, strengthRequirement: 1.5, stabilityDemand: 1.5 },
  low_incline_push_up: { difficultyLevel: "novice", difficultyScore: 2, beginnerFriendly: true, skillDifficulty: 2, strengthRequirement: 2.5, stabilityDemand: 2 },
  push_up: { difficultyLevel: "beginner", difficultyScore: 3, beginnerFriendly: true, skillDifficulty: 2, strengthRequirement: 3, stabilityDemand: 3, technicalComplexity: 2 },
  incline_push_up: { difficultyLevel: "novice", difficultyScore: 1.6, beginnerFriendly: true, suggestedNextIds: ["low_incline_push_up"], alternativeIds: ["high_incline_push_up", "kneeling_push_up"], autoCandidate: false, programRole: "deprecated", exerciseRole: "skill_drill", countsTowardEffectiveSets: false, countsAsWorkSet: false, countsTowardMuscleVolume: false, replacedBy: ["high_incline_push_up", "low_incline_push_up"] },
  kneeling_push_up: { difficultyLevel: "novice", difficultyScore: 2, beginnerFriendly: true, suggestedNextIds: ["low_incline_push_up", "push_up"], alternativeIds: ["high_incline_push_up"] },
  weighted_push_up: { difficultyLevel: "advanced", difficultyScore: 5, beginnerFriendly: false, skillDifficulty: 3, strengthRequirement: 5, stabilityDemand: 4, fatigueCost: 4 },
  machine_chest_press: { difficultyLevel: "beginner", difficultyScore: 2, beginnerFriendly: true, stabilityDemand: 1, suggestedNextIds: ["db_bench"], alternativeIds: ["push_up"] },
  db_bench: { difficultyLevel: "beginner", difficultyScore: 2.5, beginnerFriendly: true, stabilityDemand: 2, suggestedNextIds: ["incline_db_bench", "barbell_bench"] },
  incline_db_bench: { difficultyLevel: "beginner", difficultyScore: 2.5, beginnerFriendly: true, stabilityDemand: 2.5, alternativeIds: ["db_bench"], suggestedNextIds: ["barbell_bench"] },
  barbell_bench: { difficultyLevel: "intermediate", difficultyScore: 4, requiresSpotter: true, requiresSpotterOrSafetyArms: true, requiresSetupSkill: true },
  incline_barbell_bench: { difficultyLevel: "intermediate", difficultyScore: 4.5, requiresSpotter: true, requiresSpotterOrSafetyArms: true, requiresSetupSkill: true },
  pull_up: { difficultyLevel: "intermediate", difficultyScore: 4, beginnerFriendly: false, skillDifficulty: 3, strengthRequirement: 5, technicalComplexity: 3, fatigueCost: 4 },
  weighted_pull_up: { difficultyLevel: "advanced", difficultyScore: 5, beginnerFriendly: false, skillDifficulty: 3, strengthRequirement: 5, fatigueCost: 5 },
  band_assisted_pull_up: { difficultyLevel: "beginner", difficultyScore: 3, strengthRequirement: 3 },
  assisted_pull_up_machine: { difficultyLevel: "beginner", difficultyScore: 2.5, strengthRequirement: 2, stabilityDemand: 1 },
  standing_scapular_retraction: { exerciseRole: "activation", programRole: "activation", countsTowardEffectiveSets: false, fatigueCost: 1, alternativeIds: ["standing_reverse_fly"] },
  wall_angel: { exerciseRole: "warmup", programRole: "warmup", countsTowardEffectiveSets: false, fatigueCost: 1, alternativeIds: [] },
  standing_reverse_fly: { exerciseRole: "activation", programRole: "activation", countsTowardEffectiveSets: false, fatigueCost: 1, alternativeIds: ["standing_scapular_retraction"] },
  chest_supported_row: { difficultyLevel: "beginner", difficultyScore: 2.5, beginnerFriendly: true, spinalLoad: 1 },
  one_arm_db_row: { difficultyLevel: "intermediate", difficultyScore: 3, stabilityDemand: 3 },
  barbell_row: { difficultyLevel: "intermediate", difficultyScore: 4, spinalLoad: 4, requiresSetupSkill: true },
  straight_arm_pulldown: { alternativeIds: [] },
  db_shoulder_press: { difficultyLevel: "beginner", difficultyScore: 2, spinalLoad: 1, skillDifficulty: 2, stabilityDemand: 2, alternativeIds: ["standing_db_shoulder_press", "machine_shoulder_press"] },
  standing_db_shoulder_press: { difficultyLevel: "intermediate", difficultyScore: 3, skillDifficulty: 3, strengthRequirement: 3, stabilityDemand: 3, spinalLoad: 3, requiresSetupSkill: false },
  barbell_press: { difficultyLevel: "intermediate", difficultyScore: 4, skillDifficulty: 3, strengthRequirement: 4, spinalLoad: 3, requiresSetupSkill: true },
  db_fly: { exerciseRole: "isolation", programRole: "workset" },
  cable_fly: { exerciseRole: "isolation", programRole: "workset" },
  straight_arm_pulldown: { exerciseRole: "isolation", programRole: "workset", alternativeIds: [] },
  face_pull: { exerciseRole: "accessory", programRole: "workset" },
  reverse_fly: { exerciseRole: "accessory", programRole: "workset" },
  lateral_raise: { exerciseRole: "isolation", programRole: "workset" },
  cable_lateral_raise: { exerciseRole: "isolation", programRole: "workset" },
  front_raise: { selectionPenalty: 8, exerciseRole: "isolation", programRole: "workset", countsTowardEffectiveSets: true, alternativeIds: [] },
  db_curl: { exerciseRole: "isolation", programRole: "workset" },
  hammer_curl: { exerciseRole: "isolation", programRole: "workset" },
  barbell_curl: { difficultyLevel: "beginner", difficultyScore: 2, skillDifficulty: 2, strengthRequirement: 2, requiresSetupSkill: false, exerciseRole: "isolation", programRole: "workset" },
  cable_curl: { exerciseRole: "isolation", programRole: "workset" },
  preacher_curl: { difficultyLevel: "beginner", difficultyScore: 2, skillDifficulty: 1, strengthRequirement: 2, requiresSetupSkill: false, exerciseRole: "isolation", programRole: "workset" },
  triceps_pushdown: { exerciseRole: "isolation", programRole: "workset", alternativeIds: ["straight_bar_pushdown"] },
  straight_bar_pushdown: { exerciseRole: "isolation", programRole: "workset" },
  overhead_extension: { exerciseRole: "isolation", programRole: "workset" },
  close_grip_bench: { requiresSpotter: true, requiresSpotterOrSafetyArms: true, requiresSetupSkill: true, alternativeIds: ["close_push_up"] },
  close_push_up: { difficultyLevel: "intermediate", difficultyScore: 4, alternativeIds: ["dip"] },
  assisted_dip_machine: { difficultyLevel: "beginner", difficultyScore: 3, jointStress: 2.5, strengthRequirement: 2.5, setupComplexity: 2 },
  band_assisted_dip: { difficultyLevel: "intermediate", difficultyScore: 3.5, jointStress: 3, strengthRequirement: 3 },
  dip: { difficultyLevel: "advanced", difficultyScore: 4, jointStress: 4 },
  weighted_dip: { difficultyLevel: "advanced", difficultyScore: 5, jointStress: 5, strengthRequirement: 5, fatigueCost: 5, requiresSetupSkill: true },
  chair_sit_to_stand: { difficultyLevel: "novice", difficultyScore: 1, beginnerFriendly: true, skillDifficulty: 1, strengthRequirement: 1, mobilityDemand: 1, suggestedNextIds: ["box_squat"] },
  box_squat: { difficultyLevel: "novice", difficultyScore: 1.5, beginnerFriendly: true, skillDifficulty: 1, strengthRequirement: 1, mobilityDemand: 2, movementSubtype: "supported" },
  bodyweight_squat: { difficultyLevel: "novice", difficultyScore: 2, beginnerFriendly: true, movementSubtype: "free_weight", alternativeIds: [] },
  goblet_squat: { difficultyLevel: "beginner", difficultyScore: 3, beginnerFriendly: true, movementSubtype: "free_weight", alternativeIds: ["smith_squat"] },
  smith_squat: { difficultyLevel: "intermediate", difficultyScore: 3.5, movementSubtype: "machine", alternativeIds: ["goblet_squat", "barbell_squat"] },
  barbell_squat: { difficultyLevel: "intermediate", difficultyScore: 4, skillDifficulty: 3, strengthRequirement: 4, spinalLoad: 4, requiresRack: true, requiresSpotter: true, requiresSetupSkill: true, requiresSafetyArmsOrSpotterForHeavySets: true, movementSubtype: "free_weight", alternativeIds: ["smith_squat", "goblet_squat"] },
  leg_press: { movementSubtype: "machine" },
  bulgarian_split_squat: { difficultyLevel: "intermediate", difficultyScore: 4, stabilityDemand: 4, coordinationDemand: 4, beginnerFriendly: false, difficultyScope: "base_movement_pattern" },
  lunge: { difficultyLevel: "intermediate", difficultyScore: 3, stabilityDemand: 3, alternativeIds: ["step_up", "bulgarian_split_squat"] },
  step_up: { difficultyLevel: "beginner", difficultyScore: 2, stabilityDemand: 2, alternativeIds: ["lunge"], difficultyScope: "base_movement_pattern", stepHeightSensitive: true, supportedVariationDifficulty: "扶持低台阶更接近 beginner；高台阶、负重或无扶持会提高到 intermediate。" },
  hip_hinge_drill: { difficultyLevel: "novice", difficultyScore: 1, beginnerFriendly: true, skillDifficulty: 1, strengthRequirement: 1, spinalLoad: 1, exerciseRole: "skill_drill", programRole: "activation", countsTowardEffectiveSets: false, suggestedNextIds: ["wall_hip_hinge"] },
  wall_hip_hinge: { difficultyLevel: "novice", difficultyScore: 1.5, beginnerFriendly: true, skillDifficulty: 1, strengthRequirement: 1, spinalLoad: 1, exerciseRole: "skill_drill", programRole: "activation", countsTowardEffectiveSets: false, alternativeIds: ["hip_hinge_drill"] },
  rdl: { difficultyLevel: "intermediate", difficultyScore: 4, skillDifficulty: 3, strengthRequirement: 4, spinalLoad: 4, requiresSetupSkill: true, alternativeIds: ["db_rdl"] },
  db_rdl: { difficultyLevel: "intermediate", difficultyScore: 3, skillDifficulty: 3, strengthRequirement: 3, spinalLoad: 3, suggestedNextIds: ["rdl", "single_leg_rdl"] },
  bodyweight_single_leg_hinge: { difficultyLevel: "intermediate", difficultyScore: 3.5, beginnerFriendly: false, skillDifficulty: 3, strengthRequirement: 2, stabilityDemand: 4, spinalLoad: 2, alternativeIds: [], suggestedNextIds: ["db_rdl", "rdl"] },
  single_leg_rdl: { difficultyLevel: "advanced", difficultyScore: 4.5, beginnerFriendly: false, skillDifficulty: 4, strengthRequirement: 4, stabilityDemand: 5, spinalLoad: 3 },
  glute_bridge: { difficultyLevel: "novice", difficultyScore: 1.5, beginnerFriendly: true, strengthRequirement: 1, stabilityDemand: 1, alternativeIds: [] },
  weighted_glute_bridge: { difficultyLevel: "beginner", difficultyScore: 2, beginnerFriendly: true, strengthRequirement: 2, stabilityDemand: 2 },
  db_hip_thrust: { difficultyLevel: "beginner", difficultyScore: 3, beginnerFriendly: true, skillDifficulty: 2, strengthRequirement: 3, stabilityDemand: 2 },
  barbell_hip_thrust: { difficultyLevel: "intermediate", difficultyScore: 4, skillDifficulty: 3, strengthRequirement: 4, requiresSetupSkill: true },
  hip_abduction: { difficultyLevel: "beginner", difficultyScore: 2, skillDifficulty: 1, strengthRequirement: 2, fatigueCost: 2, exerciseRole: "accessory", programRole: "workset", alternativeIds: [] },
  leg_extension: { exerciseRole: "isolation", programRole: "workset", alternativeIds: [] },
  leg_curl: { exerciseRole: "isolation", programRole: "workset" },
  cable_kickback: { difficultyLevel: "beginner", difficultyScore: 3, skillDifficulty: 2, strengthRequirement: 2, stabilityDemand: 3, coordinationDemand: 2.5, fatigueCost: 2, exerciseRole: "isolation", programRole: "workset", alternativeIds: [] },
  incline_plank: { difficultyLevel: "novice", difficultyScore: 1, beginnerFriendly: true, skillDifficulty: 1, strengthRequirement: 1, stabilityDemand: 1 },
  knee_plank: { difficultyLevel: "novice", difficultyScore: 1.5, beginnerFriendly: true, skillDifficulty: 1, strengthRequirement: 1.5, stabilityDemand: 1.5 },
  plank: { difficultyLevel: "novice", difficultyScore: 2, beginnerFriendly: true },
  long_lever_plank: { difficultyLevel: "intermediate", difficultyScore: 3.5, skillDifficulty: 2, strengthRequirement: 4, stabilityDemand: 3 },
  weighted_plank: { difficultyLevel: "advanced", difficultyScore: 4.5, skillDifficulty: 2, strengthRequirement: 4, stabilityDemand: 3.5, requiresSetupSkill: true },
  side_plank: { difficultyLevel: "intermediate", difficultyScore: 3, stabilityDemand: 3 },
  knee_side_plank: { difficultyLevel: "novice", difficultyScore: 1, beginnerFriendly: true, stabilityDemand: 2, skillDifficulty: 1 },
  side_plank_leg_raise: { difficultyLevel: "intermediate", difficultyScore: 4, stabilityDemand: 4, skillDifficulty: 3, prerequisites: ["side_plank"] },
  weighted_side_plank: { difficultyLevel: "advanced", difficultyScore: 5, stabilityDemand: 4, strengthRequirement: 4, skillDifficulty: 3 },
  dead_bug: { difficultyLevel: "novice", difficultyScore: 1, beginnerFriendly: true },
  bird_dog: { difficultyLevel: "novice", difficultyScore: 1, beginnerFriendly: true },
  hanging_leg_raise: { difficultyLevel: "advanced", difficultyScore: 5, stabilityDemand: 4 },
  reverse_crunch: { difficultyLevel: "beginner", difficultyScore: 2, beginnerFriendly: true },
  lying_leg_raise: { difficultyLevel: "intermediate", difficultyScore: 3, skillDifficulty: 2, strengthRequirement: 3, stabilityDemand: 3 },
  farmer_carry: { difficultyLevel: "intermediate", difficultyScore: 3, exerciseRole: "loaded_carry", programRole: "workset", countsTowardMuscleVolume: false, trackingMode: "distance" },
  wall_sit: { exerciseRole: "accessory", programRole: "workset", countsTowardMuscleVolume: false, trackingMode: "duration" },
  plank: { difficultyLevel: "novice", difficultyScore: 2, beginnerFriendly: true, exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "duration" },
  incline_plank: { exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "duration" },
  knee_plank: { exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "duration" },
  long_lever_plank: { difficultyLevel: "intermediate", difficultyScore: 3.5, skillDifficulty: 2, strengthRequirement: 4, stabilityDemand: 3, exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "duration" },
  weighted_plank: { difficultyLevel: "advanced", difficultyScore: 4.5, skillDifficulty: 2, strengthRequirement: 4, stabilityDemand: 3.5, requiresSetupSkill: true, exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "duration" },
  side_plank: { difficultyLevel: "intermediate", difficultyScore: 3, stabilityDemand: 3, exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "duration" },
  knee_side_plank: { exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "duration" },
  side_plank_leg_raise: { difficultyLevel: "intermediate", difficultyScore: 4, stabilityDemand: 4, skillDifficulty: 3, prerequisites: ["side_plank"], exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "reps_per_side" },
  weighted_side_plank: { difficultyLevel: "advanced", difficultyScore: 5, stabilityDemand: 4, strengthRequirement: 4, skillDifficulty: 3, exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "duration" },
  dead_bug: { exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "reps_per_side" },
  bird_dog: { exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "reps_per_side" },
  crunch: { exerciseRole: "core", countsTowardMuscleVolume: true, trackingMode: "reps" },
  reverse_crunch: { exerciseRole: "core", countsTowardMuscleVolume: true, trackingMode: "reps" },
  hanging_leg_raise: { difficultyLevel: "advanced", difficultyScore: 5, stabilityDemand: 4, exerciseRole: "core", countsTowardMuscleVolume: true, trackingMode: "reps" },
  lying_leg_raise: { difficultyLevel: "intermediate", difficultyScore: 3, skillDifficulty: 2, strengthRequirement: 3, stabilityDemand: 3, exerciseRole: "core", countsTowardMuscleVolume: true, trackingMode: "reps" },
  pallof_press: { exerciseRole: "core", countsTowardMuscleVolume: false, trackingMode: "reps_per_side" },
  superman: { difficultyLevel: "beginner", difficultyScore: 2, beginnerFriendly: false, skillDifficulty: 2, spinalLoad: 2, exerciseRole: "activation", programRole: "activation", countsTowardEffectiveSets: false, selectionPenalty: 10 },
  mountain_climber: { difficultyLevel: "intermediate", difficultyScore: 3, fatigueCost: 3 },
  jumping_jack: { difficultyLevel: "beginner", difficultyScore: 2, jointStress: 3 },
  high_knee: { difficultyLevel: "intermediate", difficultyScore: 3, jointStress: 3 },
  jump_rope: { difficultyLevel: "intermediate", difficultyScore: 3, coordinationDemand: 4 },
  rowing_machine: { difficultyLevel: "intermediate", difficultyScore: 3, technicalComplexity: 3 },
  low_impact_circuit: { difficultyLevel: "novice", difficultyScore: 1, beginnerFriendly: true }
};

function chainNeighbors(id) {
  const regressionIds = [];
  const progressionIds = [];
  for (const chain of PROGRESSION_CHAINS.filter(items => items.includes(id))) {
    const index = chain.indexOf(id);
    if (index > 0) regressionIds.push(chain[index - 1]);
    if (index >= 0 && index < chain.length - 1) progressionIds.push(chain[index + 1]);
  }
  return {
    regressionIds: [...new Set(regressionIds)],
    progressionIds: [...new Set(progressionIds)]
  };
}

function cardioProgressionFields(exercise) {
  if (exercise.category !== "有氧") {
    return { intensityPrescription: null, duration: null, resistance: null, intervalStructure: null };
  }
  const name = `${exercise.id}${exercise.name}${exercise.englishName}`;
  if (/running|跑步/.test(name)) {
    return {
      intensityPrescription: "优先用配速、坡度和心率区间控制强度。",
      duration: exercise.defaultRepRange,
      resistance: "户外跑以配速和路线坡度进阶；跑步机以速度和坡度进阶。",
      intervalStructure: "可从稳态慢跑进阶到快慢跑间歇，例如快跑1分钟、慢走1–2分钟。"
    };
  }
  if (/bike|单车/.test(name)) {
    return {
      intensityPrescription: "优先用踏频、阻力档位和心率区间控制强度。",
      duration: exercise.defaultRepRange,
      resistance: "逐步增加阻力档位或维持相同阻力下提高踏频。",
      intervalStructure: "可采用中低阻力稳态，或30–60秒高踏频间歇。"
    };
  }
  if (/rowing|划船/.test(name)) {
    return {
      intensityPrescription: "优先用桨频、划距配速和动作质量控制强度。",
      duration: exercise.defaultRepRange,
      resistance: "先稳定技术，再小幅增加风阻/阻力或提高每500米配速。",
      intervalStructure: "可用250–500米重复间歇，组间低强度划船恢复。"
    };
  }
  if (/elliptical|椭圆/.test(name)) {
    return {
      intensityPrescription: "优先用步频、阻力和心率区间控制强度，保持低冲击。",
      duration: exercise.defaultRepRange,
      resistance: "逐步增加阻力或坡度，避免为了强度牺牲步态稳定。",
      intervalStructure: "以稳态为主，也可加入1–2分钟中高强度段。"
    };
  }
  if (/stair|爬楼/.test(name)) {
    return {
      intensityPrescription: "优先用台阶速度、扶手依赖程度和心率区间控制强度。",
      duration: exercise.defaultRepRange,
      resistance: "通过速度、持续时间和减少扶手借力进阶。",
      intervalStructure: "可采用2–4分钟中等强度爬楼，穿插低速恢复。"
    };
  }
  if (/mountain_climber|登山/.test(name)) {
    return {
      intensityPrescription: "优先用支撑稳定性、节奏、工作时间和核心控制质量管理强度。",
      duration: exercise.defaultRepRange,
      resistance: "不使用坡度或器械阻力模板；通过动作节奏、工作/休息比例和动作幅度进阶。",
      intervalStructure: "短间歇：工作15–40秒，休息30–90秒；保持肩、腕和核心稳定。"
    };
  }
  if (/low_impact_circuit|低冲击循环/.test(name)) {
    return {
      intensityPrescription: "优先用动作组合、循环轮数、休息时间和可持续呼吸控制强度。",
      duration: exercise.defaultRepRange,
      resistance: "不使用坡度或器械阻力模板；通过增加轮数、延长工作时间或缩短休息时间进阶。",
      intervalStructure: "低冲击循环：每个动作20–45秒，动作间休息15–45秒，按疲劳程度调整轮数。"
    };
  }
  if (/jump_rope|跳绳/.test(name)) {
    return {
      intensityPrescription: "优先用跳绳节奏、连续时间、落地质量和心率区间控制强度。",
      duration: exercise.defaultRepRange,
      resistance: "通过节奏、连续跳时长、步法复杂度和组间休息进阶，不写成器械阻力进阶。",
      intervalStructure: "短间歇：跳20–60秒，休息30–90秒；优先保证落地轻柔。"
    };
  }
  if (/jumping_jack|high_knee|开合跳|高抬腿/.test(name)) {
    return {
      intensityPrescription: "优先用冲击承受度、节奏和心率区间控制强度。",
      duration: exercise.defaultRepRange,
      resistance: "通过节奏、动作幅度、接触时间和工作时长控制难度。",
      intervalStructure: "短间歇：工作20–60秒，休息30–90秒；优先保证落地轻柔。"
    };
  }
  if (/brisk_walk|快走/.test(name)) {
    return {
      intensityPrescription: "优先用步速、坡度和可交谈程度控制强度。",
      duration: exercise.defaultRepRange,
      resistance: "通过步速、坡度、路线起伏或持续时间进阶。",
      intervalStructure: "以稳态为主，可加入短时间加速步行。"
    };
  }
  return {
    intensityPrescription: "优先用心率区间、动作质量和可持续呼吸控制强度。",
    duration: exercise.defaultRepRange,
    resistance: "根据动作类型用速度、节奏、坡度、阻力或持续时间进阶。",
    intervalStructure: exercise.tags.includes("hiit") ? "短间歇：工作20–60秒，休息30–90秒。" : "稳态或低冲击循环，按疲劳程度调整。"
  };
}

const EQUIPMENT_ID_BY_LABEL = {
  "无器械": "bodyweight",
  "瑜伽垫": "yoga_mat",
  "弹力带": "resistance_band",
  "弹力带固定点": "band_anchor",
  "可调哑铃": "adjustable_dumbbells",
  "固定哑铃": "fixed_dumbbells",
  "壶铃": "kettlebell",
  "杠铃": "barbell",
  "深蹲架": "squat_rack",
  "史密斯机": "smith_machine",
  "卧推凳": "bench",
  "可调节卧凳": "adjustable_bench",
  "拉力器": "cable_machine",
  "高位下拉器": "lat_pulldown_machine",
  "腿举机": "leg_press_machine",
  "腿屈伸机": "leg_extension_machine",
  "腿弯举机": "leg_curl_machine",
  "跑步机": "treadmill",
  "椭圆机": "elliptical",
  "单车": "bike",
  "划船机": "rowing_machine",
  "引体向上杆": "pull_up_bar",
  "双杠": "parallel_bars",
  "辅助臂屈伸机": "assisted_dip_machine",
  "辅助引体向上机": "assisted_pull_up_machine",
  "牧师椅": "preacher_bench",
  "爬楼机": "stair_climber",
  "器械推胸": "machine_chest_press",
  "器械肩推": "machine_shoulder_press",
  "髋外展机": "hip_abduction_machine",
  "椅子": "chair",
  "箱子": "box",
  "稳定台面": "stable_platform",
  "负重背心": "weighted_vest",
  "固定沙袋": "secured_sandbag",
  "杠铃片": "weight_plate",
  "负重腰带": "dip_belt",
  "安全臂": "safety_arms",
  "保护架": "safety_rack",
  "跳绳": "jump_rope"
};

const EQUIPMENT_LABEL_BY_ID = Object.fromEntries(Object.entries(EQUIPMENT_ID_BY_LABEL).map(([label, id]) => [id, label]));
const equipmentId = item => EQUIPMENT_ID_BY_LABEL[item] || item;
const equipmentLabel = item => EQUIPMENT_LABEL_BY_ID[item] || item;
const normalizeEquipmentOption = option => option.map(equipmentId);

function deriveEquipmentOptions(equipment = []) {
  const ids = equipment.map(equipmentId);
  const has = id => ids.includes(id);
  const dumbbells = ids.filter(id => ["adjustable_dumbbells", "fixed_dumbbells"].includes(id));
  if (!ids.length) return [["bodyweight"]];
  if (has("bodyweight")) return [["bodyweight"], ...(has("yoga_mat") ? [["yoga_mat"]] : [])];
  if (dumbbells.length && has("bench")) return dumbbells.map(id => [id, "bench"]);
  if (dumbbells.length && ids.every(id => ["adjustable_dumbbells", "fixed_dumbbells"].includes(id))) return dumbbells.map(id => [id]);
  if (ids.some(id => ["chair", "box", "stable_platform"].includes(id))) return ids.map(id => [id]);
  if (ids.includes("barbell") && (ids.includes("bench") || ids.includes("squat_rack"))) return [ids];
  if (ids.length > 1 && !ids.includes("barbell")) return ids.map(id => [id]);
  return [ids];
}

function equipmentOptionLabels(equipmentOptions = []) {
  return [...new Set(equipmentOptions.flat().map(equipmentLabel))];
}

function inferExerciseMetadata(exercise) {
  const baseLevel = exercise.difficulty === "beginner0" ? "novice" : exercise.difficulty;
  const baseScore = DIFFICULTY_SCORE_BY_LEVEL[exercise.difficulty] || 2;
  const technicalComplexity = clamp(baseScore + (exercise.isUnilateral ? 1 : 0) + (/杠铃|硬拉|深蹲|引体|悬垂/.test(`${exercise.name}${exercise.movementPattern}`) ? 1 : 0), 1, 5);
  const stabilityDemand = clamp(baseScore + (exercise.isUnilateral ? 1 : 0) + (exercise.equipment.includes("无器械") && /俯卧撑|平板|弓步|登山/.test(exercise.name) ? 1 : 0), 1, 5);
  const mobilityDemand = clamp((/深蹲|弓步|肩推|推举|悬垂/.test(`${exercise.name}${exercise.movementPattern}`) ? baseScore + 1 : baseScore), 1, 5);
  const coordinationDemand = clamp(baseScore + (exercise.isUnilateral ? 1 : 0) + (exercise.tags.includes("jump") ? 1 : 0), 1, 5);
  const spinalLoad = /杠铃|硬拉|划船|负重行走|深蹲/.test(`${exercise.name}${exercise.movementPattern}`) ? clamp(baseScore + 1, 1, 5) : clamp(baseScore - 1, 1, 5);
  const jointStress = /跳|跑|深蹲|弓步|臂屈伸|引体/.test(`${exercise.name}${exercise.movementPattern}`) ? clamp(baseScore + 1, 1, 5) : baseScore;
  const fatigueCost = exercise.isCompound ? clamp(baseScore + 1, 1, 5) : baseScore;
  const skillDifficulty = technicalComplexity;
  const strengthRequirement = clamp(baseScore + (/引体|负重|杠铃|硬拉|深蹲|臂屈伸|臀推/.test(`${exercise.name}${exercise.movementPattern}`) ? 1 : 0), 1, 5);
  const painSensitiveAreas = (exercise.contraindications || [])
    .map(item => item.replace("不适", "").replace("不能做", "").replace("类动作", ""))
    .filter(Boolean);
  const sourceLimitations = exercise.contraindications || [];
  const hardContraindications = sourceLimitations.filter(item => !item.endsWith("不适"));
  const cautions = [
    ...(exercise.cautions || []),
    ...sourceLimitations.filter(item => item.endsWith("不适"))
  ];
  const isCardio = exercise.category === "有氧";
  const cardioFields = cardioProgressionFields(exercise);
  const overrides = DIFFICULTY_OVERRIDES[exercise.id] || {};
  const defaultEquipmentOptions = (exercise.equipmentOptions || deriveEquipmentOptions(exercise.equipment)).map(normalizeEquipmentOption);
  const defaultProgramRole = overrides.programRole || exercise.programRole || "workset";
  const defaultExerciseRole = overrides.exerciseRole || exercise.exerciseRole || (isCardio ? "cardio" : exercise.isCompound ? "primary_compound" : "accessory");
  const isNonWorkSegment = ["warmup", "activation", "deprecated"].includes(defaultProgramRole) || ["warmup", "activation", "skill_drill"].includes(defaultExerciseRole);
  const defaultCountsAsWorkSet = !isNonWorkSegment;
  const defaultCountsTowardMuscleVolume = defaultCountsAsWorkSet && !isCardio && !["cardio", "core", "loaded_carry"].includes(defaultExerciseRole);
  const merged = {
    difficultyLevel: baseLevel,
    difficultyScore: baseScore,
    skillDifficulty,
    strengthRequirement,
    technicalComplexity,
    stabilityDemand,
    mobilityDemand,
    coordinationDemand,
    spinalLoad,
    jointStress,
    fatigueCost,
    beginnerFriendly: baseScore <= 2 && !exercise.isUnilateral,
    requiresSpotter: false,
    requiresSpotterOrSafetyArms: false,
    requiresSetupSkill: /杠铃|深蹲架|史密斯|卧推/.test(exercise.equipment.join("")),
    setupComplexity: /杠铃|深蹲架|史密斯|卧推|辅助/.test(exercise.equipment.join("")) ? 3 : exercise.equipment.length > 1 ? 2 : 1,
    prerequisites: [],
    exerciseRole: defaultExerciseRole,
    programRole: defaultProgramRole,
    countsAsWorkSet: defaultCountsAsWorkSet,
    countsTowardMuscleVolume: defaultCountsTowardMuscleVolume,
    countsTowardEffectiveSets: defaultCountsAsWorkSet,
    equipmentOptions: defaultEquipmentOptions,
    equipmentOptionSafety: (exercise.equipmentOptionSafety || []).map(rule => ({ ...rule, option: normalizeEquipmentOption(rule.option || []) })),
    suggestedNextIds: [],
    replacedBy: exercise.replacedBy || [],
    contraindications: hardContraindications,
    cautions,
    painSensitiveAreas,
    impactLevel: isCardio ? (exercise.tags.includes("jump") ? "high" : exercise.tags.includes("lowImpact") ? "low" : "medium") : null,
    ...cardioFields,
    recommendedExperienceLevels: baseScore <= 1 ? ["novice", "beginner"] : baseScore <= 2 ? ["beginner", "intermediate"] : baseScore <= 3 ? ["intermediate", "advanced"] : ["advanced"],
    alternativeIds: exercise.alternatives || [],
    ...chainNeighbors(exercise.id),
    ...overrides
  };
  if (!merged.programRole && merged.trainingRole) merged.programRole = ["activation", "warmup", "deprecated"].includes(merged.trainingRole) ? merged.trainingRole : "workset";
  if (merged.trainingRole && !merged.programRole) merged.programRole = merged.trainingRole;
  if (merged.countsTowardEffectiveSets === undefined && merged.countsAsEffectiveSet !== undefined) merged.countsTowardEffectiveSets = merged.countsAsEffectiveSet;
  if (merged.countsAsWorkSet === undefined) merged.countsAsWorkSet = Boolean(merged.countsTowardEffectiveSets);
  if (merged.countsTowardMuscleVolume === undefined) merged.countsTowardMuscleVolume = Boolean(merged.countsAsWorkSet && merged.exerciseRole !== "cardio" && !["warmup", "activation", "deprecated"].includes(merged.programRole));
  if (["warmup", "activation", "deprecated"].includes(merged.programRole) || ["warmup", "activation", "skill_drill"].includes(merged.exerciseRole)) {
    merged.countsAsWorkSet = false;
    merged.countsTowardMuscleVolume = false;
    merged.countsTowardEffectiveSets = false;
  }
  if (["cardio", "loaded_carry"].includes(merged.exerciseRole) || isCardio || (merged.exerciseRole === "core" && merged.countsTowardMuscleVolume !== true)) {
    merged.countsAsWorkSet = true;
    merged.countsTowardMuscleVolume = false;
    merged.countsTowardEffectiveSets = true;
  }
  merged.trainingRole = merged.programRole;
  merged.countsAsEffectiveSet = merged.countsAsWorkSet;
  merged.equipment = equipmentOptionLabels(merged.equipmentOptions);
  const linkedProgressions = new Set([...(merged.regressionIds || []), ...(merged.progressionIds || [])]);
  merged.alternativeIds = (merged.alternativeIds || []).filter(id => !linkedProgressions.has(id));
  if (merged.difficultyScore <= 2 && overrides.beginnerFriendly === undefined) merged.beginnerFriendly = true;
  if (merged.difficultyScore >= 4 && overrides.beginnerFriendly === undefined) merged.beginnerFriendly = false;
  return Object.assign(exercise, merged);
}

EXERCISES.forEach(inferExerciseMetadata);

const exerciseById = new Map(EXERCISES.map(item => [item.id, item]));

function trainingTargetSet(exercise) {
  return new Set([...(exercise.primaryMuscles || []), ...(exercise.secondaryMuscles || [])]);
}

function hasSharedTrainingTarget(a, b) {
  const targetA = trainingTargetSet(a);
  return [...trainingTargetSet(b)].some(item => targetA.has(item));
}

function alternativeTypeFor(exercise, alternative) {
  if (!alternative) return "missing";
  if (alternative.movementPattern === exercise.movementPattern) return "samePattern";
  if (hasSharedTrainingTarget(exercise, alternative)) return "sameMuscleDifferentPattern";
  return "invalid";
}

function alternativeRiskFor(exercise, alternative) {
  if (!alternative) {
    return {
      fatigueCostDelta: null,
      jointStressDelta: null,
      setupComplexityDelta: null,
      exerciseRoleMismatch: true,
      tooDifferentForSilentReplacement: true
    };
  }
  const fatigueCostDelta = Math.abs((alternative.fatigueCost || 1) - (exercise.fatigueCost || 1));
  const jointStressDelta = Math.abs((alternative.jointStress || 1) - (exercise.jointStress || 1));
  const setupComplexityDelta = Math.abs((alternative.setupComplexity || 1) - (exercise.setupComplexity || 1));
  const exerciseRoleMismatch = (alternative.exerciseRole || "compound") !== (exercise.exerciseRole || "compound");
  const crossPattern = alternative.movementPattern !== exercise.movementPattern;
  return {
    fatigueCostDelta,
    jointStressDelta,
    setupComplexityDelta,
    exerciseRoleMismatch,
    tooDifferentForSilentReplacement: Boolean(
      crossPattern && (fatigueCostDelta > 1 || jointStressDelta > 1 || setupComplexityDelta > 1 || exerciseRoleMismatch)
    )
  };
}

function alternativeDetailsFor(exercise) {
  return (exercise.alternativeIds || []).map(id => {
    const alternative = exerciseById.get(id);
    const risk = alternativeRiskFor(exercise, alternative);
    return {
      id,
      type: alternativeTypeFor(exercise, alternative),
      movementPattern: alternative?.movementPattern || null,
      exerciseRole: alternative?.exerciseRole || null,
      requiresPatternCoverageValidation: Boolean(alternative && alternative.movementPattern !== exercise.movementPattern),
      requiresReplacementSafetyValidation: risk.tooDifferentForSilentReplacement,
      ...risk
    };
  });
}

EXERCISES.forEach(exercise => {
  exercise.alternativeDetails = alternativeDetailsFor(exercise);
});

export function validateExerciseProgressionGraph() {
  const errors = [];
  for (const exercise of EXERCISES) {
    for (const progressionId of exercise.progressionIds || []) {
      const progression = exerciseById.get(progressionId);
      if (!progression) {
        errors.push(`${exercise.id} progression ${progressionId} 不存在`);
        continue;
      }
      if (progression.movementPattern !== exercise.movementPattern) errors.push(`${exercise.id} -> ${progressionId} 动作模式不一致`);
      if (!hasSharedTrainingTarget(exercise, progression)) errors.push(`${exercise.id} -> ${progressionId} 主要训练目标不一致`);
      const progressionScore = progression.difficultyScore || 0;
      const currentScore = exercise.difficultyScore || 0;
      const allowedMaxScoreProgression = progressionScore === 5 && currentScore === 5 && /^weighted_/.test(progression.id);
      if (progressionScore <= currentScore && !allowedMaxScoreProgression) errors.push(`${exercise.id} -> ${progressionId} 难度没有升高`);
      if ((exercise.alternativeIds || []).includes(progressionId)) errors.push(`${exercise.id} -> ${progressionId} 把 alternative 当成 progression`);
    }
    for (const regressionId of exercise.regressionIds || []) {
      const regression = exerciseById.get(regressionId);
      if (!regression) {
        errors.push(`${exercise.id} regression ${regressionId} 不存在`);
        continue;
      }
      if (regression.movementPattern !== exercise.movementPattern) errors.push(`${exercise.id} <- ${regressionId} 动作模式不一致`);
      if (!hasSharedTrainingTarget(exercise, regression)) errors.push(`${exercise.id} <- ${regressionId} 主要训练目标不一致`);
      const regressionScore = regression.difficultyScore || 0;
      const currentScore = exercise.difficultyScore || 0;
      const allowedMaxScoreRegression = regressionScore === 5 && currentScore === 5 && /^weighted_/.test(exercise.id);
      if (regressionScore >= currentScore && !allowedMaxScoreRegression) errors.push(`${exercise.id} <- ${regressionId} 难度没有降低`);
      if ((exercise.alternativeIds || []).includes(regressionId)) errors.push(`${exercise.id} <- ${regressionId} 把 alternative 当成 regression`);
    }
    for (const suggestedId of exercise.suggestedNextIds || []) {
      const suggested = exerciseById.get(suggestedId);
      if (!suggested) {
        errors.push(`${exercise.id} suggestedNext ${suggestedId} 不存在`);
        continue;
      }
      if (!hasSharedTrainingTarget(exercise, suggested)) errors.push(`${exercise.id} suggestedNext ${suggestedId} 训练目标不一致`);
    }
    for (const alternativeId of exercise.alternativeIds || []) {
      const alternative = exerciseById.get(alternativeId);
      if (!alternative) {
        errors.push(`${exercise.id} alternative ${alternativeId} 不存在`);
        continue;
      }
      if (!hasSharedTrainingTarget(exercise, alternative)) errors.push(`${exercise.id} alternative ${alternativeId} 没有共享训练目标`);
    }
    const overlap = (exercise.alternativeIds || []).filter(id => (exercise.suggestedNextIds || []).includes(id));
    if (overlap.length) errors.push(`${exercise.id} alternativeIds 和 suggestedNextIds 重复：${overlap.join(",")}`);
    for (const progressionId of exercise.progressionIds || []) {
      const progression = exerciseById.get(progressionId);
      if (progression?.prerequisites?.length && !progression.prerequisites.includes(exercise.id)) {
        errors.push(`${exercise.id} -> ${progressionId} 有 prerequisites 但不包含当前动作`);
      }
    }
  }
  return { ok: errors.length === 0, errors };
}

export function validateExerciseLibrary() {
  const errors = [];
  const seenIds = new Set();
  const duplicateIds = new Set();
  const knownEquipmentIds = new Set([
    ...Object.values(EQUIPMENT_ID_BY_LABEL),
    ...Object.values(LOCATION_EQUIPMENT).flat().map(equipmentId)
  ]);
  const byId = new Map(EXERCISES.map(item => [item.id, item]));
  const supportEquipment = new Set(["bench", "adjustable_bench", "chair", "box", "stable_platform", "preacher_bench"]);
  const raisedSupportEquipment = new Set(["bench", "chair", "box", "stable_platform"]);
  const validRoles = new Set(["primary_compound", "secondary_compound", "isolation", "accessory", "loaded_carry", "core", "cardio", "skill_drill", "activation", "warmup"]);
  const dynamicAbsIds = new Set(["crunch", "reverse_crunch", "hanging_leg_raise", "lying_leg_raise"]);
  const coreControlIds = new Set(["plank", "side_plank", "dead_bug", "bird_dog", "pallof_press", "incline_plank", "knee_plank", "long_lever_plank", "knee_side_plank", "side_plank_leg_raise", "weighted_plank", "weighted_side_plank"]);

  for (const exercise of EXERCISES) {
    if (seenIds.has(exercise.id)) duplicateIds.add(exercise.id);
    seenIds.add(exercise.id);

    if ((exercise.difficultyScore ?? 0) < 1 || (exercise.difficultyScore ?? 0) > 5) {
      errors.push(`${exercise.id}: difficultyScore 必须在 1～5 范围内`);
    }
    if (!validRoles.has(exercise.exerciseRole)) {
      errors.push(`${exercise.id}: exerciseRole 无效：${exercise.exerciseRole}`);
    }
    if (exercise.programRole === "deprecated" && exercise.autoCandidate !== false) {
      errors.push(`${exercise.id}: deprecated 动作不能进入新计划候选池`);
    }
    if (["warmup", "activation", "deprecated"].includes(exercise.programRole) || ["warmup", "activation", "skill_drill"].includes(exercise.exerciseRole)) {
      if (exercise.countsAsWorkSet || exercise.countsTowardMuscleVolume) {
        errors.push(`${exercise.id}: ${exercise.programRole}/${exercise.exerciseRole} 不应计入工作组或肌肉有效组`);
      }
    }
    if (exercise.exerciseRole === "cardio" && exercise.countsTowardMuscleVolume) {
      errors.push(`${exercise.id}: 有氧动作不得计入肌肉有效组`);
    }
    if (exercise.programRole === "workset" && !Array.isArray(exercise.equipmentOptions)) {
      errors.push(`${exercise.id}: 工作动作缺少 equipmentOptions`);
    }
    if (exercise.programRole === "workset" && Array.isArray(exercise.equipmentOptions) && exercise.equipmentOptions.length === 0) {
      errors.push(`${exercise.id}: 工作动作至少需要一个完整 equipmentOptions 组合`);
    }
    for (const option of exercise.equipmentOptions || []) {
      if (!Array.isArray(option) || option.length === 0) {
        errors.push(`${exercise.id}: equipmentOptions 存在空组合`);
        continue;
      }
      for (const item of option) {
        if (!knownEquipmentIds.has(equipmentId(item))) errors.push(`${exercise.id}: 未知器械 ID：${item}`);
      }
    }
    const normalizedOptionKeys = (exercise.equipmentOptions || []).map(option => option.map(equipmentId).sort().join("+"));
    if (normalizedOptionKeys.length !== new Set(normalizedOptionKeys).size) {
      errors.push(`${exercise.id}: equipmentOptions 存在重复组合`);
    }
    for (const replacementId of exercise.replacedBy || []) {
      const replacement = byId.get(replacementId);
      if (!replacement) {
        errors.push(`${exercise.id}: replacedBy 指向不存在动作 ${replacementId}`);
      } else if (replacement.programRole === "deprecated") {
        errors.push(`${exercise.id}: replacedBy 不应指向弃用动作 ${replacementId}`);
      }
    }
    const needsSupport = exercise.id === "db_shoulder_press" || /卧推|牧师椅|箱式|坐站/.test(`${exercise.name}${exercise.englishName}`);
    if (needsSupport && exercise.programRole === "workset") {
      const hasSupportOption = (exercise.equipmentOptions || []).some(option => option.some(item => supportEquipment.has(equipmentId(item))));
      if (!hasSupportOption) errors.push(`${exercise.id}: 依赖坐姿/支撑面的动作缺少卧凳、椅子、箱子或平台`);
    }
    if (exercise.id === "step_up") {
      const hasPlatform = (exercise.equipmentOptions || []).every(option => option.some(item => raisedSupportEquipment.has(equipmentId(item))));
      if (!hasPlatform) errors.push("step_up: 每个器械方案都必须包含箱子、卧推凳、椅子或稳定台面");
    }
    if (exercise.id === "bulgarian_split_squat") {
      const hasRearFootSupport = (exercise.equipmentOptions || []).every(option => option.some(item => raisedSupportEquipment.has(equipmentId(item))));
      if (!hasRearFootSupport) errors.push("bulgarian_split_squat: 每个器械方案都必须包含后脚支撑面");
    }
    if (exercise.id === "incline_plank") {
      const hasRaisedSupport = (exercise.equipmentOptions || []).every(option => option.some(item => raisedSupportEquipment.has(equipmentId(item))));
      if (!hasRaisedSupport) errors.push("incline_plank: 每个器械方案都必须包含抬高支撑面");
    }
    if (exercise.id === "weighted_plank" && (exercise.equipmentOptions || []).some(option => option.includes("weight_plate"))) {
      errors.push("weighted_plank: 不应保留单独杠铃片负重方案，需与负重俯卧撑安全策略一致");
    }
    if (["barbell_bench", "close_grip_bench"].includes(exercise.id)) {
      const hasRack = (exercise.equipmentOptions || []).every(option => option.includes("barbell") && option.includes("bench") && option.includes("squat_rack"));
      if (!hasRack) errors.push(`${exercise.id}: 每个杠铃卧推方案都必须包含杠铃、卧推凳和可取放杠铃的架体，保护架不能单独替代架体`);
    }
    if (exercise.id === "incline_db_bench") {
      const hasAdjustableBench = (exercise.equipmentOptions || []).every(option => option.includes("adjustable_bench") && option.some(item => ["adjustable_dumbbells", "fixed_dumbbells"].includes(equipmentId(item))));
      if (!hasAdjustableBench) errors.push("incline_db_bench: 每个上斜哑铃卧推方案都必须包含可调节卧凳");
    }
    if (exercise.id === "incline_barbell_bench") {
      const hasAdjustableBenchAndRack = (exercise.equipmentOptions || []).every(option => option.includes("barbell") && option.includes("adjustable_bench") && option.includes("squat_rack"));
      if (!hasAdjustableBenchAndRack) errors.push("incline_barbell_bench: 每个上斜杠铃卧推方案都必须包含杠铃、可调节卧凳和可取放杠铃的架体");
    }
    if (exercise.id === "band_pulldown") {
      const hasAnchor = (exercise.equipmentOptions || []).every(option => option.includes("resistance_band") && option.includes("band_anchor"));
      if (!hasAnchor) errors.push("band_pulldown: 弹力带方案必须包含固定点");
    }
    if (["face_pull", "pallof_press"].includes(exercise.id)) {
      const bandOptionsNeedAnchor = (exercise.equipmentOptions || []).every(option => !option.includes("resistance_band") || option.includes("band_anchor"));
      if (!bandOptionsNeedAnchor) errors.push(`${exercise.id}: 弹力带方案必须包含固定点`);
    }
    if (exercise.id === "hip_abduction" && (exercise.equipmentOptions || []).some(option => option.includes("resistance_band") && option.includes("band_anchor"))) {
      errors.push("hip_abduction: 髋外展弹力带方案不应强制固定点");
    }
    if (exercise.countsAsWorkSet === undefined || exercise.countsTowardMuscleVolume === undefined) {
      errors.push(`${exercise.id}: 新统计字段不能为 undefined`);
    }
    if (dynamicAbsIds.has(exercise.id) && (!exercise.countsAsWorkSet || !exercise.countsTowardMuscleVolume || exercise.trackingMode !== "reps")) {
      errors.push(`${exercise.id}: 动态腹肌动作必须计入核心直接训练量，并使用 reps 追踪`);
    }
    if (coreControlIds.has(exercise.id) && (!exercise.countsAsWorkSet || exercise.countsTowardMuscleVolume)) {
      errors.push(`${exercise.id}: 控制/抗动核心动作应计入正式训练段，但不计入肌肉有效组`);
    }
    if (exercise.id === "farmer_carry" && (!exercise.countsAsWorkSet || exercise.countsTowardMuscleVolume || !["distance", "duration"].includes(exercise.trackingMode))) {
      errors.push("farmer_carry: 应作为正式负重行走训练段追踪，但不计入普通肌肉有效组");
    }
    if (exercise.id === "wall_sit" && (!exercise.countsAsWorkSet || exercise.countsTowardMuscleVolume || exercise.trackingMode !== "duration")) {
      errors.push("wall_sit: 静力动作应按 duration 追踪，且不计入普通肌肉有效组");
    }
  }

  for (const id of duplicateIds) errors.push(`动作 ID 重复：${id}`);
  const graph = validateExerciseProgressionGraph();
  errors.push(...graph.errors);
  return { ok: errors.length === 0, errors };
}

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
    ...(exercise.aliases || []),
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
  const available = new Set((settings.availableEquipment || []).map(equipmentId));
  const options = exercise.equipmentOptions || deriveEquipmentOptions(exercise.equipment);
  if (available.size === 1 && available.has("bodyweight")) {
    return options.some(option => option.every(item => ["bodyweight", "yoga_mat"].includes(equipmentId(item))));
  }
  return options.some(option => option.map(equipmentId).every(item => available.has(item)));
}

export function isExerciseAllowed(exercise, settings) {
  const experience = settings.experienceLevel || "beginner";
  const maxDifficultyScore = EXPERIENCE_MAX_DIFFICULTY_SCORE[experience] ?? 3;
  const limitations = new Set(settings.limitations || []);
  const masteredExerciseIds = new Set(settings.masteredExerciseIds || []);
  if (exercise.autoCandidate === false) return false;
  if (settings.trainingLocation === "homeNone" && !(exercise.equipmentOptions || []).some(option => option.every(item => ["bodyweight", "yoga_mat", "chair", "box", "bench", "stable_platform"].includes(equipmentId(item))))) return false;
  if (!equipmentAllowed(exercise, settings)) return false;
  if (exercise.category !== "有氧" && (exercise.difficultyScore || 2) > maxDifficultyScore) return false;
  if ((exercise.prerequisites || []).length && !exercise.prerequisites.every(id => masteredExerciseIds.has(id))) return false;
  if (["beginner0", "novice"].includes(experience) && !exercise.beginnerFriendly && (exercise.technicalComplexity >= 3 || exercise.stabilityDemand >= 3)) return false;
  const hasSpotterOrSafetyArms = Boolean(settings.hasSpotterOrSafetyArms || settings.hasSpotter || (settings.availableEquipment || []).some(item => ["安全臂", "保护架"].includes(item)));
  const plannedHeavyLowRir = settings.primaryGoal === "strength" && !["beginner0", "beginner"].includes(experience);
  const trainsAlone = Boolean(settings.trainsAlone || settings.isTrainingAlone || settings.trainingAlone);
  if (exercise.requiresSafetyArmsOrSpotterForHeavySets && plannedHeavyLowRir && trainsAlone && !hasSpotterOrSafetyArms) return false;
  if (exercise.requiresSpotterOrSafetyArms && !hasSpotterOrSafetyArms && ["beginner0", "novice", "beginner"].includes(experience)) return false;
  if (["beginner0", "novice", "beginner"].includes(experience) && (exercise.requiresSpotter || (exercise.requiresSetupSkill && exercise.difficultyScore >= 4))) return false;
  if (isDislikedExercise(exercise, settings.dislikedExercises)) return false;
  if (exercise.contraindications.some(item => limitations.has(item))) return false;
  if (limitations.has("腰部不适") && (exercise.painSensitiveAreas || []).includes("腰部") && (exercise.spinalLoad || 1) >= 3) return false;
  if (limitations.has("肩部不适") && (exercise.painSensitiveAreas || []).includes("肩部") && (exercise.jointStress || 1) >= 4) return false;
  if (limitations.has("膝盖不适") && (exercise.painSensitiveAreas || []).includes("膝盖") && (exercise.jointStress || 1) >= 3) return false;
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
  if ((theme.includes("推") || theme.includes("胸")) && /背|腿|臀/.test(exercise.category)) return false;
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
  const themedSettings = { ...settings, currentTheme: theme };
  const pool = EXERCISES.filter(item => item.category !== "有氧" && item.programRole === "workset" && isExerciseAllowed(item, themedSettings));
  let themePool = pool.filter(item => exerciseMatchesTheme(item, theme));
  if (!themePool.length) {
    themePool = EXERCISES
      .filter(item => item.category !== "有氧" && item.programRole !== "deprecated" && isExerciseAllowed(item, themedSettings))
      .filter(item => exerciseMatchesTheme(item, theme));
  }
  const picked = [];

  for (const category of categories) {
    const candidates = themePool
      .filter(item => item.category === category || item.primaryMuscles.includes(category))
      .sort((a, b) => experienceSelectionScore(b, themedSettings, usedGlobal) - experienceSelectionScore(a, themedSettings, usedGlobal));
    const next = candidates.find(item => !picked.some(row => row.id === item.id));
    if (next) picked.push(next);
    if (picked.length >= count) break;
  }

  if (picked.length < count) {
    for (const item of themePool.sort((a, b) => experienceSelectionScore(b, themedSettings, usedGlobal) - experienceSelectionScore(a, themedSettings, usedGlobal))) {
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

function equipmentPreferenceScore(exercise, settings) {
  const text = exercise.equipment.join("");
  const styles = settings.preferredStyles || [];
  let score = 0;
  if (styles.includes("喜欢固定器械") && /器械|腿举|腿屈伸|腿弯举|高位下拉|拉力器/.test(text)) score += 4;
  if (styles.includes("喜欢自由重量") && /哑铃|杠铃|壶铃/.test(text)) score += 4;
  if (styles.includes("喜欢自重训练") && exercise.equipment.includes("无器械")) score += 4;
  if (settings.trainingLocation === "commercialGym" && /器械|杠铃|拉力器|高位下拉/.test(text)) score += 1;
  return score;
}

function experienceSelectionScore(exercise, settings, usedGlobal) {
  const experience = settings.experienceLevel || "beginner";
  const difficultyScore = exercise.difficultyScore || 2;
  const priorityMuscles = settings.priorityMuscles || [];
  let score = 0;
  if (usedGlobal.has(exercise.id)) score -= 20;
  if (priorityMuscles.includes(exercise.category) || exercise.primaryMuscles.some(muscle => priorityMuscles.includes(muscle))) score += 4;
  score += equipmentPreferenceScore(exercise, settings);
  if (exercise.isCompound) score += settings.primaryGoal === "strength" || settings.primaryGoal === "muscleGain" ? 3 : 1;
  score -= Number(exercise.selectionPenalty || 0);
  if (exercise.id === "front_raise" && /推|胸|上肢/.test(String(settings.currentTheme || ""))) score -= 6;
  if (exercise.category === "核心" && settings.primaryGoal === "health") score += 2;

  if (["beginner0", "novice"].includes(experience)) {
    score += exercise.beginnerFriendly ? 10 : -12;
    score -= Math.max(0, difficultyScore - 1) * 6;
    score -= exercise.isUnilateral ? 5 : 0;
    score -= exercise.requiresSetupSkill ? 4 : 0;
    if (/器械|高位下拉|腿举|腿屈伸|腿弯举|拉力器/.test(exercise.equipment.join(""))) score += 4;
    if (/死虫|鸟狗|上斜|跪姿|器械|快走|固定单车|椭圆机|靠墙|臀桥|自重/.test(exercise.name)) score += 4;
  } else if (experience === "beginner") {
    score += difficultyScore <= 2 ? 8 : 0;
    score += difficultyScore === 3 ? 2 : 0;
    score -= difficultyScore >= 4 ? 12 : 0;
    score -= exercise.requiresSpotter ? 8 : 0;
    if (/哑铃|器械|弹力带|高位下拉|腿举/.test(exercise.equipment.join(""))) score += 3;
  } else if (experience === "intermediate") {
    score += difficultyScore === 3 ? 8 : difficultyScore === 4 ? 4 : 1;
    score += /哑铃|杠铃|拉力器|高位下拉/.test(exercise.equipment.join("")) ? 4 : 0;
    score += exercise.isUnilateral ? 3 : 0;
    score -= difficultyScore <= 1 ? 3 : 0;
    score -= difficultyScore >= 5 ? 8 : 0;
  } else {
    score += difficultyScore >= 3 ? 7 : 2;
    score += difficultyScore === 5 ? 2 : 0;
    score += /杠铃|引体|双杠|悬垂|罗马尼亚|保加利亚/.test(`${exercise.name}${exercise.equipment.join("")}`) ? 4 : 0;
    score -= exercise.jointStress >= 5 ? 2 : 0;
  }

  score -= Math.max(0, exercise.fatigueCost - 3);
  return score;
}

function recommendationReasons(exercise, settings) {
  const reasons = [];
  if (exercise.beginnerFriendly) reasons.push("动作学习成本较低，适合当前训练经验。");
  if (exercise.difficultyScore >= 4) reasons.push("技术或稳定性要求较高，适合作为进阶训练刺激。");
  if (exercise.technicalComplexity <= 2) reasons.push("动作轨迹和发力路径较容易控制。");
  if (exercise.stabilityDemand >= 4) reasons.push("对平衡和核心稳定要求较高，建议保持动作质量。");
  if (equipmentAllowed(exercise, settings)) reasons.push("使用你已选择的可用器械。");
  if ((settings.priorityMuscles || []).includes(exercise.category)) reasons.push("匹配你设置的重点训练部位。");
  return reasons.slice(0, 4);
}

function buildDay(theme, index, settings, usedGlobal, userProfile = {}) {
  let exercises = pickExercises(theme, settings, usedGlobal).map(item => ({
    exerciseId: item.id,
    name: item.name,
    englishName: item.englishName,
    category: item.category,
    targetMuscles: [...item.primaryMuscles, ...item.secondaryMuscles].filter((value, i, arr) => arr.indexOf(value) === i),
    equipment: item.equipment,
    equipmentOptions: item.equipmentOptions,
    equipmentOptionSafety: item.equipmentOptionSafety,
    instructions: item.instructions,
    commonMistakes: item.commonMistakes,
    alternatives: getExerciseAlternatives(item.id, settings).map(alt => ({ id: alt.id, name: alt.name })),
    alternativeDetails: item.alternativeDetails,
    movementPattern: item.movementPattern,
    difficultyLevel: item.difficultyLevel,
    difficultyScore: item.difficultyScore,
    skillDifficulty: item.skillDifficulty,
    strengthRequirement: item.strengthRequirement,
    technicalComplexity: item.technicalComplexity,
    stabilityDemand: item.stabilityDemand,
    mobilityDemand: item.mobilityDemand,
    fatigueCost: item.fatigueCost,
    programRole: item.programRole,
    exerciseRole: item.exerciseRole,
    countsTowardEffectiveSets: item.countsTowardEffectiveSets,
    countsAsEffectiveSet: item.countsAsEffectiveSet,
    countsAsWorkSet: item.countsAsWorkSet,
    countsTowardMuscleVolume: item.countsTowardMuscleVolume,
    trackingMode: item.trackingMode,
    difficultyScope: item.difficultyScope,
    contraindications: item.contraindications,
    cautions: item.cautions,
    painSensitiveAreas: item.painSensitiveAreas,
    suggestedNextIds: item.suggestedNextIds,
    prerequisites: item.prerequisites,
    impactLevel: item.impactLevel,
    intensityPrescription: item.intensityPrescription,
    duration: item.duration,
    resistance: item.resistance,
    intervalStructure: item.intervalStructure,
    recommendationReasons: recommendationReasons(item, settings),
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
      if ((exercise.difficultyScore || 2) > (EXPERIENCE_MAX_DIFFICULTY_SCORE[normalized.experienceLevel] ?? 3)) errors.push(`动作难度超过当前训练经验：${exercise.name}`);
      for (const linkedId of [...(exercise.regressionIds || []), ...(exercise.progressionIds || [])]) {
        if (!exerciseById.has(linkedId)) errors.push(`${exercise.name} 的进阶/退阶动作不存在：${linkedId}`);
      }
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
    if (allRows(trainingDays).some(row => (exerciseById.get(row.exerciseId)?.difficultyScore || 2) >= 4)) errors.push("完全新手计划不应出现高难度动作。");
  }
  if (["beginner", "novice"].includes(settings.experienceLevel)) {
    const highDifficulty = allRows(trainingDays).filter(row => (exerciseById.get(row.exerciseId)?.difficultyScore || 2) >= 4);
    if (highDifficulty.length) errors.push("初级计划不应默认出现高级动作。");
  }
  return { ok: errors.length === 0, errors };
}

function allRows(trainingDays) {
  return trainingDays.flatMap(day => day.exercises || []);
}

export function getExerciseAlternatives(exerciseId, settings = {}) {
  const original = exerciseById.get(exerciseId);
  if (!original) return [];
  const normalized = normalizeSettings(settings);
  const originalRole = original.exerciseRole || "compound";
  const isPrepRole = ["activation", "warmup"].includes(originalRole) || ["activation", "warmup"].includes(original.programRole);
  return EXERCISES
    .filter(item => item.id !== exerciseId)
    .filter(item => item.movementPattern === original.movementPattern)
    .filter(item => !(original.movementPattern === "深蹲" && original.movementSubtype === "free_weight" && item.id === "leg_press"))
    .filter(item => item.primaryMuscles.some(muscle => original.primaryMuscles.includes(muscle)))
    .filter(item => item.autoCandidate !== false)
    .filter(item => {
      const candidateRole = item.exerciseRole || "compound";
      if (isPrepRole) return candidateRole === originalRole || item.programRole === original.programRole;
      return !["activation", "warmup"].includes(candidateRole) && !["activation", "warmup"].includes(item.programRole);
    })
    .filter(item => {
      const risk = alternativeRiskFor(original, item);
      return !risk.tooDifferentForSilentReplacement;
    })
    .filter(item => Math.abs((item.difficultyScore || 2) - (original.difficultyScore || 2)) <= (normalized.experienceLevel === "advanced" ? 2 : 1))
    .filter(item => isExerciseAllowed(item, normalized))
    .sort((a, b) => {
      const aChain = Number((original.regressionIds || []).includes(a.id) || (original.progressionIds || []).includes(a.id));
      const bChain = Number((original.regressionIds || []).includes(b.id) || (original.progressionIds || []).includes(b.id));
      const aSubtypeScore = Number(a.movementSubtype && a.movementSubtype === original.movementSubtype);
      const bSubtypeScore = Number(b.movementSubtype && b.movementSubtype === original.movementSubtype);
      return bChain - aChain || bSubtypeScore - aSubtypeScore || experienceSelectionScore(b, normalized, new Set()) - experienceSelectionScore(a, normalized, new Set());
    })
    .slice(0, 5);
}

export function shouldProgressExercise(userExerciseProficiency = {}, exercise, logs = []) {
  if (!exercise) return { shouldProgress: false, reason: "动作不存在。", nextExerciseIds: [] };
  const completed = Number(userExerciseProficiency.sessionsCompleted || logs.length || 0);
  const successful = Number(userExerciseProficiency.successfulSessions || logs.filter(log => log.completed !== false).length || 0);
  const painReported = Boolean(userExerciseProficiency.painReported || logs.some(log => log.painReported));
  const lowRir = logs.some(log => Number(log.rir) < 1);
  const ready = Boolean(userExerciseProficiency.readyForProgression || (completed >= 3 && successful >= 3 && !painReported && !lowRir));
  const nextExerciseIds = (exercise.progressionIds || []).filter(id => {
    const next = exerciseById.get(id);
    return next && (next.prerequisites || []).every(prerequisiteId => prerequisiteId === exercise.id || (userExerciseProficiency.masteredExerciseIds || []).includes(prerequisiteId));
  });
  if (!ready) {
    return { shouldProgress: false, reason: "当前动作尚未稳定完成足够次数，暂不建议进阶。", nextExerciseIds };
  }
  return {
    shouldProgress: Boolean(nextExerciseIds.length),
    reason: `你已稳定完成 ${exercise.name}，可以考虑尝试下一阶动作。`,
    nextExerciseIds
  };
}

export function shouldRegressExercise(userExerciseProficiency = {}, exercise, logs = []) {
  if (!exercise) return { shouldRegress: false, reason: "动作不存在。", regressionExerciseIds: [] };
  const painReported = Boolean(userExerciseProficiency.painReported || logs.some(log => log.painReported));
  const failedSessions = logs.filter(log => log.completed === false || log.failedReps || Number(log.rir) < 0).length;
  const tooHard = userExerciseProficiency.status === "regressed" || userExerciseProficiency.formConfidence === "low";
  const shouldRegress = painReported || failedSessions >= 2 || tooHard;
  return {
    shouldRegress,
    reason: shouldRegress ? `${exercise.name} 当前可能过难，建议先退阶巩固动作质量。` : "当前没有明显退阶信号。",
    regressionExerciseIds: exercise.regressionIds || []
  };
}

export const TRAINING_DATA_SHAPES = {
  trainingProfiles: ["userId", "primaryGoal", "secondaryGoal", "experienceLevel", "weeklyTrainingDays", "availableDays", "sessionDuration", "trainingLocation", "availableEquipment", "limitations", "priorityMuscles", "dislikedExercises", "preferredStyles", "selectedSplit", "createdAt", "updatedAt"],
  workoutPlans: ["id", "userId", "weekStart", "splitType", "goal", "days", "status", "version", "createdAt", "updatedAt"],
  workoutSessions: ["id", "planId", "userId", "date", "workoutDayId", "startedAt", "completedAt", "duration", "exercises", "notes", "perceivedDifficulty", "status"],
  exerciseLogs: ["userId", "sessionId", "exerciseId", "setNumber", "targetReps", "actualReps", "targetWeight", "actualWeight", "rir", "completed", "createdAt"],
  userExerciseProficiency: ["userId", "exerciseId", "status", "proficiencyLevel", "sessionsCompleted", "successfulSessions", "lastUsedAt", "averageRir", "formConfidence", "painReported", "readyForProgression"]
};
