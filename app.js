const mealPools = {
  breakfast: [
    { icon: "🥣", name: "燕麦酸奶水果碗", foods: [["燕麦", 45, "g"], ["无糖酸奶", 180, "g"], ["蓝莓", 80, "g"], ["核桃", 10, "g"]], kcal: 430 },
    { icon: "🍳", name: "全麦鸡蛋早餐盘", foods: [["全麦面包", 70, "g"], ["鸡蛋", 2, "个"], ["牛奶", 220, "ml"], ["小番茄", 100, "g"]], kcal: 455 },
    { icon: "🌽", name: "玉米鸡蛋豆浆餐", foods: [["甜玉米", 180, "g"], ["鸡蛋", 1, "个"], ["无糖豆浆", 300, "ml"], ["橙子", 150, "g"]], kcal: 420 }
  ],
  lunch: [
    { icon: "🍚", name: "杂粮饭香煎鸡胸", foods: [["杂粮饭", 180, "g"], ["鸡胸肉", 150, "g"], ["西兰花", 180, "g"], ["橄榄油", 8, "g"]], kcal: 640 },
    { icon: "🐟", name: "糙米清蒸鱼套餐", foods: [["糙米饭", 180, "g"], ["鲈鱼", 180, "g"], ["彩椒菌菇", 200, "g"], ["烹调油", 8, "g"]], kcal: 625 },
    { icon: "🥩", name: "藜麦牛肉时蔬碗", foods: [["藜麦饭", 180, "g"], ["瘦牛肉", 140, "g"], ["混合时蔬", 220, "g"], ["烹调油", 8, "g"]], kcal: 655 }
  ],
  snack: [
    { icon: "🍎", name: "水果坚果加餐", foods: [["苹果", 180, "g"], ["巴旦木", 15, "g"]], kcal: 180 },
    { icon: "🥛", name: "牛奶香蕉加餐", foods: [["低脂牛奶", 220, "ml"], ["香蕉", 100, "g"]], kcal: 195 },
    { icon: "🍠", name: "酸奶红薯加餐", foods: [["无糖酸奶", 120, "g"], ["蒸红薯", 100, "g"]], kcal: 180 }
  ],
  dinner: [
    { icon: "🥗", name: "南瓜虾仁暖沙拉", foods: [["南瓜", 220, "g"], ["虾仁", 160, "g"], ["绿叶菜", 220, "g"], ["全麦面包", 50, "g"], ["橄榄油", 8, "g"]], kcal: 570 },
    { icon: "🍲", name: "豆腐鸡肉荞麦面", foods: [["荞麦面", 80, "g"], ["鸡腿肉去皮", 120, "g"], ["北豆腐", 100, "g"], ["青菜", 200, "g"]], kcal: 590 },
    { icon: "🥘", name: "番茄牛肉土豆煲", foods: [["瘦牛肉", 130, "g"], ["土豆", 180, "g"], ["番茄", 200, "g"], ["米饭", 100, "g"], ["烹调油", 6, "g"]], kcal: 605 }
  ]
};

function addRecipes(category, recipes) {
  mealPools[category].push(...recipes.map(([icon, name, kcal, foods]) => ({ icon, name, kcal, foods })));
}

