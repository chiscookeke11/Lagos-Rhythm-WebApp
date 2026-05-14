import { LocationResourceDataType } from "@/Types/LocationResourceDataType"
import { groupStreetRhythmResourcesByLanguage, getStreetRhythmResourceLabel } from "@/lib/street-rhythm"
import StreetRhythmCarousel from "../street-rhythm-2-components/StreetRhythmCarousel"

interface RecordingTabProps {
    data: LocationResourceDataType[] | null
}

export default function RecordingTab({ data }: RecordingTabProps) {
    const groupedRecordings = groupStreetRhythmResourcesByLanguage(data ?? [])

    if (groupedRecordings.length < 1) {
        return (
            <div className="w-full h-[10vh] flex items-center justify-center " >
                <h4 className="text-xl font-medium font-merriweather text-[#05073C] " >No sound recording found!</h4>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col items-center gap-8">
            {groupedRecordings.map((group) => (
                <section key={group.language} className="w-full space-y-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h4 className="text-lg font-black text-[#05073C]">
                            {group.label} Audio Guide
                        </h4>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-[#05073C]">
                            {group.items.length} recording{group.items.length === 1 ? "" : "s"}
                        </span>
                    </div>

                    <StreetRhythmCarousel
                        items={group.items}
                        renderSlide={(sound) => (
                            <article
                                key={sound.id}
                                className="w-full h-full bg-white py-4 px-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-start gap-3"
                            >
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-[#05073C]">
                                        {getStreetRhythmResourceLabel(sound)}
                                    </p>
                                    <p className="text-xs text-gray-500">Language: {group.label}</p>
                                    {sound.description && (
                                        <p className="text-sm text-gray-700 line-clamp-3">{sound.description}</p>
                                    )}
                                </div>

                                <audio controls className="mt-1 w-full">
                                    <source src={sound.content_url} type="audio/mpeg" />
                                    Your browser does not support audio.
                                </audio>
                            </article>
                        )}
                    />
                </section>
            ))}
        </div>
    )
}
