"use client"

import { ReactNode } from "react"
import { A11y, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

interface StreetRhythmCarouselProps<T> {
    items: T[]
    renderSlide: (item: T, index: number) => ReactNode
}

export default function StreetRhythmCarousel<T>({
    items,
    renderSlide
}: StreetRhythmCarouselProps<T>) {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
                640: {
                    slidesPerView: 1.15
                },
                768: {
                    slidesPerView: 1.5
                },
                1024: {
                    slidesPerView: 2.2
                },
                1280: {
                    slidesPerView: 2.6
                }
            }}
            className="w-full !pb-12"
        >
            {items.map((item, index) => (
                <SwiperSlide key={index} className="!h-auto">
                    <div className="h-full">
                        {renderSlide(item, index)}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
