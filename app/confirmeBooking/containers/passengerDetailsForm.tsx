"use client"

//
import { useState ,useEffect } from "react"
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

type setCloseForm = {
    closePassengerForm : (range : boolean) => void
}



export default function PassengerForm({closePassengerForm } : setCloseForm){

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

    //
    const {passenger , setPassenger} = usePassenger()

    useEffect(() => {
        setFormData(passenger)
    },[passenger])

    //
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
        <div className="bg-white lg:p-9 py-6 px-4 lg:border-l lg:rounded-t-none rounded-t-full border-l-gray-300 h-screen w-full ">
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
                        closePassengerForm(false)
                    }
                }}
            >
                <div className="lg:space-y-10">
                    <button 
                        onClick={() => closePassengerForm(false)}
                        className=" absolute right-4 top-5  p-2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"></path></svg>
                    </button>
                    <h1 className="flex justify-center text-xl">Adult passenger</h1>
                    <div className="space-y-5 lg:mt-0 mt-10">

                        <div className="lg:space-y-2 space-y-1 cursor-pointer">
                            <h2 className="lg:text-lg text-[17px] lg:font-medium">Title</h2>
                            <div onClick={handleOpenTitle} className="flex justify-between items-center border border-gray-300 rounded-xl lg:p-4 p-3">
                                <h3>{formData.title}</h3>
                            <h6 className={`${openTitleForm ? "rotate-180" : ""} transition-all duration-300 ease-in-out`} >
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.9 340.9L512 652.7L192.1 340.9a30.6 30.6 0 0 0-42.7 0a29 29 0 0 0 0 41.6l340.3 331.7a32 32 0 0 0 44.6 0l340.3-331.7a29 29 0 0 0 0-41.7a30.6 30.6 0 0 0-42.7 0z"></path></svg>
                            </h6>
                            </div>
                            {openTitleForm && (
                                <div onClick={() => setOpenTitleForm(false)}>
                                    <FormTitle onSelectTitle={(e) => setFormData(prev => ({...prev, title: e }))} selectedTitle={formData.title}/>
                                </div>
                            )}
                        </div>
                        
                        <div className="lg:space-y-2 space-y-1">
                            <h2 className="lg:text-lg text-[17px] lg:font-medium">Gender</h2>
                            <div className="flex  space-x-2.5">
                                <div className={`flex items-center border border-gray-300 rounded-xl lg:py-4 py-3 px-5 space-x-2.5 ${errors.gender ? "border-red-600" : "border-gray-300"} `}>
                                    <label htmlFor="male" className="cursor-pointer">Male</label>
                                    <input 
                                        className="accent-red-900 cursor-pointer"  type="radio" id="male" value="male" name="class"
                                        checked={formData.gender === "male"}
                                        onChange={(e) => setFormData(prev => ({...prev , gender: e.target.value as "male" | "female"}))}
                                    />                    
                                </div>
                                <div className={`flex items-center border border-gray-300 rounded-xl lg:py-4 py-3 px-5 space-x-2.5 ${errors.gender ? "border-red-600" : "border-gray-300"}`}>
                                    <label htmlFor="female" className="cursor-pointer">Female</label>
                                    <input 
                                        className="accent-red-900 cursor-pointer" type="radio" id="female" value="female" name="class"
                                        checked={formData.gender === "female"}
                                        onChange={(e) => setFormData(prev => ({...prev , gender: e.target.value as "male" | "female"}))}
                                    />
                                </div>
                            </div>
                            {errors.gender && (
                                <p className="text-red-500 text-sm">This field is required</p>
                            )}
                        </div>

                        <div className="lg:space-y-2 space-y-1">
                            <h2 className="lg:text-lg text-[17px] lg:font-medium">First name/middle name on passport</h2>
                            <input 
                                value={formData.firstName} onChange={(e) => setFormData(prev => ({...prev , firstName : e.target.value}))} 
                                className={`flex justify-between items-center border border-gray-300 rounded-xl lg:p-4 p-3 w-full ${errors.firstName ? "border-red-600" : "border-gray-300"}`} 
                                type="text" 
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">This field is required</p>
                            )}
                        </div>
                        <div className="lg:space-y-2 space-y-1">
                            <h2 className="lg:text-lg text-[17px] lg:font-medium">Last Name</h2>
                            <input 
                                value={formData.lastName} onChange={(e) => setFormData(prev => ({...prev , lastName : e.target.value}))} 
                                className={`flex justify-between items-center border border-gray-300 rounded-xl lg:p-4 p-3 w-full ${errors.lastName ? "border-red-600" : "border-gray-300"}`} 
                                type="text"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">This field is required</p>
                            )}
                        </div>
                        <div className="lg:space-y-2 space-y-1">
                            <h2 className="lg:text-lg text-[17px] lg:font-medium">Date of birth</h2>
                            <div className="flex w-full space-x-4">
                                <div className={`flex w-1/3 space-x-2.5 justify-between items-center border border-gray-300 rounded-xl lg:p-4 p-3  ${errors.birthdayDay ? "border-red-600" : "border-gray-300"}`}>
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
                                <div className={`flex justify-between items-center border border-gray-300 rounded-xl lg:p-4 p-3 w-1/3 space-x-2.5 ${errors.birthdayMonth ? "border-red-600" : "border-gray-300"}`}>
                                        <BirthdayMonth
                                            month={formData.birthday.month}
                                            onSelectMonth={(month) => handleBirthdayChange("month", month)}
                                        />
                                </div>
                                <div className={`flex justify-between items-center border border-gray-300 rounded-xl lg:p-4 p-3 w-1/3 space-x-2.5 ${errors.birthdayYear ? "border-red-600" : "border-gray-300"}`}>
                                    
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
                        <div className="lg:space-y-2 space-y-1">
                            <h2 className="lg:text-lg text-[17px] lg:font-medium">Nationality</h2>
                            <div className={`flex justify-between items-center border border-gray-300 rounded-xl lg:py-4 lg:px-5 p-3 space-x-2.5 ${errors.nationality ? "border-red-600" : "border-gray-300"}`}>

                                <Nationality
                                    label={formData.nationality}
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
                        <button type="submit" className="lg:my-5 my-10 bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Save and Continue</button>
                    </div>
                </div>
            </form>

        </div>
    )
}