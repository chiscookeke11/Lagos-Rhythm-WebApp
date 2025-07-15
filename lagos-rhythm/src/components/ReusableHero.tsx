"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import Button from "./common/Button"



interface ReusableHeroProps{
    pageTitle: string;
    subtitle?: string;
    description?: string
}


export default function ReusableHero({pageTitle, subtitle, description }: ReusableHeroProps) {

    const MotionButton = useMemo(() => motion(Button), [])


    return (
        <section className="w-full h-screen bg-[url('/coming-soon/coming-soon-bg.jpg')] bg-black/50 bg-no-repeat bg-cover bg-center flex flex-col gap-4 items-center justify-center " >
            <div className="overflow-hidden text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-semibold text-white text-4xl lg:text-[70px] lg:leading-[140%] font-merienda">
                   {pageTitle}
                </motion.h1>
                <motion.h3
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-normal text-2xl text-white font-merienda">
                   {subtitle}
                </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-normal text-base text-white font-merienda mt-4">
                 {description}
                </motion.p>
            </div>
    </section >
    )
}