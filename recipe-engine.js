const roundTo = (value, step = 5) => Math.max(step, Math.round(value / step) * step);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const FOOD_DB = {
  proteins: [
    ["鸡胸肉", 165, 31, 3.6, 0, ["lean", "pan", "bake", "salad"]],
    ["鸡腿肉（去皮）", 172, 25, 6, 0, ["juicy", "stew", "air", "braise"]],
    ["牛肉", 180, 27, 8, 0, ["stir", "stew", "pan"]],
    ["牛里脊", 150, 29, 4, 0, ["lean", "stir", "pan"]],
    ["瘦猪肉", 165, 28, 6, 0, ["stir", "stew", "braise"]],
    ["虾仁", 99, 24, 0.3, 0.2, ["lean", "quick", "salad"]],
    ["三文鱼", 208, 20, 13, 0, ["fish", "pan", "bake", "salad"]],
    ["鳕鱼", 82, 18, 0.7, 0, ["fish", "steam", "stew"]],
    ["巴沙鱼", 90, 18, 2, 0, ["fish", "stew", "pan"]],
    ["金枪鱼", 116, 26, 1, 0, ["lean", "salad", "sandwich"]],
    ["鸡蛋", 144, 13, 10, 1.1, ["breakfast", "quick"]],
    ["豆腐", 84, 8, 5, 2, ["plant", "stew", "stir"]],
    ["豆干", 150, 16, 8, 6, ["plant", "stir"]],
    ["毛豆", 121, 11, 5, 9, ["plant", "snack"]],
    ["希腊酸奶", 73, 10, 2, 3.6, ["breakfast", "snack"]],
    ["无糖豆浆", 31, 3.2, 1.8, 1.2, ["breakfast", "snack"]],
    ["低脂奶酪", 160, 18, 6, 8, ["snack"]]
  ].map(([name, kcal, protein, fat, carbs, tags]) => ({ name, kcal, protein, fat, carbs, tags })),
  staples: [
    ["糙米饭", 116, 2.6, 0.9, 23],
    ["紫米饭", 124, 2.8, 1, 25],
    ["燕麦", 389, 16.9, 6.9, 66],
    ["红薯", 86, 1.6, 0.1, 20],
    ["紫薯", 82, 1.8, 0.1, 19],
    ["玉米", 112, 3.4, 1.5, 22],
    ["山药", 57, 1.9, 0.2, 12],
    ["藜麦", 120, 4.4, 1.9, 21],
    ["荞麦面", 99, 5, 0.7, 21],
    ["全麦面", 112, 5, 0.8, 23],
    ["全麦吐司", 245, 9, 4, 43],
    ["全麦卷饼", 240, 8, 5, 42],
    ["全麦贝果", 250, 10, 2.2, 48],
    ["全麦意面", 124, 5.3, 0.9, 26],
    ["南瓜", 23, 0.7, 0.1, 5.3],
    ["小米", 361, 9, 3.1, 75]
  ].map(([name, kcal, protein, fat, carbs]) => ({ name, kcal, protein, fat, carbs })),
  vegetables: [
    "西兰花", "菠菜", "生菜", "油麦菜", "上海青", "小白菜", "番茄", "黄瓜", "西葫芦", "芦笋",
    "洋葱", "胡萝卜", "紫甘蓝", "包菜", "菜花", "菌菇", "香菇", "金针菇", "杏鲍菇", "木耳",
    "彩椒", "青椒", "秋葵", "冬瓜", "丝瓜", "苦瓜", "茄子", "白萝卜", "芹菜", "豆芽",
    "荷兰豆", "四季豆", "娃娃菜", "韭菜", "莴笋", "莲藕", "海带", "豌豆苗", "空心菜", "茼蒿",
    "苋菜", "黄豆芽", "竹笋", "蒜苔", "茭白", "平菇"
  ].map(name => {
    const starchy = ["莲藕", "胡萝卜", "豌豆苗"].includes(name);
    const mushroom = /菇|木耳/.test(name);
    return { name, kcal: starchy ? 45 : mushroom ? 28 : 22, protein: mushroom ? 2.7 : 1.5, fat: 0.2, carbs: starchy ? 9 : 4 };
  }),
  fruits: [
    "苹果", "香蕉", "蓝莓", "草莓", "橙子", "猕猴桃", "梨", "葡萄", "桃子", "西瓜",
    "哈密瓜", "芒果", "菠萝", "柚子", "樱桃", "火龙果", "奇异果", "木瓜", "李子", "圣女果",
    "橘子", "石榴", "无花果", "柠檬"
  ].map(name => {
    const kcalMap = { 香蕉: 93, 葡萄: 72, 芒果: 65, 蓝莓: 57, 草莓: 32, 西瓜: 31, 圣女果: 22, 柠檬: 29 };
    return { name, kcal: kcalMap[name] || 52, protein: 0.7, fat: 0.2, carbs: name === "香蕉" ? 22 : 12 };
  }),
  nuts: [
    ["杏仁", 579, 21, 50, 22],
    ["核桃", 646, 15, 65, 14],
    ["腰果", 553, 18, 44, 30],
    ["开心果", 562, 20, 45, 28],
    ["榛子", 628, 15, 61, 17],
    ["巴旦木", 579, 21, 50, 22],
    ["南瓜籽", 559, 30, 49, 11]
  ].map(([name, kcal, protein, fat, carbs]) => ({ name, kcal, protein, fat, carbs })),
  fats: [
    ["牛油果", 160, 2, 15, 9],
    ["橄榄油", 884, 0, 100, 0],
    ["亚麻籽", 534, 18, 42, 29],
    ["奇亚籽", 486, 17, 31, 42],
    ["花生酱", 588, 25, 50, 20]
  ].map(([name, kcal, protein, fat, carbs]) => ({ name, kcal, protein, fat, carbs }))
};

