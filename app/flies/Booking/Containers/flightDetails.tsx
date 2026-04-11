"use client"

// context
//
import { useBooking } from "@/app/contexts/bookingContext";
import { useFlightResultContext } from "@/app/contexts/priceContext";

type Props = {
    type: "outbound" | "return"
    departureTime?: string,
    arrivalTime?: string
    setOpen : () => void
}

export default function FlightDetails({type ,departureTime ,arrivalTime ,setOpen}:Props){

    const {booking} = useBooking()
    const isOutbound = type === "outbound"

    const from = isOutbound ? booking.from : booking.to
    const to = isOutbound ? booking.to : booking.from
    const firstDay = isOutbound ? booking.dates?.departure : booking.dates?.return
    

    function formatDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year : "numeric"
    });
    }

    const {flightResult} = useFlightResultContext()
    if (!flightResult) return null

    const flightDurationHour = flightResult.durationHours
    const flightDurationMin  = flightResult.durationMinutes

    //
    const selectedFlight = isOutbound ? booking.outboundFlight : booking.returnFlight
    const depTime = departureTime || selectedFlight?.departureTime
    const arrTime = arrivalTime || selectedFlight?.arrivalTime


    return(
        
        <div className="bg-white lg:p-9 py-7 px-4 lg:border-l border-l-gray-300 lg:rounded-t-none rounded-t-full  lg:h-screen lg:space-y-20 space-y-12">
            <button 
                onClick={() => setOpen()}
                className=" absolute right-4 top-5 p-2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg>
            </button>
            <h1 className="flex justify-center lg:text-xl text-[17px]">Flight details</h1>
            <div className="space-y-3 lg:mb-15">
                <h2 className="font-medium text-lg text-red-900">{from?.city} <span className="font-normal text-gray-600">to</span> {to?.city}</h2>
                <h3 className="text-gray-600">{formatDate(firstDay)}</h3>
            </div>

            <div className="flex space-x-8 ">
                <div className="flex flex-col justify-between py-1 text-left space-y-14 lg:text-[16px] text-[15px]">
                    <p>{depTime}</p>
                    <p className="whitespace-nowrap shrink-0">{flightDurationHour}h {flightDurationMin}min</p>
                    <p>{arrTime}</p>
                </div>
                
                    <div className="relative flex flex-col items-center py-3">
                        <div className="w-4 h-4 rounded-full border border-gray-400 bg-white z-10"></div>
                        
                        <div className="flex-1 w-px bg-gray-300"></div>
                        
                        <div className="my-4 z-10">
                            <div className="w-6 h-6 bg-red-900 rotate-45 flex items-center justify-center overflow-hidden">
                            <span className="text-[10px] text-white -rotate-45 font-bold">SL</span>
                            </div>
                        </div>

                        <div className="flex-1 w-px bg-gray-300"></div>

                        <div className="w-4 h-4 rounded-full border border-gray-400 bg-white z-10"></div>
                    </div>

                <div className="space-y-7">
                    <div>
                        <h2 className="font-medium text-red-900">{from?.city}</h2>
                        <h3 className="text-gray-600 lg:text-[16px] text-[14px]">{from?.name} ({from?.iata})</h3>
                    </div>
                    <div>
                        <h2 className="text-red-900">Boeing 777-300</h2>
                        <h3 className="text-gray-600 lg:text-[16px] text-[14px]">Operated by Salah</h3>
                    </div>
                    <div>
                        <h2 className="font-medium text-red-900">{to?.city}</h2>
                        <h3 className="text-gray-600 lg:text-[16px] text-[14px]">{to?.name} ({to?.iata})</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}