# ?????????

?????`workout-engine.js` ?????

???????1 = ??5 = ???? 1.5 / 2.5 / 3.5 / 4.5 ???????

???????

## ??????

| ?? | ?? |
|---|---:|
| ??/beginner | 37 |
| ????/novice | 22 |
| ??/intermediate | 28 |
| ??/advanced | 7 |

## ??????

- ???????? beginner?difficultyScore 3?
- ????????????????????? intermediate?
- ??????? intermediate??? strengthRequirement = 5?
- ????????????? beginner?
- ?????? beginner / difficultyScore 3?
- ??????? intermediate / difficultyScore 3?
- ??? beginnerFriendly = false??????? novice ?????
- ??????????? progressionIds???????????????????????????????


## 胸

| ??ID | ??? | ??? | ?? | ?? | ?? | ???? | ?? | ??? | ?? | ???? | ???? | ?? | ???? | ??? | ??? | ?? | ?? | ?? | ?? | ???? | ?? | ?? | ?? |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|---|
| wall_push_up | 墙壁俯卧撑 | Wall Push-up | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | ? | ? | ? | 无器械 | 水平推 | 手腕不适?肩部不适 | - | 手腕?肩部 | - | - | incline_push_up |
| incline_push_up | 上斜俯卧撑 | Incline Push-up | ????/novice | 1.5 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 2 | ? | ? | ? | 无器械 | 水平推 | - | - | - | push_up | wall_push_up | kneeling_push_up |
| kneeling_push_up | 跪姿俯卧撑 | Kneeling Push-up | ????/novice | 2 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 2 | ? | ? | ? | 无器械 | 水平推 | 手腕不适 | - | 手腕 | - | incline_push_up | push_up |
| machine_chest_press | 器械推胸 | Machine Chest Press | ??/beginner | 2 | 2 | 2 | 1 | 2 | 2 | 1 | 2 | 3 | ? | ? | ? | 器械推胸 | 水平推 | 肩部不适 | - | 肩部 | push_up | - | db_bench |
| db_bench | 哑铃卧推 | Dumbbell Bench Press | ??/beginner | 2.5 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 3 | ? | ? | ? | 可调哑铃?固定哑铃?卧推凳 | 水平推 | 肩部不适 | - | 肩部 | push_up | machine_chest_press | incline_db_bench |
| push_up | 俯卧撑 | Push-up | ??/beginner | 3 | 2 | 3 | 3 | 2 | 2 | 1 | 2 | 3 | ? | ? | ? | 无器械 | 水平推 | 手腕不适?肩部不适 | - | 手腕?肩部 | incline_push_up?machine_chest_press | kneeling_push_up | close_push_up |
| cable_fly | 绳索夹胸 | Cable Fly | ??/intermediate | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | ? | ? | ? | 拉力器 | 夹胸 | 肩部不适 | - | 肩部 | db_fly | - | - |
| db_fly | 哑铃飞鸟 | Dumbbell Fly | ??/intermediate | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | ? | ? | ? | 可调哑铃?固定哑铃?卧推凳 | 夹胸 | 肩部不适 | - | 肩部 | cable_fly | - | - |
| incline_db_bench | 上斜哑铃卧推 | Incline Dumbbell Bench Press | ??/intermediate | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 4 | ? | ? | ? | 可调哑铃?固定哑铃?卧推凳 | 水平推 | 肩部不适 | - | 肩部 | - | db_bench | barbell_bench |
| barbell_bench | 杠铃卧推 | Barbell Bench Press | ??/intermediate | 4 | 4 | 4 | 3 | 3 | 3 | 4 | 3 | 4 | ? | ? | ? | 杠铃?卧推凳 | 水平推 | 肩部不适 | - | 肩部 | db_bench?machine_chest_press | incline_db_bench | incline_barbell_bench |
| incline_barbell_bench | 上斜杠铃卧推 | Incline Barbell Bench Press | ??/intermediate | 4.5 | 4 | 4 | 3 | 3 | 3 | 4 | 3 | 4 | ? | ? | ? | 杠铃?卧推凳 | 水平推 | 肩部不适 | - | 肩部 | incline_db_bench | barbell_bench | - |
| weighted_push_up | 负重俯卧撑 | Weighted Push-up | ??/advanced | 5 | 3 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | ? | ? | ? | 无器械 | 水平推 | 手腕不适?肩部不适 | - | 手腕?肩部 | - | close_push_up | - |

