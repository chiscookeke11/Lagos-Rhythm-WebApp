"use client"

import { useAppContext } from "@/app/context/AppContext"




export default function Page() {

      const { inpersonTourPackage } = useAppContext()



    return (
        <div className="w-full h-screen text-black flex items-center justify-center" >

        {inpersonTourPackage}
        </div>
    )
}