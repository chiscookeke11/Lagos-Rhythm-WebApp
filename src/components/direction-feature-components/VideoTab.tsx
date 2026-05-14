import { LocationResourceDataType } from "@/Types/LocationResourceDataType"
import { groupStreetRhythmResourcesByLanguage, getStreetRhythmResourceLabel } from "@/lib/street-rhythm"
import StreetRhythmCarousel from "../street-rhythm-2-components/StreetRhythmCarousel"
import { useEffect, useMemo, useRef, useState } from "react"

interface VideoTabProps {
    data: LocationResourceDataType[] | null
    fromStop?: string
    toStop?: string
}

interface SegmentRange {
    start: number
    end: number
    fromLabel: string
    toLabel: string
}

const normalizeStopName = (value: string) => value.trim().toLowerCase()

function resolveSegmentRange(video: LocationResourceDataType, fromStop?: string, toStop?: string): SegmentRange | null {
    if (!fromStop || !toStop || !video.segment_stops || video.segment_stops.length < 1) return null

    const normalizedFrom = normalizeStopName(fromStop)
    const normalizedTo = normalizeStopName(toStop)

    const fromMarker = video.segment_stops.find((stop) => {
        const stopName = normalizeStopName(stop.normalized_stop_name ?? stop.stop_name)
        return stopName === normalizedFrom || stopName.includes(normalizedFrom)
    })

    const toMarker = video.segment_stops.find((stop) => {
        const stopName = normalizeStopName(stop.normalized_stop_name ?? stop.stop_name)
        return stopName === normalizedTo || stopName.includes(normalizedTo)
    })

    if (fromMarker?.video_start !== undefined && toMarker?.video_end !== undefined && fromMarker.video_start < toMarker.video_end) {
        return {
            start: fromMarker.video_start,
            end: toMarker.video_end,
            fromLabel: fromMarker.stop_name,
            toLabel: toMarker.stop_name
        }
    }

    if (fromMarker?.video_start !== undefined && fromMarker?.video_end !== undefined) {
        return {
            start: fromMarker.video_start,
            end: fromMarker.video_end,
            fromLabel: fromMarker.stop_name,
            toLabel: fromMarker.stop_name
        }
    }

    if (toMarker?.video_start !== undefined && toMarker?.video_end !== undefined) {
        return {
            start: toMarker.video_start,
            end: toMarker.video_end,
            fromLabel: toMarker.stop_name,
            toLabel: toMarker.stop_name
        }
    }

    return null
}

function SegmentedVideoPlayer({
    video,
    segmentRange,
}: {
    video: LocationResourceDataType
    segmentRange: SegmentRange | null
}) {
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const segmentText = useMemo(() => {
        if (!segmentRange) return null
        return `${segmentRange.fromLabel} -> ${segmentRange.toLabel} (${segmentRange.start}s - ${segmentRange.end}s)`
    }, [segmentRange])

    const playSegment = () => {
        if (!videoRef.current || !segmentRange) return
        videoRef.current.currentTime = segmentRange.start
        void videoRef.current.play()
    }

    const onTimeUpdate = () => {
        if (!videoRef.current || !segmentRange) return

        if (videoRef.current.currentTime >= segmentRange.end) {
            videoRef.current.pause()
        }
    }

    return (
        <>
            <video
                ref={videoRef}
                className="w-full h-[220px] bg-black rounded-lg overflow-hidden"
                preload="metadata"
                controls
                onTimeUpdate={onTimeUpdate}
            >
                <source src={video.content_url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {segmentRange && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 space-y-2">
                    <p className="text-xs text-amber-800 font-semibold">Matched Segment</p>
                    <p className="text-xs text-amber-700">{segmentText}</p>
                    <button
                        type="button"
                        onClick={playSegment}
                        className="rounded-md bg-[#05073C] px-3 py-2 text-xs font-semibold text-white"
                    >
                        Play Matched Segment
                    </button>
                </div>
            )}
        </>
    )
}

export default function VideoTab({ data, fromStop, toStop }: VideoTabProps) {
    const groupedVideos = groupStreetRhythmResourcesByLanguage(data ?? [])
    const [selectedFromStop, setSelectedFromStop] = useState(fromStop ?? "")
    const [selectedToStop, setSelectedToStop] = useState(toStop ?? "")

    useEffect(() => {
        setSelectedFromStop(fromStop ?? "")
    }, [fromStop])

    useEffect(() => {
        setSelectedToStop(toStop ?? "")
    }, [toStop])

    const stopOptions = useMemo(() => {
        const values = new Set<string>()

        for (const video of data ?? []) {
            for (const stop of video.segment_stops ?? []) {
                const label = stop.stop_name?.trim()
                if (label) values.add(label)
            }
        }

        return [...values].sort((left, right) => left.localeCompare(right))
    }, [data])

    const effectiveFromStop = selectedFromStop || fromStop
    const effectiveToStop = selectedToStop || toStop

    if (groupedVideos.length < 1) {
        return (
            <div className="w-full h-[10vh] flex items-center justify-center " >
                <h4 className="text-xl font-medium font-merriweather text-[#05073C] " >No video found!</h4>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col items-center gap-8">
            <span className="text-sm font-medium text-[#05073C]">
                {data?.length} video{data && data?.length > 1 ? "s" : ""} found
            </span>

            {stopOptions.length > 0 && (
                <div className="w-full rounded-2xl border border-gray-200 bg-[#F8FAFC] p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Segment Start Stop</span>
                        <select
                            value={selectedFromStop}
                            onChange={(event) => setSelectedFromStop(event.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#05073C]/20"
                        >
                            <option value="">Use searched origin ({fromStop || "n/a"})</option>
                            {stopOptions.map((stop) => (
                                <option key={stop} value={stop}>{stop}</option>
                            ))}
                        </select>
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Segment End Stop</span>
                        <select
                            value={selectedToStop}
                            onChange={(event) => setSelectedToStop(event.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#05073C]/20"
                        >
                            <option value="">Use searched destination ({toStop || "n/a"})</option>
                            {stopOptions.map((stop) => (
                                <option key={stop} value={stop}>{stop}</option>
                            ))}
                        </select>
                    </label>
                </div>
            )}

            {groupedVideos.map((group) => (
                <section key={group.language} className="w-full space-y-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h4 className="text-lg font-black text-[#05073C]">
                            {group.label} Video Guide
                        </h4>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-[#05073C]">
                            {group.items.length} clip{group.items.length === 1 ? "" : "s"}
                        </span>
                    </div>

                    <StreetRhythmCarousel
                        items={group.items}
                        renderSlide={(video) => {
                            const segmentRange = resolveSegmentRange(video, effectiveFromStop, effectiveToStop)

                            return (
                                <article
                                    key={video.id}
                                    className="w-full h-full rounded-2xl border border-gray-200 bg-white shadow-sm p-4 flex flex-col gap-3"
                                >
                                    <SegmentedVideoPlayer video={video} segmentRange={segmentRange} />

                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-[#05073C]">
                                            {getStreetRhythmResourceLabel(video)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Language: {group.label}
                                        </p>
                                        {video.description && (
                                            <p className="text-sm text-gray-700 line-clamp-3">
                                                {video.description}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            )
                        }}
                    />
                </section>
            ))}
        </div>
    )
}
