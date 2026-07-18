# 训练计划生成审计报告

生成时间：2026-07-18T05:05:12.871Z
随机 seed：deterministic-v1
动作数量：106
真实生成器：D:\Codex\Food\workout-engine.js

## Planner V2 常量

| 权重项 | 数值 |
| --- | --- |
| priority | 1 |
| legacyFit | 1 |
| movementCoverage | 22 |
| roleCoverage | 10 |
| variationPenalty | 14 |
| fatiguePenalty | 8 |
| weeklyVolumePenalty | 10 |
| familyPenalty | 35 |
| recoveryPenalty | 5 |

## Family 分类统计

| Family | 动作数 |
| --- | --- |
| anti_extension | 11 |
| cardio | 11 |
| squat | 10 |
| push_up | 8 |
| triceps_extension | 8 |
| vertical_pull | 6 |
| hinge | 6 |
| glute_bridge | 6 |
| bench_press | 5 |
| rear_delt | 5 |
| biceps_curl | 5 |
| horizontal_row | 4 |
| vertical_press | 4 |
| anti_lateral_flexion | 4 |
| lateral_raise | 3 |
| chest_fly | 2 |
| single_leg | 2 |
| anti_rotation | 2 |
| straight_arm_pulldown | 1 |
| hamstring_curl | 1 |
| calf_raise | 1 |
| carry | 1 |

## Priority Top 25

| 动作ID | 动作名称 | Family | Priority |
| --- | --- | --- | --- |
| barbell_bench | 杠铃卧推 | bench_press | 100 |
| pull_up | 引体向上 | vertical_pull | 100 |
| barbell_squat | 杠铃深蹲 | squat | 100 |
| db_bench | 哑铃卧推 | bench_press | 95 |
| incline_db_bench | 上斜哑铃卧推 | bench_press | 92 |
| machine_chest_press | 器械推胸 | bench_press | 90 |
| lat_pulldown | 高位下拉 | vertical_pull | 90 |
| incline_barbell_bench | 上斜杠铃卧推 | bench_press | 88 |
| assisted_pull_up_machine | 器械辅助引体向上 | vertical_pull | 88 |
| smith_squat | 史密斯深蹲 | squat | 88 |
| rdl | 罗马尼亚硬拉 | hinge | 88 |
| one_arm_db_row | 单臂哑铃划船 | horizontal_row | 86 |
| db_rdl | 哑铃罗马尼亚硬拉 | hinge | 86 |
| barbell_hip_thrust | 杠铃臀推 | glute_bridge | 86 |
| goblet_squat | 高脚杯深蹲 | squat | 85 |
| seated_row | 坐姿划船 | horizontal_row | 84 |
| band_assisted_pull_up | 弹力带辅助引体向上 | vertical_pull | 82 |
| chest_supported_row | 胸托划船 | horizontal_row | 82 |
| barbell_row | 杠铃划船 | horizontal_row | 80 |
| leg_press | 腿举 | squat | 80 |
| db_hip_thrust | 哑铃臀推 | glute_bridge | 78 |
| bulgarian_split_squat | 保加利亚分腿蹲 | squat | 76 |
| band_pulldown | 弹力带下拉 | vertical_pull | 75 |
| db_shoulder_press | 坐姿哑铃肩推 | vertical_press | 72 |
| machine_shoulder_press | 器械肩推 | vertical_press | 72 |

## Recovery Cost 分布

| RecoveryCost | 动作数 |
| --- | --- |
| 1 | 50 |
| 2 | 27 |
| 3 | 16 |
| 4 | 13 |

## Fatigue Tag 分布

| FatigueTag | 动作数 |
| --- | --- |
| triceps | 26 |
| glutes | 25 |
| core | 22 |
| front_delt | 22 |
| biceps | 21 |
| chest | 20 |
| quads | 20 |
| back | 18 |
| grip | 17 |
| rear_delt | 16 |
| shoulder | 12 |
| low_back | 7 |

## Recommended Weekly Sets

| 肌群 | 最低 | 最高 |
| --- | --- | --- |
| 胸 | 10 | 18 |
| 背 | 12 | 20 |
| 肩 | 8 | 16 |
| 手臂 | 6 | 14 |
| 腿 | 10 | 20 |
| 臀 | 8 | 18 |
| 核心 | 4 | 12 |

## 场景总览

| 场景 | 结果 | 生成错误 | 不变量错误 | 周总工作组 | 总预计分钟 |
| --- | --- | --- | --- | --- | --- |
| 纯自重初学者全身 3 天 | 通过 | - | - | 29 | 92 |
| 纯自重 + 椅子初学者全身 3 天 | 通过 | - | - | 31 | 96 |
| 家庭哑铃增肌 4 天 | 通过 | - | - | 64 | 181 |
| 完整健身房 PPL 增肌 3 天 | 通过 | - | - | 48 | 138 |
| 频率审计 2 天/周 | 通过 | - | - | 36 | 98 |
| 频率审计 3 天/周 | 通过 | - | - | 48 | 136 |
| 频率审计 4 天/周 | 通过 | - | - | 80 | 214 |
| 频率审计 5 天/周 | 通过 | - | - | 100 | 259 |
| 频率审计 6 天/周 | 通过 | - | - | 120 | 313 |
| 失败场景：只有跳绳却要求增肌 | 按预期失败 | 第 1 天 没有可用动作。; 第 3 天 没有可用动作。; 第 5 天 没有可用动作。 | - | - | - |

## 纯自重初学者全身 3 天

用户水平：beginner
训练目标：health
每周频率：3
单次时长：30 分钟
用户器械：bodyweight
生成错误：-
不变量错误：-
有效组摘要：直接 {"腿":8,"胸":9,"臀":3}；间接 {"臀":4,"手臂":3,"核心":3}；动作模式 {"弓步":2,"水平推":3,"抗伸展":2,"深蹲":1,"髋伸":1,"抗旋转":1}；难度 {"1-2":7,"2.5-3":3,"3.5-4":0,"4.5-5":0}
Planner 摘要：Family {"single_leg":2,"push_up":3,"anti_extension":2,"squat":1,"glute_bridge":1,"anti_rotation":1}；Fatigue {"quads":3,"glutes":4,"chest":3,"front_delt":3,"triceps":3,"core":5}；Recovery {"1":6,"2":4}

### 第 1 天 · 全身A · 33 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 110 | 3 | 3 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 8 | - |
| 2 | kneeling_push_up | 跪姿俯卧撑 | 水平推 | push_up | primary_compound | 65 | 1 | chest, front_delt, triceps | 109 | 2 | 3 | 8–15次 | reps | 是 | bodyweight | 6 | push_up, wall_push_up |
| 3 | dead_bug | 死虫 | 抗伸展 | anti_extension | core | 64 | 1 | core | 99 | 1 | 3 | 每侧 8–12次 | reps_per_side | 否 | bodyweight | 6 | plank, knee_plank |
| 4 | bodyweight_squat | 自重深蹲 | 深蹲 | squat | primary_compound | 60 | 2 | quads, glutes | 66 | 2 | 2 | 8–12次 | reps | 是 | bodyweight | 5 | - |

