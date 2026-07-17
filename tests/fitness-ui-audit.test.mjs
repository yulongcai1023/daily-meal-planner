import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const ui = await readFile(new URL("../fitness-ui.js", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const build = await readFile(new URL("../scripts/build-static.cjs", import.meta.url), "utf8");

const experienceLabels = [...html.matchAll(/name="experience-segment" value="([^"]+)"[^>]*><span>([^<]+)<\/span>/g)]
  .map(match => ({ value: match[1], label: match[2] }));

assert.deepEqual(
  experienceLabels.map(item => item.label),
  ["完全新手", "新手", "初级", "中级", "高级"],
  "training experience should render one five-level segment"
);
assert.equal(new Set(experienceLabels.map(item => item.value)).size, 5, "experience values should not duplicate");
assert.ok(!html.includes(">Ready<"), "internal Ready state should not be shown to users");
assert.ok(html.includes('data-fitness-panel="library"'), "fitness sidebar items should expose panel targets");
assert.ok(app.includes("syncSecondaryGoalOptions"), "primary/secondary goal sync should be implemented");
assert.ok(app.includes("validateTrainingSettings"), "submit-time training validation should be implemented");
assert.ok(ui.includes("estimatedCaloriesRange"), "calorie display should use an estimate range");
assert.ok(!ui.includes("renderExerciseMedia") && !ui.includes("data-preview-open"), "exercise image previews should not render in workout cards");
assert.ok(!html.includes("exercise-preview-modal") && !app.includes("openExercisePreview"), "enlarged exercise preview modal should be removed");
assert.ok(!ui.includes("assets/exercises/") && !css.includes(".media-figure.has-preview"), "exercise image asset references should be removed from UI and CSS");
assert.ok(!build.includes("fs.cpSync") && !build.includes("\"assets\""), "static build should no longer copy exercise image assets");
assert.ok(html.includes("fitness-ui23") && app.includes("fitness-ui23"), "cache-busting asset versions should be updated");
assert.ok(html.includes('id="equipment-subcard"') && app.includes("syncEquipmentVisibility"), "home no-equipment location should hide the equipment selector");
assert.ok(app.includes('trainingLocation === "homeNone" ? ["无器械"]') || app.includes("trainingLocation === \"homeNone\" ? [\"无器械\"]"), "home no-equipment location should force bodyweight equipment");
assert.ok(ui.includes("renderExercisePager") && ui.includes("data-exercise-page-step"), "workout exercises should render as paged panels");
assert.ok(app.includes("selectExercisePage") && css.includes(".exercise-pager"), "exercise pager should be interactive and styled");
assert.ok(app.includes("syncExerciseCompletionFromSets") && app.includes('input.classList.contains("set-complete")'), "finishing all sets should auto-complete the exercise");
assert.ok(app.includes("setExerciseSetsCompletion") && app.includes(".exercise-actions .solid-action"), "manual complete action should complete all set rows");
assert.ok(css.includes(".selector-grid-muscles") && css.includes("repeat(2"), "muscle focus grid should stay compact without clipping options");
assert.ok(css.includes("align-content: start") && css.includes("grid-auto-rows: min-content"), "preference option cards should not stretch vertically");
assert.ok(css.includes("overflow: hidden") && css.includes("repeat(auto-fit"), "preference cards should contain auto-fit option grids without overlap");
assert.ok(css.includes("align-items: stretch") && css.includes("height: 100%"), "preference cards should keep equal row height");
assert.ok(app.includes("is-hidden-option") && app.includes('noEquipmentInput.checked = false'), "bodyweight equipment option should hide outside home no-equipment mode");
assert.ok(ui.includes("limitationIconClass") && ui.includes("icon-limit-shoulder"), "body limitation options should use specific body-part icons");
assert.ok(css.includes("--icon-mask") && css.includes("radial-gradient(circle") && css.includes(".selector-limit .selector-icon::after"), "selector icons should use line-art circle UI with limitation no-entry badge");

console.log("Fitness UI audit tests passed: 25 cases");
