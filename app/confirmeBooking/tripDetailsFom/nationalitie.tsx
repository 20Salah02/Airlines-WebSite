"use client"

import { useState, useRef, useEffect } from "react"
import { nationalities } from "@/app/data/nationalities"

type FormNatProps = {
  label: string
  onSelectNationality: (n: string) => void
}

export default function Nationality({ label, onSelectNationality }: FormNatProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative w-full">

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center cursor-pointer bg-white"
      >
        <span>{nationalities.find(n => n.label === label)?.label || "Select Nationality"}</span>
        <h6 className={` ${open ? "rotate-180" : ""} transition-all duration-300 ease-in-out`} >
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.9 340.9L512 652.7L192.1 340.9a30.6 30.6 0 0 0-42.7 0a29 29 0 0 0 0 41.6l340.3 331.7a32 32 0 0 0 44.6 0l340.3-331.7a29 29 0 0 0 0-41.7a30.6 30.6 0 0 0-42.7 0z"></path></svg>
        </h6>      
      </button>

      {open && (
        <ul className="absolute z-20 w-full bg-white border border-zinc-300 mt-2 max-h-48 overflow-y-auto">
          {nationalities.map(n => {
            const isSelected = label === n.label

            return (
              <li
                key={n.label}
                onClick={() => {
                  onSelectNationality(n.label)
                  setOpen(false)
                }}
                className={`p-3 cursor-pointer ${
                  isSelected ? "bg-zinc-100 font-medium" : "hover:bg-gray-100"
                }`}
              >
                {n.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
