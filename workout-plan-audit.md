# 训练计划生成审计报告

生成时间：2026-07-18T03:56:18.410Z
随机 seed：deterministic-v1
动作数量：106
真实生成器：D:\Codex\Food\workout-engine.js

## 场景总览

| 场景 | 结果 | 生成错误 | 不变量错误 | 周总工作组 | 总预计分钟 |
| --- | --- | --- | --- | --- | --- |
| 纯自重初学者全身 3 天 | 通过 | - | - | 29 | 92 |
| 纯自重 + 椅子初学者全身 3 天 | 通过 | - | - | 29 | 91 |
| 家庭哑铃增肌 4 天 | 通过 | - | - | 64 | 181 |
| 完整健身房 PPL 增肌 3 天 | 通过 | - | - | 44 | 129 |
| 频率审计 2 天/周 | 通过 | - | - | 36 | 99 |
| 频率审计 3 天/周 | 通过 | - | - | 44 | 129 |
| 频率审计 4 天/周 | 通过 | - | - | 80 | 217 |
| 频率审计 5 天/周 | 通过 | - | - | 100 | 262 |
| 频率审计 6 天/周 | 通过 | - | - | 120 | 316 |
| 失败场景：只有跳绳却要求增肌 | 按预期失败 | 第 1 天 没有可用动作。; 第 3 天 没有可用动作。; 第 5 天 没有可用动作。 | - | - | - |

## 纯自重初学者全身 3 天

用户水平：beginner
训练目标：health
每周频率：3
单次时长：30 分钟
用户器械：bodyweight
生成错误：-
不变量错误：-
有效组摘要：直接 {"腿":8,"胸":9,"臀":3}；间接 {"臀":4,"手臂":3,"核心":3}；动作模式 {"深蹲":2,"水平推":3,"抗伸展":2,"髋伸":1,"弓步":1,"抗旋转":1}；难度 {"1-2":8,"2.5-3":2,"3.5-4":0,"4.5-5":0}

### 第 1 天 · 全身A · 30 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | bodyweight_squat | 自重深蹲 | 深蹲 | primary_compound | 2 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 2 | kneeling_push_up | 跪姿俯卧撑 | 水平推 | primary_compound | 2 | 3 | 8–15次 | reps | 是 | bodyweight | 6 | wall_push_up, push_up |
| 3 | plank | 平板支撑 | 抗伸展 | core | 2 | 3 | 20–60秒 | duration | 否 | bodyweight | 5 | knee_plank, dead_bug |

### 第 3 天 · 全身B · 28 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | glute_bridge | 臀桥 | 髋伸 | primary_compound | 1.5 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 2 | wall_push_up | 墙壁俯卧撑 | 水平推 | primary_compound | 1 | 3 | 10–15次 | reps | 是 | bodyweight | 5 | kneeling_push_up |
| 3 | dead_bug | 死虫 | 抗伸展 | core | 1 | 3 | 每侧 8–12次 | reps_per_side | 否 | bodyweight | 6 | plank, knee_plank |

### 第 5 天 · 全身C · 34 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 3 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 8 | - |
| 2 | push_up | 俯卧撑 | 水平推 | primary_compound | 3 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | kneeling_push_up |
| 3 | bird_dog | 鸟狗 | 抗旋转 | core | 1 | 3 | 每侧 8–12次 | reps_per_side | 否 | bodyweight | 6 | - |
| 4 | bodyweight_squat | 自重深蹲 | 深蹲 | primary_compound | 2 | 2 | 8–12次 | reps | 是 | bodyweight | 5 | - |

## 纯自重 + 椅子初学者全身 3 天

用户水平：beginner
训练目标：health
每周频率：3
单次时长：30 分钟
用户器械：bodyweight, chair
生成错误：-
不变量错误：-
有效组摘要：直接 {"腿":8,"胸":9,"臀":3}；间接 {"臀":4,"手臂":3,"核心":3}；动作模式 {"深蹲":2,"水平推":3,"抗伸展":2,"髋伸":1,"抗旋转":1,"弓步":1}；难度 {"1-2":8,"2.5-3":2,"3.5-4":0,"4.5-5":0}

### 第 1 天 · 全身A · 30 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | bodyweight_squat | 自重深蹲 | 深蹲 | primary_compound | 2 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | chair_sit_to_stand |
| 2 | kneeling_push_up | 跪姿俯卧撑 | 水平推 | primary_compound | 2 | 3 | 8–15次 | reps | 是 | bodyweight | 6 | wall_push_up, push_up |
| 3 | plank | 平板支撑 | 抗伸展 | core | 2 | 3 | 20–60秒 | duration | 否 | bodyweight | 5 | knee_plank, incline_plank, dead_bug |

