import { TestimonialDataType } from "@/Types/TestimonialDataTypes"
import Image from "next/image"




interface TestimonialCardProps{
    data: TestimonialDataType
}






export default function TestimonialCard({data}: TestimonialCardProps) {
    return (
        <div className="bg-[#FFFFFF] rounded-xl py-4 px-6 flex flex-col items-start gap-5  w-full max-w-[330px] md:max-w-[409px] shadow-lg " >
            <h5 className=" text-base font-medium text-[#EB662B] " >{data.caption}</h5>
            <p className=" text-[#05073C] font-medium text-base font-lato " >{data.content} </p>
                <hr className="bg-[#E7E6E6] w-full border-[#E7E6E6] "  />

                <div className="w-full flex items-center justify-start gap-3 mt-auto " >
                    <Image src={data.image} alt={`${data.name}-image`} width={100} height={100} className=" w-[60px] h-[60px] rounded-full object-cover object-center  " />


                    <div className="w-fit flex flex-col items-start justify-between gap-1" >
                        <h5 className="text-sm font-semibold text-[#EB662B] font-playfair " > {data.name} </h5>
                        <h6 className="font-medium text-[#05073C] text-xs font-lato " >{data.job} </h6>
                        <h6 className="font-medium text-[#05073C] text-xs font-lato" >{data.country} </h6>

                    </div>

                </div>
        </div>
    )
}