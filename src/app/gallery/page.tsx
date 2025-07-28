"use client"
import { pagesData } from "@/data/data";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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


    const handleNextFrame = () => {
        if (selectedFrame >= pagesData.length - 1) {
            return
        }
        setSelectedFrame((prev) => prev + 1)
    }


    const handlePrevFrame = () => {
        if (selectedFrame <= 0) {
            return
        }
        setSelectedFrame((prev) => prev - 1)
    }


    function ImagePreview({ image, text }: { image: string; text: string }) {
        return (
            <motion.div
                onClick={() => setShowFrame(false)}
                className="bg-transparent backdrop-blur-2xl w-full h-screen flex items-center justify-center fixed  z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    title={text}
                    className="w-full mx-auto max-w-2xl h-full max-h-10/12 flex items-center justify-center relative bg-white rounded-lg overflow-hidden"
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
                    <button disabled={selectedFrame >= pagesData.length - 1} className="absolute top-[50%] translate-y-[-50%] right-0 cursor-pointer bg-[#EF8F57]/80 w-10 h-10 rounded-full flex items-center justify-center disabled:bg-neutral-400 " onClick={handleNextFrame} ><ChevronRight />  </button>
                    <button disabled={selectedFrame <= 0} className="absolute top-[50%] translate-y-[-50%] left-0 cursor-pointer bg-[#EF8F57]/80 w-10 h-10 rounded-full flex items-center justify-center disabled:bg-neutral-400 " onClick={handlePrevFrame} ><ChevronLeft /> </button>

                </motion.div>
            </motion.div>
        );
    }



    return (
        <div className="bg-[#05073C] w-full h-full flex items-center justify-center text-black  " >


            <div className="w-full h-fit grid md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 py-20    cursor-pointer relative " >
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

                <AnimatePresence>
                    {showFrame && pagesData[selectedFrame] &&
                        (<ImagePreview
                            image={pagesData[selectedFrame].image}
                            text={pagesData[selectedFrame].text}
                        />)}
                </AnimatePresence>

            </div>



        </div>
    )
}