import { BestLocationData } from "@/data/data";
import BestLocationCard from "./common/BestLocationCard";
import { easeInOut, easeOut, motion } from "framer-motion";







export default function BestOfLagos() {

    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -100 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: easeInOut,
            },
        },
    };




    return (
        <section className="w-full flex flex-col items-start gap-8 py-20 md:px-[4%] px-[10%] lg:px-[10%]   " >
            <h2 className="text-[#05073C] font-bold text-2xl  md:text-3xl font-playfair " >Best of <span className="text-[#EF8F57] ">Lagos</span></h2>
            <div className="w-full flex flex-col items-start gap-60" >

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full flex flex-col md:flex-row items-center justify-center gap-6  " >
                    {BestLocationData.map((card, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <BestLocationCard key={index}
                                image={card.image}
                                label={card.label}
                            />
                        </motion.div>
                    ))}
                </motion.div>






            </div>
        </section>
    )
}