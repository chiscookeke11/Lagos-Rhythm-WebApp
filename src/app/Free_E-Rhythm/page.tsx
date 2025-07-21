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
                    <Link href={"/book_form"} > <Button ariaLabel="Book a tour" label="Book a tour" type="button" variant="primary" className="w-fit !bg-[#EF8F57] text-white !py-4 shadow-xl mt-5 mb-10 hover:scale-90 transition-transform duration-150 ease-in-out " /></Link>
                </div>



                <div className=" w-full max-w-5xl flex flex-col items-start gap-4 bg-[#ffffff] rounded-lg overflow-hidden shadow-xl "  >
                    <div className="w-full flex items-center justify-center text-center px-4 py-7 bg-[#05073C] text-[#ffffff] " >
                        <h3 className="font-merriweather text-3xl font-semibold " >What you can expect</h3></div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 py-10 px-5 md:px-6 font-lato " >
                        {whatToExpectData.map((point, index) => (
                            <div key={index} className=" text-base md:text-lg  font-semibold  text-center flex flex-col gap-1 items-center " > {point.icon} {point.text} </div>
                        ))}
                    </div>
                </div>


                <div className=" w-full max-w-5xl flex flex-col items-start gap-4 bg-[#ffffff] rounded-lg overflow-hidden shadow-xl">
                    <div className="w-full flex items-center justify-center text-center px-4 py-7 bg-[#05073C] text-[#ffffff] " >
                        <h4 className="font-merriweather text-3xl font-semibold ">Who can join ?</h4></div>
                    <h5 className="mx-auto  text-[#05073C] font-semibold text-lg md:text-xl font-merriweather mt-3 " > Free E-Rhythm is open to:</h5>
                    <div className="w-full grid grid-cols-2  place-items-center justify-items-center gap-5 pt-10 pb-5 px-5 md:px-6 font-lato " >

                        {whoCanJoinData.map((point, index) => (
                            <div key={index} className=" text-base md:text-lg  font-semibold  text-center flex flex-col items-center justify-center gap-1 " > {point.icon} {point.text} </div>
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