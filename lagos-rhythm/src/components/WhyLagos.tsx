import { WhyLagosData } from "@/data/data";
import { motion } from "framer-motion";




export default function WhyLagos() {
  return (
    <div className=" flex flex-col items-start gap-3 md:gap-6 py-[7%] px-[5%] lg:px-[10%] bg-white  ">
      <h1 className="text-[#05073C] font-bold text-2xl md:text-3xl font-playfair " > Why <span className="text-[#EF8F57] "> Lagos Rhythm? </span> </h1>

      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-5 md:gap-6  " >





        {
          WhyLagosData.map((item, index) => (
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 10, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              key={index} className=" wfull flex items-start justify-center  max-w-sm flex-col py-3 pl-5 px-4 gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-sm relative overflow-hidden "  >
              <div className="text-[#EF8F57]  " >
                {item.icon}
              </div>
              <h3 className="font-bold text-xl text-[#05073C] font-playfair " >{item.title} </h3>
              <p className="font-normal text-[#05073C] text-base font-lato "> {item.desc} </p>
              <div className="absolute w-5 h-5 bg-[#EF8F57] top-0 right-0  triangle  "  ></div>
              <div className="absolute w-5 h-5 bg-[#EF8F57] bottom-0 left-0  left-triangle  "  ></div>
            </motion.div>
          ))
        }

      </div>
    </div>
  )
}