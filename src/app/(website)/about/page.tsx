"use client"

import ReusableHero from "@/components/ReusableHero";
import Image from "next/image";
import { motion } from "framer-motion";





export default function Page() {
    return (
        <>
            <ReusableHero
                pageTitle="About Lagos Rhythm"
                image="/about/about-hero.jpg"
            />


            <section className=" w-full flex flex-col items-center bg-[#FDF4F1] gap-6  py-10 px-[6%] lg:px-[10%] relative  " >

                <div className="w-full flex flex-col gap-1 text-center mb-10 " >
                    <h2 className=" font-merienda font-semibold text-3xl text-[#EF8F57]"  >Lagos Rhythm</h2>
                    <p className="font-lato text-lg font-medium text-[#05073C]" >Live the vibe, please the mind.</p>
                </div>

                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full flex items-center flex-col md:flex-row justify-between gap-10 my-4 " >
                    <p className="basis-1/2 text-base md:text-xl font-normal font-lato text-[#05073C] text-justify " >Lagos Rhythm is a tourism-tech startup redefining how global audiences engage with culture and place in real time.<br />
                        We begin in Lagos, Nigeria, Africa’s most vibrant megacity, offering immersive virtual and onsite tours that serve as both entertainment and cultural education.
                    </p>
                    <div className=" basis-1/2  flex items-center justify-center  " >
                        <div className=" h-[320px] w-[323px] md:h-[360px] md:w-[363px] lg:h-[450px] lg:w-[453px]   flex items-center justify-center relative  " >
                            <div className="z-10 h-[250px] w-[253px] lg:h-[350px] lg:w-[353px]  transform relative before:absolute before:right-[-10px] before:top-[-10px] before:border-r-4 before:border-t-4 before:border-[#EF8F57] before:h-full before:w-full   " >
                                <Image src={"/about/image.jpg"} alt="image" width={500} height={500} className=" w-full h-full object-cover object-center " />
                            </div>
                        </div>

                    </div>

                </motion.div>



                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full flex items-center flex-col  justify-between gap-10  md:flex-row-reverse my-4 " >
                    <div className="w-full basis-1/2 " >
                        <h3 className=" font-merienda font-semibold text-2xl text-[#EF8F57]  ">Our Vision</h3>
                        <p className=" text-base md:text-xl font-normal font-lato text-[#05073C] text-justify" >To show the world the 3Ws of Lagos: What it is, ways it prospers, and where it inspires.</p>
                    </div>

                    <div className=" basis-1/2  flex items-center justify-center  " >
                        <div className=" h-[320px] w-[323px] md:h-[360px] md:w-[363px] lg:h-[450px] lg:w-[453px]   flex items-center justify-center relative  " >
                            <div className="z-10 h-[250px] w-[253px] lg:h-[350px] lg:w-[353px]  transform relative before:absolute before:right-[-15px] before:top-[6px] before:border-r-4 before:border-b-4 before:border-[#EF8F57] before:h-full before:w-full  " >
                                <Image src={"/about/our-vision.jpg"} alt="image" width={400} height={400} className=" w-full h-full object-cover object-center mt-[-12px] " />
                            </div>
                        </div>

                    </div>




                </motion.div>



                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full flex items-center flex-col  justify-between gap-10 md:flex-row  my-4" >
                    <div className="w-full basis-1/2 ">
                        <h3 className=" font-merienda font-semibold text-2xl text-[#EF8F57]  ">Our Mission</h3>
                        <p className=" text-base md:text-xl font-normal font-lato text-[#05073C] text-justify "  >Our mission is to redefine how Lagos is seen and experienced by bringing its culture, people, and energy to the world in their truest form.</p>
                    </div>

                    <div className=" basis-1/2  flex items-center justify-center  " >
                        <div className=" h-[320px] w-[323px] md:h-[360px] md:w-[363px] lg:h-[450px] lg:w-[453px]   flex items-center justify-center relative  " >
                            <div className="z-10 h-[220px] w-[223px] md:h-[250px] md:w-[253px] lg:h-[300px] lg:w-[303px]  transform  relative before:absolute before:left-[-10px] before:bottom-[-10px] before:border-l-4 before:border-b-4 before:border-[#EF8F57] before:h-full before:w-full " >
                                <Image src={"/about/our-mission.jpg"} alt="image" width={400} height={400} className=" w-full h-full object-cover object-center " />
                            </div>
                        </div>

                    </div>




                </motion.div>


                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full flex items-center flex-col  justify-between gap-10  md:flex-row-reverse my-4 " >
                    <div className="w-full basis-1/2 " >
                        <h3 className=" font-merienda font-semibold text-2xl text-[#EF8F57]  ">Our Story</h3>
                        <p className=" text-base md:text-xl font-normal font-lato text-[#05073C] text-justify"  >Lagos Rhythm was born from a simple truth: you can’t know a city by standing outside its gates.<br />
                            Lagos is loud. Lagos is layered. Lagos is legendary.<br />
                            And yet still misunderstood and underrepresented in the global travel space.<br />
                            The world sees the traffic but not the tempo. The noise but not the nuance.<br />
                            We created Lagos Rhythm to change that.<br />
                            To challenge the stereotypes.<br />
                            To rewrite the narrative.<br />
                            To show Lagos not in filters or fragments, but in her natural, living form.<br />
                            Through live virtual tours and curated travel experiences, we stream the streets, the stories, and the soul of the city unpolished, unscripted, unforgettable.<br />
                            Born in Lagos. Built for the world.
                        </p>
                    </div>

                    <div className=" basis-1/2  flex items-center justify-center  " >
                        <div className=" h-[320px] w-[323px] md:h-[360px] md:w-[363px] lg:h-[450px] lg:w-[453px]   flex items-center justify-center relative  " >
                            <div className="z-10 h-[250px] w-[253px] lg:h-[350px] lg:w-[353px]  transform   relative before:absolute before:left-[-10px] before:top-[-10px] before:border-l-4 before:border-t-4 before:border-[#EF8F57] before:h-full before:w-full   " >
                                <Image src={"/about/our-story.jpg"} alt="image" width={500} height={500} className=" w-full h-full object-cover object-center " />
                            </div>
                        </div>

                    </div>




                </motion.div>



                <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full flex items-center flex-col  justify-between gap-10 md:flex-row my-4  " >
                    <div className="w-full basis-1/2 text-justify">
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
                            <div className="z-10 h-[280px] w-[283px] lg:h-[350px] lg:w-[353px]  transform   relative before:absolute before:left-[-10px] before:bottom-[-10px] before:border-l-4 before:border-b-4 before:border-[#EF8F57] before:h-full before:w-full  " >
                                <Image src={"/about/partners.jpg"} alt="image" width={400} height={400} className=" w-full h-full object-cover object-center " />
                            </div>
                        </div>

                    </div>




                </motion.div>


            </section>

        </>
    )
}