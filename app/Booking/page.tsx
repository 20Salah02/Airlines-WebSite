
import FlightsNav from "../flies/Booking/Containers/nav"
import FliesHeader from "../flies/Booking/Containers/header"
import FlightResults from "../flies/Booking/Containers/flightsresults"

export default function Flies(){

    return(
        <div className="bg-zinc-100 ">
            <div className="mx-8">
                <div><FlightsNav/></div>
                <div><FliesHeader/></div>
                <div><FlightResults/></div>
            </div>
        </div>
    )
}