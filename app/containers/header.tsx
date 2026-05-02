import Image from "next/image"
import Form from "./headerForm"
import Nav from "./navbar"
import Link from "next/link"

export default function Myheader(){
    return(
        <div className="relative text-amber-50 z-50">

            {/* Mobile: nav floats over image */}
            <div className="relative md:hidden">
                <div className="relative w-full aspect-4/3">
                    <Image
                        src="/background2.avif"
                        alt=""
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>
                <div className="absolute top-0 left-0 w-full z-20">
                    <Nav/>
                </div>
            </div>

            <div className="hidden md:block relative">
                <div className="relative lg:p-20 md:p-14 pt-34">
                    <Image
                        src="/background2.avif"
                        alt=""
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute top-0 left-0 w-full z-20">
                        <Nav/>
                    </div>
                    <div className="relative z-40 mt-24">
                        <h1 className="lg:text-3xl md:text-2xl leading-10">
                            Plan your travels again,<br/> with our growing network
                        </h1>
                        <Link href="/flies">
                            <button className="bg-transparent border-2 border-amber-50 rounded-full lg:px-8 lg:py-4 md:px-6 md:py-4 px-4 py-2 my-8 font-bold text-amber-50 cursor-pointer hover:text-fuchsia-950 hover:bg-amber-50 transition-all duration-300">
                                Book Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <Form/>
        </div>
    )
}