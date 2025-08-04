"use client"


import { useAppContext } from "@/app/context/AppContext";
import BlogCard from "./common/BlogCard";
import { SetStateAction, useState } from "react";
import { BlogDataType } from "@/Types/blogTypes";
import AddBlogModal from "./dashboard/AddBlogModal";
import UpdateBlogModal from "./dashboard/UpdateBlogModal";
import ConfirmDelete from "./dashboard/ConfirmDelete";


interface BlogSectionProps {
    openBlogModal?: boolean
    setOpenBlogModal?: React.Dispatch<SetStateAction<boolean>>
}



export default function BlogSection({ setOpenBlogModal, openBlogModal }: BlogSectionProps) {


    const { blogs, setBlogs } = useAppContext()
    const [showOptionsIndex, setShowOptionsIndex] = useState<string | null>(null);
    const [showEditBlogModal, setShowEditBlogModal] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState("")
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)


    const removeBlogFromUI = (id: string) => {
        setBlogs(prev => (prev ? prev.filter(blog => blog.id !== id) : null))
    }


    const addBlogToUI = (newBlog: BlogDataType) => {
        setBlogs((prev) => {
            if (!prev) {
                return [newBlog]
            }
            return [newBlog, ...prev]
        })
    }




    console.log(selectedIndex)


    const updateBlogInUI = (updatedBlog: BlogDataType) => {
        setBlogs((prevBlogs) =>
            prevBlogs
                ? prevBlogs.map((blog) =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
                : [updatedBlog]
        )
    }







    return (
        <section className="w-full relative " >
            {blogs && blogs?.length < 1 ?
                (
                    <div className="w-full h-[50vh] flex items-center justify-center text-center " >
                        <p className=" text-3xl font-bold text-[#EF8F57]  " >No blog found!</p>
                    </div>
                ) :
                blogs ? (
                    <section className=" w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                        {blogs?.map((blog) => (
                            <BlogCard
                                showOptionsIndex={showOptionsIndex}
                                setShowOptionsIndex={setShowOptionsIndex}
                                key={blog.id} blog={blog}
                                setSelectedIndex={setSelectedIndex}
                                setShowEditBlogModal={setShowEditBlogModal}
                                setConfirmDeleteModal={setConfirmDeleteModal}
                            />

                        ))}
                    </section>
                ) : (
                    <div className="w-full h-[40vh] flex items-center justify-center  " >

                        <div className="h-14 w-14 relative "   >
                            <div className="animate-spin rounded-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full border-4 border-[#EF8F57] border-t-transparent  transition-all duration-200 " />
                            <div className="absolute border-4 border-[#EF8F57] border-t-transparent border-r-transparent rounded-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-7/12 w-7/12 animate-anti-spin" />
                        </div>

                    </div>
                )}



            {openBlogModal && (<AddBlogModal setOpenBlogModal={setOpenBlogModal} addBlogToUI={addBlogToUI} />)}

            {showEditBlogModal && <UpdateBlogModal setShowEditBlogModal={setShowEditBlogModal} selectedIndex={selectedIndex} updateBlogInUI={updateBlogInUI} />}

            {confirmDeleteModal && <ConfirmDelete onDelete={removeBlogFromUI} setConfirmDeleteModal={setConfirmDeleteModal} selectedIndex={selectedIndex} />}
        </section>
    )
}