// 扩展菜谱库：每个餐段新增 25 道，共新增 100 道。
addRecipes("breakfast", [
  ["🥣", "小米南瓜粥配鸡蛋", 410, [["小米粥", 300, "g"], ["南瓜", 120, "g"], ["鸡蛋", 1, "个"], ["牛奶", 200, "ml"]]],
  ["🍠", "紫薯牛奶早餐盘", 425, [["紫薯", 180, "g"], ["牛奶", 250, "ml"], ["鸡蛋", 1, "个"], ["猕猴桃", 100, "g"]]],
  ["🥪", "金枪鱼全麦三明治", 450, [["全麦面包", 80, "g"], ["水浸金枪鱼", 90, "g"], ["生菜", 50, "g"], ["番茄", 80, "g"], ["低脂奶酪", 20, "g"]]],
  ["🥞", "香蕉燕麦松饼", 440, [["燕麦", 55, "g"], ["香蕉", 100, "g"], ["鸡蛋", 1, "个"], ["无糖酸奶", 120, "g"]]],
  ["🍜", "番茄鸡蛋荞麦面", 455, [["荞麦面", 70, "g"], ["鸡蛋", 1, "个"], ["番茄", 180, "g"], ["青菜", 100, "g"]]],
  ["🥯", "全麦贝果牛油果蛋", 470, [["全麦贝果", 80, "g"], ["牛油果", 50, "g"], ["鸡蛋", 1, "个"], ["生菜", 60, "g"]]],
  ["🍚", "杂粮饭团豆浆餐", 430, [["杂粮饭团", 160, "g"], ["无糖豆浆", 300, "ml"], ["黄瓜", 100, "g"]]],
  ["🥣", "红豆薏米粥早餐", 420, [["红豆薏米粥", 320, "g"], ["鸡蛋", 1, "个"], ["原味酸奶", 150, "g"]]],
  ["🌯", "鸡肉蔬菜早餐卷", 460, [["全麦饼", 70, "g"], ["鸡胸肉", 90, "g"], ["彩椒", 80, "g"], ["生菜", 60, "g"]]],
  ["🥛", "黑芝麻燕麦豆浆", 415, [["燕麦", 45, "g"], ["无糖豆浆", 280, "ml"], ["黑芝麻", 10, "g"], ["梨", 150, "g"]]],
  ["🥚", "菠菜鸡蛋全麦吐司", 435, [["全麦吐司", 75, "g"], ["鸡蛋", 2, "个"], ["菠菜", 100, "g"], ["牛奶", 150, "ml"]]],
  ["🌽", "山药玉米早餐盘", 405, [["山药", 150, "g"], ["玉米", 120, "g"], ["鸡蛋", 1, "个"], ["无糖豆浆", 200, "ml"]]],
  ["🥣", "藜麦苹果肉桂粥", 400, [["藜麦", 45, "g"], ["燕麦", 25, "g"], ["苹果", 120, "g"], ["牛奶", 180, "ml"]]],
  ["🥪", "烟熏三文鱼开放吐司", 465, [["全麦面包", 75, "g"], ["烟熏三文鱼", 70, "g"], ["低脂奶酪", 25, "g"], ["黄瓜", 100, "g"]]],
  ["🍲", "青菜瘦肉燕麦粥", 425, [["燕麦米", 60, "g"], ["瘦猪肉", 80, "g"], ["青菜", 120, "g"], ["香菇", 50, "g"]]],
  ["🥔", "土豆鸡蛋酸奶盘", 440, [["蒸土豆", 220, "g"], ["鸡蛋", 2, "个"], ["无糖酸奶", 150, "g"], ["小番茄", 100, "g"]]],
  ["🍌", "花生香蕉隔夜燕麦", 455, [["燕麦", 50, "g"], ["牛奶", 180, "ml"], ["香蕉", 100, "g"], ["花生酱", 12, "g"]]],
  ["🥟", "白菜鸡肉蒸饺早餐", 445, [["鸡肉蒸饺", 180, "g"], ["无糖豆浆", 250, "ml"], ["橙子", 120, "g"]]],
  ["🍳", "蘑菇蛋卷配全麦面包", 430, [["鸡蛋", 2, "个"], ["蘑菇", 100, "g"], ["全麦面包", 65, "g"], ["牛奶", 150, "ml"]]],
  ["🥣", "莲子百合杂粮粥", 405, [["杂粮粥", 320, "g"], ["莲子", 20, "g"], ["百合", 30, "g"], ["鸡蛋", 1, "个"]]],
  ["🍞", "低脂奶酪火鸡吐司", 450, [["全麦吐司", 80, "g"], ["火鸡胸肉", 80, "g"], ["低脂奶酪", 25, "g"], ["番茄", 100, "g"]]],
  ["🥛", "可可香蕉酸奶碗", 420, [["无糖酸奶", 220, "g"], ["香蕉", 100, "g"], ["燕麦", 35, "g"], ["可可粉", 5, "g"], ["杏仁", 10, "g"]]],
  ["🍚", "糙米鸡丝蔬菜粥", 430, [["糙米粥", 300, "g"], ["鸡丝", 90, "g"], ["胡萝卜", 60, "g"], ["青菜", 100, "g"]]],
  ["🧇", "酸奶莓果全麦华夫", 445, [["全麦华夫饼", 100, "g"], ["无糖酸奶", 150, "g"], ["草莓", 120, "g"], ["核桃", 8, "g"]]],
  ["🥙", "鹰嘴豆鸡蛋皮塔饼", 460, [["全麦皮塔饼", 75, "g"], ["鹰嘴豆", 90, "g"], ["鸡蛋", 1, "个"], ["生菜", 80, "g"]]]
]);

