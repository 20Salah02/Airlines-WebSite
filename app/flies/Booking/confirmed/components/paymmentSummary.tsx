"use client"

import { useBooking } from "@/app/contexts/bookingContext"
import { useCurrency } from "@/app/contexts/currencyContext"
//
import Link from "next/link"


export default function PaymmentSum(){

    //
    const {format} = useCurrency()

    //
    const {booking} = useBooking()

    const tripType =  booking.tripType 
    const goingPrice =   booking.outboundFlight?.price ?? 0
    const returnPrice = booking.returnFlight?.price ?? 0

    const totalPrice = tripType === "round-trip" ? goingPrice  + returnPrice : goingPrice
    
    const totalTaxes = tripType === "round-trip" ? 244 : 122
    const totalFare = totalPrice - totalTaxes    


    return(
        <div className="border border-gray-300 rounded-xl bg-white py-3 px-6 space-y-6">
            <h2 className="font-medium">Paymment Summary</h2>

            <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-end justify-between ">
                    <h2>Total fare</h2>
                    <h3>{format(totalFare)}</h3>
                </div>
                <div className="flex items-end justify-between  ">
                    <h2>Total taxes</h2>
                    <h3>{format(totalTaxes)}</h3>
                </div>
                <div className="flex justify-between items-end ">
                    <h2 className="text-[17px] text-zinc-600">Grand total</h2>
                    <h3 className="text-[17px] font-medium text-red-900">{format(totalPrice)}</h3>
                </div>
            </div>
            
            <Link href="../../">
            <button className="border-2 border-red-900 rounded-xl py-2 w-full text-red-900 font-medium cursor-pointer hover:bg-red-900 hover:text-white transition-all duration-300 ease-in-out">
                Back to Home
            </button>
            </Link>
        </div>
    )
}