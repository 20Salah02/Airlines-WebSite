
import FlightsNav from "@/app/flies/Booking/Containers/nav"
import TripReviewDetails from "./tripDetails"
export default function TripReview(){

    return(
        <div className="flex flex-col bg-zinc-100 space-y-20  h-screen ">
            <div>
                <FlightsNav/>
            </div>
            <div>
                <TripReviewDetails/>
            </div>
        </div>
    )
}