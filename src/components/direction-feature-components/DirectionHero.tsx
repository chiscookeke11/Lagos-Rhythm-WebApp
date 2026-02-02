import { directionFeatureData } from "@/data/direction-feature-data";
import Image from "next/image";
import Button from "../common/Button";


export default function DirectionHero() {
    return (
        <section className="w-full h-[60vh] md:h-[70vh] lg:h-screen flex items-center justify-center flex-col gap-3 font-merriweather " >
            <div className="flex items-center justify-center flex-col gap-4 text-white text-center " >
                <h1 className="font-merienda font-semibold text-4xl  ">Find places in lagos</h1>
                <p className=" text-white/70 mb-5 text-sm md:text-base " >From buzzing streets to quiet hangouts, explore Lagos locations with ease and confidence.</p>
                <Button ariaLabel="Get Directions" label="Get Directions" type="button" variant="primary" className="w-fit !bg-[#EF8F57] text-white font-semibold font-merriweather shadow-xl " />
            </div>




            <div className="w-full  flex-1 flex flex-row items-start justify-evenly gap-6  " >

                <div className=" hidden md:flex  w-full flex-1   flex-col items-start gap-6 " >
                    {
                        directionFeatureData.slice(0, 2).map((item, index) => (
                            <div key={index} className=" rounded-xs w-full max-h-70 aspect-square h-full  overflow-hidden flex items-center justify-center relative bg-gray-400 " >
                                <Image src={item.imageUrl} alt="image" fill className="object-cover object-center " />

                            </div>
                        ))
                    }
                </div>



                <div className="w-full h-fit flex-2  self-center grid grid-cols-2  place-items-center justify-items-center justify-center gap-6" >
                    {
                        directionFeatureData.slice(2, 6).map((item, index) => (
                            <div key={index} className="rounded-xs w-full max-h-70 aspect-square h-full  overflow-hidden flex items-center justify-center relative bg-gray-400 " >
                                <Image src={item.imageUrl} alt="image" fill className="object-cover object-center " />

                            </div>
                        ))
                    }
                </div>


                <div className=" w-full flex-1 hidden md:flex flex-col items-start gap-6 " >
                    {
                        directionFeatureData.slice(6, 8).map((item, index) => (
                            <div key={index} className="rounded-xs w-full max-h-70 aspect-square h-full  overflow-hidden flex items-center justify-center relative bg-gray-400 " >
                                <Image src={item.imageUrl} alt="image" fill className="object-cover object-center " />

                            </div>
                        ))
                    }
                </div>

            </div>
        </section>
    )
}