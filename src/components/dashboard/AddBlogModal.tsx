"use client"
import type React from "react"
import { type SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addDoc, collection } from "firebase/firestore"
import { fireDB } from "@/app/config/firebaseClient"
import toast from "react-hot-toast"
import Loader from "@/components/common/Loader"
import { useUser } from "@clerk/nextjs"
import TiptapEditor from "../TipTapEditor"
import { BlogDataType } from "@/Types/blogTypes"
import { X } from "lucide-react"

interface AddBlogModalProps {
    setOpenBlogModal?: React.Dispatch<SetStateAction<boolean>>
    addBlogToUI: (blog: BlogDataType) => void
}

export default function AddBlogModal({ setOpenBlogModal, addBlogToUI }: AddBlogModalProps) {
    const [loading, setLoading] = useState(false)
    const { user } = useUser()
    const [formValues, setFormValues] = useState({
        title: "",
        content: "",
        author: "",
    })
    const [file, setFile] = useState<File | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleTipTapChange = (value: string) => {
        setFormValues((prev) => ({
            ...prev,
            content: value,
        }))
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

        if (!formValues.title.trim() || !formValues.author.trim() || !formValues.content.trim()) {
            toast.error("Please fill in all fields")
            return
        }

        if (!file) {
            toast.error("Please select an image")
            return
        }

        setLoading(true)

        try {
            // Uploading image
            const imageUrl = await uploadImageToCloudinary(file)

            // saving to firebase
            const docRef = await addDoc(collection(fireDB, "blogs"), {
                title: formValues.title,
                author: formValues.author,
                text: formValues.content,
                addedAt: new Date(),
                image: imageUrl,
            })

            const newBlog: BlogDataType = {
                id: docRef.id,
                title: formValues.title,
                author: formValues.author,
                text: formValues.content,
                image: imageUrl,
                addedAt: new Date().toDateString(),
            }

            toast.success("Blog added successfully!")
            addBlogToUI(newBlog)
            setFormValues({
                title: "",
                author: "",
                content: "",
            })
            setFile(null)
            setOpenBlogModal?.(false)
        } catch (error) {
            console.error("Failed to submit blog", error)
            if (error instanceof Error) {
                toast.error(`Failed to add blog: ${error.message}`)
            } else {
                toast.error("Failed to add blog")
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
                <button onClick={() => setOpenBlogModal?.(false)} className="text-red-600 ml-auto cursor-pointer " ><X size={32} /></button>
                <h2 className="mx-auto text-center font-merienda font-extrabold text-[#EF8F57] text-xl md:text-3xl">
                    Add blog details
                </h2>

                <label htmlFor="image" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#EF8F57]">Blog image *</span>
                    <input
                        type="file"
                        placeholder="blog Image"
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

                <label htmlFor="title" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#EF8F57]">Title *</span>
                    <Input
                        value={formValues.title}
                        id="title"
                        name="title"
                        onChange={handleChange}
                        placeholder="Enter blog title"
                        className="bg-transparent outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        required
                    />
                </label>

                <label htmlFor="author" className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#EF8F57]">Author *</span>
                    <Input
                        value={formValues.author}
                        name="author"
                        onChange={handleChange}
                        id="author"
                        placeholder="Enter author name"
                        className="bg-transparent outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-0 py-2 px-3 h-fit focus:outline-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-base"
                        required
                    />
                </label>

                <div className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-[#EF8F57]">Content *</span>
                    <TiptapEditor content={formValues.content} onChange={handleTipTapChange} />
                </div>

                <div className="flex gap-4 ml-auto">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-[#EF8F57] text-[#EF8F57] hover:bg-[#EF8F57]/10 bg-transparent cursor-pointer py-3 px-6 h-fit"
                        onClick={() => {
                            setFormValues({ title: "", author: "", content: "" })
                            setFile(null)
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-4 bg-[#EF8F57] cursor-pointer hover:bg-[#EF8F57]/90 py-3 px-6 h-fit text-base font-medium font-lato"
                    >
                        {loading ? <Loader /> : "Add Blog"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