### 第 3 天 · 全身B · 28 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | glute_bridge | 臀桥 | 髋伸 | primary_compound | 1.5 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 2 | wall_push_up | 墙壁俯卧撑 | 水平推 | primary_compound | 1 | 3 | 10–15次 | reps | 是 | bodyweight | 5 | kneeling_push_up |
| 3 | dead_bug | 死虫 | 抗伸展 | core | 1 | 3 | 每侧 8–12次 | reps_per_side | 否 | bodyweight | 6 | plank, knee_plank, incline_plank |

### 第 5 天 · 全身C · 33 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | chair_sit_to_stand | 椅子坐站 | 深蹲 | primary_compound | 1 | 3 | 8–12次 | reps | 是 | chair | 6 | bodyweight_squat |
| 2 | push_up | 俯卧撑 | 水平推 | primary_compound | 3 | 3 | 8–12次 | reps | 是 | bodyweight | 7 | kneeling_push_up |
| 3 | bird_dog | 鸟狗 | 抗旋转 | core | 1 | 3 | 每侧 8–12次 | reps_per_side | 否 | bodyweight | 6 | - |
| 4 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 2 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 6 | - |

## 家庭哑铃增肌 4 天

用户水平：intermediate
训练目标：muscleGain
每周频率：4
单次时长：45 分钟
用户器械：bodyweight, adjustable_dumbbells, adjustable_bench, resistance_band, band_anchor
生成错误：-
不变量错误：-
有效组摘要：直接 {"胸":12,"背":8,"肩":8,"腿":24,"臀":12,"手臂":4,"小腿":4}；间接 {"手臂":2,"核心":2,"臀":8,"胸":2}；动作模式 {"水平推":4,"水平拉":2,"垂直推":2,"深蹲":2,"髋铰链":2,"弓步":2,"髋伸":1,"踝伸":1}；难度 {"1-2":5,"2.5-3":9,"3.5-4":2,"4.5-5":0}

### 第 1 天 · 上肢A · 47 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | push_up | 俯卧撑 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | incline_db_bench, kneeling_push_up |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | - |
| 3 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | db_shoulder_press |
| 4 | incline_db_bench | 上斜哑铃卧推 | 水平推 | primary_compound | 2.5 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+adjustable_bench | 9 | push_up, kneeling_push_up |

### 第 2 天 · 下肢A · 45 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat |
| 2 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_single_leg_hinge |
| 3 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | - |
| 4 | bodyweight_single_leg_hinge | 徒手单腿髋铰链 | 髋铰链 | primary_compound | 3.5 | 4 | 每侧 8–10次 | reps_per_side | 是 | bodyweight | 9 | db_rdl |

### 第 4 天 · 上肢B · 45 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | close_push_up | 窄距俯卧撑 | 水平推 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | - |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | - |
| 3 | db_shoulder_press | 坐姿哑铃肩推 | 垂直推 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+adjustable_bench | 9 | standing_db_shoulder_press |
| 4 | kneeling_push_up | 跪姿俯卧撑 | 水平推 | primary_compound | 2 | 4 | 8–15次 | reps | 是 | bodyweight | 8 | push_up, incline_db_bench, wall_push_up |

### 第 6 天 · 下肢B · 44 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | bodyweight_squat | 自重深蹲 | 深蹲 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | goblet_squat |
| 2 | weighted_glute_bridge | 负重臀桥 | 髋伸 | primary_compound | 2 | 4 | 10–15次 | reps | 是 | adjustable_dumbbells | 8 | glute_bridge |
| 3 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | - |
| 4 | calf_raise | 提踵 | 踝伸 | accessory | 2 | 4 | 12–20次 | reps | 是 | bodyweight | 7 | - |

## 完整健身房 PPL 增肌 3 天

