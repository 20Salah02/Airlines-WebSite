
import FlightsNav from "../flies/Booking/Containers/nav"
import TripDetails from "./containers/tripDetails"



export default function BookingConfirmation(){

    return(
        <div className="flex flex-col bg-zinc-100      h-screen">
            <FlightsNav/>
            <div>
                <TripDetails/>
            </div>
        </div>
    )
}