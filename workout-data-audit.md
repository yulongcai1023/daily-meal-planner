# 健身动作数据一致性审计

生成时间：2026-07-17T05:52:04.078Z

- 动作数量：103
- 进退阶图谱：通过

## 无效器械条件

- 无

## 重复关系

- 无

## 跨模式 progression

- 无

## 跨模式 alternative

- standing_scapular_retraction -> band_pulldown: 水平拉 / 垂直拉; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- wall_angel -> face_pull: 肩胛控制 / 水平拉; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- front_raise -> db_shoulder_press: 肩屈 / 垂直推; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- triceps_pushdown -> close_push_up: 肘伸 / 水平推; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- close_push_up -> triceps_pushdown: 水平推 / 肘伸; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- close_grip_bench -> triceps_pushdown: 水平推 / 肘伸; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- bodyweight_squat -> wall_sit: 深蹲 / 静力; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- leg_extension -> leg_press: 膝伸 / 深蹲; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- rdl -> glute_bridge: 髋铰链 / 髋伸; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- db_rdl -> glute_bridge: 髋铰链 / 髋伸; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- leg_curl -> db_rdl: 膝屈 / 髋铰链; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- dead_bug -> bird_dog: 抗伸展 / 抗旋转; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- bird_dog -> dead_bug: 抗旋转 / 抗伸展; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- crunch -> dead_bug: 躯干屈曲 / 抗伸展; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- reverse_crunch -> dead_bug: 骨盆后倾 / 抗伸展; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true
- lying_leg_raise -> reverse_crunch: 髋屈 / 骨盆后倾; type=sameMuscleDifferentPattern; requiresPatternCoverageValidation=true

## 缺失 prerequisites

- 无

## 无法访问的动作 ID

- 无

## suggestedNext 目标异常

- 无

## UTF-8 编码检测结果

- workout-engine.js: 通过
- tests/workout-engine.test.mjs: 通过
- workout-difficulty-review.md: 通过
- workout-difficulty-summary.md: 通过
