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

    const [openClass, setOpenClass] = useState<{ index: number; type: "eco" | "business" } | null>(null)
    const [openResult, setOpenResult] = useState<"outbound" | "return" | null>(null)  
    
    const FlightsSchedules = [
        { departureHour: 8,  departureMin: 0  },
        { departureHour: 9,  departureMin: 30 },
        { departureHour: 11, departureMin: 15 },
        { departureHour: 13, departureMin: 45 },
        { departureHour: 15, departureMin: 0  },
    ]

    
    const { booking, setBooking} = useBooking();
    
    const search = useSearchParams()
    const step = search.get("step"); 

    const isOutbound = step !== "return";

    const from = isOutbound ? booking.from : booking.to;
    const to = isOutbound ? booking.to : booking.from;


    const router = useRouter()

    // function handleOpenEco(){
    //     setOpenClass(prev => (prev === "eco" ? null : "eco"))
    // }

    // function handleOpenBusiness(){
    //     setOpenClass(prev => (prev === "business" ? null : "business"))
    // }

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

    
    // flight times

    function calcArrival(
            depHour: number,
            depMin: number,
            durationHours: number,
            durationMins: number
        ): string {
            const totalMins = depHour * 60 + depMin + durationHours * 60 + durationMins
            const arrHour = Math.floor(totalMins / 60) % 24
            const arrMin = totalMins % 60
    return `${String(arrHour).padStart(2, "0")}:${String(arrMin).padStart(2, "0")}`
    }

    function formatTime(hour: number, min: number): string {
        return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`
    }


    useEffect(() => {
        document.body.style.overflow = openResult ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [openResult])

  function handleToggleClass(index: number, type: "eco" | "business") {
        setOpenClass(prev =>
        prev?.index === index && prev?.type === type ? null : { index, type }
        )
  }


    //
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


    // ✅ الصح - خد المدة من الـ context مباشرة
    const durationHours = isOutbound ? (flightResult?.durationHours ?? 9)  : 11
    const durationMins  = isOutbound ? (flightResult?.durationMinutes ?? 0) : 45
    
    return(
        <div>

            <div className="flex justify-between items-center"> 
                <div>
                    <h2 className="font-bold pb-3 text-[18px]">{FlightsSchedules.length} results</h2>
                    <p className="text-gray-700">Fares displayed are for all passengers.</p>
                </div>
                <div>
                    <button className="bg-white py-3 px-5 rounded-4xl mx-6 font-normal cursor-pointer">Change Currency</button>
                    <button  className="bg-white py-3 px-5 rounded-4xl font-normal cursor-pointer">Sort And Filter</button>
                </div>
            </div>
            {/*  */}

            {FlightsSchedules.map((flight , index) => {
                const depTime = formatTime(flight.departureHour, flight.departureMin)
                const arrTime = calcArrival(flight.departureHour, flight.departureMin, durationHours, durationMins)
                const isEcoOpen     = openClass?.index === index && openClass?.type === "eco"
                const isBusinessOpen = openClass?.index === index && openClass?.type === "business"

                return(
            
                    <div key={index} className="bg-white rounded-4xl p-5 my-4">
                        <div className="flex items-center justify-between ">
                            <div className="w-1/3">
                                <div>StarLink Wi-Fi</div>
                                <div className="my-7">
                                    <div  className="flex text-4xl font-light justify-between">
                                        <p>{depTime}</p>
                                        <div className="text-lg font-normal text-gray-600">
                                            <p className="flex justify-center items-center">L</p>
                                            <p className="pt-4"> {flightDurationHour}h  {flightDurationMin}min</p>
                                        </div>
                                        <p>{arrTime}</p>
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
                                    <div onClick={() => handleToggleClass(index, "eco")} className="flex flex-col justify-start border border-gray-300 rounded-2xl w-70 h-47 mr-4 p-5 cursor-pointer hover:border-black duration-300">
                                        <p className="text-gray-600">Economy</p>
                                        <h2 className="text-4xl font-light flex pt-5">{ecoPrice} USD</h2>
                                        <h6 className="font-extralight text-green-800">special offer</h6>
                                    </div>

                                </div>
                                <div onClick={() => handleToggleClass(index, "business")} className="flex flex-col justify-start border border-gray-300 rounded-2xl w-70 h-47 mr-4 p-5 cursor-pointer hover:border-black duration-300">
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
                                    ${isEcoOpen ? " opacity-100 mt-6" : "max-h-0 opacity-0"}
                                `}
                                >
                                <EcoClass onSelect={handleSelectFare} />
                            </div>
                        <div
                                className={`
                                    overflow-hidden transition-all duration-500 ease-in-out
                                    ${isBusinessOpen ? " opacity-100 mt-6" : "max-h-0 opacity-0"}
                                `}
                                >
                                <BusinessClass onSelect={handleSelectFare} />
                            </div>

                        </div>
                    </div>
                )
            })}


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