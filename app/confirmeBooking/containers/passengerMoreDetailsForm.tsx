"use client"

//
import { useState, useEffect } from "react"
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
//
import { usePassenger } from "@/app/contexts/passengerContext"
//
import { useRouter } from "next/navigation";

//

type Country = {
  name: string
  dial: string
  flag: string
}

const getFlagEmoji = (countryCode: string) =>
  countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)))

export default function PassengerMoreDetails() {
  const { passenger , setPassenger } = usePassenger()

  const [email, setEmail] = useState(passenger.email || "")
  const [phone, setPhone] = useState(passenger.phone || "")
  const [countries, setCountries] = useState<Country[]>([])
  const [errors, setErrors] = useState<{ email?: boolean; phone?: boolean }>({})

  useEffect(() => {
  fetch(
    "https://api.restcountries.com/countries/v5?limit=100&response_fields=names.common,calling_codes,codes.alpha_2,flag.emoji",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_COUNTRIES_API_KEY}`,
      },
    }
  )
    .then(res => res.json())
    .then(response => {
      const formatted: Country[] = response.data.objects
        .filter((c: any) => c.calling_codes?.length)
        .map((c: any) => ({
          name: c.names.common,
          dial: `+${c.calling_codes[0]}`,
          flag: c.flag.emoji || getFlagEmoji(c.codes.alpha_2),
        }))
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

      setCountries(formatted);
    })
    .catch(console.error);
  }, []);
  
  const defaultCountryCode =
    countries.find(c => c.name === passenger?.nationality)?.dial || "+212"
  const [countryCode, setCountryCode] = useState(defaultCountryCode)

  const validate = () => {
    const newErrors: { email?: boolean; phone?: boolean } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) newErrors.email = true
    if (!/^[0-9]{6,15}$/.test(phone)) newErrors.phone = true

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  //

  const router = useRouter()

  const handleContinue = () => {
    if (!validate()) return

    setPassenger(prev => ({
      ...prev,
      email,
      phone: countryCode + phone,
    }))

    router.push("confirmeBooking/tripReview")
  }

  return (
    <div className="space-y-7 my-6">
      <div className="text-gray-600 space-y-2">
        <h3 className="text-3xl font-light">Just a few More Details</h3>
        <h4>Tell us where we should send your booking confirmation to.</h4>
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-6">
        <div className="relative flex flex-col space-y-2">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`bg-zinc-100 p-3 pl-10 rounded-md border w-full transition ${
              errors.email ? "border-red-600" : "border-zinc-400"
            }`}
          />
          <FontAwesomeIcon
            icon={faEnvelope}
            className="absolute left-3 top-12.5 text-gray-500"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">
              Please enter a valid email address
            </p>
          )}
        </div>

        <div className="flex lg:flex-row flex-col lg:space-x-5 space-y-6">
          <div className="flex flex-col lg:w-1/3 w-full space-y-2">
            <label>Country/Region code</label>
            <select
              value={countryCode}
              onChange={e => setCountryCode(e.target.value)}
              className="bg-zinc-100 p-3 rounded-md border border-zinc-400 w-full cursor-pointer"
            >
              {countries.map(c => (
                <option key={c.dial + c.name} value={c.dial}>
                  {c.flag} {c.name} ({c.dial})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col lg:w-2/3 w-full space-y-2">
            <label>Mobile Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => {
                const onlyNumbers = e.target.value.replace(/\D/g, "")
                setPhone(onlyNumbers)
              }}
              className={`bg-zinc-100 p-3 rounded-md border w-full transition ${
                errors.phone ? "border-red-600" : "border-zinc-400"
              }`}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">
                Enter a valid phone number (6–15 digits)
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={handleContinue}
          className="bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4 font-bold text-md text-amber-50 cursor-pointer hover:bg-red-800 transition"
        >
          Continue
        </button>
      </div>
    </div>
  )
}