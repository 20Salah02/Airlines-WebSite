
import Nav from "@/app/containers/navbar"
import Footer from "@/app/containers/footer"
//
import ConfirmedHeader from "./components/header"
import Reference from "./components/bookingReference"

export default function Confirmed(){
    
    return(
        <div className="space-y-25">
           <Nav/>
           <ConfirmedHeader/>
           <Reference/>
           <Footer/> 
        </div>
    )
}