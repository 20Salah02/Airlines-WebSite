"use client"

//
import { useState , useEffect } from "react"

import PassengerForm from "./passengerDetailsForm"
import PassengerMoreDetails from "./passengerMoreDetailsForm"
//
import { usePassenger } from "@/app/contexts/passengerContext"
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck , faPen } from "@fortawesome/free-solid-svg-icons"

export default function PassengerDetails(){
    
    const [passengerForm , setPassengerForm] = useState<boolean>(false)
    const [showMoreDetails , setShowMoreDetails] = useState<boolean>(false)

    const handleShowMoreDetails = (() => {
        if(isCompleted){
            setShowMoreDetails(true)
        }
    })

    const {passenger} = usePassenger()

    const title = passenger.title
    const firstName = passenger.firstName
    const lastName  = passenger.lastName

    const firstNameLetter = passenger.firstName.charAt(0) 
    const lastNameLetter = passenger.lastName.charAt(0)

    //
    const requiredFields = [
    passenger.gender,
    passenger.firstName,
    passenger.lastName,
    passenger.birthday.day,
    passenger.birthday.month,
    passenger.birthday.year,
    passenger.nationality,
]

    const emptyFieldsCount = requiredFields.filter(field => !field).length

    const isCompleted = emptyFieldsCount === 0

    //
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
        <div className="relative lg:w-1/2 w-full space-y-9 bg-zinc-100 h-full mb-10">
            <h2 className="text-3xl text-gray-600 font-light ">{`Who's travelling?`}</h2>

            <div onClick={openForm} className="flex justify-between items-center bg-white rounded-2xl p-3 cursor-pointer">
                <div className="flex items-center space-x-2.5">
                    <h3 className={`${firstName && lastName ? "bg-purple-700" : ""} rounded-full text-white p-2 uppercase`}>{firstNameLetter}{lastNameLetter}</h3>
                    <div>
                        <h2 className="capitalize">{title} {firstName} {lastName}</h2>
                        {isCompleted ? (
                            <h3 className="text-[14px] text-gray-600">Passenger details completed</h3>
                        ) : emptyFieldsCount > 0 ? (
                            <h3 className="text-red-600 text-sm">
                                Still {emptyFieldsCount} field{emptyFieldsCount > 1 ? "s" : ""} required
                            </h3>
                        ) : (
                            <h3 className="text-[14px]">Add Passenger Details</h3>
                        )}
                    </div>
                </div>

                <div className={`rounded-full text-white p-2 ${
                    isCompleted ? "bg-green-700" : "bg-gray-400"
                }`}>
                    {isCompleted ? (
                        <FontAwesomeIcon icon={faCheck}/>
                    ) : (
                        <FontAwesomeIcon icon={faPen}/>
                    )}
                </div>

            </div>
            
            {!showMoreDetails ? (
            <div className="space-y-7">
                <div className="space-y-2">
                        <h3 className="lg:text-xl text-[17px] font-medium">Check your passenger details</h3>
                        <h4>If you need to change any passenger details, you will have to enter your passenger details again.</h4>
                </div>

                <button 
                    onClick={handleShowMoreDetails}
                    className="bg-red-900 border-2 border-red-900 rounded-full w-full  py-3  font-bold text-md text-amber-50 cursor-pointer">
                            Continue to contact details
                </button>
            </div>
            ) : <PassengerMoreDetails/>}

            <div
                className={`
                    fixed inset-0 z-40 bg-black/40
                    transition-opacity duration-300
                    ${passengerForm ? "opacity-100 " : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setPassengerForm(false)}
            >
                <div
                    className={`
                        fixed bg-white transition-all duration-300 ease-in-out overflow-y-scroll
                        
                        bottom-0 left-0 w-full h-[80vh] rounded-t-2xl
                        ${passengerForm ? "translate-y-0" : "translate-y-full"}

                        lg:top-0 lg:right-0 lg:left-auto lg:h-screen lg:w-1/2 lg:rounded-none 
                        lg:bottom-auto
                        ${passengerForm ? "lg:translate-y-0 lg:translate-x-0" : "lg:translate-x-full lg:translate-y-0"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <PassengerForm closePassengerForm={setPassengerForm} />                  
                </div>
            </div>

        </div>
    )
}
