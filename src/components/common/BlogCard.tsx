import Image from "next/image";




export default function BlogCard() {
    return (
        <article className=" w-full flex flex-col items-start gap-6 py-5 px-4 h-[380px] cursor-pointer  group" >

            <div className="w-full flex items-center justify-center h-full relative bg-green-500 rounded-lg overflow-hidden  " >
                <Image src={"/coming-soon/coming-soon-bg.jpg"} alt="blog-image" height={200} width={200} className=" w-full h-full group-hover:scale-200 transform duration-200 ease-in-out " />

            </div>


            <div className="w-full flex flex-col gap-2" >
                <h3 className="text-lg font-semibold text-[#05073C] font-playfair " >Pietrangelo hopes he&apos;ll sign contract to remain with Blues</h3>
                <div className="w-full flex items-center justify-start gap-6 " >
                    <h4 className="text-base font-medium text-[#5B5F8E] " >Author</h4>
                    <h5 className="text-sm font-medium text-[#5B5F8E] flex items-center gap-5"> <span className="h-2 w-2 bg-[#5B5F8E] rounded-full block" /> Date</h5>
                </div>

            </div>
        </article>
    )
}