| 动作ID | 选择原因 |
| --- | --- |
| lunge | Priority +72; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 110 |
| kneeling_push_up | Priority +65; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 109 |
| dead_bug | Priority +64; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 99 |
| bodyweight_squat | Priority +60; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 66 |

### 第 3 天 · 全身B · 31 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | glute_bridge | 臀桥 | 髋伸 | glute_bridge | primary_compound | 64 | 1 | glutes | 108 | 1.5 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 2 | push_up | 俯卧撑 | 水平推 | push_up | primary_compound | 70 | 2 | chest, triceps, core, front_delt | 108 | 3 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | kneeling_push_up, wall_push_up |
| 3 | plank | 平板支撑 | 抗伸展 | anti_extension | core | 62 | 1 | core | 89 | 2 | 3 | 20–60秒 | duration | 否 | bodyweight | 5 | knee_plank, dead_bug |

| 动作ID | 选择原因 |
| --- | --- |
| glute_bridge | Priority +64; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 108 |
| push_up | Priority +70; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 108 |
| plank | Priority +62; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 89 |

### 第 5 天 · 全身C · 28 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 76 | 3 | 3 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 8 | - |
| 2 | wall_push_up | 墙壁俯卧撑 | 水平推 | push_up | primary_compound | 56 | 1 | chest, triceps, core, front_delt | 100 | 1 | 3 | 10–15次 | reps | 是 | bodyweight | 5 | kneeling_push_up, push_up |
| 3 | bird_dog | 鸟狗 | 抗旋转 | anti_rotation | core | 62 | 1 | core | 89 | 1 | 3 | 每侧 8–12次 | reps_per_side | 否 | bodyweight | 6 | - |

| 动作ID | 选择原因 |
| --- | --- |
| lunge | Priority +72; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -14; final 76 |
| wall_push_up | Priority +56; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 100 |
| bird_dog | Priority +62; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 89 |

## 纯自重 + 椅子初学者全身 3 天

用户水平：beginner
训练目标：health
每周频率：3
单次时长：30 分钟
用户器械：bodyweight, chair
生成错误：-
不变量错误：-
有效组摘要：直接 {"腿":10,"胸":9,"臀":3}；间接 {"臀":5,"手臂":3,"核心":3}；动作模式 {"弓步":2,"水平推":3,"抗伸展":2,"深蹲":2,"髋伸":1,"抗旋转":1}；难度 {"1-2":8,"2.5-3":3,"3.5-4":0,"4.5-5":0}
Planner 摘要：Family {"single_leg":2,"push_up":3,"anti_extension":2,"squat":2,"glute_bridge":1,"anti_rotation":1}；Fatigue {"quads":4,"glutes":5,"chest":3,"front_delt":3,"triceps":3,"core":5}；Recovery {"1":6,"2":5}

### 第 1 天 · 全身A · 33 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 110 | 3 | 3 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 8 | - |
| 2 | kneeling_push_up | 跪姿俯卧撑 | 水平推 | push_up | primary_compound | 65 | 1 | chest, front_delt, triceps | 109 | 2 | 3 | 8–15次 | reps | 是 | bodyweight | 6 | push_up, wall_push_up |
| 3 | dead_bug | 死虫 | 抗伸展 | anti_extension | core | 64 | 1 | core | 99 | 1 | 3 | 每侧 8–12次 | reps_per_side | 否 | bodyweight | 6 | plank, knee_plank, incline_plank |
| 4 | bodyweight_squat | 自重深蹲 | 深蹲 | squat | primary_compound | 60 | 2 | quads, glutes | 66 | 2 | 2 | 8–12次 | reps | 是 | bodyweight | 5 | chair_sit_to_stand |

| 动作ID | 选择原因 |
| --- | --- |
| lunge | Priority +72; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 110 |
| kneeling_push_up | Priority +65; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 109 |
| dead_bug | Priority +64; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 99 |
| bodyweight_squat | Priority +60; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 66 |

### 第 3 天 · 全身B · 35 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | glute_bridge | 臀桥 | 髋伸 | glute_bridge | primary_compound | 64 | 1 | glutes | 108 | 1.5 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 2 | push_up | 俯卧撑 | 水平推 | push_up | primary_compound | 70 | 2 | chest, triceps, core, front_delt | 108 | 3 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | kneeling_push_up, wall_push_up |
| 3 | plank | 平板支撑 | 抗伸展 | anti_extension | core | 62 | 1 | core | 89 | 2 | 3 | 20–60秒 | duration | 否 | bodyweight | 5 | knee_plank, incline_plank, dead_bug |
| 4 | chair_sit_to_stand | 椅子坐站 | 深蹲 | squat | primary_compound | 52 | 2 | quads, glutes | 63 | 1 | 2 | 8–12次 | reps | 是 | chair | 4 | bodyweight_squat |

| 动作ID | 选择原因 |
| --- | --- |
| glute_bridge | Priority +64; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 108 |
| push_up | Priority +70; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 108 |
| plank | Priority +62; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 89 |
| chair_sit_to_stand | Priority +52; coverage +10; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 63 |

### 第 5 天 · 全身C · 28 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 76 | 3 | 3 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 8 | - |
| 2 | wall_push_up | 墙壁俯卧撑 | 水平推 | push_up | primary_compound | 56 | 1 | chest, triceps, core, front_delt | 100 | 1 | 3 | 10–15次 | reps | 是 | bodyweight | 5 | kneeling_push_up, push_up |
| 3 | bird_dog | 鸟狗 | 抗旋转 | anti_rotation | core | 62 | 1 | core | 89 | 1 | 3 | 每侧 8–12次 | reps_per_side | 否 | bodyweight | 6 | - |

| 动作ID | 选择原因 |
| --- | --- |
| lunge | Priority +72; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -14; final 76 |
| wall_push_up | Priority +56; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 100 |
| bird_dog | Priority +62; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 89 |

## 家庭哑铃增肌 4 天

用户水平：intermediate
训练目标：muscleGain
每周频率：4
单次时长：45 分钟
用户器械：bodyweight, adjustable_dumbbells, adjustable_bench, resistance_band, band_anchor
生成错误：-
不变量错误：-
有效组摘要：直接 {"胸":16,"背":8,"肩":8,"腿":24,"臀":12,"核心":4}；间接 {"手臂":2,"核心":2,"臀":8}；动作模式 {"水平推":4,"水平拉":2,"垂直推":2,"深蹲":2,"髋铰链":2,"弓步":2,"髋屈":1,"髋伸":1}；难度 {"1-2":3,"2.5-3":12,"3.5-4":1,"4.5-5":0}
Planner 摘要：Family {"bench_press":2,"horizontal_row":2,"vertical_press":2,"push_up":2,"squat":2,"hinge":2,"single_leg":2,"anti_extension":1,"glute_bridge":1}；Fatigue {"chest":4,"front_delt":6,"triceps":6,"back":2,"rear_delt":2,"biceps":2,"grip":2,"shoulder":2,"core":2,"quads":6,"glutes":7,"low_back":2}；Recovery {"1":2,"2":7,"3":4,"4":3}

