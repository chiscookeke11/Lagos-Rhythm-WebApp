# Street Rhythm Route Resource Shape

This document defines the Street Rhythm route resource shape for the current
implementation sprint. It documents the fields the frontend can render now and
the near-term fields we are reserving before maps, notifications, and segmented
route playback are implemented.

## Collection

- Firestore collection: `routes_resources`

## Current Rendering Model

Each route is currently assembled from multiple documents that share the same
`route_key`. Those documents are split by content type:

- `text` for overview content
- `image` for landmarks
- `video` for route playback
- `sound` for audio guides
- `ai` for AI-generated direction content

## Required Base Fields

| Field             | Type       | Notes                                         |
| ----------------- | ---------- | --------------------------------------------- |
| `id`              | `string`   | Firestore document id, injected client-side   |
| `type`            | `string`   | `text`, `image`, `video`, `sound`, or `ai`    |
| `route_key`       | `string`   | Shared route identifier across related assets |
| `from_location`   | `string`   | Human-readable start location                 |
| `to_location`     | `string`   | Human-readable destination                    |
| `from_normalized` | `string`   | Normalized start location                     |
| `to_normalized`   | `string`   | Normalized destination                        |
| `from_keywords`   | `string[]` | Searchable start aliases                      |
| `to_keywords`     | `string[]` | Searchable destination aliases                |
| `content_url`     | `string`   | Primary media or document URL                 |
| `description`     | `string`   | Summary or description for the asset          |
| `tags`            | `string[]` | Route metadata tags                           |

## Optional Fields Supported In This Sprint

| Field                   | Type                 | Used For                                    |
| ----------------------- | -------------------- | ------------------------------------------- |
| `language`              | `string`             | Distinguishes English, Pidgin, Yoruba, etc. |
| `order`                 | `number`             | Sort order within the route                 |
| `title`                 | `string`             | Content card title                          |
| `subtitle`              | `string`             | Supporting label or subheading              |
| `summary`               | `string`             | Alternate overview copy                     |
| `content_text`          | `string`             | Full visible overview text                  |
| `overview_download_url` | `string`             | Optional alternate download URL             |
| `download_label`        | `string`             | Download button label                       |
| `fare_info`             | `string`             | Fare guidance shown in the overview section |
| `safety_info`           | `string`             | Safety notes shown in the overview section  |
| `landmark_title`        | `string`             | Preferred landmark display title            |
| `landmark_name`         | `string`             | Fallback landmark display title             |
| `step_images`           | `string[]`           | Reserved for grouped multi-image content    |
| `segment_stops`         | `RouteSegmentStop[]` | Reserved for segmented playback work        |

## Optional Fields By Content Type

### `text`

Use these to power the Overview section:

- `title`
- `subtitle`
- `content_text`
- `summary`
- `fare_info`
- `safety_info`
- `overview_download_url`
- `download_label`
- `language`

### `image`

Use these to power the Landmarks section:

- `landmark_title`
- `landmark_name`
- `subtitle`
- `description`
- `order`

### `video`

Use these to power the Watch Route section:

- `title`
- `subtitle`
- `language`
- `order`

### `sound`

Use these to power the Audio Guide section:

- `title`
- `subtitle`
- `language`
- `order`

## Frontend Normalization Rules

The current frontend now applies these rules before rendering:

1. Documents are grouped into one route bundle by shared `route_key`.
2. Documents are ordered by `order` ascending.
3. If two items share the same `order`, the frontend falls back to title-based sorting.
4. Overview, video, and audio assets are grouped by normalized language.
5. Missing language values are normalized to `general`.
6. Landmark display titles are resolved in this order:
   - `landmark_title`
   - `landmark_name`
   - `title`
   - `subtitle`
   - `description`
7. Overview download links resolve in this order:
   - `overview_download_url`
   - `content_url`

## Reserved Segment Model

These fields are documented now so segmented route search can be implemented
without changing the entire frontend contract later.

```ts
interface RouteSegmentStop {
  stop_name: string;
  normalized_stop_name?: string;
  order?: number;
  video_start?: number;
  video_end?: number;
}
```

## Example Documents

### Overview Document

```json
{
  "type": "text",
  "route_key": "yaba-maryland",
  "from_location": "Yaba",
  "to_location": "Maryland",
  "from_normalized": "yaba",
  "to_normalized": "maryland",
  "from_keywords": ["yaba", "sabo", "jibowu"],
  "to_keywords": ["maryland", "anthony"],
  "content_url": "https://example.com/yaba-maryland-guide.pdf",
  "overview_download_url": "https://example.com/yaba-maryland-guide.pdf",
  "download_label": "Download route guide",
  "title": "Yaba to Maryland Route Overview",
  "content_text": "Board a bus at Yaba and stay alert for the Anthony and Maryland corridor landmarks.",
  "fare_info": "Typical fare: N500 to N800 depending on time and traffic.",
  "safety_info": "Avoid isolated bus stops at night and keep small cash ready.",
  "language": "english",
  "tags": ["danfo", "mainland", "commuter"]
}
```

### Landmark Document

```json
{
  "type": "image",
  "route_key": "yaba-maryland",
  "from_location": "Yaba",
  "to_location": "Maryland",
  "from_normalized": "yaba",
  "to_normalized": "maryland",
  "from_keywords": ["yaba", "sabo", "jibowu"],
  "to_keywords": ["maryland", "anthony"],
  "content_url": "https://example.com/landmark-ojuelegba.jpg",
  "landmark_title": "Ojuelegba Bridge",
  "description": "Stay on the right side after the bridge if you are continuing toward Anthony.",
  "order": 2,
  "tags": ["landmark", "bridge"]
}
```

