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
                <source src="/videos/welcomeVideo.mp4" type="video/mp4" />
            </video>

            <div className=" w-full  h-full absolute bg-black/30 z-10 flex items-center justify-center px-4 py-3 " >


                <div className=" max-w-sm md:max-w-5xl w-full h-full flex items-center justify-center flex-col gap-4 lg:gap-5 text-center " >
                    <h1 className="font-semibold text-[#ffffff] text-2xl md:text-4xl lg:text-[70px] leading-[100%] font-inter ">Taking you to the best places</h1>
                    <p className=" font-normal text-sm text-[#ffffff] ">Move easy... Break free</p>


                    <div className="w-full max-w-[340px] md:max-w-[470px] flex items-center justify-between gap-4 bg-[#ffffff] rounded-[200px] px-2 py-2 " >
                        <MapPin size={20} color='#05073C' />

                        <input className='flex-1 bg-transparent h-full outline-0 border-0 text-sm font-normal text-[#757575] ' />

                        <button className=' w-[35px] h-[35px]  md:w-[50px] md:h-[50px] rounded-full bg-[#EB662B] flex items-center justify-center cursor-pointer  ' > <Search size={22} color='#05073C' /> </button>

                    </div>

                    <p className=" font-normal text-sm text-[#ffffff] mt-10 ">Or browse the selected type</p>


                    <div className=" w-fit flex items-center gap-6 flex-wrap justify-center" >

                        {
                            tripTypesSuggestion.map((option, index) => (
                                <Button key={index} label={option.label} type="button" variant="ghost" className="md:pl-10 pl-5 " />
                            ))
                        }
                    </div>
                </div>


            </div>

        </section>
    )
}