"use client"

// context
import { useBooking } from "../contexts/bookingContext"
import { useOutsideClick } from "../hooks/dropDownClose"
//
import { useState , useRef } from "react"
//
import { useRouter } from "next/navigation"
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
//
import HandlePassengers from "../hooks/mainFormPassengers"
import HandleDate from "../hooks/mainFormDate"
import HandleDestination from "../hooks/mainFormDestination"
//
import { DateRange } from "react-day-picker"

export default function Form(){
    type Airport ={
    id: number;
    name: string; 
    city: string; 
    country: string; 
    iata: string;
    latitude : number;
    longitude : number
    }
    const firstDayDefault = new Date();
    const lastDayDefault = new Date();
    lastDayDefault.setDate(firstDayDefault.getDate() + 5)

    const [openPassengers , setOpenPassengers] = useState<boolean>(false)
    const [passengersText , setpassengersText] = useState<string>("1 Passenger Economy")

    const [openCalendar , setopenCalendare] = useState<boolean>(false) 

    const [tripType, setTripType] = useState<"one-way" | "round-trip">("round-trip");

    const [selectDate , setSelectDate] = useState<DateRange | undefined>({
        from : firstDayDefault ,
        to: tripType === "round-trip" ? lastDayDefault : undefined,
    })
    const firstDay = formatDate(selectDate?.from)
    const lastDay = formatDate(selectDate?.to)

    const [destinationFrom, setDestinationFrom] = useState<Airport | null>(null);
    const [destinationTo, setDestinationTo] = useState<Airport | null>(null);

    const [openClassType , setOpenClassType] = useState<boolean>(false)
    
    
    function formatDate(date?: Date) {
    if (!date || isNaN(date.getTime())) return ""
    
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date)
    }

    //

    const { setBooking } = useBooking();

    //
    const router = useRouter()
    const handleSearch = () => {
    if (!destinationFrom || !destinationTo) return;

    setBooking(prev => ({
        ...prev,
        from: destinationFrom,
        to: destinationTo,
        dates: {
            departure: selectDate?.from,
            return: tripType === "round-trip" ? selectDate?.to : undefined,
        },
        passengers: passengersText,
        tripType,
    }));


    if (tripType === "one-way") {
            router.push("/flies?step=outbound");
        } else {
            router.push("/flies?step=outbound");
        }
    };


    // close dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);    
    useOutsideClick(dropdownRef, () => setOpenClassType(false));  

    //style
    const ringStyle = "focus:outline-none focus:ring focus:ring-red-900 focus:shadow-[0_0_15px_rgba(127,29,29,0.6)] rounded-lg "
    const borderStyle = "focus-within:outline-none focus-within:border focus-within:border-red-900 focus-within:shadow-[0_0_15px_rgba(127,29,29,0.6)] focus-within:rounded-lg "

    return(

        <div className=" flex justify-center">
            <form 
                onSubmit={(e) => {e.preventDefault()}} 
                style={{boxShadow:" 0px 5px 30px -2px rgba(0,0,0,0.62)"}} 
                className="lg:absolute lg:top-95 border w-full max-w-6xl space-y-6 mb-20 py-10 px-5 border-zinc-400 rounded-2xl text-black flex lg:flex-col md:flex-row justify-center items-start bg-white"
            >
                <div className="flex items-stretch gap-6 text-[16px] font-medium">

                    <button
                        type="button"
                        onClick={() => setTripType("round-trip")}
                        className={`pb-2 border-b-2 transition cursor-pointer ${
                        tripType === "round-trip"
                        ? "border-red-900 text-red-900"
                        : "border-transparent text-gray-500"
                        }`}
                    >
                        Return
                    </button>

                    <button
                        type="button"
                        onClick={() => setTripType("one-way")}
                        className={`pb-2 border-b-2 transition cursor-pointer ${
                        tripType === "one-way"
                        ? "border-red-900 text-red-900"
                        : "border-transparent text-gray-500"
                        }`}
                    >
                        One way
                    </button>

                </div>
                <div className="border w-full border-zinc-400 rounded-lg flex justify-start items-stretch ">
                    <div className="flex items-center justify-center flex-1">
                        <div tabIndex={0} className={`flex items-center justify-center w-full h-full  ${borderStyle}`}>
                            <svg className="text-red-900 mx-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 20.75h18.5M18.575 6.299a1.783 1.783 0 0 1 1.783 3.089L11.31 14.61a4 4 0 0 1-1.377.49l-2.604.422a3.04 3.04 0 0 1-2.725-.948L2.91 12.723a.607.607 0 0 1 .145-.936l.391-.226a1.52 1.52 0 0 1 1.56.025l1.816 1.128c.19.118.43.122.624.01l3.6-2.078l-4.404-5.12a.607.607 0 0 1 .156-.922l.378-.218c.326-.188.73-.18 1.047.02l6.506 4.113z"/>
                            </svg>

                            <HandleDestination
                            placeholder="From"
                            value={destinationFrom?.name || ""}
                            onSelect={(airport) => setDestinationFrom(airport)}
                            className="flex-1 w-58 h-full focus:outline-none"
                            />
                        </div>

                        <svg className="w-10 text-zinc-600" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M18 10a1 1 0 0 0-1-1H5.41l2.3-2.29a1 1 0 0 0-1.42-1.42l-4 4a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 11h14a1 1 0 0 0 1-1m3.92 3.62A1 1 0 0 0 21 13H7a1 1 0 0 0 0 2h11.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-1.09"></path></svg>

                        <div tabIndex={0} className={`flex items-center justify-center w-full h-full  ${borderStyle}`}>
                            <svg className="text-red-900 mx-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 20.75h18.5m-2.05-7.453a1.783 1.783 0 1 1-.923 3.445L8.185 14.04a4 4 0 0 1-1.32-.628l-2.14-1.543A3.04 3.04 0 0 1 3.47 9.271l.11-2.508a.607.607 0 0 1 .765-.56l.436.117a1.52 1.52 0 0 1 1.086 1.121l.486 2.082c.051.218.218.39.434.448l4.015 1.076l.506-6.735a.607.607 0 0 1 .763-.541l.422.113c.363.097.643.388.725.755l1.692 7.509z"/></svg>
                            <HandleDestination
                                placeholder="To"
                                value={destinationTo?.name || ""}
                                onSelect={(airport) => setDestinationTo(airport)}
                                className={`flex-1 w-58 h-full focus:outline-none`}

                            />
                        </div>
                    </div>

                    <svg className="flex justify-center items-center h-full w-20 text-zinc-400" xmlns="http://www.w3.org/2000/svg" width={20} height={60} viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M10 1a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1" clipRule="evenodd"></path></svg>

                    <div tabIndex={0} className={`${borderStyle}`}>
                        <div  className={`flex items-center h-full w-65  space-x-5 cursor-pointer ${borderStyle} `}  onClick={() => setopenCalendare(prev => !prev)}>
                            <svg className="text-red-900 mx-2" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 15 15"><path fill="currentColor" d="M10.5 1a.5.5 0 0 1 .5.5V2h1.5A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 12.5v-9A1.5 1.5 0 0 1 2.5 2H4v-.5a.5.5 0 0 1 1 0V2h5v-.5a.5.5 0 0 1 .5-.5M2 12.5l.01.1c.04.196.194.35.39.39l.1.01h10l.1-.01a.5.5 0 0 0 .39-.39l.01-.1V6H2zM3.5 11a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m-6-2a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m-4-2a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1M2.4 3.01a.5.5 0 0 0-.4.49V5h11V3.5a.5.5 0 0 0-.4-.49L12.5 3H11v.5a.5.5 0 0 1-1 0V3H5v.5a.5.5 0 0 1-1 0V3H2.5z"></path></svg>
                            <div className={``}>
                                <h6 className={`text-xs text-gray-600`}>Departure</h6>
                                <h4>{firstDay}</h4>
                            </div>
                            {tripType === "round-trip" && (
                            <div>
                                <h6 className="text-xs text-gray-600">Return</h6>
                                <h4>{lastDay}</h4>
                            </div>
                            )}
                        </div>
                        {openCalendar && (
                            <div className="absolute right-0 mt-1  z-90">
                                <HandleDate
                                selected={selectDate}
                                onSelectDate={setSelectDate}
                                setIsOpen={setopenCalendare}
                                mode={tripType === "round-trip" ? "range" : "single"}
                                />
                            </div>
                        )}
                    </div>

                    <svg className="flex justify-center items-center h-full w-20 text-zinc-400" xmlns="http://www.w3.org/2000/svg" width={20} height={60} viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M10 1a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1" clipRule="evenodd"></path></svg>


                    <div tabIndex={1} className={`relative w-full  px-2 ${borderStyle}`}>
                        <div className="flex justify-between items-center cursor-pointer h-full" 
                            onClick={() => setOpenPassengers(prev => !prev)}
                        >
                            <div className="flex items-center gap-3 h-full">
                                <svg className="flex items-center text-red-900" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M15.5 11a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0"></path><path d="M15.483 11.35q.484.149 1.017.15a3.5 3.5 0 1 0-3.483-3.85m-2.034 0a3.5 3.5 0 1 0-2.466 3.7M22 16.5c0-2.761-2.462-5-5.5-5m1 8c0-2.761-2.462-5-5.5-5s-5.5 2.239-5.5 5"></path><path d="M7.5 11.5c-3.038 0-5.5 2.239-5.5 5"></path></g></svg>
                                <div >
                                    <h6 className="text-xs text-gray-600">Passengers / Class</h6>
                                    <h4>{passengersText}</h4>
                                </div>
                                
                            </div>

                            <div className="flex items-end">
                                <h6 className="w-5 font-extralight text-zinc-500">
                                <FontAwesomeIcon icon={faAngleDown} />
                                </h6>
                            </div>
                        </div>

                        <div>
                            {openPassengers && (
                                <div className="absolute mt-1 right-0 w-80 z-90 shadow-lg">
                                <HandlePassengers setPassengersText={setpassengersText} isOpen={setOpenPassengers}/>
                                </div>
                            )}
                        </div>
                    </div>
                    

                </div>
                    <div className="flex justify-end w-full mt-7 items-center">
                        <p className="text-gray-600 mr-5">+Add promo code</p>

                        <button onClick={handleSearch} className="bg-red-900 border-2 border-red-900 rounded-full px-8 py-4 font-bold text-md text-amber-50 cursor-pointer">Search Flights</button>
                    </div>
            </form>

            
        </div>
    )
}

