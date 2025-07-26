"use client"

import Button from "@/components/common/Button";
import ReusableHero from "@/components/ReusableHero";
import { whatToExpectData, whoCanJoinData } from "@/data/data";
import Link from "next/link";






export default function Page() {

    return (
        <div className=" w-full bg-[#FDF4F1] " >
            <ReusableHero
                pageTitle="Welcome to E-Rhythm"
                subtitle={<>Free. Live. Raw. <br /> Lagos right from your screen.</>}
                image="/free_E_Rhythm/free_E-Rhythm.jpg"
                description=" Join our free live-streamed tours and experience the rhythm of Lagos in real time, guided by locals and powered by culture."
            />


            <section className="text-[#05073C] flex flex-col items-center gap-26 px-4 py-16  relative " >
                <div className="text-center flex items-center justify-center gap-4 flex-col " >
                    <h2 className="font-bold text-2xl  md:text-3xl font-merienda" >What is <span className=" text-[#EF8F57] " >Free E-Rhythm</span> ? </h2>
                    <p className=" text-base md:text-lg font-normal text-[#05073C] font-merriweather max-w-3xl " >Free E-Rhythm is your open-access window into the energy, beauty, and people of Lagos, live and direct.</p>
                </div>



                <div className=" w-full max-w-6xl flex flex-col items-start gap-1  rounded-lg overflow-hidden  "  >
                    <div className="w-full flex items-center justify-center text-center px-4 py-7  text-[#05073C] " >
                        <h3 className="font-merriweather text-3xl font-semibold " >What you can expect</h3></div>
                    <div className="w-full  grid grid-cols-1 md:grid-cols-3  place-items-center justify-items-center gap-5 py-4 px-5 md:px-6 font-lato " >
                        {whatToExpectData.map((point, index) => (
                            <div key={index} className=" text-base md:text-lg w-full h-full font-semibold  text-center flex flex-col gap-1 items-center bg-[#ffffff] py-5 px-4 shadow-lg rounded-sm " > {point.icon} {point.text} </div>
                        ))}
                    </div>
                </div>


                <div className=" w-full max-w-5xl flex flex-col items-start gap-4 bg-[#ffffff] rounded-lg overflow-hidden shadow-xl">
                    <div className="w-full flex items-center justify-center text-center px-4 py-7 bg-[#05073C] text-[#ffffff] " >
                        <h4 className="font-merriweather text-3xl font-semibold ">Who can join ?</h4></div>
                    <h5 className="mx-auto  text-[#05073C] font-semibold text-lg md:text-xl font-merriweather mt-3 " > Free E-Rhythm is open to:</h5>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2  place-items-center justify-items-center gap-6 pt-10 pb-5 px-5 md:px-6 font-lato " >

                        {whoCanJoinData.map((point, index) => (
                            <div key={index} className=" text-base md:text-lg  w-full font-semibold  text-center flex flex-col items-center justify-center gap-1 bg-[#FDF4F1] py-5 px-4 relative  " >
                                {point.icon}
                                {point.text}
                                <span className="absolute border-t-2 border-r-2  border-[#EF8F57] h-5 w-5 top-[-6px] right-[-6px]  " />
                                <span className="absolute border-b-2 border-l-2  border-[#EF8F57] h-5 w-5 bottom-[-6px] left-[-6px]  " />
                                <span className=" font-merriweather absolute top-2 left-3 text-3xl font-semibold text-[#EF8F57] p-2 h-14 w-14 bg-white shadow-xl rounded-full flex items-center justify-center " > {index + 1} </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-5 items-center justify-center  mx-auto my-5 px-5 text-center  " >
                        <h5 className="mx-auto  text-[#05073C] font-semibold text-lg md:text-xl font-merriweather mt-3 " >We believe culture should be shared, not gated.</h5>

                        <Link href={"/book_form"} > <Button ariaLabel="Book a tour" label="Book a tour" type="button" variant="primary" className="w-fit !bg-[#EF8F57] text-white !py-4 shadow-xl hover:scale-90 transition-transform duration-150 ease-in-out " /></Link>
                    </div>

                </div>
            </section>
        </div>
    )
}