# Firebase Chat Deployment (Street Rhythm)

This guide deploys Street Rhythm chat security rules and indexes.

## Files

- `firestore.rules`
- `firestore.indexes.json`
- `firebase.json`
- `.firebaserc`

## Prerequisites

- Firebase project configured
- Firebase CLI installed globally or via `npx firebase-tools`
- Access to deploy Firestore rules/indexes

## 1. Login and select project

```bash
npx --yes firebase-tools login
npx --yes firebase-tools use <your-project-id>
```

If you use the committed `.firebaserc` template, replace
`your-firebase-project-id` with your real Firebase project id first.

## 2. Deploy Firestore rules

```bash
npx --yes firebase-tools deploy --only firestore:rules
```

## 3. Deploy Firestore indexes

```bash
npx --yes firebase-tools deploy --only firestore:indexes
```

## 4. Verify chat permissions

Expected behavior after deployment:

- Anyone can read route chat messages.
- Only signed-in users can create chat messages.
- Signed-in users can submit message reports.
- No client update/delete is allowed for chat messages.

## 5. Smoke test

1. Open Street Rhythm route details.
2. Sign in and post a chat update.
3. Confirm message appears in real time.
4. Report a message and confirm report document appears in Firestore:
   - `street_rhythm_route_chat_reports/{report_id}`