用户水平：intermediate
训练目标：muscleGain
每周频率：3
单次时长：45 分钟
用户器械：bodyweight, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, machine_chest_press, machine_shoulder_press, adjustable_dumbbells, fixed_dumbbells, parallel_bars, smith_machine, leg_extension_machine, leg_curl_machine
生成错误：-
不变量错误：-
有效组摘要：直接 {"手臂":8,"肩":8,"胸":4,"背":8,"腿":16,"臀":4}；间接 {"胸":2,"手臂":2,"核心":2,"背":2,"臀":6}；动作模式 {"水平推":2,"垂直推":1,"垂直拉":1,"水平拉":2,"肘屈":1,"深蹲":1,"髋铰链":1,"弓步":2}；难度 {"1-2":3,"2.5-3":7,"3.5-4":1,"4.5-5":0}

### 第 1 天 · 推 · 38 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | close_grip_bench | 窄握卧推 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | close_push_up, dip |
| 2 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 3 | push_up | 俯卧撑 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, barbell_bench, db_bench |

### 第 3 天 · 拉 · 44 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | barbell_row, chest_supported_row, seated_row |
| 3 | face_pull | 面拉 | 水平拉 | accessory | 2 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | reverse_fly |
| 4 | barbell_curl | 杠铃弯举 | 肘屈 | isolation | 2 | 4 | 8–12次 | reps | 是 | barbell | 8 | cable_curl, db_curl, hammer_curl |

### 第 5 天 · 腿 · 47 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat, smith_squat, barbell_squat |
| 2 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |
| 3 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | bulgarian_split_squat, step_up |
| 4 | bulgarian_split_squat | 保加利亚分腿蹲 | 弓步 | primary_compound | 4 | 4 | 每侧 8–10次 | reps_per_side | 是 | bench | 11 | lunge |

## 频率审计 2 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：2
单次时长：45 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"腿":12,"手臂":4,"背":8,"臀":4,"肩":4}；间接 {"臀":4,"胸":2}；动作模式 {"深蹲":1,"水平推":1,"负重行走":1,"水平拉":2,"弓步":2,"髋铰链":1,"垂直推":1,"抗侧屈":1}；难度 {"1-2":0,"2.5-3":8,"3.5-4":2,"4.5-5":0}

### 第 1 天 · 全身A · 50 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat, barbell_squat |
| 2 | close_grip_bench | 窄握卧推 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | close_push_up |
| 3 | farmer_carry | 农夫行走 | 负重行走 | loaded_carry | 3 | 4 | 20–40米 | distance | 否 | adjustable_dumbbells | 8 | - |
| 4 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | barbell_row, chest_supported_row, seated_row |
| 5 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 2 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 6 | bulgarian_split_squat, step_up |

### 第 4 天 · 全身B · 49 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |
| 2 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 3 | side_plank | 侧平板支撑 | 抗侧屈 | core | 3 | 4 | 每侧 15–45秒 | duration_per_side | 否 | bodyweight | 9 | - |
| 4 | barbell_row | 杠铃划船 | 水平拉 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | one_arm_db_row |
| 5 | bulgarian_split_squat | 保加利亚分腿蹲 | 弓步 | primary_compound | 4 | 2 | 每侧 8–10次 | reps_per_side | 是 | bench | 6 | lunge |

## 频率审计 3 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：3
单次时长：45 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"手臂":8,"肩":8,"胸":4,"背":8,"腿":16,"臀":4}；间接 {"胸":2,"手臂":2,"核心":2,"背":2,"臀":6}；动作模式 {"水平推":2,"垂直推":1,"垂直拉":1,"水平拉":2,"肘屈":1,"深蹲":1,"髋铰链":1,"弓步":2}；难度 {"1-2":3,"2.5-3":7,"3.5-4":1,"4.5-5":0}

### 第 1 天 · 推 · 38 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | close_grip_bench | 窄握卧推 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | close_push_up |
| 2 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 3 | push_up | 俯卧撑 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, barbell_bench, db_bench |

### 第 3 天 · 拉 · 44 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | barbell_row, chest_supported_row, seated_row |
| 3 | face_pull | 面拉 | 水平拉 | accessory | 2 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | reverse_fly |
| 4 | barbell_curl | 杠铃弯举 | 肘屈 | isolation | 2 | 4 | 8–12次 | reps | 是 | barbell | 8 | cable_curl, db_curl, hammer_curl |

### 第 5 天 · 腿 · 47 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat, barbell_squat |
| 2 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |
| 3 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | bulgarian_split_squat, step_up |
| 4 | bulgarian_split_squat | 保加利亚分腿蹲 | 弓步 | primary_compound | 4 | 4 | 每侧 8–10次 | reps_per_side | 是 | bench | 11 | lunge |

