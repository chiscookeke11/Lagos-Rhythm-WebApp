"use client"


import Image from "next/image"
import Link from "next/link"
import Button from "./common/Button"
import { Menu, X } from "lucide-react"
import { useState } from "react"




export default function Navbar() {
    const [openMobileNav, setOpenMobileNav] = useState(false)



    const navLinks = [
        {
            label: "Home",
            path: "/",
        },
        {
            label: "Tour",
            path: "/",
        },
        {
            label: "Destination",
            path: "/",
        },
        {
            label: "Activities",
            path: "/",
        },
        {
            label: "Pages",
            path: "/",
        },
        {
            label: "Contact",
            path: "/",
        },
    ]



    return (
        <nav className=" fixed top-0 left-0 w-full flex items-center justify-between gap-10 py-8 px-[4%] bg-transparent font-inter z-50 "  >



            <div className=" w-fit flex items-center justify-center gap-20" >
                {/* <Image src={"logos/logo-light.svg"} height={0} width={0} alt="logo" className=" w-[167px] h-8 " /> */}
                Logo


                <ul className=" hidden w-fit lg:flex items-center justify-evenly gap-10" >
                    {
                        navLinks.map((navLink, index) => (
                            <Link href={navLink.path} key={index} ><li className=" font-normal text-sm text-[#FFFFFF] hover:text-[#EB662B] transition-colors duration-150 ease-in-out cursor-pointer " > {navLink.label} </li></Link>
                        ))
                    }
                </ul>

            </div>


            <div className=" flex items-center justify-center gap-7 w-fit" >


                <Link href={"/"} ><button className=" font-normal text-sm text-[#FFFFFF] hover:text-[#EB662B] transition-colors duration-150 ease-in-out cursor-pointer hidden lg:block ">Sign up</button></Link>

                <Button label="Log in" type="button" variant="outline" />

                <button className=" cursor-pointer flex lg:hidden " onClick={() => setOpenMobileNav(true)}  ><Menu size={30} color="#ffffff" /> </button>

            </div>


            <div className={`w-full h-full bg-[#ffffff] fixed top-0 left-0 transform transition-transform duration-150 ease-in-out  ${openMobileNav ? "translate-x-0" : "translate-x-[100%]"}   `} >
                <div className="w-full h-full  relative flex items-center justify-center " >
                    <button onClick={() => setOpenMobileNav(false)} className="absolute top-[5%] right-[5%] cursor-pointer  rounded-full p-1 flex items-center justify-center border-[2px] border-[#EB662B]  " > <X size={30} color="#EB662B" /> </button>




                      <ul className=" w-full h-full justify-center flex flex-col items-start gap-5  py-10 px-10 "   >
                    {navLinks.map((navLink, index) => (
                         <Link href={navLink.path} key={index} ><li className=" font-normal text-lg text-black  transition-colors duration-150 ease-in-out cursor-pointer " > {navLink.label} </li></Link>
                    ))}
                </ul>
                </div>






            </div>



        </nav>
    )
}