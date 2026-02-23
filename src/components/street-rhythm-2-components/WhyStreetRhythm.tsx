import { features } from "@/data/data";




export default function WhyStreetRhythm() {
    return (
        <section className="w-full h-fit px-[8%] md:px-[4%] py-16 bg-[#F9FAFB] text-[#0A0E14] " >

            <div className="w-full max-w-[1380px]  mx-auto  flex flex-col items-center justify-center gap-20  ">

                <div className="flex flex-col items-center justify-center gap-3 text-center" >
                    <h4 className="text-[#D4422C] font-merriweather font-bold text-[0.85em] uppercase " >Why Street Rhythm</h4>
                    <h2 className=" text-xl md:text-3xl  font-black "  >Built for Lagos, by Lagosians</h2>
                </div>



                <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10 "  >

                    {
                        features.map((feature, i) => (
                            <div className=" w-full  h-full flex items-start flex-col gap-3 rounded-2xl border-2 border-[#E2E8F0] bg-white py-8 px-6 hover:border-[#A33323] hover:-translate-y-4 transition-all duration-300 ease-in-out cursor-pointer " key={i} >

                                <span className="mb-3 size-[60px] rounded-xl bg-gradient-to-br from-[#D4422C] to-[#F7B32B] flex items-center justify-center " >
                                    {feature.icon}
                                </span>


                                <h3 className=" text-[1.1rem] text-[#0A0E14] font-bold " > {feature.title} </h3>
                                <p className="text-[0.95rem] font-semibold text-[#4A5568] " > {feature.description} </p>


                            </div>
                        ))
                    }


                </div>




            </div>





        </section>
    )
}