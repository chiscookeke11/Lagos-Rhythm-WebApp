"use client"

import Summary from "@/components/dashboard/Summary"
import VisitorInsight from "@/components/dashboard/VisitorInsights"





export default function DashboardPage() {







    return (
        <div className="h-fit w-full flex flex-col items-start gap-5  py-2 px-5 font-lato " >
            <div className="w-full h-fit grid grid-cols-6 place-items-center justify-items-end  gap-7" >
                <Summary />
                <VisitorInsight/>
            </div>
        </div>
    )
}