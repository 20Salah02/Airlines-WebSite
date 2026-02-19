"use client"

//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

export default function PassengerMoreDetails(){

    return(
        <div className="space-y-9 my-6">
            <div className="text-gray-600 space-y-6">
                <h3 className="text-4xl font-light">Just a few More Details</h3>
                <h4>Tell us where we should send your booking confirmation to.</h4>
            </div>

            <div className="bg-white rounded-2xl  p-4 space-y-4">
                <div className="relative flex flex-col  space-y-2.5 justify-center">
                    <label className="block mb-1">Email address</label>
                    <input
                        type="email"
                        className="bg-zinc-100 p-2.5 pl-10 rounded-md border border-zinc-400 w-full"
                    />
                    <FontAwesomeIcon 
                        icon={faEnvelope}
                        className="absolute left-3 top-11  "
                    />
                </div>
                <div className="flex space-x-5">
                    <div className="flex flex-col w-1/2 space-y-2.5">
                        <label>Country/Region code</label>
                        <input 
                            type="text" 
                            className="bg-zinc-100 p-2.5 pl-10 rounded-md border border-zinc-400 w-full"
                        />
                    </div>
                    <div className="flex flex-col w-1/2 space-y-2.5">
                        <label>Mobile Number</label>
                        <input 
                            type="text" 
                            className="bg-zinc-100 p-2.5 pl-10 rounded-md border border-zinc-400 w-full"
                        />
                    </div>
                </div>
            </div>

            <div>
                <button className="bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Continue</button>
            </div>
        </div>
    )
}