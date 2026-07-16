import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const ui = await readFile(new URL("../fitness-ui.js", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

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
assert.ok(ui.includes("renderExercisePreviewSvg") && ui.includes("data-preview-type"), "exercise cards should render real local SVG previews");
assert.ok(css.includes(".media-figure.has-preview") && css.includes(".exercise-preview-svg"), "exercise preview SVG styles should be present");
assert.ok(html.includes("fitness-ui15") && app.includes("fitness-ui15"), "cache-busting asset versions should be updated");

console.log("Fitness UI audit tests passed: 10 cases");
