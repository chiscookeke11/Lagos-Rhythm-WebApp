"use client";

import {  useEffect, useState } from "react";
import BestOfLagos from "@/components/BestOfLagos";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";
import PopularThings from "@/components/PopulaThings";
import Testimonials from "@/components/Testimonials";
import WhyLagos from "@/components/WhyLagos";


export default function Home() {
  const [, setVideoLoaded] = useState(false);

  // useEffect(() => {
  // document.body.style.overflow = videoLoaded ? "auto" : "hidden";

  // }, [videoLoaded])



useEffect(() => {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  setVh();
  window.addEventListener("resize", setVh); // update on resize

  return () => {
    window.removeEventListener("resize", setVh);
  };
}, []);


  return (
    <div>
      {/* {!videoLoaded && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#05073C] flex items-center flex-col justify-center gap-5 z-50">
         <Image src={"/logos/logo.png"} height={100} width={100} alt="logo" className=" w-[100px] " />
          <div className="w-10 h-10 rounded-full border-2 border-r-0 border-b-0 border-[#EB662B] animate-spin " ></div>
        </div>
      )} */}

      <HeroSection setVideoLoaded={setVideoLoaded} />
      <BestOfLagos />
      <PopularThings />
      <WhyLagos />
      <Testimonials />
      <NewsLetter />
      <Footer />
    </div>
  );
}
