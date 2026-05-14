"use client";

import { useEffect, useRef, useState } from "react";

interface RouteMapTrafficProps {
  from: string;
  to: string;
}

interface GoogleTrafficLayerLike {
  setMap: (map: unknown | null) => void;
}

interface GoogleDirectionsRendererLike {
  setDirections: (result: unknown) => void;
  setMap: (map: unknown | null) => void;
}

interface GoogleDirectionsServiceLike {
  route: (
    request: {
      origin: string;
      destination: string;
      travelMode: string;
      drivingOptions: {
        departureTime: Date;
        trafficModel: string;
      };
    },
    callback: (result: unknown, status: string) => void
  ) => void;
}

interface GoogleMapsGlobalLike {
  maps: {
    Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown;
    DirectionsRenderer: new (options: Record<string, unknown>) => GoogleDirectionsRendererLike;
    TrafficLayer: new () => GoogleTrafficLayerLike;
    DirectionsService: new () => GoogleDirectionsServiceLike;
    TravelMode: {
      DRIVING: string;
    };
    TrafficModel: {
      BEST_GUESS: string;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleMapsGlobalLike;
  }
}

const GOOGLE_MAPS_SCRIPT_ID = "street-rhythm-google-maps-script";

let googleMapsLoaderPromise: Promise<void> | null = null;

function loadGoogleMapsScript(apiKey: string) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser."));
  }

  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (googleMapsLoaderPromise) {
    return googleMapsLoaderPromise;
  }

  googleMapsLoaderPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Google Maps script.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script."));

    document.head.appendChild(script);
  });

  return googleMapsLoaderPromise;
}

export default function RouteMapTraffic({ from, to }: RouteMapTrafficProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mapsApiKey =
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY;

    if (!mapsApiKey) {
      setLoading(false);
      setError(
        "Google Maps key is missing. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local and restart the app."
      );
      return;
    }

    if (!from?.trim() || !to?.trim()) {
      setLoading(false);
      setError("Choose a valid origin and destination to render map directions.");
      return;
    }

    let disposed = false;
    let trafficLayer: GoogleTrafficLayerLike | null = null;
    let directionsRenderer: GoogleDirectionsRendererLike | null = null;

    const initializeMap = async () => {
      try {
        setLoading(true);
        setError(null);

        await loadGoogleMapsScript(mapsApiKey);

        if (disposed || !mapRef.current || !window.google?.maps) {
          return;
        }

        const googleMaps = window.google.maps;

        const map = new googleMaps.Map(mapRef.current, {
          zoom: 12,
          center: { lat: 6.5244, lng: 3.3792 },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        directionsRenderer = new googleMaps.DirectionsRenderer({
          map,
          suppressMarkers: false,
          preserveViewport: false,
          polylineOptions: {
            strokeColor: "#D4422C",
            strokeOpacity: 0.9,
            strokeWeight: 6,
          },
        });

        trafficLayer = new googleMaps.TrafficLayer();
        trafficLayer.setMap(map);

        const directionsService = new googleMaps.DirectionsService();

        directionsService.route(
          {
            origin: from,
            destination: to,
            travelMode: googleMaps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date(),
              trafficModel: googleMaps.TrafficModel.BEST_GUESS,
            },
          },
          (result: unknown, status: string) => {
            if (disposed) return;

            if (status !== "OK" || !result) {
              setError(`Unable to render route on map (${status}).`);
              setLoading(false);
              return;
            }

            directionsRenderer?.setDirections(result);
            setLoading(false);
          }
        );
      } catch (err) {
        if (!disposed) {
          setError(err instanceof Error ? err.message : "Failed to initialize Google Maps.");
          setLoading(false);
        }
      }
    };

    initializeMap();

    return () => {
      disposed = true;
      if (trafficLayer) {
        trafficLayer.setMap(null);
      }
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }
    };
  }, [from, to]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h4 className="text-lg font-black text-[#05073C]">Route Map & Traffic</h4>
        <p className="text-xs text-gray-500">Traffic colors: green (free), yellow (moderate), red (heavy)</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && !error && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          Loading map and live traffic layer...
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div ref={mapRef} className="h-[360px] w-full bg-gray-100" />
      </div>
    </div>
  );
}
