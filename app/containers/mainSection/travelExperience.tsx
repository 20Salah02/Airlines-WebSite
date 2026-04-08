"use client"

import Image from "next/image"
import { useState, useRef } from "react"

export default function TravelExp(){

    const [active, setActive] = useState(0)
    const containerRef = useRef(null)

    const cards = [
        {
            img: "/LuxuryCabine.avif",
            title: "Luxury Cabins",
            desc: "Ultimate privacy and comfort."
        },
        {
            img: "/GourmetDining.avif",
            title: "Gourmet Dining",
            desc: "Exquisite menus by top chefs."
        },
        {
            img: "/seatScreen.avif",
            title: "Infinite Entertainment",
            desc: "A world of movies and games."
        }
    ]

    return(
        <div className="mt-15">
            
            <div className="space-y-6">
                <h2 className="text-4xl font-light text-gray-600">
                    Elevate Your Journey
                </h2>
                <h3 className="text-gray-600">
                    Experience world-class service and unparalleled comfort on every flight.
                </h3>
            </div>

            <div
                ref={containerRef}
                onScroll={(e) => {
                    const target = e.currentTarget
                    const scrollLeft = target.scrollLeft
                    const width = target.clientWidth
                    const index = Math.round(scrollLeft / width)
                    setActive(index)
                }}
                className="mt-8 overflow-x-auto lg:overflow-visible"
            >
                <div className="flex lg:grid lg:grid-cols-3 gap-6 snap-x snap-mandatory">

                    {cards.map((card, i) => (
                        <div 
                            key={i}
                            className="min-w-[85%] lg:min-w-0 snap-center cursor-default"
                        >
                            <div className="relative py-5 mt-4 h-50">
                                <Image
                                    src={card.img}
                                    alt={card.title}
                                    fill
                                    className="object-cover rounded-t-2xl"
                                />
                            </div>

                            <div className="bg-white rounded-b-2xl px-4">
                                <h3 className="text-xl font-[350] border-b border-b-zinc-300 py-4">
                                    {card.title}
                                </h3>
                                <h4 className="text-zinc-600 py-4">
                                    {card.desc}
                                </h4>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="flex justify-center mt-4 gap-2 lg:hidden">
                {cards.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            active === i 
                                ? "bg-red-900 w-5" 
                                : "bg-gray-300 w-2"
                        }`}
                    />
                ))}
            </div>

        </div>
    )
}