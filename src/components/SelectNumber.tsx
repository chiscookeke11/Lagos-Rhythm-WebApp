import { useAppContext } from "@/app/context/AppContext";
import { crewAmountData } from "@/data/data";
import { AnimatePresence, motion } from "framer-motion";
import { Users, X } from "lucide-react";
import Link from "next/link";
import React from "react";





interface SelectNumberprops {
    setShowSelectModal: (showSelectModal: boolean) => void;
}


export default function SelectNumber({ setShowSelectModal }: SelectNumberprops) {
    const { setPopulationType, populationType, setPopulationAmount, userData } = useAppContext()

    console.log(populationType)


    return (

        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                onClick={() => setShowSelectModal(false)}
                className="fixed top-0 left-0 h-screen w-full bg-black/2 backdrop-blur-sm z-30 flex items-center justify-center px-3 py-6 " >



                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    className="w-full max-w-[700px] rounded-lg  bg-[#FDF4F1] h-fit py-6 px-5 flex flex-col gap-5 items-center  " >

                    <button onClick={() => setShowSelectModal(false)} className="ml-auto text-red-600 font-bold cursor-pointer  p-0.5 flex items-center justify-center  " ><X size={30} /> </button>


                    <h1 className=" mx-auto font-merriweather text-xl font-bold text-[#05073C] " >Choose a crew number</h1>

                    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 place-items-center  justify-items-center gap-5 " >
                        {crewAmountData.map((item, index) => (

                            <Link key={index} href={"/exclusive-tour-form"} className="md:w-fit w-full " >
                                <button onClick={() => {
                                    setShowSelectModal(false)
                                    setPopulationType(item.label)
                                    setPopulationAmount(item.maxAmount)
                                }}
                                    className="w-full h-full py-3 px-2 bg-[#ffffff]  text-[#05073C] cursor-pointer flex items-center flex-col gap-2 justify-center shadow-xl rounded-sm text-sm hover:scale-105 transition-all transform duration-150 ease-in-out font-lato  " >
                                    <Users color="#EF8F57" />
                                    <span className="font-semibold text-base " >            {item.label}</span>
                                    <span>   Per Tour Fee:           <span className="text-[#EF8F57] ml-1 " >${item.perTourFee(userData?.country ?? "")}</span></span>
                                    <span>   Monthly Subscription: <span className=" text-[#EF8F57]  ml-1" >${item.monthlySub(userData?.country ?? "")}</span>  </span>
                                </button>
                            </Link>
                        ))}
                    </div>


                </motion.div>

            </motion.div>
        </AnimatePresence>
    )
}