const roundTo = (value, step = 5) => Math.max(step, Math.round(value / step) * step);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const item = (id, name, category, aliases, unit, kcal, protein, fat, carbs, flags = {}) => ({
  id, name, category, aliases, unit,
  caloriesPer100g: kcal, proteinPer100g: protein, fatPer100g: fat, carbsPer100g: carbs,
  isStaple: category === "staple", isSeasoning: category === "seasoning", isOptional: Boolean(flags.optional),
  tags: flags.tags || []
});

export const INGREDIENT_CATALOG = [
  item("egg", "鸡蛋", "protein", ["蛋"], "个", 144, 13, 10, 1.1, { tags: ["vegetarian", "breakfast"] }),
  item("chicken_breast", "鸡胸肉", "protein", ["鸡胸"], "g", 165, 31, 3.6, 0, { tags: ["meat", "highProtein"] }),
  item("chicken_thigh", "鸡腿肉", "protein", ["去皮鸡腿肉"], "g", 172, 25, 6, 0, { tags: ["meat"] }),
  item("beef", "牛肉", "protein", ["瘦牛肉"], "g", 180, 27, 8, 0, { tags: ["meat"] }),
  item("lean_pork", "猪瘦肉", "protein", ["瘦猪肉", "猪里脊"], "g", 165, 28, 6, 0, { tags: ["meat"] }),
  item("shrimp", "虾仁", "protein", ["虾"], "g", 99, 24, 0.3, 0.2, { tags: ["seafood", "highProtein"] }),
  item("salmon", "三文鱼", "protein", ["鲑鱼"], "g", 208, 20, 13, 0, { tags: ["fish"] }),
  item("cod", "鳕鱼", "protein", ["银鳕鱼"], "g", 82, 18, 0.7, 0, { tags: ["fish", "lowFat"] }),
  item("tuna", "金枪鱼", "protein", ["吞拿鱼"], "g", 116, 26, 1, 0, { tags: ["fish", "noCook"] }),
  item("tofu", "豆腐", "protein", ["北豆腐", "嫩豆腐"], "g", 84, 8, 5, 2, { tags: ["vegetarian"] }),
  item("dried_tofu", "豆干", "protein", ["香干"], "g", 150, 16, 8, 6, { tags: ["vegetarian"] }),
  item("greek_yogurt", "希腊酸奶", "protein", ["酸奶"], "g", 73, 10, 2, 3.6, { tags: ["dairy", "noCook", "breakfast"] }),
  item("milk", "牛奶", "protein", ["纯牛奶"], "ml", 54, 3.2, 3.2, 4.8, { tags: ["dairy", "breakfast"] }),

  item("rice", "大米", "staple", ["米饭", "白米饭"], "g", 116, 2.6, 0.3, 26),
  item("brown_rice", "糙米", "staple", ["糙米饭"], "g", 116, 2.6, 0.9, 23),
  item("noodles", "面条", "staple", ["挂面"], "g", 112, 4, 0.8, 23),
  item("buckwheat_noodles", "荞麦面", "staple", ["荞麦面条"], "g", 99, 5, 0.7, 21),
  item("pasta", "意面", "staple", ["意大利面"], "g", 124, 5.3, 0.9, 26),
  item("oats", "燕麦", "staple", ["燕麦片"], "g", 389, 16.9, 6.9, 66, { tags: ["breakfast"] }),
  item("whole_wheat_bread", "全麦面包", "staple", ["全麦吐司"], "g", 245, 9, 4, 43),
  item("corn", "玉米", "staple", ["玉米粒"], "g", 112, 3.4, 1.5, 22),
  item("sweet_potato", "红薯", "staple", ["地瓜"], "g", 86, 1.6, 0.1, 20),
  item("purple_potato", "紫薯", "staple", ["紫地瓜"], "g", 82, 1.8, 0.1, 19),
  item("potato", "土豆", "staple", ["马铃薯"], "g", 77, 2, 0.1, 17),
  item("pumpkin", "南瓜", "staple", ["贝贝南瓜"], "g", 23, 0.7, 0.1, 5.3),
  item("yam", "山药", "staple", ["淮山"], "g", 57, 1.9, 0.2, 12),
  item("quinoa", "藜麦", "staple", ["藜麦饭"], "g", 120, 4.4, 1.9, 21),

  ..."番茄 黄瓜 西兰花 菠菜 生菜 白菜 包菜 胡萝卜 洋葱 青椒 彩椒 芦笋 西葫芦 茄子 菌菇 香菇 金针菇 木耳 冬瓜 秋葵".split(" ").map(name => {
    const aliases = { 番茄: ["西红柿"], 西兰花: ["青花菜"], 菌菇: ["蘑菇"], 白菜: ["小白菜"] }[name] || [];
    return item(`veg_${name}`, name, "vegetable", aliases, "g", /胡萝卜|南瓜|土豆/.test(name) ? 45 : 24, 1.5, 0.2, 4);
  }),

  item("apple", "苹果", "fruit", [], "g", 52, 0.3, 0.2, 14, { tags: ["noCook"] }),
  item("banana", "香蕉", "fruit", [], "g", 93, 1.2, 0.2, 22, { tags: ["noCook"] }),
  item("strawberry", "草莓", "fruit", [], "g", 32, 0.7, 0.3, 7, { tags: ["noCook"] }),
  item("blueberry", "蓝莓", "fruit", [], "g", 57, 0.7, 0.3, 14, { tags: ["noCook"] }),
  item("orange", "橙子", "fruit", [], "g", 47, 0.9, 0.1, 12, { tags: ["noCook"] }),
  item("kiwi", "猕猴桃", "fruit", ["奇异果"], "g", 61, 1.1, 0.5, 15, { tags: ["noCook"] }),
  item("fig", "无花果", "fruit", [], "g", 74, 0.8, 0.3, 19, { tags: ["noCook"] }),
  item("avocado", "牛油果", "fruit", [], "g", 160, 2, 15, 9, { tags: ["noCook", "fat"] }),

  item("badam", "巴旦木", "nut", ["扁桃仁"], "g", 579, 21, 50, 22, { tags: ["noCook"] }),
  item("almond", "杏仁", "nut", [], "g", 579, 21, 50, 22, { tags: ["noCook"] }),
  item("walnut", "核桃", "nut", [], "g", 646, 15, 65, 14, { tags: ["noCook"] }),
  item("cashew", "腰果", "nut", [], "g", 553, 18, 44, 30, { tags: ["noCook"] }),
  item("peanut", "花生", "nut", [], "g", 567, 26, 49, 16, { tags: ["noCook"] }),
  item("chia", "奇亚籽", "nut", [], "g", 486, 17, 31, 42, { tags: ["noCook"] }),
  item("flaxseed", "亚麻籽", "nut", [], "g", 534, 18, 42, 29, { tags: ["noCook"] }),

  ...[
    ["salt", "盐"], ["black_pepper", "黑胡椒"], ["soy_sauce", "生抽"], ["dark_soy", "老抽"], ["vinegar", "醋"], ["oyster_sauce", "蚝油"],
    ["olive_oil", "橄榄油"], ["sesame_oil", "香油"], ["garlic", "蒜"], ["ginger", "姜"], ["scallion", "葱"], ["chili", "辣椒"],
    ["curry", "咖喱粉"], ["cumin", "孜然粉"], ["honey", "蜂蜜"], ["ketchup", "番茄酱"], ["water", "水"], ["cooking_oil", "食用油"]
  ].map(([id, name]) => item(id, name, "seasoning", [], name === "水" ? "ml" : "g", 0, 0, 0, 0, { optional: true }))
];

