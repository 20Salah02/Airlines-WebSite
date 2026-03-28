"use client"

// context
//
import { useBooking } from "@/app/contexts/bookingContext";
import { useFlightResultContext } from "@/app/contexts/priceContext";

type Props = {
    type: "outbound" | "return"
    departureTime?: string,
    arrivalTime?: string
}

export default function FlightDetails({type ,departureTime ,arrivalTime}:Props){

    const {booking} = useBooking()
    const isOutbound = type === "outbound"

    const from = isOutbound ? booking.from : booking.to
    const to = isOutbound ? booking.to : booking.from
    const firstDay = isOutbound ? booking.dates?.departure : booking.dates?.return
    

    function formatDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year : "numeric"
    });
    }

    const {flightResult} = useFlightResultContext()
    if (!flightResult) return null

    const flightDurationHour = flightResult.durationHours
    const flightDurationMin  = flightResult.durationMinutes

    //

    return(
        
        <div className="bg-white p-9 border-l border-l-gray-300 h-screen space-y-20">
            <h1 className="flex justify-center text-xl">Flight details</h1>
            <div className="space-y-3 mb-15">
                <h2 className="font-medium text-lg">{from?.city} to {to?.city}</h2>
                <h3 className="text-gray-600">{formatDate(firstDay)}</h3>
            </div>
            <div className="flex space-x-8">
                <div className="space-y-14">
                    <p>{departureTime}</p>
                    <p>{flightDurationHour}h {flightDurationMin}min</p>
                    <p>{arrivalTime}</p>
                </div>
                <p className="flex items-center">L</p>
                <div className="space-y-7">
                    <div>
                        <h2 className="font-medium">{from?.city}</h2>
                        <h3 className="text-gray-600">{from?.name}</h3>
                    </div>
                    <div>
                        <h2>QR6381 - Boeing 777-300</h2>
                        <h3 className="text-gray-600">Operated by Garuda Salah</h3>
                    </div>
                    <div>
                        <h2 className="font-medium">{to?.city}</h2>
                        <h3 className="text-gray-600">{to?.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}