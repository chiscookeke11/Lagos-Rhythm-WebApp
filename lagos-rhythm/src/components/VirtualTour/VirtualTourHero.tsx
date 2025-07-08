import Image from "next/image";



export default function VirtualTourHero() {
    return (
        <section className="min-h-[80vh] flex items-center justify-between flex-col md:flex-row gap-10 bg-gray-500 py-24 px-[5%] " >
            <div className="w-full basis-2/3 flex flex-col items-start gap-3" >
                <h1 className="font-semibold text-white text-3xl lg:text-[50px] lg:leading-[140%] font-merienda"  >Step Into Lagos - Live and Online</h1>
                <p className="font-normal text-base text-white font-merienda max-w-2xl  "  >Experience Lagos like never before—real streets, real stories, real people.
                    Our live virtual tours connect you to the rhythm of Lagos, Nigeria’s significant city in real time. No filters. No stock footage. Just Lagos, as it lives and breathes.</p>
                    <p className="font-normal text-base text-white font-merienda max-w-2xl">For students, travelers, heritage seekers, or curious souls—Lagos Rhythm brings the city to you.</p>
            </div>


            <div className="w-full basis-1/3 flex items-center justify-center h-full bg-red-500 "  >
            <Image src={"/newsletter.svg"} alt="Hero-Image" height={100} width={100} className="w-full h-full object-cover"  />
            </div>



        </section>
    )
}