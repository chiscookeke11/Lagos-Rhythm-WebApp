import { WhyLagosData } from "@/data/data";





export default function WhyLagos() {
    return (
        <div className=" flex flex-col items-start gap-3 py-[7%] px-[5%] md:px-[10%] font-inter ">
            <h1 className="text-[#05073C] font-bold text-3xl " > Why choose Lagos Rhythm  </h1>

            <div className=" w-full grid grid-cols-1 md:grid-cols-3 justify-between gap-6  " >





              {
                WhyLagosData.map((item, index) => (
                      <div key={index} className=" wfull flex items-start justify-center  max-w-sm flex-col py-3 px-4 gap-2" >
                       <div className="text-[#EB662B]  " >
                         {item.icon}
                       </div>
                    <h3 className="font-medium text-base text-[#05073C] " >{item.title} </h3>
                    <p className="font-normal text-[#05073C] text-sm "> {item.desc} </p>

                </div>
                ))
              }

            </div>
        </div>
    )
}