"use client"

import { DayPicker } from "react-day-picker"
import { DateRange } from "react-day-picker"
import "react-day-picker/style.css"
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

type HandleDateProps = {
  selected: DateRange | undefined
  onSelectDate: (range: DateRange | undefined) => void
  setIsOpen: (open: boolean) => void
  mode: "single" | "range"
  className?: string
  isOpen?: boolean
}

export default function HandleDate({
  selected,
  onSelectDate,
  setIsOpen,
  mode,
  className,
  isOpen
}: HandleDateProps) {

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true) }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleContinue = () => {
    if (selected?.from) {
      setIsOpen(false)
    }
  }

  const commonProps = {
    disabled: { before: new Date() },
    startMonth: new Date(),
    classNames: {
      weekdays: "text-black border-b border-b-zinc-200 ",
      month_caption: "text-red-900 text-[18px] py-5 flex justify-center items-center lg:font-medium",
      day: "text-black lg:font-[600] hover:bg-red-900 hover:text-white",
      today: "text-red-900",
      selected: "bg-red-900 text-red-950",
      range_start: "rounded-l-md text-white",
      range_middle: "text-black bg-zinc-200",
      range_end: "rounded-r-md text-white",
      button_next : `${isMobile ? "hidden" : "relative"}`,
      button_previous : `${isMobile ? "hidden" : "relative"}`,
      nav_button: `${isMobile ? "hidden" : "relative"}`,
      months: isMobile ? "flex flex-col items-center" : "flex flex-row gap-4",
    },
  }

  const calendarContent = (
    <>
      <div className="pb-10 border-b border-b-zinc-200 overflow-y-auto">
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
            numberOfMonths={isMobile ? 20 : 2}
            required={false}
          />
        )}
      </div>

      <div className="flex justify-end items-center mt-5 px-4 pb-4 shrink-0">
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
    </>
  )

  //  MOBILE 
  if (mounted && isMobile) {
    return createPortal(
      <>
        <div
          className={`fixed inset-0 z-9999 bg-black/40 transition-opacity duration-300
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        />

        <div
          className={`fixed bottom-0 left-0 w-full h-[80vh] z-9999 bg-white rounded-t-2xl flex flex-col
            transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-y-0" : "translate-y-full"}`}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="relative flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-200 shrink-0">
              
              <h3 className="absolute left-1/2 -translate-x-1/2 text-gray-600 text-[15px]">
                  {mode === "single" ? "Departure" : "Return"}
              </h3>

              <button
                  onMouseDown={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                  }}
                  className="ml-auto text-gray-500 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-lg font-bold"
              >
                  ✕
              </button>

          </div>

          {calendarContent}
        </div>
      </>,
      document.body
    )
  }

  // DESKTOP
  return (
    <div className={`bg-white border-2 border-zinc-300 rounded-md absolute right-0 mt-1 z-50
        ${isOpen ? "block" : "hidden"} 
        ${className}`}
    >
      {calendarContent}
    </div>
  )
}