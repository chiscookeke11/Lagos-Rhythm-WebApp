"use client"

import Button from "@/components/common/Button";
import ReusableHero from "@/components/ReusableHero";
import { useRouter } from "next/navigation";




export default function Page() {
        const router = useRouter()
    return (
        <div className=" w-full bg-[#ffffff] " >
            <ReusableHero pageTitle="Free rehy" />


            <section className="text-[#05073C] " >
                <div>
                    <h2>What is Free E-Rhythm</h2>
                <p>Free E-Rhythm is your open-access window into the energy, beauty, and people of Lagos, live and direct.</p>
                <Button onClick={() => router.push("/book_form")}  ariaLabel="Book a tour" label="Book a tour" type="button" variant="primary" className="w-full !bg-[#EF8F57] text-white !py-4 shadow-xl " />
                </div>

<div>
    <h3>What you can expect</h3>
    <ul>
        <li>30-minute livestreams</li>
        <li>Interactive sessions with local hosts</li>
        <li>Different destinations and stories every month</li>
    </ul>
</div>


<div>
    <h4>Who can join ?</h4>
    <ul>
        Free E-Rhythm is open to:
        <li>Curious travelers</li>
        <li>Students and educators</li>
        <li>African diaspora reconnecting with culture</li>
        <li>Anyone who wants to see Lagos through real eyes</li>

        <p>We believe culture should be shared, not gated.</p>
    </ul>

     <Button onClick={() => router.push("/book_form")}  ariaLabel="Book a tour" label="Book a tour" type="button" variant="primary" className="w-full !bg-[#EF8F57] text-white !py-4 shadow-xl " />
</div>
            </section>
        </div>
    )
}