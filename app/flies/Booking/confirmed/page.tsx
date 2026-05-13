
import Nav from "@/app/containers/navbar"
import Footer from "@/app/containers/footer"
//
import ConfirmedHeader from "./components/header"
import Reference from "./components/bookingReference"
import PaymmentSum from "./components/paymmentSummary"

export default function Confirmed(){
    
    return(
        <div className="space-y-15 bg-zinc-50">
            <Nav/>
            <div className="w-full flex flex-col items-center justify-center px-4 sm:px-0">
                <div className="w-full sm:w-[60%] flex flex-col space-y-15">
                    <ConfirmedHeader/>
                    <Reference/>
                    <PaymmentSum/>
                </div>
            </div>
            <Footer/> 
        </div>
    )
}