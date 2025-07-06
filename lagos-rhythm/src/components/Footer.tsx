import {  Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { BsTiktok } from "react-icons/bs"
import { FaWhatsapp } from "react-icons/fa"





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


const emailOptions = [
    {
        label: "General inquiries",
        url: "info@lagosrhythm.com"
    },
    {
        label: "Bookings",
        url: "bookings@lagosrhythm.com"
    },
    {
        label: "partnership",
        url: "partners@lagosrhythm.com"
    },
]

export default function Footer() {
    return (
        <footer className="w-full bg-[#05073C] pt-[7%] pb-[1%] px-[5%]  text-[#FFFFFF] flex flex-col items-start justify-between gap-10 font-lato" >



            <div className="w-full flex flex-col md:flex-row gap-10 items-start justify-between " >


                <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6">
                    <h3 className="font-medium text-lg md:text-xl font-playfair " >Contact</h3>
                    <div className="w-full flex items-center gap-5" >

                        <a href="https://www.facebook.com/profile.php?id=61576980652512" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] hover:text-gray-400 transition-colors duration-150 ease-in-out " >
                        <Facebook size={20} />
                        </a>
                           <a href="https://vm.tiktok.com/ZMSVpqPpC/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] hover:text-gray-400 transition-colors duration-150 ease-in-out " >
                        <BsTiktok size={20} />
                        </a>
                        <a href="https://youtube.com/@lagosrhythm?si=6Uyn540adjOMeWmW" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] hover:text-gray-400 transition-colors duration-150 ease-in-out ">
                            <Youtube size={20}/>
                        </a>
                        <a href="https://www.instagram.com/lagos_rhythm/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] hover:text-gray-400 transition-colors duration-150 ease-in-out ">
                            <Instagram size={20}/>
                        </a>
                        <a href="https://wa.me/2348086695291?text=Hello" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffffff] hover:text-gray-400 transition-colors duration-150 ease-in-out ">
                            <FaWhatsapp size={20}/>
                        </a>


                    </div>
                    <a href="mailto:info@lagosrhythm.com" target="_blank" className="text-sm font-medium text-[#ffffff] hover:text-gray-400 transition-colors duration-150 ease-in-out ">info@lagosrhythm.com</a>
                </div>


                <div className="w-full max-w-[1000px]  items-start gap-10 md:gap-20  grid grid-rows-[auto_auto] md:grid-rows-none md:grid-cols-[auto_auto_auto]" >
                    <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6" >
                        <h3 className="font-medium text-lg md:text-xl font-playfair" >Company</h3>
                        <ul className="flex flex-col items-start gap-2" >
                            {footerLinks.map((link, index) => (
                                <Link key={index} href={link.path} > <li className="font-normal text-sm hover:text-gray-400 transition-colors duration-150 ease-in-out " > {link.label} </li></Link>
                            ))}
                        </ul>

                    </div>


                    <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6" >
                        <h3 className="font-medium text-lg md:text-xl font-playfair" >Support</h3>
                        <ul className="flex flex-col items-start gap-2">
                            {supportOptions.map((link, index) => (
                                <Link key={index} href={link.path} > <li className="font-normal text-sm hover:text-gray-400 transition-colors duration-150 ease-in-out"> {link.label} </li></Link>
                            ))}
                        </ul>

                    </div>

                     <div className="w-full max-w-md flex flex-col items-start gap-3  md:gap-6" >
                              <h3 className="font-medium text-lg md:text-xl font-playfair" >Email Contacts</h3>
                        <ul className="flex flex-col items-start gap-2">
                            {emailOptions.map((link, index) => (
                                <a key={index} href={`mailto:${link.url}`} target="_blank" > <li className="font-normal text-sm hover:text-gray-400 transition-colors duration-150 ease-in-out"> {link.label} </li></a>
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