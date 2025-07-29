
import { Button } from "../ui/button";
import { summaryData } from "@/data/data";




export default function Summary() {
    return (
        <section className=" w-full max-w-4xl h-fit col-span-4  bg-white rounded-[20px] shadow-sm py-4 px-7 space-y-6 " >


            <div className="w-full flex items-center justify-between gap-10" >

                <div>
                    <h4 className="text-[#05004E] font-semibold text-xl  " >Overview</h4>
                    <h6 className=" font-normal text-[#737791] text-base " >Activity Summery</h6>
                </div>


                <Button className="flex items-center justify-center gap-4 bg-[#EF8F57] cursor-pointer hover:bg-[#EF8F57]/90 py-3 px-6 h-fit text-base font-medium font-lato " > Export</Button>
            </div>



            <div className="w-full  grid grid-cols-4 grid-rows-2 justify-between gap-6 " >


                {summaryData.map((data, index) => (
                    <div key={index} className=" w-full h-[200px] bg-[#FDF4F1] rounded-2xl flex flex-col items-start justify-center gap-2 p-4   " >
                        <span className="w-10 h-10 rounded-full bg-[#EF8F57] flex items-center justify-center text-white" >  {data.icon} </span>
                        <h3 className=" text-2xl text-[#151D48] font-semibold mt-4 " > {data.value}k$</h3>
                        <h4 className="text-[#425166] font-medium text-base " >{data.title} </h4>
                        <p className="text-[#4079ED] font-medium text-xs ">+{data.precentage}% from yesterday</p>
                    </div>
                ))}








            </div>
        </section>
    )
}