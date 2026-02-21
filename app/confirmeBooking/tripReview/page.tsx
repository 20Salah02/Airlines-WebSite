
import FlightsNav from "@/app/flies/Booking/Containers/nav"
import TripReviewDetails from "./containers/tripDetails"
import ReviewTheTrips from "./containers/reviewTrips"
import PassengerDetailsReview from "./containers/passengerDetailsReview"
export default function TripReview(){

    return(
        <div className="flex flex-col bg-zinc-100 space-y-20 w-full  ">
            <div>
                <FlightsNav/>
            </div>
            <div className="flex space-x-7 justify-center px-14">
                    <div className="flex flex-col flex-2">
                        <ReviewTheTrips/>
                        <PassengerDetailsReview/>
                    </div>
                    <div className="flex-1">
                        <TripReviewDetails/>
                    </div>
            </div>
        </div>
    )
}