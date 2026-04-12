"use client"

// context
import { useBooking } from "../contexts/bookingContext"
//
import { useState , useRef , useEffect} from "react"
//
import { useRouter } from "next/navigation"
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

    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);

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
    const fromRef = useRef<HTMLDivElement>(null);
    const toRef = useRef<HTMLDivElement>(null);

    const calendarRef = useRef<HTMLDivElement>(null);

    const passengersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (fromRef.current && !fromRef.current.contains(e.target as Node)) {
                setOpenFrom(false);
            }
            if (toRef.current && !toRef.current.contains(e.target as Node)) {
                setOpenTo(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
                setopenCalendare(false);
            }
            if (passengersRef.current && !passengersRef.current.contains(e.target as Node)) {
                setOpenPassengers(false);
            }
        };
        document.addEventListener("mousedown", handleMouseDown);
        return () => document.removeEventListener("mousedown", handleMouseDown);
    }, []);

    
    //style
    const borderStyle = "focus-within:outline-none focus-within:border focus-within:border-red-900 focus-within:shadow-[0_0_15px_rgba(127,29,29,0.6)] focus-within:rounded-lg "

    return(

        <div className=" flex justify-center flex-col lg:flex-row">
            <form 
                onSubmit={(e) => {e.preventDefault()}} 
                style={{boxShadow:" 0px 5px 30px -2px rgba(0,0,0,0.62)"}} 
                className="absolute left-1/2 top-full -translate-x-1/2 -mt-10 w-[95%] border space-y-6 mb-20 lg:p-5 px-3 py-5 border-zinc-400 rounded-2xl text-black flex flex-col justify-center items-start bg-white"
            >
                <div className="flex items-stretch gap-6 text-[16px] font-medium w-full">
                    <button
                        type="button"
                        onClick={() => setTripType("round-trip")}
                        className={`flex pb-2 border-b-2 transition cursor-pointer ${
                        tripType === "round-trip"
                        ? "border-red-900 text-red-900"
                        : "border-transparent text-gray-500"
                        }`}
                    >
                            <svg
                                className="h-5 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 56 56"
                                fill="currentColor"
                            >
                                <path d="M6.672 37.434c-1.664 0-2.11 1.148-1.195 2.437l5.25 7.453c.773 1.102 1.898 1.078 2.648 0l5.25-7.476c.89-1.266.469-2.414-1.195-2.414h-3.282V19.809c0-4.055 2.461-6.61 5.836-6.61c3.399 0 5.93 2.508 5.93 6.61v16.054c0 6.797 4.242 11.11 10.102 11.11c5.836 0 10.03-4.313 10.03-11.11V18.566h3.282c1.664 0 2.11-1.148 1.195-2.437l-5.226-7.477c-.75-1.054-1.875-1.078-2.649 0l-5.25 7.454c-.937 1.312-.492 2.46 1.196 2.46h3.258v17.625c0 4.032-2.438 6.586-5.836 6.586s-5.93-2.508-5.93-6.586V20.137c0-6.797-4.242-11.11-10.102-11.11c-5.836 0-10.03 4.313-10.03 11.11v17.297Z" />
                            </svg>
                        Return
                    </button>

                    <button
                        type="button"
                        onClick={() => setTripType("one-way")}
                        className={`flex pb-2 border-b-2 transition cursor-pointer ${
                        tripType === "one-way"
                        ? "border-red-900 text-red-900"
                        : "border-transparent text-gray-500"
                        }`}
                    >
                        <svg className="mr-1 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="m245.66 74.34l-32-32a8 8 0 0 0-11.32 11.32L220.69 72H208c-49.33 0-61.05 28.12-71.38 52.92c-9.38 22.51-16.92 40.59-49.48 42.84a40 40 0 1 0 .1 16c43.26-2.65 54.34-29.15 64.14-52.69C161.41 107 169.33 88 208 88h12.69l-18.35 18.34a8 8 0 0 0 11.32 11.32l32-32a8 8 0 0 0 0-11.32M48 200a24 24 0 1 1 24-24a24 24 0 0 1-24 24"></path></svg>                        One way
                    </button>

                </div>
                <div className="lg:border w-full border-zinc-400 rounded-lg flex justify-start items-stretch flex-col lg:flex-row space-y-4 lg:space-y-0">
                    <div className="flex lg:items-center lg:justify-center flex-1 flex-col lg:flex-row border border-zinc-300 rounded-md lg:border-0">
                        <div ref={fromRef} tabIndex={0} className={`flex items-center lg:justify-center w-full h-full lg:border-0 border-b border-b-zinc-300  ${borderStyle}`}>
                            <svg className="text-red-900 mx-2 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 20.75h18.5M18.575 6.299a1.783 1.783 0 0 1 1.783 3.089L11.31 14.61a4 4 0 0 1-1.377.49l-2.604.422a3.04 3.04 0 0 1-2.725-.948L2.91 12.723a.607.607 0 0 1 .145-.936l.391-.226a1.52 1.52 0 0 1 1.56.025l1.816 1.128c.19.118.43.122.624.01l3.6-2.078l-4.404-5.12a.607.607 0 0 1 .156-.922l.378-.218c.326-.188.73-.18 1.047.02l6.506 4.113z"/>
                            </svg>
                            <HandleDestination
                                placeholder="From"
                                value={destinationFrom?.name || ""}
                                onSelect={(airport) => setDestinationFrom(airport)}
                                className="flex-1 pt-5 py-3 lg:w-58 w-full h-full focus:outline-none "
                                floatingLabel={true}
                                isOpen={openFrom}
                                setIsOpen={setOpenFrom} 
                            />
                        </div>

                        <svg className="lg:flex w-10 text-zinc-600 hidden" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M18 10a1 1 0 0 0-1-1H5.41l2.3-2.29a1 1 0 0 0-1.42-1.42l-4 4a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 11h14a1 1 0 0 0 1-1m3.92 3.62A1 1 0 0 0 21 13H7a1 1 0 0 0 0 2h11.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-1.09"></path></svg>

                        <div ref={toRef} tabIndex={0} className={`flex items-center lg:justify-center w-full h-full  ${borderStyle}`}>
                            <svg className="text-red-900 mx-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 20.75h18.5m-2.05-7.453a1.783 1.783 0 1 1-.923 3.445L8.185 14.04a4 4 0 0 1-1.32-.628l-2.14-1.543A3.04 3.04 0 0 1 3.47 9.271l.11-2.508a.607.607 0 0 1 .765-.56l.436.117a1.52 1.52 0 0 1 1.086 1.121l.486 2.082c.051.218.218.39.434.448l4.015 1.076l.506-6.735a.607.607 0 0 1 .763-.541l.422.113c.363.097.643.388.725.755l1.692 7.509z"/></svg>
                            <HandleDestination
                                placeholder="To"
                                value={destinationTo?.name || ""}
                                onSelect={(airport) => setDestinationTo(airport)}
                                className={`flex-1 pt-5 py-3 lg:w-58 h-full focus:outline-none`}
                                floatingLabel={true}
                                isOpen={openTo}
                                setIsOpen={setOpenTo}
                            />
                        </div>
                    </div>

                    <svg className="lg:flex justify-center items-center hidden  h-full w-20 text-zinc-400" xmlns="http://www.w3.org/2000/svg" width={20} height={60} viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M10 1a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1" clipRule="evenodd"></path></svg>

                    <div ref={calendarRef} tabIndex={0} className={`${borderStyle}`}>
                        <div onClick={() => setopenCalendare(prev => !prev)} className={`flex items-center h-13 lg:w-65 w-full  space-x-5 cursor-pointer border border-zinc-300 rounded-md lg:border-0 ${borderStyle} `} >
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
                            <div className="absolute right-0 mt-1  z-90">
                                <HandleDate
                                    selected={selectDate}
                                    onSelectDate={setSelectDate}
                                    setIsOpen={setopenCalendare}
                                    isOpen={openCalendar}
                                    mode={tripType === "round-trip" ? "range" : "single"}
                                    className="p-6"
                                />
                            </div>
                    </div>

                    <svg className="lg:flex justify-center items-center hidden h-full lg:w-20 w-full text-zinc-400" xmlns="http://www.w3.org/2000/svg" width={20} height={60} viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M10 1a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1" clipRule="evenodd"></path></svg>


                    <div ref={passengersRef} tabIndex={1} className={`relative w-full  px-2 ${borderStyle} border border-zinc-300 rounded-md lg:border-0`}>
                        <div className="flex justify-between items-center cursor-pointer h-13" 
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
                                <h6 className={`text-zinc-600 ${openPassengers ? "rotate-180" : ""} transition-all duration-300 ease-in-out`} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.9 340.9L512 652.7L192.1 340.9a30.6 30.6 0 0 0-42.7 0a29 29 0 0 0 0 41.6l340.3 331.7a32 32 0 0 0 44.6 0l340.3-331.7a29 29 0 0 0 0-41.7a30.6 30.6 0 0 0-42.7 0z"></path></svg>
                                </h6>
                            </div>
                        </div>

                        <div>
                            <HandlePassengers
                                setPassengersText={setpassengersText}
                                isOpen={setOpenPassengers}
                                open={openPassengers}
                            />
                        </div>
                    </div>
                    

                </div>
                <div className="flex justify-end w-full lg:items-center space-x-6 space-y-3 flex-col lg:flex-row">
                    <p className=" text-gray-600 ">+ Add promo code</p>

                    <button onClick={handleSearch} className="bg-red-900 border-2 border-red-900 rounded-full px-8 py-3 w-full lg:w-50 font-bold text-md text-amber-50 cursor-pointer">Search Flights</button>
                </div>
            </form>

            
        </div>
    )
}

