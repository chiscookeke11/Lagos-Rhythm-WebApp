"use client";

import { useAppContext } from "@/app/context/AppContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import Loader from "../common/Loader";
import toast from "react-hot-toast";

export default function CountryProtectedRoute({ children }: { children: ReactNode }) {
    const { userData } = useAppContext();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const hasRedirected = useRef(false)


    useEffect(() => {
        if (!userData?.country && !hasRedirected.current) {
            toast.error("Complete your profile to continue.");
            hasRedirected.current = true
            router.replace("/profile");
            return
        } else {
            setIsChecking(false);
        }
    }, [userData, router]);

    if (isChecking) {
        return (
            <div className=" w-full h-screen flex items-center justify-center bg-[#05073C]  " >
                <Loader color="#EF8F57" />
            </div>
        )
            ;
    }

    return <>{children}</>;
}
