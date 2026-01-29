
import FlightsNav from "../flies/Booking/Containers/nav"
import TripDetails from "./containers/tripDetails"


export default function BookingConfirmation(){

    return(
        <div className="flex">
            <FlightsNav/>
            <TripDetails/>
        </div>
    )
}