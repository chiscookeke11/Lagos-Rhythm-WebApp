import Image from "next/image";


export default function DirectionHero() {
    return (
        <section className="w-full" >
            <h1 className="font-merienda font-semibold text-4xl text-white ">Find places in lagos</h1>
            <div className=" w-full max-w-xs md:max-w-xl lg:max-w-xl  aspect-square flex items-center justify-center rounded-3xl overflow-hidden ">
                <Image
                    src={"/location-finder/lagos.webp"}
                    alt="lagos"
                    height={1000}
                    width={1000}
                    className="w-full h-full object-cover object-center  "
                />
            </div>
        </section>
    )
}