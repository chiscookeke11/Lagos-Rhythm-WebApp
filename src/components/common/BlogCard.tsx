import { BlogDataType } from "@/Types/blogTypes";
import Image from "next/image";


interface BlogCardProp{
    blog: BlogDataType;
}

export default function BlogCard({blog}: BlogCardProp) {



    return (
        <article className=" w-full flex flex-col items-start gap-6 py-5 px-4 h-[380px] cursor-pointer  group" >

            <div className="w-full flex items-center justify-center h-full relative bg-gray-500 rounded-lg overflow-hidden  " >
                <Image src={blog.image} alt="blog-image" height={500} width={500} className=" w-full h-full group-hover:scale-200 transform duration-200 ease-in-out " />

            </div>


            <div className="w-full flex flex-col gap-2" >
                <h3 className="text-lg font-semibold text-[#05073C] font-playfair " >{blog.title} </h3>
                <div className="w-full flex items-center justify-start gap-6 " >
                    <h4 className="text-base font-medium text-[#5B5F8E] " >{blog.author} </h4>
                    <h5 className="text-sm font-medium text-[#5B5F8E] flex items-center gap-5"> <span className="h-2 w-2 bg-[#5B5F8E] rounded-full block" /> {blog.createdAt} </h5>
                </div>

            </div>
        </article>
    )
}