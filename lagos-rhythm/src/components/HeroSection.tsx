
"use client";
import { useMemo, useState } from "react";
import Button from "./common/Button";
import { motion } from "framer-motion";
import ScrollingText from "./ScrollingText";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


interface HeroSectionProps {
  setVideoLoaded: (videoLoaded: boolean) => void
}



export default function HeroSection({ setVideoLoaded }: HeroSectionProps) {

  const MotionButton = useMemo(() => motion(Button), [])
  const router = useRouter()
  const loggedIn = useState(false)


  const selectFreeTour = () => {
    if (loggedIn) {
      router.push("/Free_E-Rhythm")
    }
    else {
      toast.error("Please log in to experience Free E-Rhythm")
      return
    }
  }


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
          <MotionButton
            onClick={selectFreeTour}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 7 }}
            type="button" label="Free Virtual Tour" > </MotionButton>
        </div>
      </div>
      <ScrollingText />
    </section>
  );
}
