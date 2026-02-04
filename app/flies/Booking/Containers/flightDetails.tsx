"use client"

// context
import { useBooking } from "@/app/contexts/bookingContext";
//
import { useSearchParams } from "next/navigation"

export default function FlightDetails(){

    const {booking} = useBooking()
    const search = useSearchParams()

    const step = search.get("step")
    const isOutbound = step !== "return"

    const from = isOutbound ? booking.from : booking.to
    const to = isOutbound ? booking.to : booking.to
    const firstDay = isOutbound ? booking.dates?.departure : booking.dates?.return
    

    function formatDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year : "numeric"
    });
    }

    return(
        
        <div className="bg-white p-9 border-l border-l-gray-300 h-screen space-y-20">
            <h1 className="flex justify-center text-xl">Flight details</h1>
            <div className="space-y-3 mb-15">
                <h2 className="font-medium text-lg">{from?.city} to {to?.city}</h2>
                <h3 className="text-gray-600">{formatDate(firstDay)}</h3>
            </div>
            <div className="flex space-x-8">
                <div className="space-y-14">
                    <p>10:00</p>
                    <p>2h 10m</p>
                    <p>12:10</p>
                </div>
                <p className="flex items-center">L</p>
                <div className="space-y-7">
                    <div>
                        <h2 className="font-medium">{from?.city}</h2>
                        <h3 className="text-gray-600">{from?.name}</h3>
                    </div>
                    <div>
                        <h2>QR6381 - Boeing 777-300</h2>
                        <h3 className="text-gray-600">Operated by Garuda Indonesia</h3>
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