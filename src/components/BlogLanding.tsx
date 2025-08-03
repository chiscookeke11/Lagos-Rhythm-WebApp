"use client"

import { useAppContext } from "@/app/context/AppContext";
import BlogCard from "./common/BlogCard";



export default function BlogLanding() {


    const { blogs } = useAppContext()



    return (
        <div  className="w-full flex flex-col gap-8 items-start justify-center bg-[#ffffff] py-[4%] px-[4%] ">
             <h1 className="text-[#05073C] font-bold text-2xl md:text-3xl font-playfair " >Blogs by <span className="text-[#EF8F57] ">Lagos Rhythm</span></h1>

            <section className="w-full " >
                {blogs ? (
                    <section className=" w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                        {blogs?.slice(0, 3).map((blog, index) => (
                            <BlogCard key={index} blog={blog} />

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
            </section>
        </div>
    )
}