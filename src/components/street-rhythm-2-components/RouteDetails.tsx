"use client"

import { useAppContext } from "@/app/context/AppContext"
import VideoTab from "../direction-feature-components/VideoTab"
import TextTab from "../direction-feature-components/TextTab"
import RecordingTab from "../direction-feature-components/RecordingTab"
import ImageTab from "../direction-feature-components/Imagetab"
import AIDirectionTab from "../direction-feature-components/AI_Direction"

export default function RouteDetails() {
    const {
        from,
        to,
        currentTab,
        videoResults,
        textResults,
        soundResults,
        imageResults,
        AIResults,
        setCurrentTab
    } = useAppContext()


    const tabs = [
        "Videos",
        "Text",
        "Sound recording",
        "image",
        "AI direction",
    ] as const

    return (
        <section id="route" className="w-full py-24 px-[5%] max-w-[1380px] mx-auto flex flex-col items-center gap-16 text-black">

            {/* Header */}
            <div className="flex flex-col items-center gap-3 text-center">
                <h4 className="text-[#D4422C] font-bold text-sm uppercase tracking-wider">
                    Route Details
                </h4>
                <h2 className="text-2xl md:text-4xl font-black">
                    {from} to {to}
                </h2>
            </div>

            {/* Route Card */}
            <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">

                {/* Route Header */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 text-white">
                    <div className="mb-5">
                        <span className="block text-2xl md:text-3xl font-black">
                            {from}
                        </span>
                        <span className="block text-yellow-400 text-xl my-1">↓</span>
                        <span className="block text-2xl md:text-3xl font-black">
                            {to}
                        </span>
                    </div>
                </div>

                {/* Route Body */}
                <div className="p-6 md:p-8 space-y-12">

                    {/* ---- STATIC ROUTE INFO (transport, fare, safety etc.) ---- */}
                    {/* Keep your existing detail sections here */}

                    {/* =============================== */}
                    {/* RESULTS TABS SECTION */}

                    <div className="w-full flex items-center gap-3 overflow-x-auto py-3 px-4 bg-gray-100 rounded-lg">

                        {tabs.map((tab) => {

                            const isActive = currentTab === tab

                            return (
                                <button
                                    key={tab}
                                    onClick={() => setCurrentTab(tab)}
                                    className={`
          shrink-0 font-medium rounded-md py-2 px-5 text-xs transition-all duration-300 border
          ${isActive
                                            ? "bg-[#05073C] text-white border-[#05073C] shadow-md"
                                            : "bg-white text-[#05073C] border-gray-300 hover:bg-[#05073C] hover:text-white"
                                        }
        `}
                                >
                                    {tab === "Text" ? "Text direction" :
                                        tab === "image" ? "Landmarks" :
                                            tab}
                                </button>
                            )
                        })}
                    </div>
                    {/* =============================== */}

                    <div className="border-t pt-10">

                        <h3 className="text-xl font-bold mb-6">
                            Route Guide Content
                        </h3>

                        <div className="w-full mt-5">

                            {currentTab === "Videos" && (
                                <VideoTab data={videoResults} />
                            )}

                            {currentTab === "Text" && (
                                <TextTab data={textResults} />
                            )}

                            {currentTab === "Sound recording" && (
                                <RecordingTab data={soundResults} />
                            )}

                            {currentTab === "image" && (
                                <ImageTab data={imageResults} />
                            )}

                            {currentTab === "AI direction" && (
                                <AIDirectionTab data={AIResults} />
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}