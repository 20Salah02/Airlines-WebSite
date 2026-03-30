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
        <h6 className={` ${open ? "rotate-180" : ""} transition-all duration-300 ease-in-out`} >
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.9 340.9L512 652.7L192.1 340.9a30.6 30.6 0 0 0-42.7 0a29 29 0 0 0 0 41.6l340.3 331.7a32 32 0 0 0 44.6 0l340.3-331.7a29 29 0 0 0 0-41.7a30.6 30.6 0 0 0-42.7 0z"></path></svg>
        </h6>
      </button>

      {open && (
      <ul className="absolute z-20 w-full  bg-white border border-zinc-300 mt-2 max-h-48 overflow-y-auto">
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
