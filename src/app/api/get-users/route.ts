import { clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const client = await clerkClient()
    const users = await client.users.getUserList()

    return NextResponse.json(users)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      {
        error: "Failed to fetch users",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