addRecipes("lunch", [
  ["🍗", "黑椒鸡腿糙米饭", 650, [["糙米饭", 180, "g"], ["去皮鸡腿肉", 160, "g"], ["西兰花", 180, "g"], ["烹调油", 8, "g"]]],
  ["🐟", "柠檬三文鱼藜麦碗", 670, [["三文鱼", 150, "g"], ["藜麦饭", 170, "g"], ["芦笋", 180, "g"], ["橄榄油", 6, "g"]]],
  ["🥩", "芹菜牛肉杂粮饭", 640, [["瘦牛肉", 150, "g"], ["杂粮饭", 180, "g"], ["芹菜", 180, "g"], ["烹调油", 8, "g"]]],
  ["🦐", "虾仁豆腐盖饭", 620, [["米饭", 180, "g"], ["虾仁", 140, "g"], ["嫩豆腐", 150, "g"], ["青菜", 150, "g"], ["烹调油", 7, "g"]]],
  ["🍛", "咖喱鸡肉蔬菜饭", 660, [["糙米饭", 180, "g"], ["鸡胸肉", 150, "g"], ["土豆", 100, "g"], ["胡萝卜", 80, "g"], ["低脂咖喱汁", 50, "g"]]],
  ["🍜", "番茄牛腩荞麦面", 655, [["荞麦面", 90, "g"], ["牛腩", 140, "g"], ["番茄", 220, "g"], ["青菜", 150, "g"]]],
  ["🥘", "菌菇豆腐杂粮煲", 600, [["杂粮饭", 170, "g"], ["北豆腐", 200, "g"], ["混合菌菇", 180, "g"], ["青菜", 150, "g"], ["烹调油", 8, "g"]]],
  ["🐔", "照烧鸡胸紫米饭", 645, [["紫米饭", 180, "g"], ["鸡胸肉", 160, "g"], ["卷心菜", 180, "g"], ["低糖照烧汁", 25, "g"]]],
  ["🐟", "香煎鳕鱼土豆泥", 625, [["鳕鱼", 180, "g"], ["土豆泥", 220, "g"], ["四季豆", 180, "g"], ["橄榄油", 8, "g"]]],
  ["🍚", "卤牛腱杂蔬饭", 650, [["米饭", 180, "g"], ["卤牛腱", 150, "g"], ["西兰花", 120, "g"], ["胡萝卜", 80, "g"]]],
  ["🌯", "墨西哥鸡肉杂粮卷", 630, [["全麦饼", 90, "g"], ["鸡胸肉", 150, "g"], ["红腰豆", 80, "g"], ["彩椒", 120, "g"], ["生菜", 80, "g"]]],
  ["🍲", "冬瓜虾仁豆腐汤饭", 605, [["糙米饭", 170, "g"], ["虾仁", 150, "g"], ["豆腐", 130, "g"], ["冬瓜", 250, "g"], ["烹调油", 6, "g"]]],
  ["🥩", "洋葱猪里脊糙米饭", 635, [["糙米饭", 180, "g"], ["猪里脊", 160, "g"], ["洋葱", 100, "g"], ["彩椒", 120, "g"], ["烹调油", 8, "g"]]],
  ["🐟", "清蒸鲳鱼红薯饭", 620, [["鲳鱼", 180, "g"], ["红薯", 220, "g"], ["青菜", 200, "g"], ["烹调油", 6, "g"]]],
  ["🥗", "鸡肉鹰嘴豆能量碗", 640, [["鸡胸肉", 150, "g"], ["鹰嘴豆", 120, "g"], ["藜麦饭", 120, "g"], ["混合生菜", 180, "g"], ["橄榄油", 8, "g"]]],
  ["🍝", "牛肉番茄全麦意面", 665, [["全麦意面", 95, "g"], ["瘦牛肉末", 140, "g"], ["番茄", 220, "g"], ["蘑菇", 100, "g"]]],
  ["🦆", "冬笋鸭胸杂粮饭", 650, [["杂粮饭", 180, "g"], ["去皮鸭胸", 150, "g"], ["冬笋", 160, "g"], ["青菜", 140, "g"]]],
  ["🍳", "番茄豆腐滑蛋饭", 610, [["米饭", 170, "g"], ["鸡蛋", 2, "个"], ["豆腐", 160, "g"], ["番茄", 200, "g"], ["烹调油", 7, "g"]]],
  ["🐟", "金枪鱼玉米糙米碗", 625, [["糙米饭", 180, "g"], ["水浸金枪鱼", 150, "g"], ["玉米", 80, "g"], ["生菜", 150, "g"], ["牛油果", 40, "g"]]],
  ["🍗", "香菇蒸鸡小米饭", 635, [["小米饭", 180, "g"], ["去皮鸡腿肉", 160, "g"], ["香菇", 100, "g"], ["青菜", 180, "g"]]],
  ["🥘", "韩式瘦牛肉拌饭", 660, [["糙米饭", 180, "g"], ["瘦牛肉", 140, "g"], ["菠菜", 100, "g"], ["胡萝卜", 80, "g"], ["鸡蛋", 1, "个"]]],
  ["🦐", "西葫芦虾仁藜麦饭", 615, [["藜麦饭", 180, "g"], ["虾仁", 170, "g"], ["西葫芦", 200, "g"], ["烹调油", 8, "g"]]],
  ["🐔", "口蘑鸡肉荞麦饭", 630, [["荞麦饭", 180, "g"], ["鸡胸肉", 155, "g"], ["口蘑", 160, "g"], ["芦笋", 150, "g"]]],
  ["🥣", "海带豆腐牛肉汤饭", 620, [["糙米饭", 170, "g"], ["瘦牛肉", 130, "g"], ["豆腐", 120, "g"], ["海带", 80, "g"], ["青菜", 150, "g"]]],
  ["🌮", "黑豆鸡肉玉米饼", 645, [["玉米饼", 100, "g"], ["鸡胸肉", 150, "g"], ["黑豆", 90, "g"], ["番茄", 100, "g"], ["生菜", 80, "g"]]]
]);

