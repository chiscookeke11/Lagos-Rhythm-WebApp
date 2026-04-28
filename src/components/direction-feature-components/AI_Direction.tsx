



import { LocationResourceDataType } from "@/Types/LocationResourceDataType"
import { getStreetRhythmResourceLabel } from "@/lib/street-rhythm"

interface AIDirectionTabProps {
    data: LocationResourceDataType[] | null
}

export default function AIDirectionTab({ data }: AIDirectionTabProps) {
    if (!data || data.length < 1) {
        return (
            <div className="w-full h-[10vh] flex items-center justify-center">
                <h4 className="text-xl font-medium font-merriweather text-[#05073C]">No AI directions available for this route.</h4>
            </div>
        )
    }

    return (
        <section className="w-full flex flex-col gap-4">
            {data.map((item, index) => (
                <article
                    key={item.id ?? index}
                    className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-5 flex flex-col gap-3"
                >
                    <div className="flex items-center gap-3">
                        <span className="size-8 rounded-full bg-gradient-to-br from-[#D4422C] to-[#F7B32B] flex items-center justify-center text-white text-xs font-black">
                            {index + 1}
                        </span>
                        <h4 className="text-base font-bold text-[#05073C]">
                            {getStreetRhythmResourceLabel(item)}
                        </h4>
                    </div>

                    {item.content_text && (
                        <p className="text-sm text-gray-700 leading-7 whitespace-pre-line bg-[#F8FAFC] rounded-xl p-4">
                            {item.content_text}
                        </p>
                    )}

                    {!item.content_text && item.description && (
                        <p className="text-sm text-gray-700 leading-7 whitespace-pre-line bg-[#F8FAFC] rounded-xl p-4">
                            {item.description}
                        </p>
                    )}

                    {item.content_url && (
                        <a
                            href={item.content_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-[#D4422C] underline"
                        >
                            View full AI direction
                        </a>
                    )}
                </article>
            ))}
        </section>
    )
}