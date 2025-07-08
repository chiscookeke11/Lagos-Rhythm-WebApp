import ChooseTour from "@/components/VirtualTour/ChooseTour";
import VirtualTourHero from "@/components/VirtualTour/VirtualTourHero";




export default function Page() {
    return (
        <div className="w-full  " >
            <VirtualTourHero/>
            <ChooseTour/>
        </div>
    )
}