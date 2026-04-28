import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const inputPath =
  process.argv[2] ??
  path.join(projectRoot, "data", "street-rhythm-route-seed.template.json");

const requiredBaseFields = [
  "type",
  "route_key",
  "from_location",
  "to_location",
  "from_normalized",
  "to_normalized",
  "from_keywords",
  "to_keywords",
  "content_url",
  "description",
  "tags",
];

function fail(message) {
  console.error(`Validation failed: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(inputPath)) {
  fail(`File not found: ${inputPath}`);
  process.exit();
}

const payload = JSON.parse(fs.readFileSync(inputPath, "utf8"));

if (!Array.isArray(payload)) {
  fail("Seed file must export a JSON array.");
  process.exit();
}

const routeAudioLanguages = new Map();

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

payload.forEach((item, index) => {
  for (const field of requiredBaseFields) {
    if (!(field in item)) {
      fail(`Item ${index} is missing required field "${field}".`);
    }
  }

  if (!Array.isArray(item.from_keywords) || !Array.isArray(item.to_keywords) || !Array.isArray(item.tags)) {
    fail(`Item ${index} must provide arrays for from_keywords, to_keywords, and tags.`);
  }

  if (item.type === "sound") {
    const existing = routeAudioLanguages.get(item.route_key) ?? new Set();
    if (item.language) existing.add(String(item.language).toLowerCase());
    routeAudioLanguages.set(item.route_key, existing);
  }

  if (item.type === "video" && item.segment_stops !== undefined) {
    if (!Array.isArray(item.segment_stops)) {
      fail(`Item ${index} has invalid segment_stops. Expected an array.`);
      return;
    }

    item.segment_stops.forEach((stop, stopIndex) => {
      if (!stop || typeof stop !== "object") {
        fail(`Item ${index} segment_stops[${stopIndex}] must be an object.`);
        return;
      }

      if (!stop.stop_name || String(stop.stop_name).trim().length < 1) {
        fail(`Item ${index} segment_stops[${stopIndex}] is missing stop_name.`);
      }

      const hasStart = isFiniteNumber(stop.video_start);
      const hasEnd = isFiniteNumber(stop.video_end);

      if (hasStart && stop.video_start < 0) {
        fail(`Item ${index} segment_stops[${stopIndex}] has negative video_start.`);
      }

      if (hasEnd && stop.video_end < 0) {
        fail(`Item ${index} segment_stops[${stopIndex}] has negative video_end.`);
      }

      if (hasStart && hasEnd && stop.video_start >= stop.video_end) {
        fail(`Item ${index} segment_stops[${stopIndex}] has video_start >= video_end.`);
      }
    });
  }
});

for (const [routeKey, languages] of routeAudioLanguages.entries()) {
  if (!languages.has("pidgin")) {
    console.warn(`Warning: route "${routeKey}" does not include a pidgin audio guide.`);
  }
}

if (!process.exitCode) {
  console.log(`Street Rhythm validation passed for ${payload.length} records.`);
}
