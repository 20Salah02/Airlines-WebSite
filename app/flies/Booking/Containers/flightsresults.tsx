"use client"

//context
import { useBooking } from "@/app/contexts/bookingContext"
import { useCurrency } from "@/app/contexts/currencyContext"
//
import { useState , useEffect } from "react"
//
import { useSearchParams , useRouter } from "next/navigation"
//
import EcoClass from "./BookingClass/economieClass"
import BusinessClass from "./BookingClass/businessClass"
import FlightDetails from "./flightDetails"
import ChangeCurrency from "./changeCurrency"

//
import { FareType } from "@/app/contexts/bookingContext"
import { useFlightResultContext } from "@/app/contexts/priceContext"

//
type OpenResultType = {
    type: "outbound" | "return",
    departureTime: string,
    arrivalTime: string
}
export default function FlightResults(){

    const [openClass, setOpenClass] = useState<{ index: number; type: "eco" | "business" } | null>(null)
    const [openResult, setOpenResult] = useState<OpenResultType | null>(null)  
    const [openCurrency , setOpenCurrency] = useState<boolean | null>(false)
    
    const FlightsSchedules = [
        { departureHour: 8,  departureMin: 0  },
        { departureHour: 9,  departureMin: 30 },
        { departureHour: 11, departureMin: 15 },
        { departureHour: 13, departureMin: 45 },
        { departureHour: 15, departureMin: 0  },
    ]

    //currncy

    const {format} = useCurrency()

    //
    const { booking, setBooking} = useBooking();
    
    const search = useSearchParams()
    const step = search.get("step"); 

    const isOutbound = step !== "return";

    const from = isOutbound ? booking.from : booking.to;
    const to = isOutbound ? booking.to : booking.from;


    const router = useRouter()


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
    function handleSelectFare(fare: FareType, price: number ,departureTime: string, arrivalTime: string) {
        setBooking(prev => ({
            ...prev,
            [isOutbound ? "outboundFlight" : "returnFlight"]: {
                flightId: "FLIGHT_123",
                fare,
                price,
                departureTime,
                arrivalTime
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


    const durationHours = flightResult?.durationHours ?? 9
    const durationMins  = flightResult?.durationMinutes ?? 0
    
    return(
        <div>

            <div className="flex justify-between items-center"> 
                <div>
                    <h2 className="font-bold pb-3 text-[18px]">{FlightsSchedules.length} results</h2>
                    <p className="text-gray-700">Fares displayed are for all passengers.</p>
                </div>
                <div>
                    <button
                        onClick={() => setOpenCurrency(prev => !prev)}
                        className="bg-white py-3 px-5 rounded-4xl mx-6 font-normal cursor-pointer"
                    >
                            Change Currency
                    </button>
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
                                    <div  className="flex justify-between">
                                        <div>
                                            <p className="text-3xl font-light">{depTime}</p>
                                            <p className="text-gray-600 text-[18px]">{from?.iata}</p>
                                        </div>

                                       <div className="flex-1 flex flex-col items-center px-4 relative">
      
                                        <div className="relative w-full flex items-center h-10">
                                            <div className="absolute w-full h-px bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
                                            
                                            <div className="absolute left-0 w-3 h-3 rounded-full border border-gray-400 bg-white z-10"></div>
                                            
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 z-10">
                                            <div className="w-8 h-8 bg-[#8A1538] rotate-45 flex items-center justify-center overflow-hidden shadow-sm">
                                                <span className="text-[10px] text-white -rotate-45 font-bold uppercase">SL</span>
                                            </div>
                                            </div>

                                            <div className="absolute right-0 w-3 h-3 rounded-full border border-gray-400 bg-white z-10"></div>
                                        </div>

                                        <div className="text-center mt-2">
                                            <p className="text-gray-600 text-[18px] font-normal tracking-wide">{flightDurationHour}h {flightDurationMin}min</p>
                                        </div>
                                        </div>
                                        
                                        <div className="">
                                            <p className="text-3xl font-light">{arrTime}</p>
                                            <p className="text-gray-600 text-[18px]">{to?.iata}</p>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => setOpenResult({type : isOutbound ? "outbound" : "return" , departureTime :depTime , arrivalTime: arrTime})} className="cursor-pointer font-medium underline decoration-solid w-fit">Flight Details</div>
                            </div>

                            <div className="flex justify-between  ">
                                <div   className="flex flex-col relative">
                                    <div onClick={() => handleToggleClass(index, "eco")} 
                                        className={`flex flex-col justify-start border ${openClass?.type === "eco" && openClass.index === index ? "border-black" : "border-gray-300"}  rounded-2xl w-60 h-45 mr-4 p-5 cursor-pointer hover:border-black duration-300`}
                                    >
                                        <p className="text-gray-600">Economy</p>
                                        <h2 className="text-3xl font-light flex pt-5">{format(ecoPrice)}</h2>
                                        <h6 className="font-extralight text-green-800">special offer</h6>
                                    </div>

                                </div>
                                <div 
                                    onClick={() => handleToggleClass(index, "business")} 
                                    className={`flex flex-col justify-start border ${openClass?.type === "business" && openClass.index === index ? "border-black" : "border-gray-300"}  rounded-2xl w-60 h-45 mr-4 p-5 cursor-pointer hover:border-black duration-300`}
                                >
                                    <p className="text-gray-600">Business</p>
                                    <h2 className="text-3xl font-light flex pt-5">{format(businessPrice)}</h2>
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
                                <EcoClass onSelect={(fare, price) => handleSelectFare(fare, price, depTime, arrTime)} />
                            </div>
                        <div
                                className={`
                                    overflow-hidden transition-all duration-500 ease-in-out
                                    ${isBusinessOpen ? " opacity-100 mt-6" : "max-h-0 opacity-0"}
                                `}
                                >
                                <BusinessClass onSelect={(fare, price) => handleSelectFare(fare, price, depTime, arrTime)} />
                            </div>

                        </div>
                    </div>
                )
            })}


            <div
                className={`
                    fixed inset-0 z-40 bg-black/40
                    transition-opacity duration-300
                    ${openResult ? "opacity-100 " : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setOpenResult(null)}
            >
                <div
                    className={`
                        absolute top-0 right-0 h-screen w-1/2 bg-white
                        transition-transform duration-300
                        ${openResult ? "translate-x-0" : "translate-x-full"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {openResult && (
                        <FlightDetails
                            type={openResult.type}
                            departureTime={openResult.departureTime}
                            arrivalTime={openResult.arrivalTime}
                        />
                    )}
                </div>
            </div>


            <div
                className={`
                    fixed inset-0 z-40 bg-black/40
                    transition-opacity duration-300
                    ${openCurrency ? "opacity-100 " : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setOpenCurrency(null)}
            >
                <div
                    className={`
                        absolute top-0 right-0 h-screen w-1/2 bg-white
                        transition-transform duration-300
                        ${openCurrency ? "translate-x-0" : "translate-x-full"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {openCurrency && (
                        <ChangeCurrency/>
                    )}
                </div>
            </div>

        </div>
    )
}