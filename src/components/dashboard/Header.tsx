import { Bell, BellDot, Search } from "lucide-react";
import { DropdownMenuCheckboxes } from "../common/DropdowMenu";
import { Input } from "../ui/input";



export default function Header() {
    return (
        <nav className=" bg-[#EF8F57] sticky top-0 left-0 w-full py-4 px-5 flex items-center justify-between gap-4 " >
            <h1 className=" font-semibold text-3xl text-[#ffffff] font-signika " >Dashboard</h1>


            <div className="w-fit flex items-center gap-4  rounded-md  bg-white py-1 px-2 " >

                <Search size={20} color="#EF8F57" />
                <Input className=" bg-transparent outline-none border-none shadow-none focus:shadow-0 focus:outline-none focus:border-none focus:ring-0 focus-visible:ring-0 text-[#1e1e1e] font-semibold text-sm " />
            </div>



            <div className="w-fit flex items-center gap-1" >


                <button className="cursor-pointer  " >
                    <Bell size={18} />
                    <BellDot size={18} />
                </button>

                <DropdownMenuCheckboxes />

            </div>

        </nav>
    )
}