"use client";

import { useEffect, useState } from "react";
import BestOfLagos from "@/components/BestOfLagos";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";
import PopularThings from "@/components/PopulaThings";
import Testimonials from "@/components/Testimonials";
import WhyLagos from "@/components/WhyLagos";
import BlogLanding from "@/components/BlogLanding";
import HeroFAQ from "@/components/HeroFAQ";



export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false);





  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);


  return (
    <div>
      <HeroSection setVideoLoaded={setVideoLoaded} videoLoaded={videoLoaded} />
      <BestOfLagos />
      <PopularThings />
      <WhyLagos />
      <BlogLanding />
      <Testimonials />
      <HeroFAQ />
      <NewsLetter />
    </div>
  );
}
