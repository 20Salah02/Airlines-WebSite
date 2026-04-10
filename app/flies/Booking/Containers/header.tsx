"use client"

// context
import { useBooking } from "@/app/contexts/bookingContext"
//
import { useSearchParams } from "next/navigation"


export default function FliesHeader(){

    function formatDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year : "numeric"
    });
    }

    const { booking } = useBooking()
    
    const search = useSearchParams()
    const step = search.get("step")

    const isOutbound = step !== "return";

    const from = isOutbound ? booking.from : booking.to
    const to = isOutbound ? booking.to : booking.from
    const firstDay = isOutbound ? booking.dates?.departure : booking.dates?.return;
    


    
    return(
        <div className="lg:my-17 my-8 font-light">
            <h6>{formatDate(firstDay)}</h6>
            <div className="lg:text-5xl text-3xl text-gray-600">
                <h2 className="py-4">Select Your Departure Flight</h2>
                <h1>From <span className="text-red-900">{from?.city}</span> to <span  className="text-red-900">{to?.city}</span></h1>
            </div>
        </div>
    )
}