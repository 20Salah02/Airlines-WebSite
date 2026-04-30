"use client"

import { usePassenger } from "@/app/contexts/passengerContext"
import { useState , useEffect } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

export default function PassengerDetailsReview(){

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0)
        return () => clearTimeout(timer)
    }, [])
    const loading = !mounted

    //
    const {passenger} = usePassenger()

    const gender = passenger.gender
    const birthD = passenger.birthday.day
    const birthM = passenger.birthday.month
    const birthY = passenger.birthday.year
    const nation = passenger.nationality
    const title = passenger.title
    const firstName = passenger.firstName
    const lastName  = passenger.lastName

    const firstNameLetter = passenger.firstName.charAt(0) 
    const lastNameLetter = passenger.lastName.charAt(0)

    const email = passenger.email
    const phone = passenger.phone

    return(
        <div className="mt-5 lg:space-y-10 space-y-5">
            <h1 className="text-3xl font-light text-gray-600">Passengers</h1>

            {loading ? (
                <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f1f5f9">
                    <div className="bg-white rounded-3xl p-8">
                        <div className="flex lg:flex-row flex-col border-b border-b-zinc-200 lg:pb-8 pb-4 gap-4">
                            <div className="flex lg:flex-1 items-center space-x-3">
                                <Skeleton circle width={40} height={40} />
                                <Skeleton width={150} height={16} />
                            </div>
                            <div className="lg:flex-1 space-y-2">
                                <Skeleton width="60%" height={16} />
                                <Skeleton width="70%" height={16} />
                                <Skeleton width="50%" height={16} />
                            </div>
                        </div>
                        <div className="space-y-4 lg:mt-7 mt-4">
                            <Skeleton width={140} height={18} />
                            <div className="space-y-2">
                                <Skeleton width="50%" height={16} />
                                <Skeleton width="40%" height={16} />
                            </div>
                        </div>
                    </div>
                </SkeletonTheme>
            ) : (
                <div className="bg-white rounded-3xl p-8">
                    <div className="flex lg:flex-row flex-col lg:space-y-0 sapce-y-20 border-b border-b-zinc-200 lg:pb-8 pb-4">
                        <div className="flex lg:flex-1">
                            <h3 className={`${firstName && lastName ? "bg-purple-700" : ""} rounded-full text-white p-2 uppercase w-fit h-fit`}>{firstNameLetter}{lastNameLetter}</h3>
                            <h4 className="capitalize text-[15px] w-fit ml-3">{title}. {firstName} {lastName}</h4>
                        </div>
                        <div className="lg:flex-1 text-gray-600">
                            <h3>Gender : <span className="text-black capitalize font-medium">{gender}</span></h3>
                            <h3>Date of birth : <span className="text-black capitalize font-medium">{birthD} {birthM} {birthY}</span></h3>
                            <h3>Nationality : <span className="text-black capitalize font-medium">{nation}</span></h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-[17px] font-medium lg:mt-7 mt-4">Contact details</h2>
                        <div className="text-gray-600">
                            <h3>Email : {email}</h3>
                            <h3>Phone : {phone}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