const byId = new Map(INGREDIENT_CATALOG.map(i => [i.id, i]));
const BASIC_SEASONINGS = ["salt", "black_pepper", "water", "cooking_oil"];
const NO_COOK_METHODS = new Set(["noCook"]);
const HEAT_WORDS = ["加热", "煎", "炒", "煮", "焯水", "炖", "烤", "蒸", "预热", "空气炸锅", "热锅", "沸水", "水开", "微波"];

const TEMPLATE_LIBRARY = [
  { id: "tomato_egg", title: "番茄炒蛋", meals: ["breakfast", "lunch", "dinner"], required: ["egg", "veg_番茄"], optional: ["scallion"], seasonings: ["salt", "cooking_oil"], method: "stirFry", time: 10, filters: ["highProtein", "10min", "vegetarian"] },
  { id: "banana_milk_oats", title: "香蕉牛奶燕麦", meals: ["breakfast", "snack"], required: ["banana", "milk", "oats"], optional: ["chia", "badam"], seasonings: [], method: "noCook", time: 5, filters: ["10min", "noCook", "vegetarian"] },
  { id: "milk_oat_porridge", title: "牛奶燕麦粥", meals: ["breakfast"], required: ["milk", "oats"], optional: ["banana", "fig", "chia"], seasonings: ["water"], method: "pot", time: 12, filters: ["20min", "vegetarian"] },
  { id: "banana_oat_egg_pancake", title: "香蕉燕麦蛋饼", meals: ["breakfast"], required: ["banana", "oats", "egg"], optional: [], seasonings: ["cooking_oil"], method: "pan", time: 15, filters: ["20min", "highProtein", "vegetarian"] },
  { id: "yogurt_fruit_bowl", title: "酸奶坚果水果杯", meals: ["breakfast", "snack"], requiredAny: [["greek_yogurt"], ["apple", "banana", "strawberry", "blueberry", "orange", "kiwi", "fig"], ["badam", "almond", "walnut", "cashew", "peanut", "chia", "flaxseed"]], optional: ["oats"], seasonings: [], method: "noCook", time: 5, filters: ["10min", "noCook", "vegetarian"] },
  { id: "chicken_broccoli_rice", title: "鸡胸肉西兰花米饭", meals: ["lunch", "dinner"], required: ["chicken_breast", "veg_西兰花"], requiredAny: [["rice", "brown_rice"]], optional: ["veg_胡萝卜"], seasonings: ["salt", "black_pepper", "cooking_oil"], method: "stirFry", time: 20, filters: ["20min", "highProtein", "lowFat"] },
  { id: "beef_pepper_rice", title: "彩椒牛肉饭", meals: ["lunch", "dinner"], required: ["beef", "veg_彩椒"], requiredAny: [["rice", "brown_rice", "quinoa"]], optional: ["veg_洋葱"], seasonings: ["soy_sauce", "black_pepper", "cooking_oil"], method: "stirFry", time: 20, filters: ["20min", "highProtein"] },
  { id: "shrimp_veggie_noodles", title: "虾仁蔬菜面", meals: ["lunch", "dinner"], required: ["shrimp"], requiredAny: [["noodles", "buckwheat_noodles"], ["veg_菠菜", "veg_西兰花", "veg_黄瓜", "veg_青椒"]], optional: ["veg_香菇"], seasonings: ["salt", "soy_sauce"], method: "pot", time: 15, filters: ["20min", "highProtein", "lowFat"] },
  { id: "salmon_asparagus_potato", title: "三文鱼芦笋土豆", meals: ["lunch", "dinner"], required: ["salmon", "veg_芦笋", "potato"], optional: ["olive_oil"], seasonings: ["salt", "black_pepper"], method: "oven", time: 25, filters: ["highProtein"] },
  { id: "cod_tomato_soup", title: "番茄鳕鱼汤", meals: ["lunch", "dinner"], required: ["cod", "veg_番茄"], optional: ["veg_菌菇", "veg_金针菇"], seasonings: ["salt", "water"], method: "soup", time: 20, filters: ["20min", "lowFat", "highProtein"] },
  { id: "tofu_mushroom_bowl", title: "菌菇豆腐饭", meals: ["lunch", "dinner"], required: ["tofu", "veg_菌菇"], requiredAny: [["rice", "brown_rice", "quinoa"]], optional: ["veg_菠菜"], seasonings: ["soy_sauce", "cooking_oil"], method: "stirFry", time: 15, filters: ["20min", "vegetarian"] },
  { id: "tuna_bread_salad", title: "金枪鱼全麦面包", meals: ["breakfast", "lunch"], required: ["tuna", "whole_wheat_bread"], optional: ["veg_生菜", "veg_黄瓜", "avocado"], seasonings: ["black_pepper"], method: "noCook", time: 8, filters: ["10min", "noCook", "highProtein"] },
  { id: "sweet_potato_egg", title: "红薯鸡蛋餐", meals: ["breakfast", "snack"], required: ["sweet_potato", "egg"], optional: ["milk"], seasonings: ["water"], method: "pot", time: 20, filters: ["20min", "vegetarian"] },
  { id: "pork_eggplant", title: "猪瘦肉茄子饭", meals: ["lunch", "dinner"], required: ["lean_pork", "veg_茄子"], requiredAny: [["rice", "brown_rice"]], optional: ["garlic"], seasonings: ["soy_sauce", "cooking_oil"], method: "stirFry", time: 20, filters: ["20min", "highProtein"] },
  { id: "avocado_egg_bread", title: "牛油果鸡蛋全麦面包", meals: ["breakfast", "snack"], required: ["avocado", "egg", "whole_wheat_bread"], optional: ["black_pepper"], seasonings: [], method: "assembly", time: 10, filters: ["10min", "vegetarian"] }
];

