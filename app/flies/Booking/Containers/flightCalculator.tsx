
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
//
import { useBooking } from "@/app/contexts/bookingContext";
import { useFlightResultContext } from "@/app/contexts/priceContext";
//
type Airport = {
  lat: number; 
  lon: number; 
};

type FlightResult = {
  distanceKm: number;
  durationHours: number;
  durationMinutes: number;
  price: number;
};


export function toRadians(deg: number): number {
  return deg * (Math.PI / 180);
}

export function calculateDistance(a1: Airport, a2: Airport): number {
  const R = 6371; 

  const φ1 = toRadians(a1.lat);
  const φ2 = toRadians(a2.lat);

  const Δφ = toRadians(a2.lat - a1.lat);
  const Δλ = toRadians(a2.lon - a1.lon);

  const h =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return R * c;
}

export function calculateFlight(
  from: Airport,
  to: Airport,
  pricePerKm = 0.11,
  baseFee = 122,
  speed = 900 
): FlightResult {
  const distanceKm = calculateDistance(from, to);

  const duration = distanceKm / speed;
  const durationHours = Math.floor(duration);
  const durationMinutes = Math.round((duration - durationHours) * 60);

  const price = distanceKm * pricePerKm + baseFee;

  return {
    distanceKm: Number(distanceKm.toFixed(2)),
    durationHours,
    durationMinutes,
    price: Number(price.toFixed(2)),
  };
}


export default function FlightCalculator() {
  const search = useSearchParams();
  const { booking } = useBooking();
  const { setFlightResult } = useFlightResultContext();

  const isOutbound = search.get("step") !== "return";

  useEffect(() => {
    if (!booking.from || !booking.to) return;

    const from = isOutbound ? booking.from : booking.to;
    const to = isOutbound ? booking.to : booking.from;

    const result = calculateFlight(
      { lat: from.latitude, lon: from.longitude },
      { lat: to.latitude, lon: to.longitude }
    );

    setFlightResult(result);
  }, [
    booking.from,
    booking.to,
    isOutbound,
    setFlightResult
  ]);

  return null; 
}