addRecipes("snack", [
  ["🍓", "草莓希腊酸奶", 175, [["希腊酸奶", 150, "g"], ["草莓", 150, "g"]]],
  ["🥝", "猕猴桃腰果加餐", 180, [["猕猴桃", 180, "g"], ["腰果", 15, "g"]]],
  ["🍐", "香梨核桃加餐", 185, [["梨", 200, "g"], ["核桃", 15, "g"]]],
  ["🍊", "橙子低脂奶酪", 170, [["橙子", 200, "g"], ["低脂奶酪", 35, "g"]]],
  ["🫐", "蓝莓燕麦酸奶杯", 195, [["无糖酸奶", 150, "g"], ["蓝莓", 100, "g"], ["燕麦", 15, "g"]]],
  ["🥒", "黄瓜鹰嘴豆泥", 165, [["黄瓜", 180, "g"], ["鹰嘴豆泥", 55, "g"]]],
  ["🍅", "小番茄鸡蛋加餐", 150, [["小番茄", 180, "g"], ["鸡蛋", 1, "个"]]],
  ["🍑", "桃子巴旦木加餐", 180, [["桃子", 220, "g"], ["巴旦木", 15, "g"]]],
  ["🍍", "菠萝茅屋奶酪杯", 190, [["菠萝", 150, "g"], ["茅屋奶酪", 100, "g"]]],
  ["🍇", "葡萄开心果加餐", 200, [["葡萄", 160, "g"], ["开心果", 15, "g"]]],
  ["🌽", "水煮玉米加餐", 175, [["甜玉米", 180, "g"]]],
  ["🥚", "鸡蛋全麦脆饼", 185, [["鸡蛋", 1, "个"], ["全麦脆饼", 35, "g"]]],
  ["🥛", "无糖豆浆核桃", 190, [["无糖豆浆", 300, "ml"], ["核桃", 12, "g"]]],
  ["🍉", "西瓜酸奶杯", 165, [["西瓜", 280, "g"], ["无糖酸奶", 100, "g"]]],
  ["🥕", "胡萝卜条花生酱", 180, [["胡萝卜", 180, "g"], ["无糖花生酱", 18, "g"]]],
  ["🍒", "樱桃南瓜籽加餐", 185, [["樱桃", 180, "g"], ["南瓜籽", 15, "g"]]],
  ["🥥", "椰香奇亚籽布丁", 195, [["低脂牛奶", 180, "ml"], ["奇亚籽", 18, "g"], ["椰蓉", 5, "g"]]],
  ["🍌", "香蕉花生酱小食", 205, [["香蕉", 120, "g"], ["花生酱", 15, "g"]]],
  ["🫛", "毛豆海苔加餐", 180, [["水煮毛豆仁", 130, "g"], ["海苔", 5, "g"]]],
  ["🍎", "烤苹果肉桂酸奶", 175, [["苹果", 180, "g"], ["无糖酸奶", 100, "g"], ["肉桂粉", 2, "g"]]],
  ["🍠", "紫薯牛奶加餐", 195, [["紫薯", 120, "g"], ["低脂牛奶", 180, "ml"]]],
  ["🥣", "豆乳燕麦杯", 185, [["无糖豆浆", 180, "ml"], ["燕麦", 25, "g"], ["奇亚籽", 8, "g"]]],
  ["🥭", "芒果酸奶杯", 190, [["芒果", 150, "g"], ["无糖酸奶", 150, "g"]]],
  ["🧀", "奶酪全麦饼干", 200, [["低脂奶酪", 40, "g"], ["全麦饼干", 35, "g"]]],
  ["🍋", "柚子杏仁加餐", 175, [["柚子", 250, "g"], ["杏仁", 15, "g"]]]
]);

