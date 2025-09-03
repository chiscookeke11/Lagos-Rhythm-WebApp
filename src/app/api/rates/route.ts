// src/app/api/rates/route.ts
import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;

export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error("Missing NEXT_PUBLIC_EXCHANGERATE_API_KEY");
    }

    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    console.log("Fetching rates from:", url);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`ExchangeRate API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error in /api/rates:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
