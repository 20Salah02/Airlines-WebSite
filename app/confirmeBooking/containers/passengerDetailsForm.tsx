"use client"

//
import { useState } from "react"
//
import FormTitle from "../tripDetailsFom/title"
import BirthdayDay from "../tripDetailsFom/birthday/day"
import BirthdayMonth from "../tripDetailsFom/birthday/month"
import BirthdayYear from "../tripDetailsFom/birthday/year"
import Nationality from "../tripDetailsFom/nationalitie"
//
import { usePassenger } from "@/app/contexts/passengerContext"
//
type FormData = {
  title: string
  gender: "male" | "female" | ""
  firstName: string
  lastName: string
  birthday: {
    day : string ,
    month : string ,
    year : string ,
  }
  nationality: string
}

export default function PassengerForm(){

    const [formData, setFormData] = useState<FormData>({
        title: "Mr",
        gender: "",
        firstName: "",
        lastName: "",
        birthday: {
            day : "",
            month : "",
            year : ""
        },
        nationality: "",
    })
    const [openTitleForm, setOpenTitleForm] = useState<boolean>(false)
    const [errors , setErrors] = useState<Record<string , boolean>>({})
    const [submitted , setSubmitted] = useState<boolean>(false)

    const {setPassenger} = usePassenger()
    
    const handleOpenTitle = (() => setOpenTitleForm(e => !e))
    

    //
    const getDaysInMonth = (month: number, year: number) => {
        if (!month || !year) return 31
        return new Date(year, month, 0).getDate()
    }


    const handleBirthdayChange = (
        field: "day" | "month" | "year",
        value: string
    ) => {
        setFormData(prev => {
            const updatedBirthday = {
            ...prev.birthday,
            [field]: value,
            }

            if (field === "month" || field === "year") {
            const daysInMonth = getDaysInMonth(
                Number(updatedBirthday.month),
                Number(updatedBirthday.year)
            )

            if (Number(updatedBirthday.day) > daysInMonth) {
                updatedBirthday.day = ""
            }
            }

            return {
            ...prev,
            birthday: updatedBirthday,
            }
        })
    }

    //
    const validateForm = () => {
    const newErrors: Record<string, boolean> = {}

    if (!formData.gender) newErrors.gender = true
    if (!formData.firstName.trim()) newErrors.firstName = true
    if (!formData.lastName.trim()) newErrors.lastName = true
    if (!formData.birthday.day) newErrors.birthdayDay = true
    if (!formData.birthday.month) newErrors.birthdayMonth = true
    if (!formData.birthday.year) newErrors.birthdayYear = true
    if (!formData.nationality) newErrors.nationality = true

    setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }


        return(
        <div className="bg-white p-9 border-l border-l-gray-300 h-screen w-full">
            <form
                className="w-full"
                onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)

                    if (validateForm()) {
                        setPassenger({
                            title : formData.title,
                            gender : formData.gender,
                            firstName : formData.firstName,
                            lastName : formData.lastName,
                            birthday : {
                                day : formData.birthday.day,
                                month : formData.birthday.month,
                                year : formData.birthday.year,
                            },
                            nationality : formData.nationality
                        })
                    }
                }}
            >
                <div className="space-y-15">
                    <h1 className="flex justify-center text-xl">Adult Passenger</h1>
                    <div className="space-y-5">

                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Title</h2>
                            <div onClick={handleOpenTitle} className="flex justify-between items-center border border-gray-300 rounded-xl p-4">
                                <h3>{formData.title}</h3>
                                <h4 className="cursor-pointer">*</h4>
                            </div>
                            {openTitleForm && (
                                <div onClick={() => setOpenTitleForm(false)}>
                                    <FormTitle onSelectTitle={(e) => setFormData(prev => ({...prev, title: e }))} selectedTitle={formData.title}/>
                                </div>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Gender</h2>
                            <div className="flex  space-x-2.5">
                                <div className={`flex items-center border border-gray-300 rounded-xl py-4 px-5 space-x-2.5 ${errors.gender ? "border-red-600" : "border-gray-300"} `}>
                                    <label htmlFor="male">Male</label>
                                    <input 
                                        className="accent-red-900"  type="radio" id="male" value="male" name="class"
                                        checked={formData.gender === "male"}
                                        onChange={(e) => setFormData(prev => ({...prev , gender: e.target.value as "male" | "female"}))}
                                    />                    
                                </div>
                                <div className={`flex items-center border border-gray-300 rounded-xl py-4 px-5 space-x-2.5 ${errors.gender ? "border-red-600" : "border-gray-300"}`}>
                                    <label htmlFor="female">Female</label>
                                    <input 
                                        className="accent-red-900" type="radio" id="female" value="female" name="class"
                                        checked={formData.gender === "female"}
                                        onChange={(e) => setFormData(prev => ({...prev , gender: e.target.value as "male" | "female"}))}
                                    />
                                </div>
                            </div>
                            {errors.gender && (
                                <p className="text-red-500 text-sm">This field is required</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">First name/middle name on passport</h2>
                            <input 
                                value={formData.firstName} onChange={(e) => setFormData(prev => ({...prev , firstName : e.target.value}))} 
                                className={`flex justify-between items-center border border-gray-300 rounded-xl p-4 w-full ${errors.firstName ? "border-red-600" : "border-gray-300"}`} 
                                type="text" 
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">This field is required</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Last Name</h2>
                            <input 
                                value={formData.lastName} onChange={(e) => setFormData(prev => ({...prev , lastName : e.target.value}))} 
                                className={`flex justify-between items-center border border-gray-300 rounded-xl p-4 w-full ${errors.lastName ? "border-red-600" : "border-gray-300"}`} 
                                type="text"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">This field is required</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Date of birth</h2>
                            <div className="flex w-full space-x-4">
                                <div className={`flex w-1/3 space-x-2.5 justify-between items-center border border-gray-300 rounded-xl p-4  ${errors.birthdayDay ? "border-red-600" : "border-gray-300"}`}>
                                        <BirthdayDay
                                            day={formData.birthday.day}
                                            month={formData.birthday.month}
                                            year={formData.birthday.year}
                                            onSelectDay={(day) =>
                                            setFormData(prev => ({
                                                ...prev,
                                                birthday: {
                                                    ...prev.birthday,
                                                    day,
                                                },
                                                }))
                                            }
                                        />  
                                </div>
                                <div className={`flex justify-between items-center border border-gray-300 rounded-xl p-4 w-1/3 space-x-2.5 ${errors.birthdayMonth ? "border-red-600" : "border-gray-300"}`}>
                                        <BirthdayMonth
                                            month={formData.birthday.month}
                                            onSelectMonth={(month) => handleBirthdayChange("month", month)}
                                        />
                                </div>
                                <div className={`flex justify-between items-center border border-gray-300 rounded-xl p-4 w-1/3 space-x-2.5 ${errors.birthdayYear ? "border-red-600" : "border-gray-300"}`}>
                                    
                                    <BirthdayYear
                                        year={formData.birthday.year}
                                        onSelectYear={(year) => handleBirthdayChange("year", year)}
                                    />
                                </div>
                            </div>
                            {(errors.birthdayDay || errors.birthdayMonth || errors.birthdayYear) && (
                                <p className="text-red-500 text-sm">This field is required</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Nationality</h2>
                            <div className={`flex justify-between items-center border border-gray-300 rounded-xl py-4 px-5 space-x-2.5 ${errors.nationality ? "border-red-600" : "border-gray-300"}`}>

                                <Nationality
                                    value={formData.nationality}
                                    onSelectNationality={(e) =>
                                    setFormData(prev => ({ ...prev, nationality: e }))
                                    }
                                />
                            </div>
                            {errors.nationality && (
                                 <p className="text-red-500 text-sm">This field is required</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button className="mb-5 bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Save and Continue</button>
                    </div>
                </div>
            </form>

        </div>
    )
}