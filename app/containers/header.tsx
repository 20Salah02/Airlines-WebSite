
import Image from "next/image"
import Form from "./headerForm"
import Nav from "./navbar"
//
import Link from "next/link"



export default function Myheader(){

    return(
        <div  className="relative text-amber-50">
            <div><Nav/></div>
            <div className="p-24 pt-34"> 
                <Image
                    src="/hn-fifa-world-cup-2026.jpg"
                    alt="FIFA World Cup 2026"
                    fill
                    priority
                    className="object-cover -z-10"
                />
                <h1 className="text-3xl leading-10">Score your spot at<br></br> FIFA World Cup 26™</h1>
                <Link href="/flies">
                    <button className="bg-transparent border-2 border-amber-50 rounded-full px-8 py-4 my-8 font-bold text-md text-amber-50 cursor-pointer hover:text-fuchsia-950 hover:bg-amber-50 transition-all duration-300">Book Now</button>
                </Link>
            </div>
            <div><Form/></div>
        </div>
    )
}