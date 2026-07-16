const dayLabels = ["第 1 天", "第 2 天", "第 3 天", "第 4 天", "第 5 天", "第 6 天", "第 7 天"];

const equipmentGroups = [
  { name: "无器械", icon: "icon-body", values: ["无器械"] },
  { name: "瑜伽垫", icon: "icon-mat", values: ["瑜伽垫"] },
  { name: "弹力带", icon: "icon-band", values: ["弹力带"] },
  { name: "哑铃", icon: "icon-dumbbell", values: ["可调哑铃", "固定哑铃"] },
  { name: "壶铃", icon: "icon-kettlebell", values: ["壶铃"] },
  { name: "杠铃", icon: "icon-barbell", values: ["杠铃"] },
  { name: "深蹲架", icon: "icon-rack", values: ["深蹲架"] },
  { name: "史密斯机", icon: "icon-smith", values: ["史密斯机"] },
  { name: "卧推凳", icon: "icon-bench", values: ["卧推凳"] },
  { name: "拉力器", icon: "icon-cable", values: ["拉力器"] },
  { name: "高位下拉器", icon: "icon-pulldown", values: ["高位下拉器"] },
  { name: "固定器械", icon: "icon-machine", values: ["器械推胸", "器械肩推", "腿举机", "腿屈伸机", "腿弯举机", "髋外展机"] },
  { name: "跑步机", icon: "icon-run", values: ["跑步机"] },
  { name: "椭圆机", icon: "icon-elliptical", values: ["椭圆机"] },
  { name: "单车", icon: "icon-bike", values: ["单车"] },
  { name: "划船机", icon: "icon-row", values: ["划船机"] },
  { name: "引体向上杆", icon: "icon-bar", values: ["引体向上杆"] },
  { name: "双杠", icon: "icon-parallel", values: ["双杠"] },
  { name: "牧师椅", icon: "icon-preacher", values: ["牧师椅"] },
  { name: "爬楼机", icon: "icon-stairs", values: ["爬楼机"] },
  { name: "跳绳", icon: "icon-rope", values: ["跳绳"] }
];

const equipmentIconClass = {
  "哑铃": "icon-dumbbell",
  "弹力带": "icon-band",
  "引体向上杆": "icon-bar",
  "瑜伽垫": "icon-mat",
  "固定器械": "icon-machine",
  "无器械": "icon-body",
  "杠铃": "icon-barbell",
  "壶铃": "icon-kettlebell",
  "深蹲架": "icon-rack",
  "史密斯机": "icon-smith",
  "卧推凳": "icon-bench",
  "拉力器": "icon-cable",
  "高位下拉器": "icon-pulldown",
  "跑步机": "icon-run",
  "椭圆机": "icon-elliptical",
  "单车": "icon-bike",
  "划船机": "icon-row",
  "双杠": "icon-parallel",
  "牧师椅": "icon-preacher",
  "爬楼机": "icon-stairs",
  "跳绳": "icon-rope"
};

const limitationShortNames = {
  "肩部不适": "肩部不适",
  "腰部不适": "腰部不适",
  "膝盖不适": "膝盖不适",
  "手腕不适": "手腕不适",
  "肘部不适": "肘部不适",
  "不适合高冲击": "不适合高冲击"
};

const muscleIconClass = {
  "胸": "icon-chest",
  "背": "icon-back",
  "肩": "icon-shoulder",
  "手臂": "icon-arm",
  "臀": "icon-glute",
  "腿": "icon-leg",
  "核心": "icon-core",
  "全身均衡": "icon-balance"
};

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