function normalizeInventory(rawInventory = [], allowBasicSeasoning = true) {
  const map = new Map();
  for (const entry of rawInventory) {
    const base = byId.get(entry.id);
    if (!base) continue;
    map.set(entry.id, {
      ...base,
      selected: true,
      role: entry.role || "available",
      stock: Number(entry.stock) > 0 ? Number(entry.stock) : null,
      forbidden: Boolean(entry.forbidden)
    });
  }
  if (allowBasicSeasoning) {
    for (const id of BASIC_SEASONINGS) {
      if (!map.has(id)) map.set(id, { ...byId.get(id), selected: true, role: "basic", stock: null, basic: true });
    }
  }
  return map;
}

function hasAll(ids = [], inventory) {
  return ids.every(id => inventory.has(id) && !inventory.get(id).forbidden);
}

function pickRequiredAny(groups = [], inventory) {
  const picked = [];
  for (const group of groups) {
    const found = group.find(id => inventory.has(id) && !inventory.get(id).forbidden);
    if (!found) return null;
    picked.push(found);
  }
  return picked;
}

function gramsFor(item, mealType, goal) {
  if (item.isSeasoning) {
    if (item.id === "water") return 200;
    if (/oil/.test(item.id)) return goal === "lose" ? 5 : 8;
    return item.id === "honey" ? 5 : 2;
  }
  if (item.category === "protein") return item.unit === "个" ? 55 : goal === "gain" ? 170 : goal === "lose" ? 130 : 150;
  if (item.category === "staple") return goal === "lose" ? 90 : goal === "gain" ? 190 : 140;
  if (item.category === "vegetable") return 120;
  if (item.category === "fruit") return mealType === "snack" ? 120 : 100;
  if (item.category === "nut") return goal === "lose" ? 8 : 12;
  return 50;
}

