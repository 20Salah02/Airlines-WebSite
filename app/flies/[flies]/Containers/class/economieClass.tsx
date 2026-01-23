"use client"

//
import Image from "next/image"
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck , faCheck, faSuitcase, faSuitcaseRolling, faTicket } from "@fortawesome/free-solid-svg-icons"

export default function EcoClass(){

    const fares = [
        { id: "eco-classic", title: "Economy Classic", price: 2000 },
        { id: "eco-convenienc", title: "Economy Convenienc", price: 2125 },
        { id: "eco-comfort", title: "Economy Comfort", price: 2825 },
        { id: "bus-comfort", title: "Business Comfort", price: 7825 },
    ]

    return(
        <div className="grid grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-3xl p-4 h-170">
                <div>
                    <h1 className="text-3xl font-light text-gray-600">{fares.}</h1>
                    <div className="mt-7">
                        <h2 className="flex justify-end text-3xl font-[350] py-2">MAD 2,000</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <h4 className="flex justify-center py-4 my-5 w-full border border-red-900 rounded-4xl text-xl font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">Select fare</h4>
                </div>
                <div className="text-gray-600">
                    <h3 className="font-medium">Benefits and fees per adult passenger</h3>
                    <ul className="space-y-6 mt-4">
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCalendarCheck}/></p>
                            <h3>Flight or date changes for a fee</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faTicket}/></p>
                            <h3>Cancellation within 24hrs of booking without fees</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faSuitcaseRolling}/></p>
                            <h3>Checked baggage: 30 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faSuitcase}/></p>
                            <h3>Hand baggage: 1 piece, 7 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCheck}/></p>
                            <h3>Seat selection for a fee</h3>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="border border-gray-200 rounded-3xl p-4 h-170">
                <div>
                    <h1 className="text-3xl font-light text-gray-600">Economy Convenienc</h1>
                    <div className="mt-7">
                        <h2 className="flex justify-end text-3xl font-[350] py-2">MAD 2,125</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <h4 className="flex justify-center py-4 my-5 w-full border border-red-900 rounded-4xl text-xl font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">Select fare</h4>
                </div>
                <div className="text-gray-600">
                    <h3 className="font-medium">Benefits and fees per adult passenger</h3>
                    <ul className="space-y-6 mt-4">
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCalendarCheck}/></p>
                            <h3>Flexibility to make 1 change</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faTicket}/></p>
                            <h3>Cancellation within 24hrs of booking without fees</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faSuitcaseRolling}/></p>
                            <h3>Checked baggage: 30 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faSuitcase}/></p>
                            <h3>Hand baggage: 1 piece, 7 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCheck}/></p>
                            <h3>Standard Seat selection included</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCheck}/></p>
                            <h3>Preferred Seat selection for a fee</h3>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className=" border border-gray-200 rounded-3xl p-4 h-170">
                <div>
                    <h1 className="text-3xl font-light text-gray-600">Economy Comfort</h1>
                    <div className="mt-7">
                        <h2 className="flex justify-end text-3xl font-[350] py-2">MAD 2,825</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <h4 className="flex justify-center py-4 my-5 w-full border border-red-900 rounded-4xl text-xl font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">Select fare</h4>
                </div>
                <div className="text-gray-600">
                    <h3 className="font-medium">Benefits and fees per adult passenger</h3>
                    <ul className="space-y-6 mt-4">
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCalendarCheck}/></p>
                            <h3>Make unlimited changes</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faTicket}/></p>
                            <h3>Cancel at anytime without fees</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faSuitcaseRolling}/></p>
                            <h3>Checked baggage: 30 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faSuitcase}/></p>
                            <h3>Hand baggage: 1 piece, 7 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCheck}/></p>
                            <h3>Standard Seat selection included</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCheck}/></p>
                            <h3>Preferred Seat selection included </h3>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className=" border border-gray-200 rounded-3xl h-170 ">
                <div className="relative h-full ">
                    <Image
                        src="/generic-oal-01-508w.jpg"
                        alt=""
                        fill
                        priority
                        className="object-cover  rounded-3xl"
                    />
                    <div className="flex flex-col h-full p-4 z-10 relative text-white">
                        <h1 className="text-3xl font-light">Business Comfort</h1>
                        <div className="mt-7">
                            <h2 className="flex justify-end text-3xl font-[350] py-2">MAD 7,825</h2>
                        </div>
                        <h4 className="flex justify-center mt-auto py-4 my-5 w-full border border-red-900 bg-red-900 rounded-4xl text-xl font-medium cursor-pointer hover:bg-red-950 duration-300">Select fare</h4>
                    </div>
                </div>
            </div>

            
        </div>
    )
}