addRecipes("dinner", [
  ["🐟", "清蒸鳕鱼杂粮饭", 575, [["鳕鱼", 180, "g"], ["杂粮饭", 140, "g"], ["西兰花", 220, "g"], ["烹调油", 6, "g"]]],
  ["🍗", "香草鸡胸烤时蔬", 560, [["鸡胸肉", 170, "g"], ["土豆", 160, "g"], ["西葫芦", 160, "g"], ["彩椒", 100, "g"], ["橄榄油", 8, "g"]]],
  ["🥘", "虾仁豆腐菌菇煲", 535, [["虾仁", 160, "g"], ["豆腐", 180, "g"], ["菌菇", 180, "g"], ["青菜", 180, "g"], ["米饭", 100, "g"]]],
  ["🥩", "芦笋牛肉藜麦盘", 590, [["瘦牛肉", 140, "g"], ["藜麦饭", 140, "g"], ["芦笋", 200, "g"], ["烹调油", 7, "g"]]],
  ["🍲", "冬瓜鸡肉丸汤", 520, [["鸡肉丸", 170, "g"], ["冬瓜", 260, "g"], ["青菜", 160, "g"], ["红薯", 170, "g"]]],
  ["🐟", "番茄巴沙鱼荞麦面", 555, [["巴沙鱼", 180, "g"], ["荞麦面", 70, "g"], ["番茄", 220, "g"], ["青菜", 180, "g"]]],
  ["🥗", "金枪鱼土豆沙拉", 540, [["水浸金枪鱼", 150, "g"], ["土豆", 220, "g"], ["鸡蛋", 1, "个"], ["混合生菜", 180, "g"], ["橄榄油", 6, "g"]]],
  ["🍛", "南瓜鸡肉咖喱", 580, [["鸡胸肉", 160, "g"], ["南瓜", 220, "g"], ["糙米饭", 130, "g"], ["洋葱", 80, "g"]]],
  ["🥬", "白菜豆腐炖瘦肉", 525, [["瘦猪肉", 130, "g"], ["北豆腐", 160, "g"], ["白菜", 250, "g"], ["杂粮饭", 100, "g"]]],
  ["🦐", "蒜香虾仁西兰花饭", 550, [["虾仁", 180, "g"], ["西兰花", 240, "g"], ["糙米饭", 140, "g"], ["橄榄油", 7, "g"]]],
  ["🍝", "鸡肉蘑菇全麦意面", 590, [["全麦意面", 80, "g"], ["鸡胸肉", 140, "g"], ["蘑菇", 160, "g"], ["番茄", 150, "g"]]],
  ["🐠", "香煎龙利鱼紫薯盘", 545, [["龙利鱼", 190, "g"], ["紫薯", 190, "g"], ["芦笋", 200, "g"], ["橄榄油", 7, "g"]]],
  ["🍳", "西红柿豆腐炒蛋", 520, [["鸡蛋", 2, "个"], ["豆腐", 180, "g"], ["西红柿", 220, "g"], ["糙米饭", 110, "g"]]],
  ["🥣", "山药排骨蔬菜汤", 570, [["瘦排骨", 150, "g"], ["山药", 180, "g"], ["胡萝卜", 100, "g"], ["青菜", 180, "g"]]],
  ["🌯", "牛肉彩椒全麦卷", 585, [["全麦饼", 80, "g"], ["瘦牛肉", 140, "g"], ["彩椒", 160, "g"], ["生菜", 100, "g"], ["无糖酸奶酱", 30, "g"]]],
  ["🐔", "口水鸡轻食荞麦碗", 575, [["去皮鸡腿肉", 160, "g"], ["荞麦面", 65, "g"], ["黄瓜", 150, "g"], ["豆芽", 120, "g"], ["低油酱汁", 25, "g"]]],
  ["🍲", "海带豆腐蛤蜊汤饭", 525, [["蛤蜊肉", 150, "g"], ["豆腐", 160, "g"], ["海带", 80, "g"], ["糙米饭", 130, "g"], ["青菜", 150, "g"]]],
  ["🥩", "萝卜炖牛腱杂粮饭", 595, [["牛腱", 150, "g"], ["白萝卜", 220, "g"], ["杂粮饭", 140, "g"], ["青菜", 150, "g"]]],
  ["🍆", "肉末蒸茄子糙米饭", 550, [["瘦肉末", 130, "g"], ["茄子", 240, "g"], ["糙米饭", 140, "g"], ["烹调油", 6, "g"]]],
  ["🐟", "鲈鱼豆腐青菜煲", 540, [["鲈鱼", 180, "g"], ["豆腐", 140, "g"], ["青菜", 220, "g"], ["红薯", 150, "g"]]],
  ["🥗", "烤鸡鹰嘴豆沙拉", 565, [["鸡胸肉", 160, "g"], ["鹰嘴豆", 100, "g"], ["混合生菜", 220, "g"], ["全麦面包", 45, "g"], ["橄榄油", 7, "g"]]],
  ["🍜", "酸汤肥牛魔芋面", 555, [["瘦肥牛", 150, "g"], ["魔芋面", 220, "g"], ["金针菇", 120, "g"], ["番茄", 180, "g"], ["玉米", 100, "g"]]],
  ["🦆", "橙香鸭胸时蔬盘", 585, [["去皮鸭胸", 160, "g"], ["南瓜", 180, "g"], ["四季豆", 180, "g"], ["橙子", 100, "g"]]],
  ["🥘", "扁豆鸡肉糙米煲", 570, [["鸡胸肉", 150, "g"], ["扁豆", 100, "g"], ["糙米饭", 140, "g"], ["番茄", 160, "g"], ["菠菜", 120, "g"]]],
  ["🍄", "菌菇豆干荞麦饭", 525, [["荞麦饭", 140, "g"], ["豆干", 160, "g"], ["混合菌菇", 200, "g"], ["青菜", 180, "g"], ["烹调油", 7, "g"]]]
]);

const form = document.querySelector("#profile-form");
const results = document.querySelector("#results");
let latestProfile = null;

const ACCOUNT_STORE_KEY = "dailyMealPlanner.accounts.v1";
const SESSION_USER_KEY = "dailyMealPlanner.currentUser";
const authModal = document.querySelector("#auth-modal");
const authForm = document.querySelector("#auth-form");
const authUsername = document.querySelector("#auth-username");
const authPassword = document.querySelector("#auth-password");
const authError = document.querySelector("#auth-error");
const toast = document.querySelector("#toast");
let authMode = "login";
let currentUserKey = sessionStorage.getItem(SESSION_USER_KEY);
let toastTimer = null;

function readAccounts() {
  try { return JSON.parse(localStorage.getItem(ACCOUNT_STORE_KEY)) || {}; }
  catch { return {}; }
}

function writeAccounts(accounts) {
  localStorage.setItem(ACCOUNT_STORE_KEY, JSON.stringify(accounts));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) throw new Error("当前浏览器不支持安全的本地密码存储。");
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const digest = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    salt: encoder.encode(salt),
    iterations: 120000,
    hash: "SHA-256"
  }, keyMaterial, 256);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

function newSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
}

function setAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll("[data-auth-mode]").forEach(tab => {
    const active = tab.dataset.authMode === mode;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  document.querySelector("#auth-title").textContent = mode === "login" ? "欢迎回来" : "创建本地账号";
  document.querySelector("#auth-description").textContent = mode === "login" ? "登录后自动恢复你上次填写的身体数据。" : "注册后，每次生成食谱都会自动保存你的个人数据。";
  document.querySelector("#auth-submit").textContent = mode === "login" ? "登录并恢复档案" : "注册并开始使用";
  authPassword.autocomplete = mode === "login" ? "current-password" : "new-password";
  authError.textContent = "";
}

function openAuth(mode = "login") {
  setAuthMode(mode);
  authModal.classList.add("is-open");
  authModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  authUsername.focus();
}

function closeAuth() {
  authModal.classList.remove("is-open");
  authModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  authForm.reset();
  authError.textContent = "";
}

function applyProfile(profile) {
  if (!profile) return;
  document.querySelector("#height").value = profile.height;
  document.querySelector("#weight").value = profile.weight;
  document.querySelector("#age").value = profile.age;
  document.querySelector("#sex").value = profile.sex;
  const activity = document.querySelector(`input[name="activity"][value="${profile.activity}"]`);
  const goal = document.querySelector(`input[name="goal"][value="${profile.goal}"]`);
  if (activity) activity.checked = true;
  if (goal) goal.checked = true;
}

function updateAuthUI(restoreProfile = false) {
  const accounts = readAccounts();
  const account = currentUserKey ? accounts[currentUserKey] : null;
  if (!account) {
    currentUserKey = null;
    sessionStorage.removeItem(SESSION_USER_KEY);
    document.querySelector("#guest-actions").hidden = false;
    document.querySelector("#user-actions").hidden = true;
    return;
  }
  document.querySelector("#guest-actions").hidden = true;
  document.querySelector("#user-actions").hidden = false;
  document.querySelector("#current-username").textContent = account.username;
  if (restoreProfile && account.profile) {
    applyProfile(account.profile);
    showToast("已恢复上次保存的个人数据");
  }
}

function saveProfileForCurrentUser(profile) {
  if (!currentUserKey) return;
  const accounts = readAccounts();
  if (!accounts[currentUserKey]) return;
  accounts[currentUserKey].profile = profile;
  accounts[currentUserKey].updatedAt = new Date().toISOString();
  writeAccounts(accounts);
  showToast("个人数据已保存到此账号");
}

document.querySelector("#open-auth").addEventListener("click", () => openAuth("login"));
document.querySelector("#logout-button").addEventListener("click", () => {
  currentUserKey = null;
  sessionStorage.removeItem(SESSION_USER_KEY);
  updateAuthUI();
  showToast("已退出登录");
});
document.querySelectorAll("[data-close-auth]").forEach(element => element.addEventListener("click", closeAuth));
document.querySelectorAll("[data-auth-mode]").forEach(tab => tab.addEventListener("click", () => setAuthMode(tab.dataset.authMode)));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && authModal.classList.contains("is-open")) closeAuth();
});

authForm.addEventListener("submit", async event => {
  event.preventDefault();
  authError.textContent = "";
  const username = authUsername.value.trim();
  const key = username.toLocaleLowerCase();
  const password = authPassword.value;
  if (!/^[\p{L}\p{N}_-]{3,20}$/u.test(username)) {
    authError.textContent = "用户名需为 3–20 个文字、字母、数字、下划线或短横线。";
    return;
  }
  if (password.length < 6) {
    authError.textContent = "密码至少需要 6 个字符。";
    return;
  }
  try {
    const accounts = readAccounts();
    if (authMode === "register") {
      if (accounts[key]) { authError.textContent = "该用户名已存在，请直接登录。"; return; }
      const salt = newSalt();
      accounts[key] = { username, salt, passwordHash: await hashPassword(password, salt), profile: null, createdAt: new Date().toISOString() };
      writeAccounts(accounts);
    } else {
      const account = accounts[key];
      if (!account || await hashPassword(password, account.salt) !== account.passwordHash) {
        authError.textContent = "用户名或密码不正确。";
        return;
      }
    }
    currentUserKey = key;
    sessionStorage.setItem(SESSION_USER_KEY, key);
    closeAuth();
    updateAuthUI(true);
    showToast(authMode === "register" ? "注册成功，已登录" : "登录成功");
  } catch (error) {
    authError.textContent = error.message || "登录失败，请稍后重试。";
  }
});

updateAuthUI(true);

function calculate(profile) {
  const { height, weight, age, sex, activity, goal } = profile;
  const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : -161);
  const maintenance = bmr * activity;
  const multiplier = goal === "lose" ? .85 : goal === "gain" ? 1.1 : 1;
  const lowerLimit = sex === "male" ? 1500 : 1200;
  const calories = Math.round(Math.max(maintenance * multiplier, lowerLimit) / 10) * 10;
  const protein = Math.round(weight * (goal === "lose" ? 1.6 : goal === "gain" ? 1.7 : 1.4));
  const fat = Math.round(calories * .27 / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  const bmi = weight / ((height / 100) ** 2);
  return { bmr: Math.round(bmr), maintenance: Math.round(maintenance), calories, protein, fat, carbs, bmi, floorApplied: maintenance * multiplier < lowerLimit };
}

function bmiText(bmi) {
  if (bmi < 18.5) return "偏低";
  if (bmi < 24) return "正常范围";
  if (bmi < 28) return "偏高";
  return "较高";
}

let previousMealNames = new Set();

function pick(pool) {
  const freshChoices = pool.filter(meal => !previousMealNames.has(meal.name));
  const choices = freshChoices.length ? freshChoices : pool;
  return choices[Math.floor(Math.random() * choices.length)];
}

function createMenu(target) {
  const selected = [pick(mealPools.breakfast), pick(mealPools.lunch), pick(mealPools.snack), pick(mealPools.dinner)];
  previousMealNames = new Set(selected.map(meal => meal.name));
  const baseTotal = selected.reduce((sum, meal) => sum + meal.kcal, 0);
  const scale = target / baseTotal;
  return selected.map(meal => ({
    ...meal,
    kcal: Math.round(meal.kcal * scale / 5) * 5,
    foods: meal.foods.map(([food, amount, unit]) => [food, unit === "个" ? Math.max(1, Math.round(amount * scale)) : Math.round(amount * scale / 5) * 5, unit])
  }));
}

const recipeModal = document.querySelector("#recipe-modal");
const recipeCloseButton = document.querySelector(".recipe-close");
let recipeReturnFocus = null;

