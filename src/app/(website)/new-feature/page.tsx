"use client"

import type React from "react"

import { fireDB } from "@/app/config/firebaseClient"
import Loader from "@/components/common/Loader"
import AIDirectionTab from "@/components/direction-feature-components/AI_Direction"
import ImageTab from "@/components/direction-feature-components/Imagetab"
import RecordingTab from "@/components/direction-feature-components/RecordingTab"
import TextTab from "@/components/direction-feature-components/TextTab"
import VideoTab from "@/components/direction-feature-components/VideoTab"
import type { LocationResourceDataType } from "@/Types/LocationResourceDataType"
import { collection, getDocs, query, where } from "firebase/firestore"
import { LocateFixed, MapPin, Send } from "lucide-react"
import { useEffect, useState } from "react"
import DirectionHero from "@/components/direction-feature-components/DirectionHero"

export default function Page() {
    const [currentTab, setCurrentTab] = useState<"Videos" | "Text" | "AI direction" | "Sound recording" | "image">(
        "Videos",
    )
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<LocationResourceDataType[] | null>(null)
    const [videoResults, setVideoResults] = useState<LocationResourceDataType[] | null>([])
    const [textResults, setTextResults] = useState<LocationResourceDataType[] | null>([])
    const [soundResults, setSoundResults] = useState<LocationResourceDataType[] | null>([])
    const [imageResults, setImageResults] = useState<LocationResourceDataType[] | null>([])
    const [locationInWords, setLocationInWords] = useState<string | null>(null)

    const normalizeText = (text: string) => {
        return text.toLowerCase().trim()
    }

    const fromNormalized = normalizeText(from)
    const toNormalized = normalizeText(to)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude

            const address = await getAddressFromCoords(lat, lng)
            setLocationInWords(address)
        })
    }, [])

    // function to search database for resources
    const findDirection = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        // Query 1: Find routes starting from the origin
        const q1 = query(
            collection(fireDB, "routes_resources"),
            where("from_keywords", "array-contains-any", [fromNormalized]),
        )

        // Query 2: Find routes ending at the destination
        const q2 = query(collection(fireDB, "routes_resources"), where("to_keywords", "array-contains-any", [toNormalized]))

        // Execute both queries in parallel
        const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)])

        const data1 = snapshot1.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<LocationResourceDataType, "id">),
        }))

        const data2 = snapshot2.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<LocationResourceDataType, "id">),
        }))

        // Find routes that appear in both queries (matching both from and to)
        const mergedData = data1.filter((route) => data2.some((r) => r.id === route.id))
        console.log(mergedData)
        setResults(mergedData)
        setLoading(false)
        setCurrentTab("Videos")
    }

    // Filter results based on resource type after fetching the related results
    const filterVideos = () => {
        if (!results) return

        const videoResources = results.filter((resource) => resource.type.toLocaleLowerCase() === "video")
        setVideoResults(videoResources)
    }

    const filterTextResources = () => {
        if (!results) return

        const textResources = results.filter((resource) => resource.type.toLocaleLowerCase() === "text")
        setTextResults(textResources)
    }

    const filterImageResources = () => {
        if (!results) return

        const imageResources = results.filter((resource) => resource.type.toLocaleLowerCase() === "image")
        setImageResults(imageResources)
    }

    const filterSoundResources = () => {
        if (!results) return

        const soundResources = results.filter((resource) => resource.type.toLocaleLowerCase() === "sound")
        setSoundResults(soundResources)
    }

    // The function then runs once there is a change in results
    useEffect(() => {
        filterVideos()
        filterTextResources()
        filterImageResources()
        filterSoundResources()
    }, [results])

    // converting geolocation coordinates to words
    const getAddressFromCoords = async (lat: number, lng: number) => {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)

        const data = await res.json()
        return data.display_name
    }



    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center py-32  px-[4%] gap-6 text-black relative bg-[#05073C]  ">


            <DirectionHero />

            <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-5 lg:gap-10  mt-20 ">
                {/* The route search component  */}
                <div className=" w-full max-w-sm h-fit rounded-sm flex flex-col items-start gap-3 bg-[#FDF4F1] px-4 py-6 font-merriweather">
                    <h3 className="font-semibold text-xl text-[#05073C]  ">Route Search bar</h3>

                    <form onSubmit={findDirection} className="w-full h-fit flex flex-col items-center gap-3  rounded-sm py-2 ">
                        <span className="w-full flex gap-2 items-center py-2 px-2  border rounded-xs  border-black ">
                            <MapPin size={15} color="#EB662B" />

                            <input
                                placeholder="Starting point..."
                                type="text"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className=" w-full border-none outline-none text-sm"
                            />

                            <button
                                type="button"
                                className="cursor-pointer"
                                onClick={() => setFrom(locationInWords ?? "")}
                                title="current location"
                            >
                                <LocateFixed size={20} />
                            </button>
                        </span>

                        <span className="w-full  flex gap-2 items-center py-2 px-2  border rounded-xs  border-black  ">
                            <Send size={15} color="#EB662B" />
                            <input
                                placeholder="Destination..."
                                type="text"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className=" w-full border-none outline-none  text-sm"
                            />
                        </span>

                        <button
                            disabled={loading}
                            className="w-full p-2 flex items-center justify-center bg-[#EB662B] hover:bg-[#EF8F57] text-white font-medium text-sm cursor-pointer rounded-xs transition-all duration-300 ease-in-out "
                        >
                            {loading ? <Loader /> : "Find Route"}
                        </button>
                    </form>
                </div>

                {/* The displayed results  */}
                {results ? (
                    <>
                        <div className="w-full h-fit py-5 px-3 lg:px-5 bg-[#FDF4F1] max-w-6xl rounded-sm font-merriweather flex flex-col items-start gap-5 ">
                            <h3 className="font-semibold text-2xl text-[#05073C] mx-auto mb-5 ">Results  {results ? `for ${from.toUpperCase()} to ${to.toUpperCase()} ` : ""} </h3>

                            <div className="w-full flex items-center gap-5 overflow-x-auto py-2 px-4 bg-gray-200 ">
                                <button
                                    onClick={() => setCurrentTab("Videos")}
                                    className="bg-[#05073C] shrink-0 font-medium text-white rounded-xs py-2 px-5 flex items-center justify-center cursor-pointer text-xs hover:bg-white hover:text-[#05073C] transition-all duration-200 ease-in-out border border-gray-400 "
                                >
                                    Videos
                                </button>

                                <button
                                    onClick={() => setCurrentTab("Text")}
                                    className="bg-[#05073C] shrink-0 font-medium text-white rounded-xs py-2 px-5 flex items-center justify-center cursor-pointer text-xs hover:bg-white hover:text-[#05073C] transition-all duration-200 ease-in-out border border-gray-400"
                                >
                                    Text direction
                                </button>

                                <button
                                    onClick={() => setCurrentTab("Sound recording")}
                                    className="bg-[#05073C] shrink-0 font-medium text-white rounded-xs py-2 px-5 flex items-center justify-center cursor-pointer text-xs hover:bg-white hover:text-[#05073C] transition-all duration-200 ease-in-out border border-gray-400"
                                >
                                    Sound Recording
                                </button>

                                <button
                                    onClick={() => setCurrentTab("image")}
                                    className="bg-[#05073C] shrink-0 font-medium text-white rounded-xs py-2 px-5 flex items-center justify-center cursor-pointer text-xs hover:bg-white hover:text-[#05073C] transition-all duration-200 ease-in-out border border-gray-400"
                                >
                                    Image
                                </button>

                                <button
                                    onClick={() => setCurrentTab("AI direction")}
                                    className="bg-[#05073C] shrink-0 font-medium text-white rounded-xs py-2 px-5 flex items-center justify-center cursor-pointer text-xs hover:bg-white hover:text-[#05073C] transition-all duration-200 ease-in-out border border-gray-400"
                                >
                                    AI direction
                                </button>
                            </div>
                            <div className=" w-full h-fit mt-5 ">
                                {currentTab === "Videos" && <VideoTab data={videoResults} />}
                                {currentTab === "Text" && <TextTab data={textResults} />}
                                {currentTab === "Sound recording" && <RecordingTab data={soundResults} />}
                                {currentTab === "image" && <ImageTab data={imageResults} />}
                                {currentTab === "AI direction" && <AIDirectionTab data={imageResults} />}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-[20vh] py-5 px-3 lg:px-5 bg-[#FDF4F1] max-w-6xl rounded-sm font-merienda flex flex-col items-center justify-center gap-5 ">
                        <h3 className="font-semibold text-xl md:text-2xl text-[#05073C]  ">Find a location</h3>
                    </div>
                )}
            </div>
        </div>
    )
}