const METHODS = [
  { name: "香煎", tags: ["pan"], time: 25, steps: ["蛋白质擦干后用少量盐和黑胡椒腌 5 分钟。", "平底锅烧热，加入计量油，小火到中火煎至两面上色。", "加入蔬菜翻炒或焯熟，搭配主食装盘。"] },
  { name: "黑椒", tags: ["pan", "stir"], time: 25, steps: ["蛋白质切片，用黑胡椒和少量生抽抓匀。", "热锅少油先炒蛋白质，再加入蔬菜。", "收汁后搭配主食，保持酱汁薄薄裹住即可。"] },
  { name: "蒜香", tags: ["quick", "stir", "fish"], time: 20, steps: ["蒜末小火爆香，不要炸糊。", "加入蛋白质煎炒至熟，再放蔬菜。", "用少量盐和黑胡椒调味。"] },
  { name: "柠檬", tags: ["fish", "salad", "pan"], time: 20, steps: ["蛋白质用酸味汁和黑胡椒腌 5 分钟。", "煎、烤或蒸熟后静置 2 分钟。", "搭配清爽蔬菜和主食，最后用少量酸味汁提香。"] },
  { name: "日式", tags: ["fish", "stew", "quick"], time: 25, steps: ["用少量低盐酱油、味淋替代糖重酱汁。", "蛋白质煎熟或炖熟，蔬菜焯水。", "主食铺底后码入食材，撒芝麻或海苔。"] },
  { name: "韩式", tags: ["stir", "salad"], time: 25, steps: ["用少量韩式辣酱、蒜末和醋调低油酱汁。", "蛋白质炒熟，蔬菜分批焯熟或生拌。", "把主食、蛋白质和蔬菜拌匀。"] },
  { name: "照烧", tags: ["pan"], time: 25, steps: ["用低糖照烧汁或酱油加少量蜂蜜调汁。", "蛋白质煎熟后倒入酱汁快速收汁。", "搭配焯熟蔬菜和主食。"] },
  { name: "咖喱", tags: ["stew"], time: 35, steps: ["蛋白质少油炒香。", "加入耐煮主食或根茎类食材，加水炖软。", "放入低脂咖喱块或咖喱粉，最后加入易熟蔬菜。"] },
  { name: "番茄", tags: ["stew", "fish"], time: 30, steps: ["先把多汁蔬菜炒软出汁后加少量水。", "放入蛋白质炖熟，再加入其余蔬菜。", "用黑胡椒和少量盐调味，搭配主食。"] },
  { name: "孜然", tags: ["stir", "pan"], time: 25, steps: ["蛋白质切片并用孜然、胡椒腌制。", "热锅少油快速煎炒。", "加入食谱中的蔬菜，出锅前补少量孜然粉。"] },
  { name: "奥尔良", tags: ["air", "bake"], time: 35, steps: ["用低盐奥尔良粉薄薄腌制蛋白质。", "空气炸锅或烤箱烤至熟透。", "蔬菜焯熟或同烤，搭配主食。"] },
  { name: "清蒸", tags: ["steam", "fish"], time: 25, steps: ["蛋白质铺姜片去腥。", "水开后上锅蒸至中心熟透。", "蔬菜另行焯熟，淋少量低盐酱汁。"] },
  { name: "清炒", tags: ["stir", "quick", "plant"], time: 20, steps: ["热锅少油，先炒蛋白质或豆制品。", "加入蔬菜大火快炒。", "用蒜、胡椒和少量盐调味。"] },
  { name: "炖", tags: ["stew", "braise"], time: 40, steps: ["蛋白质切块焯水或煎至表面变色。", "加入耐煮蔬菜和热水，小火炖煮。", "最后加入叶菜，确认熟透后装盘。"] },
  { name: "焖", tags: ["braise"], time: 35, steps: ["蛋白质和耐煮蔬菜先炒香。", "加入少量水，加盖焖至入味。", "收汁后搭配主食。"] },
  { name: "空气炸锅", tags: ["air"], time: 30, steps: ["蛋白质薄腌后铺入炸篮。", "180℃ 加热，中途翻面。", "蔬菜可同烤或焯熟，出锅后装盘。"] },
  { name: "烤箱", tags: ["bake"], time: 35, steps: ["蛋白质和蔬菜拌少量油与香料。", "平铺烤盘，190℃ 烤至熟透。", "搭配预先煮好的主食。"] },
  { name: "凉拌", tags: ["salad"], time: 15, steps: ["蛋白质提前煮熟或使用即食低脂食材。", "蔬菜洗净沥干，部分蔬菜焯水。", "用醋、少量调味汁和食谱中的健康脂肪拌匀。"] },
  { name: "水煮", tags: ["lean", "quick"], time: 20, steps: ["水开后先煮主食或耐煮蔬菜。", "放入蛋白质煮至完全熟透。", "捞出后用低油蘸汁调味。"] }
];

const BREAKFAST_TEMPLATES = [
  "鸡蛋全麦三明治", "鸡胸肉三明治", "金枪鱼三明治", "燕麦酸奶碗", "香蕉燕麦", "蓝莓燕麦", "鸡蛋羹", "豆浆鸡蛋",
  "紫薯鸡蛋", "小米粥鸡蛋", "希腊酸奶水果碗", "隔夜燕麦", "燕麦蛋饼", "全麦吐司鸡蛋杯", "牛油果鸡蛋吐司",
  "玉米鸡蛋豆浆餐", "山药鸡蛋早餐盘", "紫米饭团", "鸡肉蔬菜早餐卷", "豆腐蔬菜蛋花汤", "金枪鱼开放吐司",
  "燕麦奇亚籽布丁", "酸奶坚果水果杯", "红薯酸奶碗", "菠菜鸡蛋卷", "番茄鸡蛋全麦面", "毛豆鸡蛋饭团",
  "三文鱼全麦贝果", "豆干蔬菜卷饼", "南瓜燕麦粥", "希腊酸奶蓝莓燕麦", "鸡蛋蔬菜全麦饼"
];

const LUNCH_SERIES = ["鸡胸肉系列", "鸡腿肉系列", "牛肉系列", "牛里脊系列", "虾仁系列", "三文鱼系列", "鳕鱼系列", "巴沙鱼系列", "金枪鱼系列", "豆腐系列", "豆干系列", "瘦猪肉系列"];
const DINNER_SERIES = ["沙拉", "炖菜", "汤", "轻食", "空气炸锅系列", "低脂炒菜", "清蒸鱼", "豆腐煲", "番茄汤菜", "烤箱时蔬"];
const SNACK_SERIES = ["水果酸奶杯", "水果坚果盒", "水煮蛋加餐", "毛豆加餐", "红薯加餐", "燕麦酸奶杯", "奇亚籽布丁", "牛油果吐司角", "豆浆坚果", "低脂奶酪水果"];

const SEASONINGS = {
  盐: { name: "盐", kcal: 0, protein: 0, fat: 0, carbs: 0 },
  黑胡椒: { name: "黑胡椒", kcal: 0, protein: 0, fat: 0, carbs: 0 },
  生抽: { name: "生抽", kcal: 0, protein: 0, fat: 0, carbs: 0 },
  醋: { name: "醋", kcal: 0, protein: 0, fat: 0, carbs: 0 },
  孜然粉: { name: "孜然粉", kcal: 0, protein: 0, fat: 0, carbs: 0 },
  咖喱粉: { name: "咖喱粉", kcal: 0, protein: 0, fat: 0, carbs: 0 },
  奥尔良粉: { name: "奥尔良粉", kcal: 0, protein: 0, fat: 0, carbs: 0 },
  低糖照烧汁: { name: "低糖照烧汁", kcal: 0, protein: 0, fat: 0, carbs: 0 },
  韩式辣酱: { name: "韩式辣酱", kcal: 0, protein: 0, fat: 0, carbs: 0 },
  清水: { name: "清水", kcal: 0, protein: 0, fat: 0, carbs: 0 }
};

const COOKWARE_BY_METHOD = {
  香煎: ["平底锅"], 黑椒: ["炒锅"], 蒜香: ["炒锅"], 柠檬: ["平底锅"], 日式: ["平底锅"],
  韩式: ["炒锅"], 照烧: ["平底锅"], 咖喱: ["汤锅"], 番茄: ["汤锅"], 孜然: ["炒锅"],
  奥尔良: ["空气炸锅"], 清蒸: ["蒸锅"], 清炒: ["炒锅"], 炖: ["汤锅"], 焖: ["汤锅"],
  空气炸锅: ["空气炸锅"], 烤箱: ["烤箱", "烤盘"], 凉拌: ["碗"], 水煮: ["汤锅"],
  即食: ["碗"], 隔夜冷藏: ["杯"], 拌制: ["碗"], 快手: ["平底锅"], 蒸煮: ["蒸锅"], 捏制: ["碗"]
};

const NO_COOK_METHODS = new Set(["即食", "隔夜冷藏", "拌制"]);
const HEAT_WORDS = ["加热", "煎", "炒", "煮", "焯水", "炖", "烤", "蒸", "预热", "空气炸锅", "热锅", "沸水", "水开", "小火", "中火", "大火"];
const ALL_KNOWN_INGREDIENT_NAMES = [
  ...FOOD_DB.proteins, ...FOOD_DB.staples, ...FOOD_DB.vegetables, ...FOOD_DB.fruits, ...FOOD_DB.nuts, ...FOOD_DB.fats,
  ...Object.values(SEASONINGS)
].map(item => item.name).sort((a, b) => b.length - a.length);
const ALL_KNOWN_COOKWARE = [...new Set(Object.values(COOKWARE_BY_METHOD).flat())].sort((a, b) => b.length - a.length);

