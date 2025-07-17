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
            {/* <motion.div
                initial={{ x: -1000 }}
                animate={{ x: inView ? 0 : -1000 }}
                viewport={{ once: true }}
                className="bg-[#EF8F57] w-fit py-4 px-5  rounded-r-lg transform text-sm  duration-150 ease-in-out transition-transform mb-2 relative overflow-hidden shadow-xl " >
                <p>All tours are hosted by real Lagosians and streamed live in HD.</p>
                <p>No simulations, just the real thing</p>

                <div className="h-full w-1.5 bg-white absolute top-0 right-0" ></div>
            </motion.div> */}


            <div ref={ref} className=" absolute h-2 w-2 bg-transparent bottom-0 right-0   "></div>
        </div>
    )
}