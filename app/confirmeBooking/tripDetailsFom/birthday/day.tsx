"use client"

import { useState, useEffect, useRef } from "react"

type Props = {
  day: string
  month: string
  year: string
  onSelectDay: (day: string) => void
}

export default function BirthdayDay({
  day,
  month,
  year,
  onSelectDay,
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

  const getDaysInMonth = () => {
    if (!month || !year) return []
    const totalDays = new Date(Number(year), Number(month), 0).getDate()
    return Array.from({ length: totalDays }, (_, i) => i + 1)
  }

  const days = getDaysInMonth()

  const isDisabled = !month || !year


  return (
    <div ref={ref} className="relative w-full">

      <button
        type="button"
        disabled={isDisabled}
        onClick={() => !isDisabled && setOpen(o => !o)}
        className={`w-full flex justify-between items-center ${
          isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span>{day || "Day"}</span>
        <span>⌄</span>
      </button>

      {open && (
        <ul className={`absolute z-20 w-full bg-white border border-zinc-300 mt-2 max-h-48 overflow-y-auto `}>
        {days.map(d => {
          const isSelected = day === d.toString()

          return (
            <li
              key={d}
              onClick={() => {
                onSelectDay(d.toString())
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
              {d}
            </li>
          )
        })}

        </ul>
      )}
    </div>
  )
}
