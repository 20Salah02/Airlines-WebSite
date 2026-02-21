"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

export type PassengerData = {
  title: string
  gender: "male" | "female" | ""
  firstName: string
  lastName: string
  birthday: {
    day: string
    month: string
    year: string
  }
  nationality: string
  email?: string
  phone?: string
}

type PassengerContextType = {
  passenger: PassengerData
  setPassenger: React.Dispatch<React.SetStateAction<PassengerData>>
}

const defaultPassenger: PassengerData = {
  title: "Mr",
  gender: "",
  firstName: "",
  lastName: "",
  birthday: { day: "", month: "", year: "" },
  nationality: "",
  email: "",
  phone: "",
}

const PassengerContext = createContext<PassengerContextType | undefined>(
  undefined
)

export function PassengerProvider({ children }: { children: ReactNode }) {
  const [passenger, setPassenger] = useState<PassengerData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("passenger")
      if (saved) {
        return {
          ...defaultPassenger,
          ...JSON.parse(saved),
        }
      }
    }
    return defaultPassenger
  })

  useEffect(() => {
    localStorage.setItem("passenger", JSON.stringify(passenger))
  }, [passenger])

  return (
    <PassengerContext.Provider value={{ passenger, setPassenger }}>
      {children}
    </PassengerContext.Provider>
  )
}

export function usePassenger() {
  const context = useContext(PassengerContext)
  if (!context) throw new Error("usePassenger must be inside PassengerProvider")
  return context
}
