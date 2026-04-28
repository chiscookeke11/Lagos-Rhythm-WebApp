# Lagos Rhythm WebApp

Lagos Rhythm is a Next.js web platform for discovering, booking, and managing Lagos cultural and tourism experiences.

## Stack

- Next.js (App Router) + TypeScript
- Firebase (Firestore + Auth usage)
- Clerk authentication
- Tailwind CSS

## Local Setup

1. Clone and install dependencies:

```bash
git clone https://github.com/chiscookeke11/Lagos-Rhythm-WebApp.git
cd Lagos-Rhythm-WebApp
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Fill required values in `.env.local`.

Core required keys include Firebase values:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

Street Rhythm map/traffic keys:

- `GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

4. Start dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

5. Seed Street Rhythm route data for local testing:

```bash
$env:FIREBASE_SERVICE_ACCOUNT_PATH='C:\path\to\service-account.json'; npm run street-rhythm:import
```

This imports the `routes_resources` collection used by Street Rhythm search.
If this step is skipped, the page can load but searches may show `No Route Found`
even when production works.

## Key Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run street-rhythm:validate`
- `npm run street-rhythm:import`
- `npm run firestore:deploy:rules`
- `npm run firestore:deploy:indexes`

## Street Rhythm Docs

- `STREET RHYTHM CORRECTIONS.md`
- `STREET RHYTHM ROUTE RESOURCE SHAPE.md`
- `FIREBASE_CHAT_DEPLOYMENT.md`

## Notes

- Firebase config is validated at startup in `src/app/config/firebaseClient.ts`.
- Street Rhythm features include route media, traffic-aware duration, map/traffic layer, arrival alerts, segmented playback, and route community chat.
