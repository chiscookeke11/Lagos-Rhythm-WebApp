import { Duffel } from "@duffel/api";

const duffel = new Duffel({
  token: process.env.DUFFEL_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { origin, destination, departureDate, returnDate } = await req.json();

    const offerRequest = await duffel.offerRequests.create({
      slices: [
        { origin, destination, departure_date: departureDate, arrival_time: null, departure_time: null },
        { origin: destination, destination: origin, departure_date: returnDate, arrival_time: null, departure_time: null },
      ],
      passengers: [{ type: "adult" }],
      cabin_class: "economy",
    });

 //  Access offers from offerRequest.data
  const offers = offerRequest.data.offers || [];
    return Response.json({ offers });

  } catch (err: any) {
  console.error("Duffel error details:", JSON.stringify(err, null, 2));
  return Response.json({ error: err?.message || "Unknown Duffel error" }, { status: 500 });
}
}