## 频率审计 4 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：4
单次时长：60 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"手臂":4,"背":12,"肩":8,"胸":16,"腿":28,"臀":12,"核心":4,"小腿":4}；间接 {"胸":2,"手臂":2,"核心":2,"臀":10}；动作模式 {"水平推":3,"水平拉":2,"垂直推":2,"夹胸":2,"深蹲":2,"髋铰链":2,"弓步":3,"髋屈":1,"垂直拉":1,"髋伸":1,"踝伸":1}；难度 {"1-2":2,"2.5-3":12,"3.5-4":6,"4.5-5":0}

### 第 1 天 · 上肢A · 55 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | close_grip_bench | 窄握卧推 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | close_push_up |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | barbell_row, chest_supported_row, seated_row |
| 3 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 4 | cable_fly | 绳索夹胸 | 夹胸 | isolation | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | db_fly |
| 5 | push_up | 俯卧撑 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, barbell_bench, db_bench |

### 第 2 天 · 下肢A · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat, barbell_squat |
| 2 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |
| 3 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | bulgarian_split_squat, step_up |
| 4 | lying_leg_raise | 仰卧抬腿 | 髋屈 | core | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 5 | bulgarian_split_squat | 保加利亚分腿蹲 | 弓步 | primary_compound | 4 | 4 | 每侧 8–10次 | reps_per_side | 是 | bench | 11 | lunge |

### 第 4 天 · 上肢B · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_bench | 杠铃卧推 | 水平推 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | push_up |
| 2 | barbell_row | 杠铃划船 | 水平拉 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | one_arm_db_row |
| 3 | barbell_press | 杠铃推举 | 垂直推 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | standing_db_shoulder_press |
| 4 | straight_arm_pulldown | 直臂下压 | 垂直拉 | isolation | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | lat_pulldown |
| 5 | db_fly | 哑铃飞鸟 | 夹胸 | isolation | 3 | 4 | 10–15次 | reps | 是 | adjustable_dumbbells+bench | 8 | cable_fly |

### 第 6 天 · 下肢B · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_squat | 杠铃深蹲 | 深蹲 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell+squat_rack | 9 | goblet_squat |
| 2 | db_hip_thrust | 哑铃臀推 | 髋伸 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+bench | 9 | barbell_hip_thrust, weighted_glute_bridge, cable_kickback |
| 3 | step_up | 台阶踏步 | 弓步 | primary_compound | 2 | 4 | 每侧 8–12次 | reps_per_side | 是 | bench | 11 | lunge |
| 4 | calf_raise | 提踵 | 踝伸 | accessory | 2 | 4 | 12–20次 | reps | 是 | bodyweight | 7 | - |
| 5 | rdl | 罗马尼亚硬拉 | 髋铰链 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | bodyweight_single_leg_hinge, db_rdl |

## 频率审计 5 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：5
单次时长：60 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"手臂":20,"肩":20,"胸":16,"背":24,"腿":16,"臀":4,"核心":4}；间接 {"胸":2,"手臂":2,"核心":2,"背":2,"臀":6}；动作模式 {"水平推":3,"垂直推":2,"夹胸":2,"肘伸":2,"垂直拉":3,"水平拉":5,"肘屈":2,"深蹲":1,"髋铰链":1,"弓步":2,"髋屈":1,"肩外展":1}；难度 {"1-2":8,"2.5-3":13,"3.5-4":4,"4.5-5":0}

### 第 1 天 · 推 · 53 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | close_grip_bench | 窄握卧推 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | close_push_up |
| 2 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 3 | cable_fly | 绳索夹胸 | 夹胸 | isolation | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | db_fly |
| 4 | overhead_extension | 过头臂屈伸 | 肘伸 | isolation | 3 | 4 | 10–15次 | reps | 是 | adjustable_dumbbells | 7 | triceps_pushdown, straight_bar_pushdown |
| 5 | push_up | 俯卧撑 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, barbell_bench, db_bench |

### 第 2 天 · 拉 · 52 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | barbell_row, chest_supported_row, seated_row |
| 3 | face_pull | 面拉 | 水平拉 | accessory | 2 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | reverse_fly |
| 4 | barbell_curl | 杠铃弯举 | 肘屈 | isolation | 2 | 4 | 8–12次 | reps | 是 | barbell | 8 | cable_curl, db_curl, hammer_curl |
| 5 | straight_arm_pulldown | 直臂下压 | 垂直拉 | isolation | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | lat_pulldown |

