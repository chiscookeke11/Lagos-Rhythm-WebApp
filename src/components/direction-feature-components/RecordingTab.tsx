import { LocationResourceDataType } from "@/Types/LocationResourceDataType"





interface RecordingTabProps {
    data: LocationResourceDataType[] | null
}

export default function RecordingTab({ data }: RecordingTabProps) {


    if (data && data?.length < 1) {
        return (
            <div className="w-full h-[10vh] flex items-center justify-center " >
                <h4 className="text-xl font-medium font-merriweather text-[#05073C] " >No sound recording found!</h4>
            </div>
        )
    }

    return (
     <div className="w-full flex flex-col items-center gap-5" >
           <section className=" w-full grid grid-cols-5 place-items-center justify-items-center gap-5 " >

            {
                data?.map((sound, index) => (
                    <div key={index} className="w-full h-[200px] flex items-center justify-center bg-blue-300 rounded-xs " >
                        {sound.id}
                    </div>
                ))
            }

        </section>

        <span> {data?.length} recording{data && data?.length > 1 ? "s" : ""} found </span>
     </div>
    )
}