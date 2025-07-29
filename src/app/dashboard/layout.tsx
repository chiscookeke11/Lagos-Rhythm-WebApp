"use client"

import Header from "@/components/dashboard/Header";
import SideNav from "@/components/dashboard/SideNav";

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"



// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {


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
    <div className=" bg-[#FAFBFC] w-full h-full relative flex items-start text-black " >
      <SideNav />
      <main className="h-screen overflow-y-auto  w-full relative flex flex-col items-start gap-6 " >
        <Header />
        <div className="w-full h-fit" >
          {children}
        </div>
      </main>
    </div>
  );
}
