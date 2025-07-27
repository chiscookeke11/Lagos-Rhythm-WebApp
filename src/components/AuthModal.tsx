"use client"

import Button from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useAuth, useClerk, useSignIn, useSignUp } from "@clerk/nextjs";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { ClerkAPIError } from '@clerk/types'
import Image from "next/image";




interface AuthModalProps {
    setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function AuthModal({ setShowAuthModal }: AuthModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const [pendingVerification, setPendingVerification] = useState(false);
    const { signUp, setActive } = useSignUp();
    const [signingUp, setSigningUp] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [variant, setVariant] = useState("login")
    const [code, setCode] = useState("");
    const { signOut } = useClerk()
    const { isSignedIn } = useAuth()
    const { signIn, setActive: signInActive } = useSignIn()




    console.log(isSignedIn)


    // sign up function
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
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



    // verification function
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



    // sign in function
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSigningUp(true)

        try {
            const result = await signIn?.create({
                strategy: 'password',
                identifier: email,
                password: password
            })
            if (result?.status === "complete") {
                await signInActive?.({ session: result.createdSessionId })
                router.push("/")
            }
            else {
                // Handle cases where additional steps might be needed
                console.log("Sign-in not complete:", result?.status)
            }
        }
        catch (error) {
            console.error("sign in failed", error)

            if (error instanceof Error) {
                toast.error(error.message)
            } else if (typeof error === 'object' && error !== null && 'errors' in error) {
                const clerkError = error as { errors: ClerkAPIError[] }
                toast.error(clerkError.errors?.[0]?.message || "Sign-in failed. Please try again.")
            } else {
                toast.error("An unexpected error occurred. Please try again.")
            }
        }
        finally {
            setSigningUp(false)
        }
    }



    // google auth
    const handleGoogleAuth = async () => {
        try {
            await signIn?.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: window.location.origin + '/sso-callback',
                redirectUrlComplete: window.location.origin + '/'
            })
        } catch (error: unknown) {
            console.error("Google OAuth failed:", error)

            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Failed to initiate Google sign-in. Please try again.")
            }
        }
    }


    // logout function
    const handleLogOut = async () => {
        await signOut({ redirectUrl: '/auth' })
    }


    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])



    return (
        <div
            onClick={() => setShowAuthModal(false)}
            className=" fixed h-screen w-full flex items-center justify-center bg-transparent backdrop-blur-md top-0 left-0 px-5 py-7 " >
            {!pendingVerification ? (


                <form
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    onSubmit={variant === "login" ? handleSignIn : handleSignUp} className="w-full max-w-md flex items-center justify-center flex-col gap-6 z-10 bg-[#FDF4F1] rounded-md py-7 px-6 " >
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

                    {variant === "register" && (
                        <Input
                            type="text"
                            value={confirmPassword}
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather  "
                        />
                    )}


                    <Button
                        label={signingUp ? <Loader /> : "Submit"}
                        ariaLabel="Submit"
                        type="submit"
                        variant="primary"
                        className="w-full !bg-[#EF8F57] text-white "
                    />




                    {variant === "login" ?
                        <p className="text-[#05073C] font-medium text-lg font-merienda text-center" >Don&apos;t have an account? <button onClick={toggleVariant} type="button" className="text-[#EF8F57] bg-transparent cursor-pointer " >Create account </button></p>
                        :
                        <p className="text-[#05073C] font-medium text-lg font-merienda text-center" >Already have an account? <button onClick={toggleVariant} type="button" className="text-[#EF8F57] bg-transparent cursor-pointer " >Sign in </button></p>}

                    <button onClick={handleLogOut} type="button" className="bg-red-600 hidden " >Log out</button>

                    <button onClick={handleGoogleAuth} type="button" className="border-[#EF8F57] border-2 h-10 w-10 rounded-sm p-2 cursor-pointer flex items-center justify-center " >
                        <Image src={"/logos/google-icon.svg"} alt="google" width={100} height={100} className="w-full h-full" />
                    </button>
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




        </div>
    )
}