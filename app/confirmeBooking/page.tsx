
import FlightsNav from "../flies/Booking/Containers/nav"
import TripDetails from "./containers/tripDetails"
import PassengerDetails from "./containers/passengerDetails"
import Footer from "../containers/footer"



export default function BookingConfirmation(){

    return(
        <div className="flex flex-col bg-zinc-100 lg:space-y-20 space-y-10">
            <FlightsNav/>
            <div className="flex lg:flex-row flex-col justify-around mb-18 px-3 ">
                <PassengerDetails/>
                <TripDetails/>
            </div>
            <Footer/>
        </div>
    )
}
export const metadata = {
  title: "Confirm Your Booking | Salah Airlines",
  description: "Enter your passenger details and payment information to complete your flight reservation securely.",
}