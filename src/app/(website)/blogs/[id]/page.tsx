"use client"

import { useAppContext } from "@/app/context/AppContext"
import ReusableHero from "@/components/ReusableHero"
import { BlogDataType } from "@/Types/blogTypes"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const { id } = useParams()
  const { blogs } = useAppContext()
  const [currentBlog, setCurrentBlog] = useState<BlogDataType | null>(null)

  useEffect(() => {
    if (blogs && id && blogs.length > 0) {
      const blog = blogs.find((b) => b.id === id)
      setCurrentBlog(blog || null)
    }
  }, [id, blogs])



  if (!currentBlog)
    return (
      <div className="text-black" >
        Blog not found
      </div>
    )
  return (
    <>
      <ReusableHero image={currentBlog.image} pageTitle={currentBlog.title} />
      <div className="w-full  text-[#05073C] bg-[#FDF4F1] px-[6%] py-[4%] flex items-start flex-col gap-3 relative  " >
        <h3 className="text-2xl font-bold  font-merriweather " > {currentBlog.title}</h3>
        <div className="font-lato text-justify text-lg font-medium" dangerouslySetInnerHTML={{__html: currentBlog.text}} />


        <div className=" absolute right-0 top-0 h-full w-fit " >
          <Image src={"/blogs/side-waves.svg"} alt="abstract image" width={500} height={500} className=" w-full h-full" />
        </div>


         <div className=" absolute left-0 top-0 h-full w-fit " >
          <Image src={"/blogs/left-wave.svg"} alt="abstract image" width={500} height={500} className=" w-full h-full" />
        </div>
      </div>

    </>
  )


}
