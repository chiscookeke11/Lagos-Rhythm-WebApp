"use client"

import { useAppContext } from "@/app/context/AppContext"
import VideoTab from "../direction-feature-components/VideoTab"
import TextTab from "../direction-feature-components/TextTab"
import RecordingTab from "../direction-feature-components/RecordingTab"
import ImageTab from "../direction-feature-components/Imagetab"
import AIDirectionTab from "../direction-feature-components/AI_Direction"
import RouteTrafficCard from "./RouteTrafficCard"
import RouteMapTraffic from "./RouteMapTraffic"
import RouteArrivalNotifications from "./RouteArrivalNotifications"
import RouteCommunityChat from "./RouteCommunityChat"

export default function RouteDetails() {
    const {
        selectedRoute,
        from,
        to,
        videoResults,
        textResults,
        soundResults,
        imageResults,
        AIResults
    } = useAppContext()

    const routeResources = selectedRoute?.resources ?? []
    const routeTags = selectedRoute?.tags ?? []
    const languages = selectedRoute?.languages ?? []

    const sections = [
        {
            id: "overview",
            label: "Overview",
            description: "Route summary, fare notes, safety guidance, and downloadable guide materials.",
            content: <TextTab data={textResults} />
        },
        {
            id: "landmarks",
            label: "Landmarks",
            description: "Visual landmarks along the route to help you identify each stage of the journey.",
            content: <ImageTab data={imageResults} />
        },
        {
            id: "watch-route",
            label: "Watch Route",
            description: "Watch the route videos before traveling so you can recognize key stops and transfers.",
            content: <VideoTab data={videoResults} fromStop={from} toStop={to} />
        },
        {
            id: "audio-guide",
            label: "Audio Guide",
            description: "Listen to spoken route guidance by language while traveling.",
            content: <RecordingTab data={soundResults} />
        }
    ]

    return (
        <section id="route" className="w-full py-24 px-[5%] max-w-[1380px] mx-auto flex flex-col items-center gap-16 text-black">
            <div className="flex flex-col items-center gap-3 text-center">
                <h4 className="text-[#D4422C] font-bold text-sm uppercase tracking-wider">
                    Route Details
                </h4>
                <h2 className="text-2xl md:text-4xl font-black">
                    {from} to {to}
                </h2>
            </div>

            <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 text-white">
                    <div className="mb-6">
                        <span className="block text-2xl md:text-3xl font-black">
                            {from}
                        </span>
                        <span className="block text-yellow-400 text-xl my-1">-&gt;</span>
                        <span className="block text-2xl md:text-3xl font-black">
                            {to}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="rounded-xl bg-white/10 p-4">
                            <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Route Key</p>
                            <p className="font-semibold">{selectedRoute?.routeKey ?? "Pending route key"}</p>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4">
                            <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Languages</p>
                            <p className="font-semibold">
                                {languages.length > 0 ? languages.join(", ") : "Not yet defined"}
                            </p>
                        </div>
                        <div className="rounded-xl bg-white/10 p-4">
                            <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Assets</p>
                            <p className="font-semibold">
                                {routeResources.length} resource{routeResources.length === 1 ? "" : "s"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-12">
                    <div className="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-5 md:p-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="text-xl font-black text-[#05073C] mb-2">Route Snapshot</h3>
                                <p className="text-sm text-gray-600">
                                    This route guide is now structured in the order commuters need it:
                                    overview first, then landmarks, route video, and audio guidance.
                                </p>
                            </div>

                            {routeTags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {routeTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-semibold text-[#05073C]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="rounded-lg border border-[#05073C] px-4 py-2 text-sm font-semibold text-[#05073C] transition-colors hover:bg-[#05073C] hover:text-white"
                                    >
                                        {section.label}
                                    </a>
                                ))}
                                <a
                                    href="#route-map"
                                    className="rounded-lg border border-[#05073C] px-4 py-2 text-sm font-semibold text-[#05073C] transition-colors hover:bg-[#05073C] hover:text-white"
                                >
                                    Route Map
                                </a>
                                <a
                                    href="#arrival-notifications"
                                    className="rounded-lg border border-[#05073C] px-4 py-2 text-sm font-semibold text-[#05073C] transition-colors hover:bg-[#05073C] hover:text-white"
                                >
                                    Arrival Alerts
                                </a>
                                <a
                                    href="#community-chat"
                                    className="rounded-lg border border-[#05073C] px-4 py-2 text-sm font-semibold text-[#05073C] transition-colors hover:bg-[#05073C] hover:text-white"
                                >
                                    Community Chat
                                </a>
                                {AIResults && AIResults.length > 0 && (
                                    <a
                                        href="#ai-direction"
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                                    >
                                        AI Direction
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {sections.map((section) => (
                        <section key={section.id} id={section.id} className="border-t pt-10 scroll-mt-24">
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-[#05073C]">{section.label}</h3>
                                <p className="text-sm text-gray-600 mt-2">{section.description}</p>
                            </div>
                            {section.content}
                        </section>
                    ))}

                    <section id="travel-time" className="border-t pt-10 scroll-mt-24">
                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-[#05073C]">Traffic & Travel Time</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Live estimate comparing normal route duration and current traffic duration.
                            </p>
                        </div>
                        <RouteTrafficCard from={from} to={to} />
                    </section>

                    <section id="route-map" className="border-t pt-10 scroll-mt-24">
                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-[#05073C]">Google Maps & Traffic Layer</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Route path with live road conditions rendered directly on Google Maps.
                            </p>
                        </div>
                        <RouteMapTraffic from={from} to={to} />
                    </section>

                    <section id="arrival-notifications" className="border-t pt-10 scroll-mt-24">
                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-[#05073C]">Arrival Notifications</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Browser alerts at 5 km, 1 km, and 500 m from destination.
                            </p>
                        </div>
                        <RouteArrivalNotifications destination={to} />
                    </section>

                    <section id="community-chat" className="border-t pt-10 scroll-mt-24">
                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-[#05073C]">Community Chat</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Real-time commuter updates from people currently using this route.
                            </p>
                        </div>
                        <RouteCommunityChat routeKey={selectedRoute?.routeKey} from={from} to={to} />
                    </section>

                    {AIResults && AIResults.length > 0 && (
                        <section id="ai-direction" className="border-t pt-10 scroll-mt-24">
                            <div className="mb-6">
                                <h3 className="text-2xl font-black text-[#05073C]">AI Direction</h3>
                                <p className="text-sm text-gray-600 mt-2">
                                    Additional route intelligence generated from the same route resource set.
                                </p>
                            </div>
                            <AIDirectionTab data={AIResults} />
                        </section>
                    )}
                </div>
            </div>
        </section>
    )
}
