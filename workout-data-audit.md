# 健身动作数据一致性审计

生成时间：2026-07-17T06:18:34.944Z

- 动作数量：105
- 进退阶图校验：通过
- 编码异常字符数量：0

## 所有角色不匹配 alternative

- leg_curl(isolation) → db_rdl(compound)

## alternative 难度反向关系

- 无

## 跨模式且疲劳差异过大的替代

- 无

## 无效设备组合

- 无

## 安全保护字段缺失

- 无

| 动作 ID | 存在 | requiresSpotterOrSafetyArms | 筛选算法使用 |
| --- | --- | --- | --- |
| barbell_bench | 是 | 是 | 是 |
| incline_barbell_bench | 是 | 是 | 是 |
| close_grip_bench | 是 | 是 | 是 |

## 重复动作模板

- incline_push_up: 通用上斜俯卧撑已保留为兼容数据，但 autoCandidate=否，不进入自动候选

## 跨模式 progression

- 无

## 跨模式 alternative

- db_rdl → glute_bridge: type=sameMuscleDifferentPattern, 需要模式覆盖校验=是
- leg_curl → db_rdl: type=sameMuscleDifferentPattern, 需要模式覆盖校验=是
- dead_bug → bird_dog: type=sameMuscleDifferentPattern, 需要模式覆盖校验=是
- bird_dog → dead_bug: type=sameMuscleDifferentPattern, 需要模式覆盖校验=是
- crunch → dead_bug: type=sameMuscleDifferentPattern, 需要模式覆盖校验=是
- reverse_crunch → dead_bug: type=sameMuscleDifferentPattern, 需要模式覆盖校验=是
- lying_leg_raise → reverse_crunch: type=sameMuscleDifferentPattern, 需要模式覆盖校验=是

## 重复关系

- 无

## 缺失 prerequisites

- 无

## 无法访问的动作 ID

- 无

## suggestedNext 目标异常

- 无

## UTF-8 编码检测

| 文件 | 存在 | 替换字符数 | 可疑异常字符数 | 通过 |
| --- | --- | --- | --- | --- |
| workout-engine.js | 是 | 0 | 0 | 是 |
| tests/workout-engine.test.mjs | 是 | 0 | 0 | 是 |
| workout-difficulty-review.md | 是 | 0 | 0 | 是 |
| workout-difficulty-summary.md | 是 | 0 | 0 | 是 |
| workout-data-audit.md | 是 | 0 | 0 | 是 |
