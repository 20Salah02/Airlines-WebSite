"use client"

import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

type airportApi = {
    id: number
    name: string
    city: string
    country: string
    iata: string
    latitude: number;
    longitude: number
}

type props = {
    onSelect: (airport: airportApi) => void;
    selectedAirport?: airportApi | null;
    placeholder: string;
    value?: string;
    className?: string;
    id?: string;
    floatingLabel?: boolean;
    label?: string
    dropdownPosition?: "left" | "right"
    isOpen?: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function HandleDestination({
    value, onSelect, selectedAirport, placeholder, className, id, label,
    floatingLabel = false, dropdownPosition, isOpen, setIsOpen
}: props) {
    const [data, setData] = useState<airportApi[]>([]);
    const [query, setQuery] = useState(selectedAirport ? `${selectedAirport.city} (${selectedAirport.iata})` : "");
    const [mobileQuery, setMobileQuery] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);

    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === "undefined") return false
        return window.innerWidth < 1024
    })
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024)
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    useLayoutEffect(() => {
        if (isOpen && inputRef.current) {
            setRect(inputRef.current.getBoundingClientRect());
        }
    }, [isOpen]);

    useEffect(() => {
        fetch("/Data/airports.json")
            .then(res => res.json())
            .then(json => setData(json));
    }, []);

    const result = useMemo<airportApi[]>(() => {
        const q = (isMobile ? mobileQuery : query).trim().toLowerCase();
        if (!q || (selectedAirport && q === `${selectedAirport.city} (${selectedAirport.iata})`.toLowerCase())) return [];
        return data.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.city.toLowerCase().includes(q) ||
            item.iata.toLowerCase().includes(q)
        ).slice(0, 15);
    }, [isMobile, mobileQuery, query, data, selectedAirport]);

    const handleSelect = (item: airportApi) => {
        setQuery(`${item.city}  ${item.iata}`);
        onSelect(item);
        setIsOpen(false);
        setMobileQuery("");
    };

    const handleClose = () => {
        setIsOpen(false);
        setMobileQuery("");
    };

    if (!mounted) return (
        <div className="relative h-full flex">
            <input
                type="text"
                value={query}
                readOnly
                className={className}
                placeholder={floatingLabel ? "" : placeholder}
                id={id}
            />
        </div>
    );

    return (
        <div className="relative h-full flex">

            <input
                ref={inputRef}
                type="text"
                value={query}
                onFocus={() => {
                    if (isMobile) {
                        if (!isOpen) {
                            setIsOpen(true);
                        }
                    } else {
                        setIsOpen(true);
                    }
                }}
                onChange={(e) => {
                    if (!isMobile) {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }
                }}
                readOnly={isMobile}
                className={className}
                placeholder={floatingLabel ? "" : placeholder}
                id={id}
            />

            {floatingLabel && (
                <label className={`absolute left-0 transition-all duration-200 pointer-events-none
                    ${query || selectedAirport
                        ? "top-0.5 text-xs text-gray-500"
                        : "top-1/2 -translate-y-1/2 text-gray-400"
                    }`}>
                    {placeholder}
                </label>
            )}

            {/*MOBILE*/}
            {mounted && isMobile && createPortal(
                <div id={`destination-portal-${placeholder}`}>
                    <div
                        className={`fixed inset-0 z-9998 bg-black/40 transition-opacity duration-300
                            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        onPointerDown={(e) => {
                            e.preventDefault();
                            handleClose();
                        }}
                    />

                    <div
                        className={`fixed bottom-0 left-0 w-full h-[80vh] z-9999 bg-white rounded-t-2xl flex flex-col
                            transition-transform duration-300 ease-in-out
                            ${isOpen ? "translate-y-0" : "translate-y-full"}`}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <div className="relative flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-200 shrink-0">
                            
                            <h3 className="absolute left-1/2 -translate-x-1/2 text-gray-600 text-[15px]">
                                {placeholder === "From" ? "Departure" : "Return"}
                            </h3>

                            <button
                                onPointerDown={(e) => {
                                    e.preventDefault();
                                    handleClose();
                                }}
                                className="ml-auto text-gray-500 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-lg font-bold"
                            >
                                ✕
                            </button>

                        </div>

                        <div className="px-4 pt-3 pb-2 shrink-0">
                            <input
                                type="text"
                                value={mobileQuery}
                                key={isOpen ? "open" : "closed"}
                                autoFocus={isOpen}
                                onChange={(e) => setMobileQuery(e.target.value)}
                                placeholder={placeholder}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-900"
                            />
                        </div>

                        {/* Results */}
                        <ul className="overflow-y-auto flex-1">
                            {result.map((item, index) => (
                                <li
                                    key={`${item.iata}-${index}`}
                                    className="hover:bg-gray-100 active:bg-gray-200"
                                    onClick={() => handleSelect(item)} 
                                >
                                    <div className="flex items-center border-b py-2 mx-4 pb-2 border-b-gray-200 cursor-pointer">
                                        <div className="mr-3 text-gray-500">
                                            <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={20}
                                                    d="M407.72 224c-3.4 0-14.79.1-18 .3l-64.9 1.7a1.83 1.83 0 0 1-1.69-.9L193.55 67.56a9 9 0 0 0-6.66-3.56H160l73 161a2.35 2.35 0 0 1-2.26 3.35l-121.69 1.8a8.06 8.06 0 0 1-6.6-3.1l-37-45c-3-3.9-8.62-6-13.51-6H33.08c-1.29 0-1.1 1.21-.75 2.43l19.84 71.42a16.3 16.3 0 0 1 0 11.9L32.31 333c-.59 1.95-.52 3 1.77 3H52c8.14 0 9.25-1.06 13.41-6.3l37.7-45.7a8.19 8.19 0 0 1 6.6-3.1l120.68 2.7a2.7 2.7 0 0 1 2.43 3.74L160 448h26.64a9 9 0 0 0 6.65-3.55L323.14 287c.39-.6 2-.9 2.69-.9l63.9 1.7c3.3.2 14.59.3 18 .3C452 288.1 480 275.93 480 256s-27.88-32-72.28-32" />
                                            </svg>
                                        </div>
                                        <div className="w-full">
                                            <h3 className="font-semibold text-[14px] ">{item.city}, {item.country}</h3>
                                            <h5 className="mt-1 text-sm text-[12px] text-zinc-600">{item.name}</h5>
                                        </div>
                                        <div className="font-semibold text-[14px] ml-2">
                                            <h4>{item.iata}</h4>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>,
                document.body
            )}

            {/*DESKTOP*/}
            {!isMobile && isOpen && result.length > 0 && (
                <ul
                    className="absolute top-full mt-2 rounded-md bg-white overflow-y-auto z-9999 max-h-72 w-125"
                    style={{
                        left: dropdownPosition === "right" ? "auto" : "0",
                        right: dropdownPosition === "right" ? "0" : "auto",
                        boxShadow: "0px 5px 30px -2px rgba(0,0,0,0.62)"
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {result.map((item, index) => (
                        <li
                            className="rounded-md hover:bg-zinc-100"
                            key={`${item.iata}-${index}`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelect(item);
                            }}
                        >
                            <div className="flex items-center border-b py-2 mx-4 pb-2 border-b-gray-300 cursor-pointer">
                                <div className="mr-3">
                                    <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={20}
                                            d="M407.72 224c-3.4 0-14.79.1-18 .3l-64.9 1.7a1.83 1.83 0 0 1-1.69-.9L193.55 67.56a9 9 0 0 0-6.66-3.56H160l73 161a2.35 2.35 0 0 1-2.26 3.35l-121.69 1.8a8.06 8.06 0 0 1-6.6-3.1l-37-45c-3-3.9-8.62-6-13.51-6H33.08c-1.29 0-1.1 1.21-.75 2.43l19.84 71.42a16.3 16.3 0 0 1 0 11.9L32.31 333c-.59 1.95-.52 3 1.77 3H52c8.14 0 9.25-1.06 13.41-6.3l37.7-45.7a8.19 8.19 0 0 1 6.6-3.1l120.68 2.7a2.7 2.7 0 0 1 2.43 3.74L160 448h26.64a9 9 0 0 0 6.65-3.55L323.14 287c.39-.6 2-.9 2.69-.9l63.9 1.7c3.3.2 14.59.3 18 .3C452 288.1 480 275.93 480 256s-27.88-32-72.28-32" />
                                    </svg>
                                </div>
                                   <div className="w-full">
                                        <h3 className="font-semibold text-[15px] ">{item.city}, {item.country}</h3>
                                        <h5 className="mt-1 text-sm text-[13px] text-zinc-600">{item.name}</h5>
                                    </div>
                                    <div className="font-semibold text-[15px] ml-2">
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