### 第 1 天 · 上肢A · 47 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | incline_db_bench | 上斜哑铃卧推 | 水平推 | bench_press | primary_compound | 92 | 4 | chest, front_delt, triceps | 126 | 2.5 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+adjustable_bench | 9 | push_up, kneeling_push_up, wall_push_up |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | horizontal_row | primary_compound | 86 | 2 | back, rear_delt, biceps, grip | 136 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | - |
| 3 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | vertical_press | primary_compound | 72 | 3 | shoulder, front_delt, triceps | 102 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | db_shoulder_press |
| 4 | push_up | 俯卧撑 | 水平推 | push_up | primary_compound | 70 | 2 | chest, triceps, core, front_delt | 67 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | kneeling_push_up, wall_push_up, incline_db_bench |

| 动作ID | 选择原因 |
| --- | --- |
| incline_db_bench | Priority +92; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 126 |
| one_arm_db_row | Priority +86; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 136 |
| standing_db_shoulder_press | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 102 |
| push_up | Priority +70; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 67 |

### 第 2 天 · 下肢A · 45 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | squat | primary_compound | 85 | 3 | quads, glutes | 132 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat |
| 2 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 86 | 3 | quads, glutes, low_back | 117 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_single_leg_hinge |
| 3 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 102 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | - |
| 4 | lying_leg_raise | 仰卧抬腿 | 髋屈 | anti_extension | core | 56 | 1 | core | 86 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 7 | - |

| 动作ID | 选择原因 |
| --- | --- |
| goblet_squat | Priority +85; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 132 |
| db_rdl | Priority +86; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 117 |
| lunge | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 102 |
| lying_leg_raise | Priority +56; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 86 |

### 第 4 天 · 上肢B · 45 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | kneeling_push_up | 跪姿俯卧撑 | 水平推 | push_up | primary_compound | 65 | 1 | chest, front_delt, triceps | 101 | 2 | 4 | 8–15次 | reps | 是 | bodyweight | 8 | push_up, wall_push_up, incline_db_bench |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | horizontal_row | primary_compound | 86 | 2 | back, rear_delt, biceps, grip | 102 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | - |
| 3 | db_shoulder_press | 坐姿哑铃肩推 | 垂直推 | vertical_press | primary_compound | 72 | 2 | shoulder, front_delt, triceps | 96 | 2 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+adjustable_bench | 9 | standing_db_shoulder_press |
| 4 | incline_db_bench | 上斜哑铃卧推 | 水平推 | bench_press | primary_compound | 92 | 4 | chest, front_delt, triceps | 46 | 2.5 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+adjustable_bench | 9 | push_up, kneeling_push_up, wall_push_up |

| 动作ID | 选择原因 |
| --- | --- |
| kneeling_push_up | Priority +65; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 101 |
| one_arm_db_row | Priority +86; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -14; final 102 |
| db_shoulder_press | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 96 |
| incline_db_bench | Priority +92; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -5; variation -14; final 46 |

### 第 6 天 · 下肢B · 44 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | squat | primary_compound | 85 | 3 | quads, glutes | 98 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat |
| 2 | weighted_glute_bridge | 负重臀桥 | 髋伸 | glute_bridge | primary_compound | 70 | 2 | glutes | 102 | 2 | 4 | 10–15次 | reps | 是 | adjustable_dumbbells | 8 | glute_bridge |
| 3 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 68 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | - |
| 4 | bodyweight_single_leg_hinge | 徒手单腿髋铰链 | 髋铰链 | hinge | primary_compound | 72 | 4 | quads, glutes, low_back | 67 | 3.5 | 4 | 每侧 8–10次 | reps_per_side | 是 | bodyweight | 9 | db_rdl |

| 动作ID | 选择原因 |
| --- | --- |
| goblet_squat | Priority +85; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -14; final 98 |
| weighted_glute_bridge | Priority +70; coverage +32; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 102 |
| lunge | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -14; final 68 |
| bodyweight_single_leg_hinge | Priority +72; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -5; variation -0; final 67 |

## 完整健身房 PPL 增肌 3 天

用户水平：intermediate
训练目标：muscleGain
每周频率：3
单次时长：45 分钟
用户器械：bodyweight, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, machine_chest_press, machine_shoulder_press, adjustable_dumbbells, fixed_dumbbells, parallel_bars, smith_machine, leg_extension_machine, leg_curl_machine
生成错误：-
不变量错误：-
有效组摘要：直接 {"胸":8,"肩":8,"手臂":8,"背":8,"腿":12,"臀":8}；间接 {"胸":2,"手臂":2,"核心":2,"臀":4}；动作模式 {"水平推":3,"垂直推":1,"垂直拉":1,"水平拉":2,"肘屈":1,"深蹲":1,"髋伸":1,"弓步":1,"髋铰链":1}；难度 {"1-2":3,"2.5-3":5,"3.5-4":4,"4.5-5":0}
Planner 摘要：Family {"bench_press":1,"vertical_press":1,"triceps_extension":1,"push_up":1,"vertical_pull":1,"horizontal_row":1,"rear_delt":1,"biceps_curl":1,"squat":1,"glute_bridge":1,"single_leg":1,"hinge":1}；Fatigue {"chest":3,"front_delt":4,"triceps":4,"shoulder":2,"core":1,"back":2,"rear_delt":3,"biceps":4,"grip":3,"quads":3,"glutes":4,"low_back":1}；Recovery {"1":3,"2":3,"3":4,"4":2}

### 第 1 天 · 推 · 47 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_bench | 杠铃卧推 | 水平推 | bench_press | primary_compound | 100 | 4 | chest, front_delt, triceps | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | db_bench, machine_chest_press, incline_db_bench |
| 2 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | vertical_press | primary_compound | 72 | 3 | shoulder, front_delt, triceps | 102 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 3 | dip | 双杠臂屈伸 | 水平推 | triceps_extension | primary_compound | 72 | 1 | triceps, chest, front_delt | 85 | 4 | 4 | 8–12次 | reps | 是 | parallel_bars | 9 | close_grip_bench, close_push_up |
| 4 | push_up | 俯卧撑 | 水平推 | push_up | primary_compound | 70 | 2 | chest, triceps, core, front_delt | 68 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, kneeling_push_up, high_incline_push_up |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_bench | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| standing_db_shoulder_press | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 102 |
| dip | Priority +72; coverage +32; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 85 |
| push_up | Priority +70; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 68 |

