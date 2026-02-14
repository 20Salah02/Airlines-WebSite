"use client"

//
import { useState } from "react"
//
import FormTitle from "../tripDetailsFom/title"
import BirthdayDay from "../tripDetailsFom/birthday/day"
import BirthdayMonth from "../tripDetailsFom/birthday/month"
import BirthdayYear from "../tripDetailsFom/birthday/year"
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

            // إذا تغيّر الشهر أو السنة، نتأكد أن اليوم مازال صالحًا
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

    return(
        <div className="bg-white p-9 border-l border-l-gray-300 h-screen w-full">
            <form className="w-full" onSubmit={(e)=> e.preventDefault()}>
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
                                <div className="flex items-center border border-gray-300 rounded-xl py-4 px-5 space-x-2.5">
                                    <label htmlFor="male">Male</label>
                                    <input 
                                        className="accent-red-900"  type="radio" id="male" value="male" name="class"
                                        checked={formData.gender === "male"}
                                        onChange={(e) => setFormData(prev => ({...prev , gender: e.target.value as "male" | "female"}))}
                                    />                    
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-xl py-4 px-5 space-x-2.5">
                                    <label htmlFor="female">Female</label>
                                    <input 
                                        className="accent-red-900" type="radio" id="female" value="female" name="class"
                                        checked={formData.gender === "female"}
                                        onChange={(e) => setFormData(prev => ({...prev , gender: e.target.value as "male" | "female"}))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">First name/middle name on passport</h2>
                            <input value={formData.firstName} onChange={(e) => setFormData(prev => ({...prev , firstName : e.target.value}))} className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-full" type="text"/>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Last Name</h2>
                            <input value={formData.lastName} onChange={(e) => setFormData(prev => ({...prev , lastName : e.target.value}))} className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-full" type="text"/>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Date of birth</h2>
                            <div className="flex w-full space-x-4">
                                <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-1/3 space-x-2.5">
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
                                <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-1/3 space-x-2.5">

                                        <BirthdayMonth
                                            month={formData.birthday.month}
                                            onSelectMonth={(month) => handleBirthdayChange("month", month)}
                                        />
                                </div>
                                <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 w-1/3 space-x-2.5">
                                    
                                    <BirthdayYear
                                        year={formData.birthday.year}
                                        onSelectYear={(year) => handleBirthdayChange("year", year)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">Nationality</h2>
                            <div className="flex justify-between items-center border border-gray-300 rounded-xl py-4 px-5 space-x-2.5">
                                <h3>Morocco</h3>
                                <h4>*</h4>
                            </div>
                        </div>
                        <div></div>
                    </div>

                    <div >
                        <button className="bg-red-900 border-2 border-red-900 rounded-full w-full px-8 py-4  font-bold text-md text-amber-50 cursor-pointer">Save and Continue</button>
                    </div>
                </div>
            </form>

        </div>
    )
}