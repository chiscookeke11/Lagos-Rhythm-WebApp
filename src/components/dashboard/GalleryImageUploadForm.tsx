"use client"
import type React from "react"
import { type SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import Loader from "@/components/common/Loader"
import { X } from "lucide-react"
import { addDoc, collection } from "firebase/firestore"
import { fireDB } from "@/app/config/firebaseClient"

interface GalleryImageUploadFormProps {
    setOpenGalleryModal?: React.Dispatch<SetStateAction<boolean>>
}

export default function GalleryImageUploadForm({ setOpenGalleryModal }: GalleryImageUploadFormProps) {
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<File[]>([])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }

    const removeFile = (indexToRemove: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove))
    }

    const uploadImageToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "lagos_rhythm_preset")
        formData.append("cloud_name", "dwedz2laa")

        const response = await fetch("https://api.cloudinary.com/v1_1/dwedz2laa/image/upload", {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            throw new Error(`Image upload failed for ${file.name}`)
        }
        const data = await response.json()
        return data.secure_url
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (files.length === 0) {
            toast.error("Please select at least one image.")
            return
        }

        setLoading(true)
        try {
            const uploadedImageUrls: string[] = []
            for (const file of files) {
                const imageUrl = await uploadImageToCloudinary(file)
                uploadedImageUrls.push(imageUrl)
            }


            await addDoc(collection(fireDB, "gallery"), {
                urls: uploadedImageUrls,
                addedAt: new Date(),
            });

            toast.success(`${uploadedImageUrls.length} image(s) uploaded successfully!`)
            setFiles([])
            setOpenGalleryModal?.(false)
        } catch (error) {
            console.error("Failed to upload images", error)
            if (error instanceof Error) {
                toast.error(`Failed to upload images: ${error.message}`)
            } else {
                toast.error("Failed to upload images.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed h-screen w-full flex items-center justify-center top-0 left-0 bg-black/55 backdrop-blur-sm p-4 z-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl flex items-start justify-center flex-col gap-4 h-fit py-8 px-6 bg-[#FDF4F1] shadow-md rounded-md max-h-[95vh] overflow-y-auto"
            >
                <button
                    type="button"
                    onClick={() => setOpenGalleryModal?.(false)}
                    className="text-red-600 ml-auto cursor-pointer"
                >
                    <X size={32} />
                </button>
                <h2 className="mx-auto text-center font-merienda font-extrabold text-[#EF8F57] text-xl md:text-3xl">
                    Upload Gallery Images
                </h2>
                <label htmlFor="images" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#EF8F57]">Select Images *</span>
                    <Input
                        type="file"
                        placeholder="Gallery Images"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#EF8F57] file:text-white hover:file:bg-[#EF8F57]/90 file:cursor-pointer"
                        required
                    />
                </label>

                {files.length > 0 && (
                    <div className="w-full flex flex-col gap-2">
                        <span className="text-lg font-semibold text-[#EF8F57]">Selected Files:</span>
                        <ul className="list-disc list-inside">
                            {files.map((file, index) => (
                                <li key={index} className="flex items-center justify-between text-sm text-gray-700">
                                    {file.name} ({Math.round(file.size / 1024)} KB)
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-700 ml-2"
                                    >
                                        <X size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex gap-4 ml-auto">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-[#EF8F57] text-[#EF8F57] hover:bg-[#EF8F57]/10 bg-transparent cursor-pointer py-3 px-6 h-fit"
                        onClick={() => {
                            setFiles([])
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading || files.length === 0}
                        className="flex items-center justify-center gap-4 bg-[#EF8F57] cursor-pointer hover:bg-[#EF8F57]/90 py-3 px-6 h-fit text-base font-medium font-lato"
                    >
                        {loading ? <Loader /> : "Upload Images"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
