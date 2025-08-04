"use client"


import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";






export default function Page() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [successfulCreation, setSuccessfulCreation] = useState(false)
    const router = useRouter()



    const { signIn, setActive } = useSignIn()


    const create = async (e: React.FormEvent) => {
        e.preventDefault()


        if (!email) {
            toast.error("Please enter your email!")
            return;
        }

        setLoading(true)

        try {
            await signIn?.create({
                strategy: "reset_password_email_code",
                identifier: email
            })
            toast("Reset code has been sent to your email")
            setSuccessfulCreation(true)
        }
        catch (err) {
            console.log(err)
            toast.error("Failed")
        }
        finally {
            setLoading(false)
        }

    }



    const reset = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!password || !code) {
            toast.error("Please enter required fields")
            return
        }

        setLoading(true)

        try {
            const changePassword = await signIn?.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code,
                password
            })

            if (changePassword?.status === "complete") {
                toast.success("Password changed successfully")
                setActive?.({ session: changePassword.createdSessionId })
                setEmail("")
                setPassword("")
                setCode("")
                router.push("/")
            }
        }


        catch (err) {
            console.log(err)
            toast.error("failed")
        }

        finally {
            setLoading(false)
        }
    }





    return (
        <div className=" w-full h-screen flex items-center justify-center bg-[#05073C] "  >




            <form onSubmit={successfulCreation ? reset : create} className="w-full max-w-md flex items-center justify-center flex-col gap-6 z-10 bg-[#FDF4F1] rounded-md py-7 px-6 shadow-lg ">



                <div className="flex flex-col gap-1 items-center justify-center" >
                    <h1 className="font-merienda font-extrabold text-[#EF8F57] text-xl md:text-3xl">Recover password</h1>
                    <p className="text-black text-center  text-sm font-medium  " >{!successfulCreation ? ("Enter your email address to receive a password reset code.") : ("Enter your new password and the code sent to your email.")} </p>
                </div>


                {!successfulCreation ?
                    (<>


                        <label htmlFor="email" className="w-full flex flex-col items-start gap-1" >
                            <span className=" text-sm font-bold  text-[#05073C] font-lato ">Email</span>
                            <Input
                                type="email"
                                value={email}
                                placeholder="JohnAde@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather"
                                required
                            />
                        </label>


                        <Button ariaLabel=" Send password reset code" label={loading ? (<Loader />) : " Send password reset code"} type="submit" variant="primary" className="!bg-[#EF8F57] " />
                    </>)
                    :
                    (
                        <>


                            <label htmlFor="password" className="w-full flex flex-col items-start gap-1" >
                                <span className=" text-sm font-bold  text-[#05073C] font-lato " >New Password</span>
                                <Input
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather"
                                    required
                                />
                            </label>



                            <label htmlFor="code" className="w-full flex flex-col items-start gap-1" >
                                <span className=" text-sm font-bold  text-[#05073C] font-lato ">Password Reset Code</span>
                                <Input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    id="code"
                                    className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather"
                                    required
                                />
                            </label>

                            <Button ariaLabel="submit" label={loading ? (<Loader />) : "Reset"} type="submit" variant="primary" className="!bg-[#EF8F57] " />
                        </>
                    )
                }


            </form>


        </div>
    )
}