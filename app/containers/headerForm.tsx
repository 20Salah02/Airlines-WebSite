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
                    <div className="flex items-center flex-1">
                    <HandleDestination
                        placeholder="From"
                        value={destinationFrom?.name || ""}
                        onSelect={(airport) => setDestinationFrom(airport)}
                        className={`w-70 h-full flex-1 ${ringStyle}`}
                    />

                    <span className="mx-2">|</span>

                    <HandleDestination
                        placeholder="To"
                        value={destinationTo?.name || ""}
                        onSelect={(airport) => setDestinationTo(airport)}
                        className={`w-70 h-full flex-1 ${ringStyle}`}

                    />
                    </div>

                    <div tabIndex={0} className={`${borderStyle}`}>
                        <div  className={`flex pl-4 h-10 w-70 border-r border-l ${borderStyle} `}  onClick={() => setopenCalendare(prev => !prev)}>
                            <div className={`pr-12`}>
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

                    <div tabIndex={1} className={`relative w-full  px-2 ${borderStyle}`}>
                        <div className="flex justify-between cursor-pointer" 
                            onClick={() => setOpenPassengers(prev => !prev)}
                        >
                            <div>
                                <h6 className="text-xs text-gray-600">Passengers / Class</h6>
                                <h4>{passengersText}</h4>
                            </div>

                            <div className="flex items-end">
                                <h6 className="w-5 font-extralight">
                                <FontAwesomeIcon icon={faAngleDown} />
                                </h6>
                            </div>
                        </div>

                        {openPassengers && (
                            <div className="absolute mt-1 right-0   w-80 z-90 shadow-lg">
                            <HandlePassengers setPassengersText={setpassengersText} isOpen={setOpenPassengers}/>
                            </div>
                        )}

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

