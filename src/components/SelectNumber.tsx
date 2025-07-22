import { crewAmountData } from "@/data/data";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";




interface SelectNumberprops {
    setShowSelectModal: (showSelectModal: boolean) => void;
}


export default function SelectNumber({ setShowSelectModal }: SelectNumberprops) {


    return (

        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="fixed top-0 left-0 h-screen w-full bg-white/10 backdrop-blur-xs z-20 flex items-center justify-center px-3 py-6 " >

                <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="w-full max-w-sm rounded-lg grid grid-cols-2 place-items-center justify-items-center bg-amber-500 h-fit py-6 px-3 gap-5  " >


                    {crewAmountData.map((item, index) => (
                        <button onClick={() => setShowSelectModal(false)} key={index} className="w-full h-full p-4 bg-red-800 cursor-pointer flex items-center justify-center" > {item.label} </button>
                    ))}

                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}