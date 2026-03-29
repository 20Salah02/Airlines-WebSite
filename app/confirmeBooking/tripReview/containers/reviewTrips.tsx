"use client"

//
import { useState } from "react"
//
import { useBooking } from "@/app/contexts/bookingContext"
import { useFlightResultContext } from "@/app/contexts/priceContext"
import Image from "next/image"

//
import FlightDetails from "@/app/flies/Booking/Containers/flightDetails"



export default function ReviewTheTrips(){

    const [flightDetails, setFlightDetails] = useState<"outbound" | "return" | null>(null)
    const openFlightDetails = (type: "outbound" | "return") => {
        setFlightDetails(type)
    }


    const {booking} = useBooking()

    
    const tripType = booking.tripType 
    const from = booking.from 
    const to = booking.to 
    const firstDay =  booking.dates?.departure 
    const lastDay =  booking.dates?.return 
    const outboundTime = booking.outboundFlight
    const returnTime = booking.returnFlight
    

    function formatDate(date?: Date | null) {
        if (!date) return "";
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year : "numeric"
        });
    }

    const {flightResult} = useFlightResultContext()

    const flightDurationHour = flightResult?.durationHours
    const flightDurationMin  = flightResult?.durationMinutes

    return(
        <div className="space-y-8 w-full">
            <h1 className="text-3xl font-light text-gray-600">Review your Trip</h1>

            <div className="flex bg-white rounded-3xl ">
                <div className="w-1/3 relative">
                      <Image
                            src="/h1-a350-hero.jpg"
                            alt=""
                            fill
                            className="object-cover rounded-l-3xl"
                        />
                </div>

                <div className=" w-2/3 space-y-5 p-4">
                    <div className="text-gray-600">{formatDate(firstDay)}</div>

                    <div className="flex justify-between items-start ">
                        <div className="flex-1 space-y-2 ">
                            <h2 className="text-3xl font-light">{from?.iata}</h2>
                            <h3 className="text-[17px] text-gray-600">{outboundTime?.departureTime}</h3>
                            <h4 className="text-gray-600">{from?.city}</h4>
                            <h5>{from?.name}</h5>
                        </div>
                        <div className="flex-1 space-y-3 flex flex-col items-center justify-center">
                            <div className="w-6 h-6 bg-red-900 rotate-45 flex items-center justify-center overflow-hidden shadow-sm">
                                <span className="text-[9px] text-white -rotate-45 font-bold uppercase">SL</span>
                            </div>
                            <h3 className="text-[17px] text-gray-600 font-normal">
                                {`${flightDurationHour}h ${flightDurationMin}min`}
                            </h3>
                        </div>
                        <div className="flex-1 space-y-2 text-right "> 
                            <h2 className="text-3xl font-light ">{to?.iata}</h2>
                            <h3 className="text-[17px] text-gray-600">{outboundTime?.arrivalTime}</h3>
                            <h4 className="text-gray-600">{to?.city}</h4>
                            <h5>{to?.name}</h5>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h6 onClick={() => openFlightDetails("outbound")} className="underline decoration-solid font-medium cursor-pointer w-fit">View flight details</h6>
                    </div>
                </div>
            </div>  


            {tripType === "round-trip" &&(
            <div className="flex bg-white rounded-3xl ">
                <div className="w-1/3 relative">
                      <Image
                            src="/h1-mia-qntc-hn.jpg"
                            alt=""
                            fill
                            className="object-cover rounded-l-3xl"
                        />
                </div>

                <div className=" w-2/3 space-y-5 p-4">
                    <div className="text-gray-600">{formatDate(lastDay)}</div>

                    <div className="flex justify-between items-start ">
                        <div className="flex-1 space-y-3 ">
                            <h2 className="text-3xl font-light">{to?.iata}</h2>
                            <h3 className="text-[17px] text-gray-600">{returnTime?.departureTime}</h3>
                            <h4 className="text-gray-600">{to?.city}</h4>
                            <h5>{to?.name}</h5>
                        </div>
                        <div className="flex-1 space-y-3 flex flex-col items-center justify-center">
                            <div className="w-6 h-6 bg-red-900 rotate-45 flex items-center justify-center overflow-hidden shadow-sm">
                                <span className="text-[9px] text-white -rotate-45 font-bold uppercase">SL</span>
                            </div>
                            <h3 className="text-[17px] text-gray-600 font-normal">
                                {`${flightDurationHour}h ${flightDurationMin}min`}
                            </h3>
                        </div>
                        <div className="flex-1 space-y-3 text-right "> 
                            <h2 className="text-3xl font-light ">{from?.iata}</h2>
                            <h3 className="text-[17px] text-gray-600">{returnTime?.arrivalTime}</h3>
                            <h4 className="text-gray-600">{from?.city}</h4>
                            <h5>{from?.name}</h5>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h6 onClick={() => openFlightDetails("return")} className="underline decoration-solid font-medium cursor-pointer w-fit">View flight details</h6>
                    </div>
                </div>
            </div>
            )}  

            <div
                className={`
                    fixed inset-0 z-40 bg-black/40
                    transition-opacity duration-300
                    ${flightDetails ? "opacity-100 " : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setFlightDetails(null)}
            >
                <div
                    className={`
                        absolute top-0 right-0 h-screen w-1/2 bg-white
                        transition-transform duration-300
                        ${flightDetails ? "translate-x-0" : "translate-x-full"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {flightDetails  && (
                        <FlightDetails
                            type={flightDetails}

                        />
                    )}
                </div>
            </div>
        </div>
    )
}