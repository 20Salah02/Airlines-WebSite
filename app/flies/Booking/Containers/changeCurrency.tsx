"use client"

import { useCurrency } from "@/app/contexts/currencyContext"

type currenciesAp = {
    open : boolean
    setOpen : (value: boolean) => void
}

const currencies = [
  { code: "USD", label: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", label: "Euro", flag: "🇪🇺" },
  { code: "MAD", label: "Moroccan Dirham", flag: "🇲🇦" },
  { code: "AED", label: "UAE Dirham", flag: "🇦🇪" },
  { code: "GBP", label: "British Pound", flag: "🇬🇧" },
  { code: "JPY", label: "Japanese Yen", flag: "🇯🇵" },
  { code: "CAD", label: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", label: "Australian Dollar", flag: "🇦🇺" },
  { code: "CHF", label: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", label: "Chinese Yuan", flag: "🇨🇳" },
  { code: "SAR", label: "Saudi Riyal", flag: "🇸🇦" },
  { code: "INR", label: "Indian Rupee", flag: "🇮🇳" },
] as const

export default function ChangeCurrency({setOpen , open} : currenciesAp) {
    const { currency, setCurrency } = useCurrency()

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden lg:rounded-t-none rounded-t-full">
            <button 
                onClick={() => setOpen(false)}
                className=" absolute right-4 top-5 p-2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg>
            </button>
            
            <div className="p-6">
                <h1 className="text-center lg:text-xl text-[17px]">Change currency</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-2 lg:p-9 space-y-2">
                {currencies.map((c) => (
                    <div
                        key={c.code}
                        onClick={() => {
                            setCurrency(c.code)
                            setOpen(false)
                        }}
                        className={`flex items-center justify-between py-4 px-4 rounded-xl cursor-pointer transition ${
                            currency === c.code ? "bg-red-50 text-red-900" : "hover:bg-gray-50"
                        }`}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-2xl">{c.flag}</span>
                            <h3 className="">{c.code} - {c.label}</h3>
                        </div>
                        {currency === c.code && (
                            <div className="w-2 h-2 bg-red-900 rounded-full"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}