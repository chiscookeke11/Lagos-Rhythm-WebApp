import { duffel } from "@/app/config/DuffelConfig";
import { NextRequest } from "next/server";


export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Await params first!
        const { id } = await context.params;

        console.log("Fetching offer:", id);
        const offer = await duffel.offers.get(id);

        return Response.json(offer);
    } catch (err: any) {
        console.error("Duffel error:", err);
        return Response.json({ error: err.message }, { status: 500 });
    }
}
