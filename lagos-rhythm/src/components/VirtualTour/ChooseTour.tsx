import Button from "../common/Button";


export default function ChooseTour() {
    return (
        <section className=" w-full py-[4%] px-[5%] " >
            <h1 className="text-[#05073C] font-bold text-2xl  md:text-3xl font-playfair ">Choose your <span className="text-[#EF8F57] ">tour</span> below </h1>
            <div className=" w-full flex flex-row items-start justify-center " >
                <div  >
                    <h1>Exclusive Live Virtual Tour</h1>
                    <p>Go deeper with Lagos—curated, private virtual tours designed for schools, corporate teams, cultural groups, and special events
                    </p>
                    <Button label="Get started" type="button" />
                </div>
            </div>
        </section>
    )
}