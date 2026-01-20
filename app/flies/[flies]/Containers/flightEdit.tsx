


export default function FlightEdit(){

    return(
        <div className="bg-white w-1/2 p-9 border-l border-l-gray-300 h-screen space-y-10">
            <h1 className="flex justify-center text-xl">Modify Search</h1>
            <div className="space-y-6">
                <div className="flex space-x-5">
                    <div className="space-x-2">
                        <input type="radio" name="class" value="Return"/>
                        <label>Return</label>
                    </div>
                    <div className="space-x-2">
                        <input type="radio" name="class" value="One way"/>
                        <label>One way</label>
                    </div>
                </div>
                <div className="flex flex-col border rounded-md border-gray-300 " >
                    <div className="py-2 px-2">
                        <input className="py-2 w-full" type="text" placeholder="From"/>
                        <hr className="text-gray-300" />
                        <input className="py-2 w-full" type="text" placeholder="To"/>
                    </div>
                </div>
                <div className="flex w-full border rounded-md border-gray-300 p-2">
                    <div className="w-1/2 space-y-1.5">
                        <p className="text-gray-600 text-xs">Departure</p>
                        <p>23 Jan 2026</p>
                    </div>
                    <div className="w-1/2 space-y-1.5">
                        <p className="text-gray-600 text-xs">Return</p>
                        <p>30 Jan 2026</p>
                    </div>
                </div>
                <div className=" w-full border rounded-md border-gray-300 p-2">
                    <p className="text-gray-600 text-xs">Passenger / Class</p>
                    <div>
                        <p>1 Passenger Economy</p>
                    </div>
                </div>
                    <div className=" w-full space-y-4 items-center">
                        <p className="text-gray-600 mr-5">+Add promo code</p>

                        <button className="bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Search Flights</button>
                    </div>
            </div>
        </div>
    )
}