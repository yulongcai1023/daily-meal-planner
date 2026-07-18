const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "dist");
const files = ["index.html", "styles.css", "app.js", "recipe-engine.js", "workout-engine.js", "fitness-ui.js"];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(outDir, file));
}

const fitnessIconsDir = path.join(root, "assets", "fitness-icons");
if (fs.existsSync(fitnessIconsDir)) {
  fs.cpSync(fitnessIconsDir, path.join(outDir, "assets", "fitness-icons"), { recursive: true });
}

console.log(`Built static site in ${path.relative(root, outDir)}`);
