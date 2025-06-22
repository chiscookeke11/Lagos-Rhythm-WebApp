import { BestLocationData } from "@/data/data";
import BestLocationCard from "./common/BestLocationCard";
import Image from "next/image";
import Button from "./common/Button";





const PreviewCard = () => {
    return (
        <div className=" w-full h-[400px] max-w-md bg-[#05073C] rounded-xl relative flex items-center justify-center overflow-hidden   " >

            <Image src={"/BestLocationsImages/location-1.jpg"} alt="preview" fill className="absolute top-0 left-0" />

            <div className=" bg-[#05073C]/20 absolute top-0 left-0 h-full w-full flex flex-col items-start justify-between gap-10 pt-14 py-9 px-5 " >
                <div className="flex flex-col gap-3">
                    <p className="text-[#FFFFFF] text-sm font-normal " >Enjoy these cool staycation promotions.</p>
                    <h4 className="text-2xl font-bold text-[#FFFFFF] ">Best staycation deals</h4>
                </div>


                <Button label="See activities" type="button" variant="primary" className="!text-[#000000] !py-4 w-full max-w-[192px] text-start !px-5   " />



            </div>



        </div>
    )
}


export default function BestOfLagos() {
    return (
        <section className="w-full flex flex-col items-start gap-5 py-20 px-[10%] font-inter  " >
            <h2 className="text-[#05073C] font-bold text-3xl " >Best of <span className="text-[#C6C6D2] ">Lagos</span></h2>
            <div className="w-full flex flex-col items-start gap-60" >

                <div className="w-full flex items-center justify-center gap-6" >
                    {BestLocationData.map((card, index) => (
                        <BestLocationCard key={index}
                            image={card.image}
                            label={card.label}
                        />
                    ))}
                </div>





                <div className="w-full flex items-center justify-center gap-6">

                    <PreviewCard />
                </div>

            </div>
        </section>
    )
}