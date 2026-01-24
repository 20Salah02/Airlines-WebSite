"use client"

//
import { useState } from "react"
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
    id : number
    name : string
    city : string
    country : string
    iata : string
    }
    const firstDayDefault = new Date();
    const lastDayDefault = new Date();
    lastDayDefault.setDate(firstDayDefault.getDate() + 5)

    const [openPassengers , setOpenPassengers] = useState<boolean>(false)
    const [passengersText , setpassengersText] = useState<string>("1 Passenger Economy")
    const [openCalendar , setopenCalendare] = useState<boolean>(false)
    const [selectDate , setSelectDate] = useState<DateRange | undefined>({
        from : firstDayDefault ,
        to : lastDayDefault
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

    const startDate = new Date(firstDay)
    const endDate = new Date(lastDay)

    // function formatFlightDate(date: Date) {
    //     return new Intl.DateTimeFormat("en-GB", {
    //         weekday: "short",
    //         day: "2-digit",
    //         month: "short",
    //     }).format(date)
    // }

    //
    const router = useRouter()
    const handleSearch = () => {
        router.push(
            `/flies?step=outbound&departureCity=${destinationFrom?.city}&departureName=${destinationFrom?.name}&departureIata=${destinationFrom?.iata}&arriveCity=${destinationTo?.city}&arriveName=${destinationTo?.name}&arriveIata=${destinationTo?.iata}&firstday=${startDate?.toISOString()}&lastday=${endDate?.toISOString()}&passengers=${passengersText.slice(0,12)}`
        )
    }

    return(

        <div className="absolute top-110 flex justify-center w-full bg-slat-100 ">
            <form onSubmit={(e) => {e.preventDefault()}} style={{boxShadow:" 0px 5px 30px -2px rgba(0,0,0,0.62)"}} className=" container border w-full mb-20 py-10 px-5 border-zinc-400 rounded-2xl text-black flex flex-col justify-center items-start bg-[white]">

                <div className="w-1/4 py-4 flex justify-between text-[17px] ">
                    <div>
                        <input type="radio" name="class" value="return"></input>
                        <label className="p-1">Return</label>
                    </div>
                    <div>
                        <input type="radio" name="class" value="oneway"></input>
                        <label className="p-1">One way</label>
                    </div>
                </div>
                <div className="border w-full border-zinc-400 rounded-lg flex justify-start items-center">
                    <div className="flex items-center">
                    <HandleDestination
                        placeholder="From"
                        value={destinationFrom?.name || ""}
                        onSelect={(airport) => setDestinationFrom(airport)}
                    />

                    <span className="mx-2">|</span>

                    <HandleDestination
                        placeholder="To"
                        value={destinationTo?.name || ""}
                        onSelect={(airport) => setDestinationTo(airport)}
                    />
                    </div>

                    <div>
                        <div className="flex pl-4 h-10 w-70 border-r border-l "  onClick={() => setopenCalendare(prev => !prev)}>
                            <div className="pr-12">
                                <h6 className="text-xs text-gray-600">Departure</h6>
                                <h4>{firstDay}</h4>
                            </div>
                            <div>
                                <h6 className="text-xs text-gray-600">Return</h6>
                                <h4>{lastDay}</h4>
                            </div>
                        </div>
                        {openCalendar && (
                            <div className="absolute mt-1 w-full">
                                <HandleDate selected={selectDate} onSelectDate={setSelectDate} setIsOpen={setopenCalendare}/>
                            </div>
                        )}
                    </div>

                    <div className="relative w-1/3 px-2 ">
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
                            <div className="absolute top-full left-0 mt-2 bg-white w-full z-50 shadow-lg">
                            <HandlePassengers setPassengersText={setpassengersText} isOpen={setOpenPassengers}/>
                            </div>
                        )}

                    </div>

                </div>
                    <div className="flex justify-end w-full mt-7 items-center">
                        <p className="text-gray-600 mr-5">+Add promo code</p>

                        <button onClick={handleSearch} className="bg-blue-500 border-2 border-blue-500 rounded-full px-8 py-4 font-bold text-md text-amber-50 cursor-pointer">Search Flights</button>
                    </div>
            </form>

            
        </div>
    )
}

