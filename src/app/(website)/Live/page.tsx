"use client";

import AnimatedBg from "@/components/ui/AnimatedBg";
import React from "react";
import YouTube from "react-youtube";

const YouTubeEmbed = () => {

  const getOptions = (width: number, height:number) => ({
    height,
    width,
    playerVars: {
      autoplay: 0,
    },
  });


  const sizes = {
    sm: { w: 350, h: 300 }, // mobile
    md: { w: 480, h: 270 }, // tablet
    lg: { w: 640, h: 360 }, // desktop
    xl: { w: 854, h: 480 }, // large desktop
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#05073C] relative">
      <div className="z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center p-5">

        <div className="block md:hidden">
          <YouTube videoId="m16bxaeFsk8" opts={getOptions(sizes.sm.w, sizes.sm.h)} />
        </div>
        <div className="hidden md:block lg:hidden">
          <YouTube videoId="m16bxaeFsk8" opts={getOptions(sizes.md.w, sizes.md.h)} />
        </div>
        <div className="hidden lg:block xl:hidden">
          <YouTube videoId="m16bxaeFsk8" opts={getOptions(sizes.lg.w, sizes.lg.h)} />
        </div>
        <div className="hidden xl:block">
          <YouTube videoId="m16bxaeFsk8" opts={getOptions(sizes.xl.w, sizes.xl.h)} />
        </div>
      </div>

      <AnimatedBg />
    </div>
  );
};

export default YouTubeEmbed;
