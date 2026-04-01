"use client"

// context
import { useBooking } from "@/app/contexts/bookingContext";
//
import { useState } from "react";
// 
import { useSearchParams } from "next/navigation";
//
import FlightDetails from "@/app/flies/Booking/Containers/flightDetails";
import PaymentDetails from "./paymentDetails";
//

export default function TripDetails(){

    const [openResult, setOpenResult] = useState<"outbound" | "return" | null>(null)
    const [openPayment , setOpenPayment] = useState<boolean | null>(false)

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
        <div className="flex flex-col h-fit bg-white w-2/5 p-5 rounded-3xl space-y-2">
            <div className="space-y-2">
                <h1 className="font-medium text-[17px] text-red-900">Trip details</h1>
                <p>{tripType === "round-trip" ? "Round trip" : "One way"}</p>
            </div>

            
            <div >
                <div onClick={() => setOpenResult("outbound")} className="flex justify-between items-center border-b border-b-gray-300 py-2.5 cursor-pointer">
                    <div className="space-y-1">
                        <h2 className="text-[17px] font-medium text-red-900">{from?.city} to {to?.city}</h2>
                        <h3 className="text-[14px] text-gray-700">{formatDate(firstDay)}</h3>
                    </div>
                    <h4>
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 1024 1024"><path fill="currentColor" d="M340.9 149.3a30.6 30.6 0 0 0 0 42.8L652.7 512L341 831.9a30.6 30.6 0 0 0 0 42.7a29 29 0 0 0 41.7 0l331.6-340.3a32 32 0 0 0 0-44.6L382.6 149.4a29 29 0 0 0-41.7 0z"></path></svg>
                    </h4>
                </div>
                {tripType === "round-trip" && (
                    <div onClick={() => setOpenResult("return")} className="flex justify-between items-center border-b border-b-gray-300 py-2.5 cursor-pointer">
                        <div className="space-y-1">
                            <h2 className="text-[17px] font-medium text-red-900">{to?.city} to {from?.city}</h2>
                            <h3 className="text-[14px] text-gray-700">{formatDate(lastDay)}</h3>
                        </div>
                        <h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 1024 1024"><path fill="currentColor" d="M340.9 149.3a30.6 30.6 0 0 0 0 42.8L652.7 512L341 831.9a30.6 30.6 0 0 0 0 42.7a29 29 0 0 0 41.7 0l331.6-340.3a32 32 0 0 0 0-44.6L382.6 149.4a29 29 0 0 0-41.7 0z"></path></svg>
                        </h4>
                    </div>
                )}
            </div>
            <div className="flex flex-col py-2">
                <div className="flex justify-between  space-y-1">
                    <h2 className="text-[17px] text-gray-700">Grand Total</h2>
                    <h3 className="font-medium text-[17px] text-red-900">{formatTotalPrice} USD</h3>
                </div>
                <p
                    className="underline decoration-solid font-medium cursor-pointer w-fit"
                    onClick={() => setOpenPayment(prev => !prev)}
                >
                    Payment Summary
                </p>
            </div>

            <div
                className={`
                    fixed inset-0 z-40 bg-black/40
                    transition-opacity duration-300
                    ${openResult ? "opacity-100 " : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setOpenResult(null)}
            >
                <div
                    className={`
                        absolute top-0 right-0 h-screen w-1/2 bg-white
                        transition-transform duration-300
                        ${openResult ? "translate-x-0" : "translate-x-full"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {openResult && (
                        <FlightDetails
                            type={openResult}
                        />
                    )}
                </div>
            </div>

            <div
                className={`
                    fixed inset-0 z-40 bg-black/40
                    transition-opacity duration-300
                    ${openPayment ? "opacity-100 " : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setOpenPayment(null)}
            >
                <div
                    className={`
                        absolute top-0 right-0 h-screen w-1/2 bg-white
                        transition-transform duration-300
                        ${openPayment ? "translate-x-0" : "translate-x-full"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {openPayment && (
                        <PaymentDetails/>
                    )}
                </div>
            </div>

        </div>
    )
}