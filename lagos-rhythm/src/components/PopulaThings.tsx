import { PopularThingsData } from "@/data/data";
import Button from "./common/Button";




export default function PopularThings() {
    return (
        <section className=" w-full bg-[#EB662B0D] py-[8%] px-[5%] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 font-inter " >



            <div className="w-full max-w-[440px] flex flex-col items-start gap-7 ">
                <h2 className="font-bold text-[#05073C] text-3xl mb-1 " >Popular things to do</h2>
                <p className=" text-sm font-normal text-[#05073C] "  >There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                <Button label="See All" type="button" variant="primary" className="w-full !bg-[#EB662B] text-white !py-4 " />
            </div>


            <div className="w-full max-w-2xl  h-fit grid grid-cols-2 md:grid-cols-3 gap-4 py-2  " >

                {PopularThingsData.map((item, index) => (

                    <div key={index} className="bg-[#FFFFFF] rounded-xl p-4 flex items-center justify-center flex-col gap-3 " >


                        <div className=" w-20 h-20 rounded-full bg-[#FEF7F4] flex items-center justify-center text-[#EB662B] " >
                       {item.image}
                        </div>



                        <h3 className=" font-medium text-[17px] leading-[100%] text-[#05073C] " > {item.title} </h3>
                        <h3 className=" font-normal text-sm  text-[#05073C] " >{item.desc} </h3>

                    </div>
                ))}


            </div>



        </section>
    )
}