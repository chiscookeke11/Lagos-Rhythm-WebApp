// hooks/useAirportSearch.ts
import { useState, useEffect } from "react";

export function useAirportSearch(query: string) {
  const [airports, setAirports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) return; // don't fetch for very short queries

    const fetchAirports = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/duffel/airports?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setAirports(data.data || []);
      } catch (err) {
        console.error("Airport fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
  }, [query]);

  return { airports, loading };
}
