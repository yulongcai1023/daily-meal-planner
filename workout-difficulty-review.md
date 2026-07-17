# 健身动作分级与安全字段报告

生成时间：2026-07-17T06:18:34.944Z

本报告仅反映当前数据状态，不重新调整整体等级。

## 安全保护字段

| 动作 ID | 存在 | requiresSpotterOrSafetyArms | 筛选算法使用 |
| --- | --- | --- | --- |
| barbell_bench | 是 | 是 | 是 |
| incline_barbell_bench | 是 | 是 | 是 |
| close_grip_bench | 是 | 是 | 是 |

## 动作角色概览

| 动作 ID | 名称 | 难度 | 动作角色 | 训练角色 | 计入有效组 | 安全臂/保护 | 器械 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| push_up | 俯卧撑 | 3 | compound | main | 是 | 否 | 无器械 |
| kneeling_push_up | 跪姿俯卧撑 | 2 | compound | main | 是 | 否 | 无器械 |
| incline_push_up | 上斜俯卧撑 | 1.6 | compound | deprecated | 否 | 否 | 无器械 |
| db_bench | 哑铃卧推 | 2.5 | compound | main | 是 | 否 | 可调哑铃、固定哑铃、卧推凳 |
| incline_db_bench | 上斜哑铃卧推 | 2.5 | compound | main | 是 | 否 | 可调哑铃、固定哑铃、卧推凳 |
| barbell_bench | 杠铃卧推 | 4 | compound | main | 是 | 是 | 杠铃、卧推凳 |
| incline_barbell_bench | 上斜杠铃卧推 | 4.5 | compound | main | 是 | 是 | 杠铃、卧推凳 |
| machine_chest_press | 器械推胸 | 2 | compound | main | 是 | 否 | 器械推胸 |
| db_fly | 哑铃飞鸟 | 3 | accessory | main | 是 | 否 | 可调哑铃、固定哑铃、卧推凳 |
| cable_fly | 绳索夹胸 | 3 | accessory | main | 是 | 否 | 拉力器 |
| lat_pulldown | 高位下拉 | 2 | compound | main | 是 | 否 | 高位下拉器 |
| band_pulldown | 弹力带下拉 | 1 | compound | main | 是 | 否 | 弹力带 |
| assisted_pull_up | 辅助引体向上 | 3 | compound | main | 是 | 否 | 引体向上杆、弹力带 |
| pull_up | 引体向上 | 4 | compound | main | 是 | 否 | 引体向上杆 |
| standing_scapular_retraction | 站姿肩胛后缩 | 1 | activation | activation | 否 | 否 | 无器械 |
| wall_angel | 墙天使 | 1 | warmup | warmup | 否 | 否 | 无器械 |
| standing_reverse_fly | 站姿徒手反向飞鸟 | 1 | activation | activation | 否 | 否 | 无器械 |
| seated_row | 坐姿划船 | 2 | compound | main | 是 | 否 | 拉力器 |
| one_arm_db_row | 单臂哑铃划船 | 3 | compound | main | 是 | 否 | 可调哑铃、固定哑铃 |
| chest_supported_row | 胸托划船 | 2.5 | compound | main | 是 | 否 | 可调哑铃、固定哑铃、卧推凳 |
| barbell_row | 杠铃划船 | 4 | compound | main | 是 | 否 | 杠铃 |
| straight_arm_pulldown | 直臂下压 | 3 | accessory | main | 是 | 否 | 拉力器 |
| face_pull | 面拉 | 2 | accessory | main | 是 | 否 | 拉力器、弹力带 |
| reverse_fly | 反向飞鸟 | 2 | accessory | main | 是 | 否 | 可调哑铃、固定哑铃、弹力带 |
| db_shoulder_press | 坐姿哑铃肩推 | 2 | compound | main | 是 | 否 | 可调哑铃、固定哑铃 |
| machine_shoulder_press | 器械肩推 | 2 | compound | main | 是 | 否 | 器械肩推 |
| barbell_press | 杠铃推举 | 4 | compound | main | 是 | 否 | 杠铃 |
| lateral_raise | 哑铃侧平举 | 2 | isolation | accessory | 是 | 否 | 可调哑铃、固定哑铃 |
| cable_lateral_raise | 绳索侧平举 | 3 | isolation | accessory | 是 | 否 | 拉力器 |
| front_raise | 前平举 | 2 | isolation | accessory | 是 | 否 | 可调哑铃、固定哑铃 |
| db_curl | 哑铃弯举 | 2 | isolation | accessory | 是 | 否 | 可调哑铃、固定哑铃 |
| hammer_curl | 锤式弯举 | 2 | isolation | accessory | 是 | 否 | 可调哑铃、固定哑铃 |
| barbell_curl | 杠铃弯举 | 2 | isolation | accessory | 是 | 否 | 杠铃 |
| cable_curl | 绳索弯举 | 2 | isolation | accessory | 是 | 否 | 拉力器 |
| preacher_curl | 牧师椅弯举 | 2 | isolation | accessory | 是 | 否 | 牧师椅 |
| triceps_pushdown | 绳索下压 | 2 | isolation | accessory | 是 | 否 | 拉力器 |
| straight_bar_pushdown | 直杆下压 | 2 | isolation | accessory | 是 | 否 | 拉力器 |
| overhead_extension | 过头臂屈伸 | 3 | isolation | accessory | 是 | 否 | 可调哑铃、固定哑铃、拉力器 |
| close_push_up | 窄距俯卧撑 | 4 | compound | main | 是 | 否 | 无器械 |
| dip | 双杠臂屈伸 | 5 | compound | main | 是 | 否 | 双杠 |
| close_grip_bench | 窄握卧推 | 3 | compound | main | 是 | 是 | 杠铃、卧推凳 |
| bodyweight_squat | 自重深蹲 | 2 | compound | main | 是 | 否 | 无器械 |
| goblet_squat | 高脚杯深蹲 | 3 | compound | main | 是 | 否 | 可调哑铃、固定哑铃、壶铃 |
| barbell_squat | 杠铃深蹲 | 4 | compound | main | 是 | 否 | 杠铃、深蹲架 |
| smith_squat | 史密斯深蹲 | 3.5 | compound | main | 是 | 否 | 史密斯机 |
| leg_press | 腿举 | 2 | compound | main | 是 | 否 | 腿举机 |
| bulgarian_split_squat | 保加利亚分腿蹲 | 4 | compound | main | 是 | 否 | 可调哑铃、固定哑铃 |
| lunge | 箭步蹲 | 3 | compound | main | 是 | 否 | 无器械、可调哑铃、固定哑铃 |
| step_up | 台阶踏步 | 2 | compound | main | 是 | 否 | 无器械、可调哑铃、固定哑铃 |
| leg_extension | 腿屈伸 | 2 | isolation | accessory | 是 | 否 | 腿屈伸机 |
| rdl | 罗马尼亚硬拉 | 4 | compound | main | 是 | 否 | 杠铃 |
| db_rdl | 哑铃罗马尼亚硬拉 | 3 | compound | main | 是 | 否 | 可调哑铃、固定哑铃 |
| leg_curl | 腿弯举 | 2 | isolation | accessory | 是 | 否 | 腿弯举机 |
| glute_bridge | 臀桥 | 1.5 | compound | main | 是 | 否 | 无器械、瑜伽垫 |
| barbell_hip_thrust | 杠铃臀推 | 4 | compound | main | 是 | 否 | 杠铃、卧推凳 |
| hip_abduction | 髋外展 | 2 | accessory | main | 是 | 否 | 弹力带、髋外展机 |
| cable_kickback | 绳索后踢 | 3 | isolation | accessory | 是 | 否 | 拉力器 |
| calf_raise | 提踵 | 2 | accessory | main | 是 | 否 | 无器械、可调哑铃、固定哑铃 |
| wall_sit | 靠墙静蹲 | 1 | accessory | main | 是 | 否 | 无器械 |
| plank | 平板支撑 | 2 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| side_plank | 侧平板支撑 | 3 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| dead_bug | 死虫 | 1 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| bird_dog | 鸟狗 | 1 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| crunch | 卷腹 | 2 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| reverse_crunch | 反向卷腹 | 2 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| hanging_leg_raise | 悬垂举腿 | 5 | compound | main | 是 | 否 | 引体向上杆 |
| lying_leg_raise | 仰卧抬腿 | 3 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| pallof_press | Pallof Press | 2 | accessory | main | 是 | 否 | 弹力带、拉力器 |
| farmer_carry | 农夫行走 | 3 | compound | main | 是 | 否 | 可调哑铃、固定哑铃、壶铃 |
| superman | 超人式 | 2 | activation | accessory | 否 | 否 | 无器械、瑜伽垫 |
| mountain_climber | 登山跑 | 3 | compound | main | 是 | 否 | 无器械 |
| jumping_jack | 开合跳 | 2 | compound | main | 是 | 否 | 无器械 |
| high_knee | 原地高抬腿 | 3 | compound | main | 是 | 否 | 无器械 |
| brisk_walk | 快走 | 1 | accessory | main | 是 | 否 | 无器械 |
| running | 跑步 | 2 | accessory | main | 是 | 否 | 无器械、跑步机 |
| elliptical | 椭圆机 | 1 | accessory | main | 是 | 否 | 椭圆机 |
| bike | 固定单车 | 1 | accessory | main | 是 | 否 | 单车 |
| rowing_machine | 划船机 | 3 | accessory | main | 是 | 否 | 划船机 |
| stair_climber | 爬楼机 | 2 | accessory | main | 是 | 否 | 爬楼机 |
| jump_rope | 跳绳 | 3 | compound | main | 是 | 否 | 跳绳 |
| low_impact_circuit | 低冲击循环训练 | 1 | accessory | main | 是 | 否 | 无器械 |
| wall_push_up | 墙壁俯卧撑 | 1 | compound | main | 是 | 否 | 无器械 |
| high_incline_push_up | 高位上斜俯卧撑 | 1.3 | compound | main | 是 | 否 | 无器械 |
| low_incline_push_up | 低位上斜俯卧撑 | 2 | compound | main | 是 | 否 | 无器械 |
| weighted_push_up | 负重俯卧撑 | 5 | compound | main | 是 | 否 | 负重背心、沙袋、杠铃片 |
| chair_sit_to_stand | 椅子坐站 | 1 | compound | main | 是 | 否 | 椅子、卧推凳、稳定台面 |
| box_squat | 箱式深蹲 | 1.5 | compound | main | 是 | 否 | 箱子、卧推凳、稳定台面 |
| hip_hinge_drill | 徒手髋铰链 | 1 | accessory | main | 是 | 否 | 无器械 |
| wall_hip_hinge | 墙触臀髋铰链 | 1.5 | accessory | main | 是 | 否 | 无器械 |
| bodyweight_single_leg_hinge | 徒手单腿髋铰链 | 4.2 | compound | main | 是 | 否 | 无器械 |
| single_leg_rdl | 负重单腿罗马尼亚硬拉 | 5 | compound | main | 是 | 否 | 可调哑铃、固定哑铃、杠铃片 |
| weighted_glute_bridge | 负重臀桥 | 2 | compound | main | 是 | 否 | 可调哑铃、固定哑铃 |
| db_hip_thrust | 哑铃臀推 | 3 | compound | main | 是 | 否 | 可调哑铃、固定哑铃、卧推凳 |
| weighted_pull_up | 负重引体向上 | 5 | compound | main | 是 | 否 | 引体向上杆 |
| band_assisted_dip | 弹力带辅助双杠臂屈伸 | 3.5 | compound | main | 是 | 否 | 双杠、弹力带 |
| assisted_dip_machine | 器械辅助双杠臂屈伸 | 3 | compound | main | 是 | 否 | 辅助臂屈伸机 |
| weighted_dip | 负重双杠臂屈伸 | 5.5 | compound | main | 是 | 否 | 双杠、负重背心、杠铃片 |
| standing_db_shoulder_press | 站姿哑铃肩推 | 3 | compound | main | 是 | 否 | 可调哑铃、固定哑铃 |
| incline_plank | 上斜平板支撑 | 1 | accessory | main | 是 | 否 | 无器械 |
| knee_plank | 跪姿平板支撑 | 1.5 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| long_lever_plank | 长杠杆平板支撑 | 3.5 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| weighted_plank | 负重平板支撑 | 4.5 | accessory | main | 是 | 否 | 负重背心、杠铃片、沙袋、瑜伽垫 |
| knee_side_plank | 屈膝侧平板 | 1 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| side_plank_leg_raise | 抬腿侧平板 | 4 | accessory | main | 是 | 否 | 无器械、瑜伽垫 |
| weighted_side_plank | 负重侧平板 | 5 | accessory | main | 是 | 否 | 负重背心、杠铃片、沙袋、瑜伽垫 |
