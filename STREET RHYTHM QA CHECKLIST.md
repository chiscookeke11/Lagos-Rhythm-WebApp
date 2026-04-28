# Street Rhythm QA Checklist

Use this checklist before merge/release.

## 1. Environment Setup

- `.env.local` exists in app root.
- Firebase public keys are set.
- `GOOGLE_MAPS_API_KEY` is set.
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set.
- Dev server starts without Firebase config errors.

## 2. Search + Result Rendering

- Search route with existing data shows Route Details section.
- Search with no match shows "No Route Found" state.
- Route section order is:
  - Overview
  - Landmarks
  - Watch Route
  - Audio Guide

## 3. Overview

- Overview text is visible (not download-only).
- Fare information is displayed.
- Safety information is displayed.
- Download button appears when `overview_download_url` or `content_url` exists.

## 4. Landmarks

- Landmark cards use landmark title/name (not Step 1/Step 2 labels).
- Landmarks are swipeable.
- Modal opens on click and displays full-size image + metadata.
- Mobile modal remains usable and image is visible.

## 5. Videos + Segmented Playback

- Videos are grouped by language and swipeable.
- Segment start/end selectors show when `segment_stops` exists.
- "Play Matched Segment" seeks to segment start.
- Playback pauses at segment end.

## 6. Audio Guide

- Audio guides are grouped by language and swipeable.
- Audio playback works for each language asset.
- Pidgin audio exists for active routes (or warning is known).

## 7. Travel Time + Maps

- Travel time section shows:
  - normal duration
  - current duration with traffic
- Values update periodically.
- Google Map renders route path from selected from/to.
- Traffic layer appears on map.

## 8. Arrival Notifications

- User can start tracking with "Notify Me When Arriving".
- Browser asks notification permission.
- Distance updates during movement.
- Notifications fire at approximately:
  - 5 km
  - 1 km
  - 500 m
- Stop Tracking button cancels watcher.

## 9. Community Chat

- Chat loads latest 50 messages in realtime.
- Signed-in user can post message.
- Anonymous user can read but cannot post.
- Cooldown and duplicate suppression work.
- Link limit guard works.
- Message reporting submits moderation record.

## 10. Data + Security

- `npm run street-rhythm:validate` passes for seed/import file.
- Firestore rules deployed (`firestore.rules`).
- Firestore indexes deployed (`firestore.indexes.json`).
- Chat writes obey rules and unauthorized writes are blocked.