function choice(list, rng = Math.random) {
  return list[Math.floor(rng() * list.length)];
}

function shuffle(list, rng = Math.random) {
  return [...list].sort(() => rng() - 0.5);
}

function macroOf(item, grams) {
  const scale = grams / 100;
  return {
    kcal: item.kcal * scale,
    protein: item.protein * scale,
    fat: item.fat * scale,
    carbs: item.carbs * scale
  };
}

function sumMacros(ingredients) {
  return ingredients.reduce((sum, item) => {
    const m = macroOf(item.ref, item.grams);
    sum.kcal += m.kcal;
    sum.protein += m.protein;
    sum.fat += m.fat;
    sum.carbs += m.carbs;
    return sum;
  }, { kcal: 0, protein: 0, fat: 0, carbs: 0 });
}

function findCompatibleMethod(protein, mealType, rng) {
  const allowed = METHODS.filter(method => method.tags.some(tag => protein.tags.includes(tag)) || (mealType === "dinner" && ["salad", "stew", "air", "bake", "quick"].some(tag => method.tags.includes(tag))));
  return choice(allowed.length ? allowed : METHODS, rng);
}

function targetProfile(profile, nutrition, mealType) {
  const split = { breakfast: 0.25, lunch: 0.35, snack: 0.1, dinner: 0.3 }[mealType];
  const goal = profile.goal;
  const activity = profile.activity;
  const carbFactor = goal === "lose" ? 0.82 : goal === "gain" ? 1.18 : 1;
  const proteinFactor = goal === "lose" ? 1.12 : goal === "gain" ? 1.18 : 1;
  const activityFactor = activity >= 1.7 ? 1.12 : activity >= 1.55 ? 1.06 : activity <= 1.2 ? 0.94 : 1;
  return {
    kcal: nutrition.calories * split,
    protein: nutrition.protein * split * proteinFactor,
    carbs: nutrition.carbs * split * carbFactor * activityFactor,
    fat: nutrition.fat * split
  };
}

function amountPlan(profile, nutrition, mealType, protein, staple, method) {
  const target = targetProfile(profile, nutrition, mealType);
  if (mealType === "snack") return snackAmountPlan(profile, nutrition);
  const goal = profile.goal;
  const proteinBase = mealType === "breakfast" ? 80 : mealType === "lunch" ? 155 : 145;
  const stapleBase = mealType === "breakfast" ? 65 : mealType === "lunch" ? 175 : 135;
  const vegBase = mealType === "lunch" ? 260 : 300;
  const referenceKcal = mealType === "breakfast" ? 430 : mealType === "lunch" ? 650 : 560;
  const kcalScale = clamp(target.kcal / referenceKcal, 0.72, 1.45);
  const proteinScale = clamp(kcalScale * (goal === "gain" ? 1.12 : goal === "lose" ? 1.08 : 1), 0.85, 1.5);
  const carbScale = clamp(kcalScale * (goal === "lose" ? 0.72 : goal === "gain" ? 1.25 : 1) * (profile.activity >= 1.55 ? 1.08 : 1), 0.55, 1.65);
  const proteinG = roundTo(clamp(proteinBase * proteinScale, protein.name === "鸡蛋" ? 50 : 80, protein.name === "希腊酸奶" ? 300 : 260), 5);
  const stapleG = roundTo(clamp(stapleBase * carbScale, 40, 330), 5);
  const vegTotal = roundTo(vegBase * (goal === "lose" ? 1.18 : goal === "gain" ? 0.95 : 1), 10);
  const oilG = method.name === "凉拌" ? 6 : roundTo(clamp((goal === "lose" ? 6 : goal === "gain" ? 10 : 8) * clamp(kcalScale, .85, 1.25), 5, 14), 1);
  return { target, proteinG, stapleG, vegTotal, oilG };
}

function snackAmountPlan(profile, nutrition) {
  const goal = profile.goal;
  const target = targetProfile(profile, nutrition, "snack");
  const scale = clamp(target.kcal / 190, 0.75, 1.6);
  return {
    target,
    fruitG: roundTo((goal === "lose" ? 150 : goal === "gain" ? 220 : 180) * clamp(scale, .85, 1.25), 5),
    dairyG: roundTo((goal === "gain" ? 180 : 150) * clamp(scale, .9, 1.35), 5),
    nutG: roundTo((goal === "lose" ? 10 : goal === "gain" ? 18 : 14) * clamp(scale, .8, 1.35), 1),
    stapleG: roundTo((goal === "gain" ? 120 : 90) * clamp(scale, .85, 1.35), 5)
  };
}

function buildIngredients({ protein, staple, vegetables, fat, plan, mealType }) {
  if (mealType === "snack") return [];
  const vegEach = roundTo(plan.vegTotal / vegetables.length, 5);
  return [
    { name: protein.name, grams: plan.proteinG, unit: "g", ref: protein },
    { name: staple.name, grams: plan.stapleG, unit: "g", ref: staple },
    ...vegetables.map(veg => ({ name: veg.name, grams: vegEach, unit: "g", ref: veg })),
    { name: fat.name, grams: plan.oilG, unit: "g", ref: fat }
  ];
}

function alignFlavorIngredients(method, vegetables, ingredients) {
  if (method.name === "番茄") {
    const tomato = FOOD_DB.vegetables.find(veg => veg.name === "番茄");
    if (tomato && !vegetables.some(veg => veg.name === "番茄")) {
      vegetables[vegetables.length - 1] = tomato;
    }
  }
  if (method.name === "柠檬") {
    const lemon = FOOD_DB.fruits.find(fruit => fruit.name === "柠檬");
    if (lemon && !ingredients.some(item => item.name === "柠檬")) {
      const fatIndex = ingredients.findIndex(item => item.name === "橄榄油" || item.name === "牛油果");
      ingredients.splice(fatIndex >= 0 ? fatIndex : ingredients.length, 0, { name: lemon.name, grams: 15, unit: "g", ref: lemon });
    }
  }
}

function balanceMainMealIngredients(ingredients, targetKcal, goal) {
  const minRatio = goal === "gain" ? 0.95 : goal === "maintain" ? 0.88 : 0.8;
  let macros = sumMacros(ingredients);
  if (macros.kcal >= targetKcal * minRatio) return;

  const staple = ingredients[1];
  const maxStaple = goal === "gain" ? 380 : goal === "maintain" ? 320 : 240;
  const stapleGap = Math.max(0, maxStaple - staple.grams);
  const neededFromStaple = Math.max(0, targetKcal * minRatio - macros.kcal);
  const stapleAdd = Math.min(stapleGap, roundTo((neededFromStaple / staple.ref.kcal) * 100, 5));
  staple.grams += stapleAdd;

  macros = sumMacros(ingredients);
  if (goal !== "gain" || macros.kcal >= targetKcal * minRatio) return;

  const protein = ingredients[0];
  const proteinGap = Math.max(0, 280 - protein.grams);
  const neededFromProtein = Math.max(0, targetKcal * minRatio - macros.kcal);
  const proteinAdd = Math.min(proteinGap, roundTo((neededFromProtein / Math.max(protein.ref.kcal, 1)) * 100, 5));
  protein.grams += proteinAdd;
}

function addSeasonings(ingredients, names) {
  for (const name of names) {
    if (!ingredients.some(item => item.name === name) && SEASONINGS[name]) {
      ingredients.push({ name, grams: name === "清水" ? 200 : 1, unit: name === "清水" ? "ml" : "g", ref: SEASONINGS[name] });
    }
  }
}

