import { useState } from "react"
import { LocationResourceDataType } from "@/Types/LocationResourceDataType"

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

    const sortedImages = [...data].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
    )

    return (
        <>
            {/* Image Grid */}
            <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedImages.map((image, index) => (
                    <div
                        key={image.id}
                        className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                    >
                        {/* Step Indicator */}
                        <div className="bg-[#05073C] text-white text-xs font-semibold px-3 py-2">
                            Step {index + 1}
                        </div>

                        {/* Image */}
                        <img
                            src={image.content_url}
                            alt={`Step ${index + 1}`}
                            className="w-full h-[250px] object-cover"
                        />
                    </div>
                ))}
            </section>

            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed   inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 py-10 px-5 "
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative bg-white rounded-lg overflow-hidden max-w-3xl w-full h-full "
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
                    >
                        <button
                            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>
                        <img
                            src={selectedImage.content_url}
                            alt="Full size"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    )
}