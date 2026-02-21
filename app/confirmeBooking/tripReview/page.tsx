
import FlightsNav from "@/app/flies/Booking/Containers/nav"
import TripReviewDetails from "./containers/tripDetails"
import ReviewTheTrips from "./containers/reviewTrips"
export default function TripReview(){

    return(
        <div className="flex flex-col bg-zinc-100 space-y-20 w-full  ">
            <div>
                <FlightsNav/>
            </div>
            <div className="flex space-x-7 justify-center px-14">
                    <ReviewTheTrips/>

                    <TripReviewDetails/>
            </div>
        </div>
    )
}