function seasoningsForMethod(methodName) {
  const map = {
    香煎: ["盐", "黑胡椒"],
    黑椒: ["黑胡椒", "生抽"],
    蒜香: ["盐", "黑胡椒"],
    柠檬: ["盐", "黑胡椒"],
    日式: ["生抽"],
    韩式: ["韩式辣酱"],
    照烧: ["低糖照烧汁"],
    咖喱: ["清水", "咖喱粉"],
    番茄: ["清水", "盐", "黑胡椒"],
    孜然: ["孜然粉"],
    奥尔良: ["奥尔良粉"],
    清蒸: ["生抽"],
    清炒: ["盐", "黑胡椒"],
    炖: ["清水", "盐"],
    焖: ["清水", "生抽"],
    凉拌: ["醋"],
    水煮: ["清水", "盐"],
    空气炸锅: ["盐", "黑胡椒"],
    烤箱: ["盐", "黑胡椒"]
  };
  return map[methodName] || [];
}

function splitRecipeIngredients(recipe) {
  const seasoningNames = new Set(Object.keys(SEASONINGS));
  const fatNames = new Set(FOOD_DB.fats.map(item => item.name));
  const ingredients = recipe.ingredients;
  return {
    protein: ingredients[0],
    staple: ingredients[1],
    seasonings: ingredients.filter(item => seasoningNames.has(item.name)),
    fats: ingredients.filter(item => fatNames.has(item.name)),
    extras: ingredients.slice(2).filter(item => !seasoningNames.has(item.name) && !fatNames.has(item.name) && item.name !== "柠檬")
  };
}

function listNames(items) {
  return items.filter(Boolean).map(item => item.name).join("、");
}

function safeExtrasText(extras) {
  return extras.length ? listNames(extras) : "配菜";
}

function generateNoCookSteps(recipe) {
  const names = recipe.ingredients.map(item => item.name);
  const tool = recipe.tools?.[0] || "碗";
  const fruits = recipe.ingredients.filter(item => FOOD_DB.fruits.some(fruit => fruit.name === item.name));
  const nuts = recipe.ingredients.filter(item => FOOD_DB.nuts.some(nut => nut.name === item.name));
  const creamy = recipe.ingredients.filter(item => ["希腊酸奶", "低脂奶酪", "无糖豆浆"].includes(item.name));
  const base = recipe.ingredients.filter(item => ["燕麦", "奇亚籽", "全麦吐司", "牛油果"].includes(item.name));
  const steps = [];
  if (fruits.length) steps.push(`将${listNames(fruits)}洗净切块。`);
  if (nuts.length) steps.push(`将${listNames(nuts)}轻轻压碎或切碎备用。`);
  if (creamy.length || base.length) steps.push(`${tool}中依次加入${listNames([...creamy, ...base])}。`);
  const remaining = recipe.ingredients.filter(item => ![...fruits, ...nuts, ...creamy, ...base].includes(item));
  if (remaining.length) steps.push(`放入${listNames(remaining)}。`);
  if (nuts.length || recipe.ingredients.some(item => item.name === "奇亚籽")) steps.push(`撒上${listNames([...nuts, ...recipe.ingredients.filter(item => item.name === "奇亚籽")])}。`);
  steps.push(`将${names.join("、")}轻轻混合或摆盘即可。`);
  return steps.slice(0, 6);
}

function generateMainSteps(recipe) {
  const method = recipe.method;
  const { protein, staple, extras, fats, seasonings } = splitRecipeIngredients(recipe);
  const vegNames = safeExtrasText(extras);
  const fatName = fats[0]?.name;
  const seasoningNames = listNames(seasonings);
  if (["香煎", "黑椒", "蒜香", "孜然", "照烧", "韩式", "清炒"].includes(method)) {
    return [
      `将${protein.name}切成适口大小，${vegNames}洗净切好。`,
      seasoningNames ? `用${seasoningNames}给${protein.name}抓匀腌制 5 分钟。` : `将${protein.name}擦干备用。`,
      `${COOKWARE_BY_METHOD[method][0]}中加入${fatName || "食谱中的油"}，放入${protein.name}翻炒至变色。`,
      extras.length ? `加入${vegNames}继续翻炒至熟。` : `继续翻炒${protein.name}至完全熟透。`,
      `${staple.name}铺底，放入${protein.name}和${vegNames}即可。`
    ];
  }
  if (["炖", "焖", "咖喱", "番茄", "水煮"].includes(method)) {
    return [
      `将${protein.name}切块，${vegNames}洗净切好。`,
      extras.length ? `${COOKWARE_BY_METHOD[method][0]}中放入${protein.name}和较耐煮的${vegNames}。` : `${COOKWARE_BY_METHOD[method][0]}中放入${protein.name}。`,
      `加入适量清水，煮至${protein.name}完全熟透。`,
      seasoningNames ? `加入${seasoningNames}调味。` : `按口味清淡调味。`,
      `搭配${staple.name}装盘即可。`
    ];
  }
  if (method === "清蒸") {
    return [
      `将${protein.name}处理成适口大小，${vegNames}洗净切好。`,
      `把${protein.name}放入${COOKWARE_BY_METHOD[method][0]}蒸至完全熟透。`,
      extras.length ? `${vegNames}另行蒸熟或切好摆盘。` : `${protein.name}蒸好后静置片刻。`,
      seasoningNames ? `用${seasoningNames}给${protein.name}${extras.length ? `和${vegNames}` : ""}调味。` : `按清淡口味调味。`,
      `搭配${staple.name}食用。`
    ];
  }
  if (method === "空气炸锅") {
    return [
      extras.length ? `将${protein.name}切块，${vegNames}洗净切好。` : `将${protein.name}处理成适口大小。`,
      seasoningNames ? `用${seasoningNames}和${fatName || "少量油"}拌匀${protein.name}。` : `用${fatName || "少量油"}拌匀${protein.name}。`,
      extras.length ? `将${protein.name}和${vegNames}放入空气炸锅。` : `将${protein.name}放入空气炸锅。`,
      `中途翻面，直到${protein.name}完全熟透。`,
      `搭配${staple.name}装盘即可。`
    ];
  }
  if (method === "烤箱") {
    return [
      extras.length ? `将${protein.name}切块，${vegNames}洗净切好。` : `将${protein.name}处理成适口大小。`,
      seasoningNames ? `用${seasoningNames}和${fatName || "少量油"}拌匀${protein.name}${extras.length ? `和${vegNames}` : ""}。` : `用${fatName || "少量油"}拌匀${protein.name}${extras.length ? `和${vegNames}` : ""}。`,
      extras.length ? `将${protein.name}和${vegNames}铺入烤箱烤盘。` : `将${protein.name}铺入烤箱烤盘。`,
      `烤至${protein.name}完全熟透。`,
      `搭配${staple.name}装盘即可。`
    ];
  }
  if (method === "凉拌" || /沙拉|轻食/.test(recipe.name)) {
    return [
      `将${protein.name}处理至可直接食用状态。`,
      extras.length ? `将${vegNames}洗净切好。` : `将${protein.name}切成适口大小。`,
      seasoningNames ? `用${seasoningNames}和${fatName || "食谱中的健康脂肪"}拌匀。` : `用${fatName || "食谱中的健康脂肪"}拌匀。`,
      `加入${protein.name}和${staple.name}。`,
      `轻轻混合后摆盘即可。`
    ];
  }
  return [
      extras.length ? `将${protein.name}切好，${vegNames}洗净切好。` : `将${protein.name}切好。`,
    `${protein.name}按${method}方式处理至完全熟透。`,
    extras.length ? `加入${vegNames}处理至适口。` : `继续处理${protein.name}至适口。`,
    seasoningNames ? `用${seasoningNames}调味。` : `按清淡口味调味。`,
    `搭配${staple.name}装盘即可。`
  ];
}

