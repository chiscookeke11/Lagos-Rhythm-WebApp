"use client"


import { useAppContext } from "@/app/context/AppContext"
import Button from "@/components/common/Button"
import LazyLoader from "@/components/common/LazyLoader"
import GalleryImageUploadForm from "@/components/dashboard/GalleryImageUploadForm"
import { deleteItem } from "@/lib/utils"
import { galleryTypes } from "@/Types/galleryType"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Trash } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"



export default function Page() {



    const [selectedFrame, setSelectedFrame] = useState(0)
    const [showFrame, setShowFrame] = useState(false)
    const [imageLoadStates, setImageLoadStates] = useState<{ [key: number]: boolean }>({})
    const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})
    const [showGalleryForm, setShowGalleryForm] = useState(false)
    const { galleryImages, setGalleryImages } = useAppContext()
    const [deleting, setDeleting] = useState(false)


    const size = (index: number) => {
        switch (index) {
            case 3:
                return "lg:col-span-2 lg:row-span-1"
            case 5:
                return "lg:col-span-2 lg:row-span-1"
            case 9:
                return "lg:col-span-2 lg:row-span-1"
            default:
                return "col-span-1 row-span-1"
        }
    }

    useEffect(() => {
        document.body.style.overflowY = showFrame ? "hidden" : "auto"
    }, [showFrame])

    const handleNextFrame = () => {
        if (galleryImages && selectedFrame >= galleryImages.length - 1) {
            return
        }
        setSelectedFrame((prev) => prev + 1)
    }

    const handlePrevFrame = () => {
        if (selectedFrame <= 0) {
            return
        }
        setSelectedFrame((prev) => prev - 1)
    }

    const handleImageLoad = (index: number) => {
        setImageLoadStates((prev) => ({ ...prev, [index]: true }))
    }

    const handleImageError = (index: number) => {
        setImageErrors((prev) => ({ ...prev, [index]: true }))
        setImageLoadStates((prev) => ({ ...prev, [index]: true })) // Stop showing loader
    }






    const AddImageToUI = (newImage: galleryTypes) => {
        setGalleryImages((prev) => {
            if (!prev) {
                return [newImage]
            }
            else {
                return [newImage, ...prev]
            }
        })
    }

    const removeImageFromUI = (id: string) => {
        setGalleryImages(prev => (prev ? prev.filter(galleryImage => galleryImage.id !== id) : null))
    }



    const handleDelete = async (id: string) => {

        setDeleting(true)

        const toastId = toast.loading("Deleting image")
        setShowFrame(false)


        try {
            await deleteItem(id, "gallery")
            toast.success("Image has been deleted successfully")
            removeImageFromUI(id)
        }
        catch (error) {
            console.error(error)
            toast.error("Failed to delete image")
        }
        finally {
            toast.dismiss(toastId)
            setDeleting(false)
        }
    }





    function ImagePreview({ image, text, id }: { image: string; text: string, id: string }) {
        const [previewLoaded, setPreviewLoaded] = useState(false)
        const [previewError, setPreviewError] = useState(false)

        return (
            <motion.div
                onClick={() => setShowFrame(false)}
                className="bg-transparent backdrop-blur-2xl w-full h-screen flex items-center justify-center fixed top-0 left-0 z-50 p-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    title={text}
                    className="w-full mx-auto max-w-2xl h-full max-h-[83.333333%] flex items-center justify-center relative bg-white rounded-lg overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    {/* Loading state for preview */}
                    {!previewLoaded && !previewError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <LazyLoader />
                        </div>
                    )}

                    {/* Error state for preview */}
                    {previewError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <p className="text-gray-500">Failed to load image</p>
                        </div>
                    )}

                    <Image
                        src={image || "/placeholder.svg"}
                        alt="image"
                        height={1000}
                        width={1000}
                        className="absolute top-0 left-0 h-full w-full object-cover object-center"
                        onLoad={() => setPreviewLoaded(true)}
                        onError={() => setPreviewError(true)}
                    />

                    <div className="absolute bottom-0 left-0 w-full h-fit bg-black/40 backdrop-blur-sm py-4 px-3 flex items-center justify-between ">
                        <p className="text-base font-bold font-merriweather text-white">{text}</p>
                        <button disabled={deleting} onClick={() => handleDelete(id)} className="  cursor-pointer p-1 bg-white rounded-full text-[#EF8F57]  " ><Trash/></button>
                    </div>

                    <button
                        disabled={selectedFrame >= (galleryImages?.length ?? 0) - 1}
                        className="absolute top-[50%] translate-y-[-50%] right-0 cursor-pointer bg-[#EF8F57]/80 w-10 h-10 rounded-full flex items-center justify-center disabled:bg-neutral-400"
                        onClick={handleNextFrame}
                    >
                        <ChevronRight />
                    </button>

                    <button
                        disabled={selectedFrame <= 0}
                        className="absolute top-[50%] translate-y-[-50%] left-0 cursor-pointer bg-[#EF8F57]/80 w-10 h-10 rounded-full flex items-center justify-center disabled:bg-neutral-400"
                        onClick={handlePrevFrame}
                    >
                        <ChevronLeft />
                    </button>



                </motion.div>
            </motion.div>
        )
    }


    if (!galleryImages) {
        return (
            <div className=" w-full h-[50vh] flex items-center justify-center " >
                <div className="h-14 w-14 relative "   >
                    <div className="animate-spin rounded-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full border-4 border-[#EF8F57] border-t-transparent  transition-all duration-200 " />
                    <div className="absolute border-4 border-[#EF8F57] border-t-transparent border-r-transparent rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-7/12 w-7/12 animate-anti-spin" />
                </div>
            </div>
        )
    }



    return (
        <div className="bg-[#FDF4F1] w-full h-full flex items-center justify-center flex-col  text-black relative">

            <Button onClick={() => setShowGalleryForm(true)} label="Add Image" ariaLabel="add image" type="button" className=" !bg-[#EF8F57] ml-auto rounded-lg mt-3 " />


            {galleryImages.length < 1 ?
                (
                    <div className=" w-full h-screen flex items-center justify-center text-center " >
                        <p className=" text-3xl font-bold text-[#EF8F57] font-lato  " >No Image found!</p>
                    </div>
                )
                : (
                    <div className="w-full h-fit grid md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 py-10 px-4 cursor-pointer">
                        {galleryImages?.map((card, index) => (
                            <div
                                onClick={() => {
                                    setShowFrame(true)
                                    setSelectedFrame(index)
                                }}
                                key={index}
                                className={`col-span-1 row-span-1 rounded-xl overflow-hidden relative min-h-[450px] ${size(index + 1)}`}
                                title={card.text}
                            >
                                {/* Show loader while image is loading or if no image */}
                                {(!card.image || !imageLoadStates[index]) && !imageErrors[index] && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                        <LazyLoader />
                                    </div>
                                )}

                                {/* Show error state if image failed to load */}
                                {imageErrors[index] && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                        <p className="text-gray-500 text-center px-4">Failed to load image</p>
                                    </div>
                                )}

                                {/* Show image if it exists */}
                                {card.image && (
                                    <Image
                                        src={card.image || "/placeholder.svg"}
                                        alt="gallery image"
                                        width={1000}
                                        height={1000}
                                        className="object-cover h-full w-full object-center absolute top-0 left-0"
                                        onLoad={() => handleImageLoad(index)}
                                        onError={() => handleImageError(index)}
                                    />
                                )}

                                {/* Text overlay */}
                                <div className="absolute bottom-0 left-0 w-full h-fit bg-black/40 backdrop-blur-sm py-4 px-3">
                                    <p className="text-base font-bold font-merriweather text-white">{card.text}</p>
                                </div>
                            </div>
                        ))}


                    </div>
                )}

            <AnimatePresence>
                {showFrame && galleryImages[selectedFrame] && (
                    <ImagePreview image={galleryImages[selectedFrame].image} text={galleryImages[selectedFrame].text} id={galleryImages[selectedFrame].id} />
                )}
            </AnimatePresence>


            {showGalleryForm && <GalleryImageUploadForm setShowGalleryForm={setShowGalleryForm} addImageToUI={AddImageToUI} />}
        </div>
    )
}