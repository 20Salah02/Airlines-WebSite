


export default function FlightResults(){

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


            <div className="flex items-center justify-between bg-white rounded-4xl p-5 my-4">
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
                            <p>DOH</p>
                            <p>CMN</p>
                        </div>
                    </div>
                    <div className="cursor-pointer font-medium underline decoration-solid w-fit">Flight Details</div>
                </div>

                <div className="flex justify-between ">
                    <button className="flex flex-col border border-gray-300 rounded-2xl py-17 px-28 mr-4">
                        <p>Economie</p>
                        <h2>MAD 2000</h2>
                    </button>
                    <button className=" justify-start border border-gray-300 rounded-2xl py-17 px-28">
                        <p>Business</p>
                        <h2>MAD 4000</h2>
                    </button>
                </div>
            </div>
        </div>
    )
}