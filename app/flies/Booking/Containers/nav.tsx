"use client"

import Link from "next/link"
import Image from "next/image"
// context
import { useBooking } from "@/app/contexts/bookingContext"
import { useSearchParams } from "next/navigation"
//
import { useState , useEffect} from "react"
//
import FlightEdit from "./flightEdit"
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser , faRightLeft , faCalendar , faUsers , faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

export default function FlightsNav(){

    function formatNavDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
    });
    }


    const [openFormEdit , setOpenFormEdit] = useState<boolean>(false)

    const { booking, } = useBooking();
    
    const search = useSearchParams()
    const step = search.get("step"); // outbound / return

    const isOutbound = step !== "return";

    const from = isOutbound ? booking.from : booking.to;
    const to = isOutbound ? booking.to : booking.from;
    const firstDay = isOutbound ? booking.dates?.departure : booking.dates?.return;
    const lastDay = isOutbound ? booking.dates?.return : booking.dates?.departure;

    const passengers = booking.passengers || "1 Passenger";

    useEffect(() => {
        if(openFormEdit){
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = ""
        }
    } , [openFormEdit])

    return(
        <div>
            <ul className="flex justify-around items-center pt-4 font-medium text-lg ">
                <Link href="/"><li >
                    <Image 
                        src="/Logo.png"
                        alt="Logo"
                        width={60}
                        height={50}
                        priority
                    />
                </li></Link>
                <li onClick={() => setOpenFormEdit(prev => !prev)}>
                    <div className="flex items-center p-4 border border-gray-300 rounded-4xl cursor-pointer">
                        <div className="flex items-center px-5 border-r border-gray-300">
                            <h3>{from?.iata}</h3>
                            <p className="w-5 mx-3 text-red-900"><FontAwesomeIcon icon={faRightLeft}/></p>
                            <h3>{to?.iata}</h3>
                        </div>
                        <div className="flex items-center px-5 border-r border-gray-300">
                            <p className="w-5 mr-3  text-red-900"><FontAwesomeIcon icon={faCalendar} /></p>
                            <h3>{formatNavDate(firstDay)}-{formatNavDate(lastDay)}</h3>
                        </div>
                        <div className="flex items-center px-5 border-r border-gray-300">
                            <p className="w-6 mr-3  text-red-900"><FontAwesomeIcon icon={faUsers}/></p>
                            <h3>{passengers}</h3>
                        </div>
                        <div className="flex items-center px-5 text-red-900">
                            <p className="w-5 mr-3"><FontAwesomeIcon icon={faMagnifyingGlass}/></p>
                            <h3>Modify Search</h3>
                        </div>
                    </div>
                </li>
                <Link href="/Login">
                    <li className="flex border rounded-4xl py-3 px-5 border-red-900 text-red-900">
                        <p className="w-5 mr-2"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></p>
                        <p>Login</p>
                    </li>
                </Link>
            </ul>
            {openFormEdit && (
            <div
                className="fixed inset-0 z-20 bg-black/40"
                onClick={() => setOpenFormEdit(false)} 
            >
                <div
                className={`
                    absolute top-0 right-0 h-screen w-1/2 bg-white
                    transition-transform duration-300
                    translate-x-0
                `}
                onClick={(e) => e.stopPropagation()} 
                >
                <FlightEdit setOpenFormEdit={setOpenFormEdit} />
                </div>
            </div>
            )}
        </div>
    )
}