"use client"


import Input from "@/components/common/Input";
import { bookFormImages } from "@/data/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";



export default function Page() {
    const [nameFieldCount, setNameFieldCount] = useState<number>(3)
    // const [emailFieldCount, setEmailFieldCount] = useState(3)
    const [touristNames, setTouristNames] = useState<string[]>([])

    const handlePassengerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {




        const count = parseInt(e.target.value) || 0

        if (count > 11) return;

        setNameFieldCount(count)



    }

    const handleNameChange = (index: number, value: string) => {
        const updated = [...touristNames]
        updated[index] = value
        setTouristNames(updated)
    }


    useEffect(() => {
        const updatedNames = Array.from({ length: nameFieldCount }, (_, i) => touristNames[i] || "");
        setTouristNames(updatedNames);
    }, [nameFieldCount]);



    console.log(touristNames)


    return (
        <div className="w-full flex flex-col h-full text-[#05073C] relative">

            <div className="h-[300px] w-full relative " >
                <div className="w-full h-full absolute top-0 left-0  bg-[url('/booking-form/booking-form-hero-bg.jpg')] bg-no-repeat bg-center bg-cover  " />
                <div className="w-full h-full absolute top-0 left-0 bg-black/30 " />
            </div>

            <div className="w-full h-fit flex items-center justify-center bg-[#FDF4F1] z-10 ">
                <div className="flex items-center w-fit flex-col gap-5 lg:gap-10 pb-10 px-4 mt-[-7%]">
                    <div className="w-full flex items-center justify-center gap-4 px-[3%]">
                        {bookFormImages.slice(0, 3).map((data, index) => (
                            <div key={index} title={data.label} className="bg-[#ffffff]   rounded-[20px] flex items-center justify-center w-[100px] h-[100px] md:h-[200px] md:w-[200px] lg:w-[294px] lg:h-[263px] overflow-hidden p-2 md:p-3">
                                <div className="relative h-full w-full">
                                    <Image src={data.img} title={data.label} alt="image" fill className="rounded-[10px]" priority />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex flex-col items-center gap-2 justify-center my-5 lg:my-5 text-center">
                        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-merienda">BOOK YOUR PACKAGE</h1>
                        <p className="font-medium text-base md:text-lg font-lato">Experience Something New Every Moment</p>
                    </div>
                    <input type="number" min={0} max={10} value={nameFieldCount} onChange={handlePassengerCountChange} />

                    <form className="w-full max-w-5xl py-3.5 lg:py-7 px-1 md:px-5 rounded-[20px] flex flex-col items-center gap-7 font-lato">
                        <div className="w-full grid grid-cols-2 gap-5 place-items-center justify-items-center " >

                            {touristNames.map((name, index) => (
                                <Input key={index} name="name" type="text" onChange={(e) => handleNameChange(index, e.target.value)} value={name} isRequired />
                            ))}
                        </div>
                    </form>


                </div>
            </div>
        </div>

    )
}