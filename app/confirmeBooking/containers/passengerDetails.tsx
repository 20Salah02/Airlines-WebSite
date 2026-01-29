"use client"

import PassengerForm from "./passengerDetailsForm"

export default function PassengerDetails(){

    return(
        <div className="relative w-1/2 space-y-9 bg-zinc-100">
            <h2 className="text-4xl text-gray-600 font-light ">{`Who's travelling?`}</h2>
            <div className="flex justify-between items-center bg-white rounded-2xl p-4 cursor-pointer">
                <div className="flex items-center space-x-2.5">
                    <h3 className="bg-purple-700 rounded-full text-white p-2">SM</h3>
                    <div>
                        <h2>Salaheddine Mourid</h2>
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

            
            <div className="">
                <PassengerForm/>
            </div>
        </div>
    )
}