function validateRecipe(recipe) {
  const ingredientNames = recipe.ingredients.map(item => item.name);
  const stepText = recipe.steps.join(" ");
  for (const name of ALL_KNOWN_INGREDIENT_NAMES) {
    const coveredByIngredient = ingredientNames.some(ingredient => ingredient === name || ingredient.includes(name) || name.includes(ingredient));
    if (stepText.includes(name) && !coveredByIngredient) {
      return { ok: false, reason: `步骤出现未列入食材的「${name}」` };
    }
    if (recipe.name.includes(name) && !coveredByIngredient) {
      return { ok: false, reason: `菜名出现未列入食材的「${name}」` };
    }
  }
  for (const tool of ALL_KNOWN_COOKWARE) {
    if (stepText.includes(tool) && !recipe.tools?.includes(tool)) {
      return { ok: false, reason: `步骤出现未列入厨具的「${tool}」` };
    }
  }
  if (NO_COOK_METHODS.has(recipe.method)) {
    const heatWord = HEAT_WORDS.find(word => stepText.includes(word));
    if (heatWord) return { ok: false, reason: `No Cook 步骤出现加热动作「${heatWord}」` };
  }
  const macros = sumMacros(recipe.ingredients);
  const expected = {
    kcal: Math.round(macros.kcal),
    protein: Math.round(macros.protein),
    fat: Math.round(macros.fat),
    carbs: Math.round(macros.carbs)
  };
  if (recipe.kcal !== expected.kcal || recipe.protein !== expected.protein || recipe.fat !== expected.fat || recipe.carbs !== expected.carbs) {
    return { ok: false, reason: "营养数据不一致" };
  }
  if (recipe.foods.length !== recipe.ingredients.length || recipe.foods.some((food, index) => food[0] !== recipe.ingredients[index].name || food[1] !== recipe.ingredients[index].grams || food[2] !== recipe.ingredients[index].unit)) {
    return { ok: false, reason: "克数或 foods 数据不一致" };
  }
  if (!recipe.name || !recipe.ingredients.length || recipe.steps.length < 3 || recipe.steps.length > 6) {
    return { ok: false, reason: "菜名、食材或步骤数量不合法" };
  }
  return { ok: true };
}

function finalizeRecipe(recipe, generator) {
  if (!NO_COOK_METHODS.has(recipe.method)) {
    addSeasonings(recipe.ingredients, seasoningsForMethod(recipe.method));
    if (["香煎", "黑椒", "蒜香", "孜然", "照烧", "韩式", "清炒", "空气炸锅", "烤箱"].includes(recipe.method)
      && !recipe.ingredients.some(item => FOOD_DB.fats.some(fat => fat.name === item.name))) {
      const oil = FOOD_DB.fats.find(fat => fat.name === "橄榄油");
      recipe.ingredients.push({ name: oil.name, grams: 5, unit: "g", ref: oil });
    }
  }
  recipe.tools = COOKWARE_BY_METHOD[recipe.method] || [];
  recipe.steps = generator ? generator(recipe) : (NO_COOK_METHODS.has(recipe.method) ? generateNoCookSteps(recipe) : generateMainSteps(recipe));
  const macros = sumMacros(recipe.ingredients);
  recipe.foods = recipe.ingredients.map(i => [i.name, i.grams, i.unit]);
  recipe.kcal = Math.round(macros.kcal);
  recipe.protein = Math.round(macros.protein);
  recipe.fat = Math.round(macros.fat);
  recipe.carbs = Math.round(macros.carbs);
  let result = validateRecipe(recipe);
  if (!result.ok) {
    recipe.steps = NO_COOK_METHODS.has(recipe.method) ? generateNoCookSteps(recipe) : generateMainSteps(recipe);
    result = validateRecipe(recipe);
  }
  if (!result.ok) {
    throw new Error(`Invalid recipe generated: ${recipe.name}; ${result.reason}`);
  }
  return recipe;
}

function mealName(protein, staple, vegetables, method, mealType, rng) {
  if (mealType === "breakfast") return choice(BREAKFAST_TEMPLATES, rng);
  const veg = vegetables[0]?.name || "时蔬";
  if (mealType === "dinner" && ["凉拌", "空气炸锅", "烤箱", "炖", "水煮"].includes(method.name)) {
    const style = dinnerStyle(protein, method, rng);
    return `${method.name}${protein.name}${veg}${style}`;
  }
  const series = mealType === "lunch" ? choice(LUNCH_SERIES, rng) : choice(DINNER_SERIES, rng);
  const suffix = mealType === "dinner" ? dinnerStyle(protein, method, rng) : series.includes("系列") ? "餐" : series;
  return `${method.name}${protein.name}${veg}${staple.name}${suffix}`;
}

function dinnerStyle(protein, method, rng) {
  if (method.name === "凉拌") return choice(["沙拉", "轻食"], rng);
  if (method.name === "空气炸锅") return "空气炸锅餐";
  if (method.name === "烤箱") return "烤箱时蔬";
  if (method.name === "清蒸" && protein.tags.includes("fish")) return "清蒸鱼";
  if (protein.name === "豆腐") return choice(["豆腐煲", "汤菜"], rng);
  if (["炖", "焖", "番茄", "咖喱"].includes(method.name)) return choice(["炖菜", "汤菜"], rng);
  return choice(["低脂炒菜", "轻食"], rng);
}

function buildMainMeal(mealType, profile, nutrition, history, rng) {
  if (mealType === "breakfast") return buildBreakfast(profile, nutrition, history, rng);
  const proteins = mealType === "breakfast"
    ? FOOD_DB.proteins.filter(p => p.tags.includes("breakfast") || ["鸡胸肉", "金枪鱼", "豆腐", "豆干"].includes(p.name))
    : FOOD_DB.proteins.filter(p => !["希腊酸奶", "鸡蛋", "无糖豆浆", "低脂奶酪", "毛豆"].includes(p.name)
      && (mealType === "lunch"
        || (p.name !== "金枪鱼" && p.name !== "毛豆" && (p.name !== "牛肉" || profile.goal !== "lose"))));
  const protein = choice(shuffle(proteins, rng).filter(p => !history.proteins.has(p.name)).concat(proteins), rng);
  const staplePoolBase = mealType === "dinner"
    ? FOOD_DB.staples.filter(s => !["燕麦", "全麦吐司", "全麦卷饼"].includes(s.name))
    : FOOD_DB.staples;
  const staplePool = profile.goal === "gain" && mealType !== "breakfast"
    ? staplePoolBase.filter(s => !["南瓜", "山药"].includes(s.name))
    : staplePoolBase;
  const staple = choice(shuffle(staplePool, rng).filter(s => !history.staples.has(s.name)).concat(staplePool), rng);
  const vegCount = mealType === "breakfast" ? 2 : choice([2, 3], rng);
  const vegetables = shuffle(FOOD_DB.vegetables, rng).slice(0, vegCount);
  const method = mealType === "breakfast" ? choice(METHODS.filter(m => ["香煎", "清蒸", "清炒", "水煮", "凉拌"].includes(m.name)), rng) : findCompatibleMethod(protein, mealType, rng);
  const fat = method.name === "凉拌" && profile.goal !== "lose" ? FOOD_DB.fats.find(f => f.name === "牛油果") : FOOD_DB.fats.find(f => f.name === "橄榄油");
  const plan = amountPlan(profile, nutrition, mealType, protein, staple, method);
  alignFlavorIngredients(method, vegetables, []);
  const ingredients = buildIngredients({ protein, staple, vegetables, fat, plan, mealType });
  alignFlavorIngredients(method, vegetables, ingredients);
  addSeasonings(ingredients, seasoningsForMethod(method.name));
  balanceMainMealIngredients(ingredients, plan.target.kcal, profile.goal);
  const macros = sumMacros(ingredients);
  const meal = {
    icon: mealType === "breakfast" ? "🍳" : mealType === "lunch" ? "🍱" : "🥗",
    name: mealName(protein, staple, vegetables, method, mealType, rng),
    method: method.name,
    ingredients,
    foods: ingredients.map(i => [i.name, i.grams, i.unit]),
    kcal: Math.round(macros.kcal),
    protein: Math.round(macros.protein),
    fat: Math.round(macros.fat),
    carbs: Math.round(macros.carbs),
    time: `${Math.max(10, method.time - 5)}–${method.time + 5} 分钟`,
    suitableGoals: profile.goal === "lose" ? ["减脂", "维持"] : profile.goal === "gain" ? ["增肌", "维持"] : ["减脂", "增肌", "维持"]
  };
  finalizeRecipe(meal);
  meal.tip = profile.goal === "lose" ? "减脂版已降低主食、提高蔬菜比例，烹调油建议严格计量。" : profile.goal === "gain" ? "增肌版提高蛋白质和主食份量，训练日前后可优先安排。" : "维持版强调主食、蛋白质和蔬菜均衡。";
  history.proteins.add(protein.name);
  history.staples.add(staple.name);
  history.methods.add(method.name);
  return meal;
}

