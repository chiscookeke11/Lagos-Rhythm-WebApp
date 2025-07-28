"use client"

import * as React from "react"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useAuth } from "@clerk/clerk-react"
import Loader from "./Loader"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"



export function DropdownMenuCheckboxes() {
    const { user } = useUser()
    const { signOut } = useAuth()
    const [signingOut, setSigningOut] = React.useState(false)
    const router = useRouter()

    const handleSignOut = async () => {
        setSigningOut(true)

        try {
            await signOut()
            toast.success("Sign out successful")
            router.push("/")
        }
        catch (error) {
            console.error(error)
            toast.error("Sign out failed")
        }
        finally {
            setSigningOut(false)
        }

    }

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="default" className="bg-transparent hover:bg-transparent cursor-pointer text-sm md:text-base focus:outline-0 focus:shadow-none shadow-none border-none focus:border-none font-signika " >{user?.primaryEmailAddress?.emailAddress} </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 font-signika flex flex-col items-start justify-center gap-3 p-3 py-5 bg-[#ffffff] border-[#ffffff]">

                <Link href={"/"} className="w-full" > <Button className="w-full text-left items-start cursor-pointer flex justify-start bg-white hover:bg-white text-[#EF8F57] text-base shadow-lg " >View Profile</Button> </Link>
                <Button disabled={!user} onClick={handleSignOut} className={`w-full text-left  cursor-pointer flex  bg-red-600 hover:bg-red-700 text-base shadow-lg ${signingOut ? "justify-center items-center" : "justify-start items-start"} `}> {signingOut ? <Loader /> : "Log out"} </Button>






            </DropdownMenuContent>
        </DropdownMenu>
    )
}
