
import VoyageSuggetions from "./voyageSuggestions"
import TravelExp from "./travelExperience"
import NewsLetter from "./newsLetter"

export default function MainSection(){

    return(
        <div className="relative mt-60 px-15 space-y-20">
            <TravelExp/>
            <VoyageSuggetions/>
            <NewsLetter/>
        </div>
    )
}