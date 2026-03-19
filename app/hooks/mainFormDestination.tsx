"use client"

//
import { useState , useEffect , useMemo } from "react";



type airportApi ={
    id : number
    name : string
    city : string
    country : string
    iata : string
    latitude : number;
    longitude : number
}

type props = {
    onSelect: (airport: airportApi) => void;
    selectedAirport?: airportApi | null;
    placeholder: string;
    value?: string;    
    className?: string;
    id?: string;
    floatingLabel? : boolean;
    label?: string
}


export default function HandleDestination({value , onSelect , selectedAirport , placeholder , className , id , label ,floatingLabel = false} : props){
    const [data, setData] = useState<airportApi[]>([]);
    const [query, setQuery] = useState(selectedAirport ? `${selectedAirport.city} (${selectedAirport.iata})` : "");    const [isTyping, setIsTyping] = useState(false);


    useEffect(() => {
        fetch("/Data/airports.json")
        .then(res => res.json())
        .then(json => setData(json));
    }, []);
    

    const result = useMemo(() => {
            const q = query.trim().toLowerCase();

            if (!q || (selectedAirport && q === `${selectedAirport.city} (${selectedAirport.iata})`.toLowerCase())) {
                return [];
            }

            return data.filter(item =>
                item.name.toLowerCase().includes(q) ||
                item.city.toLowerCase().includes(q) ||
                item.iata.toLowerCase().includes(q)
            ).slice(0, 15);
    }, [query, data, selectedAirport]);

    
      if (!data) return <p>Loading...</p>;
        console.log("data is" + data)
    return (
    <div className="relative h-full flex ">
        <input
            type="text"
            value={query} 
            onChange={(e) => {
                setQuery(e.target.value);
            }}
            className={className}
            placeholder={floatingLabel ? "" : placeholder}
            id={id}
            onBlur={() => {
                if (query === "") {
                }
            }}
        />
        {floatingLabel && (
        <label
            className={`absolute left-0 transition-all duration-200 pointer-events-none
            ${
            query || selectedAirport
                ? "top-1 text-xs text-gray-500"
                : "top-1/2 -translate-y-1/2 text-gray-400"
            }`}
        >
            {placeholder}
        </label>
        )}

        {result.length > 0 && (
        <ul className="h-70 absolute top-12 rounded-md bg-white overflow-y-scroll w-130 z-90 "
            style={{boxShadow:" 0px 5px 30px -2px rgba(0,0,0,0.62)"}}
        >
            {result.map((item, index) => (
            <li
                className=" rounded-md  hover:bg-gray-200"
                key={`${item.iata}-${index}`}
                onClick={() => {
                setQuery(`${item.city}  ${item.iata}`); 
                onSelect(item)
                }}
            >
                <div className="flex items-center border-b py-2 mx-4 pb-2   border-b-gray-500 cursor-pointer">
                    <div className="mr-3">
                        <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M407.72 224c-3.4 0-14.79.1-18 .3l-64.9 1.7a1.83 1.83 0 0 1-1.69-.9L193.55 67.56a9 9 0 0 0-6.66-3.56H160l73 161a2.35 2.35 0 0 1-2.26 3.35l-121.69 1.8a8.06 8.06 0 0 1-6.6-3.1l-37-45c-3-3.9-8.62-6-13.51-6H33.08c-1.29 0-1.1 1.21-.75 2.43l19.84 71.42a16.3 16.3 0 0 1 0 11.9L32.31 333c-.59 1.95-.52 3 1.77 3H52c8.14 0 9.25-1.06 13.41-6.3l37.7-45.7a8.19 8.19 0 0 1 6.6-3.1l120.68 2.7a2.7 2.7 0 0 1 2.43 3.74L160 448h26.64a9 9 0 0 0 6.65-3.55L323.14 287c.39-.6 2-.9 2.69-.9l63.9 1.7c3.3.2 14.59.3 18 .3C452 288.1 480 275.93 480 256s-27.88-32-72.28-32"></path></svg>                    
                    </div>
                    <div className="w-full">
                        <h3 className="font-bold text-red-900">{item.city}, {item.country}</h3>
                        <h5 className="mt-2 text-zinc-600">{item.name}</h5>
                    </div>
                    <div className="flex justify-end items-end font-bold mr-4 text-red-900">
                        <h4>{item.iata}</h4>
                    </div>
                </div>
            </li>
            ))}
        </ul>
        )}
    </div>
    );

}
