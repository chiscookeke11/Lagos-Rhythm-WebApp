"use client"


import { statsData, testimonialsData } from "@/data/data";
import TestimonialCard from "./common/TestimonialCard";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';





const TestimonialSlider = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                spaceBetween={20}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className="w-full"
            >
                {testimonialsData.map((data, index) => (
                    <SwiperSlide key={index}>
                        <TestimonialCard data={data} />
                    </SwiperSlide>
                ))}
            </Swiper>


        </>
    );
}





export default function Testimonials() {
    return (
        <section className="w-full bg-[#EB662B0D] py-[7%] px-[10%] flex flex-col items-start justify-center gap-10  " >
            <h2 className="text-[#05073C] font-bold text-2xl md:text-3xl font-playfair  " >What our <span className="text-[#EB662B] ">Travelers</span> are saying</h2>
            <TestimonialSlider />

            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10 pt-[3%] " >


                {statsData.map((data, index) => (
                    <div key={index} className="flex w-full items-start justify-between flex-col gap-1 " >
                        <h3 className=" text-lg lg:text-3xl text-[#05073C] font-bold font-playfair " > {data.value} </h3>
                        <h4 className=" text-sm text-[#05073C] font-semibold font-lato " >{data.content} </h4>

                    </div>
                ))}

            </div>

        </section>
    )
}