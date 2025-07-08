import Button from "../common/Button";





const tourPackagesData = [
    {
        title: "Exclusive Live Virtual Tour",
        content: "Go deeper with Lagos—curated, private virtual tours designed for schools, corporate teams, cultural groups, and special events",
        path: "",
    },
    {
        title: "Free Live Virtual Tour",
        content: "Want a taste of Lagos? Join our open-access tours streamed live from the city’s most vibrant spots. It’s free, it’s real-time, and it’s your first step into the rhythm of Nigeria.",
        path: "",
    }
]

export default function ChooseTour() {
    return (
        <section className=" w-full h-full py-[4%] px-[5%] flex flex-col items-center gap-10 " >
            <h1 className="text-[#05073C] font-bold text-2xl  md:text-3xl font-playfair ">Choose your <span className="text-[#EF8F57] ">tour</span> below </h1>
            <div className=" w-full h-full flex flex-row items-center justify-center gap-10 flex-wrap mx-auto" >
               {tourPackagesData.map((tourPackage, index) => (
                 <div key={index} className="flex flex-col items-center w-full h-full max-w-sm py-5 px-4 gap-6 text-center shadow-lg rounded-xl " >
                    <h1 className="font-playfair font-bold text-[#05073C] text-xl md:text-2xl " >{tourPackage.title} </h1>
                    <p>{tourPackage.content} </p>
                    <Button ariaLabel="Get Started" label="Get Started" type="button" variant="primary" className="w-full !bg-[#EF8F57] text-white !py-4 shadow-xl " />
                </div>
               ))}
            </div>
        </section>
    )
}