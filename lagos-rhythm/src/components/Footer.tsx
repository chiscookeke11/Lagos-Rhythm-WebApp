import { CalendarCheck2, Handshake, Mail, Phone } from "lucide-react"
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
    {
        label: "About Lagos Rhythm",
        path: "/",
    },
]



const supportOptions = [
    {
        label: "Live chat",
        path: "/",
    },
    {
        label: "FAQ",
        path: "/",
    },
    {
        label: "How it works",
        path: "/",
    },
    {
        label: "Feedback",
        path: "/",
    },
    {
        label: "Terms and conditions",
        path: "/",
    },
    {
        label: "Privacy policy",
        path: "/",
    },

]


export default function Footer() {
    return (
        <footer className="w-full bg-[#05073C] pt-[7%] pb-[1%] px-[5%]  text-[#FFFFFF] flex flex-col items-start justify-between gap-10 font-lato" >



            <div className="w-full flex flex-col md:flex-row gap-10 items-start justify-between " >


                <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6">
                    <h3 className="font-medium text-lg md:text-xl font-playfair " >Contact</h3>
                    <h4 className="text-sm font-medium w-full max-w-[330px] ">328 Queensberry Street, North Melbourne VIC3051, Australia.</h4>
                    <div className="w-full flex items-center gap-5" >

                        <a href="mailto:info@lagosrhythm.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] " >
                            <Mail size={20} />
                        </a>
                        <a href="mailto:bookings@lagosrhythm.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] ">
                            <CalendarCheck2 size={20}/>
                        </a>
                        <a href="mailto:partners@lagosrhythm.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] ">
                            <Handshake size={20}/>
                        </a>
                        <a href="https://wa.me/2348086695291?text=Hello" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] ">
                            <Phone size={20}/>
                        </a>


                    </div>
                    <h4 className="text-sm font-medium ">info@lagosrhythm.com</h4>
                </div>


                <div className="w-full max-w-[500px]  items-start gap-10 md:gap-20  grid grid-rows-[auto_auto] md:grid-rows-none md:grid-cols-[auto_auto]" >
                    <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6" >
                        <h3 className="font-medium text-lg md:text-xl font-playfair" >Company</h3>
                        <ul className="flex flex-col items-start gap-2" >
                            {footerLinks.map((link, index) => (
                                <Link key={index} href={link.path} > <li className="font-normal text-xs md:text-sm hover:text-gray-400 transition-colors duration-150 ease-in-out " > {link.label} </li></Link>
                            ))}
                        </ul>

                    </div>


                    <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6" >
                        <h3 className="font-medium text-lg md:text-xl font-playfair" >Support</h3>
                        <ul className="flex flex-col items-start gap-2">
                            {supportOptions.map((link, index) => (
                                <Link key={index} href={link.path} > <li className="font-normal text-xs md:text-sm hover:text-gray-400 transition-colors duration-150 ease-in-out"> {link.label} </li></Link>
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