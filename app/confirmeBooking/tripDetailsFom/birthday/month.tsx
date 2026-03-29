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
        <span>⌄</span> 
      </button>

      {open && (
        <ul className="absolute z-20 w-full bg-white border border-zinc-300 mt-2 max-h-48 overflow-y-auto">
          {MONTHS.map(m => {
            const isSelected = month === m.value

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
