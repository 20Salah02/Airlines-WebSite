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

    const tripType = booking.tripType
    const from = booking.from
    const to = booking.to
    const firstDay = booking.dates?.departure
    const lastDay = booking.dates?.return
    const passengers = booking.passengers

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="relative w-[60%] bg-white border border-gray-300 rounded-xl overflow-visible">

                <div className="flex flex-col items-center py-3 px-6">
                    <h3 className="text-xs text-gray-400 uppercase tracking-widest font-normal">Booking Reference</h3>
                    <h4 className="text-2xl text-red-900 font-bold tracking-widest">SL123455</h4>
                </div>

                <div className="relative flex items-center my-3">
                    <div className="absolute -left-3.5 w-7 h-7 rounded-full bg-zinc-50 border-r border-gray-300 z-10" />
                    <div
                        className="mx-5 flex-1"
                        style={{ borderTop: "2px dashed #d1d5db" }}
                    />
                    <div className="absolute -right-3.5 w-7 h-7 rounded-full bg-zinc-50  border-l border-gray-300  z-10" />
                </div>

                <div className="flex justify-between items-start gap-6 px-6 py-4">
                    <div className="flex-1 space-y-4">
                        <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">From</p>
                            <p className="text-sm font-medium">{`${from?.city} (${from?.iata})`}</p>
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">To</p>
                            <p className="text-sm font-medium">{`${to?.city} (${to?.iata})`}</p>
                        </div>
                    </div>

                    <div className="w-px self-stretch bg-gray-200" />

                    <div className="flex-1 space-y-4">
                        <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">Departure Date</p>
                            <p className="text-sm font-medium">{formatDate(firstDay)}</p>
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">Return Date</p>
                            <p className="text-sm font-medium">{formatDate(lastDay)}</p>
                        </div>
                    </div>

                    <div className="w-px self-stretch bg-gray-200" />

                    <div className="flex-1 space-y-4">
                        <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">Flight</p>
                            <p className="text-sm font-medium">SL0123</p>
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-wider">Passengers</p>
                            <p className="text-sm font-medium">{passengers}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}