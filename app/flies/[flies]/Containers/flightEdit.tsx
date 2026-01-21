"use client"

import { useState } from "react"
//
import HandleDestination from "@/app/hooks/mainFormDestination"
import HandleDate from "@/app/hooks/mainFormDate"
//
import { DateRange } from "react-day-picker"
//
import { useSearchParams } from "next/navigation"


export default function FlightEdit(){

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
    const search = useSearchParams()
    const firstDay = search.get("firstday")
    const lastDay = search.get("lastday")

    const [destinationFrom , setDestinationFrom] = useState<Airport | null>(null)
    const [openCalendar , setopenCalendare] = useState<boolean>(false)
    const [selectDate, setSelectDate] = useState<DateRange | undefined>({
    from: firstDay ? new Date(firstDay) : undefined,
    to: lastDay ? new Date(lastDay) : undefined,
    })


    console.log("set open ====" + openCalendar )


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
                        value={destinationFrom?.name || ""}
                        onSelect={(airport) => setDestinationFrom(airport)}
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
                        <div className="absolute h-1/2  top-1/5 left-4 w-full">
                            <HandleDate selected={selectDate} onSelectDate={setSelectDate} setIsOpen={setopenCalendare}/>
                        </div>
                    )}
                    
                    <p className="text-gray-600 text-xs">Passenger / Class</p>
                    <div>
                        <p>1 Passenger Economy</p>
                    </div>
                </div>
                    <div className=" w-full space-y-4 items-center">
                        <p className="text-gray-600 mr-5">+Add promo code</p>

                        <button className="bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Search Flights</button>
                    </div>
            </div>
        </div>
    )
}