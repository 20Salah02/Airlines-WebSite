"use client"

import { useState, useEffect, useRef } from "react"

type Props = {
  year: string
  onSelectYear: (year: string) => void
}

export default function BirthdayYear({
  year,
  onSelectYear,
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

  const currentYear = new Date().getFullYear()-18
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  return (
    <div ref={ref} className="relative w-full">

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center cursor-pointer"
      >
        <span>{year || "Year"}</span>
        <span>⌄</span>
      </button>

      {open && (
        <ul className="absolute z-20 w-full bg-white border border-zinc-300 mt-2 max-h-48 overflow-y-auto">
          {years.map(y => {
            const yStr = y.toString()
            const isSelected = year === yStr

            return (
              <li
                key={y}
                onClick={() => {
                  onSelectYear(yStr)
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
                {y}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
