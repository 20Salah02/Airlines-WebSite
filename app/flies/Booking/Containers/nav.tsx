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
        <div className="">
            <ul className="flex justify-around items-center pt-4 font-medium text-[16px]">
                <Link href="/">
                    <li className="lg:flex hidden">
                        <Image 
                            src="/Logo.png"
                            alt="Logo"
                            width={60}
                            height={50}
                            priority
                        />
                    </li>
                </Link>
                <li onClick={() => setOpenFormEdit(prev => !prev)}>
                    <div className="flex lg:flex-row flex-col items-center space-y-2 lg:space-y-0 lg:p-4 p-2 border border-gray-300 rounded-4xl cursor-pointer">
                        <div className="flex border-gray-300">
                            <div className="flex items-center px-3 border-r border-gray-300">
                                <h3 className="lg:text-[16px] text-[14px]">{from?.iata}</h3>
                                <p className="w-5 mx-3 text-red-900"><FontAwesomeIcon icon={faRightLeft}/></p>
                                <h3 className="lg:text-[16px] text-[14px]">{to?.iata}</h3>
                            </div>
                            <div className="flex items-center px-3 lg:border-r border-gray-300">
                                <p className="w-5 mr-3  text-red-900"><FontAwesomeIcon icon={faCalendar} /></p>
                                <h3 className="lg:text-[16px] text-[14px]">{formatNavDate(firstDay)}-{formatNavDate(lastDay)}</h3>
                            </div>
                            <div className="lg:flex items-center px-3 lg:border-r border-gray-300 hidden">
                                <p className="w-6 mr-3  text-red-900"><FontAwesomeIcon icon={faUsers}/></p>
                                <h3>{passengers}</h3>
                            </div>
                        </div>
                        <div className="flex items-center px-3 text-red-900">
                            <p className="w-5 mr-3"><FontAwesomeIcon icon={faMagnifyingGlass}/></p>
                            <h3 className="lg:text-[16px] text-[14px]">Modify Search</h3>
                        </div>
                    </div>
                </li>
                <Link href="/Login">
                    <li className="flex border lg:rounded-4xl rounded-full p-3 border-red-900 text-red-900">
                        <p className="w-5 "><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></p>
                        <p className="lg:flex hidden">Login</p>
                    </li>
                </Link>
            </ul>

            <div
                className={`
                    fixed inset-0 z-20 bg-black/40
                    transition-opacity duration-300
                    ${openFormEdit ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setOpenFormEdit(false)}
            >
                <div
                    className={`
                        absolute top-0 right-0 h-screen w-1/2 bg-white
                        transition-transform duration-300
                        ${openFormEdit ? "translate-x-0" : "translate-x-full"}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {openFormEdit && (
                        <FlightEdit setOpenFormEdit={setOpenFormEdit} />
                    )}
                </div>
            </div>

        </div>
    )
}