### 第 3 天 · 拉 · 44 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | vertical_pull | primary_compound | 90 | 3 | back, rear_delt, biceps, grip | 131 | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | horizontal_row | primary_compound | 86 | 2 | back, rear_delt, biceps, grip | 104 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | chest_supported_row, barbell_row, seated_row |
| 3 | reverse_fly | 反向飞鸟 | 水平拉 | rear_delt | accessory | 62 | 1 | shoulder, rear_delt, biceps, grip | 43 | 2 | 4 | 12–20次 | reps | 是 | adjustable_dumbbells | 7 | face_pull |
| 4 | barbell_curl | 杠铃弯举 | 肘屈 | biceps_curl | isolation | 58 | 1 | biceps | 78 | 2 | 4 | 8–12次 | reps | 是 | barbell | 8 | cable_curl, db_curl, hammer_curl |

| 动作ID | 选择原因 |
| --- | --- |
| lat_pulldown | Priority +90; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 131 |
| one_arm_db_row | Priority +86; coverage +32; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -0; final 104 |
| reverse_fly | Priority +62; coverage +0; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 43 |
| barbell_curl | Priority +58; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 78 |

### 第 5 天 · 腿 · 47 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_squat | 杠铃深蹲 | 深蹲 | squat | primary_compound | 100 | 4 | quads, glutes | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+squat_rack | 9 | smith_squat, goblet_squat, bodyweight_squat |
| 2 | barbell_hip_thrust | 杠铃臀推 | 髋伸 | glute_bridge | primary_compound | 86 | 3 | glutes | 121 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench | 9 | db_hip_thrust, weighted_glute_bridge, cable_kickback |
| 3 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 103 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | step_up, bulgarian_split_squat |
| 4 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 86 | 3 | quads, glutes, low_back | 95 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_squat | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| barbell_hip_thrust | Priority +86; coverage +32; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 121 |
| lunge | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 103 |
| db_rdl | Priority +86; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 95 |

## 频率审计 2 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：2
单次时长：45 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"腿":12,"胸":8,"背":8,"臀":4}；间接 {"臀":4}；动作模式 {"深蹲":2,"水平推":2,"抗旋转":1,"水平拉":1,"髋铰链":2,"抗侧屈":1,"垂直拉":1}；难度 {"1-2":2,"2.5-3":5,"3.5-4":3,"4.5-5":0}
Planner 摘要：Family {"squat":2,"bench_press":2,"anti_rotation":1,"horizontal_row":1,"hinge":2,"anti_lateral_flexion":1,"vertical_pull":1}；Fatigue {"quads":4,"glutes":4,"chest":2,"front_delt":2,"triceps":2,"core":2,"back":2,"rear_delt":2,"biceps":2,"grip":2,"low_back":2}；Recovery {"1":2,"2":1,"3":4,"4":3}

### 第 1 天 · 全身A · 49 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_squat | 杠铃深蹲 | 深蹲 | squat | primary_compound | 100 | 4 | quads, glutes | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+squat_rack | 9 | goblet_squat, bodyweight_squat |
| 2 | barbell_bench | 杠铃卧推 | 水平推 | bench_press | primary_compound | 100 | 4 | chest, front_delt, triceps | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | db_bench, machine_chest_press, incline_db_bench |
| 3 | pallof_press | 帕洛夫抗旋转推 | 抗旋转 | anti_rotation | core | 66 | 1 | core | 97 | 2 | 4 | 每侧 8–12次 | reps_per_side | 否 | cable_machine | 9 | bird_dog |
| 4 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | horizontal_row | primary_compound | 86 | 2 | back, rear_delt, biceps, grip | 136 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | chest_supported_row, barbell_row, seated_row |
| 5 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 86 | 3 | quads, glutes, low_back | 95 | 3 | 2 | 8–12次 | reps | 是 | adjustable_dumbbells | 5 | rdl, bodyweight_single_leg_hinge |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_squat | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| barbell_bench | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| pallof_press | Priority +66; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 97 |
| one_arm_db_row | Priority +86; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 136 |
| db_rdl | Priority +86; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 95 |

### 第 4 天 · 全身B · 49 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | squat | primary_compound | 85 | 3 | quads, glutes | 132 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat, barbell_squat, box_squat |
| 2 | db_bench | 哑铃卧推 | 水平推 | bench_press | primary_compound | 95 | 3 | chest, front_delt, triceps | 135 | 2.5 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+bench | 9 | barbell_bench, machine_chest_press, incline_db_bench |
| 3 | side_plank | 侧平板支撑 | 抗侧屈 | anti_lateral_flexion | core | 56 | 1 | core | 90 | 3 | 4 | 每侧 15–45秒 | duration_per_side | 否 | bodyweight | 9 | knee_side_plank |
| 4 | lat_pulldown | 高位下拉 | 垂直拉 | vertical_pull | primary_compound | 90 | 3 | back, rear_delt, biceps, grip | 131 | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 5 | rdl | 罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 88 | 4 | quads, glutes, low_back | 88 | 4 | 2 | 8–12次 | reps | 是 | barbell | 5 | bodyweight_single_leg_hinge, db_rdl |

| 动作ID | 选择原因 |
| --- | --- |
| goblet_squat | Priority +85; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 132 |
| db_bench | Priority +95; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 135 |
| side_plank | Priority +56; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 90 |
| lat_pulldown | Priority +90; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 131 |
| rdl | Priority +88; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -5; variation -0; final 88 |

## 频率审计 3 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：3
单次时长：45 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"胸":8,"肩":12,"背":8,"手臂":4,"腿":12,"臀":8}；间接 {"手臂":2,"核心":2,"臀":4}；动作模式 {"水平推":2,"垂直推":1,"肩外展":1,"垂直拉":1,"水平拉":2,"肘屈":1,"深蹲":1,"髋伸":1,"弓步":1,"髋铰链":1}；难度 {"1-2":3,"2.5-3":6,"3.5-4":3,"4.5-5":0}
Planner 摘要：Family {"bench_press":1,"vertical_press":1,"lateral_raise":1,"push_up":1,"vertical_pull":1,"horizontal_row":1,"rear_delt":1,"biceps_curl":1,"squat":1,"glute_bridge":1,"single_leg":1,"hinge":1}；Fatigue {"chest":2,"front_delt":3,"triceps":3,"shoulder":3,"core":1,"back":2,"rear_delt":3,"biceps":4,"grip":3,"quads":3,"glutes":4,"low_back":1}；Recovery {"1":3,"2":3,"3":4,"4":2}

### 第 1 天 · 推 · 45 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_bench | 杠铃卧推 | 水平推 | bench_press | primary_compound | 100 | 4 | chest, front_delt, triceps | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | db_bench, machine_chest_press, incline_db_bench |
| 2 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | vertical_press | primary_compound | 72 | 3 | shoulder, front_delt, triceps | 102 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 3 | cable_lateral_raise | 绳索侧平举 | 肩外展 | lateral_raise | isolation | 68 | 1 | shoulder | 95 | 3 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | lateral_raise |
| 4 | push_up | 俯卧撑 | 水平推 | push_up | primary_compound | 70 | 2 | chest, triceps, core, front_delt | 68 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, kneeling_push_up, high_incline_push_up |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_bench | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| standing_db_shoulder_press | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 102 |
| cable_lateral_raise | Priority +68; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 95 |
| push_up | Priority +70; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 68 |

