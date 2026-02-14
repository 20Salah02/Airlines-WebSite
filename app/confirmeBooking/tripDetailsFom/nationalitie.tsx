"use client"

import { useState, useRef, useEffect } from "react"
import { nationalities } from "@/app/data/nationalities"

type FormNatProps = {
  value: string
  onSelectNationality: (n: string) => void
}

export default function Nationality({ value, onSelectNationality }: FormNatProps) {
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
        <span>{nationalities.find(n => n.value === value)?.label || "Select Nationality"}</span>
        <span>⌄</span>
      </button>

      {open && (
        <ul className="absolute z-20 w-full bg-white border border-zinc-300 mt-2 max-h-48 overflow-y-auto">
          {nationalities.map(n => {
            const isSelected = value === n.value

            return (
              <li
                key={n.value}
                onClick={() => {
                  onSelectNationality(n.value)
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
