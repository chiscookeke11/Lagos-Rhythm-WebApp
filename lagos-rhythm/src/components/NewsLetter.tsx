import Button from "./common/Button";




export default function NewsLetter() {
    return (
        <section className="w-full bg-[url('/newsletter.svg')] bg-no-repeat bg-center bg-cover flex flex-col items-start justify-center py-[10%] md:py-[7%] px-[10%] font-inter" >
            <div className=" flex flex-col items-start gap-3 md:gap-5  max-w-[550px] " >
                <h2 className="text-white font-bold text-xl md:text-3xl max-w-[450px] " >Subscribe To Our Mailing List
                    And Stay Up To Date</h2>
                <h4 className="text-white font-normal text-sm " >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>


                <form className="w-full bg-[#FFFFFF1A] rounded-xl p-2 gap-4 flex items-center justify-between " >
                    <input type="text" placeholder="Your email" className=" w-full h-full outline-0 border-0 py-2 px-3 font-normal text-[#FFFFFF] text-sm md:text-base " />

                    <Button type="button" label="Subscribe" variant="primary" className="!text-[#000000] " />

                </form>

            </div>
        </section>
    )
}