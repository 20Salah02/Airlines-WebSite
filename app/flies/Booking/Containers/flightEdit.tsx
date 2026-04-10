"use client"

// context 

import { useBooking } from "@/app/contexts/bookingContext"
import { useOutsideClick } from "@/app/hooks/dropDownClose"
//
import { useState , useRef} from "react"
//
import { useRouter } from "next/navigation"
//
import HandleDestination from "@/app/hooks/mainFormDestination"
import HandleDate from "@/app/hooks/mainFormDate"
import HandlePassengers from "@/app/hooks/mainFormPassengers"
//
import { DateRange } from "react-day-picker"
//
import { useSearchParams } from "next/navigation"

type FlightEditProps = {
  setOpenFormEdit: (v: boolean) => void
}

export default function FlightEdit({ setOpenFormEdit }: FlightEditProps){

    type Airport = {
        id : number
        name : string
        city : string
        country : string
        iata : string
        latitude : number;
        longitude : number
    }

    //

    function formatDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year : "numeric"
    });
    }

   //
    const { booking, setBooking} = useBooking()

    const search = useSearchParams()
    const step = search.get("step")

    const isOutbound = step !== "return"

    const firstDay = isOutbound ? booking.dates?.departure : booking.dates?.return
    const lastDay = isOutbound ? booking.dates?.return : booking.dates?.departure

   //
    const [openPassengers , setOpenPassengers] = useState<boolean>(false)
    const [passengersText , setPassengersText] = useState<string>("1 Passenger Economie")

    const [destinationFrom , setDestinationFrom] = useState<Airport | null>(null)
    const [destinationTo, setDestinationTo] = useState<Airport | null>(null);

    const [tripType , setTripType] = useState<"one-way" | "round-trip">("round-trip")

    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    
    const [openCalendar , setopenCalendare] = useState<boolean>(false)
    const [selectDate, setSelectDate] = useState<DateRange | undefined>({
    from: firstDay ,
    to: tripType === "round-trip" ? lastDay : undefined,
    })


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

        //
        setOpenFormEdit(false)

    };


    // close dropdown
    const fromRef = useRef<HTMLDivElement>(null);
    const toRef = useRef<HTMLDivElement>(null);

    useOutsideClick(fromRef, () => {
        setOpenFrom(false); 
    });

    useOutsideClick(toRef, () => {
        setOpenTo(false); 
    });

    const calendarRef = useRef<HTMLDivElement>(null);
    useOutsideClick(calendarRef, () => setopenCalendare(false));  

    const passengersRef = useRef<HTMLDivElement>(null);
    useOutsideClick(passengersRef, () => setOpenPassengers(false));
    
    
     //style
    const borderStyle = "focus-within:outline-none focus-within:border focus-within:border-red-900 focus-within:shadow-[0_0_15px_rgba(127,29,29,0.6)] focus-within:rounded-md "



    return(
        <div className=" bg-white w-full lg:p-9 px-4 border-l border-l-gray-300 lg:h-screen space-y-6">
            <button 
                onClick={() => setOpenFormEdit(false)}
                className=" absolute right-4 top-5 p-2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg>
            </button>
            <form onSubmit={(e) => e.preventDefault()}></form>
            <h1 className="flex justify-center text-xl">Modify Search</h1>
            <div className="space-y-6">
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
                <div className="flex flex-col border rounded-md border-gray-300 " >
                    <div className="w-full">
                        <div ref={fromRef} tabIndex={0} className={`flex items-center h-13 w-full  ${borderStyle}`}>
                            <svg className="text-red-900 mx-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 20.75h18.5M18.575 6.299a1.783 1.783 0 0 1 1.783 3.089L11.31 14.61a4 4 0 0 1-1.377.49l-2.604.422a3.04 3.04 0 0 1-2.725-.948L2.91 12.723a.607.607 0 0 1 .145-.936l.391-.226a1.52 1.52 0 0 1 1.56.025l1.816 1.128c.19.118.43.122.624.01l3.6-2.078l-4.404-5.12a.607.607 0 0 1 .156-.922l.378-.218c.326-.188.73-.18 1.047.02l6.506 4.113z"/>
                            </svg>

                            <HandleDestination
                                placeholder="From"
                                value={destinationFrom?.name || ""}
                                onSelect={(airport) => setDestinationFrom(airport)}
                                className="flex-1 pt-3 w-58 h-full focus:outline-none"
                                floatingLabel={true}
                                isOpen={openFrom}
                                setIsOpen={setOpenFrom}
                            />
                        </div>
                        <hr className="text-gray-300" />
                        <div ref={toRef} tabIndex={0} className={`flex items-center w-full h-13  ${borderStyle}`}>
                            <svg className="text-red-900 mx-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 20.75h18.5m-2.05-7.453a1.783 1.783 0 1 1-.923 3.445L8.185 14.04a4 4 0 0 1-1.32-.628l-2.14-1.543A3.04 3.04 0 0 1 3.47 9.271l.11-2.508a.607.607 0 0 1 .765-.56l.436.117a1.52 1.52 0 0 1 1.086 1.121l.486 2.082c.051.218.218.39.434.448l4.015 1.076l.506-6.735a.607.607 0 0 1 .763-.541l.422.113c.363.097.643.388.725.755l1.692 7.509z"/></svg>
                            <HandleDestination
                                placeholder="To"
                                value={destinationTo?.name || ""}
                                onSelect={(airport) => setDestinationTo(airport)}
                                className={`flex-1 pt-3 w-58 h-full focus:outline-none`}
                                floatingLabel={true}
                                isOpen={openTo}
                                setIsOpen={setOpenTo}
                            />
                        </div>      
                    </div>            
                </div>
                <div>
                    <div ref={calendarRef} onClick={() => setopenCalendare(prev => !prev)} className={`flex items-center w-full border rounded-md border-gray-300 p-2 cursor-pointer ${borderStyle} `}>
                        <svg className="text-red-900 lg:mx-2 mr-2" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 15 15"><path fill="currentColor" d="M10.5 1a.5.5 0 0 1 .5.5V2h1.5A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 12.5v-9A1.5 1.5 0 0 1 2.5 2H4v-.5a.5.5 0 0 1 1 0V2h5v-.5a.5.5 0 0 1 .5-.5M2 12.5l.01.1c.04.196.194.35.39.39l.1.01h10l.1-.01a.5.5 0 0 0 .39-.39l.01-.1V6H2zM3.5 11a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m-6-2a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m-4-2a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1M2.4 3.01a.5.5 0 0 0-.4.49V5h11V3.5a.5.5 0 0 0-.4-.49L12.5 3H11v.5a.5.5 0 0 1-1 0V3H5v.5a.5.5 0 0 1-1 0V3H2.5z"></path></svg>
                       <div className="w-1/2 space-y-1.5">
                            <p className="text-gray-600 text-xs">Departure</p>
                            <p>{formatDate(selectDate?.from)}</p>
                        </div>
                        {tripType === "round-trip" && (
                            <div className="w-1/2 space-y-1.5">
                                <p className="text-gray-600 text-xs">Return</p>
                                <p>{formatDate(selectDate?.to)}</p>
                            </div>
                        )}
                    </div>
                    {openCalendar && (
                        <div className="absolute top-1/6 left-1 w-fit  z-50">
                            <HandleDate
                                selected={selectDate}
                                onSelectDate={setSelectDate}
                                setIsOpen={setopenCalendare}
                                mode={tripType === "round-trip" ? "range" : "single"}
                                className="pb-5"
                            />                        
                        </div>
                    )}
                </div>    
                <div
                    className={`flex items-center w-full border rounded-md border-gray-300 p-2 ${borderStyle}`}
                    onClick={() => setOpenPassengers(prev => !prev)}
                    tabIndex={1}
                    ref={passengersRef}
                >
                    <svg className="lg:mx-2 mr-2 text-red-900 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M15.5 11a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0"></path><path d="M15.483 11.35q.484.149 1.017.15a3.5 3.5 0 1 0-3.483-3.85m-2.034 0a3.5 3.5 0 1 0-2.466 3.7M22 16.5c0-2.761-2.462-5-5.5-5m1 8c0-2.761-2.462-5-5.5-5s-5.5 2.239-5.5 5"></path><path d="M7.5 11.5c-3.038 0-5.5 2.239-5.5 5"></path></g></svg>
                    <div className="relative z-10 w-full">
                        <p className="text-gray-600 text-xs">Passenger / Class</p>
                        <div>
                            <p>{passengersText}</p>
                        </div>
                    </div>
                </div>
                <div className=" w-full space-y-4 items-center">
                    <p className="text-gray-600 mr-5">+Add promo code</p>

                    <button onClick={handleSearch} className="bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Search Flights</button>
                </div>
            </div>
            <div>
                {openPassengers && (
                <div className="absolute h-full bottom-0 left-0 z-90 bg-white w-full shadow-lg">
                    <HandlePassengers setPassengersText={setPassengersText} isOpen={setOpenPassengers}/>
                </div>
                )}
            </div>
        </div>
    )
} 