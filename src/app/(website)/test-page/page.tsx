"use client";

import { duffel } from "@/app/config/DuffelConfig";
import { getIATACode } from "@/lib/getIATACode";
import { useEffect, useState } from "react";







type Offer = {
  id: string;
  total_amount: string;
  total_currency: string;
  owner: { name: string };
  slices: { duration: string }[];
};


export default function Home() {
const [form, setForm] = useState({
  origin: getIATACode("Lagos"),
  destination: getIATACode("Enugu"),
  departureDate: "2025-11-10",
  returnDate: "2025-11-20",
});
  const [results, setResults] = useState<Offer[]>([]);

  const handleSearch = async () => {
    const res = await fetch("/api/duffel/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResults(data.offers || []);
  };




console.log(results)


const fetchOfferDetails = async () => {
  const res = await fetch(`/api/duffel/offer/${results[0].id}`);
  const data = await res.json();
  console.log("Offer details:", data);
};


useEffect(() => {
  if (results.length > 0) {
    fetchOfferDetails();
  }
}, [results]);




  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-black">
      <h1 className="text-2xl font-semibold mb-4"> Flight Search</h1>

      <div className="flex gap-3 mb-6">
        <input
          className="border px-3 py-2"
          placeholder="Origin (e.g. NYC)"
          value={form.origin}
          onChange={(e) => setForm({ ...form, origin: e.target.value })}
        />
        <input
          className="border px-3 py-2"
          placeholder="Destination (e.g. ATL)"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {results.length > 0 ? (
        <div className="w-full max-w-2xl space-y-3">
          {results.map((offer) => (
            <div key={offer.id} className="border p-4 rounded shadow-sm">
              <p>Price: {offer.total_amount} {offer.total_currency}</p>
              <p>Airline: {offer.owner.name}</p>
              <p>Duration: {offer.slices[0].duration}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results yet. Try searching!</p>
      )}
    </div>
  );
}
