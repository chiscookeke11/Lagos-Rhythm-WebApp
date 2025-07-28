
"use client";
import { useMemo } from "react";
import Button from "./common/Button";
import { motion } from "framer-motion";
import ScrollingText from "./ScrollingText";
import Link from "next/link";
import Image from "next/image";



interface HeroSectionProps {
  setVideoLoaded: (videoLoaded: boolean) => void
  videoLoaded: boolean
}



export default function HeroSection({ setVideoLoaded, videoLoaded }: HeroSectionProps) {

  const MotionButton = useMemo(() => motion(Button), [])





  return (
    <section className="w-full h-[95vh] md:h-screen relative bg-white ">

      <video
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute top-0 left-0 h-full w-full object-cover z-0"
        autoPlay
        loop
        muted
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>


      {!videoLoaded && (<Image src={"/hero-image.png"} alt="hero-image" fill />)}


      <div className="w-full h-full absolute bg-black/50 z-10 flex items-center justify-center px-4 py-3">
        <div className="max-w-sm md:max-w-5xl w-full h-full flex items-center justify-center flex-col gap-4 lg:gap-5 text-center">
          <div className="overflow-hidden text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-semibold text-white text-4xl lg:text-[70px] lg:leading-[140%] font-merienda">
              Experience Lagos in its natural form
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-normal text-base text-white font-merienda">
              Live the vibe, please the mind!
            </motion.p>
          </div>
          <Link href={"/Free_E-Rhythm"} >
            <MotionButton
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.7 }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 1.3 }}
              type="button" label="Free Virtual Tour" > </MotionButton></Link>
        </div>
      </div>
      <ScrollingText />
    </section>
  );
}
