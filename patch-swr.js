const fs = require("fs");
const path = require("path");

const swrPath = path.join(__dirname, "node_modules/swr/core/dist/index.mjs");

let content = fs.readFileSync(swrPath, "utf-8");

if (!content.includes("export default")) {
  fs.appendFileSync(swrPath, "\nexport default null;\n");
  console.log("✅ Patched SWR to include default export");
} else {
  console.log("⚠️ SWR already patched");
}
