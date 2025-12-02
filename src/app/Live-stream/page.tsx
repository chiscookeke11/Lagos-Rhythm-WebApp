import { Heart, Sparkle, Timer } from "lucide-react";
import Marquee from "react-fast-marquee";



const tags = [
    "Welcome to Isale Eko",
    "Historic Landmarks",
    "Arts & Culture District",
    "Food & Market Scene",
    "Waterfront Stories"
]


export default function Page() {
    return (
        <div className=" w-full min-h-screen flex flex-col items-start  bg-[#05073C] relative bg-no-repeat bg-center bg-cover "
        //   style={{ backgroundImage: "url('/live/Live-bg.png')" }}
        >

            {/* the header that displays the stats  */}
            <header className=" w-full bg-purple-950 py-6 px-[4%] flex items-center justify-evenly gap-12 " >
                <span>Live Now</span>


                <h1>The Heart of Bale: A Journey Through Old Lagos</h1>


                <div className=" w-fit flex items-center gap-3 " >
                    <div className="flex w-fit items-center " >
                        <div className=" h-7 w-7 rounded-full bg-red-700 border border-purple-950 flex items-center justify-center ml-[-10px] " > </div>
                        <div className=" h-7 w-7 rounded-full bg-red-700 border border-purple-950 flex items-center justify-center ml-[-10px]" > </div>
                        <div className=" h-7 w-7 rounded-full bg-red-700 border border-purple-950 flex items-center justify-center ml-[-10px]" > </div>
                    </div>
                    <p>27 Watching</p>
                </div>


                <div className="w-fit flex items-center gap-2 " >
                    <Timer />
                    <p>42:15 <br />remaining</p>
                </div>



            </header>



            {/* the hero section  */}
            <section className=" w-full h-[80vh] flex items-center justify-center bg-no-repeat bg-center bg-cover " style={{ backgroundImage: "url('/live/Live-bg.png')" }}>

            </section>




            {/* the stats belt */}
            <div className=" py-2  bg-purple-900 w-full flex flex-col gap-3 items-center justify-center " >
                The progess here


                <div className="w-full bg-black/40 backdrop-blur-xs py-2" >
                    <Marquee >
                        {
                            tags.map((text, index) => (
                                <span key={index} className=" block ">
                                    <h3 className="font-lato text-sm md:text-base font-semibold text-[#ffffff] mx-10 flex items-center gap-2 "><Sparkle color="#FFD700" size={15} />  {text}  <Sparkle color="#FFD700" size={15} /></h3>
                                </span>

                            ))
                        }
                    </Marquee>
                </div>



            </div>


            {/* The chat section (Talking Drum) */}
            <section className=" w-full flex flex-col items-start gap-4 bg-blue-950 py-8  " >
                <h2 className=" ml-5 " >Talking Drum</h2>
                <hr className="w-full border-[0.5px] border-gray-600  " />



                <div className=" w-[97%] flex items-center justify-start gap-4 bg-black py-5 px-4 border-l-2 border-l-yellow-500 rounded-lg mx-auto  " >


                    <div className=" h-12 w-12 rounded-full flex-shrink-0  bg-red-700 border border-purple-950 flex items-center justify-center ">
                    </div>

                    <div className="flex flex-col flex-1  items-start gap-1 w-full bg-amber-300" >
                        <div className="flex items-center gap-4" >
                            <h4>Lagos Storykeeper</h4>
                            <span>Host</span>
                        </div>

                        <p className="text-white" >The message the host sends on the call </p>
                    </div>



                </div>



                {/* emoji btns */}
                <div className="w-fit flex items-center gap-3" >
                    <button className="bg-white/25 h-10 w-10 rounded-sm flex items-center justify-center p-2 backdrop-blur-2xl  " ><Heart /></button>

                </div>
            </section>





        </div>
    )
}