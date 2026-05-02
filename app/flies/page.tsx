
import FlightsNav from "./Booking/Containers/nav"
import FliesHeader from "./Booking/Containers/header"
import FlightResults from "./Booking/Containers/flightsresults"
import Footer from "@/app/containers/footer"

export default function Flies(){

    return(
        <div className="bg-zinc-100 ">
            <div className="">
                <div><FlightsNav/></div>
                <div className="lg:mx-8 mx-4">
                    <div><FliesHeader/></div>
                    <div><FlightResults/></div>
                </div>
                <div><Footer/></div>
            </div>
        </div>
    )
}

export const metadata = {
  title: "Search Flights | Salah Airlines",
  description: "Browse available flights, compare prices and classes, and find the perfect flight for your next trip.",
}