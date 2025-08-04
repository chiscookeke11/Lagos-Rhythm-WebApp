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
import { useUser } from "@clerk/nextjs"
import { galleryTypes } from "@/Types/galleryType"

interface GalleryImageUploadFormProps {
    setShowGalleryForm: React.Dispatch<SetStateAction<boolean>>
    addImageToUI: (image: galleryTypes) => void
}

export default function GalleryImageUploadForm({ setShowGalleryForm, addImageToUI }: GalleryImageUploadFormProps) {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [text, setText] = useState("")
    const { user } = useUser()



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
            throw new Error("Image upload failed")
        }

        const data = await response.json()
        return data.secure_url
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()



        if (user?.primaryEmailAddress?.emailAddress !== "chiscookeke11@gmail.com" && user?.primaryEmailAddress?.emailAddress !== "damola-o@lagosrhythm.com") {
            toast.error("You don't have permission to do this")
            return
        }

        if (!text.trim()) {
            toast.error("Please fill in all fields")
            return
        }

        if (!file) {
            toast.error("Please select an image")
            return
        }

        setLoading(true)


        try {
            const imageUrl = await uploadImageToCloudinary(file)


            const galleryRef = await addDoc(collection(fireDB, "gallery"), {
                title: text,
                image: imageUrl
            })

            const newImage: galleryTypes = {
                id: galleryRef.id,
                image: imageUrl,
                text: text
            }

            addImageToUI(newImage)

            setText("")
            setFile(null)
            toast.success("Image uploaded successfully!")
            setShowGalleryForm(false)
        }
        catch (error) {
            console.error("error uploading image", error)
            toast.error("Failed to upload image")
        }
        finally {
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
                    onClick={() => setShowGalleryForm?.(false)}
                    className="text-red-600 ml-auto cursor-pointer"
                >
                    <X size={32} />
                </button>
                <h2 className="mx-auto text-center font-merienda font-extrabold text-[#EF8F57] text-xl md:text-3xl">
                    Upload Gallery Images
                </h2>
                <label htmlFor="image" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#EF8F57]">Select Images *</span>
                    <Input
                        type="file"
                        placeholder="Gallery Image"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0])
                            }
                        }}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#EF8F57] file:text-white hover:file:bg-[#EF8F57]/90 file:cursor-pointer"
                        required
                    />
                </label>



                <Input
                    type={"text"}
                    value={text}
                    placeholder="The river side"
                    onChange={(e) => setText(e.target.value)}
                    className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather"
                    required
                />

                <div className="flex gap-4 ml-auto">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-[#EF8F57] text-[#EF8F57] hover:bg-[#EF8F57]/10 bg-transparent cursor-pointer py-3 px-6 h-fit"
                        onClick={() => {
                            setFile(null)
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading || !text}
                        className="flex items-center justify-center gap-4 bg-[#EF8F57] cursor-pointer hover:bg-[#EF8F57]/90 py-3 px-6 h-fit text-base font-medium font-lato"
                    >
                        {loading ? <Loader /> : "Upload Images"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
