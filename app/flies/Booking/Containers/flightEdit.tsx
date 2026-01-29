"use client"

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

    type Airport ={
    id : number
    name : string
    city : string
    country : string
    iata : string
    }
    //
    function formatDate(date?: Date) {
       if (!date) return ""
       return new Intl.DateTimeFormat("en-GB", {
           day: "2-digit",
           month: "short",
           year: "numeric",
       }).format(date)
   }

   //
   const search = useSearchParams()

    const firstDay = search.get("firstday")
    const lastDay = search.get("lastday")

   //
    const [openPassengers , setOpenPassengers] = useState<boolean>(false)
    const [passengersText , setPassengersText] = useState<string>("1 Passenger Economie")

    const [destinationFrom , setDestinationFrom] = useState<Airport | null>(null)
    const [destinationTo, setDestinationTo] = useState<Airport | null>(null);

    const [openCalendar , setopenCalendare] = useState<boolean>(false)
    const [selectDate, setSelectDate] = useState<DateRange | undefined>({
    from: firstDay ? new Date(firstDay) : undefined,
    to: lastDay ? new Date(lastDay) : undefined,
    })


    //
    const router = useRouter()
    const handleSearch = () => {
    router.push(
        `/flies?step=outbound&departureCity=${destinationFrom?.city}&departureName=${destinationFrom?.name}&departureIata=${destinationFrom?.iata}&arriveCity=${destinationTo?.city}&arriveName=${destinationTo?.name}&arriveIata=${destinationTo?.iata}&firstday=${selectDate?.from?.toISOString()}&lastday=${selectDate?.to?.toISOString()}&passengers=${passengersText}`
    )
    setOpenFormEdit(false)
    }


    return(
        <div className=" bg-white w-full p-9 border-l border-l-gray-300 h-screen space-y-10">
            <h1 className="flex justify-center text-xl">Modify Search</h1>
            <div className="space-y-6">
                <div className="flex space-x-5">
                    <div className="space-x-2">
                        <input type="radio" name="class" value="Return"/>
                        <label>Return</label>
                    </div>
                    <div className="space-x-2">
                        <input type="radio" name="class" value="One way"/>
                        <label>One way</label>
                    </div>
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
                    <div className="w-1/2 space-y-1.5">
                        <p className="text-gray-600 text-xs">Return</p>
                        <p>{formatDate(selectDate?.to)}</p>
                    </div>
                </div>
                <div className=" w-full border rounded-md border-gray-300 p-2">
                    {openCalendar && (
                        <div className="absolute h-1/2  top-1/5 left-4 w-full  z-50">
                            <HandleDate selected={selectDate} onSelectDate={setSelectDate} setIsOpen={setopenCalendare}/>
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