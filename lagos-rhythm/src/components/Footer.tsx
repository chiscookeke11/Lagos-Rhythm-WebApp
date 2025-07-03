import Link from "next/link"





const footerLinks = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "Virtual Tour",
        path: "/",
    },
    {
        label: "In-person Tour",
        path: "/",
    },
    {
        label: "Flights",
        path: "/",
    },
    {
        label: "Store",
        path: "/",
    },
]



const supportOptions = [
    {
        label: "Get in Touch",
        path: "",
    },
    {
        label: "Help center",
        path: "",
    },
    {
        label: "Live chat",
        path: "",
    },
    {
        label: "How it works",
        path: "",
    },

]


export default function Footer() {
    return (
        <footer className="w-full bg-[#05073C] pt-[7%] pb-[1%] px-[5%]  text-[#FFFFFF] flex flex-col items-start justify-between gap-10 " >



            <div className="w-full flex flex-col md:flex-row gap-10 items-start justify-between " >


                <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6">
                    <h3 className="font-medium text-lg md:text-xl " >Contact</h3>
                    <h4 className="text-sm font-medium w-full max-w-[330px] ">328 Queensberry Street, North Melbourne VIC3051, Australia.</h4>
                    <h4 className="text-sm font-medium ">hi@viatours.com</h4>
                </div>


                <div className="w-full max-w-[500px]  items-start gap-10 md:gap-20  grid grid-rows-[auto_auto] md:grid-rows-none md:grid-cols-[auto_auto]" >
                    <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6" >
                        <h3 className="font-medium text-lg md:text-xl " >Company</h3>
                        <ul className="flex flex-col items-start gap-2" >
                            {footerLinks.map((link, index) => (
                                <Link key={index} href={link.path} > <li className="font-normal text-xs md:text-sm" > {link.label} </li></Link>
                            ))}
                        </ul>

                    </div>


                    <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6" >
                        <h3 className="font-medium text-lg md:text-xl " >Support</h3>
                        <ul className="flex flex-col items-start gap-2">
                            {supportOptions.map((link, index) => (
                                <Link key={index} href={link.path} > <li className="font-normal text-xs md:text-sm"> {link.label} </li></Link>
                            ))}
                        </ul>

                    </div>
                </div>





            </div>



            <div className="w-full flex items-center justify-between" >
                <small className="text-[#FFFFFF] text-xs font-normal " >© Copyright Lagos Rhythm 2025</small>

            </div>
        </footer>
    )
}