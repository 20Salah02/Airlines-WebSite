
import VoyageSuggetions from "./voyageSuggestions"
import TravelExp from "./travelExperience"
import NewsLetter from "./newsLetter"

export default function MainSection(){

    return(
        <div className="relative lg:mt-60 mt-110 lg:px-15  px-5 space-y-20">
            <TravelExp/>
            <VoyageSuggetions/>
            <NewsLetter/>
        </div>
    )
}