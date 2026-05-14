import { NextRequest, NextResponse } from "next/server";

interface DirectionsApiLeg {
  duration?: { text?: string; value?: number };
  duration_in_traffic?: { text?: string; value?: number };
  distance?: { text?: string; value?: number };
}

interface DirectionsApiRoute {
  legs?: DirectionsApiLeg[];
}

interface DirectionsApiResponse {
  status: string;
  error_message?: string;
  routes?: DirectionsApiRoute[];
}

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from")?.trim();
  const to = request.nextUrl.searchParams.get("to")?.trim();

  if (!from || !to) {
    return NextResponse.json(
      { error: "Query params 'from' and 'to' are required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "GOOGLE_MAPS_API_KEY is not configured.",
      },
      { status: 503 }
    );
  }

  const endpoint = new URL("https://maps.googleapis.com/maps/api/directions/json");
  endpoint.searchParams.set("origin", from);
  endpoint.searchParams.set("destination", to);
  endpoint.searchParams.set("departure_time", "now");
  endpoint.searchParams.set("traffic_model", "best_guess");
  endpoint.searchParams.set("key", apiKey);

  try {
    const response = await fetch(endpoint.toString(), {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Directions API request failed with HTTP ${response.status}.` },
        { status: 502 }
      );
    }

    const payload = (await response.json()) as DirectionsApiResponse;
    const leg = payload.routes?.[0]?.legs?.[0];

    if (!leg || payload.status !== "OK") {
      return NextResponse.json(
        {
          error:
            payload.error_message ||
            `Directions lookup failed with status '${payload.status}'.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      from,
      to,
      normalDurationText: leg.duration?.text ?? "N/A",
      normalDurationSeconds: leg.duration?.value ?? null,
      trafficDurationText: leg.duration_in_traffic?.text ?? leg.duration?.text ?? "N/A",
      trafficDurationSeconds: leg.duration_in_traffic?.value ?? leg.duration?.value ?? null,
      distanceText: leg.distance?.text ?? "N/A",
      distanceMeters: leg.distance?.value ?? null,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch travel time: ${message}` },
      { status: 500 }
    );
  }
}
