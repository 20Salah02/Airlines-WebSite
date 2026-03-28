"use client"

// context 

import { useBooking } from "@/app/contexts/bookingContext"
//
import { useState } from "react"
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
    
    
 


    return(
        <div className=" bg-white w-full p-9 border-l border-l-gray-300 h-screen space-y-10">
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
                    <div className="py-2 px-2 w-full">
                        <HandleDestination
                        placeholder="from"
                        value={destinationFrom?.name || ""}
                        onSelect={(airport) => setDestinationFrom(airport)}
                        />
                        <hr className="text-gray-300" />
                        <HandleDestination
                        placeholder="to"
                        value={destinationTo?.name || ""}
                        onSelect={(airport) => setDestinationTo(airport)}
                        />       
                    </div>            
                </div>
                <div onClick={() => setopenCalendare(prev => !prev)} className="flex w-full border rounded-md border-gray-300 p-2  ">
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
                <div className=" w-full border rounded-md border-gray-300 p-2">
                    {openCalendar && (
                        <div className="absolute h-1/2  top-1/5 left-4 w-full  z-50">
                            <HandleDate
                                selected={selectDate}
                                onSelectDate={setSelectDate}
                                setIsOpen={setopenCalendare}
                                mode={tripType === "round-trip" ? "range" : "single"}
                            />                        
                        </div>
                    )}
                    
                    <div className="relative z-10">
                        <p className="text-gray-600 text-xs">Passenger / Class</p>
                        <div onClick={() => setOpenPassengers(prev => !prev)} >
                            <p>{passengersText}</p>
                        </div>
                        <div>
                            {openPassengers && (
                            <div className="absolute -top-80 left-0 mt-2 bg-white w-full shadow-lg">
                                <HandlePassengers setPassengersText={setPassengersText} isOpen={setOpenPassengers}/>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                    <div className=" w-full space-y-4 items-center">
                        <p className="text-gray-600 mr-5">+Add promo code</p>

                        <button onClick={handleSearch} className="bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Search Flights</button>
                    </div>
            </div>
            </div>
    )
}