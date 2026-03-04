"use client"


export default function VoyageSuggetions(){

    return(
        <div className="relative mt-67 px-15">
            <div>
                <h2 className="text-4xl font-light text-gray-600">Find great fears</h2>
            </div>
            <div className="flex justify-between mt-7 items-start">
                <div className="flex">
                    <label htmlFor="">From</label>
                    <input type="text" />
                    <h4>i</h4>
                </div>
                <div className="flex">
                    <button>Return</button>
                    <button>One way</button>
                    <div>
                        <h4>class</h4>
                        <h3>Economy</h3>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}