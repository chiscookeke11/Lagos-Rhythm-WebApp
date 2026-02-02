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
            <section className=" w-full grid grid-cols-3 place-items-center justify-items-center gap-5 " >

                {
                    data?.map((sound, index) => (
                        <div key={index} className="w-full bg-white py-4 px-3 rounded-xs space-y-2 shadow-md " >
                            <p className="text-sm " >{sound.type[0].toUpperCase() + sound.type.slice(1)} route</p>
                            <p className="text-sm " >Language: {sound.language && sound.language[0].toUpperCase() + sound.language.slice(1)} </p>
                            <audio controls className="mt-3 " >
                                <source src={sound.content_url} type="audio/mpeg" />
                                Your browser does not support audio.
                            </audio>
                        </div>
                    ))
                }

            </section>

            <span> {data?.length} recording{data && data?.length > 1 ? "s" : ""} found </span>
        </div>
    )
}