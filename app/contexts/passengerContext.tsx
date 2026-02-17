"use client"

import { useState , useContext , createContext } from "react"

type PassengerData = {
    title : string
    gender : string
    firstName : string
    lastName : string
    birthday : {
        day : string
        month : string
        year : string
    }
    nationality : string
}

type passengerContextType = {
    passenger : PassengerData
    setPassenger : (data : PassengerData) => void
}

const PassengerContext = createContext<passengerContextType | null>(null)


export default function PassengerProvider({children} : {children : React.ReactNode}){

    const [passenger , setPassengerState] = useState<PassengerData>(() => {
        if (typeof window !== "undefined"){
            const saved = localStorage.getItem("passenger")
            if (saved) {
                return (JSON.parse(saved))
            }
        }
        return {
        title: "Mr",
        gender: "",
        firstName: "",
        lastName: "",
        birthday: {
            day : "",
            month : "",
            year : ""
        },
        nationality: "",
        }
    })

    const setPassenger = (data : PassengerData) => {
        setPassengerState(data)
        localStorage.setItem("passenger" , JSON.stringify(data))
    }

    return(
        <PassengerContext.Provider value={{passenger , setPassenger}}>
            {children}
        </PassengerContext.Provider>
    )

}

export const usePassenger = () => {
  const ctx = useContext(PassengerContext)
  if (!ctx) throw new Error("usePassenger must be used inside PassengerProvider")
  return ctx
}