export function compactEquipment(values) {
  const priority = ["可调哑铃", "固定哑铃", "弹力带", "引体向上杆", "瑜伽垫", "器械推胸", "腿举机", "杠铃", "跑步机"];
  return [...values].sort((a, b) => {
    const ai = priority.indexOf(a);
    const bi = priority.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

export function renderTrainingOptionList(id, values, name, selected = []) {
  const selectedSet = new Set(selected);
  if (name === "training-styles") {
    return values.map(value => `
      <label class="preference-pill">
        <input type="checkbox" name="${name}" value="${escapeHtml(value)}" ${selectedSet.has(value) ? "checked" : ""}>
        <span>${escapeHtml(value)}</span>
      </label>
    `).join("");
  }

  const variant = name === "training-limitations" ? "limit" : name === "training-muscles" ? "muscle" : "equipment";
  const options = name === "training-equipment"
    ? equipmentGroups.filter(group => group.values.some(item => values.includes(item)))
    : values.map(value => ({ name: value, icon: name === "training-muscles" ? (muscleIconClass[value] || "icon-dot") : "icon-limit", values: [value] }));

  return options.map((option, index) => {
    const value = option.values[0];
    const display = name === "training-limitations"
        ? (limitationShortNames[value] || value)
        : option.name;
    const iconClass = option.icon || equipmentIconClass[display] || "icon-dot";
    const checked = option.values.some(item => selectedSet.has(item));
    return `
      <label class="selector-tile selector-${variant} ${index > 5 ? "is-extra" : ""}" data-chip-label="${escapeHtml(value)}">
        <input type="checkbox" name="${name}" value="${escapeHtml(value)}" data-values="${escapeHtml(option.values.join("|"))}" ${checked ? "checked" : ""}>
        <span class="selector-icon ${iconClass}" aria-hidden="true"></span>
        <span class="selector-name">${escapeHtml(display)}</span>
        <span class="selector-check" aria-hidden="true">✓</span>
      </label>
    `;
  }).join("");
}

function exerciseFamilyClass(exercise) {
  if (/胸/.test(exercise.category)) return "icon-chest";
  if (/背/.test(exercise.category)) return "icon-back";
  if (/肩/.test(exercise.category)) return "icon-shoulder";
  if (/手臂/.test(exercise.category)) return "icon-arm";
  if (/腿/.test(exercise.category)) return "icon-leg";
  if (/臀/.test(exercise.category)) return "icon-glute";
  if (/核心/.test(exercise.category)) return "icon-core";
  return "icon-dumbbell";
}

function musclesText(day) {
  if (day.isRest) return "恢复";
  const muscles = day.exercises
    .flatMap(exercise => exercise.targetMuscles || [])
    .filter((value, index, arr) => value && arr.indexOf(value) === index)
    .slice(0, 3);
  return muscles.length ? muscles.join("/") : day.theme;
}

function renderProgressSummary(day, completion = 0) {
  const calories = day?.estimatedCaloriesRange ? `${day.estimatedCaloriesRange.min}–${day.estimatedCaloriesRange.max}` : day?.estimatedCalories || 0;
  return `
    <section class="progress-summary">
      <div>
        <span>今日消耗（预计）</span>
        <strong>约 <b>${calories}</b> kcal</strong>
      </div>
      <div>
        <span>完成进度</span>
        <strong id="training-completion">${completion}%</strong>
      </div>
      <div class="fitness-progress"><span id="training-progress-bar" style="width:${completion}%"></span></div>
      <button class="start-workout-button" type="button">开始训练</button>
    </section>
  `;
}

function renderWeeklyPlanItem(day, index, activeIndex) {
  const complete = false;
  return `
    <button class="weekly-plan-item ${index === activeIndex ? "is-active" : ""} ${day.isRest ? "is-rest" : ""}" type="button" data-select-day="${index}" aria-pressed="${index === activeIndex}">
      <span class="day-icon ${day.isRest ? "icon-rest" : "icon-dumbbell"}" aria-hidden="true"></span>
      <span class="day-copy">
        <b>${dayLabels[index] || `第 ${index + 1} 天`}　${escapeHtml(day.isRest ? "休息" : day.theme)}</b>
        <small>${escapeHtml(musclesText(day))}</small>
      </span>
      <span class="day-status" aria-label="${complete ? "已完成" : day.isRest ? "休息日" : "未完成"}">${complete ? "✓" : day.isRest ? "休" : "○"}</span>
    </button>
  `;
}

function renderWeeklyPlanSidebar(plan, activeIndex) {
  const activeDay = plan.days[activeIndex] || plan.days.find(day => !day.isRest) || plan.days[0];
  return `
    <aside class="weekly-plan-card">
      <h3>本周计划概览</h3>
      <div class="weekly-plan-list">
        ${plan.days.map((day, index) => renderWeeklyPlanItem(day, index, activeIndex)).join("")}
      </div>
      ${renderProgressSummary(activeDay)}
      <p class="plan-generated-note"><span aria-hidden="true">✓</span> 计划基于你的目标和身体情况生成</p>
    </aside>
  `;
}

function renderWorkoutDayHeader(day, index) {
  const calories = day.estimatedCaloriesRange ? `${day.estimatedCaloriesRange.min}–${day.estimatedCaloriesRange.max}` : day.estimatedCalories;
  return `
    <header class="workout-detail-head">
      <div>
        <h2>${dayLabels[index] || day.day} · ${escapeHtml(day.isRest ? "休息" : day.theme)}</h2>
        <p>${day.isRest ? escapeHtml((day.recovery || []).join(" · ")) : `${escapeHtml(day.focus)} · 约 ${day.estimatedDuration} 分钟 · 约 ${calories} kcal`}</p>
      </div>
      <div class="day-actions">
        <button class="outline-action" type="button" data-next-day>更换训练日</button>
        <button class="solid-action" type="button">保存计划</button>
      </div>
    </header>
  `;
}

function renderWarmupCooldownCard(day) {
  return `
    <section class="warmup-card">
      <h3>热身与放松</h3>
      <p><b>热身：</b>${escapeHtml((day.warmup || []).join("，"))}。</p>
      <p><b>放松：</b>${escapeHtml((day.cooldown || []).join("，"))}。</p>
    </section>
  `;
}

function renderExerciseMetrics(exercise) {
  return `
    <div class="exercise-metrics">
      <div><strong>${exercise.sets}</strong><span>组数</span></div>
      <div><strong>${escapeHtml(exercise.reps)}</strong><span>次数</span></div>
      <div><strong>${exercise.restSeconds}</strong><span>组间休息/秒</span></div>
      <div><strong>${escapeHtml(exercise.intensity.replace("RIR ", ""))}</strong><span>建议强度 RIR</span></div>
    </div>
  `;
}

function renderExerciseInstructions(exercise) {
  return `
    <ul class="instruction-list">
      ${(exercise.instructions || []).map(step => `<li><span aria-hidden="true">✓</span>${escapeHtml(step)}</li>`).join("")}
    </ul>
    <details class="mistake-panel">
      <summary>查看常见错误</summary>
      <ul>${(exercise.commonMistakes || []).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </details>
  `;
}

function renderExerciseSetTracker(exercise, dayIndex, exerciseIndex) {
  const rows = Array.from({ length: Math.max(1, exercise.sets || 1) }, (_, index) => `
    <div class="set-row" data-set-index="${index}">
      <span>第${index + 1}组</span>
      <span>${escapeHtml(exercise.reps)}</span>
      <label><span>重量</span><input class="workout-log-input" data-log-field="weight" data-log-key="${dayIndex}:${exerciseIndex}:${index}" type="number" min="0" step="0.5" placeholder="20"></label>
      <label><span>次数</span><input class="workout-log-input" data-log-field="reps" data-log-key="${dayIndex}:${exerciseIndex}:${index}" type="text" placeholder="10"></label>
      <label><span>RIR</span><input class="workout-log-input" data-log-field="rir" data-log-key="${dayIndex}:${exerciseIndex}:${index}" type="text" placeholder="2"></label>
      <label class="set-check"><input class="set-complete" data-log-field="done" data-log-key="${dayIndex}:${exerciseIndex}:${index}" type="checkbox"><span>完成</span></label>
    </div>
  `).join("");
  return `
    <section class="set-tracker">
      <div class="set-header"><span>组次</span><span>目标</span><span>重量</span><span>实际次数</span><span>RIR</span><span>完成</span></div>
      ${rows}
      <label class="exercise-note">备注<input class="exercise-note-input" data-note-key="${dayIndex}:${exerciseIndex}" type="text" placeholder="记录动作感受、疼痛、动作调整等"></label>
    </section>
  `;
}

function renderExerciseCard(exercise, exerciseIndex, dayIndex) {
  return `
    <article class="exercise-card" data-day-index="${dayIndex}" data-exercise-index="${exerciseIndex}">
      <header class="exercise-card-head">
        <span class="exercise-index">${exerciseIndex + 1}</span>
        <div class="exercise-title-block">
          <h3>${escapeHtml(exercise.name)}</h3>
          <p>${escapeHtml(exercise.englishName)}</p>
          <div class="exercise-tags">
            ${(exercise.targetMuscles || []).slice(0, 3).map(item => `<span>${escapeHtml(item)}</span>`).join("")}
            <span>${escapeHtml(exercise.category)}</span>
          </div>
        </div>
        <div class="exercise-head-actions">
          <label class="exercise-complete-control">
            <input class="exercise-done" type="checkbox" data-exercise-done="${dayIndex}:${exerciseIndex}">
            <span>完成</span>
          </label>
          <button class="exercise-menu" type="button" data-open-sheet="${dayIndex}:${exerciseIndex}" aria-label="更换 ${escapeHtml(exercise.name)}">更换</button>
        </div>
      </header>
      <div class="exercise-card-body">
        <div class="exercise-core">
          ${renderExerciseMetrics(exercise)}
          ${renderExerciseInstructions(exercise)}
        </div>
      </div>
      ${renderExerciseSetTracker(exercise, dayIndex, exerciseIndex)}
      <footer class="exercise-actions">
        <button class="solid-action small" type="button">完成动作</button>
        <button class="outline-action small" type="button" data-open-sheet="${dayIndex}:${exerciseIndex}">更换动作</button>
        <button class="ghost-action small" type="button">跳过动作</button>
      </footer>
    </article>
  `;
}

function renderWorkoutDay(day, index, activeIndex) {
  if (day.isRest) {
    return `
      <article class="workout-day-detail ${index === activeIndex ? "is-active" : ""}" data-day-panel="${index}" ${index === activeIndex ? "" : "hidden"}>
        ${renderWorkoutDayHeader(day, index)}
        <section class="rest-detail-card">
          <h3>恢复建议</h3>
          <ul>${(day.recovery || []).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      </article>
    `;
  }
  return `
    <article class="workout-day-detail ${index === activeIndex ? "is-active" : ""}" data-day-panel="${index}" ${index === activeIndex ? "" : "hidden"}>
      ${renderWorkoutDayHeader(day, index)}
      ${renderWarmupCooldownCard(day)}
      <div class="exercise-stack">
        ${day.exercises.map((exercise, exerciseIndex) => renderExerciseCard(exercise, exerciseIndex, index)).join("")}
      </div>
      ${day.cardio ? `<section class="warmup-card cardio-soft"><h3>有氧安排</h3><p>${escapeHtml(day.cardio.name)} · ${escapeHtml(day.cardio.reps)} · ${escapeHtml(day.cardio.note)}</p></section>` : ""}
    </article>
  `;
}

export function renderFitnessDashboard(plan, options = {}) {
  const activeIndex = options.activeIndex ?? Math.max(0, plan.days.findIndex(day => !day.isRest));
  return `
    <div class="fitness-plan-grid">
      ${renderWeeklyPlanSidebar(plan, activeIndex)}
      <section class="workout-detail-card">
        ${plan.days.map((day, index) => renderWorkoutDay(day, index, activeIndex)).join("")}
      </section>
    </div>
    ${plan.warnings?.length ? `<div class="warning-list compact">${plan.warnings.map(item => `<p><span>!</span>${escapeHtml(item)}</p>`).join("")}</div>` : ""}
    <details class="plan-note modern-note">
      <summary>进阶、饮食联动与安全提示</summary>
      <p><b>进阶规则：</b>${plan.progression.join(" ")}</p>
      <p><b>饮食联动：</b>${escapeHtml(plan.nutritionLink)}</p>
      ${plan.safety.map(item => `<p>安全提示：${escapeHtml(item)}</p>`).join("")}
    </details>
    <div class="mobile-workout-actions">
      <button class="start-workout-button" type="button">开始训练</button>
      <span id="mobile-training-completion">0%</span>
    </div>
  `;
}

export function renderSheetOptions(alternatives, dayIndex, exerciseIndex) {
  return alternatives.length ? alternatives.map(item => `
    <button class="sheet-option" type="button" data-alt-id="${item.id}" data-day-index="${dayIndex}" data-exercise-index="${exerciseIndex}">
      <span class="selector-icon ${exerciseFamilyClass(item)}" aria-hidden="true"></span>
      <div><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.englishName)} · ${item.equipment.join("、")}</small></div>
    </button>
  `).join("") : `<p class="sheet-empty">当前设置下暂时没有更合适的替换动作。</p>`;
}
