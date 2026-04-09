
import FlightsNav from "../flies/Booking/Containers/nav"
import TripDetails from "./containers/tripDetails"
import PassengerDetails from "./containers/passengerDetails"



export default function BookingConfirmation(){

    return(
        <div className="flex flex-col bg-zinc-100 space-y-20 ">
            <FlightsNav/>
            <div className="flex lg:flex-row flex-col justify-around mb-18 px-3 ">
                <PassengerDetails/>
                <TripDetails/>
            </div>
        </div>
    )
}