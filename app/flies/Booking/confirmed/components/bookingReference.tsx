"use client"

import { useBooking } from "@/app/contexts/bookingContext"

function formatDate(date?: Date | null) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

export default function Reference() {
    const { booking } = useBooking()

    const from = booking.from
    const to = booking.to
    const firstDay = booking.dates?.departure
    const lastDay = booking.dates?.return
    const passengers = booking.passengers

    return (
        <div className="flex flex-col items-center justify-center mt-10 px-4">
            <div className="relative w-full sm:w-[60%] bg-white border border-gray-300 rounded-xl overflow-visible">

                <div className="flex flex-col items-center py-3 px-6">
                    <h3 className=" font-medium">Booking Reference</h3>
                    <h4 className="text-2xl text-red-900 font-bold tracking-widest">SL123455</h4>
                </div>

                <div className="relative flex items-center my-3" style={{ height: "28px" }}>
                    <div className="absolute w-7 h-7 rounded-full bg-zinc-50 border-r border-gray-300 z-10" style={{ left: -14 }} />
                    <div className="absolute left-0 right-0 mx-3" style={{ borderTop: "2px dashed #d1d5db" }} />
                    <div className="absolute w-7 h-7 rounded-full bg-zinc-50 border-l border-gray-300 z-10" style={{ right: -14 }} />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 px-6 py-4">

                    <div className="flex sm:flex-col flex-row gap-6 sm:gap-4 flex-1 w-full">
                        <div className="flex-1">
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">From</p>
                            <p className="text-sm font-medium">{`${from?.city} (${from?.iata})`}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">To</p>
                            <p className="text-sm font-medium">{`${to?.city} (${to?.iata})`}</p>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px self-stretch bg-gray-200" />
                    <div className="block sm:hidden w-full h-px bg-gray-200" />

                    <div className="flex sm:flex-col flex-row gap-6 sm:gap-4 flex-1 w-full">
                        <div className="flex-1">
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">Departure Date</p>
                            <p className="text-sm font-medium">{formatDate(firstDay)}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">Return Date</p>
                            <p className="text-sm font-medium">{formatDate(lastDay)}</p>
                        </div>
                    </div>

                    <div className="hidden sm:block w-px self-stretch bg-gray-200" />
                    <div className="block sm:hidden w-full h-px bg-gray-200" />

                    <div className="flex sm:flex-col flex-row gap-6 sm:gap-4 flex-1 w-full">
                        <div className="flex-1">
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">Flight</p>
                            <p className="text-sm font-medium">SL0123</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">Passengers</p>
                            <p className="text-sm font-medium">{passengers}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}