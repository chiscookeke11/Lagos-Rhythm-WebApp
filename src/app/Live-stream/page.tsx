import { Heart, SendHorizontal, Sparkle, Timer } from "lucide-react";
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
        <div className=" w-full min-h-screen flex flex-col items-start  bg-[#05073C] relative bg-no-repeat bg-center bg-cover font-merienda ">

            {/* the header that displays the stats  */}
            <header className=" w-full bg-[#05073C] py-6 px-[4%] flex items-center justify-evenly gap-12 " >
                <span className="flex items-center gap-2 text-xs md:text-sm" > <span className="w-3 h-3 bg-red-700 rounded-sm block" /> Live Now</span>


                <h1 className=" text-xl md:text-2xl " >The Heart of Bale: A Journey Through Old Lagos</h1>


                <div className=" w-fit flex items-center gap-3 " >
                    <div className="flex w-fit items-center " >
                        <div className=" h-3 w-3 md:h-7 md:w-7 rounded-full bg-red-700 border border-purple-950 flex items-center justify-center ml-[-10px] " > </div>
                        <div className=" h-3 w-3 md:h-7 md:w-7 rounded-full bg-red-700 border border-purple-950 flex items-center justify-center ml-[-10px]" > </div>
                        <div className=" h-3 w-3 md:h-7 md:w-7 rounded-full bg-red-700 border border-purple-950 flex items-center justify-center ml-[-10px]" > </div>
                    </div>
                    <p className=" text-xs md:text-sm" >27 Watching</p>
                </div>


                <div className="w-fit flex items-center gap-2 " >
                    <Timer size={20} />
                    <p className="text-xs md:text-sm " >42:15 remaining</p>
                </div>



            </header>



            {/* the hero section  */}
            <section className=" w-full h-[80vh] flex items-center justify-center bg-no-repeat bg-center bg-cover " style={{ backgroundImage: "url('/live/Live-bg.png')" }}>

            </section>




            {/* the stats belt */}
            <div className=" pt-6  bg-[#05073C] w-full flex flex-col gap-3 items-center justify-center " >
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
            <section className=" w-full flex flex-col items-start gap-4 bg-blue-950 py-12  " >
                <h2 className=" ml-10 text-xl lg:text-2xl " >Talking Drum</h2>
                <hr className="w-full border-[0.5px] border-gray-600 my-5  " />



                <div className=" w-[97%] lg:w-[80%] h-[200px] flex items-center justify-start gap-4 border border-gray-500 py-5 px-4 border-l-2 border-l-yellow-500 rounded-lg mx-auto  " >


                    <div className=" h-12 w-12 rounded-full flex-shrink-0  bg-red-700 border border-purple-950 flex items-center justify-center ">
                    </div>

                    <div className="flex flex-col flex-1  items-start gap-1 w-full" >
                        <div className="flex items-center gap-4" >
                            <h4>Lagos Storykeeper</h4>
                            <span>Host</span>
                        </div>

                        <p className="text-white" >The message the host sends on the call </p>
                    </div>



                </div>


                {/* The textarea  */}
                <form className=" w-[95%] lg:w-[80%] mx-auto bg-white/20 backdrop-blur-2xl py-4 px-4 rounded-xl border border-gray-500 mt-3 flex items-center gap-10  " >
                    <input name="message" id="message" placeholder="Share your thoughts on this tour..." className="w-full h-full text-sm md:text-base outline-none border-none " />
                    <button className=" h-10 w-10 bg-[#EB662B] rounded-sm flex items-center justify-center p-2 cursor-pointer " > <SendHorizontal size={20} /> </button>
                </form>




                {/* emoji btns */}
                <div className="  mx-auto w-[95%] lg:w-[80%] flex items-center gap-3 px-[4%]  mt-5 " >
                    <button className="bg-white/25 h-10 w-10 rounded-sm flex items-center justify-center p-2 backdrop-blur-2xl cursor-pointer " ><Heart /></button>
                    <button className="bg-white/25 h-10 w-10 rounded-sm flex items-center justify-center p-2 backdrop-blur-2xl cursor-pointer " ><Heart /></button>
                    <button className="bg-white/25 h-10 w-10 rounded-sm flex items-center justify-center p-2 backdrop-blur-2xl cursor-pointer " ><Heart /></button>

                </div>
            </section>





        </div>
    )
}