"use client"

//
import Image from "next/image"
import Link from "next/link"
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck , faCheck, faSuitcase, faSuitcaseRolling, faTicket } from "@fortawesome/free-solid-svg-icons"

export default function BusinessClass(){

    return(
        <div className="grid grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-3xl p-4 h-170">
                <div>
                    <h1 className="text-3xl font-light text-gray-600">Business Comfort</h1>
                    <div className="mt-7">
                        <h2 className="flex justify-end text-3xl font-[350] py-2">MAD 7,825</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <Link href="/">
                    <h4 className="flex justify-center py-4 my-5 w-full border border-red-900 rounded-4xl text-xl font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">Select fare</h4>
                    </Link>
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
                            <h3>Checked baggage: 40 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faSuitcase}/></p>
                            <h3>Hand baggage: 2 piece, 15 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCheck}/></p>
                            <h3>Seat selection included</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCheck}/></p>
                            <h3>Lounge access included</h3>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="border border-gray-200 rounded-3xl p-4 h-170">
                <div>
                    <h1 className="text-3xl font-light text-gray-600">Business Elite</h1>
                    <div className="mt-7">
                        <h2 className="flex justify-end text-3xl font-[350] py-2">MAD 9,125</h2>
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
                            <h3>Checked baggage: 40 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faSuitcase}/></p>
                            <h3>Hand baggage: 2 piece, 15 kg</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCheck}/></p>
                            <h3>Seat selection included</h3>
                        </li>
                        <li className="flex">
                            <p className="w-5 mr-2"><FontAwesomeIcon icon={faCheck}/></p>
                            <h3>Lounge access included</h3>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className=" border border-gray-200 rounded-3xl h-full ">
                <div className="relative h-full ">
                    <Image
                        src="/generic-oal-01-508w.jpg"
                        alt=""
                        fill
                        priority
                        className="object-cover  rounded-3xl"
                    />
                </div>
            </div>

            
        </div>
    )
}