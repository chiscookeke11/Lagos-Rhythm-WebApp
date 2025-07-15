"use client"

import { Facebook, Instagram, Linkedin, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';
import { BsTiktok } from "react-icons/bs";

interface ConfirmationModalProps {
    showConfirmationModal: boolean;
    setShowConfirmationModal: (showConfirmationModal: boolean) => void
}

export default function ConfirmationModal({ showConfirmationModal, setShowConfirmationModal }: ConfirmationModalProps) {
    const [showConfetti, setShowConfetti] = useState(true);
    const [width, height] = useWindowSize();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className=" h-screen w-full fixed bg-black/50 backdrop-blur-md flex items-center justify-center font-lato px-3 " >
            {showConfetti && <Confetti width={width} height={height} />}

            <div className="w-full h-full relative overflow-hidden " >
                <div className={`w-full max-w-sm bg-white px-5 py-6 rounded-lg flex flex-col items-center justify-center gap-3 text-center absolute top-[50%] left-[50%] translate-x-[-50%] transition-transform duration-200 ease-in-out ${showConfirmationModal ? "translate-y-[-50%]" : "translate-y-[500%]"}  `} >
                    <button onClick={() => setShowConfirmationModal(false)} className="ml-auto cursor-pointer bg-[#EF8F57] text-white rounded-sm p-[2px] mb-3 hover:scale-105 transform duration-150 ease-in-out transition-transform " ><X size={23} /></button>
                    <h1 className="text-[#05073C] text-xl font-medium ">You’re Booked for Free E-Rhythm!</h1>
                    <p className="text-[#05073C] text-base font-normal  " >We’ll send you a quick reminder with the joining information before the tour begins.<br/> Can’t wait to take you through Lagos - live!</p>


                    <div className=" mt-3 flex flex-col gap-2  " >
                        <p className="text-[15px] font-semibold text-[#EF8F57]  " >Follow Lagos Rhythm on our social media pages for real-time updates.</p>
                        <ul className="w-full flex items-center gap-2 justify-center " >

                            <li> <a href="https://www.facebook.com/profile.php?id=61576980652512" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#05073C] transition-colors duration-150 ease-in-out " >
                                <Facebook size={17} />
                            </a></li>

                            <li>
                                <a href="https://vm.tiktok.com/ZMSVpqPpC/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#05073C] transition-colors duration-150 ease-in-out " >
                                    <BsTiktok size={17} />
                                </a>
                            </li>

                            <li>

                                <a href="https://youtube.com/@lagosrhythm?si=6Uyn540adjOMeWmW" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#05073C] transition-colors duration-150 ease-in-out ">
                                    <Youtube size={17} />
                                </a>
                            </li>

                            <li>

                                <a href="https://www.instagram.com/lagos_rhythm/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#05073C] transition-colors duration-150 ease-in-out ">
                                    <Instagram size={17} />
                                </a>
                            </li>

                            <li>
                                <a href="https://www.linkedin.com/company/lagos-rhythm/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#EF8F57] hover:text-[#05073C] transition-colors duration-150 ease-in-out ">
                                    <Linkedin size={17} />
                                </a>
                            </li>


                        </ul>
                    </div>
                </div>



            </div>

        </div>
    )
}