import { LocationResourceDataType } from "@/Types/LocationResourceDataType"



interface VideoTabProps {
    data: LocationResourceDataType[] | null
}

export default function VideoTab({ data }: VideoTabProps) {

    if (data && data?.length < 1) {
        return (
            <div className="w-full h-[10vh] flex items-center justify-center " >
                <h4 className="text-xl font-medium font-merriweather text-[#05073C] " >No video found!</h4>
            </div>
        )
    }

    return (


        <div className=" w-full flex flex-col items-center gap-5 " >
            <span className="text-sm font-medium text-[#05073C] " > {data?.length} video{data && data?.length > 1 ? "s" : ""} found </span>

            <section className=" w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center justify-items-center gap-5 " >

                {
                    data?.map((video, index) => (
                        <video
                            key={index}
                            className="w-full h-[200px] bg-amber-300 rounded-xs overflow-hidden"
                            preload="metadata"
                            controls>
                            <source src={video.content_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                    ))
                }

            </section>
        </div>
    )
}