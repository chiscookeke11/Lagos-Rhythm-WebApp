"use client";

import { fireDB } from "@/app/config/firebaseClient";
import Loader from "@/components/common/Loader";
import CountryProtectedRoute from "@/components/ProtectedRoutes/CountryProtectedRoute";
import AnimatedBg from "@/components/ui/AnimatedBg";
import { useUser } from "@clerk/nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const YouTubeEmbed = () => {
  const { user } = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const [accessAllowed, setAccessAllowed] = useState<boolean | null>(null)
  const tourId = "87548ghjfhjdhdg"
  const tourDate = new Date("2025-10-09T05:00:00+01:00")
  const getOptions = (width: number, height: number) => ({
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

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setAccessAllowed(false)
        return
      }
      const q = query(
        collection(fireDB, "booked_Free_Rhythm"),
        where("email", "==", userEmail),
        where("tourId", "==", tourId)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setAccessAllowed(false)
        return;
      }

      // const booking = snapshot.docs[0].data()
      const now = new Date();
      const startTime = new Date(tourDate.getTime() - 30 * 60 * 1000)
      const endTime = new Date(tourDate.getTime() + 60 * 60 * 1000)

      console.log({
        now: now.toISOString(),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        allowed: now >= startTime && now <= endTime
      });

      setAccessAllowed(now >= startTime && now <= endTime)
    }

    checkAccess()
  }, [user, tourId])





  if (accessAllowed === null) return <div className="h-screen flex items-center justify-center w-full bg-[#05073C] font-playfair flex-col gap-3 " > <Loader color="#EF8F57" /> <p className=" font-medium text-2xl text-center " >Checking acccess ...</p> </div>
  if (!accessAllowed) {
    return <div className="h-screen flex items-center justify-center w-full bg-[#05073C] font-playfair"> <p className=" font-medium text-2xl  text-center ">You can only access this during the booked time</p> </div>
  }




  return (

    <div className="flex justify-center items-center h-screen w-full bg-[#05073C] relative">
      <div className="flex items-center justify-center flex-col gap-3" >
        <Loader color="#EF8F57" />
        <p className=" font-medium text-2xl  text-center font-playfair ">Loading Tour</p>
      </div>
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
