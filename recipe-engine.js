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
    ["全麦意面", 124, 5.3, 0.9, 26],
    ["南瓜", 23, 0.7, 0.1, 5.3]
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
  { name: "蒜香", tags: ["quick", "stir", "fish"], time: 20, steps: ["蒜末小火爆香，不要炸糊。", "加入蛋白质煎炒至熟，再放蔬菜。", "用少量盐、黑胡椒或柠檬汁调味。"] },
  { name: "柠檬", tags: ["fish", "salad", "pan"], time: 20, steps: ["蛋白质用柠檬汁、黑胡椒腌 5 分钟。", "煎、烤或蒸熟后静置 2 分钟。", "搭配清爽蔬菜和主食，最后挤少量柠檬汁。"] },
  { name: "日式", tags: ["fish", "stew", "quick"], time: 25, steps: ["用少量低盐酱油、味淋替代糖重酱汁。", "蛋白质煎熟或炖熟，蔬菜焯水。", "主食铺底后码入食材，撒芝麻或海苔。"] },
  { name: "韩式", tags: ["stir", "salad"], time: 25, steps: ["用少量韩式辣酱、蒜末和醋调低油酱汁。", "蛋白质炒熟，蔬菜分批焯熟或生拌。", "把主食、蛋白质和蔬菜拌匀。"] },
  { name: "照烧", tags: ["pan"], time: 25, steps: ["用低糖照烧汁或酱油加少量蜂蜜调汁。", "蛋白质煎熟后倒入酱汁快速收汁。", "搭配焯熟蔬菜和主食。"] },
  { name: "咖喱", tags: ["stew"], time: 35, steps: ["洋葱和蛋白质少油炒香。", "加入主食类根茎或南瓜，加水炖软。", "放入低脂咖喱块或咖喱粉，最后加入绿叶菜。"] },
  { name: "番茄", tags: ["stew", "fish"], time: 30, steps: ["番茄炒出汁后加少量水。", "放入蛋白质炖熟，再加入蔬菜。", "用黑胡椒和少量盐调味，搭配主食。"] },
  { name: "孜然", tags: ["stir", "pan"], time: 25, steps: ["蛋白质切片并用孜然、胡椒腌制。", "热锅少油快速煎炒。", "加入彩椒、洋葱等蔬菜，出锅前补孜然粉。"] },
  { name: "奥尔良", tags: ["air", "bake"], time: 35, steps: ["用低盐奥尔良粉薄薄腌制蛋白质。", "空气炸锅或烤箱烤至熟透。", "蔬菜焯熟或同烤，搭配主食。"] },
  { name: "清蒸", tags: ["steam", "fish"], time: 25, steps: ["蛋白质铺姜片去腥。", "水开后上锅蒸至中心熟透。", "蔬菜另行焯熟，淋少量低盐酱汁。"] },
  { name: "清炒", tags: ["stir", "quick", "plant"], time: 20, steps: ["热锅少油，先炒蛋白质或豆制品。", "加入蔬菜大火快炒。", "用蒜、胡椒和少量盐调味。"] },
  { name: "炖", tags: ["stew", "braise"], time: 40, steps: ["蛋白质切块焯水或煎至表面变色。", "加入耐煮蔬菜和热水，小火炖煮。", "最后加入叶菜，确认熟透后装盘。"] },
  { name: "焖", tags: ["braise"], time: 35, steps: ["蛋白质和耐煮蔬菜先炒香。", "加入少量水，加盖焖至入味。", "收汁后搭配主食。"] },
  { name: "空气炸锅", tags: ["air"], time: 30, steps: ["蛋白质薄腌后铺入炸篮。", "180℃ 加热，中途翻面。", "蔬菜可同烤或焯熟，出锅后装盘。"] },
  { name: "烤箱", tags: ["bake"], time: 35, steps: ["蛋白质和蔬菜拌少量油与香料。", "平铺烤盘，190℃ 烤至熟透。", "搭配预先煮好的主食。"] },
  { name: "凉拌", tags: ["salad"], time: 15, steps: ["蛋白质提前煮熟或使用即食低脂食材。", "蔬菜洗净沥干，部分蔬菜焯水。", "用醋、柠檬汁、少量橄榄油拌匀。"] },
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