### 第 3 天 · 拉 · 44 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | vertical_pull | primary_compound | 90 | 3 | back, rear_delt, biceps, grip | 131 | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | horizontal_row | primary_compound | 86 | 2 | back, rear_delt, biceps, grip | 104 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | chest_supported_row, barbell_row, seated_row |
| 3 | reverse_fly | 反向飞鸟 | 水平拉 | rear_delt | accessory | 62 | 1 | shoulder, rear_delt, biceps, grip | 43 | 2 | 4 | 12–20次 | reps | 是 | adjustable_dumbbells | 7 | face_pull |
| 4 | barbell_curl | 杠铃弯举 | 肘屈 | biceps_curl | isolation | 58 | 1 | biceps | 78 | 2 | 4 | 8–12次 | reps | 是 | barbell | 8 | cable_curl, db_curl, hammer_curl |

| 动作ID | 选择原因 |
| --- | --- |
| lat_pulldown | Priority +90; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 131 |
| one_arm_db_row | Priority +86; coverage +32; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -0; final 104 |
| reverse_fly | Priority +62; coverage +0; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 43 |
| barbell_curl | Priority +58; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 78 |

### 第 5 天 · 腿 · 47 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_squat | 杠铃深蹲 | 深蹲 | squat | primary_compound | 100 | 4 | quads, glutes | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+squat_rack | 9 | goblet_squat, bodyweight_squat |
| 2 | barbell_hip_thrust | 杠铃臀推 | 髋伸 | glute_bridge | primary_compound | 86 | 3 | glutes | 121 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench | 9 | db_hip_thrust, weighted_glute_bridge, cable_kickback |
| 3 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 103 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | step_up, bulgarian_split_squat |
| 4 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 86 | 3 | quads, glutes, low_back | 95 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_squat | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| barbell_hip_thrust | Priority +86; coverage +32; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 121 |
| lunge | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 103 |
| db_rdl | Priority +86; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 95 |

## 频率审计 4 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：4
单次时长：60 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"胸":16,"背":12,"肩":12,"腿":24,"臀":16,"核心":4}；间接 {"手臂":2,"核心":2,"臀":8}；动作模式 {"水平推":4,"水平拉":2,"垂直推":1,"肩外展":2,"深蹲":2,"髋伸":2,"弓步":2,"髋屈":1,"髋铰链":2,"垂直拉":1,"抗侧屈":1}；难度 {"1-2":6,"2.5-3":10,"3.5-4":4,"4.5-5":0}
Planner 摘要：Family {"bench_press":2,"horizontal_row":2,"vertical_press":1,"lateral_raise":2,"push_up":2,"squat":2,"glute_bridge":2,"single_leg":2,"anti_extension":1,"hinge":2,"vertical_pull":1,"anti_lateral_flexion":1}；Fatigue {"chest":4,"front_delt":5,"triceps":5,"back":3,"rear_delt":3,"biceps":3,"grip":3,"shoulder":3,"core":3,"quads":6,"glutes":8,"low_back":2}；Recovery {"1":5,"2":6,"3":6,"4":3}

### 第 1 天 · 上肢A · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_bench | 杠铃卧推 | 水平推 | bench_press | primary_compound | 100 | 4 | chest, front_delt, triceps | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | db_bench, machine_chest_press, incline_db_bench |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | horizontal_row | primary_compound | 86 | 2 | back, rear_delt, biceps, grip | 136 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | chest_supported_row, barbell_row, seated_row |
| 3 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | vertical_press | primary_compound | 72 | 3 | shoulder, front_delt, triceps | 102 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 4 | cable_lateral_raise | 绳索侧平举 | 肩外展 | lateral_raise | isolation | 68 | 1 | shoulder | 73 | 3 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | lateral_raise |
| 5 | push_up | 俯卧撑 | 水平推 | push_up | primary_compound | 70 | 2 | chest, triceps, core, front_delt | 68 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, kneeling_push_up, high_incline_push_up |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_bench | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| one_arm_db_row | Priority +86; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 136 |
| standing_db_shoulder_press | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 102 |
| cable_lateral_raise | Priority +68; coverage +0; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 73 |
| push_up | Priority +70; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 68 |

### 第 2 天 · 下肢A · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_squat | 杠铃深蹲 | 深蹲 | squat | primary_compound | 100 | 4 | quads, glutes | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+squat_rack | 9 | goblet_squat, bodyweight_squat |
| 2 | barbell_hip_thrust | 杠铃臀推 | 髋伸 | glute_bridge | primary_compound | 86 | 3 | glutes | 121 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench | 9 | db_hip_thrust, weighted_glute_bridge, cable_kickback |
| 3 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 103 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | step_up, bulgarian_split_squat |
| 4 | lying_leg_raise | 仰卧抬腿 | 髋屈 | anti_extension | core | 56 | 1 | core | 87 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 5 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 86 | 3 | quads, glutes, low_back | 95 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_squat | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| barbell_hip_thrust | Priority +86; coverage +32; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 121 |
| lunge | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 103 |
| lying_leg_raise | Priority +56; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 87 |
| db_rdl | Priority +86; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 95 |

### 第 4 天 · 上肢B · 52 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | db_bench | 哑铃卧推 | 水平推 | bench_press | primary_compound | 95 | 3 | chest, front_delt, triceps | 135 | 2.5 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+bench | 9 | barbell_bench, machine_chest_press, incline_db_bench |
| 2 | seated_row | 坐姿划船 | 水平拉 | horizontal_row | primary_compound | 84 | 2 | back, rear_delt, biceps, grip | 125 | 2 | 4 | 8–12次 | reps | 是 | cable_machine | 9 | chest_supported_row, one_arm_db_row, barbell_row |
| 3 | lat_pulldown | 高位下拉 | 垂直拉 | vertical_pull | primary_compound | 90 | 3 | back, rear_delt, biceps, grip | 99 | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 4 | lateral_raise | 哑铃侧平举 | 肩外展 | lateral_raise | isolation | 66 | 1 | shoulder | 71 | 2 | 4 | 12–20次 | reps | 是 | adjustable_dumbbells | 7 | cable_lateral_raise |
| 5 | kneeling_push_up | 跪姿俯卧撑 | 水平推 | push_up | primary_compound | 65 | 1 | chest, front_delt, triceps | 56 | 2 | 4 | 8–15次 | reps | 是 | bodyweight | 8 | push_up, low_incline_push_up, high_incline_push_up |

| 动作ID | 选择原因 |
| --- | --- |
| db_bench | Priority +95; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 135 |
| seated_row | Priority +84; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 125 |
| lat_pulldown | Priority +90; coverage +32; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -0; final 99 |
| lateral_raise | Priority +66; coverage +0; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 71 |
| kneeling_push_up | Priority +65; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 56 |

