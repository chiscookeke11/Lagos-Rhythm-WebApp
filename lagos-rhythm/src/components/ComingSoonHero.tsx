"use client"
import { motion } from "framer-motion";



interface ComingSoonHeroProps {
    title: string
}


export default function ComingSoonHero({ title }: ComingSoonHeroProps) {
    return (
        <section className="w-full h-screen flex items-center justify-center flex-col relative bg-[url('/coming-soon/coming-soon-bg.jpg')] bg-no-repeat bg-cover bg-center bg-black/40 " >
            <div className="absolute inset-0 h-full w-full bg-black/55  "></div>
            <div className="w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center p-5 text-center " >
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }} className="font-semibold text-white text-3xl lg:text-[50px] lg:leading-[140%] font-merienda"  >
                    {title} launching Soon
                    <span className="inline-flex space-x-1 ml-1">
                        <span className="w-2 h-2 bg-[#ffffff] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-[#ffffff]  rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-[#ffffff] rounded-full animate-bounce"></span>
                    </span>
                </motion.h1>
            </div>
        </section>
    )
}