### 第 3 天 · 腿 · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat, barbell_squat |
| 2 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |
| 3 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | bulgarian_split_squat, step_up |
| 4 | lying_leg_raise | 仰卧抬腿 | 髋屈 | core | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 5 | bulgarian_split_squat | 保加利亚分腿蹲 | 弓步 | primary_compound | 4 | 4 | 每侧 8–10次 | reps_per_side | 是 | bench | 11 | lunge |

### 第 5 天 · 推 · 51 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_bench | 杠铃卧推 | 水平推 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | push_up |
| 2 | barbell_press | 杠铃推举 | 垂直推 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | standing_db_shoulder_press |
| 3 | cable_lateral_raise | 绳索侧平举 | 肩外展 | isolation | 3 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | lateral_raise |
| 4 | triceps_pushdown | 绳索下压 | 肘伸 | isolation | 2 | 4 | 10–15次 | reps | 是 | cable_machine | 7 | overhead_extension, straight_bar_pushdown |
| 5 | db_fly | 哑铃飞鸟 | 夹胸 | isolation | 3 | 4 | 10–15次 | reps | 是 | adjustable_dumbbells+bench | 8 | cable_fly |

### 第 6 天 · 拉 · 52 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | barbell_row | 杠铃划船 | 水平拉 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | one_arm_db_row |
| 3 | reverse_fly | 反向飞鸟 | 水平拉 | accessory | 2 | 4 | 12–20次 | reps | 是 | adjustable_dumbbells | 7 | face_pull |
| 4 | cable_curl | 绳索弯举 | 肘屈 | isolation | 2 | 4 | 10–15次 | reps | 是 | cable_machine | 7 | barbell_curl, db_curl, hammer_curl |
| 5 | seated_row | 坐姿划船 | 水平拉 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | cable_machine | 9 | chest_supported_row, one_arm_db_row |

## 频率审计 6 天/周

用户水平：intermediate
训练目标：muscleGain
每周频率：6
单次时长：60 分钟
用户器械：bodyweight, adjustable_dumbbells, fixed_dumbbells, barbell, squat_rack, bench, adjustable_bench, cable_machine, lat_pulldown_machine, leg_press, leg_extension_machine, leg_curl_machine, machine_chest_press, machine_shoulder_press
生成错误：-
不变量错误：-
有效组摘要：直接 {"手臂":20,"肩":20,"胸":16,"背":24,"腿":28,"臀":12,"核心":4,"小腿":4}；间接 {"胸":2,"手臂":2,"核心":2,"背":2,"臀":10}；动作模式 {"水平推":3,"垂直推":2,"夹胸":2,"肘伸":2,"垂直拉":3,"水平拉":5,"肘屈":2,"深蹲":2,"髋铰链":2,"弓步":3,"髋屈":1,"肩外展":1,"髋伸":1,"踝伸":1}；难度 {"1-2":10,"2.5-3":14,"3.5-4":6,"4.5-5":0}

### 第 1 天 · 推 · 53 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | close_grip_bench | 窄握卧推 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | close_push_up |
| 2 | standing_db_shoulder_press | 站姿哑铃肩推 | 垂直推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | barbell_press, db_shoulder_press, machine_shoulder_press |
| 3 | cable_fly | 绳索夹胸 | 夹胸 | isolation | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | db_fly |
| 4 | overhead_extension | 过头臂屈伸 | 肘伸 | isolation | 3 | 4 | 10–15次 | reps | 是 | adjustable_dumbbells | 7 | triceps_pushdown, straight_bar_pushdown |
| 5 | push_up | 俯卧撑 | 水平推 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 9 | low_incline_push_up, barbell_bench, db_bench |

### 第 2 天 · 拉 · 52 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | one_arm_db_row | 单臂哑铃划船 | 水平拉 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | adjustable_dumbbells | 11 | barbell_row, chest_supported_row, seated_row |
| 3 | face_pull | 面拉 | 水平拉 | accessory | 2 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | reverse_fly |
| 4 | barbell_curl | 杠铃弯举 | 肘屈 | isolation | 2 | 4 | 8–12次 | reps | 是 | barbell | 8 | cable_curl, db_curl, hammer_curl |
| 5 | straight_arm_pulldown | 直臂下压 | 垂直拉 | isolation | 3 | 4 | 10–15次 | reps | 是 | cable_machine | 8 | lat_pulldown |

