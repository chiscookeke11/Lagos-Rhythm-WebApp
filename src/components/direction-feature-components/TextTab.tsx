import { LocationResourceDataType } from "@/Types/LocationResourceDataType"
import { Download } from "lucide-react"
import Link from "next/link"
import { groupStreetRhythmResourcesByLanguage } from "@/lib/street-rhythm"
import StreetRhythmCarousel from "../street-rhythm-2-components/StreetRhythmCarousel"

interface TextTabProps {
    data: LocationResourceDataType[] | null
}

export default function TextTab({ data }: TextTabProps) {
    const sortedData = [...(data ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    const groupedOverviews = groupStreetRhythmResourcesByLanguage(sortedData)

    if (sortedData.length < 1) {
        return (
            <div className="w-full h-[10vh] flex items-center justify-center">
                <h4 className="text-xl font-medium font-merriweather text-[#05073C]">No overview data found!</h4>
            </div>
        )
    }

    return (
        <section className="w-full flex flex-col gap-8">
            {groupedOverviews.map((group) => (
                <div key={group.language} className="space-y-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h4 className="text-lg font-black text-[#05073C]">
                            {group.label} Overview
                        </h4>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-[#05073C]">
                            {group.items.length} item{group.items.length === 1 ? "" : "s"}
                        </span>
                    </div>

                    <StreetRhythmCarousel
                        items={group.items}
                        renderSlide={(text) => {
                            const routeSummary = text.content_text ?? text.summary ?? text.description
                            const downloadUrl = text.overview_download_url ?? text.content_url
                            const downloadLabel = text.download_label ?? "Download overview"

                            return (
                                <article
                                    key={text.id}
                                    className="w-full h-full rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-7 flex flex-col gap-5"
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#D4422C]">
                                            <span>{text.language ? `${text.language} overview` : "Route overview"}</span>
                                            <span className="text-gray-300">|</span>
                                            <span>{text.route_key}</span>
                                        </div>
                                        <h4 className="text-xl font-black text-[#05073C]">
                                            {text.title ?? `${text.from_location} to ${text.to_location}`}
                                        </h4>
                                        {text.subtitle && (
                                            <p className="text-sm text-gray-500">{text.subtitle}</p>
                                        )}
                                    </div>

                                    <div className="rounded-xl bg-[#F8FAFC] p-4 text-sm leading-7 text-gray-700 whitespace-pre-line">
                                        {routeSummary || "Route summary has not been added yet."}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                                            <h5 className="text-sm font-bold text-[#05073C] mb-2">Fare Information</h5>
                                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                                {text.fare_info ?? "Fare details have not been added yet."}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                            <h5 className="text-sm font-bold text-[#05073C] mb-2">Safety Information</h5>
                                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                                {text.safety_info ?? "Safety notes have not been added yet."}
                                            </p>
                                        </div>
                                    </div>

                                    {downloadUrl && (
                                        <div className="flex justify-start">
                                            <Link
                                                href={downloadUrl}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 rounded-lg bg-[#05073C] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B0F52]"
                                            >
                                                <Download size={16} />
                                                {downloadLabel}
                                            </Link>
                                        </div>
                                    )}
                                </article>
                            )
                        }}
                    />
                </div>
            ))}
        </section>
    )
}
