
import FlightsNav from "../flies/Booking/Containers/nav"
import TripDetails from "./containers/tripDetails"
import PassengerDetails from "./containers/passengerDetails"



export default function BookingConfirmation(){

    return(
        <div className="flex flex-col bg-zinc-100  space-y-20   ">
            <FlightsNav/>
            <div className="flex justify-around  ">
                <PassengerDetails/>
                <TripDetails/>
            </div>
        </div>
    )
}