function recipeInstructions(meal, mealType) {
  const names = meal.foods.map(([name]) => name);
  const main = names[0];
  const protein = names.find(name => /鸡|鱼|虾|牛|猪|鸭|蛋|豆腐|豆干|金枪鱼|蛤蜊/.test(name));
  const vegetables = names.filter(name => /菜|瓜|番茄|西兰花|芦笋|彩椒|蘑菇|菌菇|胡萝卜|黄瓜|茄子|笋|豆芽|芹菜|洋葱/.test(name)).join("、");
  const finish = "装盘后趁热食用；盐和酱料少量添加，并将实际使用的烹调油计入当天摄入。";

  if (mealType === "加餐") {
    if (/玉米|紫薯|红薯|鸡蛋|毛豆/.test(meal.name)) return { time: "10–20 分钟", steps: ["将需要加热的食材洗净；薯类保留外皮蒸制，鸡蛋或毛豆用清水煮熟。", "薯类蒸至筷子可轻松穿透，鸡蛋全熟后过凉水剥壳，毛豆沥干。", `按食谱份量搭配${names.join("、")}，坚果或海苔最后加入。`, "分装后即可食用；若提前准备，请冷藏并在当天吃完。"], tip: "加餐用于连接两顿正餐，不必额外叠加甜饮或糕点。" };
    return { time: "5 分钟", steps: ["水果洗净，需去皮或去核的食材处理成一口大小。", "酸奶或奶酪从冰箱取出回温片刻；坚果保持原味，不额外加糖。", `按食谱份量将${names.join("、")}装入碗或便携餐盒。`, "食用前再混合，口感更好；制作后尽快食用。"], tip: "选择无糖乳制品与原味坚果，可减少隐形糖和盐。" };
  }
  if (/粥/.test(meal.name)) return { time: "30–40 分钟", steps: [`将${main}淘洗后浸泡 15 分钟；其余食材洗净切成小块。`, `锅中加入约食材体积 6–8 倍的水，大火煮开后转小火，期间搅拌防止粘底。`, `煮约 20 分钟后加入${protein || "配菜"}${vegetables ? `和${vegetables}` : ""}，继续煮至软熟。`, "根据稠度补少量热水，确认肉类和蛋类完全熟透后关火。", finish], tip: "谷物提前浸泡能缩短煮制时间；不要用大量糖或咸菜调味。" };
  if (/面|意面/.test(meal.name)) return { time: "20–30 分钟", steps: [`将${protein || "主要食材"}切成适口大小，蔬菜洗净切好；肉类可用少量胡椒腌 5 分钟。`, `水沸后放入${main}，按包装时间煮至适口，捞出并保留半碗面汤。`, `另锅加入食谱中的油，先将${protein || "配菜"}炒至熟透，再加入${vegetables || "蔬菜"}翻炒。`, "加入面条和少量面汤翻拌 1–2 分钟，让汤汁均匀附着。", finish], tip: "面条煮好后无需过度冲洗；用番茄、菌菇和香辛料增加风味，可少放盐。" };
  if (/汤|煲|炖|咖喱/.test(meal.name)) return { time: "30–45 分钟", steps: [`将${protein || main}处理成 2–3 厘米小块，${vegetables || "蔬菜"}洗净切块。`, `锅中放入食谱所列的油，将${protein || main}快速翻炒至表面变色；豆腐和鱼肉可省略煸炒。`, "加入耐煮食材和适量热水，大火煮开后转小火，加盖焖煮 15–25 分钟。", "最后加入叶菜或易熟食材，再煮 3–5 分钟，确认中心完全熟透。", finish], tip: "汤汁以能浸没大部分食材为宜；喝汤也会摄入盐分，不建议额外勾芡。" };
  if (/沙拉|碗|盘/.test(meal.name)) return { time: "20–30 分钟", steps: [`将${protein || main}提前解冻并擦干，谷物或薯类按食谱份量煮熟。`, `平底锅用食谱中的油将${protein || main}煎至两面上色、中心熟透，静置 2 分钟后切块。`, `${vegetables || "蔬菜"}洗净沥干；需要熟食的蔬菜焯水或烤熟。`, "依次铺入主食、蔬菜和蛋白质食材，用少量醋、胡椒或柠檬汁拌匀。", finish], tip: "沙拉酱热量容易被忽略，优先用柠檬汁、醋和少量橄榄油调味。" };
  if (/三明治|吐司|卷|饼|贝果|饭团|华夫|松饼/.test(meal.name)) return { time: "15–25 分钟", steps: [`将${protein || main}和需要加热的配菜分别煮熟或煎熟，蔬菜洗净并充分沥水。`, "面包或饼皮用无油平底锅小火加热 1–2 分钟，使表面微脆。", `按食谱份量依次放入${names.join("、")}，尽量铺放均匀。`, "卷紧或合上后从中间切开；饭团类用湿手压紧成形。", finish], tip: "选择全麦、低糖主食；酱料薄薄一层即可，避免同时使用多种高脂酱。" };
  return { time: "25–35 分钟", steps: [`将${protein || main}切成均匀小块，${vegetables || "蔬菜"}洗净切好；主食提前煮熟。`, `肉类用少量胡椒腌 5–10 分钟；锅烧热后加入食谱所列的油，将${protein || main}炒至变色。`, `加入${vegetables || "配菜"}，按耐熟程度先后下锅，中火翻炒至断生。`, "加入少量水或低盐调味汁，翻炒均匀并确认所有蛋白质食材完全熟透。", `搭配${names.find(name => /饭|米|藜麦|薯|玉米/.test(name)) || "食谱中的主食"}装盘，${finish}`], tip: "肉类切成相近大小更容易均匀熟透；用葱姜蒜、黑胡椒等替代部分盐。" };
}

