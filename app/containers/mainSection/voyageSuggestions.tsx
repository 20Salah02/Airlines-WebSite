"use client"

//
import { useState , useEffect, useMemo ,useRef } from "react"
//
import { useBooking } from "@/app/contexts/bookingContext"
import { useOutsideClick } from "@/app/hooks/dropDownClose"
//
import Image from "next/image"
import { useRouter } from "next/navigation"
//
import HandleDestination from "@/app/hooks/mainFormDestination"
import { calculateFlight } from "@/app/flies/Booking/Containers/flightCalculator"



type Airport ={
    id: number;
    name: string; 
    city: string; 
    country: string; 
    iata: string;
    latitude : number;
    longitude : number
}
export default function VoyageSuggetions(){

    const [destinationFrom , setDestinationFrom] = useState<Airport | null >(null)
    const [tripType, setTripType] = useState<"one-way" | "round-trip">("round-trip")
    const [classType , setClassType] = useState<"economy" | "premium">("economy")

    const [openClassType , setOpenClassType] = useState<boolean>(false)

    const [data , setData] = useState<Airport[]>([])
    const suggestionsIata = ["CDG","DPS","HND","DXB","JFK","IST","RAK","PKX","MED"]

    const [openBooking , setOpenBooking] = useState<Record<number ,boolean>>({})

    //
    const { setBooking } = useBooking();
    //
    useEffect(() => {
    fetch("/Data/airports.json")
        .then(res => res.json())
        .then(json => {
        setData(json);

        const casablancaAirport = json.find(
            (airport: Airport) => airport.iata === "CMN"
        );

        if (casablancaAirport) {
            setDestinationFrom(casablancaAirport);
            setBooking(prev => ({ ...prev, from: casablancaAirport }));
        }
        });
    }, []);

    const suggestionAirpots = useMemo(() => {
        return data.filter(airport=>
            suggestionsIata.includes(airport.iata)
        )
    },[data]) 


    // one way
    const airportOneWayPrices = useMemo(() => {
    if (!destinationFrom) return {};

    const prices: Record<number, number> = {};
    suggestionAirpots.forEach((airport) => {
        const result = calculateFlight(
        { lat: destinationFrom.latitude, lon: destinationFrom.longitude },
        { lat: airport.latitude, lon: airport.longitude }
        );
        prices[airport.id] = Math.round(result.price);
    });
    return prices;
    }, [destinationFrom, suggestionAirpots]);

    // return
    const airportReturnPrices = useMemo(() => {
    if (!destinationFrom) return {};

    const prices: Record<number, number> = {};
    suggestionAirpots.forEach((airport) => {
        const result = calculateFlight(
        { lat: destinationFrom.latitude, lon: destinationFrom.longitude },
        { lat: airport.latitude, lon: airport.longitude }
        );
        prices[airport.id] = Math.round(result.price) *2;
    });
    return prices;
    }, [destinationFrom, suggestionAirpots]);


    // close dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);    
    useOutsideClick(dropdownRef, () => setOpenClassType(false));   
    

    // Date
    function formatDate(date?: Date) {
    if (!date || isNaN(date.getTime())) return ""
    
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date)
    }

    const firstDayDefault = new Date();
    const lastDayDefault = new Date();
    firstDayDefault.setDate(firstDayDefault.getDate() + 15)
    lastDayDefault.setDate(firstDayDefault.getDate() + 45)
    

    // Handle Search
    const router = useRouter()

    const handleSearch = (airport: Airport) => {
        if (!destinationFrom) return;

        setBooking(prev => ({
            ...prev,
            from: destinationFrom,
            to: airport,
            dates: {
                departure: firstDayDefault,
                return: tripType === "round-trip" ? lastDayDefault : undefined,
            },
            tripType,
            classType
        }));

        if (tripType === "one-way") {
            router.push("/flies?step=outbound");
        } else {
            router.push("/flies?step=outbound");
        }
    };


    return(
        <div className="relative mt-67 px-15 bg-zinc-100">
            <div>
                <h2 className="text-4xl font-light text-gray-600">Find great fears</h2>
            </div>
            <div className="flex justify-between mt-7 items-start">
                <div className="flex space-x-2">
                    <label htmlFor="from">From</label>
                    <HandleDestination
                        key={destinationFrom?.id || "empty"} 
                        placeholder="From"
                        selectedAirport={destinationFrom} 
                        onSelect={(airport) => {
                            setDestinationFrom(airport);
                            setBooking(prev => ({ ...prev, from: airport })); 
                        }}                        
                        className="px-1 border-b w-fit border-b-zinc-600 font-medium"
                        id="from"
                    />
                    <h4>i</h4>
                </div>
                <div className="flex space-x-4">
                    <button 
                        className={`bg-white px-8 rounded-3xl ${tripType === "round-trip" ? "border-black" : "border-gray-300"} border   cursor-pointer`}
                        onClick={() => setTripType("round-trip")}
                    >
                            Return
                    </button>
                    <button 
                        className={`bg-white px-6 rounded-3xl border ${tripType === "one-way" ? "border-black" : "border-gray-300"} cursor-pointer`}
                        onClick={() => setTripType("one-way")}
                    >
                            One way
                    </button>
                    <div className="relative bg-white rounded-md border border-gray-300 w-50 cursor-pointer">
                        <div 
                            className="flex justify-between  items-center px-4"
                            onClick={() => setOpenClassType(prev => !prev)}
                        >
                            <div className="">
                                <h4 className="text-gray-600 text-sm">class</h4>
                                <h3 className="text-[17px] capitalize">{classType}</h3>
                            </div>
                            <h4>i</h4>
                        </div>
                        {openClassType && (
                            <div   
                                ref={dropdownRef} 
                                className="absolute top-12 w-full bg-white rounded-md border border-gray-300  z-40 transition-all "
                            >
                                <h3 
                                    className={`${classType === "economy" ? "bg-zinc-100" : "bg-white"} hover:bg-zinc-200 p-2 duration-600 ease-in-out`}
                                    onClick={() => {
                                        setClassType("economy")
                                        setOpenClassType(false)
                                    }}
                                >   Economy
                                </h3>
                                <h3 
                                    className={`${classType === "premium" ? "bg-zinc-100" : "bg-white"} hover:bg-zinc-200 p-2 duration-600 ease-in-out`}
                                    onClick={() => {
                                        setClassType("premium")
                                        setOpenClassType(false)
                                    }}
                                >
                                        Premium
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 grid-rows-2 gap-6 mt-6 h-auto">
                {suggestionAirpots.map((airport , index) =>{
                    let span = ""

                    if (index === 0) span = "col-span-2 row-span-1"
                    if (index === 1 || index === 2) span = "col-span-1"
                    if (index === 3 || index === 4) span = "col-span-1"
                    if (index === 5) span = "col-span-2"
                    if (index === 6) span = "col-span-2 row-span-1"
                    if (index === 7 || index === 8) span = "col-span-1"
                    
                    return (<div 
                        key={airport.id} 
                        className={`relative py-5 mt-4  h-70 flex items-end justify-between ${span} `}
                    >
                        <div 
                            onMouseEnter={() => setOpenBooking(prev => ({ ...prev, [airport.id]: true }))}
                            onMouseLeave={() => setOpenBooking(prev => ({ ...prev, [airport.id]: false }))}
                            className="w-full gap-6 "
                        >
                            <Image
                                src={`/${airport.city}.jpg`}
                                alt={airport.city}
                                fill
                                priority={index === 0}
                                className="object-cover rounded-2xl" 
                            />
                            <div className={`absolute inset-0 bg-black/15 rounded-2xl`}></div>

                            <div className="relative space-y-4 px-6 w-full  text-white z-80">
                                <div   className="flex items-end justify-between">
                                    <div className="space-y-3">
                                        <h2 className="text-2xl">{airport.city}</h2>
                                        <h3 className="text-sm">
                                            {formatDate(firstDayDefault)} - {formatDate(lastDayDefault)}</h3>
                                    </div>
                                    <h4 
                                        className="text-sm" 
                                    >
                                        <span className="capitalize">{classType}
                                        </span> from <span className="font-medium">    
                                            USD {(tripType === "round-trip" 
                                                ? airportReturnPrices[airport.id] 
                                                : airportOneWayPrices[airport.id]
                                            )   * (classType === "premium" ? 2.5 : 1)
                                            }
                                        </span> 
                                    </h4>  
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-500 w-full flex justify-center
                                    ${openBooking[airport.id] ? "max-h-25 mt-2" : "max-h-0 opacity-50"}`}
                                >
                                    <button 
                                        onClick={() => handleSearch(airport)}
                                        className="py-2 bg-red-900 w-[90%] rounded-4xl cursor-pointer op"
                                    >
                                        Book now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    )
}