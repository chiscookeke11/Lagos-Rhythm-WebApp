import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectRoot = process.cwd();
const inputPath =
  process.argv[2] ??
  path.join(projectRoot, "data", "street-rhythm-route-seed.template.json");

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT_PATH env var.");
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`Seed file not found: ${inputPath}`);
  process.exit(1);
}

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Service account JSON not found: ${serviceAccountPath}`);
  process.exit(1);
}

const seedRecords = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

for (const record of seedRecords) {
  const docId =
    record.id ??
    `${record.route_key}-${record.type}-${record.language ?? "general"}-${record.order ?? 0}`;

  const { id, ...payload } = record;
  await db.collection("routes_resources").doc(docId).set(payload, { merge: true });
  console.log(`Upserted ${docId}`);
}

console.log(`Imported ${seedRecords.length} Street Rhythm records into routes_resources.`);