### Video Document

```json
{
  "type": "video",
  "route_key": "yaba-maryland",
  "from_location": "Yaba",
  "to_location": "Maryland",
  "from_normalized": "yaba",
  "to_normalized": "maryland",
  "from_keywords": ["yaba", "sabo", "jibowu"],
  "to_keywords": ["maryland", "anthony"],
  "content_url": "https://example.com/yaba-maryland.mp4",
  "title": "Full Route Video",
  "language": "english",
  "order": 1,
  "segment_stops": [
    {
      "stop_name": "Jibowu",
      "normalized_stop_name": "jibowu",
      "order": 1,
      "video_start": 121,
      "video_end": 240
    },
    {
      "stop_name": "Anthony",
      "normalized_stop_name": "anthony",
      "order": 2,
      "video_start": 241,
      "video_end": 360
    },
    {
      "stop_name": "Maryland",
      "normalized_stop_name": "maryland",
      "order": 3,
      "video_start": 361,
      "video_end": 480
    }
  ],
  "tags": ["video", "route"]
}
```

## Repo Workflow For Migration

This repo now includes local tooling for seed preparation and import:

- Seed template:
  - `data/street-rhythm-route-seed.template.json`
- Validation script:
  - `npm run street-rhythm:validate`
- Import script:
  - `npm run street-rhythm:import`

### Validation

Run validation against the default template:

```bash
npm run street-rhythm:validate
```

Or validate a different JSON file:

```bash
node scripts/validate-street-rhythm-routes.mjs path/to/your-file.json
```

The validator will:

- check required base fields
- check array fields
- warn when a route has no Pidgin audio guide

### Import

To import into Firestore, provide a Firebase Admin service account path:

```bash
FIREBASE_SERVICE_ACCOUNT_PATH=/absolute/path/to/service-account.json npm run street-rhythm:import
```

Or import a different file:

```bash
node scripts/import-street-rhythm-routes.mjs path/to/your-file.json
```

The import script upserts into the `routes_resources` collection and uses a
stable generated document id when one is not explicitly provided.

### Local testing note

Street Rhythm search will return `No Route Found` locally unless the seed file
has been imported into the same Firebase project that your `.env.local`
points to.

## Travel-Time Integration (Implemented)

The app now includes a Street Rhythm travel-time API endpoint that compares:

- normal duration
- current duration with traffic

Endpoint:

- `GET /api/street-rhythm/travel-time?from=Yaba&to=Maryland`

Required environment variable:

- `GOOGLE_MAPS_API_KEY`

This currently uses Google Directions API (`departure_time=now`,
`traffic_model=best_guess`) and returns normalized values used in the
"Traffic & Travel Time" UI section.

## Google Maps Traffic Layer (Implemented)

Street Rhythm route details now render an interactive Google Map with:

- route directions for the selected `from` and `to`
- traffic layer coloring (green/yellow/red)

Required client environment variable:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

Component path:

- `src/components/street-rhythm-2-components/RouteMapTraffic.tsx`

## Arrival Notifications (Implemented)

Street Rhythm now includes browser arrival alerts with three thresholds:

- 5 km
- 1 km
- 500 m

Flow:

1. destination is geocoded via `GET /api/street-rhythm/geocode?address=...`
2. browser geolocation `watchPosition` tracks user movement
3. alerts fire once per threshold using Notification API

Required server environment variable:

- `GOOGLE_MAPS_API_KEY`

Component path:

- `src/components/street-rhythm-2-components/RouteArrivalNotifications.tsx`

## Segmented Video Playback (Implemented)

Street Rhythm video cards now support playing matched route segments when
`segment_stops` metadata exists.

Matching logic:

1. use current `from` and `to` route inputs
2. resolve matching stop names in `segment_stops`
3. if matched, expose "Play Matched Segment"
4. player seeks to segment start and pauses at segment end
5. users can explicitly choose start and end stops from detected `segment_stops`

Component path:

- `src/components/direction-feature-components/VideoTab.tsx`

## Community Chat (Implemented)

Street Rhythm now includes real-time route-scoped community chat.

Channel scope:

- each route uses a dedicated channel keyed by `route_key`

Firestore structure:

- `street_rhythm_route_chat/{route_key}/messages/{message_id}`

Message fields:

- `routeKey: string`
- `message: string`
- `senderName: string`
- `senderId: string`
- `createdAt: serverTimestamp`

Behavior:

- live updates via Firestore `onSnapshot`
- latest 50 messages by `createdAt desc`
- message length capped in UI
- basic anti-spam controls:
  - per-sender cooldown between posts
  - duplicate message suppression window
  - link-count limit per message
- signed-in users can post; anonymous users are read-only

Component path:

- `src/components/street-rhythm-2-components/RouteCommunityChat.tsx`

Security rules file:

- `firestore.rules`

Moderation queue:

- users can report individual chat messages from the chat UI
- reports are stored in:
  - `street_rhythm_route_chat_reports/{report_id}`

Report fields:

- `routeKey: string`
- `messageId: string`
- `messagePreview: string`
- `reason: string` (`spam`, `abuse`, `misleading-traffic-info`, `other`)
- `reporterId: string`
- `reportedSenderId: string | null`
- `createdAt: serverTimestamp`

Indexes file:

- `firestore.indexes.json`

Deployment runbook:

- `FIREBASE_CHAT_DEPLOYMENT.md`

NPM deploy commands:

- `npm run firestore:deploy:rules`
- `npm run firestore:deploy:indexes`