## 背

| ??ID | ??? | ??? | ?? | ?? | ?? | ???? | ?? | ??? | ?? | ???? | ???? | ?? | ???? | ??? | ??? | ?? | ?? | ?? | ?? | ???? | ?? | ?? | ?? |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|---|
| band_pulldown | 弹力带下拉 | Band Pulldown | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | ? | ? | ? | 弹力带 | 垂直拉 | - | - | - | - | - | lat_pulldown |
| standing_reverse_fly | 站姿徒手反向飞鸟 | Standing Bodyweight Reverse Fly | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 无器械 | 水平拉 | 肩部不适 | - | 肩部 | reverse_fly | - | - |
| standing_scapular_retraction | 站姿肩胛后缩 | Standing Scapular Retraction | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 无器械 | 水平拉 | 肩部不适 | - | 肩部 | band_pulldown?face_pull | - | - |
| wall_angel | 墙天使 | Wall Angel | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 无器械 | 肩胛控制 | 肩部不适 | - | 肩部 | face_pull | - | - |
| lat_pulldown | 高位下拉 | Lat Pulldown | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 3 | ? | ? | ? | 高位下拉器 | 垂直拉 | 肩部不适 | - | 肩部 | - | band_pulldown | assisted_pull_up |
| seated_row | 坐姿划船 | Seated Cable Row | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 2 | 3 | ? | ? | ? | 拉力器 | 水平拉 | 腰部不适 | - | 腰部 | one_arm_db_row | - | chest_supported_row |
| chest_supported_row | 胸托划船 | Chest-supported Row | ??/beginner | 2.5 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 3 | ? | ? | ? | 可调哑铃?固定哑铃?卧推凳 | 水平拉 | - | - | - | - | seated_row | one_arm_db_row |
| assisted_pull_up | 辅助引体向上 | Assisted Pull-up | ??/beginner | 3 | 3 | 3 | 2 | 2 | 2 | 1 | 3 | 3 | ? | ? | ? | 引体向上杆?弹力带 | 垂直拉 | 肩部不适?肘部不适 | - | 肩部?肘部 | - | lat_pulldown | pull_up |
| one_arm_db_row | 单臂哑铃划船 | One-arm Dumbbell Row | ??/intermediate | 3 | 3 | 2 | 3 | 2 | 3 | 3 | 2 | 3 | ? | ? | ? | 可调哑铃?固定哑铃 | 水平拉 | 腰部不适 | - | 腰部 | - | chest_supported_row | barbell_row |
| straight_arm_pulldown | 直臂下压 | Straight-arm Pulldown | ??/intermediate | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | ? | ? | ? | 拉力器 | 垂直拉 | 肩部不适 | - | 肩部 | lat_pulldown | - | - |
| pull_up | 引体向上 | Pull-up | ??/intermediate | 4 | 3 | 5 | 4 | 4 | 4 | 3 | 5 | 4 | ? | ? | ? | 引体向上杆 | 垂直拉 | 肩部不适?肘部不适 | - | 肩部?肘部 | lat_pulldown | assisted_pull_up | weighted_pull_up |
| barbell_row | 杠铃划船 | Barbell Row | ??/advanced | 4 | 4 | 4 | 3 | 3 | 3 | 4 | 3 | 4 | ? | ? | ? | 杠铃 | 水平拉 | 腰部不适 | - | 腰部 | chest_supported_row | one_arm_db_row | - |
| weighted_pull_up | 负重引体向上 | Weighted Pull-up | ??/advanced | 5 | 3 | 5 | 4 | 4 | 4 | 3 | 5 | 5 | ? | ? | ? | 引体向上杆 | 垂直拉 | 肩部不适?肘部不适 | - | 肩部?肘部 | - | pull_up | - |

## 肩

