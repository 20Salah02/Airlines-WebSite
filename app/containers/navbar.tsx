"use client"

import Link from "next/link"
import Image from "next/image"
// icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from '@fortawesome/free-solid-svg-icons'
//

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

export default function Nav(){

    return(
        <div>
            <ul className="flex justify-around items-center pt-2 font-medium text-lg">
                <Link href="/">
                    <li>
                        <Image 
                            src="/Logo.png"
                            alt="Logo"
                            width={60}
                            height={50}
                            priority
                        />
                    </li>
                </Link>
                    <li onClick={() => scrollToSection("Experience")} className="cursor-pointer">
                        Experience
                    </li>

                    <li onClick={() => scrollToSection("Offers")} className="cursor-pointer">
                        Offers
                    </li>

                    <li onClick={() => scrollToSection("Alerts")} className="cursor-pointer">
                        Alerts
                    </li>
                <Link href="/Login">
                    <li className="flex">
                        <p className="w-5 mr-2"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></p>
                        <p>Login</p>
                    </li>
                </Link>
            </ul>
        </div>
    )
}