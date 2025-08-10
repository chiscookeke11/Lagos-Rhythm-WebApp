"use client"

import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';
import { BsTiktok } from "react-icons/bs";

interface ConfirmationModalProps {
    showConfirmationModal: boolean;
    setShowConfirmationModal: (showConfirmationModal: boolean) => void
    tourType: string
}

export default function ConfirmationModal({ showConfirmationModal, setShowConfirmationModal, tourType }: ConfirmationModalProps) {
    const [showConfetti, setShowConfetti] = useState(true);
    const [width, height] = useWindowSize();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);




    useEffect(() => {
        const closeModal = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setShowConfirmationModal(false)
            }
        }

        document.addEventListener("keydown", closeModal)

        return () => {
            document.removeEventListener("keydown", closeModal)
        }
    }, [setShowConfirmationModal])




    return (
        <div className=" h-screen w-full fixed top-0 left-0 z-10  bg-black/50 backdrop-blur-md flex items-center justify-center font-lato px-3 " >
            {showConfetti && <Confetti width={width} height={height} />}

            <div className="w-full h-full relative overflow-hidden " >
                <div className={`w-full max-w-sm bg-white px-5 py-6 rounded-lg flex flex-col items-center justify-center gap-3 text-center absolute top-[50%] left-[50%] translate-x-[-50%] transition-transform duration-200 ease-in-out ${showConfirmationModal ? "translate-y-[-50%]" : "translate-y-[500%]"}  `} >
                    <button onClick={() => setShowConfirmationModal(false)} className="ml-auto cursor-pointer bg-[#EF8F57] text-white rounded-sm p-[2px] mb-3 hover:scale-105 transform duration-150 ease-in-out transition-transform " ><X size={23} /></button>
                    <h1 className="text-[#05073C] text-xl font-medium ">You’re Booked for {tourType}</h1>
                    <p className="text-[#05073C] text-base font-normal  " >We’ll send you a quick reminder with the joining information before the tour begins.<br /> Can’t wait to take you through Lagos - live!</p>


                    <div className=" mt-3 flex flex-col gap-2  " >
                        <p className="text-base font-semibold text-[#EF8F57]/80  " >Follow Lagos Rhythm on our social media pages for real-time updates.</p>
                        <ul className="w-full flex items-center gap-4 justify-center " >

                            <li> <a href="https://www.facebook.com/profile.php?id=61576980652512" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#EF8F57]/50 transition-colors duration-150 ease-in-out " >
                                <Facebook size={23} />
                            </a></li>

                            <li>
                                <a href="https://vm.tiktok.com/ZMSVpqPpC/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#EF8F57]/50 transition-colors duration-150 ease-in-out " >
                                    <BsTiktok size={23} />
                                </a>
                            </li>

                            <li>

                                <a href="https://youtube.com/@lagosrhythm?si=6Uyn540adjOMeWmW" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#EF8F57]/50 transition-colors duration-150 ease-in-out ">
                                    <Youtube size={23} />
                                </a>
                            </li>

                            <li>

                                <a href="https://www.instagram.com/lagos_rhythm/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#EF8F57]/50 transition-colors duration-150 ease-in-out ">
                                    <Instagram size={23} />
                                </a>
                            </li>

                            <li>
                                <a href="https://www.linkedin.com/company/lagos-rhythm/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#EF8F57]/50 transition-colors duration-150 ease-in-out ">
                                    <Linkedin size={23} />
                                </a>
                            </li>


                        </ul>
                    </div>
                </div>



            </div>

        </div>
    )
}