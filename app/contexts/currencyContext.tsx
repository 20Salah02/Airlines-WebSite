import { createContext , useContext , useState ,useEffect , ReactNode } from "react";


// types
type Currency = "USD" | "EUR" | "MAD" | "AED" | "GBP" | "JPY" | "CAD" | "AUD" | "CHF" | "CNY" | "SAR" | "INR"

type CurrencyContextType ={
    currency : Currency
    setCurrency : (c: Currency) => void
    rates : {[key : string] : number}
    convert : (price : number) => number
    format : (price : number) => string
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

export function CurrecyProvider({children} : {children : ReactNode}){

    const [currency, setCurrency] = useState<Currency>(() => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("currency") as Currency
        if (saved) return saved
    }
    return "USD"
    })    

    const [rates, setRates] = useState<{ [key: string]: number }>(() => {
        if (typeof window !== "undefined") {
            const cached = localStorage.getItem("rates")
            if (cached) return JSON.parse(cached)
        }
        return {}
    })

    useEffect(() => {
        if (Object.keys(rates).length > 0) return

        fetch("https://api.exchangerate-api.com/v4/latest/USD")
            .then(res => res.json())
            .then(data => {
            setRates(data.rates)
            localStorage.setItem("rates", JSON.stringify(data.rates))
            localStorage.setItem("rates_time", Date.now().toString())
            })
    }, [])

    //
    useEffect(() => {
        localStorage.setItem("currency" , currency)
    },[currency])

    //
    function convert(price: number){
        if (!rates[currency]) return price
        return price * rates[currency]
    }

    function format(price: number){
        const value = convert(price)

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
        }).format(value)
    }

    return(
        <CurrencyContext.Provider value={{currency ,setCurrency ,rates , convert ,format}}>
            {children}
        </CurrencyContext.Provider>
    )
}


export const useCurrency = () => {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider")
  return ctx
}