function macroOf(ingredient) {
  const scale = ingredient.grams / 100;
  return {
    kcal: ingredient.caloriesPer100g * scale,
    protein: ingredient.proteinPer100g * scale,
    fat: ingredient.fatPer100g * scale,
    carbs: ingredient.carbsPer100g * scale
  };
}

function sumMacros(ingredients) {
  return ingredients.reduce((sum, ingredient) => {
    const m = macroOf(ingredient);
    sum.kcal += m.kcal; sum.protein += m.protein; sum.fat += m.fat; sum.carbs += m.carbs;
    return sum;
  }, { kcal: 0, protein: 0, fat: 0, carbs: 0 });
}

function methodName(method) {
  return ({ stirFry: "炒菜", pan: "香煎", pot: "水煮", soup: "汤", oven: "烤箱", airFryer: "空气炸锅", noCook: "无需烹饪", assembly: "组装" })[method] || "家常";
}

function stepsFor(template, ingredients) {
  const names = ingredients.map(i => i.name);
  const main = ingredients.filter(i => !i.isSeasoning);
  const seasonings = ingredients.filter(i => i.isSeasoning);
  const protein = main.find(i => i.category === "protein");
  const staples = main.filter(i => i.category === "staple");
  const veg = main.filter(i => i.category === "vegetable");
  const fruit = main.filter(i => i.category === "fruit");
  const nuts = main.filter(i => i.category === "nut");
  const seasoningText = seasonings.map(i => i.name).join("、");
  if (template.method === "noCook") {
    return [
      fruit.length ? `将${fruit.map(i => i.name).join("、")}洗净切块。` : `将${main.map(i => i.name).join("、")}准备好。`,
      nuts.length ? `将${nuts.map(i => i.name).join("、")}压碎备用。` : `按份量准备${names.join("、")}。`,
      `容器中加入${main.filter(i => i.category !== "fruit" && i.category !== "nut").map(i => i.name).join("、") || main[0].name}。`,
      fruit.length ? `放入${fruit.map(i => i.name).join("、")}。` : `放入剩余食材。`,
      nuts.length ? `撒上${nuts.map(i => i.name).join("、")}即可。` : `轻轻混合后即可。`
    ];
  }
  if (template.method === "assembly") {
    return [`将${names.join("、")}按份量准备好。`, `${protein ? `${protein.name}处理至熟。` : `处理主要食材。`}`, `把${main.map(i => i.name).join("、")}组合装盘。`, seasoningText ? `用${seasoningText}调味。` : `直接食用即可。`];
  }
  if (template.method === "soup" || template.method === "pot") {
    return [`将${main.map(i => i.name).join("、")}洗净并切成适口大小。`, `锅中放入${[...staples, protein].filter(Boolean).map(i => i.name).join("、") || main[0].name}。`, veg.length ? `加入${veg.map(i => i.name).join("、")}煮至熟透。` : `煮至食材熟透。`, seasoningText ? `用${seasoningText}调味后出锅。` : `确认熟透后出锅。`];
  }
  if (template.method === "oven" || template.method === "airFryer") {
    return [`将${main.map(i => i.name).join("、")}切好。`, seasoningText ? `用${seasoningText}拌匀${main.map(i => i.name).join("、")}。` : `将食材铺平。`, `放入${template.method === "oven" ? "烤箱" : "空气炸锅"}至熟透。`, `搭配${staples.map(i => i.name).join("、") || main.map(i => i.name).join("、")}装盘。`];
  }
  return [`将${main.map(i => i.name).join("、")}洗净切好。`, seasoningText ? `用${seasoningText}给${protein?.name || main[0].name}简单调味。` : `按份量准备好所有食材。`, `热锅后放入${protein?.name || main[0].name}。`, veg.length ? `加入${veg.map(i => i.name).join("、")}翻炒至熟。` : `翻炒至熟。`, staples.length ? `搭配${staples.map(i => i.name).join("、")}装盘。` : `出锅装盘。`];
}

