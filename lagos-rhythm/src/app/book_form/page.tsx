"use client"

import Button from "@/components/common/Button";
import { CustomCheckBox } from "@/components/common/CustomCheckbox";
import { CustomSelect } from "@/components/common/CustomSelect";
import Input from "@/components/common/Input";
import { countryOptions } from "@/data/countryList";
import { BestLocationData, joinAsData, raceData, referralSourceData } from "@/data/data";
import { userDataType } from "@/Types/UserDataType";
import Image from "next/image";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Page() {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const minDate = new Date("2025-08-01");
    const maxDate = new Date("2025-08-31");

    const [userData, setUserData] = useState<userDataType>({
        fullName: "",
        email: "",
        race: "",
        country: "",
        joiningAs: "",
        tourDate: [],
        referralSource: "",
        communicationConsent: undefined,
        termsAgreement: undefined,
    })


    const handleDateChange = (date: Date | null) => {
        if (!date) return;

        const newDates = selectedDates.some(
            (d) => d.toDateString() === date.toDateString()
        )
            ? selectedDates.filter((d) => d.toDateString() !== date.toDateString()) :
            [...selectedDates, date];

        setSelectedDates(newDates)

        const formatted = newDates.map((d) => d.toISOString());
        setUserData({
            ...userData,
            tourDate: formatted
        })
    };


    const clearAllDates = () => {
        setSelectedDates([]);
        setUserData({
            ...userData,
            tourDate: []
        })
    }






    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget

        setUserData({
            ...userData,
            [name]: value,
        })
    }

    console.log(userData)

    const handleSelectChange = (name: string, value: string) => {
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setUserData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    }





    return (
        <div className="w-full  flex  flex-col h-full bg-[#EF8F57] text-[#05073C] " >
            <div className="w-full h-[300px] bg-[url('/booking-form/coming-soon-bg.jpg')] bg-no-repeat bg-center bg-cover  " />
            <div className="w-full h-fit flex items-center justify-center bg-[#FDF4F1]  " >
                <div className=" flex items-center w-fit flex-col gap-5 lg:gap-10 pb-10 px-4 mt-[-7%]  " >

                    <div className="w-full flex items-center justify-center gap-4 px-[3%] " >
                        {
                            BestLocationData.slice(0, 3).map((data, index) => (
                                <div key={index} title={data.label} className="bg-[#ffffff] rounded-[20px] flex items-center justify-center w-[100px] h-[100px] md:h-[200px] md:w-[200px] lg:w-[294px] lg:h-[263px] overflow-hidden p-2 md:p-3 " >
                                    <Image src={data.image} alt="image" height={100} width={100} className="w-full h-full object-cover rounded-[10px] " />
                                </div>
                            ))
                        }
                    </div>

                    <div className="w-full flex flex-col items-center gap-2 justify-center my-10 text-center ">
                        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-merienda " >BOOK YOUR PACKAGE</h1>
                        <p className="font-medium text-base md:text-lg font-lato " >Experience Something New Every Moment</p>

                    </div>

                    <form action="" className=" w-full max-w-5xl  py-3.5 lg:py-7 px-1 md:px-5 rounded-[20px] flex flex-col items-center gap-7 font-lato  ">
                        <Input value={userData.fullName} type="string" label="Full name" name="fullName" onChange={handleChange} isRequired placeholder="John Ade" />
                        <Input value={userData.email} type="email" label="Email" name="email" onChange={handleChange} isRequired placeholder="JohnAde@gmail.com" />


                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6"  >
                            <CustomSelect name="race" onChange={handleSelectChange} placeholder="Please select an option" options={raceData} label="Race/Ethnic identity" isRequired />
                            <CustomSelect name="country" onChange={handleSelectChange} options={countryOptions} label="Country" placeholder="Please select an option" isRequired />
                        </div>

                        <CustomSelect name="joiningAs" onChange={handleSelectChange} placeholder="Please select an option" label="I am joining as a:" isRequired options={joinAsData} />








                        <div className=" w-full" >
                            <label className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" >
                                Next tour date{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <DatePicker
                                selected={null}
                                onChange={handleDateChange}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Click to select multiple dates"
                                className="block w-full  rounded-lg px-4 py-3 text-lg cursor-pointer bg-white "
                                wrapperClassName="w-full"
                            />

                            {selectedDates.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="font-normal text-dark">Selected Dates:</p>
                                        <button
                                            type="button"
                                            onClick={clearAllDates}
                                            className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedDates.map((date, index) => (
                                            <div
                                                key={index}
                                                className="bg-orange-100 text-[#EF8F57] px-3 py-1 rounded-full text-xs flex items-center gap-2"
                                            >
                                                <span>{date.toDateString()}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDateChange(date)}
                                                    className="text-orange-500 hover:text-orange-700 font-bold cursor-pointer"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>




                        <CustomSelect name="referralSource" onChange={handleSelectChange} label="How did you hear about us?" isRequired options={referralSourceData} placeholder="Please select an option" />


                        <div className="w-full flex items-start flex-col gap-3" >

                            <CustomCheckBox
                                onCheckedChange={(checked) => handleCheckboxChange("communicationConsent", checked)}
                                checked={userData.communicationConsent}
                                label="I agree to receive emails about my free E-Rhythm booking"
                                id="communicationConsent" />

                            <CustomCheckBox
                                checked={userData.termsAgreement}
                                onCheckedChange={(checked) => handleCheckboxChange("termsAgreement", checked)}
                                label="I agree with Lagos Rhythm&apos;s Privacy Policy and Terms and conditions"
                                id="termsAgreement" />
                        </div>


                        <Button label="Submit" type="submit" ariaLabel="Submit" variant="ghost" className="!bg-[#EF8F57] w-full max-w-sm " />

                    </form>



                </div>
            </div>


        </div>
    )
}