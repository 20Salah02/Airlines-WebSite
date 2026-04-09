
import FlightsNav from "@/app/flies/Booking/Containers/nav"
import TripReviewDetails from "./containers/tripDetails"
import ReviewTheTrips from "./containers/reviewTrips"
import PassengerDetailsReview from "./containers/passengerDetailsReview"
export default function TripReview(){

    return(
        <div className="flex flex-col bg-zinc-100 space-y-20 w-full ">
            <div>
                <FlightsNav/>
            </div>
            <div className="flex lg:flex-row flex-col lg:space-x-7 space-y-7 lg:space-y-0 justify-center lg:px-14 px-4 mb-15 w-full">
                    <div className="flex flex-col lg:flex-2">
                        <ReviewTheTrips/>
                        <PassengerDetailsReview/>
                    </div>
                    <div className="lg:flex-1 ">
                        <TripReviewDetails/>
                    </div>
            </div>
        </div>
    )
}