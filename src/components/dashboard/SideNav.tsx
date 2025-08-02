import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChartPie } from "lucide-react";
import { sideNavLinks } from "@/data/data";





export default function SideNav() {


    return (
        <aside className="bg-white sticky top-0 left-0 h-screen max-w-[200px] lg:max-w-sm w-3/12 flex flex-col items-center justify-between py-6 pb-20 gap-4  px-5  " >

            <Link href={"/"} className="flex items-end justify-center gap-2" >
                <Image src={"/logos/logo.png"} height={100} width={100} alt="logo" className=" w-[60px] " />
                <h2 className="text-[#EF8F57] font-bold font-merriweather text-2xl "  >Lagos Rhythm</h2>
            </Link>



            <Link href={"/dashboard"} className="w-full" > <Button className=" py-4 px-6 h-fit text-lg w-full flex items-center justify-center gap-4 bg-[#EF8F57] cursor-pointer hover:bg-[#EF8F57]/90 " >
                <ChartPie size={30} color="white" />
                Dashboard
            </Button></Link>


            <ul className=" w-full flex flex-col gap-4 justify-between pl-6 py-2 " >

                {sideNavLinks.map((navlink, index) => (
                    <li key={index} className="text-[#EF8F57] hover:text-[#EF8F57]/80  font-semibold text-xl font-lato tracking-wide  " > <Link href={navlink.route} className="flex items-center gap-4" >{navlink.icons}  {navlink.label}</Link> </li>
                ))}

            </ul>


        </aside>
    )
}