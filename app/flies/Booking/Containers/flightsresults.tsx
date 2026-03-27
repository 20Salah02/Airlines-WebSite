"use client"

//context
import { useBooking } from "@/app/contexts/bookingContext"
//
import { useState , useEffect } from "react"
//
import { useSearchParams , useRouter } from "next/navigation"
//
import EcoClass from "./BookingClass/economieClass"
import BusinessClass from "./BookingClass/businessClass"
import FlightDetails from "./flightDetails"
import FlightCalculator from "./flightCalculator"

//
import { FareType } from "@/app/contexts/bookingContext"
import { useFlightResultContext } from "@/app/contexts/priceContext"


export default function FlightResults(){

    const [openClass , setopenClass] = useState<"eco" | "business" | null>(null)
    const [openResult, setOpenResult] = useState<"outbound" | "return" | null>(null)  
    
    const outboundDepartureTimes = [
        "06:00", "07:30", "08:00", "09:30", "11:00",
        "13:00", "14:30", "16:00", "18:30"
    ]

    const returnDepartureTimes = [
        "05:00", "06:30", "08:00", "09:00", "10:30",
        "12:00", "13:30", "15:00", "16:30", "18:00", "20:00"
    ]
    
    const { booking, setBooking} = useBooking();
    
    const search = useSearchParams()
    const step = search.get("step"); 

    const isOutbound = step !== "return";

    const from = isOutbound ? booking.from : booking.to;
    const to = isOutbound ? booking.to : booking.from;


    const router = useRouter()

    function handleOpenEco(){
        setopenClass(prev => (prev === "eco" ? null : "eco"))
    }

    function handleOpenBusiness(){
        setopenClass(prev => (prev === "business" ? null : "business"))
    }

    useEffect(() => {
        if (openResult) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [openResult]);

    


    function handleSelectFare(fare: FareType, price: number) {
        setBooking(prev => ({
            ...prev,
            [isOutbound ? "outboundFlight" : "returnFlight"]: {
            flightId: "FLIGHT_123",
            fare,
            price,
            },
        }));

        if (isOutbound && booking.tripType === "round-trip") {
            router.push("?step=return");
        } else {
            router.push("/confirmeBooking");
        }
    }

            //
    const {flightResult} = useFlightResultContext()

    const basePrice = flightResult?.price ?? 0
    const flightDurationHour = flightResult?.durationHours
    const flightDurationMin = flightResult?.durationMinutes

    const ecoPrice = Math.round(basePrice)
    const businessPrice = Math.round(basePrice * 2.5)

    return(
        <div>

            <div className="flex justify-between items-center"> 
                <div>
                    <h2 className="font-bold pb-3 text-[18px]">15 results</h2>
                    <p className="text-gray-700">Fares displayed are for all passengers.</p>
                </div>
                <div>
                    <button className="bg-white py-3 px-5 rounded-4xl mx-6 font-normal cursor-pointer">Change Currency</button>
                    <button  className="bg-white py-3 px-5 rounded-4xl font-normal cursor-pointer">Sort And Filter</button>
                </div>
            </div>
            {/*  */}


            <div className="bg-white rounded-4xl p-5 my-4">
                <div className="flex items-center justify-between ">
                    <div className="w-1/3">
                        <div>StarLink Wi-Fi</div>
                        <div className="my-7">
                            <div  className="flex text-4xl font-light justify-between">
                                <p>10:00</p>
                                <div className="text-lg font-normal text-gray-600">
                                    <p className="flex justify-center items-center">L</p>
                                    <p className="pt-4"> {flightDurationHour}h {flightDurationMin}min</p>
                                </div>
                                <p>12:10</p>
                            </div>
                            <div className="flex justify-between text-gray-600 text-[20px]">
                                <p>{from?.iata}</p>
                                <p>{to?.iata}</p>
                            </div>
                        </div>
                        <div onClick={() => setOpenResult(isOutbound ? "outbound" : "return")} className="cursor-pointer font-medium underline decoration-solid w-fit">Flight Details</div>
                    </div>

                    <div className="flex justify-between  ">
                        <div   className="flex flex-col relative">
                            <div onClick={handleOpenEco} className="flex flex-col justify-start border border-gray-300 rounded-2xl w-70 h-47 mr-4 p-5 cursor-pointer hover:border-black duration-300">
                                <p className="text-gray-600">Economy</p>
                                <h2 className="text-4xl font-light flex pt-5">{ecoPrice} USD</h2>
                                <h6 className="font-extralight text-green-800">special offer</h6>
                            </div>

                        </div>
                        <div onClick={handleOpenBusiness} className="flex flex-col justify-start border border-gray-300 rounded-2xl w-70 h-47 mr-4 p-5 cursor-pointer hover:border-black duration-300">
                            <p className="text-gray-600">Business</p>
                            <h2 className="text-4xl font-light flex pt-5">{businessPrice} USD</h2>
                            <h6 className="font-extralight text-green-800">special offer</h6>
                        </div>
                    </div> 
                </div>

                <div>
                   <div
                        className={`
                            overflow-hidden transition-all duration-500 ease-in-out
                            ${openClass === "eco" ? " opacity-100 mt-6" : "max-h-0 opacity-0"}
                        `}
                        >
                        <EcoClass onSelect={handleSelectFare} />
                    </div>
                   <div
                        className={`
                            overflow-hidden transition-all duration-500 ease-in-out
                            ${openClass === "business" ? " opacity-100 mt-6" : "max-h-0 opacity-0"}
                        `}
                        >
                        <BusinessClass onSelect={handleSelectFare} />
                    </div>

                </div>
            </div>


            {openResult && (
            <div
                className="fixed inset-0 z-40 bg-black/40"
                onClick={() => setOpenResult(null)} 
            >
                <div
                className={`
                    absolute top-0 right-0 h-screen w-1/2 bg-white
                    transition-transform duration-300
                    translate-x-0
                `}
                onClick={(e) => e.stopPropagation()} 
                >
                <FlightDetails type={openResult}/>
                </div>
            </div>
            )}
            <FlightCalculator />

        </div>
    )
}