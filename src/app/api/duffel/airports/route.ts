import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ data: [] })
  }

  try {
    const response = await fetch(`https://api.duffel.com/air/locations?name=${encodeURIComponent(query)}`, {
      headers: {
        Accept: "application/json",
        "Duffel-Version": "v1", // ✅ REQUIRED
        Authorization: `Bearer ${process.env.DUFFEL_API_KEY}`,
      },
    })

    const data = await response.json()
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching locations:", error)
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 })
  }
}
