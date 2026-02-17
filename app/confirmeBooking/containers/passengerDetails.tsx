"use client"

//
import { useState , useEffect } from "react"

import PassengerForm from "./passengerDetailsForm"
//
import { usePassenger } from "@/app/contexts/passengerContext"


export default function PassengerDetails(){
    
    const [passengerForm , setPassengerForm] = useState<boolean>(false)
    const {passenger} = usePassenger()

    const title = passenger.title
    const firstName = passenger.firstName
    const lastName  = passenger.lastName

    const firstNameLetter = passenger.firstName.charAt(0) 
    const lastNameLetter = passenger.lastName.charAt(0)

    const openForm = () =>{
        setPassengerForm(prev => !prev)
    }

    useEffect(() => {
        if(passengerForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "" ;
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [passengerForm])



    return(
        <div className="relative w-1/2 space-y-9 bg-zinc-100">
            <h2 className="text-4xl text-gray-600 font-light ">{`Who's travelling?`}</h2>

            <div onClick={openForm} className="flex justify-between items-center bg-white rounded-2xl p-4 cursor-pointer">
                <div className="flex items-center space-x-2.5">
                    <h3 className={`${firstName && lastName ? "bg-purple-700" : ""} rounded-full text-white p-2 uppercase`}>{firstNameLetter}{lastNameLetter}</h3>
                    <div>
                        <h2 className="capitalize">{title} {firstName} {lastName}</h2>
                        <h3 className="text-[15px]">Add Passenger Details</h3>
                    </div>
                </div>

                <div className="bg-green-700 rounded-full text-white p-2">
                    <h3>D</h3>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-xl">Check your passenger details</h3>
                <h4>If you need to change any passenger details, you will have to enter your passenger details again.</h4>
            </div>

            <button className="bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Continue to contact details</button>

            
            {passengerForm && (
                <div
                    className="fixed inset-0 z-40 bg-black/40"
                    onClick={() => setPassengerForm(false)}
                >
                    <div
                        className={`
                            absolute top-0 right-0 h-screen w-1/2 bg-white
                            transition-transform duration-300
                            translate-x-0
                            overflow-y-scroll
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <PassengerForm closePassengerForm={setPassengerForm}/>
                    </div>
                </div>
            )}
        </div>
    )
}