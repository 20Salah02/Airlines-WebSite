"use client"

import { useBooking } from "@/app/contexts/bookingContext"
import { useCurrency } from "@/app/contexts/currencyContext"
import { useSearchParams } from "next/navigation"
//
import { useState , useEffect ,Suspense } from "react"
//
import PaymentDetails from "../../containers/paymentDetails"
// skelton
import Skeleton , {SkeletonTheme} from "react-loading-skeleton"


function TripReviewDetailContent(){

    const [openPayment , setOpenPayment] = useState<boolean | null>(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0)
        return () => clearTimeout(timer)
    }, [])

const loading = !mounted

    const {format} = useCurrency()

    const {booking} = useBooking()
    const search = useSearchParams()
    const step = search.get("step")
    const isOutbound = step !== "return"

    const tripType = isOutbound ? booking.tripType : ""
    const goingPrice = isOutbound ? booking.outboundFlight?.price ?? 0 : booking.returnFlight?.price ?? 0;
    const returnPrice = isOutbound ? booking.returnFlight?.price ?? 0 : booking.outboundFlight?.price ?? 0;

    const totalPrice = tripType === "round-trip" ? goingPrice  + returnPrice : goingPrice

    //
    useEffect(() => {
        document.body.style.overflow = openPayment ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [openPayment])

    return(
        <div className="bg-white p-4 rounded-3xl w-full space-y-4 h-fit sticky top-10">
            <h2 className="font-medium text-[18px] text-red-900">Trip details</h2>
            <div className="flex flex-col py-2">
                {loading ? (
                    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f1f5f9">
                        <div className="flex justify-between">
                            <Skeleton width={100} height={20} />
                            <Skeleton width={80} height={20} />
                        </div>
                        <Skeleton width={120} height={16} style={{ marginTop: 4 }} />
                    </SkeletonTheme>
                ) : (
                    <>
                        <div className="flex justify-between space-y-1">
                            <h2 className="text-[17px] text-gray-700">Grand Total</h2>
                            <h3 className="font-medium text-[17px] text-red-900">{format(totalPrice)}</h3>
                        </div>
                        <p
                            className="text-[15px] underline decoration-solid font-medium cursor-pointer w-fit"
                            onClick={() => setOpenPayment(prev => !prev)}
                        >
                            Payement Summary
                        </p>
                    </>
                )}
            </div>
            <div className="flex items-start space-x-3">
                <input className="w-7 h-7 cursor-pointer accent-red-900" type="checkbox" id="terms"/>
                <label className="text-[15px]" htmlFor="terms">
                    I have read and accept the purchase conditions and fare rules, 
                    as well as all the terms and conditions and general conditions
                    of carriage applicable to my flight.
                </label>
            </div>
            <button
                className="bg-red-900 border-2 border-red-900 rounded-full w-full py-3 font-bold text-md text-amber-50 cursor-pointer hover:bg-red-800 transition"
            >
                Continue the payment
            </button>

            <div
                className={`
                    fixed inset-0 z-40 bg-black/40
                    transition-opacity duration-300
                    ${openPayment ? "opacity-100 " : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setOpenPayment(null)}
            >
                <div
                    className={`
                        fixed bg-white transition-all duration-300 ease-in-out
                        
                        bottom-0 left-0 w-full h-[80vh] rounded-t-2xl
                        ${openPayment ? "translate-y-0" : "translate-y-full"}

                        lg:top-0 lg:right-0 lg:left-auto lg:h-screen lg:w-1/2 lg:rounded-none 
                        lg:bottom-auto
                        ${openPayment ? "lg:translate-y-0 lg:translate-x-0" : "lg:translate-x-full lg:translate-y-0"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {openPayment && (
                        <PaymentDetails
                            setOpen={() => setOpenPayment(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}


export default function TripReviewDetail() {
    return (
        <Suspense fallback={<div className="flex flex-col lg:h-fit bg-white lg:w-2/5 w-full p-5 rounded-3xl space-y-2" />}>
            <TripReviewDetailContent />
        </Suspense>
    )
}