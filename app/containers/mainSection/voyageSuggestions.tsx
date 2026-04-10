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

    const [openFrom, setOpenFrom] = useState(false);

    const [openClassType , setOpenClassType] = useState<boolean>(false)

    const [data , setData] = useState<Airport[]>([])
    const suggestionsIata = ["CDG","DPS","HND","DXB","JFK","IST","RAK","PKX","MED"]

    const [active, setActive] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

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
    
    const fromRef = useRef<HTMLDivElement>(null);
    useOutsideClick(fromRef, () => {
        setOpenFrom(false); 
    });

    

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

    // handleScroll
    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft
            const width = container.clientWidth

            const index = Math.round(scrollLeft / (width * 0.85))
            setActive(index)
        }

        container.addEventListener("scroll", handleScroll)

        return () => container.removeEventListener("scroll", handleScroll)
    }, [])

    return(
        <div className="relative bg-zinc-100">
            <div>
                <h2 className="lg:text-4xl text-3xl font-light text-gray-600">Find great fears</h2>
            </div>
            <div className="flex lg:flex-row flex-col justify-between items-start mt-7 lg:space-y-0 space-y-5">
                <div ref={fromRef} className="flex space-x-2">
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
                        isOpen={openFrom}
                        setIsOpen={setOpenFrom}
                    />
                    <h4>
                        <svg className="text-zinc-600" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" d="M4 22h16"></path><path d="m13.888 3.663l.742-.742a3.146 3.146 0 1 1 4.449 4.45l-.742.74m-4.449-4.448s.093 1.576 1.483 2.966s2.966 1.483 2.966 1.483m-4.449-4.45L7.071 10.48c-.462.462-.693.692-.891.947a5.2 5.2 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-.875 2.626m14.08-8.13l-6.817 6.817c-.462.462-.692.692-.947.891q-.451.352-.969.599c-.291.139-.601.242-1.22.448l-2.626.876m0 0l-.641.213a.848.848 0 0 1-1.073-1.073l.213-.641m1.501 1.5l-1.5-1.5"></path></g></svg>
                    </h4>
                </div>
                <div className="flex lg:flex-row flex-col-reverse lg:space-x-4 lg:space-y-0 ">
                    <div className="flex space-x-4 ">
                        <button 
                            className={`bg-white px-8 py-2 rounded-3xl ${tripType === "round-trip" ? "border-black" : "border-gray-300"} border   cursor-pointer`}
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
                    </div>
                    <div ref={dropdownRef}  className="relative bg-white rounded-md border border-gray-300 lg:w-50 w-full lg:mb-0 mb-5 cursor-pointer">
                        <div 
                            className="flex justify-between  items-center px-4"
                            onClick={() => setOpenClassType(prev => !prev)}
                        >
                            <div className="">
                                <h4 className="text-gray-600 text-sm">class</h4>
                                <h3 className="text-[17px] capitalize">{classType}</h3>
                            </div>
                            <h4 className={`${openClassType ? "rotate-180" : ""} transition-all ease-in-out duration-300`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.9 340.9L512 652.7L192.1 340.9a30.6 30.6 0 0 0-42.7 0a29 29 0 0 0 0 41.6l340.3 331.7a32 32 0 0 0 44.6 0l340.3-331.7a29 29 0 0 0 0-41.7a30.6 30.6 0 0 0-42.7 0z"></path></svg>
                            </h4>
                        </div>
                        {openClassType && (
                            <div   
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

            <div>
                <div 
                    ref={scrollRef}
                    className="flex lg:hidden overflow-x-auto gap-4 snap-x snap-mandatory pb-4"
                >
                    {suggestionAirpots.map((airport , index) => (
                        <div
                            key={airport.id}
                            className="min-w-[85%] snap-start relative h-70 flex items-end mt-4"
                        >                         
                            <div 
                                onMouseEnter={() => setOpenBooking(prev => ({ ...prev, [airport.id]: true }))}
                                onMouseLeave={() => setOpenBooking(prev => ({ ...prev, [airport.id]: false }))}
                                className="w-full"
                            >
                                <Image
                                    src={`/${airport.city}.jpg`}
                                    alt={airport.city}
                                    fill
                                    className="object-cover rounded-2xl" 
                                />

                                <div className="absolute inset-0 bg-black/15 rounded-2xl"></div>
                               
                                <div className="relative space-y-4 px-6 w-full  text-white z-80">
                                    <div   className="flex lg:flex-row flex-col lg:items-end items-start justify-between">
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
                                        className={` w-full flex justify-center mb-3`}
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
                        
                    ))}
                    
                </div>
                <div className="flex justify-center mt-4 gap-2 lg:hidden">
                    {suggestionAirpots.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                active === i  
                                    ? "bg-red-900 w-5"  
                                    : "bg-gray-300 w-2" 
                            }`}
                        />
                    ))}
                </div>





                <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-6 mt-4">
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
                                    <div   className="flex lg:flex-row flex-col lg:items-end items-start justify-between">
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
        </div>
    )
}