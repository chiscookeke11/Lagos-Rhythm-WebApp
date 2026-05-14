#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectRoot = process.cwd();
const defaultServiceAccountPath = path.join(
  projectRoot,
  "lagos-rhythm-19b8a-firebase-adminsdk-fbsvc-e6381d0620.json"
);

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH || defaultServiceAccountPath;

const cliEmails = process.argv.slice(2).filter(Boolean);
const envEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);

const emails = [...new Set([...cliEmails, ...envEmails])];

if (!emails.length) {
  console.error(
    "Usage: node scripts/set-firebase-admin-claims.mjs <admin1@email> <admin2@email>"
  );
  process.exit(1);
}

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Service account JSON not found: ${serviceAccountPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const auth = getAuth();

let updated = 0;
let missing = 0;

for (const email of emails) {
  try {
    const user = await auth.getUserByEmail(email);
    const existing = user.customClaims || {};

    await auth.setCustomUserClaims(user.uid, {
      ...existing,
      admin: true,
    });

    console.log(`Updated admin claim for ${email} (uid: ${user.uid})`);
    updated += 1;
  } catch (error) {
    if (error?.code === "auth/user-not-found") {
      console.warn(`User not found in Firebase Auth: ${email}`);
      missing += 1;
      continue;
    }

    console.error(`Failed for ${email}: ${error?.message || String(error)}`);
  }
}

console.log(`Done. Updated: ${updated}, Missing: ${missing}`);
process.exit(0);