function buildBreakfast(profile, nutrition, history, rng) {
  const template = choice(BREAKFAST_TEMPLATES, rng);
  const plan = targetProfile(profile, nutrition, "breakfast");
  const scale = clamp(plan.kcal / 430, 0.78, 1.35);
  const p = name => FOOD_DB.proteins.find(item => item.name === name);
  const s = name => FOOD_DB.staples.find(item => item.name === name);
  const v = name => FOOD_DB.vegetables.find(item => item.name === name);
  const f = name => FOOD_DB.fruits.find(item => item.name === name);
  const egg = p("鸡蛋");
  const yogurt = p("希腊酸奶");
  const soyMilk = p("无糖豆浆");
  const chicken = p("鸡胸肉");
  const tuna = p("金枪鱼");
  const tofu = p("豆腐");
  const driedTofu = p("豆干");
  const salmon = p("三文鱼");
  const oats = s("燕麦");
  const toast = s("全麦吐司");
  const wrap = s("全麦卷饼");
  const bagel = s("全麦贝果");
  const purplePotato = s("紫薯");
  const sweetPotato = s("红薯");
  const corn = s("玉米");
  const yam = s("山药");
  const pumpkin = s("南瓜");
  const millet = s("小米");
  const purpleRice = s("紫米饭");
  const noodle = s("全麦面");
  const fruit = choice(shuffle(FOOD_DB.fruits, rng).filter(f => !history.fruits.has(f.name)).concat(FOOD_DB.fruits), rng);
  const veg = shuffle(FOOD_DB.vegetables, rng).slice(0, 2);
  const namedVeg = /菠菜/.test(template) ? [v("菠菜"), veg[0].name === "菠菜" ? veg[1] : veg[0]] : /番茄/.test(template) ? [v("番茄"), veg[0].name === "番茄" ? veg[1] : veg[0]] : veg;
  const nut = choice(FOOD_DB.nuts, rng);
  const chia = FOOD_DB.fats.find(f => f.name === "奇亚籽");
  const avocado = FOOD_DB.fats.find(f => f.name === "牛油果");
  let ingredients;
  let method = "快手";
  let steps;

  if (/鸡蛋羹/.test(template)) {
    ingredients = [
      { name: egg.name, grams: roundTo(110 * scale, 5), unit: "g", ref: egg },
      { name: toast.name, grams: roundTo(50 * scale, 5), unit: "g", ref: toast },
      { name: namedVeg[0].name, grams: 80, unit: "g", ref: namedVeg[0] },
      { name: fruit.name, grams: 100, unit: "g", ref: fruit }
    ];
    method = "清蒸";
    steps = [`${egg.name}打散，加入约 1.5 倍温水并过滤。`, "盖保鲜膜或盘子，上锅小火蒸至凝固。", `${toast.name}加热，搭配${namedVeg[0].name}和水果食用。`];
  } else if (/蛋饼/.test(template)) {
    ingredients = [
      { name: egg.name, grams: roundTo(90 * scale, 5), unit: "g", ref: egg },
      { name: oats.name, grams: roundTo(32 * scale, 5), unit: "g", ref: oats },
      { name: namedVeg[0].name, grams: 80, unit: "g", ref: namedVeg[0] },
      { name: fruit.name, grams: 100, unit: "g", ref: fruit }
    ];
    method = "香煎";
    steps = [`${oats.name}加少量水泡软，和${egg.name}、${namedVeg[0].name}混合。`, "不粘锅小火摊成薄饼，煎到两面定型。", "搭配水果食用，酱料少量即可。"];
  } else if (/蛋花汤/.test(template)) {
    ingredients = [
      { name: tofu.name, grams: roundTo(120 * scale, 5), unit: "g", ref: tofu },
      { name: egg.name, grams: roundTo(55 * scale, 5), unit: "g", ref: egg },
      { name: namedVeg[0].name, grams: 100, unit: "g", ref: namedVeg[0] },
      { name: toast.name, grams: roundTo(45 * scale, 5), unit: "g", ref: toast }
    ];
    method = "水煮";
    steps = [`${tofu.name}切小块，${namedVeg[0].name}洗净切好，${egg.name}打散。`, `水开后放入${tofu.name}和${namedVeg[0].name}煮熟。`, `转小火淋入蛋液成蛋花，搭配${toast.name}食用。`];
  } else if (/饭团/.test(template)) {
    const includeEdamame = /毛豆/.test(template);
    const edamame = p("毛豆");
    ingredients = [
      { name: includeEdamame ? edamame.name : egg.name, grams: includeEdamame ? 80 : roundTo(55 * scale, 5), unit: "g", ref: includeEdamame ? edamame : egg },
      { name: purpleRice.name, grams: roundTo(140 * scale, 5), unit: "g", ref: purpleRice },
      ...(includeEdamame ? [{ name: egg.name, grams: roundTo(55 * scale, 5), unit: "g", ref: egg }] : []),
      { name: namedVeg[0].name, grams: 70, unit: "g", ref: namedVeg[0] }
    ];
    method = "捏制";
    steps = [`${purpleRice.name}提前煮熟放温，${includeEdamame ? `${edamame.name}和${egg.name}` : egg.name}煮熟。`, `${namedVeg[0].name}切碎并挤去多余水分。`, "把所有食材按份量拌匀后捏成饭团，海苔可少量包裹。"];
  } else if (/红薯酸奶碗/.test(template)) {
    ingredients = [
      { name: sweetPotato.name, grams: roundTo(160 * scale, 5), unit: "g", ref: sweetPotato },
      { name: yogurt.name, grams: roundTo(150 * clamp(scale, .85, 1.15), 5), unit: "g", ref: yogurt },
      { name: fruit.name, grams: 100, unit: "g", ref: fruit },
      { name: nut.name, grams: roundTo((profile.goal === "lose" ? 8 : 12) * clamp(scale, .85, 1.2), 1), unit: "g", ref: nut }
    ];
    method = "蒸煮";
    steps = [];
  } else if (/南瓜燕麦粥/.test(template)) {
    ingredients = [
      { name: pumpkin.name, grams: roundTo(160 * scale, 5), unit: "g", ref: pumpkin },
      { name: oats.name, grams: roundTo(32 * scale, 5), unit: "g", ref: oats },
      { name: yogurt.name, grams: roundTo(120 * clamp(scale, .85, 1.15), 5), unit: "g", ref: yogurt },
      { name: fruit.name, grams: 100, unit: "g", ref: fruit }
    ];
    method = "水煮";
    steps = [];
  } else if (/酸奶|燕麦|隔夜|布丁|水果碗|蓝莓|香蕉/.test(template)) {
    const namedFruit = /蓝莓/.test(template) ? f("蓝莓") : /香蕉/.test(template) ? f("香蕉") : fruit;
    ingredients = [
      { name: yogurt.name, grams: roundTo(180 * scale, 5), unit: "g", ref: yogurt },
      { name: oats.name, grams: roundTo(38 * scale, 5), unit: "g", ref: oats },
      { name: namedFruit.name, grams: roundTo(130 * clamp(scale, .85, 1.2), 5), unit: "g", ref: namedFruit },
      { name: nut.name, grams: roundTo((profile.goal === "lose" ? 8 : 12) * clamp(scale, .85, 1.2), 1), unit: "g", ref: nut },
      { name: chia.name, grams: 6, unit: "g", ref: chia }
    ];
    method = /隔夜/.test(template) ? "隔夜冷藏" : "即食";
    steps = method === "隔夜冷藏"
      ? [`睡前把${oats.name}、${yogurt.name}和${chia.name}混合，盖好冷藏。`, "早上取出后加入水果和坚果。", "拌匀即可；如果偏稠，可加少量凉白开调节。"]
      : [`将${namedFruit.name}洗净切块，坚果保持原味。`, `碗中放入${yogurt.name}、${oats.name}和${chia.name}。`, "加入水果和坚果，拌匀后立即食用。"];
  } else if (/三明治|吐司|贝果|卷|饼/.test(template)) {
    const protein = /鸡胸/.test(template) ? chicken : /金枪鱼/.test(template) ? tuna : /三文鱼/.test(template) ? salmon : /豆干/.test(template) ? FOOD_DB.proteins.find(p => p.name === "豆干") : egg;
    const staple = /卷|饼/.test(template) ? wrap : /贝果/.test(template) ? bagel : toast;
    ingredients = [
      { name: protein.name, grams: protein.name === "鸡蛋" ? roundTo(55 * scale, 5) : roundTo(85 * scale, 5), unit: "g", ref: protein },
      { name: staple.name, grams: roundTo(65 * scale, 5), unit: "g", ref: staple },
      /牛油果/.test(template) ? { name: avocado.name, grams: roundTo(45 * scale, 5), unit: "g", ref: avocado } : { name: namedVeg[0].name, grams: 70, unit: "g", ref: namedVeg[0] },
      { name: namedVeg[1].name, grams: 60, unit: "g", ref: namedVeg[1] }
    ];
    method = protein.name === "金枪鱼" ? "拌制" : protein.name === "三文鱼" ? "香煎" : "快手";
    steps = [
      protein.name === "金枪鱼"
        ? `${protein.name}沥干水分，用少量黑胡椒和低脂调味汁拌匀。`
        : protein.name === "鸡蛋"
          ? `${protein.name}煮熟、煎熟或做成蛋饼，确认蛋液完全凝固。`
          : `${protein.name}用少量黑胡椒腌 5 分钟，煎熟或提前熟制后切片。`,
      `${staple.name}用平底锅小火加热 1–2 分钟，${namedVeg.map(item => item.name).join("、")}洗净沥干。`,
      `把${protein.name}和蔬菜夹入${staple.name}，按份量组合，酱料薄薄一层即可。`
    ];
  } else if (/面/.test(template)) {
    ingredients = [
      { name: egg.name, grams: roundTo(55 * scale, 5), unit: "g", ref: egg },
      { name: noodle.name, grams: roundTo(65 * scale, 5), unit: "g", ref: noodle },
      { name: "番茄", grams: 150, unit: "g", ref: v("番茄") },
      { name: namedVeg[0].name, grams: 90, unit: "g", ref: namedVeg[0] }
    ];
    method = "水煮";
    steps = [
      `${noodle.name}按包装时间煮熟，捞出备用。`,
      `${egg.name}打散或煮熟，番茄切块，${namedVeg[0].name}洗净切好。`,
      "锅中加水或少量油，先煮出番茄汤底，再放入面、鸡蛋和蔬菜煮熟。"
    ];
  } else if (/紫薯|玉米|山药|南瓜|粥|豆浆/.test(template)) {
    const staple = /玉米/.test(template) ? corn : /山药/.test(template) ? yam : /南瓜/.test(template) ? pumpkin : /红薯/.test(template) ? sweetPotato : /小米|粥/.test(template) ? millet : purplePotato;
    const includeSoy = /豆浆/.test(template);
    ingredients = [
      { name: egg.name, grams: roundTo(55 * scale, 5), unit: "g", ref: egg },
      { name: staple.name, grams: roundTo((staple.name === "小米" ? 42 : 160) * scale, 5), unit: "g", ref: staple },
      includeSoy
        ? { name: soyMilk.name, grams: roundTo(260 * clamp(scale, .85, 1.2), 5), unit: "ml", ref: soyMilk }
        : { name: yogurt.name, grams: roundTo(120 * clamp(scale, .85, 1.15), 5), unit: "g", ref: yogurt },
      { name: fruit.name, grams: 100, unit: "g", ref: fruit }
    ];
    method = /粥/.test(template) ? "水煮" : "蒸煮";
    steps = /粥/.test(template)
      ? [`${staple.name}淘洗后加 8–10 倍清水，小火煮至软糯。`, `${egg.name}另行煮熟或打散成蛋花，水果洗净备用。`, `粥煮好后搭配${egg.name}、${includeSoy ? soyMilk.name : yogurt.name}和水果食用。`]
      : [`${staple.name}洗净后蒸熟或煮熟，${egg.name}煮熟。`, `${includeSoy ? soyMilk.name : yogurt.name}按份量准备，水果洗净切块。`, `把${staple.name}、${egg.name}和${includeSoy ? soyMilk.name : yogurt.name}组合成早餐盘。`];
  } else {
    ingredients = [
      { name: tofu.name, grams: roundTo(120 * scale, 5), unit: "g", ref: tofu },
      { name: toast.name, grams: roundTo(60 * scale, 5), unit: "g", ref: toast },
      { name: namedVeg[0].name, grams: 80, unit: "g", ref: namedVeg[0] },
      { name: fruit.name, grams: 120, unit: "g", ref: fruit }
    ];
    steps = [`${tofu.name}切块后焯水或煎至表面微黄。`, `${toast.name}小火加热，${namedVeg[0].name}和水果洗净切好。`, "按份量装盘，调味保持清淡。"];
  }
  const macros = sumMacros(ingredients);
  ingredients.filter(item => FOOD_DB.fruits.some(fruitItem => fruitItem.name === item.name)).forEach(item => history.fruits.add(item.name));
  return finalizeRecipe({
    icon: "🍳",
    name: template,
    method,
    ingredients,
    foods: ingredients.map(i => [i.name, i.grams, i.unit]),
    kcal: Math.round(macros.kcal),
    protein: Math.round(macros.protein),
    fat: Math.round(macros.fat),
    carbs: Math.round(macros.carbs),
    time: method === "隔夜冷藏" ? "5 分钟 + 冷藏" : "8–20 分钟",
    suitableGoals: profile.goal === "gain" ? ["增肌", "维持"] : ["减脂", "维持"],
    steps,
    tip: profile.goal === "lose" ? "早餐保留蛋白质和纤维，主食不过量。" : profile.goal === "gain" ? "训练日可把主食份量上调 10% 左右。" : "早餐尽量兼顾蛋白质、主食和水果。"
  });
}