function makeRecipe(template, ids, inventory, profile, nutrition, mealType) {
  const goal = profile.goal;
  const ingredients = ids.map(id => {
    const inv = inventory.get(id);
    let grams = gramsFor(inv, mealType, goal);
    if (inv.stock) grams = Math.min(grams, inv.stock);
    return { ...inv, grams: roundTo(grams, inv.unit === "个" ? 1 : inv.unit === "ml" ? 10 : 5) };
  }).filter(i => i.grams > 0);
  const macros = sumMacros(ingredients);
  const recipe = {
    id: template.id,
    icon: template.method === "noCook" ? "🥣" : "🍽️",
    name: template.title,
    method: methodName(template.method),
    methodType: template.method,
    ingredients,
    foods: ingredients.map(i => [i.name, i.grams, i.unit]),
    steps: stepsFor(template, ingredients),
    time: `${template.time} 分钟`,
    difficulty: template.time <= 10 ? "简单" : template.time <= 20 ? "中等" : "稍复杂",
    kcal: Math.round(macros.kcal),
    protein: Math.round(macros.protein),
    fat: Math.round(macros.fat),
    carbs: Math.round(macros.carbs),
    suitableGoals: template.filters.includes("highProtein") ? ["增肌", "维持"] : ["减脂", "增肌", "维持"],
    usedInventory: ingredients.filter(i => !i.basic).map(i => i.name),
    basicSeasonings: ingredients.filter(i => i.basic).map(i => i.name),
    needsExtraIngredients: false,
    filters: template.filters,
    remainingStock: ingredients.filter(i => inventory.get(i.id)?.stock).map(i => ({ id: i.id, name: i.name, remaining: Math.max(0, inventory.get(i.id).stock - i.grams), unit: i.unit }))
  };
  return recipe;
}

export function validateRecipeAgainstInventory(recipe, inventory, options = {}) {
  const inv = inventory instanceof Map ? inventory : normalizeInventory(inventory, options.allowBasicSeasoning);
  const allowed = new Set(inv.keys());
  for (const ingredient of recipe.ingredients) {
    if (!allowed.has(ingredient.id)) return { ok: false, reason: `未选择食材：${ingredient.name}` };
    const stock = inv.get(ingredient.id)?.stock;
    if (stock && ingredient.grams > stock) return { ok: false, reason: `${ingredient.name}库存不足` };
    if (options.strictSeasoning && ingredient.isSeasoning && inv.get(ingredient.id)?.basic) return { ok: false, reason: `严格模式不允许默认调味料：${ingredient.name}` };
  }
  const ingredientNames = recipe.ingredients.map(i => i.name);
  const stepText = recipe.steps.join(" ");
  const title = recipe.name;
  for (const known of INGREDIENT_CATALOG.map(i => i.name).sort((a, b) => b.length - a.length)) {
    const exists = ingredientNames.some(name => name === known || name.includes(known) || known.includes(name));
    if (stepText.includes(known) && !exists) return { ok: false, reason: `步骤出现未选择食材：${known}` };
    if (title.includes(known) && !exists) return { ok: false, reason: `菜名出现未选择食材：${known}` };
  }
  if (NO_COOK_METHODS.has(recipe.methodType) && HEAT_WORDS.some(word => stepText.includes(word))) return { ok: false, reason: "无需烹饪食谱出现加热动作" };
  const mustUse = [...inv.values()].filter(i => i.role === "must").map(i => i.id);
  for (const id of mustUse) if (!recipe.ingredients.some(i => i.id === id)) return { ok: false, reason: `遗漏必须使用食材：${inv.get(id).name}` };
  const macros = sumMacros(recipe.ingredients);
  if (Math.round(macros.kcal) !== recipe.kcal) return { ok: false, reason: "营养数据不一致" };
  return { ok: true };
}

