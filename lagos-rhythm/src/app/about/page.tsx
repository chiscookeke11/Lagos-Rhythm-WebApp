"use client"

import ReusableHero from "@/components/ReusableHero";
import Image from "next/image";
import { motion } from "framer-motion";




export default function Page() {
    return (
        <>
            <ReusableHero
                pageTitle="About Lagos Rhythm"
            //  subtitle="Lagos"
            //  description="Live the vibe, please the mind."
            />


            <section className=" w-full flex flex-col items-center bg-[#FDF4F1] gap-6  py-10 px-[6%] lg:px-[10%]  " >
                <div className="w-full flex flex-col gap-1 text-center mb-10 " >
                    <h2 className=" font-merienda font-semibold text-3xl text-[#EF8F57]"  >Lagos Rhythm</h2>
                    <p className="font-lato text-lg font-medium text-[#05073C]" >Live the vibe, please the mind.</p>
                </div>

                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-full flex items-center flex-col md:flex-row justify-between gap-10 my-4 " >
                    <p className="basis-1/2 text-base md:text-xl font-normal font-lato text-[#05073C] " >Lagos Rhythm is a tourism-tech startup redefining how global audiences engage with culture and place in real time.<br />
                        We begin in Lagos, Nigeria, Africa’s most vibrant megacity, offering immersive virtual and onsite tours that serve as both entertainment and cultural education.
                    </p>

                    <div className=" basis-1/2  flex items-center justify-center  " >
                        <div className=" h-[320px] w-[323px] md:h-[360px] md:w-[363px] lg:h-[450px] lg:w-[453px]   flex items-center justify-center relative  " >
                            <Image src={"/about/abstract-star.svg"} alt="shape" height={65} width={65} className="absolute top-3 left-3 z-20 h-[40px] w-[40px] md:h-[65px] md:w-[65px]  " />
                            <Image src={"/about/spring.svg"} alt="shape" height={100} width={200} className="absolute bottom-1 right-3 z-20 w-[100px] md:w-[200px] " />
                            <Image src={"/about/abstract-shape.svg"} alt="shape" fill />
                            <div className="z-10 h-[280px] w-[283px] lg:h-[350px] lg:w-[353px] pentagon transform rotate-[-90deg] " >
                                <Image src={"/BestLocationsImages/LagosFood.jpg"} alt="image" width={300} height={300} className=" w-full h-full object-cover object-center " />
                            </div>
                        </div>

                    </div>

                </motion.div>



                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-full flex items-center flex-col  justify-between gap-10  md:flex-row-reverse my-4 " >
                    <div className="w-full basis-1/2 " >
                        <h3 className=" font-merienda font-semibold text-2xl text-[#EF8F57]  ">Our Vision</h3>
                        <p className=" text-base md:text-xl font-normal font-lato text-[#05073C] " >To show the world the 3Ws of Lagos: What it is, ways it prospers, and where it inspires.</p>
                    </div>

                    <div className=" basis-1/2  flex items-center justify-center  " >
                        <div className=" h-[320px] w-[323px] md:h-[360px] md:w-[363px] lg:h-[450px] lg:w-[453px]   flex items-center justify-center relative  " >
                            <Image src={"/about/abstract-star.svg"} alt="shape" height={65} width={65} className="absolute top-3 left-3 z-20 h-[40px] w-[40px] md:h-[65px] md:w-[65px]  " />
                            <Image src={"/about/spring.svg"} alt="shape" height={100} width={200} className="absolute bottom-1 right-3 z-20 w-[100px] md:w-[200px] " />
                            <Image src={"/about/abstract-shape.svg"} alt="shape" fill />
                            <div className="z-10 h-[280px] w-[283px] lg:h-[350px] lg:w-[353px] pentagon transform rotate-[-90deg] " >
                                <Image src={"/BestLocationsImages/LagosFood.jpg"} alt="image" width={300} height={300} className=" w-full h-full object-cover object-center " />
                            </div>
                        </div>

                    </div>




                </motion.div>



                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-full flex items-center flex-col  justify-between gap-10 md:flex-row  my-4" >
                    <div className="w-full basis-1/2 ">
                        <h3 className=" font-merienda font-semibold text-2xl text-[#EF8F57]  ">Our Mission</h3>
                        <p className=" text-base md:text-xl font-normal font-lato text-[#05073C] "  >Our mission is to redefine how Lagos is seen and experienced by bringing its culture, people, and energy to the world in their truest form.</p>
                    </div>

                    <div className=" basis-1/2  flex items-center justify-center  " >
                        <div className=" h-[320px] w-[323px] md:h-[360px] md:w-[363px] lg:h-[450px] lg:w-[453px]   flex items-center justify-center relative  " >
                            <Image src={"/about/abstract-star.svg"} alt="shape" height={65} width={65} className="absolute top-3 left-3 z-20 h-[40px] w-[40px] md:h-[65px] md:w-[65px]  " />
                            <Image src={"/about/spring.svg"} alt="shape" height={100} width={200} className="absolute bottom-1 right-3 z-20 w-[100px] md:w-[200px] " />
                            <Image src={"/about/abstract-shape.svg"} alt="shape" fill />
                            <div className="z-10 h-[280px] w-[283px] lg:h-[350px] lg:w-[353px] pentagon transform rotate-[-90deg] " >
                                <Image src={"/BestLocationsImages/LagosFood.jpg"} alt="image" width={300} height={300} className=" w-full h-full object-cover object-center " />
                            </div>
                        </div>

                    </div>




                </motion.div>


                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-full flex items-center flex-col  justify-between gap-10 md:flex-row md:flex-row-reverse my-4 " >
                    <div className="w-full basis-1/2 " >
                        <h3 className=" font-merienda font-semibold text-2xl text-[#EF8F57]  ">Our Story</h3>
                        <p className=" text-base md:text-xl font-normal font-lato text-[#05073C] "  >Lagos Rhythm was born from a simple truth: you can’t know a city by standing outside its gates.
                            Lagos is loud. Lagos is layered. Lagos is legendary.
                            And yet still misunderstood and underrepresented in the global travel space.<br />
                            The world sees the traffic but not the tempo. The noise but not the nuance.<br />
                            We created Lagos Rhythm to change that.
                            To challenge the stereotypes.
                            To rewrite the narrative.
                            To show Lagos not in filters or fragments, but in her natural, living form.<br />
                            Through live virtual tours and curated travel experiences, we stream the streets, the stories, and the soul of the city unpolished, unscripted, unforgettable.
                            Born in Lagos. Built for the world.
                        </p>
                    </div>

                    <div className=" basis-1/2  flex items-center justify-center  " >
                        <div className=" h-[320px] w-[323px] md:h-[360px] md:w-[363px] lg:h-[450px] lg:w-[453px]   flex items-center justify-center relative  " >
                            <Image src={"/about/abstract-star.svg"} alt="shape" height={65} width={65} className="absolute top-3 left-3 z-20 h-[40px] w-[40px] md:h-[65px] md:w-[65px]  " />
                            <Image src={"/about/spring.svg"} alt="shape" height={100} width={200} className="absolute bottom-1 right-3 z-20 w-[100px] md:w-[200px] " />
                            <Image src={"/about/abstract-shape.svg"} alt="shape" fill />
                            <div className="z-10 h-[280px] w-[283px] lg:h-[350px] lg:w-[353px] pentagon transform rotate-[-90deg] " >
                                <Image src={"/BestLocationsImages/LagosFood.jpg"} alt="image" width={300} height={300} className=" w-full h-full object-cover object-center " />
                            </div>
                        </div>

                    </div>




                </motion.div>



                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-full flex items-center flex-col  justify-between gap-10 md:flex-row my-4  " >
                    <div className="w-full basis-1/2 ">
                        <h3 className=" font-merienda font-semibold text-2xl text-[#EF8F57]  ">Our Partners & Collaborators</h3>
                        <p className=" text-base md:text-xl font-normal font-lato text-[#05073C] "  >Lagos Rhythm is powered by a growing network of collaborators and allies—people and platforms who believe in the power of cultural storytelling and global connection.</p>
                        <ul className=" text-base md:text-xl  font-lato text-[#05073C] flex flex-col gap-1 list-disc my-4 marker:text-[#F59E0B] pl-5 " >
                            <li className="font-semibold" >Upstyle Travels </li>
                            <li className="font-semibold">Local guides, artists, and cultural curators in Lagos</li>
                            <li className="font-semibold">Diaspora networks, schools, and DEI programs across continents</li>
                        </ul>
                        <p className=" text-base md:text-xl font-normal font-lato text-[#05073C] " >Together, we’re building a bridge between Lagos and the world - one story, one stream, one experience at a time.</p>
                        <p className=" text-base md:text-xl font-normal font-lato text-[#05073C] " >Interested in partnering with us?  <a href="mailto:partners@lagosrhythm.com" target="_blank" className="text-[#F59E0B] font-semibold " >partners@lagosrhythm.com</a> </p>
                    </div>

                    <div className=" basis-1/2  flex items-center justify-center  " >
                        <div className=" h-[320px] w-[323px] md:h-[360px] md:w-[363px] lg:h-[450px] lg:w-[453px]   flex items-center justify-center relative  " >
                            <Image src={"/about/abstract-star.svg"} alt="shape" height={65} width={65} className="absolute top-3 left-3 z-20 h-[40px] w-[40px] md:h-[65px] md:w-[65px]  " />
                            <Image src={"/about/spring.svg"} alt="shape" height={100} width={200} className="absolute bottom-1 right-3 z-20 w-[100px] md:w-[200px] " />
                            <Image src={"/about/abstract-shape.svg"} alt="shape" fill />
                            <div className="z-10 h-[280px] w-[283px] lg:h-[350px] lg:w-[353px] pentagon transform rotate-[-90deg] " >
                                <Image src={"/BestLocationsImages/LagosFood.jpg"} alt="image" width={300} height={300} className=" w-full h-full object-cover object-center " />
                            </div>
                        </div>

                    </div>




                </motion.div>


            </section>

        </>
    )
}