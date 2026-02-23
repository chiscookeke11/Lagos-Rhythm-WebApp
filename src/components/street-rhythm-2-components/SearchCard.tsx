"use client"

import { useAppContext } from "@/app/context/AppContext";
import { LocateFixed } from "lucide-react";
import Loader from "../common/Loader";




export default function SearchCard() {
const {to, from, setTo, setFrom, findDirection, loading, locationInWords } = useAppContext()


    return (
        <form onSubmit={findDirection} className="w-full bg-white rounded-2xl flex flex-col items-start px-7 py-10 gap-5 " >

            <div className=" text-[#0A0E14] flex items-center gap-3 justify-around text-[1.5rem] font-black " >
                <span className="mb-3 size-[50px] rounded-xl bg-gradient-to-br from-[#D4422C] to-[#F7B32B] flex items-center justify-center " >
                    🎯
                </span>
                Route Finder
            </div>



            {/* From Input */}
            <div className="relative flex items-center w-full">
                <span className="absolute left-3">📍</span>
                <input
                    type="text"
                    placeholder="Starting point (e.g., Yaba)"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full pl-10 pr-16 py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
                <button
                    type="button"
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setFrom(locationInWords ?? "")}
                    title="Use current location"
                >
                    <LocateFixed size={20} color="black" />
                </button>
            </div>


            {/* To Input */}
            <div className="relative flex items-center w-full">
                <span className="absolute left-3">🎯</span>
                <input
                    type="text"
                    placeholder="Destination (e.g., Maryland)"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
            </div>


            {/* Submit Button */}
            <button
            disabled={loading}
                className="bg-[#0A0E14] w-full py-3 md:py-5 px-7 md:px-10 text-white font-semibold text-sm md:text-xl rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl flex items-center justify-center gap-2"
            >
                {loading? <Loader/> : "Search Routes"}
            </button>
        </form>
    )
}