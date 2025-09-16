import { NextResponse } from "next/server";

const API_KEY = process.env.EXCHANGERATE_API_KEY;

export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error("Missing NEXT_PUBLIC_EXCHANGERATE_API_KEY");
    }

    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`ExchangeRate API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "string") {
      message = err;
    }

    console.error("Error in /api/rates:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
