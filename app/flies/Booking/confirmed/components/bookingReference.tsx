"use client"

import { useBooking } from "@/app/contexts/bookingContext"


//
function formatDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year : "numeric"
    });
}

export default function Reference(){

    const {booking} = useBooking()

    const tripType = booking.tripType
    const from = booking.from
    const to = booking.to
    const firstDay =  booking.dates?.departure 
    const lastDay =  booking.dates?.return 
    const passengers = booking.passengers

    return(

        <div className=" flex flex-col items-center justify-center mt-10 ">
            <div className=" border border-gray-300 px-6 py-3 w-[60%]">
                <div className="flex flex-col items-center py-2 border-b border-zinc-300"> 
                    <h3 className="font-medium">Booking Reference</h3>
                    <h4 className="text-xl text-red-900 font-bold">SL123455</h4>
                </div>

                <div className="flex justify-between items-start space-x-6 py-4">
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-gray-500 text-[15px]">From</h3>
                            <h4>{`${from?.city} (${from?.iata})`}</h4>
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-[15px]">To</h3>
                            <h4>{`${to?.city} (${to?.iata})`}</h4>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-gray-500 text-[15px]">Departure Date</h3>
                            <h4>{formatDate(firstDay)}</h4>
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-[15px]">Return Date</h3>
                            <h4>{formatDate(lastDay)}</h4>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-gray-500 text-[15px]">Flight</h3>
                            <h4>SL0123</h4>
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-[15px]">Passengers</h3>
                            <h4>{passengers}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}