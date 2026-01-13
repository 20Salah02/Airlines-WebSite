"use client"

import { useState } from "react"


type setPassengersText = {
  setPassengersText: (range: string) => void
  isOpen : (range : boolean) => void
}

export default function HandlePassengers({setPassengersText , isOpen} : setPassengersText){
    const [adultPass , setAdultPass] = useState<number>(1)
    const [childPass , setChildPass] = useState<number>(0)
    const [infantPass , setInfantPass] = useState<number>(0)
    const [classOptions] = useState({
        eco : "Economy",
        premium : "Premium"
    })
    const [selectedClass , setSelectedClass] = useState<string>("Economy")

    // Adult
    function handleAddClick(){
        setAdultPass(prev => (prev < 10 ? prev + 1 : 1))
    }
    function handleMinClick(){
        setAdultPass(prev => (prev > 1 ? prev - 1 : 1))
    }

    //Child
    function handleAddClickChild(){
        setChildPass(prev => (prev < 4 ? prev +1 : 0))
    }
    function handleMinClickChild(){
        setChildPass(prev => (prev > 0 ? prev -1 : 0))
    }

    //Infant
    function handleAddClickInfant(){
        setInfantPass(prev => (prev < 2 ? prev +1 : 0))
    }
    function handleMinClickInfant(){
        setInfantPass(prev => (prev > 0 ? prev -1 : 0 ))
    }

    
    const handleconfirm =(() => {

        setPassengersText(`${adultPass + childPass + infantPass} Passengers ${selectedClass}`)
        isOpen(false)
    })

    return(
        <div className="text-black border-2 rounded-md">
            <div className="mx-4 ">
                <div className="flex justify-start text-[17px] font-bold py-5 border-b-2 border-zinc-300 ">
                    <h2>Passengers</h2>
                </div>
                <div>
                    <div className="flex justify-between pt-5 ">
                        <div>
                            <h3 className="text-lg font-medium">Adults</h3>
                            <h6 className="text-sm text-gray-500">12+ years</h6>
                        </div>
                        <div className="flex items-center justify-around w-1/3">
                            <button type="button" className="border-2 border-gray-500 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleMinClick} disabled={adultPass === 1} >-</button>
                            <p>{adultPass}</p>
                            <button type="button" className="border-2 border-gray-500 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleAddClick} disabled={adultPass === 10}>+</button>
                        </div>
                    </div>
                    <div className="flex justify-between pt-5">
                        <div>
                            <h3 className="text-lg font-medium">Child</h3>
                            <h6 className="text-sm text-gray-500">2-11 years</h6>
                        </div>
                        <div className="flex items-center justify-around w-1/3">
                            <button className="border-2 border-gray-500 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleMinClickChild} disabled={childPass === 0} >-</button>
                            <p>{childPass}</p>
                            <button className="border-2 border-gray-500 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleAddClickChild} disabled={childPass === 4}>+</button>
                        </div>
                    </div>
                    <div className="flex justify-between pt-5">
                        <div>
                            <h3 className="text-lg font-medium">Infant</h3>
                            <h6 className="text-sm text-gray-500">Under 2 years</h6>
                        </div>
                        <div className="flex items-center justify-around w-1/3">
                            <button className="border-2 border-gray-500 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleMinClickInfant} disabled={infantPass === 0} >-</button>
                            <p>{infantPass}</p>
                            <button className="border-2 border-gray-500 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer" onClick={handleAddClickInfant} disabled={infantPass === 2}>+</button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-start text-[17px] font-bold py-5 border-b-2 border-zinc-300">
                        <h2>Class</h2>
                    </div>
                    <div  className="text-lg font-medium flex-col my-7">
                        <div className="flex justify-between mb-4">
                            <label>{classOptions.eco}</label>
                            <input type="radio" name="class" value={classOptions.eco} checked={classOptions.eco === selectedClass} onChange={(e) => {setSelectedClass(e.target.value)}}></input>
                        </div>
                        <div className="flex justify-between">
                            <label>{`${classOptions.premium} (Business/First)`}</label>
                            <input type="radio" name="class" value={classOptions.premium} checked={classOptions.premium === selectedClass} onChange={(e) => {setSelectedClass(e.target.value)}}></input>
                        </div>
                    </div>
                    <div>
                        <button   onClick={handleconfirm} className="w-full bg-blue-500 text-gray-50 rounded-4xl py-4 mb-5 font-bold text-[20px] flex justify-center items-center cursor-pointer" type="button">Confirm</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}