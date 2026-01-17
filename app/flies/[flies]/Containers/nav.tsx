"use client"

import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser , faRightLeft , faCalendar , faUsers , faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

export default function FlightsNav(){

    const search = useSearchParams()

    const departIata =search.get("departureIata")
    const arriveIata =search.get("arriveIata")
    const firstDay = search.get("firstday")
    const lastDay = search.get("lastday")
    const passengers = search.get("passengers")

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
                <li>
                    <div className="flex items-center p-4 border border-gray-300 rounded-4xl cursor-pointer">
                        <div className="flex items-center px-5 border-r border-gray-300">
                            <h3>{departIata}</h3>
                            <p className="w-5 mx-3 text-red-900"><FontAwesomeIcon icon={faRightLeft}/></p>
                            <h3>{arriveIata}</h3>
                        </div>
                        <div className="flex items-center px-5 border-r border-gray-300">
                            <p className="w-5 mr-3  text-red-900"><FontAwesomeIcon icon={faCalendar} /></p>
                            <h3>{firstDay}-{lastDay}</h3>
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
        </div>
    )
}