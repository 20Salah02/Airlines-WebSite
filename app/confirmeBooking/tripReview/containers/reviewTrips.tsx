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
        <div className="space-y-10 w-full">
            <h1 className="text-4xl font-light text-gray-600">Review your Trip</h1>

            <div className="flex bg-white rounded-3xl ">
                <div className="w-1/3 relative">
                      <Image
                            src="/h1-a350-hero.jpg"
                            alt=""
                            fill
                            className="object-cover rounded-l-3xl"
                        />
                </div>

                <div className=" w-2/3 space-y-7 p-4">
                    <div className="text-gray-600">{formatDate(firstDay)}</div>

                    <div className="flex justify-between items-start ">
                        <div className="flex-1 space-y-3 ">
                            <h2 className="text-4xl font-light">{from?.iata}</h2>
                            <h3 className="text-[19px] text-gray-600">10:00</h3>
                            <h4 className="text-gray-600">{from?.city}</h4>
                            <h5>{from?.name}</h5>
                        </div>
                        <div className="flex-1 space-y-3 flex justify-center flex-col">
                            <h2 className="flex justify-center">L</h2>
                            <h3 className="text-[19px] text-gray-600  flex justify-center">{`${flightDurationHour}h ${flightDurationMin}min`}</h3>
                        </div>
                        <div className="flex-1 space-y-3 text-right "> 
                            <h2 className="text-4xl font-light ">{to?.iata}</h2>
                            <h3 className="text-[19px] text-gray-600">12:00</h3>
                            <h4 className="text-gray-600">{to?.city}</h4>
                            <h5>{to?.name}</h5>
                        </div>
                    </div>
                    <div className="mt-10">
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

                <div className=" w-2/3 space-y-7 p-4">
                    <div className="text-gray-600">{formatDate(lastDay)}</div>

                    <div className="flex justify-between items-start ">
                        <div className="flex-1 space-y-3 ">
                            <h2 className="text-4xl font-light">{to?.iata}</h2>
                            <h3 className="text-[19px] text-gray-600">10:00</h3>
                            <h4 className="text-gray-600">{to?.city}</h4>
                            <h5>{to?.name}</h5>
                        </div>
                        <div className="flex-1 space-y-3 flex justify-center flex-col">
                            <h2 className="flex justify-center">L</h2>
                            <h3 className="text-[19px] text-gray-600  flex justify-center">{`${flightDurationHour}h ${flightDurationMin}min`}</h3>
                        </div>
                        <div className="flex-1 space-y-3 text-right "> 
                            <h2 className="text-4xl font-light ">{from?.iata}</h2>
                            <h3 className="text-[19px] text-gray-600">12:00</h3>
                            <h4 className="text-gray-600">{from?.city}</h4>
                            <h5>{from?.name}</h5>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h6 onClick={() => openFlightDetails("return")} className="underline decoration-solid font-medium cursor-pointer w-fit">View flight details</h6>
                    </div>
                </div>
            </div>
            )}  

            {flightDetails && (
                <div
                    className="fixed inset-0 z-40 bg-black/40"
                    onClick={() => setFlightDetails(null)}
                >
                    <div
                        className={`
                            absolute top-0 right-0 h-screen w-1/2 bg-white
                            transition-transform duration-300
                            translate-x-0
                        `}
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <FlightDetails type={flightDetails}/>
                    </div>
                </div>
            )}
        </div>
    )
}