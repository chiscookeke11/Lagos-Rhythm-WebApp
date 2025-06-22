import Image from "next/image";



interface BestLocationCardProps{
    image: string;
    label: string;

}



export default function BestLocationCard ({image, label}: BestLocationCardProps) {
    return (
        <div className="w-[300px] h-[400px] rounded-xl border-[1px] border-[#E7E6E6] bg-[#ffffff] flex flex-col items-start overflow-hidden cursor-pointer  " >



            <div className="w-full h-[53%] flex items-center justify-center overflow-hidden bg-red-200 relative " >
<Image src={image} alt="image"   fill className=" object-cover object-center" />
            </div>


            <div className=" w-full h-fit flex flex-col gap-3 py-3 px-5 " >
                <h4 className="text-[#717171] text-xs font-normal ml-4 " >New York, USA</h4>
                <h3 className="text-[#05073C] font-medium text-base " >{label} </h3>


                <p>rating stars here</p>


                <div className="w-full border-t-[1px] border-[#E7E6E6] flex items-center justify-between gap-10 py-3 px-2 pl-4" >
                    <p className=" font-normal text-xs text-[#05073C] " >4 days</p>
                    <p className=" font-normal text-xs text-[#05073C] ">From <span className="text-[15.3px] font-medium " >$225</span></p>

                </div>

            </div>

        </div>
    )
}