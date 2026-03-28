"use client"

import { useState, useContext, createContext, ReactNode } from "react"

type Airport = {
  id: number;
  name: string; 
  city: string; 
  country: string; 
  iata: string;
  latitude : number;
  longitude : number
};

export type FareType =
  | "Economy Classic"
  | "Economy Convenienc"
  | "Economy Comfort"
  | "Business Comfort"
  | "Business Elite"

type SelectedFlight = {
  flightId: string;
  fare: FareType;
  price: number;
  departureTime : string;
  arrivalTime : string;
};

type Booking = {
  from: Airport | null;
  to: Airport | null;
  dates: {           
    departure?: Date;
    return?: Date;
  } | null;
  passengers: string;  
  tripType: "one-way" | "round-trip";
  outboundFlight: SelectedFlight | null;
  returnFlight: SelectedFlight | null;
};

type BookingContextType = {
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
};

type BookingProviderProps = {
  children: ReactNode;
};

const BookingContext = createContext<BookingContextType | null>(null);

export default function BookingProvider({ children }: BookingProviderProps) {

  const [booking, setBookingState] = useState<Booking>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("booking");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);

          if (parsed.dates?.departure) parsed.dates.departure = new Date(parsed.dates.departure);
          if (parsed.dates?.return) parsed.dates.return = new Date(parsed.dates.return);

          return parsed;
        } catch (e) {
          console.error("Failed to parse booking from localStorage", e);
        }
      }
    }

    return {
      from: null,
      to: null,
      dates: null,
      passengers: "",
      tripType: "round-trip",
      outboundFlight: null,
      returnFlight: null,
    };
  });

  const setBooking = (newBooking: React.SetStateAction<Booking>) => {
    setBookingState(prev => {
      const updated = typeof newBooking === "function" ? newBooking(prev) : newBooking;

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("booking", JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to save booking to localStorage", e);
        }
      }

      return updated;
    });
  };

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}


export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }
  return context;
};
