"use client"

import Button from "@/components/common/Button";
import AnimatedBg from "@/components/ui/AnimatedBg";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";




export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const [pendingVerification, setPendingVerification] = useState(false);
    const {  signUp, setActive } = useSignUp();
    const [code, setCode] = useState("");





    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signUp.create({
                emailAddress: email,
                password,
            });
        await signUp?.prepareEmailAddressVerification({
            strategy: "email_code"
        });
        setPendingVerification(true)
        } catch (err: any) {
            console.error("Error requesting verification code:", err.errors);
        }
    };


    const handleVerify = async () => {
        try {
            const completeSignUp = await signUp?.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp?.status === "complete") {
                await setActive({
                    session: completeSignUp.createdSessionId
                })
                router.push("/store")
                console.log("Sign up successful")
            }
        }
        catch (err) {
            console.error("verification error", err)
        }
    }






    return (
        <div className=" w-full h-screen flex items-center justify-center bg-[#05073C] relative px-6 py-7 " >



            {!pendingVerification ? (


                <form onSubmit={handleSubmit} className="w-full max-w-md flex items-center justify-center flex-col gap-6 z-10 bg-[#FDF4F1] rounded-md py-7 px-6 " >
                    <h1 className="font-merienda font-extrabold text-[#05073C] text-xl md:text-3xl " >Enter Your <span className=" text-[#EF8F57]">Email</span></h1>

                    <Input
                        type="email"
                        value={email}
                        placeholder="JohnAde@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather  "
                    />

                        <Input
                        type="text"
                        value={password}
                        placeholder="chiNed343@32"
                        onChange={(e) => setPassword(e.target.value)}
                        className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather  "
                    />


                    <Button
                        label="Submit"
                        ariaLabel="Submit"
                        type="submit"
                        variant="primary"
                        className="w-full !bg-[#EF8F57] text-white "
                    />



                </form>
            ) :



                (
                    <form onSubmit={handleVerify} className="w-full max-w-md flex items-center justify-center flex-col gap-6 z-10 bg-[#FDF4F1] rounded-md py-7 px-6 " >
                        <h1 className="font-merienda font-extrabold text-[#05073C] text-xl md:text-3xl text-center" >Please enter your  <span className=" text-[#EF8F57]">verification code</span></h1>


                        <Input
                            type="email"
                            value={code}
                            placeholder="Enter verification code"
                            onChange={(e) => setCode(e.target.value)}
                            className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather  "
                        />


                        <Button
                            label="Submit"
                            ariaLabel="Submit"
                            type="submit"
                            variant="primary"
                            className="w-full !bg-[#EF8F57] text-white "
                        />


                    </form>
                )
            }




            <AnimatedBg />
        </div>
    )
}