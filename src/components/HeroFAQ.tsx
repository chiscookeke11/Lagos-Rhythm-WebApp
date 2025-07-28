import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { faq } from "@/data/data"
import Link from "next/link";



export default function HeroFAQ() {
    return (
        <div className="w-full h-fit flex items-center justify-center flex-col gap-6 py-28 px-5 bg-[#FDF4F1]  " >
            <h1 className="text-5xl font-merriweather font-bold text-[#05073C]" >Frequently Asked <span className="text-[#EF8F57]" >Questions</span></h1>
            <p className=" font-lato w-full max-w-sm text-center text-base font-normal text-gray-900 " >Find questions and answers related to the design system, purchase, updates, and support.</p>



            <div className="w-full max-w-5xl" >
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    {
                        faq.slice(0, 5).map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}  `} >
                                <AccordionTrigger className=" text-xl font-semibold font-merriweather text-[#05073C]  hover:no-underline cursor-pointer  " > {item.question} </AccordionTrigger>
                                <AccordionContent className=" text-lg font-medium font-lato w-full text-gray-900 ">
                                    <p >
                                        {item.answer}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }



                </Accordion>
            </div>


            <Link href={"/FAQ"} className=" font-lato  text-[#05073C] text-base underline "  >   See all FAQ</Link>
        </div>
    )
}