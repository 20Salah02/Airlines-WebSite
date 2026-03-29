"use client"

//
//
import Image from "next/image"
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck , faCheck, faSuitcase, faSuitcaseRolling, faTicket } from "@fortawesome/free-solid-svg-icons"

//
import { FareType } from "@/app/contexts/bookingContext"
import { useFlightResultContext } from "@/app/contexts/priceContext"


type EcoClassProps = {
  onSelect: (fare: FareType, price: number) => void;
};

export default function EcoClass({onSelect} : EcoClassProps){
    
    const {flightResult} = useFlightResultContext()

    if (!flightResult )return null

    const basePrice = flightResult.price
    const classicPrice = Math.round(basePrice)
    const conveniencPrice = Math.round(basePrice * 1.3)
    const comfortPrice = Math.round(basePrice * 1.6)
    const comfortBusinesPrice = Math.round(basePrice * 2.5)

    return(
        <div className="grid grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-3xl p-4 h-170">
                <div>
                    <h1 className="text-[25px] font-light text-gray-600">Economy Classic</h1>
                    <div className="mt-5">
                        <h2 className="flex justify-end text-3xl font-[350] py-2">{classicPrice.toLocaleString()} USD</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <h4 
                        onClick={() => onSelect("Economy Classic" , classicPrice)}
                        className="flex justify-center py-4 my-5 w-full border border-red-900 rounded-4xl text-xl font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">
                            Select fare
                    </h4>
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
                    <h1 className="text-[25px] font-light text-gray-600">Economy Convenienc</h1>
                    <div className="mt-5">
                        <h2 className="flex justify-end text-3xl font-[350] py-2">{conveniencPrice.toLocaleString()} USD</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <h4 
                        onClick={() => onSelect("Economy Convenienc" , conveniencPrice)}
                        className="flex justify-center py-4 my-5 w-full border border-red-900 rounded-4xl text-lg font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">
                            Select fare
                    </h4>                </div>
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
                    <h1 className="text-[25px] font-light text-gray-600">Economy Comfort</h1>
                    <div className="mt-5">
                        <h2 className="flex justify-end text-3xl font-[350] py-2">{comfortPrice.toLocaleString()} USD</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <h4 
                        onClick={() => onSelect("Economy Comfort" , comfortPrice)}
                        className="flex justify-center py-4 my-5 w-full border border-red-900 rounded-4xl text-xl font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">
                            Select fare
                    </h4>               
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
                        <h1 className="text-[25px] font-light">Business Comfort</h1>
                        <div className="mt-5">
                            <h2 className="flex justify-end text-3xl font-[350] py-2">{comfortBusinesPrice.toLocaleString()} USD</h2>
                        </div>
                        <h4
                            onClick={()=> onSelect("Business Comfort" , comfortBusinesPrice)}
                            className="flex justify-center mt-auto py-4 my-5 w-full border border-red-900 bg-red-900 rounded-4xl text-xl font-medium cursor-pointer hover:bg-red-950 duration-300">
                                Select fare
                        </h4>
                    </div>
                </div>
            </div>

            
        </div>
    )
}
