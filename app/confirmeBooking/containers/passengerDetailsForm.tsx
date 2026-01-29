"use client"


export default function PassengerForm(){

    return(
        <div className="bg-white p-9 border-l border-l-gray-300 h-screen w-full">
            <form className="w-full" onClick={(e)=> e.preventDefault()}>
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
                        <div className="space-y2">
                            <h2 className="text-lg font-medium">Gender</h2>
                            <div className="flex">
                                <div>
                                    <label>Male</label>
                                    <input type="radio" />
                                </div>
                                <div>
                                    <label>Female</label>
                                    <input type="radio" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>First name/middle name on passport</h2>
                            <input type="text"/>
                        </div>
                        <div>
                            <h2>Last Name</h2>
                            <input type="text"/>
                        </div>
                        <div>
                            <h2>Date of birth</h2>
                            <div>
                                <div>
                                    <h4>11</h4>
                                    <h5>*</h5>
                                </div>
                                <div>
                                    <h4>Feb</h4>
                                    <h5>*</h5>
                                </div>
                                <div>
                                    <h4>2002</h4>
                                    <h5>*</h5>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Nationality</h2>
                            <div>
                                <h3>Morocco</h3>
                                <h4>*</h4>
                            </div>
                        </div>
                        <div></div>
                    </div>

                    <div>
                        <button>Save and Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}