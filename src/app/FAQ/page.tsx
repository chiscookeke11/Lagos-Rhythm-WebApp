import { AccordionDemo } from "@/components/AccordionComponents";
import { CircleQuestionMark } from "lucide-react";



export default function Page() {
    return (
        <div className="w-full h-fit flex items-center justify-center flex-col gap-6 py-28 px-5 bg-[#05073C]  " >
            <h3 className="flex items-center justify-center gap-2 border-2 border-gray-400 text-sm py-2 px-4 rounded-xl font-lato  text-gray-400 " > <CircleQuestionMark size={20} /> FAQS</h3>
            <h1 className="text-5xl font-merriweather font-bold text-white" >Frequently Asked Questions</h1>
            <p className=" font-lato w-full max-w-sm text-center text-base font-normal text-gray-400 " >Find questions and answers related to the design system, purchase, updates, and support.</p>



            <div className="w-full max-w-5xl" >
                <AccordionDemo />
            </div>
        </div>
    )
}