### 第 6 天 · 下肢B · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | squat | primary_compound | 85 | 3 | quads, glutes | 132 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat, barbell_squat, box_squat |
| 2 | db_hip_thrust | 哑铃臀推 | 髋伸 | glute_bridge | primary_compound | 78 | 2 | glutes | 117 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+bench | 9 | barbell_hip_thrust, weighted_glute_bridge, glute_bridge |
| 3 | step_up | 台阶踏步 | 弓步 | single_leg | primary_compound | 68 | 2 | quads, glutes | 95 | 2 | 4 | 每侧 8–12次 | reps_per_side | 是 | bench | 11 | lunge, bulgarian_split_squat |
| 4 | knee_side_plank | 屈膝侧平板 | 抗侧屈 | anti_lateral_flexion | core | 56 | 1 | core | 80 | 1 | 4 | 每侧 15–30秒 | duration_per_side | 否 | bodyweight | 8 | side_plank |
| 5 | rdl | 罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 88 | 4 | quads, glutes, low_back | 88 | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | bodyweight_single_leg_hinge, db_rdl |

| 动作ID | 选择原因 |
| --- | --- |
| goblet_squat | Priority +85; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 132 |
| db_hip_thrust | Priority +78; coverage +32; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 117 |
| step_up | Priority +68; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 95 |
| knee_side_plank | Priority +56; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 80 |
| rdl | Priority +88; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -5; variation -0; final 88 |

## 频率审计 5 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：5
单次时长：60 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"胸":16,"肩":24,"手臂":16,"背":24,"腿":12,"臀":8,"核心":4}；间接 {"手臂":2,"核心":2,"臀":4,"背":2}；动作模式 {"水平推":4,"垂直推":2,"肩外展":2,"肘伸":2,"垂直拉":4,"水平拉":4,"肘屈":2,"深蹲":1,"髋伸":1,"弓步":1,"髋屈":1,"髋铰链":1}；难度 {"1-2":10,"2.5-3":11,"3.5-4":4,"4.5-5":0}
Planner 摘要：Family {"bench_press":2,"vertical_press":2,"lateral_raise":2,"triceps_extension":2,"push_up":2,"vertical_pull":2,"horizontal_row":2,"rear_delt":2,"biceps_curl":2,"straight_arm_pulldown":2,"squat":1,"glute_bridge":1,"single_leg":1,"anti_extension":1,"hinge":1}；Fatigue {"chest":4,"front_delt":6,"triceps":8,"shoulder":6,"core":2,"back":7,"rear_delt":8,"biceps":10,"grip":8,"quads":3,"glutes":4,"low_back":1}；Recovery {"1":10,"2":6,"3":7,"4":2}

### 第 1 天 · 推 · 52 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_bench | 杠铃卧推 | 水平推 | bench_press | primary_compound | 100 | 4 | chest, front_delt, triceps | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | db_bench, machine_chest_press, incline_db_bench |
| 2 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | vertical_press | primary_compound | 72 | 3 | shoulder, front_delt, triceps | 102 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 3 | cable_lateral_raise | 绳索侧平举 | 肩外展 | lateral_raise | isolation | 68 | 1 | shoulder | 95 | 3 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | lateral_raise |
| 4 | overhead_extension | 过头臂屈伸 | 肘伸 | triceps_extension | isolation | 52 | 1 | triceps | 79 | 3 | 4 | 10–15次 | reps | 是 | adjustable_dumbbells | 7 | triceps_pushdown, straight_bar_pushdown |
| 5 | push_up | 俯卧撑 | 水平推 | push_up | primary_compound | 70 | 2 | chest, triceps, core, front_delt | 68 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, kneeling_push_up, high_incline_push_up |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_bench | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| standing_db_shoulder_press | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 102 |
| cable_lateral_raise | Priority +68; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 95 |
| overhead_extension | Priority +52; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 79 |
| push_up | Priority +70; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 68 |

### 第 2 天 · 拉 · 52 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | vertical_pull | primary_compound | 90 | 3 | back, rear_delt, biceps, grip | 131 | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | horizontal_row | primary_compound | 86 | 2 | back, rear_delt, biceps, grip | 104 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | chest_supported_row, barbell_row, seated_row |
| 3 | reverse_fly | 反向飞鸟 | 水平拉 | rear_delt | accessory | 62 | 1 | shoulder, rear_delt, biceps, grip | 43 | 2 | 4 | 12–20次 | reps | 是 | adjustable_dumbbells | 7 | face_pull |
| 4 | barbell_curl | 杠铃弯举 | 肘屈 | biceps_curl | isolation | 58 | 1 | biceps | 78 | 2 | 4 | 8–12次 | reps | 是 | barbell | 8 | cable_curl, db_curl, hammer_curl |
| 5 | straight_arm_pulldown | 直臂下压 | 垂直拉 | straight_arm_pulldown | isolation | 40 | 2 | back, rear_delt, biceps, grip | 21 | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | lat_pulldown |

| 动作ID | 选择原因 |
| --- | --- |
| lat_pulldown | Priority +90; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 131 |
| one_arm_db_row | Priority +86; coverage +32; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -0; final 104 |
| reverse_fly | Priority +62; coverage +0; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 43 |
| barbell_curl | Priority +58; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 78 |
| straight_arm_pulldown | Priority +40; coverage +0; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -0; final 21 |

### 第 3 天 · 腿 · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_squat | 杠铃深蹲 | 深蹲 | squat | primary_compound | 100 | 4 | quads, glutes | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+squat_rack | 9 | goblet_squat, bodyweight_squat |
| 2 | barbell_hip_thrust | 杠铃臀推 | 髋伸 | glute_bridge | primary_compound | 86 | 3 | glutes | 121 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench | 9 | db_hip_thrust, weighted_glute_bridge, cable_kickback |
| 3 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 103 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | step_up, bulgarian_split_squat |
| 4 | lying_leg_raise | 仰卧抬腿 | 髋屈 | anti_extension | core | 56 | 1 | core | 87 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 5 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 86 | 3 | quads, glutes, low_back | 95 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_squat | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| barbell_hip_thrust | Priority +86; coverage +32; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 121 |
| lunge | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 103 |
| lying_leg_raise | Priority +56; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 87 |
| db_rdl | Priority +86; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 95 |

### 第 5 天 · 推 · 50 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | db_bench | 哑铃卧推 | 水平推 | bench_press | primary_compound | 95 | 3 | chest, front_delt, triceps | 135 | 2.5 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+bench | 9 | barbell_bench, machine_chest_press, incline_db_bench |
| 2 | barbell_press | 杠铃推举 | 垂直推 | vertical_press | primary_compound | 72 | 3 | shoulder, front_delt, triceps | 99 | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | standing_db_shoulder_press, db_shoulder_press, machine_shoulder_press |
| 3 | lateral_raise | 哑铃侧平举 | 肩外展 | lateral_raise | isolation | 66 | 1 | shoulder | 85 | 2 | 4 | 12–20次 | reps | 是 | adjustable_dumbbells | 7 | cable_lateral_raise |
| 4 | triceps_pushdown | 绳索下压 | 肘伸 | triceps_extension | isolation | 58 | 1 | triceps | 78 | 2 | 4 | 10–15次 | reps | 是 | cable_machine | 7 | overhead_extension, straight_bar_pushdown |
| 5 | kneeling_push_up | 跪姿俯卧撑 | 水平推 | push_up | primary_compound | 65 | 1 | chest, front_delt, triceps | 56 | 2 | 4 | 8–15次 | reps | 是 | bodyweight | 8 | push_up, low_incline_push_up, high_incline_push_up |

