"use client"
import { useState, useLayoutEffect, useCallback } from "react"
import { createPortal } from "react-dom"

type HandlePassengersProps = {
  setPassengersText: (range: string) => void
  isOpen: (range: boolean) => void
  open: boolean 
}

export default function HandlePassengers({ setPassengersText, isOpen,open }: HandlePassengersProps) {
  const [adultPass, setAdultPass]         = useState<number>(1)
  const [childPass, setChildPass]         = useState<number>(0)
  const [infantPass, setInfantPass]       = useState<number>(0)
  const [classOptions]                    = useState({ eco: "Economy", premium: "Premium" })
  const [selectedClass, setSelectedClass] = useState<string>("Economy")

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  )

  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  function handleAddClick()       { setAdultPass(p  => p < 10 ? p + 1 : 1) }
  function handleMinClick()       { setAdultPass(p  => p > 1  ? p - 1 : 1) }
  function handleAddClickChild()  { setChildPass(p  => p < 4  ? p + 1 : 0) }
  function handleMinClickChild()  { setChildPass(p  => p > 0  ? p - 1 : 0) }
  function handleAddClickInfant() { setInfantPass(p => p < 2  ? p + 1 : 0) }
  function handleMinClickInfant() { setInfantPass(p => p > 0  ? p - 1 : 0) }

  const handleConfirm = () => {
    setPassengersText(`${adultPass + childPass + infantPass} Passengers ${selectedClass}`)
    isOpen(false)
  }

  const handleClose = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isOpen(false)
  }, [isOpen])

  const content = (
    <div className="mx-4">
      <div className="flex justify-start lg:text-[16px] text-[15px] font-semibold py-5 border-b-2 border-zinc-300 text-red-900">
        <h2>Passengers</h2>
      </div>
      <div>
        {[
          { label: "Adults",  sub: "12+ years",     val: adultPass,  add: handleAddClick,       min: handleMinClick,       disMin: adultPass === 1,  disAdd: adultPass === 10 },
          { label: "Child",   sub: "2-11 years",    val: childPass,  add: handleAddClickChild,  min: handleMinClickChild,  disMin: childPass === 0,  disAdd: childPass === 4  },
          { label: "Infant",  sub: "Under 2 years", val: infantPass, add: handleAddClickInfant, min: handleMinClickInfant, disMin: infantPass === 0, disAdd: infantPass === 2  },
        ].map(({ label, sub, val, add, min, disMin, disAdd }) => (
          <div key={label} className="flex justify-between pt-5">
            <div>
              <h3 className="lg:text-lg text-[15px]">{label}</h3>
              <h6 className="lg:text-sm text-[13px] text-gray-500">{sub}</h6>
            </div>
            <div className="flex items-center justify-around w-1/3">
              <button type="button" onClick={min} disabled={disMin}
                className="lg:border-2 border border-gray-400 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer active:border-red-900">-</button>
              <p className="text-gray-800">{val}</p>
              <button type="button" onClick={add} disabled={disAdd}
                className="lg:border-2 border border-gray-400 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer active:border-red-900">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-start lg:text-[16px] text-[15px] font-semibold py-5 border-b-2 border-zinc-300 text-red-900 mt-4">
        <h2>Class</h2>
      </div>
      <div className="text-lg flex-col my-7">
        <div className="flex justify-between mb-4">
          <label htmlFor="eco" className="lg:text-lg text-[15px]">{classOptions.eco}</label>
          <input id="eco" className="accent-red-900" type="radio" name="class"
            value={classOptions.eco} checked={classOptions.eco === selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)} />
        </div>
        <div className="flex justify-between">
          <label htmlFor="bus" className="lg:text-lg text-[15px]">{classOptions.premium}</label>
          <input id="bus" className="accent-red-900" type="radio" name="class"
            value={classOptions.premium} checked={classOptions.premium === selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)} />
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={handleConfirm} type="button"
          className="lg:w-full w-40 bg-red-900 text-gray-50 rounded-4xl lg:py-4 py-2 mb-5 font-semibold lg:text-[18px] text-[14px] flex justify-center items-center cursor-pointer">
          Confirm
        </button>
      </div>
    </div>
  )

  if (isMobile) {
    return createPortal(
      <div id="passengers-portal">
        <div
          className={`fixed inset-0 z-9999 bg-black/40 transition-opacity duration-200
            ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onPointerDown={handleClose}
        />
        <div
          className={`fixed bottom-0 left-0 w-full h-[80vh] z-9999 bg-white rounded-t-2xl 
            flex flex-col overflow-y-auto transition-transform duration-200
            ${open ? "translate-y-0" : "translate-y-full"}`}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="relative flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-200 shrink-0">
            <h3 className="absolute left-1/2 -translate-x-1/2 text-gray-600 text-[15px]">
              Passengers &amp; Class
            </h3>
            <button
              onPointerDown={handleClose}
              className="ml-auto text-gray-500 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-lg font-bold"
            >
              ✕
            </button>
          </div>
          {content}
        </div>
      </div>,
      document.body
    )
  }

  return (
    <div className={`absolute text-black border-2 border-gray-300 rounded-md bg-white w-full mt-2 left-0 z-50 ${open ? "block" : "hidden"}` }>
      {content}
    </div>
  )
}