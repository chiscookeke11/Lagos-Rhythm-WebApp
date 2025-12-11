"use client"

import {SendHorizontal, Sparkle, Timer } from "lucide-react";
import Marquee from "react-fast-marquee";
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useState } from "react";
import { mock_tour_data } from "@/data/mockTourData";

export default function Page() {
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState<number>(0);

    const tourTime = new Date(mock_tour_data.date);

    // Countdown timer
    useEffect(() => {
        const endTime = new Date(tourTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours after start

        const interval = setInterval(() => {
            const now = new Date();
            const remaining = endTime.getTime() - now.getTime();
            setCountdown(remaining > 0 ? remaining : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [tourTime]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-start bg-[#05073C] relative bg-no-repeat bg-center bg-cover font-merienda">

            {/* Header */}
            <header className="w-full bg-[#05073C] py-6 px-[4%] flex items-center justify-evenly gap-12 flex-wrap">
                <span className="flex items-center gap-2 text-xs md:text-sm">
                    {countdown > 0 && <><span className="w-3 h-3 bg-red-700 rounded-sm block" />Live Now</>}
                </span>

                <h1 className="text-xl md:text-2xl text-center">{mock_tour_data.tourTitle}</h1>

                <div className="w-fit flex items-center gap-3">
                    <div className="flex w-fit items-center">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-3 w-3 md:h-7 md:w-7 rounded-full bg-red-700 border border-purple-950 flex items-center justify-center ml-[-10px]"></div>
                        ))}
                    </div>
                    <p className="text-xs md:text-sm">27 Watching</p>
                </div>

                <div className="w-fit flex items-center gap-2">
                    <Timer size={20} />
                    <p className="text-xs md:text-sm">{countdown > 0 ? formatTime(countdown) : "Tour ended"}</p>
                </div>
            </header>

            {/* Hero Section */}
            <section className="w-full h-[90vh] flex items-center justify-center bg-no-repeat bg-center bg-cover relative" style={{ backgroundImage: "url('/live/Live-bg.png')" }}>
                <div className="w-full h-full absolute inset-0 bg-black/40 z-20" />

                <div className="z-40 absolute top-0 left-0 w-full h-full flex items-center justify-center p-5">
                    <video
                        src={mock_tour_data.videoUrl}
                        autoPlay
                        controls
                        muted
                        loop={false}
                        className="w-full max-w-4xl h-full object-cover object-center"
                    />
                </div>

            </section>

            {/* Stats Marquee */}
            <div className="pt-6 bg-[#05073C] w-full flex flex-col gap-3 items-center justify-center">
                <div className="w-full bg-black/40 backdrop-blur-xs py-2">
                    <Marquee>
                        {mock_tour_data.tags.map((text, index) => (
                            <span key={index} className="block">
                                <h3 className="font-lato text-sm md:text-base font-semibold text-[#ffffff] mx-10 flex items-center gap-2">
                                    <Sparkle color="#FFD700" size={15} /> {text} <Sparkle color="#FFD700" size={15} />
                                </h3>
                            </span>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Chat Section */}
            <section className="w-full flex flex-col items-start gap-4 bg-blue-950 py-12">
                <h2 className="ml-10 text-xl lg:text-2xl">Talking Drum</h2>
                <hr className="w-full border-[0.5px] border-gray-600 my-5" />

                <div className="w-[97%] lg:w-[80%] h-[200px] flex items-center justify-start gap-4 border border-gray-500 py-5 px-4 border-l-2 border-l-yellow-500 rounded-lg mx-auto">
                    <div className="h-12 w-12 rounded-full flex-shrink-0 bg-red-700 border border-purple-950 flex items-center justify-center"></div>
                    <div className="flex flex-col flex-1 items-start gap-1 w-full">
                        <div className="flex items-center gap-4">
                            <h4 className="text-sm md:text-base">{mock_tour_data.hostName}</h4>
                            <span className="text-sm md:text-base font-medium">Host</span>
                        </div>
                        <p className="text-white text-sm md:text-base">The message the host sends on the call</p>
                    </div>
                </div>

                {/* Textarea */}
                <form className="w-[95%] lg:w-[80%] mx-auto bg-white/20 backdrop-blur-2xl py-4 px-4 rounded-xl border border-gray-500 mt-3 flex items-center gap-10">
                    <input
                        name="message"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share your thoughts on this tour..."
                        className="w-full h-full text-sm md:text-base outline-none border-none"
                    />
                    <button className="h-10 w-10 bg-[#EB662B] rounded-sm flex items-center justify-center p-2 cursor-pointer">
                        <SendHorizontal size={20} />
                    </button>
                </form>

                {/* Emoji Picker */}
                <div className="mx-auto w-[95%] lg:w-[80%] flex items-center gap-3 px-[4%] mt-5">
                    <EmojiPicker
                        width={"100%"}
                        height={400}
                        onEmojiClick={(emojiData) => setMessage(prev => prev + emojiData.emoji)}
                    />
                </div>
            </section>
        </div>
    );
}
