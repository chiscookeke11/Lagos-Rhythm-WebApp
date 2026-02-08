import { LocationResourceDataType } from "@/Types/LocationResourceDataType"
import { Download } from "lucide-react"




interface TextTabProps {
    data: LocationResourceDataType[] | null
}

export default function TextTab({ data }: TextTabProps) {



    if (data && data?.length < 1) {
        return (
            <div className="w-full h-[10vh] flex items-center justify-center " >
                <h4 className="text-xl font-medium font-merriweather text-[#05073C] " >No text data found!</h4>
            </div>
        )
    }

    return (
        <section className=" w-full grid grid-cols-5 place-items-center justify-items-center gap-5 " >

            {
                data?.map((text, index) => (

                    <a key={index} href={text.content_url} target="_blank" className="px-4 py-1 w-full h-[70px] text-xs font-medium flex items-center justify-center flex-col bg-[#05073C] text-white  rounded-sm " >Download PDF <Download size={17} /> </a>

                ))
            }

        </section>
    )
}