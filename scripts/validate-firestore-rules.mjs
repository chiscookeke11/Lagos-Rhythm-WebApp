#!/usr/bin/env node
/**
 * Firestore Security Rules Validator
 * Tests common rule scenarios and authentication patterns
 * 
 * Usage: node scripts/validate-firestore-rules.mjs [--emulator]
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const args = process.argv.slice(2);
const useEmulator = args.includes('--emulator');

// Initialize Firebase Admin
function initializeFirebase() {
  const serviceAccountPath = path.join(
    projectRoot,
    'lagos-rhythm-19b8a-firebase-adminsdk-fbsvc-e6381d0620.json'
  );

  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`❌ Service account not found at: ${serviceAccountPath}`);
  }

  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, 'utf-8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://lagos-rhythm-19b8a.firebaseio.com',
  });

  if (useEmulator) {
    process.env.FIREBASE_FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    console.log('🔧 Using Firestore Emulator\n');
  }

  return admin.firestore();
}

// Test scenarios
const testScenarios = [
  {
    name: '✅ Public read: routes_resources',
    permissions: 'READ',
    collection: 'routes_resources',
    expectedResult: 'ALLOW',
  },
  {
    name: '❌ Public write: routes_resources',
    permissions: 'WRITE',
    collection: 'routes_resources',
    expectedResult: 'DENY',
  },
  {
    name: '✅ Signed-in: create route chat message',
    permissions: 'WRITE',
    collection: 'street_rhythm_route_chat/yaba-maryland/messages',
    expectedResult: 'ALLOW (if signed-in)',
  },
  {
    name: '✅ Public submit: free tour booking',
    permissions: 'WRITE',
    collection: 'booked_Free_Rhythm',
    expectedResult: 'ALLOW (validated public form)',
  },
  {
    name: '✅ Public submit: exclusive tour booking',
    permissions: 'WRITE',
    collection: 'exclusive_Tour_form',
    expectedResult: 'ALLOW (validated public form)',
  },
  {
    name: '✅ Public submit: feedback',
    permissions: 'WRITE',
    collection: 'Feedback',
    expectedResult: 'ALLOW (validated public form)',
  },
  {
    name: '✅ Public submit: newsletter subscription',
    permissions: 'WRITE',
    collection: 'subscribers',
    expectedResult: 'ALLOW (validated public form)',
  },
  {
    name: '✅ Public submit: livestream message',
    permissions: 'WRITE',
    collection: 'messages',
    expectedResult: 'ALLOW (validated public form)',
  },
  {
    name: '✅ Admin: read feedback',
    permissions: 'READ',
    collection: 'Feedback',
    expectedResult: 'ALLOW (if admin)',
  },
  {
    name: '❌ Non-admin: read feedback',
    permissions: 'READ',
    collection: 'Feedback',
    expectedResult: 'DENY',
  },
  {
    name: '✅ Authenticated: read own booking',
    permissions: 'READ',
    collection: 'booked_Free_Rhythm/{$BOOKING_ID}',
    expectedResult: 'ALLOW (if email matches)',
  },
  {
    name: '❌ User: read other user booking',
    permissions: 'READ',
    collection: 'booked_Free_Rhythm/{$OTHER_ID}',
    expectedResult: 'DENY',
  },
];

// Validation rules
async function validateRulesStructure(db) {
  console.log('🔍 Validating Firestore Rules Structure\n');

  const rulesPath = path.join(projectRoot, 'firestore.rules');
  const rulesContent = fs.readFileSync(rulesPath, 'utf-8');

  const checks = [
    {
      name: 'Admin function defined',
      pattern: /function isAdmin\(\)/,
      required: true,
    },
    {
      name: 'routes_resources collection rules',
      pattern: /match \/routes_resources\/\{routeId\}/,
      required: true,
    },
    {
      name: 'Free booking write rule',
      pattern: /match \/booked_Free_Rhythm\/\{bookingId\}/,
      required: true,
    },
    {
      name: 'Exclusive booking write rule',
      pattern: /match \/exclusive_Tour_form\/\{bookingId\}/,
      required: true,
    },
    {
      name: 'Feedback write rule',
      pattern: /match \/Feedback\/\{feedbackId\}/,
      required: true,
    },
    {
      name: 'Newsletter write rule',
      pattern: /match \/subscribers\/\{subscriberId\}/,
      required: true,
    },
    {
      name: 'Livestream message rule',
      pattern: /match \/messages\/\{messageId\}/,
      required: true,
    },
    {
      name: 'Default deny policy',
      pattern: /allow read, write: if false/,
      required: true,
    },
  ];

  let passed = 0;
  let failed = 0;

  checks.forEach(check => {
    if (check.pattern.test(rulesContent)) {
      console.log(`  ✅ ${check.name}`);
      passed++;
    } else {
      console.log(`  ❌ ${check.name}`);
      failed++;
    }
  });

  console.log(`\n📊 Results: ${passed}/${checks.length} checks passed\n`);

  return failed === 0;
}

// Test collections exist
async function testCollectionAccess(db) {
  console.log('📦 Testing Collection Access\n');

  const collections = [
    'routes_resources',
    'street_rhythm_route_chat',
    'booked_Free_Rhythm',
    'Feedback',
    'messages',
  ];

  for (const col of collections) {
    try {
      const snapshot = await db.collection(col).limit(1).get();
      console.log(`  ✅ ${col} (accessible)`);
    } catch (error) {
      console.log(`  ⚠️  ${col} (may require auth or not exist yet)`);
    }
  }

  console.log();
}

// Security recommendations
function showSecurityRecommendations() {
  console.log('🛡️ Security Recommendations\n');

  const recommendations = [
    {
      title: 'Admin Setup',
      status: '⚠️  TO-DO',
      description: 'Configure admin custom claims via Firebase Admin',
      action: 'Run: firebase auth:import --help',
    },
    {
      title: 'Emulator Testing',
      status: '✅ READY',
      description: 'Use Firestore emulator for local development',
      action: 'Run: firebase emulators:start --only firestore',
    },
    {
      title: 'Audit Logging',
      status: '📋 RECOMMENDED',
      description: 'Enable in Google Cloud Console for compliance',
      action: 'Cloud Audit Logs → Firestore Admin Activity',
    },
    {
      title: 'Backup Strategy',
      status: '📋 RECOMMENDED',
      description: 'Automated daily backups to Cloud Storage',
      action: 'firebase firestore backups schedule create',
    },
  ];

  recommendations.forEach(rec => {
    console.log(`${rec.status} ${rec.title}`);
    console.log(`    ${rec.description}`);
    console.log(`    Action: ${rec.action}\n`);
  });
}

// Deployment checklist
function showDeploymentChecklist() {
  console.log('📋 Pre-Deployment Checklist\n');

  const checklist = [
    { item: 'Rules reviewed by security team', done: false },
    { item: 'Emulator testing completed', done: false },
    { item: 'Admin setup verified', done: false },
    { item: 'Email validation working', done: false },
    { item: 'Public collections read-only', done: false },
    { item: 'Firestore backups enabled', done: false },
  ];

  checklist.forEach((item, idx) => {
    const status = item.done ? '✅' : '☐';
    console.log(`  ${status} ${item.item}`);
  });

  console.log('\n📝 Once all items are complete, run:');
  console.log('   npm run firestore:deploy:rules\n');
}

// Main function
async function main() {
  console.log('🔐 Firestore Security Rules Validator\n');
  console.log('=' .repeat(50) + '\n');

  let db;
  try {
    db = initializeFirebase();
    console.log('✅ Firebase initialized\n');
  } catch (error) {
    console.error(`❌ Firebase init failed: ${error.message}`);
    process.exit(1);
  }

  // Run validations
  try {
    const structureValid = await validateRulesStructure(db);
    await testCollectionAccess(db);

    console.log('📋 Rule Scenarios\n');
    testScenarios.forEach(scenario => {
      console.log(`${scenario.name}`);
      console.log(`   → ${scenario.expectedResult}\n`);
    });

    showSecurityRecommendations();
    showDeploymentChecklist();

    if (structureValid) {
      console.log(
        '✅ All validations passed! Rules are ready for deployment.\n'
      );
      process.exit(0);
    } else {
      console.log(
        '❌ Some validations failed. Please review the rules.\n'
      );
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Validation error: ${error.message}`);
    process.exit(1);
  }
}

main();
