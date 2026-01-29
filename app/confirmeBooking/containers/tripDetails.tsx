"use client"

// 
export default function TripDetails(){


    return(
        <div className="flex flex-col bg-white w-2/5 p-6 rounded-3xl space-y-2.5">
            <div className="space-y-2">
                <h1 className="font-medium text-[19px] text-red-900">Trip details</h1>
                <p>Return Trip</p>
            </div>
            <div>
                <div className="flex justify-between items-center border-b border-b-gray-300 py-2.5 cursor-pointer">
                    <div className="space-y-1">
                        <h2 className="text-[18px] font-medium text-red-900">Doha to Jakarta</h2>
                        <h3 className="text-[15px] text-gray-700">Sat , 14 Feb 2026</h3>
                    </div>
                    <p>{">"}</p>
                </div>
                <div className="flex justify-between items-center border-b border-b-gray-300 py-2.5 cursor-pointer">
                    <div className="space-y-1">
                        <h2 className="text-[18px] font-medium text-red-900">Jakarta to Doha</h2>
                        <h3 className="text-[15px] text-gray-700">Sat , 21 Feb 2026</h3>
                    </div>
                    <p>{">"}</p>
                </div>
            </div>
            <div className="flex flex-col py-2">
                <div className="flex justify-between  space-y-1">
                    <h2 className="text-[18px] text-gray-700">Grand Total</h2>
                    <h3 className="font-medium text-[18px] text-red-900">MAD 2,000</h3>
                </div>
                <p className="underline decoration-solid font-medium cursor-pointer w-fit">Payement Summary</p>
            </div>
        </div>
    )
}