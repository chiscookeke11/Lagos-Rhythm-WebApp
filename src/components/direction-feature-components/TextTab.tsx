import { LocationResourceDataType } from "@/Types/LocationResourceDataType"



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
                    <div key={index} className="w-full h-[200px] flex items-center justify-center bg-green-300 rounded-xs " >
                        {text.id}
                    </div>
                ))
            }

        </section>
    )
}