"use client"

import HandleDestination from "@/app/hooks/mainFormDestination"
import Image from "next/image"
//
import { useState } from "react"

type Airport ={
    id: number;
    name: string; 
    city: string; 
    country: string; 
    iata: string;
    latitude : number;
    longitude : number
}

export default function NewsLetter(){

    const [departure , setDeparture] = useState<Airport | null>(null)
    const [email , setEmail] = useState<string>("")
    const [check , setCheck] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [showPopup, setShowPopup] = useState(false)

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    //
    const handleSubmit = () => {
        setSubmitted(true)

        if (!isValidEmail(email) || !departure || !check) {
            return
        }

        setShowPopup(true)
    }


    return(
        <div className="relative h-110">
            <Image
                src="/NL_Background_Desktop.avif"
                alt="NL_Background_Desktop"
                fill
                className="object-cover rounded-2xl"
            />
            <div className="absolute  right-0 z-10 h-full w-1/2 space-y-8 pr-5 text-white flex flex-col justify-end ">
                <div className="space-y-5">
                    <h2 className="text-4xl font-light" >Never miss an offer</h2>
                    <h3>Subscribe and be the first to receive our exclusive offers.</h3>
                </div>

                <div className="w-full">
                    <div className="flex w-full relative">
                        <div className="relative flex-1">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=" text-black h-13 w-full bg-white rounded-l-md border border-zinc-300  pl-3"
                                type="email"
                            />
                            <label
                                className={`absolute left-3 transition-all duration-200 pointer-events-none
                                    ${
                                        email
                                            ? "top-1 text-xs text-gray-500"
                                            : "top-1/2 -translate-y-1/2 text-gray-400"
                                    }`}
                                >
                                    Email
                            </label>
                        </div>
                        <div className="relative flex-1 text-black">
                            <HandleDestination
                                className="h-13 w-full bg-white rounded-r-md border  pl-3 text-black border-zinc-300"
                                placeholder="From"
                                value={departure?.name || ""}
                                onSelect={(airport) => setDeparture(airport)}
                                floatingLabel={true}
                                dropdownPosition="right"
                            />
                        </div>
                    </div>

                    <div className="flex w-full mt-1 text-sm text-red-500">
                        <h5 className="flex-1">
                            {submitted && !isValidEmail(email) && "Please enter a valid email address."}
                        </h5>
                        <h5 className="flex-1">
                            {submitted && !departure && "Please select the preferred departure airport."}
                        </h5>
                    </div>
                </div>

                <div className="">
                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            checked={check}
                            onChange={(e) => setCheck(e.target.checked)}
                            className="w-18"
                        />                        
                        <h4>I’d like to receive offers and news. I understand the Privacy Notice and acknowledge that I can unsubscribe anytime using the link at the bottom of each message.</h4>
                    </div>
                    <div>
                        {submitted && !check && (
                            <p className="text-red-500 text-sm">
                                You must accept to receive offers.
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        onClick={handleSubmit}
                        className="border border-white rounded-4xl px-12 py-4 cursor-pointer"
                    >
                        Subscribe
                    </button>                
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-2xl p-6 text-center w-80">
                        <p className="text-gray-600 mb-4">
                            You have successfully subscribed!
                        </p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}