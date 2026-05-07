#!/usr/bin/env node
/**
 * Diagnostic script to verify Firebase project setup
 * Run: node scripts/diagnose-firebase.mjs
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const projectId = "lagos-rhythm-19b8a";
const serviceAccountPath = path.join(
  process.cwd(),
  "lagos-rhythm-19b8a-firebase-adminsdk-fbsvc-e6381d0620.json"
);

console.log("🔍 Firebase Project Diagnostic Tool\n");

// 1. Check service account file
console.log("1. Service Account File:");
if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  console.log("   ✅ Service account found");
  console.log(`   📧 Email: ${serviceAccount.client_email}`);
  console.log(`   🔑 Private key ID: ${serviceAccount.private_key_id}`);
} else {
  console.log("   ❌ Service account JSON not found");
}

// 2. Check .firebaserc
console.log("\n2. Firebase Configuration (.firebaserc):");
if (fs.existsSync(".firebaserc")) {
  const config = JSON.parse(fs.readFileSync(".firebaserc", "utf8"));
  console.log("   ✅ .firebaserc found");
  console.log(`   📌 Default project: ${config.projects.default}`);
} else {
  console.log("   ❌ .firebaserc not found");
}

// 3. Check firebase.json
console.log("\n3. Firebase Configuration (firebase.json):");
if (fs.existsSync("firebase.json")) {
  const config = JSON.parse(fs.readFileSync("firebase.json", "utf8"));
  console.log("   ✅ firebase.json found");
  console.log("   📋 Enabled services:", Object.keys(config).join(", "));
} else {
  console.log("   ❌ firebase.json not found");
}

// 4. GCP API Status (requires service account token - not implemented here)
console.log("\n4. GCP API Status:");
console.log(
  "   ⚠️  Cannot check dynamically (requires GCP authentication)"
);
console.log("   🔗 To verify, go to:");
console.log(
  "      https://console.cloud.google.com/apis/api/identitytoolkit.googleapis.com"
);
console.log("      (Firebase Authentication API)");

console.log("\n📋 Manual Verification Steps:");
console.log("1. Open Firebase Console: https://console.firebase.google.com");
console.log(`2. Select project: ${projectId}`);
console.log("3. Go to Build → Authentication");
console.log("4. Check if any Sign-in methods are enabled");
console.log("5. If not, click 'Get Started' and enable Email/Password");

console.log("\n✅ If all checks pass above, then the issue is:");
console.log("   → Firebase Authentication is not enabled in the GCP project");
console.log("   → OR no users exist for the admin emails");

process.exit(0);
