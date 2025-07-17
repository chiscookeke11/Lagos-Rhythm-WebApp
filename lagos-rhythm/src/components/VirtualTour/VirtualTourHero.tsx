import AvatarModel from "./AvatarModel";




export default function VirtualTourHero() {
    return (
        <section className="min-h-[80vh] flex items-center justify-between flex-col md:flex-row gap-10  py-28 px-[5%] relative bg-[#05073C] " >
            <div className="w-full basis-2/3 flex flex-col items-start gap-3" >
                <h1 className="font-semibold text-white text-3xl  lg:text-[50px] leading-[140%] font-merienda"  >Step Into Lagos - Live and Online</h1>
                <p className="font-normal text-base text-white font-merriweather max-w-2xl  "  >Experience Lagos like never before - real streets, real stories, real people.
                    Our live virtual tours connect you to the rhythm of Lagos, Nigeria’s significant city in real time. No filters. No stock footage. Just Lagos, as it lives and breathes.</p>
                <p className="font-normal text-base text-white font-merriweather max-w-2xl">For students, travelers, heritage seekers, or curious souls - Lagos Rhythm brings the city to you.</p>
            </div>


            <div className="w-full basis-1/3 flex flex-col  items-center justify-center h-full relative "  >
                {/* 3d image here  */}
                <AvatarModel modelUrl="/virtual-tour/virtual-tour-3d-image/virtual-tour-avatar.glb" />
                <div className="w-full h-full  absolute top-0 left-0 z-20 "/>
            </div>


            <svg
                className="absolute bottom-[-1px] left-0 w-full  "
                viewBox="0 0 1440 150"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <path fill="#FDF4F1" d="M0,80 C360,180 1080,0 1440,80 L1440,150 L0,150 Z"  ></path>
            </svg>
        </section>
    )
}