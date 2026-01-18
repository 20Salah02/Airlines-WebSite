
import { useSearchParams } from "next/navigation"

export default function FlightDetails(){

    const search = useSearchParams()
    
    const departIata =search.get("departureIata")
    const arriveIata =search.get("arriveIata")
    const firstDay = search.get("firstday")
    const departureName = search.get("departureName")
    const arriveName = search.get("arriveName")
    const departureCity = search.get("departureCity")
    const arriveCity = search.get("arriveCity")
    // const lastDay = search.get("lastday")

    const dateNow = new Date()
    const dateYear = dateNow.getFullYear()

    return(
        
        <div className="bg-white p-5 border-l border-l-gray-300 h-screen space-y-20">
            <h1 className="flex justify-center text-xl">Flight details</h1>
            <div className="space-y-3 mb-15">
                <h2 className="font-medium">{departureCity} to {arriveCity}</h2>
                <h3 className="text-gray-600">{firstDay} {dateYear}</h3>
            </div>
            <div className="flex space-x-8">
                <div className="space-y-16">
                    <p>10:00</p>
                    <p>2h 10m</p>
                    <p>12:10</p>
                </div>
                <p className="flex items-center">L</p>
                <div className="space-y-10">
                    <div>
                        <h2>{departureCity}</h2>
                        <h3 className="text-gray-600">{departureName}</h3>
                    </div>
                    <div>
                        <h2>QR6381 - Boeing 777-300</h2>
                        <h3 className="text-gray-600">Operated by Garuda Indonesia</h3>
                    </div>
                    <div>
                        <h2>{arriveCity}</h2>
                        <h3 className="text-gray-600">{arriveName}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}