function stepsFor(method, meal) {
  const names = meal.ingredients.map(i => i.name);
  const protein = meal.ingredients[0]?.name;
  const staple = meal.ingredients[1]?.name;
  const vegNames = meal.ingredients.slice(2, -1).map(i => i.name).join("、");
  return [
    `准备食材：${names.join("、")}，蔬菜洗净切成适口大小。`,
    ...method.steps,
    `${staple ? `${staple}铺底，` : ""}放入${protein || "蛋白质食材"}和${vegNames || "配菜"}，按份量装盘。`,
    "尝味后再决定是否加盐；酱料从少量开始，避免隐形热量。"
  ].slice(0, 6);
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
  const ingredients = buildIngredients({ protein, staple, vegetables, fat, plan, mealType });
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
  meal.steps = stepsFor(method, meal);
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
  const egg = FOOD_DB.proteins.find(p => p.name === "鸡蛋");
  const yogurt = FOOD_DB.proteins.find(p => p.name === "希腊酸奶");
  const chicken = FOOD_DB.proteins.find(p => p.name === "鸡胸肉");
  const tuna = FOOD_DB.proteins.find(p => p.name === "金枪鱼");
  const tofu = FOOD_DB.proteins.find(p => p.name === "豆腐");
  const salmon = FOOD_DB.proteins.find(p => p.name === "三文鱼");
  const oats = FOOD_DB.staples.find(s => s.name === "燕麦");
  const toast = FOOD_DB.staples.find(s => s.name === "全麦吐司");
  const wrap = FOOD_DB.staples.find(s => s.name === "全麦卷饼");
  const purplePotato = FOOD_DB.staples.find(s => s.name === "紫薯");
  const corn = FOOD_DB.staples.find(s => s.name === "玉米");
  const pumpkin = FOOD_DB.staples.find(s => s.name === "南瓜");
  const noodle = FOOD_DB.staples.find(s => s.name === "全麦面");
  const fruit = choice(shuffle(FOOD_DB.fruits, rng).filter(f => !history.fruits.has(f.name)).concat(FOOD_DB.fruits), rng);
  const veg = shuffle(FOOD_DB.vegetables, rng).slice(0, 2);
  const nut = choice(FOOD_DB.nuts, rng);
  const chia = FOOD_DB.fats.find(f => f.name === "奇亚籽");
  let ingredients;
  let method = "快手";

  if (/酸奶|燕麦|隔夜|布丁|水果碗|蓝莓|香蕉/.test(template)) {
    ingredients = [
      { name: yogurt.name, grams: roundTo(180 * scale, 5), unit: "g", ref: yogurt },
      { name: oats.name, grams: roundTo(38 * scale, 5), unit: "g", ref: oats },
      { name: fruit.name, grams: roundTo(130 * clamp(scale, .85, 1.2), 5), unit: "g", ref: fruit },
      { name: nut.name, grams: roundTo((profile.goal === "lose" ? 8 : 12) * clamp(scale, .85, 1.2), 1), unit: "g", ref: nut },
      { name: chia.name, grams: 6, unit: "g", ref: chia }
    ];
    method = /隔夜/.test(template) ? "隔夜冷藏" : "即食";
  } else if (/三明治|吐司|贝果|卷|饼/.test(template)) {
    const protein = /鸡胸/.test(template) ? chicken : /金枪鱼/.test(template) ? tuna : /三文鱼/.test(template) ? salmon : /豆干/.test(template) ? FOOD_DB.proteins.find(p => p.name === "豆干") : egg;
    ingredients = [
      { name: protein.name, grams: protein.name === "鸡蛋" ? roundTo(55 * scale, 5) : roundTo(85 * scale, 5), unit: "g", ref: protein },
      { name: /卷|饼/.test(template) ? wrap.name : toast.name, grams: roundTo(65 * scale, 5), unit: "g", ref: /卷|饼/.test(template) ? wrap : toast },
      { name: veg[0].name, grams: 70, unit: "g", ref: veg[0] },
      { name: veg[1].name, grams: 60, unit: "g", ref: veg[1] }
    ];
    method = "香煎";
  } else if (/面/.test(template)) {
    ingredients = [
      { name: egg.name, grams: roundTo(55 * scale, 5), unit: "g", ref: egg },
      { name: noodle.name, grams: roundTo(65 * scale, 5), unit: "g", ref: noodle },
      { name: "番茄", grams: 150, unit: "g", ref: FOOD_DB.vegetables.find(v => v.name === "番茄") },
      { name: veg[0].name, grams: 90, unit: "g", ref: veg[0] }
    ];
    method = "水煮";
  } else if (/紫薯|玉米|山药|南瓜|粥|豆浆/.test(template)) {
    const staple = /玉米/.test(template) ? corn : /南瓜/.test(template) ? pumpkin : purplePotato;
    ingredients = [
      { name: egg.name, grams: roundTo(55 * scale, 5), unit: "g", ref: egg },
      { name: staple.name, grams: roundTo(160 * scale, 5), unit: "g", ref: staple },
      { name: yogurt.name, grams: roundTo(120 * clamp(scale, .85, 1.15), 5), unit: "g", ref: yogurt },
      { name: fruit.name, grams: 100, unit: "g", ref: fruit }
    ];
    method = /粥/.test(template) ? "水煮" : "蒸煮";
  } else {
    ingredients = [
      { name: tofu.name, grams: roundTo(120 * scale, 5), unit: "g", ref: tofu },
      { name: toast.name, grams: roundTo(60 * scale, 5), unit: "g", ref: toast },
      { name: veg[0].name, grams: 80, unit: "g", ref: veg[0] },
      { name: fruit.name, grams: 120, unit: "g", ref: fruit }
    ];
  }
  const macros = sumMacros(ingredients);
  history.fruits.add(fruit.name);
  return {
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
    steps: method === "隔夜冷藏"
      ? ["睡前把燕麦、酸奶和奇亚籽混合。", "密封冷藏一晚。", "早上加入水果和坚果，拌匀即可。"]
      : ["先处理需要加热的鸡蛋、主食或蛋白质食材。", "蔬菜和水果洗净切好，面包或卷饼可小火加热。", "按份量组合装盘，酱料少量使用。"],
    tip: profile.goal === "lose" ? "早餐保留蛋白质和纤维，主食不过量。" : profile.goal === "gain" ? "训练日可把主食份量上调 10% 左右。" : "早餐尽量兼顾蛋白质、主食和水果。"
  };
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
  const toast = FOOD_DB.staples.find(s => s.name === "全麦吐司");
  const avocado = FOOD_DB.fats.find(f => f.name === "牛油果");
  let ingredients;
  if (/蛋/.test(template)) ingredients = [{ name: egg.name, grams: 55, unit: "g", ref: egg }, { name: fruit.name, grams: plan.fruitG, unit: "g", ref: fruit }];
  else if (/毛豆/.test(template)) ingredients = [{ name: edamame.name, grams: 130, unit: "g", ref: edamame }, { name: "圣女果", grams: 150, unit: "g", ref: FOOD_DB.fruits.find(f => f.name === "圣女果") }];
  else if (/红薯/.test(template)) ingredients = [{ name: sweetPotato.name, grams: plan.stapleG, unit: "g", ref: sweetPotato }, { name: dairy.name, grams: plan.dairyG, unit: "g", ref: dairy }];
  else if (/牛油果/.test(template)) ingredients = [{ name: toast.name, grams: 35, unit: "g", ref: toast }, { name: avocado.name, grams: profile.goal === "lose" ? 35 : 50, unit: "g", ref: avocado }, { name: fruit.name, grams: roundTo(plan.fruitG * .65, 5), unit: "g", ref: fruit }];
  else if (/豆浆/.test(template)) ingredients = [{ name: soyMilk.name, grams: profile.goal === "gain" ? 350 : 300, unit: "ml", ref: soyMilk }, { name: nut.name, grams: plan.nutG, unit: "g", ref: nut }, { name: fruit.name, grams: roundTo(plan.fruitG * .6, 5), unit: "g", ref: fruit }];
  else if (/奶酪/.test(template)) ingredients = [{ name: cheese.name, grams: profile.goal === "gain" ? 80 : 60, unit: "g", ref: cheese }, { name: fruit.name, grams: plan.fruitG, unit: "g", ref: fruit }];
  else ingredients = [{ name: dairy.name, grams: plan.dairyG, unit: "g", ref: dairy }, { name: fruit.name, grams: plan.fruitG, unit: "g", ref: fruit }, { name: nut.name, grams: plan.nutG, unit: "g", ref: nut }];
  const macros = sumMacros(ingredients);
  history.fruits.add(fruit.name);
  return {
    icon: "🍎",
    name: `${fruit.name}${template}`,
    method: "即食",
    ingredients,
    foods: ingredients.map(i => [i.name, i.grams, i.unit]),
    kcal: Math.round(macros.kcal),
    protein: Math.round(macros.protein),
    fat: Math.round(macros.fat),
    carbs: Math.round(macros.carbs),
    time: "3–10 分钟",
    suitableGoals: profile.goal === "gain" ? ["增肌", "维持"] : ["减脂", "维持"],
    steps: ["水果洗净切块；需要蒸煮的红薯、鸡蛋或毛豆提前做好。", "酸奶、坚果或蛋白质食材按份量装入餐盒。", "食用前再混合，坚果保持原味，不额外加糖。"],
    tip: "加餐用于补足两餐之间的能量，不建议再叠加含糖饮料。"
  };
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
