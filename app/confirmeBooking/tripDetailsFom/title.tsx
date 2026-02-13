"use client"

//
type FormTitleProps = {
  onSelectTitle: (title: string) => void
}
export default function FormTitle({onSelectTitle} : FormTitleProps){

    const titles = ["Mr", "Mrs" , "Ms", "Miss", "Dr", "Prof"]


    return(
        
        <div className="border border-gray-300">
            <ul className="flex flex-col">
                {titles.map((title) => (
                    <li className="flex items-center p-4 space-y-3 cursor-pointer hover:bg-zinc-100" 
                        key={title}
                        onClick={() => onSelectTitle(title)}
                    >
                            {title}
                    </li>
                ))}
            </ul>
        </div>
    )
}