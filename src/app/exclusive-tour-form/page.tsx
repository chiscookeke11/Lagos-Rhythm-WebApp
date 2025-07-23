"use client"


import { CustomCheckBox } from "@/components/common/CustomCheckbox";
import { CustomSelect } from "@/components/common/CustomSelect";
import Input from "@/components/common/Input";
import { countryOptions } from "@/data/countryList";
import { bookFormImages, reasonForJoinOptions } from "@/data/data";
import { exclusiveBookingDataType } from "@/Types/UserDataType";
import Image from "next/image";
import React, { useEffect, useState } from "react";



export default function Page() {
    const [nameFieldCount, setNameFieldCount] = useState<number>(3)
    const [emailFieldCount, setEmailFieldCount] = useState(3)
    const [touristNames, setTouristNames] = useState<string[]>([])
    const [touristEmails, setTouristEmails] = useState<string[]>([])


    const [bookingData, setBookingData] = useState<exclusiveBookingDataType>({
        country: "",
        reasonForJoin: [],
        joiningAs: "",
        OtherReason: "",
        referralSource: "",
        tourDate: [],
        communicationConsent: undefined,
        otherJoin: "",
        termsAgreement: undefined
    })



    const handleTouristCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value) || 0

        if (count > 11) return;

        setNameFieldCount(count)
        setEmailFieldCount(count)
    }

    const handleNameChange = (index: number, value: string) => {
        const updated = [...touristNames]
        updated[index] = value
        setTouristNames(updated)
    }

    const handleEmailChange = (index: number, value: string) => {
        const updated = [...touristEmails]
        updated[index] = value
        setTouristEmails(updated)
    }

    useEffect(() => {
        const updatedNames = Array.from({ length: nameFieldCount }, (_, i) => touristNames[i] || "");
        setTouristNames(updatedNames);
    }, [nameFieldCount]);


    useEffect(() => {
        const updatedEmails = Array.from({ length: emailFieldCount }, (_, i) => touristEmails[i] || "")
        setTouristEmails(updatedEmails)
    }, [emailFieldCount])



    const handleSelectChange = (name: string, value: string) => {
        const updated = { ...bookingData, [name]: value };
        setBookingData(updated)

        // const field = name as keyof exclusiveBookingDataType;
        // add the error validation logic later
    }


    // checkbox function
        const handleCheckboxChange = (name: string, checked: boolean, value?: string) => {
            let updatedUserData: exclusiveBookingDataType = { ...bookingData }


            if (name === "reasonForJoin" && value !== undefined) {
                const currentReasons = updatedUserData.reasonForJoin

                if (value === "others") {
                    if (checked) {
                        updatedUserData.reasonForJoin = ["others"]
                    }
                    else {
                        updatedUserData.reasonForJoin = currentReasons.filter((item) => item !== "others")
                    }
                }
                else {
                    if (checked) {
                        const filteredReasons = currentReasons.filter((item) => item !== "others")
                        updatedUserData.reasonForJoin = [...filteredReasons, value]
                    }
                    else {
                        updatedUserData.reasonForJoin = currentReasons.filter((item) => item !== value)
                    }
                }
            }
            else {
                updatedUserData = { ...bookingData, [name]: checked }
            }

            setBookingData(updatedUserData)

            // const fieldToValidate = name as keyof exclusiveBookingDataType
            // const fieldError = validateUserData(updatedUserData, fieldToValidate)

            // setFormErrors((prev) => {
            //     const rest = { ...prev }
            //     delete rest[fieldToValidate]
            //     // Special handling for OtherReason error if 'others' is deselected
            //     if (fieldToValidate === "reasonForJoin" && !updatedUserData.reasonForJoin.includes("others")) {
            //         delete rest.OtherReason
            //     }
            //     return fieldError[fieldToValidate] ? { ...rest, [fieldToValidate]: fieldError[fieldToValidate] } : rest
            // })


        };



    return (
        <div className="w-full flex flex-col h-full text-[#05073C] relative">

            <div className="h-[300px] w-full relative " >
                <div className="w-full h-full absolute top-0 left-0  bg-[url('/booking-form/booking-form-hero-bg.jpg')] bg-no-repeat bg-center bg-cover  " />
                <div className="w-full h-full absolute top-0 left-0 bg-black/30 " />
            </div>

            <div className="w-full h-fit flex items-center justify-center bg-[#FDF4F1] z-10 ">
                <div className="flex items-center w-fit flex-col gap-5 lg:gap-10 pb-10 px-4 mt-[-7%]">
                    <div className="w-full flex items-center justify-center gap-4 px-[3%]">
                        {bookFormImages.slice(0, 3).map((data, index) => (
                            <div key={index} title={data.label} className="bg-[#ffffff]   rounded-[20px] flex items-center justify-center w-[100px] h-[100px] md:h-[200px] md:w-[200px] lg:w-[294px] lg:h-[263px] overflow-hidden p-2 md:p-3">
                                <div className="relative h-full w-full">
                                    <Image src={data.img} title={data.label} alt="image" fill className="rounded-[10px]" priority />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex flex-col items-center gap-2 justify-center my-5 lg:my-5 text-center">
                        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-merienda">BOOK YOUR PACKAGE</h1>
                        <p className="font-medium text-base md:text-lg font-lato">Experience Something New Every Moment</p>
                    </div>
                    <input type="number" min={0} max={10} value={nameFieldCount} onChange={handleTouristCountChange} />

                    <form className="w-full max-w-5xl py-3.5 lg:py-7 px-1 md:px-5 rounded-[20px] flex flex-col items-center gap-7 font-lato">

                        <div className=" w-full flex flex-col  gap-3 " >
                            <h3>Enter Full name</h3>
                            <div className="w-full grid grid-cols-2 gap-5 place-items-center justify-items-center " >

                                {touristNames.map((name, index) => (
                                    <Input key={index} name="name" type="text" onChange={(e) => handleNameChange(index, e.target.value)} value={name} label={`Name ${index + 1}`} isRequired placeholder={`Please enter user ${index + 1} fullname`} />
                                ))}
                            </div>

                        </div>




                        <div className=" w-full flex flex-col  gap-3 " >
                            <h3>Enter Emails</h3>
                            <div className="w-full grid grid-cols-2 gap-5 place-items-center justify-items-center " >
                                {touristEmails.map((name, index) => (
                                    <Input key={index} name="email" type="email" onChange={(e) => handleEmailChange(index, e.target.value)} value={name} label={`Email ${index + 1}`} isRequired />
                                ))}
                            </div>
                        </div>


                        <CustomSelect
                            name="country"
                            onChange={handleSelectChange}
                            options={countryOptions}
                            label="Country"
                            placeholder="Please select an option"
                            value={bookingData.country}
                            isRequired
                        />

                        <div className="w-full flex flex-col items-start gap-5 " >
                            <h1 className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" >What brings you to this tour  <div className=" text-red-600" >*</div></h1>


                            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-stretch  "  >
                                {reasonForJoinOptions.map((option, index) => {
                                    const isChecked = bookingData.reasonForJoin.includes(option.value)
                                    return (
                                        <CustomCheckBox
                                            key={index}
                                            checked={isChecked}
                                            onCheckedChange={(checked) => handleCheckboxChange("reasonForJoin", checked, option.value)}
                                            label={option.label}
                                            id={option.value}

                                        />
                                    )
                                })}
                            </div>
                            {/* {formErrors.reasonForJoin && (
                                <p className="text-red-500 text-xs md:text-sm ml-auto ">{formErrors.reasonForJoin}</p>
                            )} */}
                        </div>






                    </form>


                </div>
            </div>
        </div>

    )
}