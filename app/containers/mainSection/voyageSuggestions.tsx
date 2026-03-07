"use client"

//
import Image from "next/image"

export default function VoyageSuggetions(){

    return(
        <div className="relative mt-67 px-15 bg-zinc-100">
            <div>
                <h2 className="text-4xl font-light text-gray-600">Find great fears</h2>
            </div>
            <div className="flex justify-between mt-7 items-start">
                <div className="flex space-x-2">
                    <label htmlFor="from">From</label>
                    <input id="from" className="border-b " type="text" />
                    <h4>i</h4>
                </div>
                <div className="flex space-x-4">
                    <button className="bg-white px-8 rounded-3xl border border-gray-300 cursor-pointer">Return</button>
                    <button className="bg-white px-6 rounded-3xl border border-gray-300 cursor-pointer">One way</button>
                    <div className="bg-white rounded-md border border-gray-300 px-4 flex justify-between items-center w-50 cursor-pointer">
                        <div>
                            <h4 className="text-gray-600 text-sm">class</h4>
                            <h3 className="text-[17px]">Economy</h3>
                        </div>
                        <h4>i</h4>
                    </div>
                </div>
            </div>

            <div className="relative mx-17">
                <div className="w-2/4 ">
                    <Image
                        src="/hn-fifa-world-cup-2026.jpg"
                        alt="FIFA World Cup 2026"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div>
                        <div>
                            <h2>Bali</h2>
                            <h3>11 Mar 2026 - 13 Mar 2026</h3>
                        </div>
                        <h4>Economy from USD 1425</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}