import { BlogDataType } from "@/Types/blogTypes";
import Image from "next/image";
import Link from "next/link";
import LazyLoader from "./LazyLoader";
import { Edit, EllipsisVertical, Trash, X } from "lucide-react";
import { deleteItem } from "@/lib/utils";
import toast from "react-hot-toast";



interface BlogCardProp {
    blog: BlogDataType;
    showOptionsIndex: string | null;
    setShowOptionsIndex: React.Dispatch<React.SetStateAction<string | null>>;
    onDelete: (id: string) => void;
}

export default function BlogCard({ blog, setShowOptionsIndex, showOptionsIndex, onDelete }: BlogCardProp) {


    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Deleting ")



        try {
            await deleteItem(id, "blogs")
            toast.dismiss(toastId)
            toast.success("Blog deleted successfully")
            onDelete(id)

        }
        catch (err) {
            console.error(err)
            toast.dismiss(toastId)
            toast.error("Failed to delete. please try again")
        }
    }



    return (

        <Link href={`/blogs/${blog.id}`} >
            <article className=" w-full flex flex-col items-start gap-3 py-5 px-4 h-[380px] cursor-pointer  group  " >

                <div className="w-full flex items-center justify-center h-full relative  rounded-lg overflow-hidden " >
                    {!blog.image ? <LazyLoader /> : (<Image src={blog.image} alt="blog-image" height={1000} width={1000} className=" w-full h-full group-hover:scale-200 transform duration-200 ease-in-out " />)}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            setShowOptionsIndex((prev: string | null) => (prev === blog.id ? null : blog.id))
                        }}
                        className="absolute top-2 right-2 cursor-pointer bg-white rounded-md p-4  " ><EllipsisVertical size={28} color="#EF8F57" /> </button>


                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                        className={`bg-blue-600 h-28 w-28 rounded-full  top-[-10px] overflow-hidden  absolute  transition-all duration-200 ease-in-out ${showOptionsIndex === blog.id ? "right-[-6%]" : "right-[-50%] "}`} >
                        <div className="w-full h-full bg-white flex items-center justify-center  " >
                            <button onClick={(e) => {
                                setShowOptionsIndex(null)
                                e.stopPropagation()
                                e.preventDefault()
                            }}
                                className="ml-8 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
                            ><X size={26} color="#EF8F57" /></button>


                            <button className=" absolute top-4 left-6 cursor-pointer  hover:scale-110 transition-all duration-200 ease-in-out" >
                                <Edit size={22} color="#EF8F57" />
                            </button>


                            <button
                                onClick={() => handleDelete(blog.id)}
                                className=" absolute bottom-4 left-6  cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out" >
                                <Trash size={22} color="#EF8F57" />
                            </button>
                        </div>
                    </div>
                </div>


                <div className="w-full flex flex-col gap-2" >
                    <h3 className="text-lg font-semibold text-[#05073C] font-playfair " >{blog.title} </h3>
                    <div className="w-full flex items-center justify-start gap-6 " >
                        <h4 className="text-base font-medium text-[#5B5F8E] " >{blog.author} </h4>
                        <h5 className="text-sm font-medium text-[#5B5F8E] flex items-center gap-5"> <span className="h-2 w-2 bg-[#5B5F8E] rounded-full block" /> {blog.addedAt} </h5>
                    </div>

                </div>


            </article>
        </Link>
    )
}