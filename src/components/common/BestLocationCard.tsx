import Image from "next/image";



interface BestLocationCardProps {
    image: string;
    label: string;

}



export default function BestLocationCard({ image, label }: BestLocationCardProps) {
    return (
        <div className="w-[280px] h-[280px] rounded-xl border-[1px] border-[#E7E6E6] bg-[#ffffff] flex flex-col items-start overflow-hidden hover:scale-105 transition-transform duration-150 ease-in-out  p-2   shadow-sm font-lato " >



            <div className="w-full h-[75%] flex items-center justify-center overflow-hidden  relative rounded-sm " >
                <Image src={image} alt="image" fill className=" object-cover object-center" />
                <div className="w-8 h-8 rounded-full bg-white absolute bottom-[-20px] right-4" ></div>
            </div>


            <div className=" w-full h-fit flex flex-col justify-center gap-3 py-3 px-3 " >
                <h3 className="text-[#05073C]  text-base font-semibold " >{label} </h3>




            </div>

        </div>
    )
}