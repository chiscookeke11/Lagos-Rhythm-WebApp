"use client"

import BlogSection from "@/components/BlogsSection";
import AddBlogModal from "@/components/dashboard/AddBlogModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";



export default function Page() {
    const [openBlogModal, setOpenBlogModal] = useState(false)



    return (
        <div className="w-full flex flex-col gap-8 items-start justify-center py-6 px-7 relative font-lato ">
          <Button onClick={() => setOpenBlogModal(true)} className="flex items-center justify-center gap-4 bg-[#EF8F57] cursor-pointer hover:bg-[#EF8F57]/90 py-3 px-6 h-fit text-base font-medium font-lato ml-auto " >Add Blog</Button>
            <h1 className="text-[#05073C] font-bold text-2xl md:text-3xl font-playfair " >Blogs</h1>
            <BlogSection />



     {openBlogModal && (       <AddBlogModal setOpenBlogModal={setOpenBlogModal} />)}
        </div>
    )
}