| ??ID | ??? | ??? | ?? | ?? | ?? | ???? | ?? | ??? | ?? | ???? | ???? | ?? | ???? | ??? | ??? | ?? | ?? | ?? | ?? | ???? | ?? | ?? | ?? |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|---|
| db_shoulder_press | 哑铃肩推 | Dumbbell Shoulder Press | ??/beginner | 2 | 2 | 2 | 2 | 3 | 2 | 1 | 2 | 3 | ? | ? | ? | 可调哑铃?固定哑铃 | 垂直推 | 肩部不适 | - | 肩部 | machine_shoulder_press | - | - |
| face_pull | 面拉 | Face Pull | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 拉力器?弹力带 | 水平拉 | - | - | - | reverse_fly | - | - |
| front_raise | 前平举 | Front Raise | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 可调哑铃?固定哑铃 | 肩屈 | 肩部不适 | - | 肩部 | db_shoulder_press | - | - |
| lateral_raise | 哑铃侧平举 | Dumbbell Lateral Raise | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 可调哑铃?固定哑铃 | 肩外展 | 肩部不适 | - | 肩部 | cable_lateral_raise | - | - |
| machine_shoulder_press | 器械肩推 | Machine Shoulder Press | ??/beginner | 2 | 2 | 2 | 2 | 3 | 2 | 1 | 2 | 3 | ? | ? | ? | 器械肩推 | 垂直推 | 肩部不适 | - | 肩部 | db_shoulder_press | - | - |
| reverse_fly | 反向飞鸟 | Reverse Fly | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 可调哑铃?固定哑铃?弹力带 | 水平拉 | - | - | - | face_pull | - | - |
| cable_lateral_raise | 绳索侧平举 | Cable Lateral Raise | ??/intermediate | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 3 | ? | ? | ? | 拉力器 | 肩外展 | 肩部不适 | - | 肩部 | lateral_raise | - | - |
| barbell_press | 杠铃推举 | Barbell Overhead Press | ??/intermediate | 4 | 3 | 4 | 3 | 4 | 3 | 3 | 3 | 4 | ? | ? | ? | 杠铃 | 垂直推 | 肩部不适?腰部不适 | - | 肩部?腰部 | db_shoulder_press | - | - |

## 手臂

| ??ID | ??? | ??? | ?? | ?? | ?? | ???? | ?? | ??? | ?? | ???? | ???? | ?? | ???? | ??? | ??? | ?? | ?? | ?? | ?? | ???? | ?? | ?? | ?? |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|---|
| barbell_curl | 杠铃弯举 | Barbell Curl | ??/beginner | 2 | 2 | 2 | 3 | 3 | 3 | 4 | 3 | 3 | ? | ? | ? | 杠铃 | 肘屈 | 肘部不适?手腕不适 | - | 肘部?手腕 | db_curl | - | - |
| cable_curl | 绳索弯举 | Cable Curl | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 拉力器 | 肘屈 | 肘部不适 | - | 肘部 | db_curl | - | - |
| db_curl | 哑铃弯举 | Dumbbell Curl | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 可调哑铃?固定哑铃 | 肘屈 | 肘部不适 | - | 肘部 | hammer_curl | - | - |
| hammer_curl | 锤式弯举 | Hammer Curl | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 可调哑铃?固定哑铃 | 肘屈 | 肘部不适 | - | 肘部 | db_curl | - | - |
| preacher_curl | 牧师椅弯举 | Preacher Curl | ??/beginner | 2 | 1 | 2 | 3 | 3 | 3 | 2 | 3 | 3 | ? | ? | ? | 牧师椅 | 肘屈 | 肘部不适 | - | 肘部 | cable_curl | - | - |
| straight_bar_pushdown | 直杆下压 | Straight-bar Pushdown | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 拉力器 | 肘伸 | 肘部不适 | - | 肘部 | triceps_pushdown | - | - |
| triceps_pushdown | 绳索下压 | Cable Triceps Pushdown | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 拉力器 | 肘伸 | 肘部不适 | - | 肘部 | close_push_up | - | - |
| close_grip_bench | 窄握卧推 | Close-grip Bench Press | ??/intermediate | 3 | 3 | 3 | 3 | 3 | 3 | 2 | 3 | 4 | ? | ? | ? | 杠铃?卧推凳 | 水平推 | 肩部不适?肘部不适 | - | 肩部?肘部 | triceps_pushdown | - | - |
| overhead_extension | 过头臂屈伸 | Overhead Triceps Extension | ??/intermediate | 3 | 3 | 4 | 3 | 3 | 3 | 2 | 4 | 3 | ? | ? | ? | 可调哑铃?固定哑铃?拉力器 | 肘伸 | 肩部不适?肘部不适 | - | 肩部?肘部 | triceps_pushdown | - | - |
| close_push_up | 窄距俯卧撑 | Close-grip Push-up | ??/intermediate | 4 | 3 | 3 | 4 | 3 | 3 | 2 | 3 | 4 | ? | ? | ? | 无器械 | 水平推 | 手腕不适?肘部不适 | - | 手腕?肘部 | triceps_pushdown | push_up | weighted_push_up |
| dip | 双杠臂屈伸 | Dip | ??/advanced | 5 | 4 | 5 | 4 | 4 | 4 | 3 | 4 | 5 | ? | ? | ? | 双杠 | 水平推 | 肩部不适 | - | 肩部 | close_push_up | - | - |

