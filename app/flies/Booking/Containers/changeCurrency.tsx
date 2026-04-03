"use client"

import { useCurrency } from "@/app/contexts/currencyContext"

type currenciesAp = {
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

export default function ChangeCurrency({setOpen} : currenciesAp) {
    const { currency, setCurrency } = useCurrency()

    return (
        <div className="bg-white p-9 border-l border-l-gray-300 h-screen space-y-10 overflow-y-scroll">
            <h1 className="flex justify-center text-xl">Change currency</h1>

            <div>
                {currencies.map((c) => (
                <div
                    key={c.code}
                    onClick={() => {
                        setCurrency(c.code)
                        setOpen(false)
                    }}
                    className={`flex items-center justify-between py-5 border-b cursor-pointer transition  ${
                    currency === c.code ? "bg-gray-100" : ""
                    }`}
                >
                    <div className="flex items-center space-x-4">
                    <span className="text-xl">{c.flag}</span>
                    <h3>{c.code} - {c.label}</h3>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}