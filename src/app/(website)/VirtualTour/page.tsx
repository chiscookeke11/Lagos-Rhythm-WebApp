"use client"

import ChooseTour from "@/components/VirtualTour/ChooseTour";
import VirtualTourHero from "@/components/VirtualTour/VirtualTourHero";
// import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";




export default function Page() {

    const { ref, inView } = useInView({
        threshold: 1,
        triggerOnce: true
    })


    console.log(inView)

    return (
        <div className="w-full bg-[#FDF4F1] overflow-hidden relative " >
            <VirtualTourHero />


            <ChooseTour />



            <div ref={ref} className=" absolute h-2 w-2 bg-transparent bottom-0 right-0   "></div>
        </div>
    )
}