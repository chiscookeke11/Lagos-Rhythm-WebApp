"use client"
import Button from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { ClerkAPIError } from '@clerk/types'
import Image from "next/image";
import { Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";

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
    const [signingIn, setSigningIn] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [variant, setVariant] = useState("login")
    const [code, setCode] = useState("");
    const [showPassword, setShowPassword] = useState(false)


    const { signIn, setActive: signInActive } = useSignIn()

    // sign up function with password validation
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

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
            toast.success("Verification code sent to your email!");
        } catch (error) {
            console.error("Error requesting verification code:", error);

            if (error instanceof Error) {
                toast.error(error.message)
            } else if (typeof error === 'object' && error !== null && 'errors' in error) {
                const clerkError = error as { errors: ClerkAPIError[] }
                toast.error(clerkError.errors?.[0]?.message || "Sign up failed. Please try again.")
            } else {
                toast.error("Sign up failed. Please try again.")
            }
        } finally {
            setSigningUp(false)
        }
    };

    //  verification function with  error handling
    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (code.length < 6) {
            toast.error("Please enter a valid verification code");
            return;
        }

        setVerifying(true)
        try {
            const completeSignUp = await signUp?.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp?.status === "complete") {
                await setActive?.({
                    session: completeSignUp.createdSessionId
                })
                toast.success("Account verified successfully!");
                setShowAuthModal(false);
                router.push("/")
            } else {
                toast.error("Verification incomplete. Please try again.");
            }
        } catch (error) {
            console.error("verification error", error)

            if (error instanceof Error) {
                toast.error(error.message)
            } else if (typeof error === 'object' && error !== null && 'errors' in error) {
                const clerkError = error as { errors: ClerkAPIError[] }
                toast.error(clerkError.errors?.[0]?.message || "Verification failed. Please try again.")
            } else {
                toast.error("Verification failed. Please try again.")
            }
        } finally {
            setVerifying(false)
        }
    }

    //  sign in function
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (email.length < 1 || password.length < 1) {
            toast.error("Please fill in all fields");
            return;
        }

        setSigningIn(true)
        try {
            const result = await signIn?.create({
                strategy: 'password',
                identifier: email,
                password: password
            })

            if (result?.status === "complete") {
                await signInActive?.({ session: result.createdSessionId })
                toast.success("Signed in successfully!");
                setShowAuthModal(false);
                router.push("/")
            } else {
                console.log("Sign-in not complete:", result?.status)
                toast.error("Sign-in incomplete. Please try again.");
            }
        } catch (error) {
            console.error("sign in failed", error)

            if (error instanceof Error) {
                toast.error(error.message)
            } else if (typeof error === 'object' && error !== null && 'errors' in error) {
                const clerkError = error as { errors: ClerkAPIError[] }
                toast.error(clerkError.errors?.[0]?.message || "Sign-in failed. Please try again.")
            } else {
                toast.error("An unexpected error occurred. Please try again.")
            }
        } finally {
            setSigningIn(false)
        }
    }

    // google auth function
    const handleGoogleAuth = async () => {
        setGoogleLoading(true)
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
        finally {
            setGoogleLoading(false)
        }
    }



    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false)
    }, [])

    return (
        <div
            className="fixed h-screen w-full flex items-center justify-center bg-transparent backdrop-blur-md top-0 left-0 px-5 py-7"
        >
            {!pendingVerification ? (
                <form
                    onSubmit={variant === "login" ? handleSignIn : handleSignUp}
                    className="w-full max-w-md flex items-center justify-center flex-col gap-6 z-10 bg-[#FDF4F1] rounded-md py-7 px-6 shadow-lg "
                >

                    <button onClick={() => setShowAuthModal(false)} className="text-red-600 ml-auto cursor-pointer " ><X size={32} /></button>



                    <h1 className="font-merienda font-extrabold text-[#EF8F57] text-xl md:text-3xl">
                        {variant === "login" ? "Sign In" : "Create an account"}
                    </h1>

                    <Input
                        type="email"
                        value={email}
                        placeholder="JohnAde@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather"
                        required
                    />

                    <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather"
                        required
                    />

                    {variant === "register" && (
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather"
                            required
                        />
                    )}


                    <div className="ml-auto flex flex-col gap-[2px] " >
                        {variant === "login" && (<Link href={"/reset-password"} onClick={() => setShowAuthModal(false)} className=" text-[#EF8F57] ml-auto " > Forgot password </Link>)}

                        <button
                            onClick={() => setShowPassword((prev) => !prev)}
                            type="button"
                            className=" ml-auto cursor-pointer text-[#EF8F57] " > {showPassword ? <EyeOff /> : <Eye />} </button>
                    </div>

                    <Button
                        label={(variant === "login" ? signingIn : signingUp) ? <Loader /> : "Submit"}
                        ariaLabel="Submit"
                        type="submit"
                        variant="primary"
                        className="w-full !bg-[#EF8F57] text-white"
                        disabled={variant === "login" ? signingIn : signingUp}
                    />

                    {variant === "login" ? (
                        <p className="text-[#05073C] font-medium text-lg font-merienda text-center">
                            Don&apos;t have an account?{" "}
                            <button onClick={toggleVariant} type="button" className="text-[#EF8F57] bg-transparent cursor-pointer">
                                Create account
                            </button>
                        </p>
                    ) : (
                        <p className="text-[#05073C] font-medium text-lg font-merienda text-center">
                            Already have an account?{" "}
                            <button onClick={toggleVariant} type="button" className="text-[#EF8F57] bg-transparent cursor-pointer">
                                Sign in
                            </button>
                        </p>
                    )}

                    <button
                        onClick={handleGoogleAuth}
                        type="button"
                        className="border-[#EF8F57] border-2  rounded-sm p-3 cursor-pointer flex items-center justify-center"
                    >
                        {googleLoading ? <Loader color="bg-[#EF8F57]" /> : <Image src={"/logos/google-icon.svg"} alt="google" width={100} height={100} className="w-full h-full" />}
                    </button>
                </form>
            ) : (
                <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleVerify}
                    className="w-full max-w-md flex items-center justify-center flex-col gap-6 z-10 bg-[#FDF4F1] rounded-md py-7 px-6 shadow-lg"
                >
                    <h1 className="font-merienda font-extrabold text-[#05073C] text-xl md:text-3xl text-center">
                        Please enter your <span className="text-[#EF8F57]">verification code</span>
                    </h1>

                    <Input
                        type="text"
                        value={code}
                        placeholder="Enter verification code"
                        onChange={(e) => setCode(e.target.value)}
                        className="py-5 px-5 text-lg font-normal outline-none border-2 border-[#EF8F57] shadow-none focus:shadow-none focus:border-none focus:outline-none text-[#131313] font-merriweather"
                        maxLength={6}
                        required
                    />

                    <Button
                        label={verifying ? <Loader /> : "Verify"}
                        ariaLabel={verifying ? "verifying" : "Verify"}
                        type="submit"
                        variant="primary"
                        className="w-full !bg-[#EF8F57] text-white"
                        disabled={verifying}
                    />

                    <button
                        onClick={() => setPendingVerification(false)}
                        type="button"
                        className="text-[#EF8F57] bg-transparent cursor-pointer text-sm"
                    >
                        Back to sign up
                    </button>
                </form>
            )}
        </div>
    );
}