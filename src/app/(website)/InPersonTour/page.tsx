"use client"



import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { SetStateAction, useEffect, useMemo, useState } from "react"
import Button from "@/components/common/Button"
import { inpersonExperience, themeJourneys } from "@/data/data"
import Image from "next/image"
import { Users, X } from "lucide-react"
import { useAppContext } from "@/app/context/AppContext"
import { ThemeJourneyType } from "@/Types/ThemeJourneyType"
import { useRouter } from "next/navigation"










interface PreviewModalProps {
    setShowPreviewModal: React.Dispatch<SetStateAction<boolean>>
    data?: ThemeJourneyType
}





const PreviewModal = ({ setShowPreviewModal, data }: PreviewModalProps) => {


    const { setInpersonTourPackage } = useAppContext()


    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="fixed top-0 left-0 h-screen w-full bg-black/2 backdrop-blur-sm z-30 flex items-center justify-center px-3 py-6  " >



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

                    <button onClick={() => setShowPreviewModal(false)} className="ml-auto text-red-600 font-bold cursor-pointer  p-0.5 flex items-center justify-center  " ><X size={30} /> </button>


                    <h1 className=" mx-auto font-merriweather text-xl font-bold text-[#05073C] " >Choose a package</h1>

                    <div className={`w-full h-full grid grid-cols-1 md:grid-cols-2 place-items-center  justify-items-center gap-5  `} >
                        {(data?.majorPackages ?? data?.minorPackages)?.map((item) => {

                            return (

                                <Link key={item.id} href={"/Inperson-Form"} className=" w-full " >
                                    <button
                                        onClick={() => setInpersonTourPackage(item.title)}
                                        className="w-full h-full py-3 px-2 bg-[#ffffff]  text-[#05073C] cursor-pointer flex items-center flex-col gap-2 justify-center shadow-xl rounded-sm text-sm hover:scale-105 transition-all transform duration-150 ease-in-out font-lato  " >
                                        <Users color="#EF8F57" />
                                        <span className="font-semibold text-base " >            {item.title}</span>
                                        {
                                            item.options.map((option, i) => (
                                                <span key={i}>              <span className="text-[#EF8F57] ml-1 font-semibold "> {option.duration}: </span>${option.price} </span>
                                            ))

                                        }
                                    </button>
                                </Link>
                            )
                        })}
                    </div>
                </motion.div>






            </motion.div>
        </AnimatePresence>
    )
}








export default function Page() {

    const MotionButton = useMemo(() => motion(Button), [])
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    const { setSelectedInpersonTheme } = useAppContext()
    const [selectedThemeIndex, setSelectedThemeIndex] = useState(0)
    const router = useRouter()

    useEffect(() => {

        document.body.style.overflowY = showPreviewModal ? "hidden" : "auto"

    }, [showPreviewModal])


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


                    <Link href={"#inpersonThemes"} >
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

            <section className=" w-full h-full py-16 px-[5%] pb-20 flex flex-col items-center gap-14 bg-[#FDF4F1] ">
                <h1 className="text-[#05073C] font-bold text-2xl  md:text-3xl font-merienda ">What you <span className="text-[#EF8F57] ">experience</span>  </h1>


                {/* The services section  */}
                <section className="w-full h-full flex flex-col  items-center justify-center gap-7 md:gap-0    font-poppins " >


                    {inpersonExperience.map((service, i) => (
                        <div key={i} className={`w-full max-w-7xl flex flex-col items-center  md:h-[400px] ${i % 2 === 0 ? " md:flex-row-reverse" : "md:flex-row"} `} >

                            <div className="bg-gray-300 w-full md:basis-1/2 h-full hidden md:block " >
                                <Image src={service.image} alt={service.title} width={1000} height={1000} className="w-full h-full object-cover object-center" />
                            </div>


                            <div className="md:basis-1/2 w-full h-full px-5 lg:px-10 py-4 md:py-16 flex items-start justify-center flex-col gap-1.5 md:gap-3.5 text-start " >
                                <h3 className="text-xl md:text-2xl font-extrabold text-[#EF8F57] mb-4 font-merienda ">{service.title} </h3>
                                <p className="text-lg md:text-xl mb-3 md:mb-5 whitespace-pre-line text-[#05073C] font-playfair "> {service.description} </p>
                            </div>

                        </div>
                    ))}






                </section>

            </section>





















            {/* Themes  */}
            <section id="inpersonThemes" className=" w-full h-full py-[4%] px-[3%] pb-20 flex flex-col items-center gap-10 bg-[#FDF4F1] ">
                <h1 className="text-[#05073C] font-bold text-2xl  md:text-3xl font-merienda ">THEMED  <span className="text-[#EF8F57] ">JOURNEYS</span>  </h1>



                <div className=" w-full  h-fit py-7 grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 gap-8 place-items-center justify-items-center px-1 " >


                    {themeJourneys.map((data, index) => (
                        <div key={index} className=" relative pb-3 px-1 flex flex-col gap-1 w-full text-black h-52 ">

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

                                <Button onClick={() => {
                                    setSelectedInpersonTheme(data.title)
                                    setSelectedThemeIndex(index)
                                    if (data.majorPackages || data.minorPackages) {
                                        setShowPreviewModal(true);
                                    } else {
                                        router.push("/Inperson-Form");
                                    }
                                }}
                                    ariaLabel="Get started" label="Get started" type="button" variant="primary" className="w-fit !bg-[#EF8F57] text-white !py-2 ml-auto " />
                            </div>

                        </div>
                    ))}

                </div>
            </section>



            {
                showPreviewModal && <PreviewModal setShowPreviewModal={setShowPreviewModal} data={themeJourneys[selectedThemeIndex]} />
            }









        </>
    )
}