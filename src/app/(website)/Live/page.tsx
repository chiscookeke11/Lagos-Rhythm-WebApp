"use client";

import { fireDB } from "@/app/config/firebaseClient";
import Loader from "@/components/common/Loader";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const YouTubeEmbed = () => {
  const [accessAllowed, setAccessAllowed] = useState<boolean | null>(null);
  const [fetching, setFetching] = useState(true);
  const [tourId, setTourId] = useState<string | null>(null);
  const [tourTime, setTourTime] = useState<Date | null>(null)

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

  // 🟢 Step 1: Fetch current tour ID from the livestream details table
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



  useEffect(() => {
    const getTourTime = async () => {
      const q = query(
        collection(fireDB, "tour"),
        where("tourType", "==", "Free_Tour"),
        where("isCompleted", "==", true),
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const data = firstDoc.data();
        const timeField = data.time;

        let jsDate: Date | null = null;

        if (timeField?.value?.toDate) {
          //  Properly convert Firestore Timestamp nested inside "value"
          jsDate = timeField.value.toDate();
        } else if (timeField?.value && typeof timeField.value === "string") {
          // Fallback: handle string
          jsDate = new Date(timeField.value);
        }

        if (jsDate && !isNaN(jsDate.getTime())) {
          setTourTime(jsDate);
          console.log("Parsed tour time:", jsDate);
        } else {
          console.error(" Invalid time format:", timeField);
        }
      }
    };

    getTourTime();
  }, []);



  // 🟢 Step 3: Check access using CURRENT TIME (for testing)
  useEffect(() => {
    // firstly fetch tour time

    const checkAccess = async () => {

      // Simulate time window: allow access for 1.5 hours centered around now
      const now = new Date();
      const startTime = tourTime ? new Date(tourTime?.getTime() - 30 * 60 * 1000) : ""; // 30 mins before
      const endTime = tourTime ? new Date(tourTime?.getTime() + 30 * 60 * 1000) : "";   // 1 hour after

      try {
        // Always allow access during test window
        const allowed = now >= startTime && now <= endTime;
        setAccessAllowed(allowed);
        console.log(allowed)
      } catch (err) {
        console.error("Access check failed:", err);
        setAccessAllowed(false);
      }
    };
    checkAccess();
  }, [tourId]);

  // 🟢 Step 4: Handle UI states
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
          The tour hasn’t started yet.
        </p>
      </div>
    )
  }

  // 🟢 Step 4: Show the livestream player
  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#05073C] relative bg-no-repeat bg-center bg-cover " style={{ backgroundImage: "url('/live/Live-bg.png')" }} >
      <div className="w-full h-screen absolute inset-0 bg-black/40 z-20 " />

      <div className="z-40 absolute top-0 left-0 w-full h-full flex items-center justify-center p-5">
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
    </div>
  );
};

export default YouTubeEmbed;