function openRecipe(meal, mealType, trigger) {
  const guide = recipeInstructions(meal, mealType);
  recipeReturnFocus = trigger;
  document.querySelector("#recipe-detail-icon").textContent = meal.icon;
  document.querySelector("#recipe-detail-meta").textContent = `${mealType} · 约 ${meal.kcal} kcal · ${guide.time}`;
  document.querySelector("#recipe-title").textContent = meal.name;
  document.querySelector("#recipe-ingredients").innerHTML = meal.foods.map(([name, amount, unit]) => `<li><span>${name}</span><b>${amount}${unit}</b></li>`).join("");
  document.querySelector("#recipe-steps").innerHTML = guide.steps.map(step => `<li>${step}</li>`).join("");
  document.querySelector("#recipe-tip").textContent = `小贴士：${guide.tip}`;
  recipeModal.classList.add("is-open");
  recipeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  recipeCloseButton.focus();
}

function closeRecipe() {
  recipeModal.classList.remove("is-open");
  recipeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (recipeReturnFocus) recipeReturnFocus.focus();
}

document.querySelectorAll("[data-close-recipe]").forEach(element => element.addEventListener("click", closeRecipe));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && recipeModal.classList.contains("is-open")) closeRecipe();
});

function render(profile) {
  const nutrition = calculate(profile);
  const menu = createMenu(nutrition.calories);
  const actual = menu.reduce((sum, meal) => sum + meal.kcal, 0);
  const labels = ["早餐", "午餐", "加餐", "晚餐"];
  const goalLabels = { lose: "温和减脂", maintain: "保持体重", gain: "稳步增重" };
  results.innerHTML = `
    <div class="result-head">
      <div><h2>今日食养方案</h2><p>${goalLabels[profile.goal]} · 预计维持热量 ${nutrition.maintenance} kcal · 菜谱库 ${Object.values(mealPools).reduce((sum, pool) => sum + pool.length, 0)} 道</p></div>
      <button class="refresh-btn" id="refresh-menu" type="button">换一组 ↻</button>
    </div>
    <div class="metrics">
      <div class="metric"><strong>${nutrition.calories}</strong><span>目标千卡 kcal</span></div>
      <div class="metric"><strong>${nutrition.protein}g</strong><span>蛋白质</span></div>
      <div class="metric"><strong>${nutrition.carbs}g</strong><span>碳水</span></div>
      <div class="metric"><strong>${nutrition.fat}g</strong><span>脂肪</span></div>
    </div>
    <p class="bmi-note">BMI ${nutrition.bmi.toFixed(1)} · ${bmiText(nutrition.bmi)}　|　基础代谢约 ${nutrition.bmr} kcal</p>
    <div class="meal-list">
      ${menu.map((meal, index) => `
        <article class="meal" data-meal-index="${index}" role="button" tabindex="0" aria-label="查看${meal.name}的详细做法">
          <div class="meal-icon">${meal.icon}</div>
          <div><h3>${labels[index]} · ${meal.name}</h3><p>${meal.foods.map(([f, a, u]) => `${f} ${a}${u}`).join(" ／ ")}</p><span class="meal-action">查看详细做法 →</span></div>
          <span class="meal-kcal">${meal.kcal} kcal</span>
        </article>`).join("")}
    </div>
    <div class="intake-bar"><p><span>食谱计划摄入</span><b>${actual} / ${nutrition.calories} kcal</b></p><div class="track"><span style="width:${Math.min(100, actual / nutrition.calories * 100)}%"></span></div></div>
    <p class="safety">${nutrition.floorApplied ? "已触发基础安全下限，未继续降低热量。" : "建议每日实际摄入保持在目标值上下约 10% 内。"} 食材重量为可食部估算值；烹调油、酱料和含糖饮料也需计入。连续 2–3 周观察体重与精神状态后再小幅调整。</p>`;
  document.querySelector("#refresh-menu").addEventListener("click", () => render(profile));
  document.querySelectorAll(".meal").forEach(card => {
    const open = () => openRecipe(menu[Number(card.dataset.mealIndex)], labels[Number(card.dataset.mealIndex)], card);
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
    });
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const profile = {
    height: Number(document.querySelector("#height").value),
    weight: Number(document.querySelector("#weight").value),
    age: Number(document.querySelector("#age").value),
    sex: document.querySelector("#sex").value,
    activity: Number(document.querySelector('input[name="activity"]:checked').value),
    goal: document.querySelector('input[name="goal"]:checked').value
  };
  const error = document.querySelector("#form-error");
  if (profile.height < 130 || profile.height > 220 || profile.weight < 35 || profile.weight > 250 || profile.age < 18 || profile.age > 80) {
    error.textContent = "请填写范围内的有效数据（仅适用于 18–80 岁成年人）。";
    return;
  }
  error.textContent = "";
  latestProfile = profile;
  saveProfileForCurrentUser(profile);
  render(profile);
  if (window.innerWidth < 900) results.scrollIntoView({ behavior: "smooth" });
});
