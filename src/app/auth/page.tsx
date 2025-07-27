"use client"

import Button from "@/components/common/Button";
import AnimatedBg from "@/components/ui/AnimatedBg";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useAuth, useClerk, useSignUp } from "@clerk/nextjs";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";




export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [pendingVerification, setPendingVerification] = useState(false);
    const { signUp, setActive } = useSignUp();
    const [signingUp, setSigningUp] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [variant, setVariant] = useState("login")
    const [code, setCode] = useState("");
    const { signOut } = useClerk()
    const { isSignedIn } = useAuth()




    console.log(isSignedIn)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSigningUp(true)
        try {
            await signUp?.create({
                emailAddress: email,
                password,
            });
            await signUp?.prepareEmailAddressVerification({
                strategy: "email_code"
            });
            setPendingVerification(true)
        } catch (error) {
            console.error("Error requesting verification code:", error);
            toast.error("sign up failed")
        }
        finally {
            setSigningUp(false)
        }
    };


    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setVerifying(true)

        try {
            const completeSignUp = await signUp?.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp?.status === "complete") {
                await setActive?.({
                    session: completeSignUp.createdSessionId
                })
                router.push("/store")
                console.log("Sign up successful")
            }
        }
        catch (error) {
            console.error("verification error", error)
        }
        finally {
            setVerifying(false)
        }
    }



    const handleLogOut = async () => {
        await signOut({ redirectUrl: '/auth' })
    }


    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])



    return (
        <div className=" w-full h-screen flex items-center justify-center bg-[#05073C] relative px-6 py-7 " >



            {!pendingVerification ? (


                <form onSubmit={handleSubmit} className="w-full max-w-md flex items-center justify-center flex-col gap-6 z-10 bg-[#FDF4F1] rounded-md py-7 px-6 " >
                    <h1 className="font-merienda font-extrabold text-[#EF8F57] text-xl md:text-3xl " >{variant === "login" ? "Sign In" : "Create an account"} </h1>

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
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather  "
                    />


                    <Button
                        label={signingUp ? <Loader /> : "Submit"}
                        ariaLabel="Submit"
                        type="submit"
                        variant="primary"
                        className="w-full !bg-[#EF8F57] text-white "
                    />



                    {variant === "login" ?
                        <p className="text-[#05073C] font-medium text-lg font-merienda" >Don&apos;t have an account? <button onClick={toggleVariant} type="button" className="text-[#EF8F57] bg-transparent cursor-pointer " >Create account </button></p>
                        :
                        <p className="text-[#05073C] font-medium text-lg font-merienda" >Already have an account? <button onClick={toggleVariant} type="button" className="text-[#EF8F57] bg-transparent cursor-pointer " >Sign in </button></p>}

                    <button onClick={handleLogOut} type="button" className="bg-red-600" >Log out</button>


                </form>
            ) :



                (
                    <form onSubmit={handleVerify} className="w-full max-w-md flex items-center justify-center flex-col gap-6 z-10 bg-[#FDF4F1] rounded-md py-7 px-6 " >
                        <h1 className="font-merienda font-extrabold text-[#05073C] text-xl md:text-3xl text-center" >Please enter your  <span className=" text-[#EF8F57]">verification code</span></h1>


                        <Input
                            type="text"
                            value={code}
                            placeholder="Enter verification code"
                            onChange={(e) => setCode(e.target.value)}
                            className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather  "
                        />


                        <Button
                            label={verifying ? (<Loader />) : "Submit"}
                            ariaLabel={verifying ? "verifying" : "Submit"}
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