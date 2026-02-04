"use client"

//
import { useState , useContext , createContext ,ReactNode } from "react"

type Airport = {
  id: number;
  name: string;
  city: string;
  country: string;
  iata: string;
};

type Booking = {
  from: Airport | null;
  to: Airport | null;
  date: {
    departure?: Date;
    return?: Date;
  } | null;
  passenger: string;
  tripType: "one-way" | "round-trip";
  outboundFlight: string | null;
  returnFlight: string | null;
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
  const [booking, setBooking] = useState<Booking>({
    from: null,
    to: null,
    date: null,
    passenger: "",
    tripType: "round-trip",
    outboundFlight: null,
    returnFlight: null,
  });

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}


export const useBooking = () => useContext(BookingContext)