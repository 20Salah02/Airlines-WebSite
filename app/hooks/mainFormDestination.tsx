"use client"

//
import { useState , useEffect , useMemo } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";


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
}


export default function HandleDestination({value , onSelect , selectedAirport , placeholder , className, id} : props){
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
    <div className="relative">
        <input
            type="text"
            placeholder={placeholder}
            value={query} 
            onChange={(e) => {
                setQuery(e.target.value);
            }}
            className={className}
            id={id}
            onBlur={() => {
                if (query === "") {
                }
            }}
        />

        {result.length > 0 && (
        <ul className="h-70 absolute top-12 rounded-md bg-white overflow-y-scroll w-130 z-40 "
            style={{boxShadow:" 0px 5px 30px -2px rgba(0,0,0,0.62)"}}
        >
            {result.map((item, index) => (
            <li
                className=" rounded-md  hover:bg-gray-200"
                key={`${item.iata}-${index}`}
                onClick={() => {
                setQuery(`${item.city}  (${item.iata})`); 
                onSelect(item)
                }}
            >
                <div className="flex items-center border-b py-2 mx-4 pb-2   border-b-gray-500 cursor-pointer">
                    <div className="mr-3">
                        <FontAwesomeIcon icon={faPlane}/>
                    </div>
                    <div className="w-full">
                        <h3 className="font-bold">{item.city}, {item.country}</h3>
                        <h5 className="mt-2">{item.name}</h5>
                    </div>
                    <div className="flex justify-end items-end font-bold mr-4 ">
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
