
import Link from "next/link"
import Image from "next/image"
// icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from '@fortawesome/free-solid-svg-icons'
//

export default function Nav(){

    return(
        <div>
            <ul className="flex justify-around items-center pt-4 font-medium text-lg">
                <Link href="/"><li >
                    <Image 
                        src="/Logo.png"
                        alt="Logo"
                        width={60}
                        height={50}
                        priority
                    />
                </li></Link>
                <Link href="/Explore"><li></li></Link>
                <Link href="/Explore"><li>Explore</li></Link>
                <Link href="/Book"><li>Book</li></Link>
                <Link href="/Experience"><li>Experience</li></Link>
                <Link href="/Promo"><li>Promo</li></Link>
                <Link href="/Help"><li>Help</li></Link>
                <Link href="/Help"><li></li></Link>
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