## 腿

| ??ID | ??? | ??? | ?? | ?? | ?? | ???? | ?? | ??? | ?? | ???? | ???? | ?? | ???? | ??? | ??? | ?? | ?? | ?? | ?? | ???? | ?? | ?? | ?? |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|---|
| chair_sit_to_stand | 椅子坐站 | Chair Sit-to-Stand | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | ? | ? | ? | 无器械 | 深蹲 | 膝盖不适?不能做深蹲类动作 | - | 膝盖?深蹲 | bodyweight_squat | - | box_squat |
| hip_hinge_drill | 徒手髋铰链 | Bodyweight Hip Hinge | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 无器械 | 髋铰链 | 腰部不适?不能做硬拉类动作 | - | 腰部?硬拉 | db_rdl | - | wall_hip_hinge |
| wall_sit | 靠墙静蹲 | Wall Sit | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 无器械 | 静力 | - | - | - | - | - | - |
| box_squat | 箱式深蹲 | Box Squat | ????/novice | 1.5 | 1 | 1 | 1 | 2 | 1 | 2 | 2 | 2 | ? | ? | ? | 无器械 | 深蹲 | 膝盖不适?不能做深蹲类动作 | - | 膝盖?深蹲 | - | chair_sit_to_stand | bodyweight_squat |
| wall_hip_hinge | 墙触臀髋铰链 | Wall Hip Hinge | ????/novice | 1.5 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 无器械 | 髋铰链 | 腰部不适?不能做硬拉类动作 | - | 腰部?硬拉 | - | hip_hinge_drill | db_rdl |
| bodyweight_squat | 自重深蹲 | Bodyweight Squat | ????/novice | 2 | 2 | 2 | 1 | 2 | 1 | 2 | 2 | 2 | ? | ? | ? | 无器械 | 深蹲 | 膝盖不适?不能做深蹲类动作 | - | 膝盖?深蹲 | wall_sit | box_squat | goblet_squat |
| calf_raise | 提踵 | Calf Raise | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 无器械?可调哑铃?固定哑铃 | 踝伸 | - | - | - | - | - | - |
| leg_curl | 腿弯举 | Leg Curl | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 腿弯举机 | 膝屈 | - | - | - | db_rdl | - | - |
| leg_extension | 腿屈伸 | Leg Extension | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 腿屈伸机 | 膝伸 | 膝盖不适 | - | 膝盖 | leg_press | - | - |
| leg_press | 腿举 | Leg Press | ??/beginner | 2 | 3 | 3 | 2 | 3 | 2 | 3 | 3 | 3 | ? | ? | ? | 腿举机 | 深蹲 | 膝盖不适 | - | 膝盖 | goblet_squat | - | - |
| step_up | 台阶踏步 | Step-up | ??/beginner | 2 | 3 | 2 | 2 | 3 | 3 | 1 | 3 | 3 | ? | ? | ? | 无器械?可调哑铃?固定哑铃 | 弓步 | 膝盖不适 | - | 膝盖 | glute_bridge | - | lunge |
| goblet_squat | 高脚杯深蹲 | Goblet Squat | ??/beginner | 3 | 3 | 3 | 2 | 3 | 2 | 3 | 3 | 3 | ? | ? | ? | 可调哑铃?固定哑铃?壶铃 | 深蹲 | 膝盖不适?不能做深蹲类动作 | - | 膝盖?深蹲 | leg_press | bodyweight_squat | smith_squat |
| db_rdl | 哑铃罗马尼亚硬拉 | Dumbbell Romanian Deadlift | ??/intermediate | 3 | 3 | 3 | 2 | 2 | 2 | 3 | 2 | 3 | ? | ? | ? | 可调哑铃?固定哑铃 | 髋铰链 | 腰部不适?不能做硬拉类动作 | - | 腰部?硬拉 | glute_bridge | wall_hip_hinge | rdl |
| lunge | 箭步蹲 | Lunge | ??/intermediate | 3 | 3 | 2 | 3 | 3 | 3 | 1 | 3 | 3 | ? | ? | ? | 无器械?可调哑铃?固定哑铃 | 弓步 | 膝盖不适 | - | 膝盖 | - | step_up | bulgarian_split_squat |
| smith_squat | 史密斯深蹲 | Smith Machine Squat | ??/intermediate | 3.5 | 3 | 3 | 2 | 3 | 2 | 3 | 3 | 3 | ? | ? | ? | 史密斯机 | 深蹲 | 膝盖不适?不能做深蹲类动作 | - | 膝盖?深蹲 | leg_press | goblet_squat | barbell_squat |
| barbell_squat | 杠铃深蹲 | Barbell Squat | ??/intermediate | 4 | 3 | 4 | 3 | 4 | 3 | 4 | 4 | 4 | ? | ? | ? | 杠铃?深蹲架 | 深蹲 | 膝盖不适?腰部不适?不能做深蹲类动作 | - | 膝盖?腰部?深蹲 | leg_press | smith_squat | - |
| bulgarian_split_squat | 保加利亚分腿蹲 | Bulgarian Split Squat | ??/intermediate | 4 | 4 | 3 | 4 | 4 | 4 | 2 | 4 | 4 | ? | ? | ? | 可调哑铃?固定哑铃 | 弓步 | 膝盖不适 | - | 膝盖 | step_up | lunge | - |
| rdl | 罗马尼亚硬拉 | Romanian Deadlift | ??/intermediate | 4 | 3 | 4 | 3 | 3 | 3 | 4 | 3 | 4 | ? | ? | ? | 杠铃 | 髋铰链 | 腰部不适?不能做硬拉类动作 | - | 腰部?硬拉 | glute_bridge | db_rdl | single_leg_rdl |
| single_leg_rdl | 单腿罗马尼亚硬拉 | Single-leg Romanian Deadlift | ??/advanced | 5 | 4 | 4 | 5 | 4 | 5 | 3 | 4 | 5 | ? | ? | ? | 无器械?可调哑铃?固定哑铃 | 髋铰链 | 腰部不适?不能做硬拉类动作 | - | 腰部?硬拉 | db_rdl | rdl | - |