function buildSnack(profile, nutrition, history, rng) {
  const template = choice(SNACK_SERIES, rng);
  const plan = snackAmountPlan(profile, nutrition);
  const fruit = choice(shuffle(FOOD_DB.fruits, rng).filter(f => !history.fruits.has(f.name)).concat(FOOD_DB.fruits), rng);
  const nut = choice(FOOD_DB.nuts, rng);
  const dairy = FOOD_DB.proteins.find(p => p.name === "希腊酸奶");
  const soyMilk = FOOD_DB.proteins.find(p => p.name === "无糖豆浆");
  const cheese = FOOD_DB.proteins.find(p => p.name === "低脂奶酪");
  const egg = FOOD_DB.proteins.find(p => p.name === "鸡蛋");
  const edamame = FOOD_DB.proteins.find(p => p.name === "毛豆");
  const sweetPotato = FOOD_DB.staples.find(s => s.name === "红薯");
  const oats = FOOD_DB.staples.find(s => s.name === "燕麦");
  const toast = FOOD_DB.staples.find(s => s.name === "全麦吐司");
  const avocado = FOOD_DB.fats.find(f => f.name === "牛油果");
  const chia = FOOD_DB.fats.find(f => f.name === "奇亚籽");
  let ingredients;
  if (/蛋/.test(template)) ingredients = [{ name: egg.name, grams: 55, unit: "g", ref: egg }, { name: fruit.name, grams: plan.fruitG, unit: "g", ref: fruit }];
  else if (/毛豆/.test(template)) ingredients = [{ name: edamame.name, grams: 130, unit: "g", ref: edamame }, { name: "圣女果", grams: 150, unit: "g", ref: FOOD_DB.fruits.find(f => f.name === "圣女果") }];
  else if (/红薯/.test(template)) ingredients = [{ name: sweetPotato.name, grams: plan.stapleG, unit: "g", ref: sweetPotato }, { name: dairy.name, grams: plan.dairyG, unit: "g", ref: dairy }];
  else if (/牛油果/.test(template)) ingredients = [{ name: toast.name, grams: 35, unit: "g", ref: toast }, { name: avocado.name, grams: profile.goal === "lose" ? 35 : 50, unit: "g", ref: avocado }, { name: fruit.name, grams: roundTo(plan.fruitG * .65, 5), unit: "g", ref: fruit }];
  else if (/豆浆/.test(template)) ingredients = [{ name: soyMilk.name, grams: profile.goal === "gain" ? 350 : 300, unit: "ml", ref: soyMilk }, { name: nut.name, grams: plan.nutG, unit: "g", ref: nut }, { name: fruit.name, grams: roundTo(plan.fruitG * .6, 5), unit: "g", ref: fruit }];
  else if (/奶酪/.test(template)) ingredients = [{ name: cheese.name, grams: profile.goal === "gain" ? 80 : 60, unit: "g", ref: cheese }, { name: fruit.name, grams: plan.fruitG, unit: "g", ref: fruit }];
  else if (/燕麦/.test(template)) ingredients = [{ name: dairy.name, grams: plan.dairyG, unit: "g", ref: dairy }, { name: oats.name, grams: roundTo(25 * (profile.goal === "gain" ? 1.25 : 1), 5), unit: "g", ref: oats }, { name: fruit.name, grams: plan.fruitG, unit: "g", ref: fruit }, { name: nut.name, grams: plan.nutG, unit: "g", ref: nut }];
  else if (/奇亚籽/.test(template)) ingredients = [{ name: dairy.name, grams: plan.dairyG, unit: "g", ref: dairy }, { name: chia.name, grams: 10, unit: "g", ref: chia }, { name: fruit.name, grams: plan.fruitG, unit: "g", ref: fruit }, { name: nut.name, grams: plan.nutG, unit: "g", ref: nut }];
  else ingredients = [{ name: dairy.name, grams: plan.dairyG, unit: "g", ref: dairy }, { name: fruit.name, grams: plan.fruitG, unit: "g", ref: fruit }, { name: nut.name, grams: plan.nutG, unit: "g", ref: nut }];
  const macros = sumMacros(ingredients);
  history.fruits.add(fruit.name);
  const method = /蛋|毛豆/.test(template) ? "水煮" : /红薯/.test(template) ? "蒸煮" : "即食";
  const ingredientNames = ingredients.map(item => item.name).join("、");
  let steps;
  if (/蛋/.test(template)) {
    steps = [`${egg.name}冷水下锅，水开后煮 8–10 分钟至全熟。`, `${fruit.name}洗净切块。`, `按份量搭配${ingredientNames}，作为两餐之间的加餐。`];
  } else if (/毛豆/.test(template)) {
    steps = [`${edamame.name}洗净后沸水煮 6–8 分钟，沥干。`, "圣女果洗净，对半切开或整颗食用。", `按份量搭配${ingredientNames}，不额外加重口味蘸料。`];
  } else if (/红薯/.test(template)) {
    steps = [`${sweetPotato.name}洗净蒸熟，筷子能轻松穿透即可。`, `${dairy.name}按份量装入小碗。`, `搭配${ingredientNames}食用，适合训练前后或下午加餐。`];
  } else if (/牛油果/.test(template)) {
    steps = [`${toast.name}小火加热至表面微脆。`, `${avocado.name}压成泥或切片，${fruit.name}洗净切块。`, `按份量组合${ingredientNames}，现做现吃口感最好。`];
  } else if (/豆浆/.test(template)) {
    steps = [`${soyMilk.name}加热到温热即可，不需要煮沸过久。`, `${nut.name}按份量称好，${fruit.name}洗净切块。`, `搭配${ingredientNames}食用，坚果选择原味。`];
  } else if (/奶酪/.test(template)) {
    steps = [`${fruit.name}洗净切块。`, `${cheese.name}按份量取出，冷藏状态口感更清爽。`, `搭配${ingredientNames}食用，不额外加糖浆。`];
  } else {
    steps = [`${fruit.name}洗净切块。`, `${dairy.name}和${nut.name}按份量装入餐盒。`, `食用前再混合${ingredientNames}，坚果保持原味。`];
  }
  const snackFruit = ingredients.find(item => FOOD_DB.fruits.some(fruitItem => fruitItem.name === item.name));
  const snackName = /红薯/.test(template)
    ? "红薯希腊酸奶加餐"
    : /毛豆/.test(template)
      ? "圣女果毛豆加餐"
      : `${snackFruit?.name || ""}${template}`;
  return finalizeRecipe({
    icon: "🍎",
    name: snackName,
    method,
    ingredients,
    foods: ingredients.map(i => [i.name, i.grams, i.unit]),
    kcal: Math.round(macros.kcal),
    protein: Math.round(macros.protein),
    fat: Math.round(macros.fat),
    carbs: Math.round(macros.carbs),
    time: "3–10 分钟",
    suitableGoals: profile.goal === "gain" ? ["增肌", "维持"] : ["减脂", "维持"],
    steps,
    tip: "加餐用于补足两餐之间的能量，不建议再叠加含糖饮料。"
  });
}

export function createDailyMenu(profile, nutrition) {
  const history = { proteins: new Set(), staples: new Set(), methods: new Set(), fruits: new Set() };
  const rng = Math.random;
  return [
    buildMainMeal("breakfast", profile, nutrition, history, rng),
    buildMainMeal("lunch", profile, nutrition, history, rng),
    buildSnack(profile, nutrition, history, rng),
    buildMainMeal("dinner", profile, nutrition, history, rng)
  ];
}

export function getRecipeDatabaseStats() {
  const comboEstimate = FOOD_DB.proteins.length * FOOD_DB.staples.length * METHODS.length * FOOD_DB.vegetables.length * (FOOD_DB.vegetables.length - 1) / 2;
  return {
    proteins: FOOD_DB.proteins.length,
    staples: FOOD_DB.staples.length,
    vegetables: FOOD_DB.vegetables.length,
    fruits: FOOD_DB.fruits.length,
    nuts: FOOD_DB.nuts.length,
    fats: FOOD_DB.fats.length,
    methods: METHODS.length,
    breakfastTemplates: BREAKFAST_TEMPLATES.length,
    lunchTemplates: 80,
    dinnerTemplates: 60,
    snackTemplates: 40,
    comboEstimate: Math.round(comboEstimate)
  };
}
