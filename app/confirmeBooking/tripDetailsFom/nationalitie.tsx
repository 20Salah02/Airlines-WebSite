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
        <span>⌄</span>
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
