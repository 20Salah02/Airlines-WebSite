"use client";
import { createContext, useContext, useState, ReactNode } from "react";
//
type FlightResult = {
  distanceKm: number;
  durationHours: number;
  durationMinutes: number;
  price: number;
};

type FlightResultContextType = {
  flightResult: FlightResult | null;
  setFlightResult: React.Dispatch<React.SetStateAction<FlightResult | null>>;
};

const FlightResultContext = createContext<FlightResultContextType | null>(null);

export function FlightResultProvider({ children }: { children: ReactNode }) {
  const [flightResult, setFlightResult] = useState<FlightResult | null>(null);

  return (
    <FlightResultContext.Provider
      value={{ flightResult, setFlightResult }}
    >
      {children}
    </FlightResultContext.Provider>
  );
}

export function useFlightResultContext() {
  const ctx = useContext(FlightResultContext);
  if (!ctx) {
    throw new Error(
      "useFlightResultContext must be used inside FlightResultProvider"
    );
  }
  return ctx;
}
