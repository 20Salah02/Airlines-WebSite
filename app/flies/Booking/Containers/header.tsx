"use client"

//
import { Suspense } from "react"
// context
import { useBooking } from "@/app/contexts/bookingContext"
//
import { useSearchParams } from "next/navigation"
// skelton
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton'


function FliesHeaderContent(){

    function formatDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year : "numeric"
    });
    }

    const { booking } = useBooking()
    const loading = !booking.from || !booking.to
    
    const search = useSearchParams()
    const step = search.get("step")

    const isOutbound = step !== "return";

    const from = isOutbound ? booking.from : booking.to
    const to = isOutbound ? booking.to : booking.from
    const firstDay = isOutbound ? booking.dates?.departure : booking.dates?.return;
    


    
    return(
        <div className="lg:my-17 my-8 font-light">
        {loading ? (
            <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f1f5f9">
                <Skeleton width="30%" height={16} />
                <div className="space-y-5 mt-2">
                    <Skeleton width="70%" height={50} />
                    <Skeleton width="80%" height={50} />
                </div>
            </SkeletonTheme>
        ) : (
            <div>
                <h6>{formatDate(firstDay)}</h6>
                <div className="lg:text-5xl text-3xl text-gray-600">
                    <h2 className="lg:py-4 py-2">Select Your Departure Flight</h2>
                    <h1>From <span className="text-red-900">{from?.city}</span> to <span  className="text-red-900">{to?.city}</span></h1>
                </div>
            </div>
        )}
        </div>
    )
}


export default function FliesHeader() {
    return (
        <Suspense fallback={null}>
            <FliesHeaderContent/>
        </Suspense>
    )
}