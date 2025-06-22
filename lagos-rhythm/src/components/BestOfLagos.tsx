import { BestLocationData } from "@/data/data";
import BestLocationCard from "./common/BestLocationCard";








export default function BestOfLagos() {
    return (
        <section className="w-full flex flex-col items-start gap-8 py-20 md:px-[4%] px-[10%] lg:px-[10%] font-inter  " >
            <h2 className="text-[#05073C] font-bold text-2xl  md:text-3xl " >Best of <span className="text-[#C6C6D2] ">Lagos</span></h2>
            <div className="w-full flex flex-col items-start gap-60" >

                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6" >
                    {BestLocationData.map((card, index) => (
                        <BestLocationCard key={index}
                            image={card.image}
                            label={card.label}
                        />
                    ))}
                </div>






            </div>
        </section>
    )
}