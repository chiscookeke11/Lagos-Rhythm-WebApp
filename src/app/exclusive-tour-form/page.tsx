"use client"


import { CustomCheckBox } from "@/components/common/CustomCheckbox";
import { CustomSelect } from "@/components/common/CustomSelect";
import Input from "@/components/common/Input";
import { countryOptions } from "@/data/countryList";
import { bookFormImages, reasonForJoinOptions } from "@/data/data";
import { exclusiveBookingDataType } from "@/Types/UserDataType";
import { Minus, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";



export default function Page() {
    const [touristNames, setTouristNames] = useState<string[]>([])
    const [touristEmails, setTouristEmails] = useState<string[]>([])
    const { participantsCount, setParticipantsCount, populationType, populationAmount, selectedTheme } = useAppContext()
    const maxParticipantCount = populationAmount





    console.log(populationType)

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

    console.log(participantsCount)

    const increaseParticipantsCount = () => {
        if (participantsCount >= maxParticipantCount) return;

        else {
            setParticipantsCount((prev) => prev + 1)
        }
    }

    const decreaseParticipantsCount = () => {
        if (participantsCount < 2) return;

        else {
            setParticipantsCount((prev) => prev - 1)
        }
    }


    useEffect(() => {
        setTouristNames((prev) =>
            Array.from({ length: participantsCount }, (_, i) => prev[i] || "")
        )

        setTouristEmails((prev) =>
            Array.from({ length: participantsCount }, (_, i) => prev[i] || "")
        );
    }, [participantsCount])

    const handleNameChange = (index: number, value: string) => {
        const updated = [...touristNames];
        updated[index] = value;
        setTouristNames(updated);
    };

    const handleEmailChange = (index: number, value: string) => {
        const updated = [...touristEmails];
        updated[index] = value;
        setTouristEmails(updated);
    };


    console.log(touristEmails)
    console.log(touristNames)





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


                    <form className="w-full max-w-5xl py-3.5 lg:py-7 px-1 md:px-5 rounded-[20px] flex flex-col items-center gap-7 font-lato">


                        <h2 className="mr-auto " >{populationType} </h2>
                        <h2 className="mr-auto " >{participantsCount} </h2>
                        <h2 className="mr-auto " >Max: {populationAmount} </h2>
                        <h2 className="mr-auto " >Selected Theme: {selectedTheme} </h2>


                        <div className="w-full flex flex-col items-start gap-7  " >

                            {Array.from({ length: participantsCount }).map((_, index) => (
                                <div key={index} className="w-full flex items-center gap-6 justify-between">
                                    <Input
                                        name={`fullName_${index}`}
                                        type="text"
                                        value={touristNames[index] || ""}
                                        placeholder={`User ${index + 1}`}
                                        label={`User ${index + 1} Full Name`}
                                        onChange={(e) => handleNameChange(index, e.target.value)}
                                        isRequired
                                    />
                                    <Input
                                        name={`email_${index}`}
                                        type="email"
                                        value={touristEmails[index] || ""}
                                        placeholder={`User ${index + 1} Email`}
                                        label={`User ${index + 1} Email`}
                                        onChange={(e) => handleEmailChange(index, e.target.value)}
                                        isRequired
                                    />
                                </div>
                            ))}




                            <div className="w-fit flex items-center justify-center gap-3 ml-auto" >
                                <button onClick={decreaseParticipantsCount} type="button" className=" cursor-pointer border-2 border-[#EF8F57] rounded-full h-5 w-5 flex items-center justify-center " > <Minus size={25} color="#EF8F57" /> </button>
                                <button onClick={increaseParticipantsCount} type="button" className=" cursor-pointer border-2 border-[#EF8F57] rounded-full h-5 w-5 flex items-center justify-center " > <PlusIcon size={25} color="#EF8F57" /> </button>

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