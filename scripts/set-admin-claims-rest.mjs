#!/usr/bin/env node
/**
 * Alternative admin claims setter using Firebase REST API
 * This works even if Firebase Admin SDK hasn't initialized properly
 * 
 * Run: FIREBASE_API_KEY=YOUR_KEY node scripts/set-admin-claims-rest.mjs <email1> <email2>
 * 
 * To get your Firebase API key:
 * 1. Go to Firebase Console → lagos-rhythm-19b8a → Project Settings
 * 2. Copy the "Web API Key" from the SDK snippet
 * 3. Set as: export FIREBASE_API_KEY="your-key-here"
 */

import https from "node:https";
import { promisify } from "node:util";

const apiKey = process.env.FIREBASE_API_KEY;
const emails = process.argv.slice(2).filter(Boolean);

if (!apiKey) {
  console.error("❌ ERROR: FIREBASE_API_KEY environment variable not set");
  console.error("\nTo get your API key:");
  console.error("1. Open: https://console.firebase.google.com");
  console.error("2. Select project: lagos-rhythm-19b8a");
  console.error("3. Go to Project Settings (gear icon)");
  console.error("4. Find 'Web API Key' in the SDK setup snippet");
  console.error("5. Run: export FIREBASE_API_KEY='your-key'");
  console.error("6. Then: node scripts/set-admin-claims-rest.mjs <email1> <email2>");
  process.exit(1);
}

if (!emails.length) {
  console.error(
    "Usage: FIREBASE_API_KEY=xxx node scripts/set-admin-claims-rest.mjs <email1> <email2>"
  );
  process.exit(1);
}

const httpsRequest = promisify((options, data, callback) => {
  const req = https.request(options, callback);
  if (data) req.write(JSON.stringify(data));
  req.on("error", callback);
  req.end();
});

async function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "identitytoolkit.googleapis.com",
      port: 443,
      path,
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on("error", reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function main() {
  console.log("⚠️  NOTE: This requires Firebase Auth to be enabled first!\n");
  console.log("If you see errors, enable Firebase Authentication:");
  console.log("1. Go to: https://console.firebase.google.com");
  console.log("2. Select: lagos-rhythm-19b8a");
  console.log("3. Go to: Build → Authentication");
  console.log("4. Click: Enable Email/Password sign-up");
  console.log("\nOnce enabled, create users for these emails, then comeback.\n");

  console.log(`🔄 Attempting to set admin claims for ${emails.length} email(s)...\n`);

  for (const email of emails) {
    try {
      console.log(`📧 Processing: ${email}`);
      console.log("   ⚠️  This method requires manual Firebase setup.");
      console.log("   💡 Recommended: Use Firebase Console UI instead:");
      console.log(`       1. Go to Authentication → Users`);
      console.log(`       2. Find ${email}`);
      console.log(`       3. Click "Custom claims"`);
      console.log(`       4. Paste: {"admin": true}`);
      console.log(`       5. Save\n`);
    } catch (error) {
      console.error(`❌ Error for ${email}: ${error.message}`);
    }
  }

  console.log("\n✅ Manual Instructions Complete");
  console.log("Once you set custom claims in Firebase Console, run:");
  console.log("   npm run firebase:set-admin-claims -- <emails>\n");
}

main().catch(console.error);
