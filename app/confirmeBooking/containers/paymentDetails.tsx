"use client"

//
import { useBooking } from "@/app/contexts/bookingContext"
import { useCurrency } from "@/app/contexts/currencyContext"


export default function PaymentDetails(){

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
        <div className="bg-white p-9 border-l border-l-gray-300 h-screen space-y-15">
            <h1 className="flex justify-center text-xl">Payment summary</h1>
            <div className="flex flex-col justify-center">
                <div className="flex justify-between py-6 border-b border-b-gray-300 text-[17px]">
                    <h2>Total fare</h2>
                    <h3>{format(totalFare)}</h3>
                </div>
                <div className="flex justify-between py-6 border-b border-b-gray-300 text-[17px]">
                    <h2>Total taxes, fees and chargese</h2>
                    <h3>{format(totalTaxes)}</h3>
                </div>
                <div className="flex justify-between py-6  ">
                    <h2 className="text-[19px] text-zinc-600">Grand total</h2>
                    <h3 className="text-[18px] font-medium">{format(totalPrice)}</h3>
                </div>
            </div>
        </div>
    )
}