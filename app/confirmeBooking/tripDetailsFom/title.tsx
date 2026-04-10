"use client"

//
type FormTitleProps = {
    selectedTitle : string
    onSelectTitle: (title: string) => void
}
export default function FormTitle({onSelectTitle , selectedTitle} : FormTitleProps){

    const titles = ["Mr", "Mrs" , "Ms", "Miss", "Dr", "Prof"]

    return(
        
        <div className="border border-gray-300">
            <ul className="flex flex-col">
                {titles.map((title) =>{
                const isSelected = selectedTitle === title

                return(
                    <li className={`flex items-center lg:p-4 p-3 lg:space-y-3 space-y-1 cursor-pointer hover:bg-zinc-100 ${isSelected ? "bg-zinc-100 font-medium" : "bg-white"}`} 
                        key={title}
                        onClick={() => onSelectTitle(title)}
                    >
                            {title}
                    </li>
                )})}
            </ul>
        </div>
    )
}