## 臀

| ??ID | ??? | ??? | ?? | ?? | ?? | ???? | ?? | ??? | ?? | ???? | ???? | ?? | ???? | ??? | ??? | ?? | ?? | ?? | ?? | ???? | ?? | ?? | ?? |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|---|
| glute_bridge | 臀桥 | Glute Bridge | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | ? | ? | ? | 无器械?瑜伽垫 | 髋伸 | - | - | - | barbell_hip_thrust | - | weighted_glute_bridge |
| hip_abduction | 髋外展 | Hip Abduction | ??/beginner | 2 | 1 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 弹力带?髋外展机 | 髋外展 | - | - | - | cable_kickback | - | - |
| weighted_glute_bridge | 负重臀桥 | Weighted Glute Bridge | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 3 | ? | ? | ? | 可调哑铃?固定哑铃 | 髋伸 | - | - | - | - | glute_bridge | db_hip_thrust |
| cable_kickback | 绳索后踢 | Cable Kickback | ??/beginner | 3 | 2 | 2 | 3 | 3 | 4 | 2 | 3 | 2 | ? | ? | ? | 拉力器 | 髋伸 | - | - | - | glute_bridge | - | - |
| db_hip_thrust | 哑铃臀推 | Dumbbell Hip Thrust | ??/beginner | 3 | 2 | 3 | 2 | 2 | 2 | 1 | 2 | 3 | ? | ? | ? | 可调哑铃?固定哑铃?卧推凳 | 髋伸 | - | - | - | - | weighted_glute_bridge | barbell_hip_thrust |
| barbell_hip_thrust | 杠铃臀推 | Barbell Hip Thrust | ??/intermediate | 4 | 3 | 4 | 3 | 3 | 3 | 4 | 3 | 4 | ? | ? | ? | 杠铃?卧推凳 | 髋伸 | 腰部不适 | - | 腰部 | glute_bridge | db_hip_thrust | - |

