import { statsData, testimonialsData } from "@/data/data";
import TestimonialCard from "./common/TestimonialCard";



export default function Testimonials() {
    return (
        <section className="w-full bg-[#EB662B0D] py-[7%] px-[10%] flex flex-col items-start justify-center gap-10 font-inter " >
        <h2 className="text-[#05073C] font-bold text-3xl " >What our Travelers are saying</h2>
   <div className= " w-full  grid grid-cols-2 lg:grid-cols-4   gap-5 " >
        {testimonialsData.map((data, index) => (
         <TestimonialCard data={data} key={index} />
       ))}
   </div>

   <div className="w-full flex flex-row items-center justify-between gap-10 pt-[3%] " >


    {statsData.map((data, index) => (
        <div key={index} className="flex w-full items-start justify-between flex-col gap-1 " >
        <h3 className="text-3xl text-[#05073C] font-bold " > {data.value} </h3>
        <h4 className="text-sm text-[#05073C] font-normal " >{data.content} </h4>

    </div>
    ))}

   </div>
        </section>
    )
}