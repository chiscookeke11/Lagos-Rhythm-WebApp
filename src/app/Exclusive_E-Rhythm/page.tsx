"use client"


import Button from "@/components/common/Button"
import ThemesSection from "@/components/ThemesSection"
import { motion } from "framer-motion"





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

<ThemesSection/>






        </>
    )
}