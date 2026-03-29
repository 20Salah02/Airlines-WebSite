"use client"

import { usePassenger } from "@/app/contexts/passengerContext"

export default function PassengerDetailsReview(){

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
        <div className="mt-5 space-y-10">
            <h1 className="text-3xl font-light text-gray-600">Passengers</h1>
            <div className="bg-white rounded-3xl p-8">
                <div className="flex border-b border-b-zinc-200 pb-8">
                    <div className="flex flex-1 ">
                        <h3 className={`${firstName && lastName ? "bg-purple-700" : ""} rounded-full text-white p-2 uppercase w-fit h-fit`}>{firstNameLetter}{lastNameLetter}</h3>
                        <h4 className="capitalize text-[15px] w-fit ml-3">{title}. {firstName} {lastName}</h4>
                    </div>
                    <div className="flex-1 text-gray-600">
                        <h3>Gender : <span className="text-black capitalize font-medium">{gender}</span></h3>
                        <h3>Date of birth : <span className="text-black capitalize font-medium">{birthD} {birthM} {birthY}</span></h3>
                        <h3>Nationality : <span className="text-black capitalize font-medium">{nation}</span></h3>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-[17px] font-medium mt-7">Contact details</h2>
                    <div className="text-gray-600">
                        <h3>Email : {email}</h3>
                        <h3>Phone : {phone}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}