"use client"



import { motion } from "framer-motion"
import Link from "next/link"
import { useMemo } from "react"
import Button from "@/components/common/Button"
import { inpersonExperience, themeJourneys } from "@/data/data"

export default function Page() {

    const MotionButton = useMemo(() => motion(Button), [])


    return (
        <>
            {/* The hero section  */}
            <section className="h-screen w-full flex items-center justify-center flex-col gap-4 px-[4%] py-7 bg-cover bg-center bg-no-repeat relative  " style={{ backgroundImage: "url('/in-person/in-person-2.jpg')" }} >
                <div className="inset-0 bg-black/55 absolute h-full w-full " />

                <div className="overflow-hidden text-center z-10 space-y-1 flex flex-col items-center gap-4 py-10 ">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-semibold text-white text-3xl md:text-4xl lg:text-[70px] lg:leading-[140%] font-merienda">
                        Experience Lagos In Person
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-normal text-base lg:text-lg text-white font-lato mt-4 max-w-xl ">
                        Where the screen ends, life begins. Step into Lagos, where history meets modern rhythm and every corner hums with energy. With Lagos Rhythm, you do not just visit, you live it. Taste the truth, feel the culture, and carry the city’s heartbeat home.
                    </motion.p>


                    <Link href={"#"} >
                        <MotionButton
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.1, delay: 0.7 }}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 1.3 }}
                            type="button" label="Book a Tour" > </MotionButton></Link>
                </div>

            </section>


            {/* What you Experience Section  */}

            <section className=" w-full h-full py-[4%] px-[5%] pb-20 flex flex-col items-center gap-10 bg-[#FDF4F1] ">
                <h1 className="text-[#05073C] font-bold text-2xl  md:text-3xl font-merienda ">What you <span className="text-[#EF8F57] ">experience</span>  </h1>




            </section>





            {/* Themes  */}
            <section className=" w-full h-full py-[4%] px-[3%] pb-20 flex flex-col items-center gap-10 bg-[#FDF4F1] ">
                <h1 className="text-[#05073C] font-bold text-2xl  md:text-3xl font-merienda ">THEMED  <span className="text-[#EF8F57] ">JOURNEYS</span>  </h1>



                <div className=" w-full  h-fit py-7 grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 gap-8 place-items-center justify-items-center px-1 " >


                    {themeJourneys.map((data, index) => (
                        <div key={index} className=" relative pb-3 px-1 flex flex-col gap-1 w-full text-black h-44 ">

                            <div className=" bg-[#05073C] h-full w-full absolute top-0 left-0  shadow-2xl " style={{
                                clipPath:
                                    "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, calc(100% - 12px) 100%, 12px 100%, 0 100%, 0 0)",
                            }} />

                            <div className="w-full absolute bottom-1 right-1 bg-white h-full hover:bottom-3 hover:right-3 md:hover:right-5 transition-all duration-300 flex flex-col items-start gap-2 text-[#05073C] py-5 px-4 " style={{
                                clipPath:
                                    "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, calc(100% - 12px) 100%, 12px 100%, 0 100%, 0 0)",
                            }} >
                                <h3 className="font-merienda font-semibold text-xl " > {data.title} </h3>
                                <p className="font-lato font-normal text-base " > {data.description} </p>

                                <Button ariaLabel="Get started" label="Get started" type="button" variant="primary" className="w-fit !bg-[#EF8F57] text-white !py-2 ml-auto " />
                            </div>

                        </div>
                    ))}

                </div>
            </section>












        </>
    )
}