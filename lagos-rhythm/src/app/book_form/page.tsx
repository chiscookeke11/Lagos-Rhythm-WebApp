import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { BestLocationData } from "@/data/data";
import Image from "next/image";


export default function Page() {
    return (
        <div className="w-full  flex  flex-col h-full bg-[#EF8F57] " >
            <div className="w-full h-[300px] bg-[url('/booking-form/coming-soon-bg.jpg')] bg-no-repeat bg-center bg-cover  " />
            <div className="w-full h-fit flex items-center justify-center bg-[#FDF4F1]  " >
                <div className=" flex items-center w-fit flex-col gap-10 pb-10 px-4 mt-[-7%]  " >

                    <div className="w-full flex items-center justify-center gap-4 px-[3%] " >
                        {
                            BestLocationData.slice(0, 3).map((data, index) => (
                                <div key={index} title={data.label} className="bg-[#ffffff] rounded-[20px] flex items-center justify-center w-[100px] h-[100px] md:w-[294px] md:h-[263px] overflow-hidden p-2 md:p-3 " >
                                    <Image src={data.image} alt="image" height={100} width={100} className="w-full h-full object-cover rounded-[10px] " />
                                </div>
                            ))
                        }
                    </div>

                    <div className="w-full flex flex-col items-center gap-2 justify-center my-10 ">
                        <h1 className="font-bold text-5xl font-merienda " >BOOK YOUR PACKAGE</h1>
                        <p className="font-medium text-lg font-lato " >Experience Something New Every Moment</p>

                    </div>

                    <form action="" className=" w-full max-w-5xl bg-[#EFEAD3] border-[2px] border-[#00000021] py-7 px-5 rounded-[20px] flex flex-col items-center gap-7 ">
                        <Input type="string" label="Full name" isRequired={false} />
                        <Input type="email" label="Email" isRequired={true} />


                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6"  >
                            <Input type="string" label="Race/Ethnic identity" isRequired={false} />
                            <Input type="email" label="Country" isRequired={true} />
                        </div>


                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6"  >
                            <Input type="string" label="I am joining as a:" isRequired={false} />
                            <Input type="email" label="Next tour date" isRequired={true} />
                        </div>

                        <Input type="string" label="How did you hear about us?" isRequired={false} />


                        <div className="w-full flex items-start flex-col gap-3" >
                            <label htmlFor="recieveEmails" className="w-full flex items-center justify-start gap-2  ">
                                <input type="checkbox" id="recieveEmails" />
                                <span>I agree to receive emails about my free E-Rhythm booking</span>
                            </label>


                            <label htmlFor="privacyPolicy" className="w-full flex items-center justify-start gap-2  ">
                                <input type="checkbox" id="privacyPolicy" />
                                <span>I agree with Lagos Rhythm&apos;s Privacy Policy and Terms and conditions</span>
                            </label>
                        </div>


                        <Button label="Submit" type="submit" ariaLabel="Submit" variant="ghost" className="!bg-[#EF8F57] w-full max-w-sm " />

                    </form>



                </div>
            </div>


        </div>
    )
}