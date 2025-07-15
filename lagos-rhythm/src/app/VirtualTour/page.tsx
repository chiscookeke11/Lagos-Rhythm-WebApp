import ChooseTour from "@/components/VirtualTour/ChooseTour";
import VirtualTourHero from "@/components/VirtualTour/VirtualTourHero";




export default function Page() {
    return (
        <div className="w-full bg-[#ffffff] overflow-hidden " >
            <VirtualTourHero/>
            <ChooseTour/>
               <div className="bg-red-600 w-fit py-4 px-5  rounded-r-lg transform translate-x-[-100%] translate-x-[0] duration-150 ease-in-out transition-transform " >
             <p>All tours are hosted by real Lagosians and streamed live in HD.</p>
            <p>No simulations, just the real thing</p>
           </div>
        </div>
    )
}