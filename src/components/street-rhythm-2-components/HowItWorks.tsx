import { steps } from "@/data/data";



export default function HowItWorks() {
    return (
        <section id="how-it-works" className="w-full h-fit px-[8%] md:px-[4%] py-16 bg-[#0A0E14] text-white relative
            before:content-['']
    before:absolute before:inset-0
    before:pointer-events-none
    before:bg-[radial-gradient(circle_at_20%_80%,rgba(212,66,44,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(247,179,43,0.08)_0%,transparent_50%)]
        " >
            <div
                className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none
  bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_400_400%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27noiseFilter%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.9%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')]
  bg-repeat"
            />

            <div className=" w-full max-w-[1380px]  mx-auto  flex flex-col items-center justify-center gap-10   "  >

                <div className="flex flex-col items-center justify-center gap-3 text-center" >
                    <h4 className="text-[#F7B32B] font-merriweather font-bold text-[0.85em] uppercase " >The process</h4>
                    <h2 className=" text-xl md:text-3xl  font-black "  >How Street Rhythm Works</h2>
                    <p className="text-[1.05em] text-[#CBD5E0] ">From search to arrival, we make navigating Lagos simple.</p>
                </div>





                <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-10 "  >

                    {/* step card  */}
                    {
                        steps.map((step, i) => (
                            <div key={i} className="w-full h-full flex flex-col items-center justify-center text-center gap-3 " >
                                <span className="mb-3 size-[60px] rounded-full bg-gradient-to-br from-[#D4422C] to-[#F7B32B] flex items-center justify-center font-black text-[1.5rem] text-white  " >
                                    {i + 1}
                                </span>

                                <h3 className="text-[1.25rem] font-bold  " > {step.title} </h3>
                                <p className="text-[0.95rem] text-[#CBD5E0] " > {step.description} </p>

                            </div>
                        ))
                    }

                </div>
            </div>

        </section>
    )
}