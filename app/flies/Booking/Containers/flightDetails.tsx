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
    const selectedFlight = isOutbound ? booking.outboundFlight : booking.returnFlight
    const depTime = departureTime || selectedFlight?.departureTime
    const arrTime = arrivalTime || selectedFlight?.arrivalTime


    return(
        
        <div className="bg-white p-9 border-l border-l-gray-300 h-screen space-y-20">
            <h1 className="flex justify-center text-xl">Flight details</h1>
            <div className="space-y-3 mb-15">
                <h2 className="font-medium text-lg text-red-900">{from?.city} <span className="font-normal text-gray-600">to</span> {to?.city}</h2>
                <h3 className="text-gray-600">{formatDate(firstDay)}</h3>
            </div>

            <div className="flex space-x-8">
                <div className="flex flex-col justify-between py-1 text-left space-y-14">
                    <p>{depTime}</p>
                    <p>{flightDurationHour}h {flightDurationMin}min</p>
                    <p>{arrTime}</p>
                </div>
                
                    <div className="relative flex flex-col items-center py-3">
                        <div className="w-4 h-4 rounded-full border border-gray-400 bg-white z-10"></div>
                        
                        <div className="flex-1 w-px bg-gray-300"></div>
                        
                        <div className="my-4 z-10">
                            <div className="w-6 h-6 bg-red-900 rotate-45 flex items-center justify-center overflow-hidden">
                            <span className="text-[10px] text-white -rotate-45 font-bold">SL</span>
                            </div>
                        </div>

                        <div className="flex-1 w-px bg-gray-300"></div>

                        <div className="w-4 h-4 rounded-full border border-gray-400 bg-white z-10"></div>
                    </div>

                <div className="space-y-7">
                    <div>
                        <h2 className="font-medium text-red-900">{from?.city}</h2>
                        <h3 className="text-gray-600">{from?.name} ({from?.iata})</h3>
                    </div>
                    <div>
                        <h2 className="text-red-900">style of flighBoeing 777-300</h2>
                        <h3 className="text-gray-600 ">Operated by Garuda Salah</h3>
                    </div>
                    <div>
                        <h2 className="font-medium text-red-900">{to?.city}</h2>
                        <h3 className="text-gray-600">{to?.name} ({to?.iata})</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}