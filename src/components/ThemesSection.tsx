"use client"

import { themesData } from "@/data/data";
import Image from "next/image";
import Button from "./common/Button";
import { motion } from "framer-motion"
import SelectNumber from "./SelectNumber";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/AppContext";


export default function ThemesSection() {
    const [showSelectModal, setShowSelectModal] = useState(false)

    const { setSelectedTheme } = useAppContext()

    useEffect(() => {
        document.body.style.overflowY = showSelectModal ? "hidden" : "auto"
    }, [showSelectModal])



    return (
        <section id="themeSection" className=" w-full flex flex-col gap-6 items-center py-16 px-10 bg-[#FDF4F1] " >


            <h1 className="text-[#05073C] font-bold text-2xl  md:text-3xl font-merienda ">E-Rhythm <span className="text-[#EF8F57] ">Themes</span>   </h1>


            <div className=" w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-6 "  >


                {themesData.map((item, index) => (
                    <motion.div
                        initial={{ scale: 0.2, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.1 }}
                        key={index} className="h-full w-full min-h-[250px]  rounded-xl flex items-center justify-center cursor-pointer  py-3 px-5  bg-no-repeat bg-cover bg-center relative overflow-hidden group shadow-xl "  >

                        <div className=" w-full absolute h-full top-0 left-0  backdrop-blur-3xl  ">
                            <Image src={item.image} alt="image" height={500} width={500} className=" h-full w-full object-cover group-hover:scale-200  transition-all duration-300 ease-in-out lg:group-hover:blur-xs " />
                        </div>


                        <div className=" lg:h-12  px-3 py-3  w-full absolute bg-white/5 group-hover:bg-black/10 backdrop-blur-md bottom-0 left-0 overflow-hidden h-[68%] md:h-[70%] lg:group-hover:h-[75%] group-hover:p-3 group-hover:px-4  transition-all duration-300 ease-in-out flex flex-col gap-2 lg:gap-1   " >
                            <h1 className="font-merienda font-bold text-lg lg:text-xl text-white " >{item.title} </h1>
                            <p className="font-lato font-medium text-sm lg:text-base text-white lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 ease-in-out " > {item.description} </p>
                            <Button onClick={() => {
                                setShowSelectModal(true)
                                setSelectedTheme(item.title)
                            }} type="button" ariaLabel="Get started" label="Get Started" className="w-fit ml-auto !bg-[#EF8F57]  " variant="primary" />
                        </div>


                        {showSelectModal &&
                            <SelectNumber
                                setShowSelectModal={setShowSelectModal} />}
                    </motion.div>
                ))

                }



            </div>
        </section>
    )
}