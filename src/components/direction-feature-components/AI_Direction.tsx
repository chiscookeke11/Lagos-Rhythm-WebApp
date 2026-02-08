



import { LocationResourceDataType } from "@/Types/LocationResourceDataType"





interface AIDirectionTabProps {
    data: LocationResourceDataType[] | null
}

export default function AIDirectionTab({ data }: AIDirectionTabProps) {


    // if (data && data?.length < 1) {
        return (
            <div className="w-full h-[10vh] flex items-center justify-center " >
                <h4 className="text-xl font-medium font-merriweather text-[#05073C] " >Service unavailable!</h4>
            </div>
        )
    // }


    // return (
    //     <section className=" w-full grid grid-cols-5 place-items-center justify-items-center gap-5 " >

    //         {
    //             data?.map((image, index) => (
    //                 <div key={index} className="w-full h-[200px] flex items-center justify-center bg-blue-300 rounded-xs " >
    //                     {image.id}
    //                 </div>
    //             ))
    //         }

    //     </section>
    // )
}