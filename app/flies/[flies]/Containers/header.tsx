"use client"

//
import { useSearchParams } from "next/navigation"


export default function FliesHeader(){

    const search = useSearchParams()
    const from = search.get("departureCity")
    const to = search.get("arriveCity")
    const firstDay = search.get("firstday")


    return(
        <div className="my-20 font-light">
            <h6>{firstDay}</h6>
            <div className="text-5xl text-gray-600">
                <h2 className="py-4">Select Your Departure Flight</h2>
                <h1>From <span className="text-red-900">{from}</span> to <span  className="text-red-900">{to}</span></h1>
            </div>
        </div>
    )
}