"use client"

import { useState , useEffect } from "react"
//
import Image from "next/image"
//
import HandleDestination from "@/app/hooks/mainFormDestination"


type Airport ={
    id: number;
    name: string; 
    city: string; 
    country: string; 
    iata: string;
    latitude : number;
    longitude : number
}
export default function VoyageSuggetions(){

    const [destinationFrom , setDestinationFrom] = useState<Airport | null>(null)
    const [destinationTo , setDestinationTo] = useState<Airport | null>(null)

    const [data , setData] = useState<Airport[]>([])
    const suggestionsIata = ["DPS","DXB","HND","CDG","JFK","IST"]

    const [openBooking , setOpenBooking] = useState<boolean>(false)

    const handleOpenBooking = ()=>{
        setOpenBooking(true)
    }
    const handleCloseBooking = ()=>{
        setOpenBooking(false)
    }

    //
    useEffect(() => {
        fetch("/Data/airports.json")
        .then(res => res.json())
        .then(json => setData(json));
    }, []);

    const suggestionAirpots = data.filter((airport)=>{
        return suggestionsIata.includes(airport.iata)
    })
     

    return(
        <div className="relative mt-67 px-15 bg-zinc-100">
            <div>
                <h2 className="text-4xl font-light text-gray-600">Find great fears</h2>
            </div>
            <div className="flex justify-between mt-7 items-start">
                <div className="flex space-x-2">
                    <label htmlFor="from">From</label>
                    <HandleDestination
                        placeholder=""
                        value={destinationFrom?.name || ""}
                        onSelect={(airport) => setDestinationFrom(airport)}
                        className="px-1 border-b w-fit border-b-zinc-600"
                        id="from"
                    />
                    <h4>i</h4>
                </div>
                <div className="flex space-x-4">
                    <button className="bg-white px-8 rounded-3xl border border-gray-300 cursor-pointer">Return</button>
                    <button className="bg-white px-6 rounded-3xl border border-gray-300 cursor-pointer">One way</button>
                    <div className="bg-white rounded-md border border-gray-300 px-4 flex justify-between items-center w-50 cursor-pointer">
                        <div>
                            <h4 className="text-gray-600 text-sm">class</h4>
                            <h3 className="text-[17px]">Economy</h3>
                        </div>
                        <h4>i</h4>
                    </div>
                </div>
            </div>

            {suggestionAirpots.map((airport) =>(
                <div key={airport.id} className="relative py-5 mt-4 w-2/4  h-70 flex items-end justify-between b">
                    <div 
                        onMouseEnter={handleOpenBooking}
                        onMouseLeave={handleCloseBooking}
                        className="w-full gap-6"
                    >
                        <Image
                            src={`/${airport.city}.jpg`}
                            alt={airport.city}
                            fill
                            priority
                            className="object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                        <div className="relative space-y-4 px-6 w-full  text-white z-80">
                            <div   className="flex items-end justify-between">
                                <div className="space-y-3">
                                    <h2 className="text-2xl">{airport.city}</h2>
                                    <h3 className="text-sm">11 Mar 2026 - 13 Mar 2026</h3>
                                </div>
                                <h4 className="text-sm">Economy from <span className="font-medium">USD 1433</span> </h4>  
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-500 w-full flex justify-center
                                ${openBooking ? "max-h-25 mt-2" : "max-h-0 opacity-50"}`}
                            >
                                <button className="py-2 bg-red-900 w-[90%] rounded-4xl cursor-pointer op">
                                    Book now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}