| 动作ID | 选择原因 |
| --- | --- |
| db_bench | Priority +95; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 135 |
| barbell_press | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 99 |
| lateral_raise | Priority +66; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 85 |
| triceps_pushdown | Priority +58; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 78 |
| kneeling_push_up | Priority +65; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 56 |

### 第 6 天 · 拉 · 51 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | vertical_pull | primary_compound | 90 | 3 | back, rear_delt, biceps, grip | 97 | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | seated_row | 坐姿划船 | 水平拉 | horizontal_row | primary_compound | 84 | 2 | back, rear_delt, biceps, grip | 93 | 2 | 4 | 8–12次 | reps | 是 | cable_machine | 9 | chest_supported_row, one_arm_db_row, barbell_row |
| 3 | face_pull | 面拉 | 水平拉 | rear_delt | accessory | 68 | 1 | shoulder, back, rear_delt, biceps, grip | -38 | 2 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | reverse_fly |
| 4 | cable_curl | 绳索弯举 | 肘屈 | biceps_curl | isolation | 56 | 1 | biceps | 56 | 2 | 4 | 10–15次 | reps | 是 | cable_machine | 7 | barbell_curl, db_curl, hammer_curl |
| 5 | straight_arm_pulldown | 直臂下压 | 垂直拉 | straight_arm_pulldown | isolation | 40 | 2 | back, rear_delt, biceps, grip | -13 | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | lat_pulldown |

| 动作ID | 选择原因 |
| --- | --- |
| lat_pulldown | Priority +90; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -14; final 97 |
| seated_row | Priority +84; coverage +32; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -0; final 93 |
| face_pull | Priority +68; coverage +0; family -0; fatigue -32; weeklyVolume -80; recovery -0; variation -0; final -38 |
| cable_curl | Priority +56; coverage +22; family -0; fatigue -8; weeklyVolume -20; recovery -0; variation -0; final 56 |
| straight_arm_pulldown | Priority +40; coverage +0; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -14; final -13 |

## 频率审计 6 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：6
单次时长：60 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"胸":16,"肩":24,"手臂":16,"背":24,"腿":24,"臀":16,"核心":4}；间接 {"手臂":2,"核心":2,"臀":8,"背":2}；动作模式 {"水平推":4,"垂直推":2,"肩外展":2,"肘伸":2,"垂直拉":4,"水平拉":4,"肘屈":2,"深蹲":2,"髋伸":2,"弓步":2,"髋屈":1,"髋铰链":2,"抗侧屈":1}；难度 {"1-2":12,"2.5-3":13,"3.5-4":5,"4.5-5":0}
Planner 摘要：Family {"bench_press":2,"vertical_press":2,"lateral_raise":2,"triceps_extension":2,"push_up":2,"vertical_pull":2,"horizontal_row":2,"rear_delt":2,"biceps_curl":2,"straight_arm_pulldown":2,"squat":2,"glute_bridge":2,"single_leg":2,"anti_extension":1,"hinge":2,"anti_lateral_flexion":1}；Fatigue {"chest":4,"front_delt":6,"triceps":8,"shoulder":6,"core":3,"back":7,"rear_delt":8,"biceps":10,"grip":8,"quads":6,"glutes":8,"low_back":2}；Recovery {"1":11,"2":8,"3":8,"4":3}

### 第 1 天 · 推 · 52 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_bench | 杠铃卧推 | 水平推 | bench_press | primary_compound | 100 | 4 | chest, front_delt, triceps | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | db_bench, machine_chest_press, incline_db_bench |
| 2 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | vertical_press | primary_compound | 72 | 3 | shoulder, front_delt, triceps | 102 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 3 | cable_lateral_raise | 绳索侧平举 | 肩外展 | lateral_raise | isolation | 68 | 1 | shoulder | 95 | 3 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | lateral_raise |
| 4 | overhead_extension | 过头臂屈伸 | 肘伸 | triceps_extension | isolation | 52 | 1 | triceps | 79 | 3 | 4 | 10–15次 | reps | 是 | adjustable_dumbbells | 7 | triceps_pushdown, straight_bar_pushdown |
| 5 | push_up | 俯卧撑 | 水平推 | push_up | primary_compound | 70 | 2 | chest, triceps, core, front_delt | 68 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, kneeling_push_up, high_incline_push_up |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_bench | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| standing_db_shoulder_press | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 102 |
| cable_lateral_raise | Priority +68; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 95 |
| overhead_extension | Priority +52; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 79 |
| push_up | Priority +70; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 68 |

### 第 2 天 · 拉 · 52 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | vertical_pull | primary_compound | 90 | 3 | back, rear_delt, biceps, grip | 131 | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | horizontal_row | primary_compound | 86 | 2 | back, rear_delt, biceps, grip | 104 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | chest_supported_row, barbell_row, seated_row |
| 3 | reverse_fly | 反向飞鸟 | 水平拉 | rear_delt | accessory | 62 | 1 | shoulder, rear_delt, biceps, grip | 43 | 2 | 4 | 12–20次 | reps | 是 | adjustable_dumbbells | 7 | face_pull |
| 4 | barbell_curl | 杠铃弯举 | 肘屈 | biceps_curl | isolation | 58 | 1 | biceps | 78 | 2 | 4 | 8–12次 | reps | 是 | barbell | 8 | cable_curl, db_curl, hammer_curl |
| 5 | straight_arm_pulldown | 直臂下压 | 垂直拉 | straight_arm_pulldown | isolation | 40 | 2 | back, rear_delt, biceps, grip | 21 | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | lat_pulldown |

| 动作ID | 选择原因 |
| --- | --- |
| lat_pulldown | Priority +90; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 131 |
| one_arm_db_row | Priority +86; coverage +32; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -0; final 104 |
| reverse_fly | Priority +62; coverage +0; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 43 |
| barbell_curl | Priority +58; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 78 |
| straight_arm_pulldown | Priority +40; coverage +0; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -0; final 21 |

### 第 3 天 · 腿 · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_squat | 杠铃深蹲 | 深蹲 | squat | primary_compound | 100 | 4 | quads, glutes | 138 | 4 | 4 | 8–12次 | reps | 是 | barbell+squat_rack | 9 | goblet_squat, bodyweight_squat |
| 2 | barbell_hip_thrust | 杠铃臀推 | 髋伸 | glute_bridge | primary_compound | 86 | 3 | glutes | 121 | 4 | 4 | 8–12次 | reps | 是 | barbell+bench | 9 | db_hip_thrust, weighted_glute_bridge, cable_kickback |
| 3 | lunge | 箭步蹲 | 弓步 | single_leg | primary_compound | 72 | 2 | quads, glutes | 103 | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | step_up, bulgarian_split_squat |
| 4 | lying_leg_raise | 仰卧抬腿 | 髋屈 | anti_extension | core | 56 | 1 | core | 87 | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 5 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 86 | 3 | quads, glutes, low_back | 95 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |

