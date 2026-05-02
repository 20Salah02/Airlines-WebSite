
import Myheader from "./containers/header";
import MainSection from "./containers/mainSection/page";
import Footer from "./containers/footer";

export default function Home() {

  return (
    <div className="bg-zinc-100 ">
      <Myheader/>
      <MainSection/>
      <Footer/>
    </div>
  );
} 


export const metadata = {
  title: "Salah Airlines",
  description: "Your journey starts here. Search and book flights to hundreds of destinations worldwide with Salah Airlines.",
}