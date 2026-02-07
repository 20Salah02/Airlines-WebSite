"use client"

import { DayPicker } from "react-day-picker"
import { DateRange } from "react-day-picker"
import "react-day-picker/style.css"

type HandleDateProps = {
  selected: DateRange | undefined
  onSelectDate: (range: DateRange | undefined) => void
  setIsOpen: (open: boolean) => void
  mode: "single" | "range"
}

export default function HandleDate({
  selected,
  onSelectDate,
  setIsOpen,
  mode,
}: HandleDateProps) {

  const handleContinue = () => {
    if (selected?.from) {
      setIsOpen(false)
    }
  }

  const commonProps = {
    disabled: { before: new Date() },
    startMonth: new Date(),
    classNames: {
      weekdays: "text-black border-b border-b-zinc-200",
      month_caption:
        "text-red-900 text-[18px] py-5 flex justify-center items-center font-medium",
      day: "text-black font-[600] hover:bg-blue-600 hover:text-white",
      today: "text-blue-600",
      selected: "bg-blue-600 text-white",
      range_start: "rounded-l-md text-white",
      range_middle: "text-black bg-zinc-200",
      range_end: "rounded-r-md text-white",
    },
  }

  return (
    <div className="bg-white flex justify-center flex-col w-fit border-2 border-zinc-300 rounded-md p-6">
      <div className="pb-10 border-b border-b-zinc-200">

        {mode === "single" ? (
          <DayPicker
            {...commonProps}
            mode="single"
            selected={selected?.from}
            onSelect={(date) =>
              onSelectDate(date ? { from: date, to: undefined } : undefined)
            }
            numberOfMonths={1}
          />
        ) : (
          <DayPicker
            {...commonProps}
            mode="range"
            selected={selected}
            onSelect={onSelectDate}
            numberOfMonths={2}
            required={false}
          />
        )}

      </div>

      <div className="flex justify-end items-center mt-5">
        <button
          onClick={() => onSelectDate(undefined)}
          className="text-red-900 font-medium border-2 rounded-4xl px-6 py-4 cursor-pointer mr-3"
        >
          Clear all
        </button>

        <button
          onClick={handleContinue}
          className="bg-red-900 text-white font-medium px-7 py-4 rounded-4xl cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
