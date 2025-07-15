"use client"

import { motion } from "framer-motion"




interface ReusableHeroProps {
    pageTitle: string;
    subtitle?: string;
    description?: string
}


export default function ReusableHero({ pageTitle, subtitle, description }: ReusableHeroProps) {




    return (
        <section className="w-full h-screen bg-[url('/coming-soon/coming-soon-bg.jpg')]  bg-no-repeat bg-cover bg-center flex flex-col gap-4 items-center justify-center px-4 py-5 relative " >
            <div className="inset-0 bg-black/55 absolute h-full w-full " />
            <div className="overflow-hidden text-center z-10 space-y-1 ">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-semibold text-white text-3xl md:text-4xl lg:text-[70px] lg:leading-[140%] font-merienda">
                    {pageTitle}
                </motion.h1>
                <motion.h3
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-normal text-xl md:text-2xl text-white font-merienda">
                    {subtitle}
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-normal text-base lg:text-lg text-white font-lato mt-4 max-w-3xl ">
                    {description}
                </motion.p>
            </div>
        </section >
    )
}