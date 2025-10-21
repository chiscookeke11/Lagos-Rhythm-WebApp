"use client"


import Image from "next/image";
import Button from "../common/Button";
import Input from "../common/Input";
import { useState } from "react";
import { CustomSelect } from "../common/CustomSelect";


export default function OneWayTripComponent() {

    const [flightDetails, setFlightDetails] = useState({
        depatureAirport: "Madras International Meenambakkam Airport",

    })





    const handleSelectChange = (name: string, value: string) => {
        const updated = { ...flightDetails, [name]: value }
        setFlightDetails(updated)
    }








    return (
        <form className=" w-full bg-white  max-w-7xl py-12 px-6 shadow-inner rounded-2xl flex gap-10 items-center justify-between h-full ">

            {/* Depature details  */}
            <div className=" flex flex-col gap-5 items-start " >
                {/* depature airport  */}
                <div className="w-fit basis-1/3 relative flex items-start gap-3 justify-start border border-[#E6E8E7] py-7 px-4 rounded-md " >
                    <Image src={"/flights/AirplaneTakeoff.svg"} height={30} width={30} alt="take-off" />
                    <label htmlFor="depatureAirport" className="flex flex-col gap-1 items-start" >
                        <p>
                            <span className="text-base md:text-lg font-semibold text-black " > {`Chennai`} </span>
                            <span className="text-xs md:text-sm font-normal text-black ml-2 " >{`CHE`} </span>
                        </p>

                        <CustomSelect
                            name="depatureAirport"
                            onChange={handleSelectChange}
                            // options={countryOptions}
                            placeholder="Please select an option"
                            value={flightDetails.depatureAirport}
                            
                        />

                    </label>
                    <span className="absolute top-[-15px] left-10 text-xs md:text-sm font-normal block bg-white p-2 " >From</span>
                </div>


                {/* depature date  */}
                <div className="w-fit basis-1/3 relative flex items-start gap-3 justify-start border border-[#E6E8E7] py-7 px-4 rounded-md " >
                    <Image src={"/flights/Calender.svg"} height={30} width={30} alt="take-off" />
                    <div className="flex flex-col gap-1 items-start" >
                        <p>
                            <span className="text-base md:text-lg font-semibold text-black " > {`26/May/2023`} </span>
                        </p>
                    </div>
                    <span className="absolute top-[-15px] left-10 text-xs md:text-sm font-normal block bg-white p-2 " >Departure</span>
                </div>
            </div>


            <div className=" h-full basis-1/3 flex flex-col items-center justify-between gap-3 " >

                <div className="flex items-center justify-center flex-col gap-6" >

                    <Image src={"/flights/Arrow.svg"} height={20} width={20} alt="airplane" className=" transform rotate-90 " />
                    <Image src={"/flights/airplane.svg"} height={80} width={80} alt="airplane" />
                </div>




                {/* flight class  */}
                <div className="w-full basis-1/3 relative flex items-start gap-3 justify-start border border-[#E6E8E7] py-3 px-4 rounded-md my-2 " >
                    <div className="flex flex-col gap-1 items-start" >
                        <p>
                            <span className="text-base md:text-lg font-semibold text-black " > {`Economy`} </span>
                        </p>
                    </div>
                    <span className="absolute top-[-15px] left-10 text-xs md:text-sm font-normal block bg-white px-2 py-1 " >Class</span>
                </div>



                <Button ariaLabel="Search Flights" label="Search Flights" type="submit" variant="primary" className="w-full font-signika !bg-[#EF8F57] text-white !py-4  hover:scale-90 transition-transform duration-150 ease-in-out shadow-2xl " />



            </div>





            {/* arrival details  */}

            <div className=" flex flex-col gap-5 items-start " >
                {/* arrival flights  */}
                <div className="w-fit basis-1/3 relative flex items-start gap-3 justify-start border border-[#E6E8E7] py-7 px-4 rounded-md" >
                    <Image src={"/flights/AirplaneLanding.svg"} height={30} width={30} alt="landing" />
                    <div className="flex flex-col gap-1 items-start" >
                        <p> <span className="text-base md:text-lg font-semibold text-black " > {`BANGALORE`} </span>
                            <span className="text-xs md:text-sm  font-normal text-black ml-2">{`BLR`} </span>
                        </p>
                        <p className="text-sm md:text-base font-normal" >Kempegowda International Airport</p>

                    </div>

                    <span className="absolute top-[-15px] left-10 text-xs md:text-sm font-normal block bg-white p-2 " >To</span>
                </div>

                {/* travellers */}
                <div className="w-full basis-1/3 relative flex items-start gap-3 justify-start border border-[#E6E8E7] py-3 px-4 rounded-md my-2 " >
                    <div className="flex flex-col gap-1 items-start" >
                        <p>
                            <span className="text-base md:text-lg font-semibold text-black " > {`1 adult`} </span>
                        </p>
                    </div>
                    <span className="absolute top-[-15px] left-10 text-xs md:text-sm font-normal block bg-white px-2 py-1 " >Traveller</span>
                </div>


            </div>


        </form>
    )
}