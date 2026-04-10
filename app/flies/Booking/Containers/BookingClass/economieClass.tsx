"use client"

//
import { useState , useEffect  , useRef} from "react"
//context
import { useCurrency } from "@/app/contexts/currencyContext"
//
import Image from "next/image"

//
import { FareType } from "@/app/contexts/bookingContext"
import { useFlightResultContext } from "@/app/contexts/priceContext"


type EcoClassProps = {
  onSelect: (fare: FareType, price: number) => void;
};

export default function EcoClass({onSelect} : EcoClassProps){

    const [active, setActive] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = sliderRef.current
        if (!el) return

        const handleScroll = () => {
            const index = Math.round(el.scrollLeft / el.clientWidth)
            setActive(index)
        }

        el.addEventListener("scroll", handleScroll)
        return () => el.removeEventListener("scroll", handleScroll)
    }, [])

    //currency

    const {format} = useCurrency()

    //
    
    const {flightResult} = useFlightResultContext()

    if (!flightResult )return null

    const basePrice = flightResult.price
    const classicPrice = Math.round(basePrice)
    const conveniencPrice = Math.round(basePrice * 1.3)
    const comfortPrice = Math.round(basePrice * 1.6)
    const comfortBusinesPrice = Math.round(basePrice * 2.5)

    //



    return(
        <div
            ref={sliderRef}
            className="
                flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth gap-4 lg:grid lg:grid-cols-4 lg:overflow-visible"
        >
            <div className="snap-center min-w-[85%] lg:min-w-0 border border-gray-200 rounded-3xl py-4 lg:px-4 px-2 h-170">
                <div>
                    <h1 className="lg:text-[25px] text-[23px] font-light text-gray-600">Economy Classic</h1>
                    <div className="lg:mt-5 mt-2">
                        <h2 className="flex justify-end text-3xl lg:font-[350] font-light py-2">{format(classicPrice)}</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <h4 
                        onClick={() => onSelect("Economy Classic" , classicPrice)}
                        className="flex justify-center lg:py-4 py-3 lg:my-5 my-4 w-full  border border-red-900 rounded-4xl lg:text-xl text-[16px] font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">
                            Select fare
                    </h4>
                </div>
                <div className=" text-zinc-800 font-light">
                    <h3 className="font-medium lg:text-[15px] text-[14px] text-zinc-600">Benefits and fees per adult passenger</h3>
                    <ul className=" lg:space-y-6 space-y-4 mt-4">
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24"><path fill="currentColor" d="M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V3.308q0-.233.153-.386t.385-.153t.386.153t.153.386V5h7.154V3.27q0-.214.143-.358t.357-.143t.356.143t.144.357V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192M5 9.615h14v-3q0-.23-.192-.423T18.384 6H5.616q-.231 0-.424.192T5 6.616zm0 0V6z"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Flight or date changes for a fee</h3>
                        </li>
                        <li className="flex items-start space-x-1.5 ">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M3 10h-.5a.5.5 0 0 0 .5.5zm0 4v-.5a.5.5 0 0 0-.5.5zm18-4v.5a.5.5 0 0 0 .5-.5zm0 4h.5a.5.5 0 0 0-.5-.5zM5 5.5h5v-1H5zm5 0h9v-1h-9zm9 13h-9v1h9zm-9 0H5v1h5zM9.5 5v14h1V5zm-5.44 5.94a1.5 1.5 0 0 1 0 2.12l.708.708a2.5 2.5 0 0 0 0-3.536zm15.88 2.12a1.5 1.5 0 0 1 0-2.12l-.708-.708a2.5 2.5 0 0 0 0 3.536zM3 10.5c.385 0 .768.146 1.06.44l.708-.708A2.5 2.5 0 0 0 3 9.5zm.5-.5V7h-1v3zm0 7v-3h-1v3zm.56-3.94c-.292.294-.675.44-1.06.44v1c.639 0 1.28-.244 1.768-.732zm15.88-2.12c.292-.294.675-.44 1.06-.44v-1c-.639 0-1.28.244-1.768.732zM20.5 7v3h1V7zm0 7v3h1v-3zm.5-.5c-.385 0-.768-.146-1.06-.44l-.708.708A2.5 2.5 0 0 0 21 14.5zm-16 5A1.5 1.5 0 0 1 3.5 17h-1A2.5 2.5 0 0 0 5 19.5zm14 1a2.5 2.5 0 0 0 2.5-2.5h-1a1.5 1.5 0 0 1-1.5 1.5zm0-14A1.5 1.5 0 0 1 20.5 7h1A2.5 2.5 0 0 0 19 4.5zm-14-1A2.5 2.5 0 0 0 2.5 7h1A1.5 1.5 0 0 1 5 5.5z"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Cancellation within 24hrs of booking without fees</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5h16a2 2 0 0 0 2-2v-11m-7 3H9m5 0c0-3.821-5-3.815-5 0m5 0h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h3m-4 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0m9 0a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Checked baggage: 30 kg</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24"><path fill="currentColor" d="M4 16.577v1.808q0 .23.192.423t.423.192h14.77q.23 0 .423-.192t.192-.423v-1.808zM8 7V5.384q0-.69.463-1.152t1.153-.463h4.769q.69 0 1.153.463T16 5.384V7h3.385q.69 0 1.152.463T21 8.616v9.769q0 .69-.463 1.153T19.385 20H4.615q-.69 0-1.152-.462T3 18.384V8.616q0-.691.463-1.153T4.615 7zm-4 7.423h16V8.615q0-.23-.192-.423T19.385 8H16v1.116q0 .213-.143.356q-.143.144-.357.144t-.357-.144T15 9.116V8H9v1.116q0 .213-.143.356q-.143.144-.357.144t-.357-.144T8 9.116V8H4.616q-.231 0-.424.192T4 8.616zM9 7h6V5.384q0-.23-.192-.423t-.423-.192h-4.77q-.23 0-.423.192T9 5.384zM4 18.385V8v1.616V8v1.616V8h.616q-.231 0-.424.192T4 8.616zq0 .23.192.423t.423.192H4z"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Hand baggage: 1 piece, 7 kg</h3>
                        </li> 
                        <li className="flex items-start space-x-1.5 ">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.482 18h9.49c1.12 0 2.028-.892 2.028-1.993c0-1.507-2.028-1.993-2.028-1.993S14.284 12.596 10 14c0 0-.139-5.127-2.29-10.83c-.425-1.124-1.809-1.508-2.825-.843a1.94 1.94 0 0 0-.846 2.01l2.454 12.06A2.02 2.02 0 0 0 8.482 18m4.018-7.5H18M16 18l-3 4m0 0H8m5 0h5"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Seat selection for a fee</h3>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="snap-center min-w-[85%] lg:min-w-0 border border-gray-200 rounded-3xl p-4 h-170">
                <div>
                    <h1 className="lg:text-[25px] text-[23px] font-light text-gray-600">Economy Convenienc</h1>
                    <div className="lg:mt-5 mt-2">
                        <h2 className="flex justify-end text-3xl lg:font-[350] font-light py-2">{format(conveniencPrice)}</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <h4 
                        onClick={() => onSelect("Economy Convenienc" , conveniencPrice)}
                        className="flex justify-center lg:py-4 py-3 lg:my-5 my-4 w-full  border border-red-900 rounded-4xl lg:text-xl text-[16px] font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">
                            Select fare
                    </h4>                </div>
                <div className="text-zinc-800 font-light">
                    <h3 className="font-medium lg:text-[15px] text-[14px] text-zinc-600">Benefits and fees per adult passenger</h3>
                    <ul className="lg:space-y-6 space-y-4 mt-4">
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24"><path fill="currentColor" d="M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V3.308q0-.233.153-.386t.385-.153t.386.153t.153.386V5h7.154V3.27q0-.214.143-.358t.357-.143t.356.143t.144.357V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192M5 9.615h14v-3q0-.23-.192-.423T18.384 6H5.616q-.231 0-.424.192T5 6.616zm0 0V6z"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Flexibility to make 1 change</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M3 10h-.5a.5.5 0 0 0 .5.5zm0 4v-.5a.5.5 0 0 0-.5.5zm18-4v.5a.5.5 0 0 0 .5-.5zm0 4h.5a.5.5 0 0 0-.5-.5zM5 5.5h5v-1H5zm5 0h9v-1h-9zm9 13h-9v1h9zm-9 0H5v1h5zM9.5 5v14h1V5zm-5.44 5.94a1.5 1.5 0 0 1 0 2.12l.708.708a2.5 2.5 0 0 0 0-3.536zm15.88 2.12a1.5 1.5 0 0 1 0-2.12l-.708-.708a2.5 2.5 0 0 0 0 3.536zM3 10.5c.385 0 .768.146 1.06.44l.708-.708A2.5 2.5 0 0 0 3 9.5zm.5-.5V7h-1v3zm0 7v-3h-1v3zm.56-3.94c-.292.294-.675.44-1.06.44v1c.639 0 1.28-.244 1.768-.732zm15.88-2.12c.292-.294.675-.44 1.06-.44v-1c-.639 0-1.28.244-1.768.732zM20.5 7v3h1V7zm0 7v3h1v-3zm.5-.5c-.385 0-.768-.146-1.06-.44l-.708.708A2.5 2.5 0 0 0 21 14.5zm-16 5A1.5 1.5 0 0 1 3.5 17h-1A2.5 2.5 0 0 0 5 19.5zm14 1a2.5 2.5 0 0 0 2.5-2.5h-1a1.5 1.5 0 0 1-1.5 1.5zm0-14A1.5 1.5 0 0 1 20.5 7h1A2.5 2.5 0 0 0 19 4.5zm-14-1A2.5 2.5 0 0 0 2.5 7h1A1.5 1.5 0 0 1 5 5.5z"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Cancellation within 24hrs of booking without fees</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5h16a2 2 0 0 0 2-2v-11m-7 3H9m5 0c0-3.821-5-3.815-5 0m5 0h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h3m-4 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0m9 0a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Checked baggage: 30 kg</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24"><path fill="currentColor" d="M4 16.577v1.808q0 .23.192.423t.423.192h14.77q.23 0 .423-.192t.192-.423v-1.808zM8 7V5.384q0-.69.463-1.152t1.153-.463h4.769q.69 0 1.153.463T16 5.384V7h3.385q.69 0 1.152.463T21 8.616v9.769q0 .69-.463 1.153T19.385 20H4.615q-.69 0-1.152-.462T3 18.384V8.616q0-.691.463-1.153T4.615 7zm-4 7.423h16V8.615q0-.23-.192-.423T19.385 8H16v1.116q0 .213-.143.356q-.143.144-.357.144t-.357-.144T15 9.116V8H9v1.116q0 .213-.143.356q-.143.144-.357.144t-.357-.144T8 9.116V8H4.616q-.231 0-.424.192T4 8.616zM9 7h6V5.384q0-.23-.192-.423t-.423-.192h-4.77q-.23 0-.423.192T9 5.384zM4 18.385V8v1.616V8v1.616V8h.616q-.231 0-.424.192T4 8.616zq0 .23.192.423t.423.192H4z"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Hand baggage: 1 piece, 7 kg</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.482 18h9.49c1.12 0 2.028-.892 2.028-1.993c0-1.507-2.028-1.993-2.028-1.993S14.284 12.596 10 14c0 0-.139-5.127-2.29-10.83c-.425-1.124-1.809-1.508-2.825-.843a1.94 1.94 0 0 0-.846 2.01l2.454 12.06A2.02 2.02 0 0 0 8.482 18m4.018-7.5H18M16 18l-3 4m0 0H8m5 0h5"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Standard Seat selection included</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M22 23.5c-1 0-1.75-1.5-1.75-1.5c-.75-1.5-.75-2.5-.75-4v-1.5h-9L8.621 8.985a2 2 0 0 1 1.94-2.485h.939l4 8m1 5.5h-5a4.64 4.64 0 0 1-4.504-3.517L3 .5m6.195 4s-1.81-.557-2.135-1.776A1.77 1.77 0 0 1 8.302.561a1.75 1.75 0 0 1 2.146 1.25c.324 1.219-.962 2.61-.962 2.61z" strokeWidth={1}></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Preferred Seat selection for a fee</h3>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="snap-center min-w-[85%] lg:min-w-0 border border-gray-200 rounded-3xl p-4 h-170">
                <div>
                    <h1 className="lg:text-[25px] text-[23px] font-light text-gray-600">Economy Comfort</h1>
                    <div className="lg:mt-5 mt-2">
                        <h2 className="flex justify-end text-3xl lg:font-[350] font-light py-2">{format(comfortPrice)}</h2>
                        <h3 className="flex justify-end text-gray-600">Total for All Passengers</h3>
                    </div>
                    <h4 
                        onClick={() => onSelect("Economy Comfort" , comfortPrice)}
                        className="flex justify-center lg:py-4 py-3 lg:my-5 my-4 w-full  border border-red-900 rounded-4xl lg:text-xl text-[16px] font-medium text-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">
                            Select fare
                    </h4>               
                </div>
                <div className="text-zinc-800 font-light">
                    <h3 className="font-medium lg:text-[15px] text-[14px] text-zinc-600">Benefits and fees per adult passenger</h3>
                    <ul className="lg:space-y-6 space-y-4 mt-4">
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24"><path fill="currentColor" d="M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V3.308q0-.233.153-.386t.385-.153t.386.153t.153.386V5h7.154V3.27q0-.214.143-.358t.357-.143t.356.143t.144.357V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192M5 9.615h14v-3q0-.23-.192-.423T18.384 6H5.616q-.231 0-.424.192T5 6.616zm0 0V6z"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Make unlimited changes</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M3 10h-.5a.5.5 0 0 0 .5.5zm0 4v-.5a.5.5 0 0 0-.5.5zm18-4v.5a.5.5 0 0 0 .5-.5zm0 4h.5a.5.5 0 0 0-.5-.5zM5 5.5h5v-1H5zm5 0h9v-1h-9zm9 13h-9v1h9zm-9 0H5v1h5zM9.5 5v14h1V5zm-5.44 5.94a1.5 1.5 0 0 1 0 2.12l.708.708a2.5 2.5 0 0 0 0-3.536zm15.88 2.12a1.5 1.5 0 0 1 0-2.12l-.708-.708a2.5 2.5 0 0 0 0 3.536zM3 10.5c.385 0 .768.146 1.06.44l.708-.708A2.5 2.5 0 0 0 3 9.5zm.5-.5V7h-1v3zm0 7v-3h-1v3zm.56-3.94c-.292.294-.675.44-1.06.44v1c.639 0 1.28-.244 1.768-.732zm15.88-2.12c.292-.294.675-.44 1.06-.44v-1c-.639 0-1.28.244-1.768.732zM20.5 7v3h1V7zm0 7v3h1v-3zm.5-.5c-.385 0-.768-.146-1.06-.44l-.708.708A2.5 2.5 0 0 0 21 14.5zm-16 5A1.5 1.5 0 0 1 3.5 17h-1A2.5 2.5 0 0 0 5 19.5zm14 1a2.5 2.5 0 0 0 2.5-2.5h-1a1.5 1.5 0 0 1-1.5 1.5zm0-14A1.5 1.5 0 0 1 20.5 7h1A2.5 2.5 0 0 0 19 4.5zm-14-1A2.5 2.5 0 0 0 2.5 7h1A1.5 1.5 0 0 1 5 5.5z"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Cancel at anytime without fees</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5h16a2 2 0 0 0 2-2v-11m-7 3H9m5 0c0-3.821-5-3.815-5 0m5 0h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h3m-4 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0m9 0a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Checked baggage: 30 kg</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24"><path fill="currentColor" d="M4 16.577v1.808q0 .23.192.423t.423.192h14.77q.23 0 .423-.192t.192-.423v-1.808zM8 7V5.384q0-.69.463-1.152t1.153-.463h4.769q.69 0 1.153.463T16 5.384V7h3.385q.69 0 1.152.463T21 8.616v9.769q0 .69-.463 1.153T19.385 20H4.615q-.69 0-1.152-.462T3 18.384V8.616q0-.691.463-1.153T4.615 7zm-4 7.423h16V8.615q0-.23-.192-.423T19.385 8H16v1.116q0 .213-.143.356q-.143.144-.357.144t-.357-.144T15 9.116V8H9v1.116q0 .213-.143.356q-.143.144-.357.144t-.357-.144T8 9.116V8H4.616q-.231 0-.424.192T4 8.616zM9 7h6V5.384q0-.23-.192-.423t-.423-.192h-4.77q-.23 0-.423.192T9 5.384zM4 18.385V8v1.616V8v1.616V8h.616q-.231 0-.424.192T4 8.616zq0 .23.192.423t.423.192H4z"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Hand baggage: 1 piece, 7 kg</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.482 18h9.49c1.12 0 2.028-.892 2.028-1.993c0-1.507-2.028-1.993-2.028-1.993S14.284 12.596 10 14c0 0-.139-5.127-2.29-10.83c-.425-1.124-1.809-1.508-2.825-.843a1.94 1.94 0 0 0-.846 2.01l2.454 12.06A2.02 2.02 0 0 0 8.482 18m4.018-7.5H18M16 18l-3 4m0 0H8m5 0h5"></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Standard Seat selection included</h3>
                        </li>
                        <li className="flex items-start space-x-1.5">
                            <svg className="w-6 h-6 mt-1 shrink-0" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M22 23.5c-1 0-1.75-1.5-1.75-1.5c-.75-1.5-.75-2.5-.75-4v-1.5h-9L8.621 8.985a2 2 0 0 1 1.94-2.485h.939l4 8m1 5.5h-5a4.64 4.64 0 0 1-4.504-3.517L3 .5m6.195 4s-1.81-.557-2.135-1.776A1.77 1.77 0 0 1 8.302.561a1.75 1.75 0 0 1 2.146 1.25c.324 1.219-.962 2.61-.962 2.61z" strokeWidth={1}></path></svg>
                            <h3 className="lg:text-[16px] text-[14px]">Preferred Seat selection included </h3>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="snap-center min-w-[85%] lg:min-w-0 rounded-3xl h-170">
                <div className="relative h-full ">
                    <Image
                        src="/generic-oal-01-508w.jpg"
                        alt=""
                        fill
                        priority
                        className="object-cover  rounded-3xl"
                    />
                    <div className="flex flex-col h-full p-4 z-10 relative text-white">
                        <h1 className="lg:text-[25px] text-[23px] font-light">Business Comfort</h1>
                        <div className="mt-5">
                            <h2 className="flex justify-end text-3xl lg:font-[350] font-light py-2">{format(comfortBusinesPrice)}</h2>
                        </div>
                        <h4
                            onClick={()=> onSelect("Business Comfort" , comfortBusinesPrice)}
                                className="flex justify-center lg:py-4 py-3  my-4 mt-auto w-full  border border-red-900 rounded-4xl lg:text-xl text-[16px] font-medium text-white bg-red-900 cursor-pointer hover:text-white hover:bg-red-900 duration-300">
                                Select fare
                        </h4>
                    </div>
                </div>
            </div>

            
        </div>
    )
}
