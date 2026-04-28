import { useState } from "react"
import { LocationResourceDataType } from "@/Types/LocationResourceDataType"
import { X } from "lucide-react"
import StreetRhythmCarousel from "../street-rhythm-2-components/StreetRhythmCarousel"

interface ImageTabProps {
    data: LocationResourceDataType[] | null
}

export default function ImageTab({ data }: ImageTabProps) {
    const [selectedImage, setSelectedImage] = useState<LocationResourceDataType | null>(null)

    if (!data || data.length === 0) {
        return (
            <div className="w-full h-[15vh] flex items-center justify-center">
                <h4 className="text-xl font-medium font-merriweather text-[#05073C]">
                    No images found!
                </h4>
            </div>
        )
    }

    const sortedImages = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

    const getLandmarkTitle = (image: LocationResourceDataType, index: number) => {
        return image.landmark_title
            ?? image.landmark_name
            ?? image.title
            ?? image.subtitle
            ?? image.description
            ?? `Landmark ${index + 1}`
    }

    return (
        <>
            <section className="w-full">
                <StreetRhythmCarousel
                    items={sortedImages}
                    renderSlide={(image, index) => (
                    <div
                        key={image.id}
                        className="w-full h-full rounded-lg overflow-hidden shadow-md border border-gray-200 cursor-pointer bg-white"
                        onClick={() => setSelectedImage(image)}
                    >
                        <div className="bg-[#05073C] text-white text-xs font-semibold px-3 py-2">
                            {getLandmarkTitle(image, index)}
                        </div>

                        <img
                            src={image.content_url}
                            alt={getLandmarkTitle(image, index)}
                            className="w-full h-[250px] object-cover"
                        />

                        {(image.subtitle || image.description) && (
                            <div className="p-4 bg-white">
                                {image.subtitle && (
                                    <p className="text-xs font-semibold uppercase tracking-wide text-[#D4422C] mb-1">
                                        {image.subtitle}
                                    </p>
                                )}
                                <p className="text-sm text-gray-700 line-clamp-3">
                                    {image.description}
                                </p>
                            </div>
                        )}
                    </div>
                    )}
                />
            </section>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-6"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 z-10 text-white bg-black/60 rounded-full p-2 hover:bg-black/80"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Close landmark preview"
                        >
                            <X size={18} />
                        </button>

                        <div className="w-full overflow-y-auto">
                            <img
                                src={selectedImage.content_url}
                                alt={selectedImage.landmark_title ?? selectedImage.landmark_name ?? selectedImage.title ?? "Landmark preview"}
                                className="w-full max-h-[70vh] object-contain bg-black"
                            />

                            <div className="p-5 sm:p-6 space-y-2">
                                <h4 className="text-xl font-black text-[#05073C]">
                                    {selectedImage.landmark_title ?? selectedImage.landmark_name ?? selectedImage.title ?? "Landmark"}
                                </h4>
                                {selectedImage.subtitle && (
                                    <p className="text-sm font-semibold uppercase tracking-wide text-[#D4422C]">
                                        {selectedImage.subtitle}
                                    </p>
                                )}
                                <p className="text-sm text-gray-700 whitespace-pre-line">
                                    {selectedImage.description || "Landmark notes have not been added yet."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
