import { WhyLagosData } from "@/data/data";





export default function WhyLagos() {
  return (
    <div className=" flex flex-col items-start gap-3 py-[7%] px-[5%] lg:px-[10%]  ">
      <h1 className="text-[#05073C] font-bold text-2xl md:text-3xl font-playfair " > Why <span className="text-[#EF8F57] "> Lagos Rhythm? </span> </h1>

      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-5 md:gap-6  " >





        {
          WhyLagosData.map((item, index) => (
            <div key={index} className=" wfull flex items-start justify-center  max-w-sm flex-col py-3 px-4 gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-sm " >
              <div className="text-[#EF8F57]  " >
                {item.icon}
              </div>
              <h3 className="font-bold text-xl text-[#05073C] font-playfair " >{item.title} </h3>
              <p className="font-normal text-[#05073C] text-base font-lato "> {item.desc} </p>

            </div>
          ))
        }

      </div>
    </div>
  )
}