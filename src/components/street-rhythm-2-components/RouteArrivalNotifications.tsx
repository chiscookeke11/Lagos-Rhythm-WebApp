"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface RouteArrivalNotificationsProps {
  destination: string;
}

interface DestinationPoint {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

const ALERT_THRESHOLDS_METERS = [5000, 1000, 500] as const;

function metersToReadable(meters: number) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${Math.round(meters)} m`;
}

function computeDistanceMeters(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number
) {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const earthRadiusMeters = 6371000;

  const dLat = toRadians(destLat - originLat);
  const dLng = toRadians(destLng - originLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(originLat)) *
      Math.cos(toRadians(destLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusMeters * c;
}

export default function RouteArrivalNotifications({ destination }: RouteArrivalNotificationsProps) {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");
  const [loadingDestination, setLoadingDestination] = useState(false);
  const [destinationPoint, setDestinationPoint] = useState<DestinationPoint | null>(null);
  const [destinationError, setDestinationError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [distanceMeters, setDistanceMeters] = useState<number | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const alertedThresholdsRef = useRef<Set<number>>(new Set());

  const canUseNotifications = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "Notification" in window;
  }, []);

  useEffect(() => {
    if (!canUseNotifications) {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission);
  }, [canUseNotifications]);

  useEffect(() => {
    const trimmedDestination = destination?.trim();

    if (!trimmedDestination) {
      setDestinationPoint(null);
      setDestinationError("Destination is missing.");
      return;
    }

    let disposed = false;

    const fetchDestinationCoordinates = async () => {
      setLoadingDestination(true);
      setDestinationError(null);

      try {
        const query = new URLSearchParams({ address: trimmedDestination });
        const response = await fetch(`/api/street-rhythm/geocode?${query.toString()}`, {
          cache: "no-store",
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Unable to resolve destination coordinates.");
        }

        if (!disposed) {
          setDestinationPoint({
            latitude: payload.latitude,
            longitude: payload.longitude,
            formattedAddress: payload.formattedAddress,
          });
        }
      } catch (error) {
        if (!disposed) {
          setDestinationPoint(null);
          setDestinationError(
            error instanceof Error ? error.message : "Unable to resolve destination coordinates."
          );
        }
      } finally {
        if (!disposed) {
          setLoadingDestination(false);
        }
      }
    };

    fetchDestinationCoordinates();

    return () => {
      disposed = true;
    };
  }, [destination]);

  const clearTracker = () => {
    if (watchIdRef.current !== null && typeof navigator !== "undefined") {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
  };

  const sendThresholdNotification = (threshold: number, latestDistanceMeters: number) => {
    if (permission !== "granted") return;
    if (alertedThresholdsRef.current.has(threshold)) return;

    const message = `You are now within ${metersToReadable(threshold)} of ${destination}. Current distance: ${metersToReadable(
      latestDistanceMeters
    )}.`;

    const notification = new Notification("Lagos Rhythm Arrival Alert", {
      body: message,
      tag: `route-arrival-${threshold}`,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    alertedThresholdsRef.current.add(threshold);
  };

  const startTracking = async () => {
    if (!destinationPoint) {
      setTrackingError("Destination coordinates are not available yet.");
      return;
    }

    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setTrackingError("Geolocation is not supported in this browser.");
      return;
    }

    if (!canUseNotifications) {
      setTrackingError("Browser notifications are not supported in this browser.");
      return;
    }

    let nextPermission = permission;
    if (permission !== "granted") {
      nextPermission = await Notification.requestPermission();
      setPermission(nextPermission);
    }

    if (nextPermission !== "granted") {
      setTrackingError("Notification permission is required to enable arrival alerts.");
      return;
    }

    setTrackingError(null);
    alertedThresholdsRef.current = new Set<number>();

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const currentDistance = computeDistanceMeters(
          position.coords.latitude,
          position.coords.longitude,
          destinationPoint.latitude,
          destinationPoint.longitude
        );

        setDistanceMeters(currentDistance);

        for (const threshold of ALERT_THRESHOLDS_METERS) {
          if (currentDistance <= threshold) {
            sendThresholdNotification(threshold, currentDistance);
          }
        }
      },
      (geoError) => {
        setTrackingError(geoError.message || "Failed to track your current location.");
        clearTracker();
      },
      {
        enableHighAccuracy: true,
        maximumAge: 15_000,
        timeout: 20_000,
      }
    );

    setIsTracking(true);
  };

  useEffect(() => {
    return () => {
      clearTracker();
    };
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 space-y-4">
      <h4 className="text-lg font-black text-[#05073C]">Arrival Notifications</h4>

      <p className="text-sm text-gray-600">
        Get browser alerts when you are 5 km, 1 km, and 500 m from your destination. Keep this tab open
        (it can be minimized).
      </p>

      {loadingDestination && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
          Resolving destination coordinates...
        </div>
      )}

      {destinationPoint && (
        <div className="rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-gray-700">
          Destination: {destinationPoint.formattedAddress}
        </div>
      )}

      {destinationError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {destinationError}
        </div>
      )}

      {trackingError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {trackingError}
        </div>
      )}

      {distanceMeters !== null && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Current distance: <span className="font-semibold">{metersToReadable(distanceMeters)}</span>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={startTracking}
          disabled={isTracking || loadingDestination || !!destinationError}
          className="rounded-lg bg-[#05073C] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isTracking ? "Tracking Active" : "Notify Me When Arriving"}
        </button>

        <button
          type="button"
          onClick={clearTracker}
          disabled={!isTracking}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Stop Tracking
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Notification permission: {permission === "unsupported" ? "unsupported" : permission}
      </p>
    </div>
  );
}
