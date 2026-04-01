"use client"

import { useState, useEffect, useRef } from "react"

type Props = {
  month: string
  onSelectMonth: (month: string) => void
}

const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
]

export default function BirthdayMonth({
  month,
  onSelectMonth,
}: Props) {

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
        className="w-full flex justify-between items-center cursor-pointer"
      >
        <span>
          {MONTHS.find(m => m.value === month)?.label || "Month"}
        </span>
        <h6 className={` ${open ? "rotate-180" : ""} transition-all duration-300 ease-in-out`} >
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.9 340.9L512 652.7L192.1 340.9a30.6 30.6 0 0 0-42.7 0a29 29 0 0 0 0 41.6l340.3 331.7a32 32 0 0 0 44.6 0l340.3-331.7a29 29 0 0 0 0-41.7a30.6 30.6 0 0 0-42.7 0z"></path></svg>
        </h6>      </button>

      {open && (
        <ul className="absolute z-20 w-full bg-white border border-zinc-300 mt-2 max-h-48 overflow-y-auto">
          {MONTHS.map(m => {
            const isSelected = month === m.label

            return (
              <li
                key={m.value}
                onClick={() => {
                  onSelectMonth(m.value)
                  setOpen(false)
                }}
                className={`
                  p-3 cursor-pointer
                  ${isSelected 
                    ? "bg-zinc-100 font-medium"
                    : "hover:bg-gray-100"
                  }
                `}
              >
                {m.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
