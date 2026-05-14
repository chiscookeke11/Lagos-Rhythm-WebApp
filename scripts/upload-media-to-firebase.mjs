#!/usr/bin/env node
/**
 * Firebase Media Upload Script
 * Uploads Street Rhythm media files to Firebase Cloud Storage
 * 
 * Usage: node scripts/upload-media-to-firebase.mjs [--media-dir path/to/media] [--dry-run]
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Parse command line args
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const mediaDir = args.find(arg => arg.startsWith('--media-dir='))?.split('=')[1] || path.join(projectRoot, 'media');

// Media files to upload: [ sourceFile, destinationPath ]
const MEDIA_FILES = [
  ['pdf/yaba-maryland-guide.pdf', 'media/pdf/yaba-maryland-guide.pdf'],
  ['audio/english/yaba-maryland-english.mp3', 'media/audio/english/yaba-maryland-english.mp3'],
  ['audio/pidgin/yaba-maryland-pidgin.mp3', 'media/audio/pidgin/yaba-maryland-pidgin.mp3'],
  ['images/routes/ojuelegba-bridge.jpg', 'media/images/routes/ojuelegba-bridge.jpg'],
  ['videos/tours/yaba-maryland.mp4', 'media/videos/tours/yaba-maryland.mp4'],
];

// Initialize Firebase Admin SDK
function initializeFirebase() {
  const serviceAccountPath = path.join(projectRoot, 'lagos-rhythm-19b8a-firebase-adminsdk-fbsvc-e6381d0620.json');
  
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`❌ Service account not found at: ${serviceAccountPath}`);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'lagos-rhythm-19b8a.firebasestorage.app',
  });

  return admin.storage().bucket();
}

// Upload a single file
async function uploadFile(bucket, sourceFile, destinationPath) {
  const fullSourcePath = path.join(mediaDir, sourceFile);
  
  if (!fs.existsSync(fullSourcePath)) {
    console.warn(`⚠️  File not found: ${fullSourcePath}`);
    return { success: false, sourceFile, reason: 'File not found' };
  }

  console.log(`📤 Uploading: ${sourceFile} → ${destinationPath}`);

  if (isDryRun) {
    console.log(`   [DRY RUN] Would upload to: gs://lagos-rhythm-19b8a.firebasestorage.app/${destinationPath}`);
    return { success: true, sourceFile, destinationPath, dryRun: true };
  }

  try {
    const response = await bucket.upload(fullSourcePath, {
      destination: destinationPath,
      metadata: {
        cacheControl: 'public, max-age=86400', // 24 hour cache
      },
    });

    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/lagos-rhythm-19b8a.firebasestorage.app/o/${encodeURIComponent(destinationPath)}?alt=media`;
    console.log(`✅ Uploaded successfully`);
    console.log(`   URL: ${publicUrl}`);

    return { success: true, sourceFile, destinationPath, url: publicUrl };
  } catch (error) {
    console.error(`❌ Upload failed: ${error.message}`);
    return { success: false, sourceFile, reason: error.message };
  }
}

// Main upload function
async function uploadAllMedia() {
  console.log('🚀 Firebase Media Upload Script\n');
  console.log(`Firebase Project: lagos-rhythm-19b8a`);
  console.log(`Storage Bucket: lagos-rhythm-19b8a.firebasestorage.app`);
  console.log(`Media Directory: ${mediaDir}`);
  console.log(`Dry Run: ${isDryRun ? 'YES' : 'NO'}\n`);

  // Validate media directory
  if (!fs.existsSync(mediaDir)) {
    console.warn(`⚠️  Media directory not found: ${mediaDir}`);
    console.log(`\n📁 Please create the directory and add your media files:\n`);
    MEDIA_FILES.forEach(([file]) => {
      console.log(`   ${path.join(mediaDir, file)}`);
    });
    process.exit(1);
  }

  let bucket;
  try {
    bucket = initializeFirebase();
    console.log('✅ Firebase initialized\n');
  } catch (error) {
    console.error(`❌ Firebase initialization failed: ${error.message}`);
    process.exit(1);
  }

  const results = [];
  for (const [sourceFile, destinationPath] of MEDIA_FILES) {
    const result = await uploadFile(bucket, sourceFile, destinationPath);
    results.push(result);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Upload Summary');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successful: ${successful.length}/${MEDIA_FILES.length}`);
  console.log(`❌ Failed: ${failed.length}/${MEDIA_FILES.length}`);

  if (failed.length > 0) {
    console.log('\nFailed uploads:');
    failed.forEach(r => {
      console.log(`  - ${r.sourceFile}: ${r.reason}`);
    });
  }

  if (isDryRun) {
    console.log('\n[DRY RUN] No files were actually uploaded. Remove --dry-run to upload.');
  } else if (successful.length === MEDIA_FILES.length) {
    console.log('\n🎉 All media files uploaded successfully!');
    console.log('\nYou can now import routes into Firestore:');
    console.log('  npm run street-rhythm:import');
  }

  process.exit(failed.length > 0 ? 1 : 0);
}

uploadAllMedia().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
