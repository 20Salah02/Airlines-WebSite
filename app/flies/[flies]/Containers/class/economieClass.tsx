"use client"

//
//
import Image from "next/image"
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck , faCheck, faSuitcase, faSuitcaseRolling, faTicket } from "@fortawesome/free-solid-svg-icons"

export default function EcoClass(){


    return(
        <div className="grid grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-3xl p-4 h-170">
                <div>
                    <h1 className="text-3xl font-light text-gray-600">Economy Classic</h1>
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
//https://www.qatarairways.com/app/booking/flight-selection?widget=QR&searchType=F&addTaxToFare=Y&minPurTime=0&selLang=fr&tripType=R&fromStation=DOH&toStation=CGK&departing=2026-02-14&returning=2026-02-21&bookingClass=E&adults=1&children=0&infants=0&ofw=0&teenager=0&flexibleDate=off&allowRedemption=N
//https://www.qatarairways.com/app/booking/flight-selection?widget=QR&searchType=F&addTaxToFare=Y&minPurTime=0&selLang=fr&tripType=R&fromStation=DOH&toStation=CGK&departing=2026-02-14&returning=2026-02-21&bookingClass=E&adults=1&children=0&infants=0&ofw=0&teenager=0&flexibleDate=off&allowRedemption=N&boundType=I&oBoundId=BC1-2-OFR-5738588490506538-4-1-1
//https://www.qatarairways.com/app/booking/passenger?widget=QR&searchType=F&addTaxToFare=Y&minPurTime=0&selLang=fr&tripType=R&fromStation=DOH&toStation=CGK&departing=2026-02-14&returning=2026-02-21&bookingClass=E&adults=1&children=0&infants=0&ofw=0&teenager=0&flexibleDate=off&allowRedemption=N&boundType=I&oBoundId=BC1-2-OFR-5738588490506538-4-1-1&airOfferItemId=03c93993-4589-4356-8576-7f1ad3a17e11&iBoundId=BU2-2-1I0QRZ_181WPQ5Q6PPXQP72DQR7W01X3C6N&dataId=5JaGCbDaXKW4