| 动作ID | 选择原因 |
| --- | --- |
| barbell_squat | Priority +100; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -5; variation -0; final 138 |
| barbell_hip_thrust | Priority +86; coverage +32; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 121 |
| lunge | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 103 |
| lying_leg_raise | Priority +56; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 87 |
| db_rdl | Priority +86; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 95 |

### 第 4 天 · 推 · 50 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | db_bench | 哑铃卧推 | 水平推 | bench_press | primary_compound | 95 | 3 | chest, front_delt, triceps | 135 | 2.5 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+bench | 9 | barbell_bench, machine_chest_press, incline_db_bench |
| 2 | barbell_press | 杠铃推举 | 垂直推 | vertical_press | primary_compound | 72 | 3 | shoulder, front_delt, triceps | 99 | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | standing_db_shoulder_press, db_shoulder_press, machine_shoulder_press |
| 3 | lateral_raise | 哑铃侧平举 | 肩外展 | lateral_raise | isolation | 66 | 1 | shoulder | 85 | 2 | 4 | 12–20次 | reps | 是 | adjustable_dumbbells | 7 | cable_lateral_raise |
| 4 | triceps_pushdown | 绳索下压 | 肘伸 | triceps_extension | isolation | 58 | 1 | triceps | 78 | 2 | 4 | 10–15次 | reps | 是 | cable_machine | 7 | overhead_extension, straight_bar_pushdown |
| 5 | kneeling_push_up | 跪姿俯卧撑 | 水平推 | push_up | primary_compound | 65 | 1 | chest, front_delt, triceps | 56 | 2 | 4 | 8–15次 | reps | 是 | bodyweight | 8 | push_up, low_incline_push_up, high_incline_push_up |

| 动作ID | 选择原因 |
| --- | --- |
| db_bench | Priority +95; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 135 |
| barbell_press | Priority +72; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 99 |
| lateral_raise | Priority +66; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 85 |
| triceps_pushdown | Priority +58; coverage +22; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 78 |
| kneeling_push_up | Priority +65; coverage +10; family -0; fatigue -24; weeklyVolume -0; recovery -0; variation -0; final 56 |

### 第 5 天 · 拉 · 51 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | vertical_pull | primary_compound | 90 | 3 | back, rear_delt, biceps, grip | 97 | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | seated_row | 坐姿划船 | 水平拉 | horizontal_row | primary_compound | 84 | 2 | back, rear_delt, biceps, grip | 93 | 2 | 4 | 8–12次 | reps | 是 | cable_machine | 9 | chest_supported_row, one_arm_db_row, barbell_row |
| 3 | face_pull | 面拉 | 水平拉 | rear_delt | accessory | 68 | 1 | shoulder, back, rear_delt, biceps, grip | -38 | 2 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | reverse_fly |
| 4 | cable_curl | 绳索弯举 | 肘屈 | biceps_curl | isolation | 56 | 1 | biceps | 56 | 2 | 4 | 10–15次 | reps | 是 | cable_machine | 7 | barbell_curl, db_curl, hammer_curl |
| 5 | straight_arm_pulldown | 直臂下压 | 垂直拉 | straight_arm_pulldown | isolation | 40 | 2 | back, rear_delt, biceps, grip | -13 | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | lat_pulldown |

| 动作ID | 选择原因 |
| --- | --- |
| lat_pulldown | Priority +90; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -14; final 97 |
| seated_row | Priority +84; coverage +32; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -0; final 93 |
| face_pull | Priority +68; coverage +0; family -0; fatigue -32; weeklyVolume -80; recovery -0; variation -0; final -38 |
| cable_curl | Priority +56; coverage +22; family -0; fatigue -8; weeklyVolume -20; recovery -0; variation -0; final 56 |
| straight_arm_pulldown | Priority +40; coverage +0; family -0; fatigue -32; weeklyVolume -0; recovery -0; variation -14; final -13 |

### 第 6 天 · 腿 · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | Family | 角色 | Priority | Recovery | Fatigue | Score | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | squat | primary_compound | 85 | 3 | quads, glutes | 132 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat, barbell_squat, box_squat |
| 2 | db_hip_thrust | 哑铃臀推 | 髋伸 | glute_bridge | primary_compound | 78 | 2 | glutes | 117 | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+bench | 9 | barbell_hip_thrust, weighted_glute_bridge, glute_bridge |
| 3 | step_up | 台阶踏步 | 弓步 | single_leg | primary_compound | 68 | 2 | quads, glutes | 95 | 2 | 4 | 每侧 8–12次 | reps_per_side | 是 | bench | 11 | lunge, bulgarian_split_squat |
| 4 | knee_side_plank | 屈膝侧平板 | 抗侧屈 | anti_lateral_flexion | core | 56 | 1 | core | 80 | 1 | 4 | 每侧 15–30秒 | duration_per_side | 否 | bodyweight | 8 | side_plank |
| 5 | rdl | 罗马尼亚硬拉 | 髋铰链 | hinge | primary_compound | 88 | 4 | quads, glutes, low_back | 88 | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | bodyweight_single_leg_hinge, db_rdl |

| 动作ID | 选择原因 |
| --- | --- |
| goblet_squat | Priority +85; coverage +32; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 132 |
| db_hip_thrust | Priority +78; coverage +32; family -0; fatigue -8; weeklyVolume -0; recovery -0; variation -0; final 117 |
| step_up | Priority +68; coverage +32; family -0; fatigue -16; weeklyVolume -0; recovery -0; variation -0; final 95 |
| knee_side_plank | Priority +56; coverage +22; family -0; fatigue -0; weeklyVolume -0; recovery -0; variation -0; final 80 |
| rdl | Priority +88; coverage +10; family -0; fatigue -16; weeklyVolume -0; recovery -5; variation -0; final 88 |

## 失败场景：只有跳绳却要求增肌

用户水平：intermediate
训练目标：muscleGain
每周频率：3
单次时长：45 分钟
用户器械：jump_rope
生成错误：第 1 天 没有可用动作。; 第 3 天 没有可用动作。; 第 5 天 没有可用动作。
不变量错误：-
有效组摘要：-
Planner 摘要：-

## 当前已知限制

- 当前生成器是确定性排序，没有真正的随机 seed；报告记录固定 seed 作为审计标识。
- 间接有效组采用简单 0.5 权重估算，只用于防止明显过量，不代表完整运动科学模型。
- 中文历史编码污染仍存在于旧源码字符串中；本报告和新增测试优先使用稳定动作 ID / equipment ID。
