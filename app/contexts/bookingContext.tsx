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
  dates: {           
    departure?: Date;
    return?: Date;
  } | null;
  passengers: string;  
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
    dates: null,
    passengers: "",
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


export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }
  return context;
};