function missingSuggestions(inventory) {
  const hasProtein = [...inventory.values()].some(i => i.category === "protein" && !i.forbidden);
  const hasStaple = [...inventory.values()].some(i => i.category === "staple" && !i.forbidden);
  const hasVegetable = [...inventory.values()].some(i => i.category === "vegetable" && !i.forbidden);
  const messages = [];
  if (!hasProtein) messages.push("缺少蛋白质，建议补充鸡蛋、豆腐、鸡胸肉或鱼类。");
  if (!hasStaple) messages.push("缺少主食，建议补充大米、燕麦、红薯、玉米或面条。");
  if (!hasVegetable) messages.push("缺少蔬菜，建议补充番茄、菠菜、西兰花、黄瓜等。");
  if (!messages.length) messages.push("当前组合较少，建议增加一种可搭配食材。");
  return messages;
}

export function generateRecipesFromInventory(rawInventory, options = {}) {
  const {
    profile = { goal: "maintain" },
    nutrition = { calories: 2000, protein: 110, fat: 60, carbs: 250 },
    mealTypes = ["breakfast", "lunch", "dinner", "snack"],
    filters = [],
    count = 6,
    allowBasicSeasoning = true,
    strictSeasoning = false
  } = options;
  const inventory = normalizeInventory(rawInventory, allowBasicSeasoning && !strictSeasoning);
  const selectedCount = [...inventory.values()].filter(i => !i.basic).length;
  if (selectedCount < 2) return { recipes: [], errors: ["当前食材较少，暂时无法生成合理食谱。", ...missingSuggestions(inventory)], inventory };

  const mustIds = [...inventory.values()].filter(i => i.role === "must").map(i => i.id);
  const candidates = [];
  for (const template of TEMPLATE_LIBRARY) {
    if (!template.meals.some(m => mealTypes.includes(m))) continue;
    if (filters.length && !filters.every(f => template.filters.includes(f))) continue;
    if (!hasAll(template.required || [], inventory)) continue;
    const anyPicked = pickRequiredAny(template.requiredAny || [], inventory);
    if ((template.requiredAny || []).length && !anyPicked) continue;
    const optionalPicked = (template.optional || []).filter(id => inventory.has(id) && !inventory.get(id).forbidden);
    const seasoningPicked = (template.seasonings || []).filter(id => inventory.has(id) && !inventory.get(id).forbidden);
    if ((template.seasonings || []).some(id => !inventory.has(id)) && strictSeasoning) continue;
    let ids = [...(template.required || []), ...(anyPicked || []), ...optionalPicked.slice(0, 2), ...seasoningPicked];
    ids = [...new Set(ids)];
    if (mustIds.some(id => !ids.includes(id))) continue;
    let recipe = null;
    for (let retry = 0; retry < 3; retry++) {
      recipe = makeRecipe(template, ids, inventory, profile, nutrition, template.meals.find(m => mealTypes.includes(m)) || mealTypes[0]);
      const valid = validateRecipeAgainstInventory(recipe, inventory, { strictSeasoning });
      if (valid.ok) break;
      recipe = null;
    }
    if (recipe) {
      const priorityScore = recipe.ingredients.filter(i => i.role === "priority").length * 20 + recipe.protein - recipe.kcal / 100;
      candidates.push({ ...recipe, score: priorityScore });
    }
  }
  candidates.sort((a, b) => b.score - a.score);
  if (!candidates.length) return { recipes: [], errors: ["当前食材无法组成合理食谱。", ...missingSuggestions(inventory)], inventory };
  return { recipes: candidates.slice(0, clamp(count, 3, 6)), errors: [], inventory };
}

export function getInventorySummary(rawInventory, allowBasicSeasoning = true) {
  const inventory = normalizeInventory(rawInventory, allowBasicSeasoning);
  return [...inventory.values()].map(i => ({ id: i.id, name: i.name, category: i.category, role: i.role, stock: i.stock, unit: i.unit, basic: i.basic }));
}
