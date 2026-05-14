import SearchCard from "./SearchCard";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section id="hero" className=" w-full min-h-[120vh] md:min-h-screen px-[5%] md:py-32 flex flex-col md:flex-row items-center justify-center gap-10 relative bg-gradient-to-br from-[#0A0E14] to-[#1A1F2B]
        before:content-['']
    before:absolute before:inset-0
    before:pointer-events-none
    before:bg-[radial-gradient(circle_at_20%_30%,rgba(212,66,44,0.2)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(247,179,43,0.15)_0%,transparent_50%)]
        " >
            <div
                style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%270 0 400 400%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')"
                }}
                className="absolute inset-0 w-full h-full opacity- pointer-events-none opacity-[0.03]   " />

            <div className="w-full md:basis-1/2 flex flex-col items-start gap-5 z-10 max-w-2xl" >
                <h1 className=" text-[2rem] md:text-[2.5rem] font-black text-white " >Navigate Lagos Like a
                    <span className="text-[#F7B32B] block relative w-fit
                after:content-['']
    after:absolute after:bottom-[0.1em] after:left-0
    after:w-full after:h-[0.12em] after:bg-[#D4422C]
    after:animate-slideIn
                " >Local</span></h1>

                <p className="text-[1.05rem] text-[#CBD5E0] font-medium " >Video-guided journeys through Lagos&apos;s informal transport system. See your route before you take it—with real commuter footage and step-by-step navigation.</p>

                <div className="w-fit flex items-center flex-col md:flex-row gap-4 md:gap-10  mt-4" >
                    <a
                        href="#search"
                        className="bg-[#A33323] py-3 md:py-5 px-7 md:px-10 text-white font-semibold text-sm md:text-xl rounded-lg cursor-pointer hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl flex items-center justify-center gap-2"
                    >Find your route</a>

                    <Link
                        href="#how-it-works"
                        className="bg-transparent py-3 md:py-5 px-7 md:px-10 text-white border border-white font-semibold text-sm md:text-xl rounded-lg cursor-pointer hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl flex items-center justify-center gap-2"
                    >How it works</Link>
                </div>
            </div>

            <div id="search" className="w-full md:basis-1/2 flex items-center justify-center z-10 max-w-2xl ">
              <SearchCard/>
            </div>
        </section>
    )
}