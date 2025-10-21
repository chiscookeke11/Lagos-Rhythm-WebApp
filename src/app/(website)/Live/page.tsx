"use client";

import { fireDB } from "@/app/config/firebaseClient";
import Loader from "@/components/common/Loader";
import AnimatedBg from "@/components/ui/AnimatedBg";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const YouTubeEmbed = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [accessAllowed, setAccessAllowed] = useState<boolean | null>(null);
  const [fetching, setFetching] = useState(true);
  const [tourId, setTourId] = useState<string | null>(null);




  const sizes = {
    sm: { w: 350, h: 300 },
    md: { w: 480, h: 270 },
    lg: { w: 640, h: 360 },
    xl: { w: 854, h: 480 },
  };

  const getOptions = (width: number, height: number) => ({
    height,
    width,
    playerVars: { autoplay: 0 },
  });

  // 🟢 Step 1: Fetch current tour ID
  useEffect(() => {
    const fetchTourId = async () => {
      try {
        const docRef = doc(fireDB, "livestream_details", "current");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTourId(docSnap.data().tourId);
          console.log(tourId)
        } else {
          setTourId(null);
        }
      } catch (err) {
        console.error("Error fetching tour ID:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchTourId();
  }, []);

  // 🟢 Step 2: Check access using CURRENT TIME (for testing)
  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setAccessAllowed(false);
        return;
      }

      // Simulate time window: allow access for 1.5 hours centered around now
      const now = new Date();
      const startTime = new Date(now.getTime() - 30 * 60 * 1000); // 30 mins before
      const endTime = new Date(now.getTime() + 60 * 60 * 1000);   // 1 hour after

      try {
        const q = query(
          collection(fireDB, "booked_Free_Rhythm"),
          where("email", "==", userEmail)
          // Uncomment when ready to use real tour ID:
          // where("tourId", "==", tourId)
        );

        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          console.warn("No booking found for:", userEmail);
          setAccessAllowed(false);
          return;
        }

        // Always allow access during test window
        const allowed = now >= startTime && now <= endTime;
        console.log({ now, startTime, endTime, allowed });
        setAccessAllowed(allowed);
      } catch (err) {
        console.error("Access check failed:", err);
        setAccessAllowed(false);
      }
    };

    checkAccess();
  }, [user, userEmail, tourId]);

  // 🟢 Step 3: Handle UI states
  if (fetching || accessAllowed === null) {
    return (
      <div className="h-screen flex items-center justify-center w-full bg-[#05073C] font-playfair flex-col gap-3">
        <Loader color="#EF8F57" />
        <p className="font-medium text-2xl text-center">Checking access...</p>
      </div>
    );
  }

  if (!accessAllowed) {
    return (
      <div className="h-screen flex items-center justify-center w-full bg-[#05073C] font-playfair">
        <p className="font-medium text-2xl text-center">
          You can only access this during the booked time.
        </p>
      </div>
    );
  }

  // 🟢 Step 4: Show the livestream player
  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#05073C] relative">
      <div className="z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center p-5">
        <div className="block md:hidden">
          <YouTube videoId={tourId ?? ""} opts={getOptions(sizes.sm.w, sizes.sm.h)} />
        </div>
        <div className="hidden md:block lg:hidden">
          <YouTube videoId={tourId ?? ""} opts={getOptions(sizes.md.w, sizes.md.h)} />
        </div>
        <div className="hidden lg:block xl:hidden">
          <YouTube videoId={tourId ?? ""} opts={getOptions(sizes.lg.w, sizes.lg.h)} />
        </div>
        <div className="hidden xl:block">
          <YouTube videoId={tourId ?? ""} opts={getOptions(sizes.xl.w, sizes.xl.h)} />
        </div>
      </div>
      <AnimatedBg />
    </div>
  );
};

export default YouTubeEmbed;
