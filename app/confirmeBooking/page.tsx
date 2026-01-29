
import FlightsNav from "../flies/Booking/Containers/nav"
import TripDetails from "./containers/tripDetails"
import PassengerDetails from "./containers/passengerDetails"



export default function BookingConfirmation(){

    return(
        <div className="flex flex-col bg-zinc-100      h-screen">
            <FlightsNav/>
            <div className="flex justify-around mt-20">
                <PassengerDetails/>
                <TripDetails/>
            </div>
        </div>
    )
}