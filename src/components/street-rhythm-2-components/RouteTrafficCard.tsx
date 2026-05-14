"use client";

import { useEffect, useMemo, useState } from "react";

interface RouteTrafficCardProps {
  from: string;
  to: string;
}

interface TravelTimePayload {
  normalDurationText: string;
  trafficDurationText: string;
  distanceText: string;
  updatedAt: string;
}

const REFRESH_INTERVAL_MS = 60_000;

export default function RouteTrafficCard({ from, to }: RouteTrafficCardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TravelTimePayload | null>(null);

  const canQuery = useMemo(() => Boolean(from?.trim() && to?.trim()), [from, to]);

  useEffect(() => {
    if (!canQuery) {
      setLoading(false);
      setError("Select a valid start and destination route to load traffic estimates.");
      return;
    }

    let isMounted = true;

    const loadTravelTime = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({ from, to });
        const response = await fetch(`/api/street-rhythm/travel-time?${query.toString()}`, {
          cache: "no-store",
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Unable to load travel time.");
        }

        if (isMounted) {
          setData(payload);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load travel time."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTravelTime();
    const timer = window.setInterval(loadTravelTime, REFRESH_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(timer);
    };
  }, [canQuery, from, to]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">Loading travel-time estimate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 space-y-2">
        <h4 className="font-bold text-red-700">Travel-time estimate unavailable</h4>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4">
      <h4 className="text-lg font-black text-[#05073C]">Travel Time Estimate</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-1">Normal</p>
          <p className="text-xl font-black text-[#05073C]">{data?.normalDurationText ?? "N/A"}</p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">Current (Traffic)</p>
          <p className="text-xl font-black text-[#05073C]">{data?.trafficDurationText ?? "N/A"}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap text-sm text-gray-600">
        <p>Distance: {data?.distanceText ?? "N/A"}</p>
        <p>Updated: {data?.updatedAt ? new Date(data.updatedAt).toLocaleTimeString() : "N/A"}</p>
      </div>
    </div>
  );
}
