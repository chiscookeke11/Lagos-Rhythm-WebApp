"use client"
import { pagesData } from "@/data/data";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Page() {
    const [selectedFrame, setSelectedFrame] = useState(0)
    const [showFrame, setShowFrame] = useState(false)

    const size = (index: number) => {
        switch (index) {
            case 3:
                return "lg:col-span-2 lg:row-span-1";
            case 5:
                return "lg:col-span-2 lg:row-span-1";
            case 9:
                return "lg:col-span-2 lg:row-span-1";
            default:
                return "col-span-1 row-span-1";
        }
    };


    useEffect(() => {
        document.body.style.overflowY = showFrame ? "hidden" : "auto"
    }, [showFrame])




    function ImagePreview({ image, text }: { image: string; text: string }) {
        return (
            <motion.div
                onClick={() => setShowFrame(false)}
                className="bg-transparent backdrop-blur-2xl w-full h-screen flex items-center justify-center fixed p-5 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    title={text}
                    className="w-full max-w-2xl h-full max-h-10/12 flex items-center justify-center relative bg-white rounded-lg overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <Image
                        src={image}
                        alt="image"
                        height={1000}
                        width={1000}
                        className="absolute top-0 left-0 h-full w-full object-cover object-center"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-fit bg-black/40 backdrop-blur-sm py-4 px-3">
                        <p className="text-base font-bold font-merriweather text-white">{text}</p>
                    </div>
                </motion.div>
            </motion.div>
        );
    }



    return (
        <div className="bg-[#05073C] w-full h-fit flex items-center justify-center text-black relative " >


            <div className="w-full h-fit grid md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 py-20  m-4 lg:m-8  cursor-pointer " >
                {
                    pagesData.map((card, index) => (
                        <div
                            onClick={() => {
                                setShowFrame(true)
                                setSelectedFrame(index)
                            }}
                            key={index} className={`col-span-1 row-span-1 rounded-xl  overflow-hidden relative min-h-[450px]  ${size(index + 1)} `} title={card.text} >
                            <Image src={card.image} alt="gallery image" width={1000} height={1000} className="object-cover h-full w-full object-center absolute top-0 left-0 " />
                            <div className="absolute bottom-0 left-0 w-full h-fit bg-black/40 backdrop-blur-sm py-4 px-3 " >
                                <p className="text-base font-bold font-merriweather text-white" >                        {card.text}</p>
                            </div>
                        </div>
                    ))
                }


            </div>

            <AnimatePresence>
                {showFrame &&
                    (<ImagePreview
                        image={pagesData[selectedFrame].image}
                        text={pagesData[selectedFrame].text}
                    />)}
            </AnimatePresence>

        </div>
    )
}