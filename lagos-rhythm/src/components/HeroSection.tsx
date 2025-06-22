import { MapPin, Search } from 'lucide-react';
import Button from "./common/Button";



export default function HeroSection() {


    const tripTypesSuggestion = [
        {
            label: "Culture",
            path: ""
        },
        {
            label: "Food",
            path: ""
        },
        {
            label: "Nature",
            path: ""
        },
        {
            label: "Adventure",
            path: ""
        },
    ]




    return (
        <section className=" w-full h-screen  relative font-inter " >


            <video className="absolute top-0 left-0 h-full w-full object-cover " autoPlay loop muted  >
                <source src="https://res.cloudinary.com/dwedz2laa/video/upload/v1750619813/welcomeVideo_fkmgzv.mp4" type="video/mp4" />
            </video>

            <div className=" w-full  h-full absolute bg-black/30 z-10 flex items-center justify-center px-4 py-3 " >


                <div className=" max-w-sm md:max-w-5xl w-full h-full flex items-center justify-center flex-col gap-4 lg:gap-5 text-center " >
                    <h1 className="font-semibold text-[#ffffff] text-3xl md:text-4xl lg:text-[70px] leading-[100%] font-inter ">Experience Lagos in its natural form</h1>
                    <p className=" font-normal text-sm text-[#ffffff] ">Live the vibe, please the mind</p>






                </div>


            </div>

        </section>
    )
}