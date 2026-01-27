
import FlightsNav from "../../flies/[flies]/Containers/nav"
import TripDetails from "./containers/tripDetails"


export default function BookingConfirmation(){

    return(
        <div className="flex">
            <FlightsNav/>
            <TripDetails/>
        </div>
    )
}