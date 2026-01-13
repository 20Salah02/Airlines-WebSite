"use client"
//
import { DayPicker} from "react-day-picker";
import { DateRange } from "react-day-picker"
import "react-day-picker/style.css";


export default function HandleDate({
    selected,
    onSelectDate,
    setIsOpen
}: {
    selected: DateRange | undefined
    onSelectDate: (range: DateRange | undefined) => void
    setIsOpen: (open: boolean) => void 
}) {

    const handleContinue = () => {
            if (selected) {
                setIsOpen(false); 
            } else {
                setIsOpen(true);
            }
        };

    function handleClearAll(){
        onSelectDate(undefined)
    }

    return (
        <div className="bg-white flex justify-center flex-col w-fit border-2 border-zinc-300 rounded-md p-6">
            <div className="pb-10 border-b border-b-zinc-200">
                <DayPicker 
                    classNames={{
                        weekdays : "text-black  border-b border-b-zinc-200",
                        month_caption: "text-blue-500 text-[18px] py-5 flex justify-center items-center font-medium ",
                        day : "text-black font-[600] hover:bg-blue-600 hover:text-white",
                        today:"text-blue-600",
                        selected: `bg-blue-600 border-amber-500`, 
                        range_start:"rounded-l-md text-white",
                        range_middle: "text-black bg-zinc-200",
                        range_end: "rounded-r-md text-white"
                    }}
                    animate
                    mode="range"
                    selected={selected} 
                    onSelect={onSelectDate}
                    disabled={{ before: new Date() }}
                    startMonth={new Date()} 
                    min={2}
                    numberOfMonths={2} 
                />    
            </div>
            <div className="flex justify-end items-center mt-5">
                <button onClick={handleClearAll} className="text-blue-500 font-medium border-2 rounded-4xl px-6 py-4 cursor-pointer mr-3">Clear all</button>
                <button onClick={handleContinue}  className="bg-blue-500 text-white font-medium px-7 py-4 rounded-4xl cursor-pointer">Continue</button>
            </div>


        </div>
    )
}