### 第 3 天 · 腿 · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | goblet_squat | 高脚杯深蹲 | 深蹲 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | bodyweight_squat, barbell_squat |
| 2 | db_rdl | 哑铃罗马尼亚硬拉 | 髋铰链 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells | 9 | rdl, bodyweight_single_leg_hinge |
| 3 | lunge | 箭步蹲 | 弓步 | primary_compound | 3 | 4 | 每侧 8–12次 | reps_per_side | 是 | bodyweight | 11 | bulgarian_split_squat, step_up |
| 4 | lying_leg_raise | 仰卧抬腿 | 髋屈 | core | 3 | 4 | 8–12次 | reps | 是 | bodyweight | 7 | - |
| 5 | bulgarian_split_squat | 保加利亚分腿蹲 | 弓步 | primary_compound | 4 | 4 | 每侧 8–10次 | reps_per_side | 是 | bench | 11 | lunge |

### 第 4 天 · 推 · 51 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_bench | 杠铃卧推 | 水平推 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell+bench+squat_rack | 9 | push_up |
| 2 | barbell_press | 杠铃推举 | 垂直推 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | standing_db_shoulder_press |
| 3 | cable_lateral_raise | 绳索侧平举 | 肩外展 | isolation | 3 | 4 | 12–20次 | reps | 是 | cable_machine | 7 | lateral_raise |
| 4 | triceps_pushdown | 绳索下压 | 肘伸 | isolation | 2 | 4 | 10–15次 | reps | 是 | cable_machine | 7 | overhead_extension, straight_bar_pushdown |
| 5 | db_fly | 哑铃飞鸟 | 夹胸 | isolation | 3 | 4 | 10–15次 | reps | 是 | adjustable_dumbbells+bench | 8 | cable_fly |

### 第 5 天 · 拉 · 52 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | lat_pulldown | 高位下拉 | 垂直拉 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | lat_pulldown_machine | 9 | straight_arm_pulldown |
| 2 | barbell_row | 杠铃划船 | 水平拉 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | one_arm_db_row |
| 3 | reverse_fly | 反向飞鸟 | 水平拉 | accessory | 2 | 4 | 12–20次 | reps | 是 | adjustable_dumbbells | 7 | face_pull |
| 4 | cable_curl | 绳索弯举 | 肘屈 | isolation | 2 | 4 | 10–15次 | reps | 是 | cable_machine | 7 | barbell_curl, db_curl, hammer_curl |
| 5 | seated_row | 坐姿划船 | 水平拉 | primary_compound | 2 | 4 | 8–12次 | reps | 是 | cable_machine | 9 | chest_supported_row, one_arm_db_row |

### 第 6 天 · 腿 · 54 分钟

| 顺序 | 动作ID | 动作名称 | 模式 | 角色 | 难度 | 组数 | 目标 | 追踪 | 肌肉量 | 匹配器械 | 估时 | 替换候选 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | barbell_squat | 杠铃深蹲 | 深蹲 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell+squat_rack | 9 | goblet_squat |
| 2 | db_hip_thrust | 哑铃臀推 | 髋伸 | primary_compound | 3 | 4 | 8–12次 | reps | 是 | adjustable_dumbbells+bench | 9 | barbell_hip_thrust, weighted_glute_bridge, cable_kickback |
| 3 | step_up | 台阶踏步 | 弓步 | primary_compound | 2 | 4 | 每侧 8–12次 | reps_per_side | 是 | bench | 11 | lunge |
| 4 | calf_raise | 提踵 | 踝伸 | accessory | 2 | 4 | 12–20次 | reps | 是 | bodyweight | 7 | - |
| 5 | rdl | 罗马尼亚硬拉 | 髋铰链 | primary_compound | 4 | 4 | 8–12次 | reps | 是 | barbell | 9 | bodyweight_single_leg_hinge, db_rdl |

## 失败场景：只有跳绳却要求增肌

用户水平：intermediate
训练目标：muscleGain
每周频率：3
单次时长：45 分钟
用户器械：jump_rope
生成错误：第 1 天 没有可用动作。; 第 3 天 没有可用动作。; 第 5 天 没有可用动作。
不变量错误：-
有效组摘要：-

## 当前已知限制

- 当前生成器是确定性排序，没有真正的随机 seed；报告记录固定 seed 作为审计标识。
- 间接有效组采用简单 0.5 权重估算，只用于防止明显过量，不代表完整运动科学模型。
- 中文历史编码污染仍存在于旧源码字符串中；本报告和新增测试优先使用稳定动作 ID / equipment ID。
