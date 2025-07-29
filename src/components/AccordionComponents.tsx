import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { faq } from "@/data/data"

export function AccordionDemo() {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
        >
            {
                faq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}  `} >
                        <AccordionTrigger className=" text-lg md:text-xl font-semibold font-merriweather text-white  hover:no-underline cursor-pointer  " > {item.question} </AccordionTrigger>
                        <AccordionContent className=" text-base md:text-lg font-medium font-lato w-full text-gray-400 ">
                            <p >
                                {item.answer}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))
            }



        </Accordion>
    )
}
