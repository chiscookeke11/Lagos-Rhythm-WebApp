# Street Rhythm Changelog

## Scope

This changelog tracks implementation against `STREET RHYTHM CORRECTIONS.md`.

## Implemented

- Fixed search result/empty-state rendering on Street Rhythm page.
- Refactored Route Details into ordered sections:
  - Overview
  - Landmarks
  - Watch Route
  - Audio Guide
- Reworked Overview to show text + fare + safety + download action.
- Replaced generic step labels with data-driven landmark names.
- Added swipeable carousels for overview, landmarks, video, and audio sections.
- Improved mobile landmark modal for full-size image preview.
- Added normalized route model + grouping/sorting helpers.
- Extended route schema/types for new Street Rhythm fields.
- Added migration seed template + validation + Firestore import scripts.
- Added travel-time API and UI (normal vs traffic duration).
- Added Google Maps route rendering with traffic layer.
- Added arrival notification flow with threshold alerts (5km, 1km, 500m).
- Added segmented playback with optional explicit stop selectors.
- Added stop-to-stop route search fallback using `segment_stops` metadata.
- Expanded the seed route video with multiple named segment stops for
  Jibowu → Anthony → Maryland playback.
- Added route-scoped realtime community chat.
- Added chat anti-spam controls (cooldown, duplicate suppression, link cap).
- Added message reporting flow to moderation queue.
- Added Firestore security rules and indexes files for chat/report features.
- Added deployment runbook for chat rules/indexes.

## Supporting Hardening

- Added `.env.example` template.
- Added Firebase env validation with actionable startup errors.
- Fixed Next metadata viewport warning in app layout.
- Fixed malformed README and replaced with valid project docs.

## Deployment Artifacts

- `firestore.rules`
- `firestore.indexes.json`
- `FIREBASE_CHAT_DEPLOYMENT.md`

## Remaining External Work

- Deploy Firestore rules and indexes to the target Firebase project.
- Populate/verify production route media assets, including Pidgin coverage.
- Run full QA pass using `STREET RHYTHM QA CHECKLIST.md`.