## 核心

| ??ID | ??? | ??? | ?? | ?? | ?? | ???? | ?? | ??? | ?? | ???? | ???? | ?? | ???? | ??? | ??? | ?? | ?? | ?? | ?? | ???? | ?? | ?? | ?? |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|---|
| bird_dog | 鸟狗 | Bird Dog | ????/novice | 1 | 2 | 1 | 2 | 1 | 2 | 1 | 1 | 1 | ? | ? | ? | 无器械?瑜伽垫 | 抗旋转 | - | - | - | dead_bug | - | - |
| dead_bug | 死虫 | Dead Bug | ????/novice | 1 | 2 | 1 | 2 | 1 | 2 | 1 | 1 | 1 | ? | ? | ? | 无器械?瑜伽垫 | 抗伸展 | 腰部不适 | - | 腰部 | bird_dog | - | plank |
| knee_side_plank | 屈膝侧平板 | Knee Side Plank | ????/novice | 1 | 1 | 1 | 2 | 1 | 2 | 1 | 1 | 1 | ? | ? | ? | 无器械?瑜伽垫 | 抗侧屈 | - | - | - | - | - | side_plank |
| plank | 平板支撑 | Plank | ????/novice | 2 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 无器械?瑜伽垫 | 抗伸展 | - | - | - | - | dead_bug | - |
| crunch | 卷腹 | Crunch | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 无器械?瑜伽垫 | 躯干屈曲 | 腰部不适 | - | 腰部 | dead_bug | - | - |
| pallof_press | Pallof Press | Pallof Press | ??/beginner | 2 | 3 | 2 | 3 | 2 | 3 | 1 | 2 | 2 | ? | ? | ? | 弹力带?拉力器 | 抗旋转 | - | - | - | - | - | - |
| reverse_crunch | 反向卷腹 | Reverse Crunch | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 无器械?瑜伽垫 | 骨盆后倾 | 腰部不适 | - | 腰部 | dead_bug | - | - |
| superman | 超人式 | Superman | ??/beginner | 2 | 2 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | ? | ? | ? | 无器械?瑜伽垫 | 背伸 | 腰部不适 | - | 腰部 | - | - | - |
| farmer_carry | 农夫行走 | Farmer Carry | ??/intermediate | 3 | 2 | 3 | 2 | 2 | 2 | 3 | 2 | 3 | ? | ? | ? | 可调哑铃?固定哑铃?壶铃 | 负重行走 | - | - | - | - | - | - |
| lying_leg_raise | 仰卧抬腿 | Lying Leg Raise | ??/intermediate | 3 | 2 | 3 | 3 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 无器械?瑜伽垫 | 髋屈 | 腰部不适 | - | 腰部 | reverse_crunch | - | hanging_leg_raise |
| side_plank | 侧平板支撑 | Side Plank | ??/intermediate | 3 | 3 | 2 | 3 | 2 | 3 | 1 | 2 | 2 | ? | ? | ? | 无器械?瑜伽垫 | 抗侧屈 | - | - | - | - | knee_side_plank | side_plank_leg_raise |
| side_plank_leg_raise | 抬腿侧平板 | Side Plank Leg Raise | ??/intermediate | 4 | 3 | 3 | 4 | 3 | 4 | 2 | 3 | 3 | ? | ? | ? | 无器械?瑜伽垫 | 抗侧屈 | - | - | - | - | side_plank | weighted_side_plank |
| hanging_leg_raise | 悬垂举腿 | Hanging Leg Raise | ??/advanced | 5 | 5 | 4 | 4 | 5 | 4 | 3 | 4 | 5 | ? | ? | ? | 引体向上杆 | 髋屈 | 肩部不适?腰部不适 | - | 肩部?腰部 | - | lying_leg_raise | - |
| weighted_side_plank | 负重侧平板 | Weighted Side Plank | ??/advanced | 5 | 3 | 4 | 4 | 4 | 5 | 3 | 4 | 4 | ? | ? | ? | 无器械?瑜伽垫 | 抗侧屈 | - | - | - | - | side_plank_leg_raise | - |

