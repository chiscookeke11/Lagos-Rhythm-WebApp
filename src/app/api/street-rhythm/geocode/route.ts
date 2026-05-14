import { NextRequest, NextResponse } from "next/server";

interface GeocodeApiResult {
  geometry?: {
    location?: {
      lat?: number;
      lng?: number;
    };
  };
  formatted_address?: string;
}

interface GeocodeApiResponse {
  status: string;
  error_message?: string;
  results?: GeocodeApiResult[];
}

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address")?.trim();

  if (!address) {
    return NextResponse.json({ error: "Query param 'address' is required." }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "GOOGLE_MAPS_API_KEY is not configured." }, { status: 503 });
  }

  const endpoint = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  endpoint.searchParams.set("address", address);
  endpoint.searchParams.set("key", apiKey);

  try {
    const response = await fetch(endpoint.toString(), {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Geocoding API request failed with HTTP ${response.status}.` },
        { status: 502 }
      );
    }

    const payload = (await response.json()) as GeocodeApiResponse;
    const first = payload.results?.[0];
    const lat = first?.geometry?.location?.lat;
    const lng = first?.geometry?.location?.lng;

    if (payload.status !== "OK" || typeof lat !== "number" || typeof lng !== "number") {
      return NextResponse.json(
        {
          error:
            payload.error_message ||
            `Geocoding lookup failed with status '${payload.status}'.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      address,
      formattedAddress: first?.formatted_address ?? address,
      latitude: lat,
      longitude: lng,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to geocode destination: ${message}` }, { status: 500 });
  }
}
