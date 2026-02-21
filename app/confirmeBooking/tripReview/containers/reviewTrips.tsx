"use client"
import { useBooking } from "@/app/contexts/bookingContext"
import { useFlightResultContext } from "@/app/contexts/priceContext"
import Image from "next/image"
export default function ReviewTheTrips(){

    const {booking} = useBooking()

    
    const tripType = booking.tripType 
    const from = booking.from 
    const to = booking.to 
    const firstDay =  booking.dates?.departure 
    const lastDay =  booking.dates?.return 


    function formatDate(date?: Date | null) {
        if (!date) return "";
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year : "numeric"
        });
    }

    const {flightResult} = useFlightResultContext()

    const flightDurationHour = flightResult?.durationHours
    const flightDurationMin  = flightResult?.durationMinutes

    return(
        <div className="space-y-10 ">
            <h1 className="text-4xl font-light text-gray-600">Review your Trip</h1>

            <div className="flex bg-white rounded-3xl p-4">
                <div className="w-1/3">

                </div>

                <div className="w-2/3 space-y-4">
                    <div className="text-gray-600">{formatDate(firstDay)}</div>

                    <div className="flex  space-x-20 px-6">
                        <div className="space-y-3">
                            <h2 className="text-4xl font-light">{from?.iata}</h2>
                            <h3 className="text-[19px] text-gray-600">10:00</h3>
                            <h4 className="text-gray-600">{from?.city}</h4>
                            <h5>{from?.name}</h5>
                        </div>
                        <div className="space-y-3">
                            <h2>L</h2>
                            <h3 className="text-[19px] text-gray-600">{`${flightDurationHour}h ${flightDurationMin}min`}</h3>
                        </div>
                        <div className="space-y-3"> 
                            <h2 className="text-4xl font-light">{to?.iata}</h2>
                            <h3 className="text-[19px] text-gray-600">12:00</h3>
                            <h4 className="text-gray-600">{to?.city}</h4>
                            <h5>{to?.name}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}