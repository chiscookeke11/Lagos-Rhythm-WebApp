"use client"


import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"



export default function Dashboard() {
    const { user } = useUser()
    const router = useRouter()




    useEffect(() => {
        if (!user) return

        const email = user.primaryEmailAddress?.emailAddress

        if (email !== "chiscookeke11@gmail.com") {
            router.push("/")
        }
    }, [user, router])


    return (
        <div>
            dashboard
        </div>
    )
}