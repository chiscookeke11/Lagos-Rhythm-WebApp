import Image from "next/image";



interface BestLocationCardProps {
    image: string;
    label: string;

}



export default function BestLocationCard({ image, label }: BestLocationCardProps) {
    return (
        <div className="w-[300px] h-[300px] rounded-xl border-[1px] border-[#E7E6E6] bg-[#ffffff] flex flex-col items-start overflow-hidden hover:scale-105 transition-transform duration-150 ease-in-out cursor-pointer   " >



            <div className="w-full h-[75%] flex items-center justify-center overflow-hidden bg-red-200 relative " >
                <Image src={image} alt="image" fill className=" object-cover object-center" />
            </div>


            <div className=" w-full h-fit flex flex-col justify-center gap-3 py-3 px-5 " >
                <h3 className="text-[#05073C] font-medium text-base " >{label} </h3>




            </div>

        </div>
    )
}