## 有氧

| ??ID | ??? | ??? | ?? | ?? | ?? | ???? | ?? | ??? | ?? | ???? | ???? | ?? | ???? | ??? | ??? | ?? | ?? | ?? | ?? | ???? | ?? | ?? | ?? |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|---|
| bike | 固定单车 | Stationary Bike | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 单车 | 稳态有氧 | - | - | - | - | - | - |
| brisk_walk | 快走 | Brisk Walking | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 无器械 | 稳态有氧 | - | - | - | - | - | - |
| elliptical | 椭圆机 | Elliptical | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 椭圆机 | 稳态有氧 | - | - | - | - | - | - |
| low_impact_circuit | 低冲击循环训练 | Low-impact Circuit | ????/novice | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ? | ? | ? | 无器械 | 循环训练 | 膝盖不适 | - | 膝盖 | - | - | - |
| jumping_jack | 开合跳 | Jumping Jack | ??/beginner | 2 | 2 | 2 | 2 | 2 | 3 | 1 | 3 | 3 | ? | ? | ? | 无器械 | 循环训练 | 膝盖不适?不适合高冲击 | - | 膝盖?合高冲击 | - | - | - |
| running | 跑步 | Running | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 3 | 2 | ? | ? | ? | 无器械?跑步机 | 稳态有氧 | 膝盖不适?不喜欢跑步 | - | 膝盖?不喜欢跑步 | - | - | - |
| stair_climber | 爬楼机 | Stair Climber | ??/beginner | 2 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | ? | ? | ? | 爬楼机 | 稳态有氧 | 膝盖不适 | - | 膝盖 | - | - | - |
| high_knee | 原地高抬腿 | High Knee | ??/intermediate | 3 | 2 | 2 | 2 | 2 | 3 | 1 | 3 | 3 | ? | ? | ? | 无器械 | 循环训练 | 膝盖不适?不适合高冲击 | - | 膝盖?合高冲击 | - | - | - |
| jump_rope | 跳绳 | Jump Rope | ??/intermediate | 3 | 2 | 2 | 2 | 2 | 4 | 1 | 3 | 3 | ? | ? | ? | 跳绳 | 循环训练 | 膝盖不适?不适合高冲击 | - | 膝盖?合高冲击 | - | - | - |
| mountain_climber | 登山跑 | Mountain Climber | ??/intermediate | 3 | 2 | 2 | 3 | 2 | 2 | 1 | 3 | 3 | ? | ? | ? | 无器械 | 循环训练 | 膝盖不适?手腕不适?不适合高冲击 | - | 膝盖?手腕?合高冲击 | - | - | - |
| rowing_machine | 划船机 | Rowing Machine | ??/intermediate | 3 | 2 | 2 | 2 | 2 | 2 | 3 | 2 | 2 | ? | ? | ? | 划船机 | 稳态有氧 | 腰部不适 | - | 腰部 | - | - | - |
