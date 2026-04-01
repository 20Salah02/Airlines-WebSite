"use client"

import { useBooking } from "@/app/contexts/bookingContext"
import { useSearchParams } from "next/navigation"
//
import { useState } from "react"
//
import PaymentDetails from "../../containers/paymentDetails"


export default function TripReviewDetails(){

    const [openPayment , setOpenPayment] = useState<boolean | null>(false)


    const {booking} = useBooking()
    const search = useSearchParams()
    const step = search.get("step")
    const isOutbound = step !== "return"

    const tripType = isOutbound ? booking.tripType : ""
    const goingPrice = isOutbound ? booking.outboundFlight?.price ?? 0 : booking.returnFlight?.price ?? 0;
    const returnPrice = isOutbound ? booking.returnFlight?.price ?? 0 : booking.outboundFlight?.price ?? 0;

    const totalPrice = tripType === "round-trip" ? goingPrice  + returnPrice : goingPrice
    const formatTotalPrice = totalPrice.toLocaleString()


    return(
        <div className="bg-white p-4 rounded-3xl w-full space-y-4 h-fit sticky top-10">
            <h2 className="font-medium text-[18px] text-red-900">Trip details</h2>
            <div className="flex flex-col py-2">
                <div className="flex justify-between  space-y-1">
                    <h2 className="text-[17px] text-gray-700">Grand Total</h2>
                    <h3 className="font-medium text-[17px] text-red-900">{formatTotalPrice} USD</h3>
                </div>
                <p 
                    className="text-[15px] underline decoration-solid font-medium cursor-pointer w-fit"
                    onClick={() => setOpenPayment(prev => !prev)}
                >
                    Payement Summary
                </p>
            </div>
            <div className="flex items-start space-x-3">
                <input className="w-7 h-7 cursor-pointer accent-red-900" type="checkbox" id="terms"/>
                <label className="text-[15px]" htmlFor="terms">
                    I have read and accept the purchase conditions and fare rules, 
                    as well as all the terms and conditions and general conditions
                    of carriage applicable to my flight.
                </label>
            </div>
            <button
                className="bg-red-900 border-2 border-red-900 rounded-full w-full py-3 font-bold text-md text-amber-50 cursor-pointer hover:bg-red-800 transition"
            >
                Continue the payment
            </button>

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