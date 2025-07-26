"use client"

import Button from "@/components/common/Button";
import AnimatedBg from "@/components/ui/AnimatedBg";
import { Input } from "@/components/ui/input";
import React, {  useState } from "react";




export default function Page() {
    const [inputValue, setInputValue] = useState("")






    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }






    return (
        <div className=" w-full h-screen flex items-center justify-center bg-[#05073C] relative px-6 py-7 " >





            <form onSubmit={handleSubmit} className="w-full max-w-md flex items-center justify-center flex-col gap-6 z-10 bg-[#FDF4F1] rounded-md py-7 px-6 " >
                <h1 className="font-merriweather font-extrabold text-[#05073C] text-xl md:text-3xl " >Enter Your Email</h1>

                <Input
                    type="email"
                    value={inputValue}
                    placeholder="JohnAde@gmail.com"
                    onChange={(e) => setInputValue(e.target.value)}
                    className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none "
                />

                <Button
                    label="Submit"
                    ariaLabel="Submit"
                    type="submit"
                    variant="primary"
                    className="w-full !bg-[#EF8F57] text-white "
                />


                <Button

                    label="log out"
                    ariaLabel="Submit"
                    type="button"
                    variant="primary"
                    className="w-full !bg-[#EF8F57] text-white "
                />


            </form>




            <AnimatedBg />
        </div>
    )
}