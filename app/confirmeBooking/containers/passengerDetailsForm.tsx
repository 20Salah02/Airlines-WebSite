"use client"


export default function PassengerForm(){

    return(
        <div className="bg-white p-9 border-l border-l-gray-300 h-screen w-full">
            <form className="w-full" onSubmit={(e)=> e.preventDefault()}>
                <div className="space-y-15">
                    <h1 className="flex justify-center text-xl">Adult Passenger</h1>
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Title</h2>
                            <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4">
                                <h3>Mr</h3>
                                <h4 className="cursor-pointer">*</h4>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Gender</h2>
                            <div className="flex  space-x-2.5">
                                <div className="flex items-center border border-gray-300 rounded-xl py-4 px-5 space-x-2.5">
                                    <label htmlFor="male">Male</label>
                                        <input className="accent-red-900"  type="radio" id="male" value="male" name="class"/>                    
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-xl py-4 px-5 space-x-2.5">
                                    <label htmlFor="female">Female</label>
                                    <input className="accent-red-900" type="radio" id="female" value="female" name="class"/>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">First name/middle name on passport</h2>
                            <input className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-full" type="text"/>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Last Name</h2>
                            <input className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-full" type="text"/>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Date of birth</h2>
                            <div className="flex w-full space-x-4">
                                <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-1/3 space-x-2.5">
                                    <h4>11</h4>
                                    <h5>*</h5>
                                </div>
                                <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-1/3 space-x-2.5">
                                    <h4>Feb</h4>
                                    <h5>*</h5>
                                </div>
                                <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-1/3 space-x-2.5">
                                    <h4>2002</h4>
                                    <h5>*</h5>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Nationality</h2>
                            <div className="flex justify-between items-center border border-gray-300 rounded-xl py-4 px-5 space-x-2.5">
                                <h3>Morocco</h3>
                                <h4>*</h4>
                            </div>
                        </div>
                        <div></div>
                    </div>

                    <div >
                        <button className="bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Save and Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}