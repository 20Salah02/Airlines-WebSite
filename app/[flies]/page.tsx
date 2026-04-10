
import FlightsNav from "../flies/Booking/Containers/nav"
import FliesHeader from "../flies/Booking/Containers/header"
import FlightResults from "../flies/Booking/Containers/flightsresults"

export default function Flies(){

    return(
        <div className="bg-zinc-100 ">
            <div className="">
                <div><FlightsNav/></div>
                <div className="lg:mx-8 mx-4">
                    <div><FliesHeader/></div>
                    <div><FlightResults/></div>
                </div>
            </div>
        </div>
    )
}