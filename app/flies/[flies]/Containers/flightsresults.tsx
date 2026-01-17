"use client"

//
import { useState } from "react"
//
import { useSearchParams } from "next/navigation"
//
import EcoClass from "./class/economieClass"

export default function FlightResults(){

    const [openEcoClass , setopenEcoClass] = useState<boolean>(false)
    
    const search = useSearchParams()
    const departIata =search.get("departureIata")
    const arriveIata =search.get("arriveIata")
    return(
        <div>
            <div className="flex justify-between items-center"> 
                <div>
                    <h2 className="font-bold pb-3 text-[18px]">15 results</h2>
                    <p className="text-gray-700">Fares displayed are for all passengers.</p>
                </div>
                <div>
                    <button className="bg-white py-3 px-5 rounded-4xl mx-6 font-normal cursor-pointer">Change Currency</button>
                    <button  className="bg-white py-3 px-5 rounded-4xl font-normal cursor-pointer">Sort And Filter</button>
                </div>
            </div>
            {/*  */}


            <div className="bg-white rounded-4xl p-5 my-4">
                <div className="flex items-center justify-between ">
                    <div className="w-1/3">
                        <div>StarLink Wi-Fi</div>
                        <div className="my-7">
                            <div  className="flex text-4xl font-light justify-between">
                                <p>10:00</p>
                                <div className="text-lg font-normal text-gray-600">
                                    <p className="flex justify-center items-center">L</p>
                                    <p className="pt-4">Non-Stop 2h 10m</p>
                                </div>
                                <p>12:10</p>
                            </div>
                            <div className="flex justify-between text-gray-600 text-[20px]">
                                <p>{departIata}</p>
                                <p>{arriveIata}</p>
                            </div>
                        </div>
                        <div className="cursor-pointer font-medium underline decoration-solid w-fit">Flight Details</div>
                    </div>

                    <div onClick={()=>setopenEcoClass(prev => !prev)} className="flex justify-between  ">
                        <div className="flex flex-col relative">
                            <div className="flex flex-col justify-start border border-gray-300 rounded-2xl w-70 h-47 mr-4 p-5 cursor-pointer hover:border-black duration-300">
                                <p className="text-gray-600">Economy</p>
                                <h2 className="text-4xl font-light flex pt-5">MAD 2,000</h2>
                                <h6 className="font-extralight text-green-800">special offer</h6>
                            </div>

                        </div>
                        <div className="flex flex-col justify-start border border-gray-300 rounded-2xl w-70 h-47 mr-4 p-5 cursor-pointer hover:border-black duration-300">
                            <p className="text-gray-600">Business</p>
                            <h2 className="text-4xl font-light flex pt-5">MAD 6,000</h2>
                            <h6 className="font-extralight text-green-800">special offer</h6>
                        </div>

                    </div>

                    
                </div>
                   <div
                        className={`
                            overflow-hidden transition-all duration-500 ease-in-out
                            ${openEcoClass ? " opacity-100 mt-6" : "max-h-0 opacity-0"}
                        `}
                        >
                        <EcoClass />
                        </div>

            </div>
        </div>
    )
}