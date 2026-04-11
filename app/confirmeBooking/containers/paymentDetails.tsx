"use client"

//
import { useBooking } from "@/app/contexts/bookingContext"
import { useCurrency } from "@/app/contexts/currencyContext"

type payment = {
    setOpen : () => void
}

export default function PaymentDetails({setOpen} : payment){

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
        <div className="bg-white lg:p-9 py-6 px-3 lg:border-l lg:rounded-t-none rounded-t-full border-l-gray-300 h-screen lg:space-y-15 space-y-8">
            <button 
                onClick={() => setOpen()}
                className=" absolute right-4 top-5 p-2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg>
            </button>
            <h1 className="flex justify-center lg:text-xl text-[17px]">Payment summary</h1>
            <div className="flex flex-col justify-center">
                <div className="flex items-end justify-between lg:py-6 py-4 border-b border-b-gray-300 text-[17px]">
                    <h2>Total fare</h2>
                    <h3>{format(totalFare)}</h3>
                </div>
                <div className="flex items-end justify-between lg:py-6 py-4 border-b border-b-gray-300 text-[17px]">
                    <h2>Total taxes,<br></br> fees and chargese</h2>
                    <h3>{format(totalTaxes)}</h3>
                </div>
                <div className="flex justify-between items-end py-6  ">
                    <h2 className="text-[19px] text-zinc-600">Grand total</h2>
                    <h3 className="text-[18px] font-medium text-red-900">{format(totalPrice)}</h3>
                </div>
            </div>
        </div>
    )
}