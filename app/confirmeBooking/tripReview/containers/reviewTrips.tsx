"use client"

//
import { useState , useEffect } from "react"
//
import { useBooking } from "@/app/contexts/bookingContext"
import { useFlightResultContext } from "@/app/contexts/priceContext"
import Image from "next/image"
//
import FlightDetails from "@/app/flies/Booking/Containers/flightDetails"
// skelton
import Skeleton , {SkeletonTheme} from "react-loading-skeleton"



export default function ReviewTheTrips(){

    const [flightDetails, setFlightDetails] = useState<"outbound" | "return" | null>(null)
    const openFlightDetails = (type: "outbound" | "return") => {
        setFlightDetails(type)
    }
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0)
        return () => clearTimeout(timer)
    }, [])

    const loading = !mounted


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

    //
    useEffect(() => {
        document.body.style.overflow = flightDetails ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [flightDetails])

    return(
        <div className="space-y-8 w-full">
            <h1 className="text-3xl font-light text-gray-600">Review your Trip</h1>

            {loading ? (
                <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f1f5f9">

                    <div className="flex lg:flex-row flex-col bg-white rounded-3xl w-full overflow-hidden">
                        <div className="lg:w-1/3 lg:h-auto h-50 w-full">
                            <Skeleton height="100%" />
                        </div>
                        <div className="lg:w-2/3 w-full space-y-5 p-4">
                            <Skeleton width="30%" height={16} />
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <Skeleton width={60} height={28} />
                                    <Skeleton width={50} height={14} />
                                    <Skeleton width={80} height={14} />
                                    <Skeleton width={120} height={14} />
                                </div>
                                <div className="flex flex-col items-center space-y-3">
                                    <Skeleton width={24} height={24} />
                                    <Skeleton width={70} height={14} />
                                </div>
                                <div className="space-y-2 flex flex-col items-end">
                                    <Skeleton width={60} height={28} />
                                    <Skeleton width={50} height={14} />
                                    <Skeleton width={80} height={14} />
                                    <Skeleton width={120} height={14} />
                                </div>
                            </div>
                            <Skeleton width={120} height={16} />
                        </div>
                    </div>

                    <div className="flex lg:flex-row flex-col bg-white rounded-3xl w-full overflow-hidden">
                        <div className="lg:w-1/3 lg:h-auto h-50 w-full">
                            <Skeleton height="100%" />
                        </div>
                        <div className="lg:w-2/3 w-full space-y-5 p-4">
                            <Skeleton width="30%" height={16} />
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <Skeleton width={60} height={28} />
                                    <Skeleton width={50} height={14} />
                                    <Skeleton width={80} height={14} />
                                    <Skeleton width={120} height={14} />
                                </div>
                                <div className="flex flex-col items-center space-y-3">
                                    <Skeleton width={24} height={24} />
                                    <Skeleton width={70} height={14} />
                                </div>
                                <div className="space-y-2 flex flex-col items-end">
                                    <Skeleton width={60} height={28} />
                                    <Skeleton width={50} height={14} />
                                    <Skeleton width={80} height={14} />
                                    <Skeleton width={120} height={14} />
                                </div>
                            </div>
                            <Skeleton width={120} height={16} />
                        </div>
                    </div>
                </SkeletonTheme>
            ) : (
                <>
                    <div className="flex lg:flex-row flex-col bg-white rounded-3xl w-full">
                        <div className="lg:w-1/3 lg:h-auto h-50 w-full relative">
                            <Image
                                    src="/h1-a350-hero.jpg"
                                    alt=""
                                    fill
                                    className="object-cover lg:rounded-l-3xl lg:rounded-t-none rounded-t-3xl"
                                />
                        </div>

                        <div className=" lg:w-2/3 w-full space-y-5 p-4">
                            <div className="text-gray-600">{formatDate(firstDay)}</div>

                            <div className="flex justify-between items-start ">
                                <div className="flex-1 space-y-2">
                                    <h2 className="text-2xl font-light">{from?.iata}</h2>
                                    <h3 className="text-[15px] text-gray-600">{outboundTime?.departureTime}</h3>
                                    <h4 className="text-gray-600 lg:text-[16px] text-[15px]">{from?.city}</h4>
                                    <h5 className="lg:text-[16px] text-[15px]">{from?.name}</h5>
                                </div>
                                <div className="flex-1 space-y-3 flex flex-col items-center justify-center">
                                    <div className="w-6 h-6 bg-red-900 rotate-45 flex items-center justify-center overflow-hidden shadow-sm">
                                        <span className="text-[9px] text-white -rotate-45 font-bold uppercase">SL</span>
                                    </div>
                                    <h3 className="text-[15px] text-gray-600 font-normal">
                                        {`${flightDurationHour}h ${flightDurationMin}min`}
                                    </h3>
                                </div>
                                <div className="flex-1 space-y-2 text-right "> 
                                    <h2 className="text-2xl font-light ">{to?.iata}</h2>
                                    <h3 className="text-[15px] text-gray-600">{outboundTime?.arrivalTime}</h3>
                                    <h4 className="text-gray-600 lg:text-[16px] text-[15px]">{to?.city}</h4>
                                    <h5 className="lg:text-[16px] text-[15px]">{to?.name}</h5>
                                </div>
                            </div>
                            <div className="lg:mt-8">
                                <h6 onClick={() => openFlightDetails("outbound")} className="underline decoration-solid font-medium cursor-pointer w-fit lg:text-[16px] text-[15px]">View flight details</h6>
                            </div>
                        </div>
                    </div>  

                    {tripType === "round-trip" &&(
                    <div className="flex lg:flex-row flex-col bg-white rounded-3xl w-full">
                        <div className="lg:w-1/3 lg:h-auto h-50 w-full relative">
                            <Image
                                    src="/h1-mia-qntc-hn.jpg"
                                    alt=""
                                    fill
                                    className="object-cover lg:rounded-l-3xl lg:rounded-t-none rounded-t-3xl"
                                />
                        </div>

                        <div className=" lg:w-2/3 w-full space-y-5 p-4">
                            <div className="text-gray-600">{formatDate(lastDay)}</div>

                            <div className="flex justify-between items-start ">
                                <div className="flex-1 space-y-3 ">
                                    <h2 className="text-2xl font-light">{to?.iata}</h2>
                                    <h3 className="text-[15px] text-gray-600 ">{returnTime?.departureTime}</h3>
                                    <h4 className="text-gray-600 lg:text-[16px] text-[15px]">{to?.city}</h4>
                                    <h5 className="lg:text-[16px] text-[15px]">{to?.name}</h5>
                                </div>
                                <div className="flex-1 space-y-3 flex flex-col items-center justify-center">
                                    <div className="w-6 h-6 bg-red-900 rotate-45 flex items-center justify-center overflow-hidden shadow-sm">
                                        <span className="text-[9px] text-white -rotate-45 font-bold uppercase">SL</span>
                                    </div>
                                    <h3 className="text-[15px] text-gray-600 font-normal">
                                        {`${flightDurationHour}h ${flightDurationMin}min`}
                                    </h3>
                                </div>
                                <div className="flex-1 space-y-3 text-right "> 
                                    <h2 className="text-2xl font-light ">{from?.iata}</h2>
                                    <h3 className="text-[15px] text-gray-600">{returnTime?.arrivalTime}</h3>
                                    <h4 className="text-gray-600 lg:text-[16px] text-[15px]">{from?.city}</h4>
                                    <h5 className="lg:text-[16px] text-[15px]">{from?.name}</h5>
                                </div>
                            </div>
                            <div className="lg:mt-8">
                                <h6 onClick={() => openFlightDetails("return")} className="underline decoration-solid font-medium cursor-pointer w-fit lg:text-[16px] text-[15px]">View flight details</h6>
                            </div>
                        </div>
                    </div>
                    )}
                </>
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
                        fixed bg-white transition-all duration-300 ease-in-out
                        
                        bottom-0 left-0 w-full h-[80vh] rounded-t-2xl
                        ${flightDetails ? "translate-y-0" : "translate-y-full"}

                        lg:top-0 lg:right-0 lg:left-auto lg:h-screen lg:w-1/2 lg:rounded-none 
                        lg:bottom-auto
                        ${flightDetails ? "lg:translate-y-0 lg:translate-x-0" : "lg:translate-x-full lg:translate-y-0"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {flightDetails && (
                        <FlightDetails
                            type={flightDetails}
                            setOpen={() => setFlightDetails(null)}                        
                        />
                    )}
                </div>
            </div>
        </div>
    )
}