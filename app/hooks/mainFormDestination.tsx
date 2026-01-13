"use client"

//
import { useState , useEffect , useMemo } from "react";
// icons
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlane } from "@fortawesome/free-solid-svg-icons";


type airportApi ={
    id : number
    name : string
    city : string
    country : string
    iata : string
}
export default function HandleDestination(){
    const [data, setData] = useState<airportApi[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetch("/Data/airports.json")
        .then(res => res.json())
        .then(json => setData(json));
    }, []);

    const result = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];

        return data.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.iata.toLowerCase().includes(q)
        ).slice(0 ,15);
    }, [query, data]);
    
      if (!data) return <p>Loading...</p>;
        console.log("data is" + data)
    return (
    <div className="bg-gray-400" style={{ position: "relative", width: "300px" }}>
        <input
        type="text"
        placeholder="ابحث عن مطار أو مدينة"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
        />

        {/* Autocomplete */}
        {result.length > 0 && (
        <ul className="h-70"
            style={{
            overflowY : "auto",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#111",
            border: "1px solid #333",
            listStyle: "none",
            margin: 0,
            padding: 0,
            zIndex: 10,
            }}
        >
            {result.map((item, index) => (
            <li
                key={`${item.iata}-${index}`}
                style={{ padding: "10px", cursor: "pointer", }}
                onClick={() => {
                setQuery(item.name); 
                }}
            >
                {item.name} – {item.city} ({item.iata}) 
            </li>
            ))}
        </ul>
        )}
    </div>
    );

}
// https://www.qatarairways.com/app/booking/flight-selection?widget=QR&searchType=F&addTaxToFare=Y&minPurTime=0&selLang=fr&tripType=R&fromStation=CMN&toStation=JKT&departing=2026-01-23&returning=2026-01-25&bookingClass=E&adults=1&children=0&infants=0&ofw=0&teenager=0&flexibleDate=off&allowRedemption=N