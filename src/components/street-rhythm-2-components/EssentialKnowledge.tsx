"use client"


import { knowledgeCards } from "@/data/data";
import { ChevronDown } from "lucide-react";
import { useState } from "react";




export default function EssentialKnowledge() {

    const [activeCard, setActiveCard] = useState<number | null>(null)

    const toggleCard = (index: number) => {
        setActiveCard(activeCard === index ? null : index)
    }


    return (
        <section className=" bg-white py-16 px-[4%] flex flex-col items-center justify-center gap-10" >

            <div className=" flex flex-col items-center gap-4 " >
                <h4 className="text-[#A33323] font-bold text-[0.85em] tracking-[0.1em] font-merriweather " >Essential Knowledge</h4>
                <h3 className=" text-xl md:text-3xl text-[#0A0E14] font-black " >Your Lagos Transport Guide</h3>
                <p className="text-[1.05em] text-[#4A5568] " >Everything you need to know before stepping on a danfo.</p>
            </div>


            <div className=" w-full max-w-[1400px] p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-start justify-items-center justify-center gap-7 " >


                {
                    knowledgeCards.map((data, i) => (
                        <div
                            key={i}
                            onClick={() => toggleCard(i)}
                            className={`cursor-pointer w-full ${activeCard === i ? "h-full border-[#D4422C] gap-7" : "h-fit border-[#E2E8F0]"} border  bg-white rounded-[1rem] py-4 md:py-8 px-6 flex flex-col items-start  transition-all duration-200 ease-in-out `} >
                            {/* the head of the knowledge card  */}
                            <div className="w-full flex items-center justify-between text-[#0A0E14] " >

                                <span className="flex items-center justify-center size-12 bg-[#F9FAFB] rounded-[0.75em]  " >{data.icon} </span>

                                <h3 className=" text-lg md:text-[1.15em] font-bold text-[#0A0E14] " > {data.title} </h3>

                                <span className={` block ${activeCard === i ? " rotate-180 " : " "} transition-all duration-200 ease-in-out  `} >   <ChevronDown size={26} /></span>
                            </div>

                            {/* the body of the knowledge card  */}
                            <div
                                className={`w-full flex flex-col gap-3 text-[#4A5568] overflow-hidden transition-all duration-300 ease-in-out
  ${activeCard === i ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                            >
                                <h5 className="text-base md:text-lg " > {data.description} </h5>
                                <ul className="flex items-start flex-col gap-2">
                                    {data.tips.map((tip, tipIndex) => (
                                        <li key={tipIndex} className="flex items-start gap-3 text-sm md:text-base  " ><span className="text-[#D4422C] " >→</span> {tip}</li>
                                    ))}
                                </ul>
                            </div>



                        </div>
                    ))
                }


            </div>


        </section>
    )
}