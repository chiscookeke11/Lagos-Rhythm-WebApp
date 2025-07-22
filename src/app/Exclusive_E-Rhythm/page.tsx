"use client"


import Button from "@/components/common/Button"
import ThemesSection from "@/components/ThemesSection"
import { whatYouGetData } from "@/data/data"
import { motion } from "framer-motion"
import Image from "next/image"



const whatsAppLink = "https://wa.me/2348086695291?text=Hello%20there!%20I%27m%20interested%20in%20learning%20more%20about%20your%20tour%20packages%20and%20destinations.%20Can%20you%20help%20me%20plan%20my%20next%20adventure?"
const bookingLink = "bookings@lagosrhythm.com"




export default function Page() {
    return (
        <>

            {/* hero section  */}
            <section className={`w-full h-screen   bg-no-repeat bg-cover bg-center flex flex-col gap-4 items-center justify-center px-4 py-5 relative `}   >
                <div className="inset-0 bg-black/55 absolute h-full w-full " />
                <div className="overflow-hidden text-center z-10 space-y-1 ">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-semibold text-white text-3xl md:text-4xl lg:text-[70px] lg:leading-[140%] font-merienda">
                        Exclusive E-Rhythm
                    </motion.h1>
                    <motion.h3
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-normal text-xl md:text-2xl text-white font-merienda">
                        Your Private Tour of Lagos. Live, Curated, and Unforgettable
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-normal text-base lg:text-lg text-white font-lato mt-4 max-w-3xl ">
                        Go beyond the surface with a real-time, interactive Lagos experience designed just for your group, wherever you are in the world.
                    </motion.p>


                    <div className=" w-fit flex items-center gap-6  mx-auto mt-12"  >
                        <Button
                            label="Book a Tour"
                            ariaLabel="Book a Tour"
                            type="button"
                        />

                        <Button
                            label="Request a Demo"
                            ariaLabel="Request a Demo"
                            type="button"
                        />
                    </div>
                </div>



            </section >

            <ThemesSection />



            <div className="w-full flex flex-col gap-6 items-center py-16 px-10 bg-[#FDF4F1]">
                <h2 className="text-[#05073C] font-bold text-xl  md:text-2xl font-merienda" >What You Get</h2>




                <ul className=" w-full max-w-xl bg-[#ffffff] flex flex-col  items-center justify-between gap-3 md:gap-5 pl-4 px-3 py-7 shadow-lg rounded-sm " >

                    {
                        whatYouGetData.map((item, index) => (
                            <li key={index} className="h-fit w-full  p-3 rounded-sm relative flex items-center gap-3 text-[#05073C] font-lato text-sm md:text-base font-medium " >
                                <Image src={"/exclusive_Rhythm/pin.png"} alt="pin" height={20} width={20} />
                                {item.label}





                            </li>
                        ))
                    }

                </ul>

            </div>


            <div className="text-black  bg-[#FDF4F1] w-full flex flex-col gap-5 items-center pt-20 pb-10 font-merienda px-5  " >

                <div className="text-center space-y-2 " >
                    <p className=" font-semibold text-xl md:text-3xl " >Exclusive E-Rhythm isn’t just a tour — it’s a connection.</p>
                    <p className=" font-medium text-base md:text-lg ">Bring your group into the energy, stories, and soul of Lagos—live and unfiltered.</p>
                </div>


                <h1 className="font-lato text-center text-sm md:text-base  " >Have questions? Email <a href={`mailto:${bookingLink}`} className="text-[#EF8F57] cursor-pointer" >bookings@lagosrhythm.com</a> or <a href={whatsAppLink} className="text-[#EF8F57] cursor-pointer " >chat</a> with us live.</h1>
            </div>







        </>
    )
}