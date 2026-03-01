import { ArrowRight } from "lucide-react";
import Link from "next/link";




export default function ReadyToNavigate() {



    return (
        <div className=" w-full h-fit py-32 px-[6%] flex flex-col items-center justify-center gap-6 text-white bg-gradient-to-br from-[#D4422C] to-[#A33323] text-center relative ctaSection        "  >

            <h1 className="font-black text-[1.75rem]  " >Ready to Navigate Lagos?</h1>
            <p className=" text-[1.05rem] opacity-95 text-[#CBD5E0] max-w-xl " >Join thousands of commuters who&apos;ve discovered the confidence of knowing exactly where they&apos;re going.</p>

            <Link href={"/street-rhythm/#hero"} className=" bg-white py-3 md:py-5 px-7 md:px-10 text-[#D4422C] font-semibold text-sm md:text-xl rounded-lg cursor-pointer hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl flex items-center justify-center gap-2  " >
                Start Your Journey
                <ArrowRight size={23} />
            </Link>

        </div>
    )
}