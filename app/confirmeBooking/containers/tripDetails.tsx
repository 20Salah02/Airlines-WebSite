"use client"

// context
import { useBooking } from "@/app/contexts/bookingContext";
//
import { useState } from "react";
// 
import { useSearchParams } from "next/navigation";
//
import FlightDetails from "@/app/flies/Booking/Containers/flightDetails";
//

export default function TripDetails(){

    const [openResult, setOpenResult] = useState<"outbound" | "return" | null>(null)

    function formatDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year : "numeric"
    });
    }


    //
    const {booking} = useBooking()
    const search = useSearchParams()

    const step = search.get("step")
    const isOutbound = step !== "return"

    const from = isOutbound ? booking.from : booking.to
    const to = isOutbound ? booking.to : booking.from
    const firstDay = isOutbound ? booking.dates?.departure : booking.dates?.return;
    const lastDay = isOutbound ? booking.dates?.return : booking.dates?.departure;
    const tripType = isOutbound ? booking.tripType : ""
    const goingPrice = isOutbound ? booking.outboundFlight?.price ?? 0 : booking.returnFlight?.price ?? 0;
    const returnPrice = isOutbound ? booking.returnFlight?.price ?? 0 : booking.outboundFlight?.price ?? 0;

    
    

    const totalPrice = tripType === "round-trip" ? goingPrice  + returnPrice : goingPrice
    const formatTotalPrice = totalPrice.toLocaleString()



    return(
        <div className="flex flex-col h-fit bg-white w-2/5 p-6 rounded-3xl space-y-2.5">
            <div className="space-y-2">
                <h1 className="font-medium text-[19px] text-red-900">Trip details</h1>
                <p>{tripType}</p>
            </div>

            
            <div >
                <div onClick={() => setOpenResult("outbound")} className="flex justify-between items-center border-b border-b-gray-300 py-2.5 cursor-pointer">
                    <div className="space-y-1">
                        <h2 className="text-[18px] font-medium text-red-900">{from?.city} to {to?.city}</h2>
                        <h3 className="text-[15px] text-gray-700">{formatDate(firstDay)}</h3>
                    </div>
                    <p>{">"}</p>
                </div>
                {tripType === "round-trip" && (
                    <div onClick={() => setOpenResult("return")} className="flex justify-between items-center border-b border-b-gray-300 py-2.5 cursor-pointer">
                        <div className="space-y-1">
                            <h2 className="text-[18px] font-medium text-red-900">{to?.city} to {from?.city}</h2>
                            <h3 className="text-[15px] text-gray-700">{formatDate(lastDay)}</h3>
                        </div>
                        <p>{">"}</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col py-2">
                <div className="flex justify-between  space-y-1">
                    <h2 className="text-[18px] text-gray-700">Grand Total</h2>
                    <h3 className="font-medium text-[18px] text-red-900">{formatTotalPrice} USD</h3>
                </div>
                <p className="underline decoration-solid font-medium cursor-pointer w-fit">Payment Summary</p>
            </div>

            {openResult && (
            <div
                className="fixed inset-0 z-40 bg-black/40"
                onClick={() => setOpenResult(null)} 
            >
                <div
                className={`
                    absolute top-0 right-0 h-screen w-1/2 bg-white
                    transition-transform duration-300
                    translate-x-0
                `}
                onClick={(e) => e.stopPropagation()} 
                >
                <FlightDetails type={openResult}/>
                </div>
            </div>
            )}

        </div>
    )
}