"use client"

//
import { useSearchParams } from "next/navigation"


export default function FliesHeader(){

    const search = useSearchParams()
    const from = search.get("departureCity")
    const to = search.get("arriveCity")
    const firstDay = search.get("firstday")

    function formatNavDate(dateStr?: string | null) {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return ""
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
    }


    return(
        <div className="my-20 font-light">
            <h6>{formatNavDate(firstDay)}</h6>
            <div className="text-5xl text-gray-600">
                <h2 className="py-4">Select Your Departure Flight</h2>
                <h1>From <span className="text-red-900">{from}</span> to <span  className="text-red-900">{to}</span></h1>
            </div>
        </div>
    )
}