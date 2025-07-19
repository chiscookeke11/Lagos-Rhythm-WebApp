"use client"

import { motion } from "framer-motion"




export default function Loading() {
  return (

    <div className="h-screen w-full flex items-center flex-col gap-7 justify-center bg-[#05073C] ">

      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-semibold text-white text-3xl md:text-4xl lg:text-[70px] lg:leading-[140%] font-merienda">Lagos Rhythm</motion.h1>

      <div className="h-14 w-14 relative "   >
        <div className="animate-spin rounded-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full border-4 border-[#EF8F57] border-t-transparent  transition-all duration-200 " />
        <div className="absolute border-4 border-[#EF8F57] border-t-transparent rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-7/12 w-7/12 animate-anti-spin" />
      </div>










    </div>
  );
}
