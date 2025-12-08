"use client"

import { useAppContext } from "@/app/context/AppContext"
import Button from "@/components/common/Button";
import { CustomCheckBox } from "@/components/common/CustomCheckbox";
import { CustomSelect } from "@/components/common/CustomSelect";
import Input from "@/components/common/Input";
import { countryOptions } from "@/data/countryList";
import { IamJoiningAsData, whatBringsYouToTourOptions } from "@/data/data";
import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";





// Step one
interface StepOneProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>
}
const StepOne = ({ formValues, setFormValues }: StepOneProps) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // const updated = { ...u, [name]: value };
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));

        // const fieldName = name as keyof userDataType;
        // const fieldError = validateUserData(updated, fieldName);

        // setFormErrors(prev => {
        //     const rest = { ...prev };
        //     delete rest[fieldName];
        //     return fieldError[fieldName] ? { ...rest, [fieldName]: fieldError[fieldName] } : rest;
        // });
    };



    // select change function
    const handleSelectChange = (name: string, value: string) => {
        const updated = { ...formValues, [name]: value };
        setFormValues(updated);

        // const field = name as keyof userDataType;
        // const fieldError = validateUserData(updated, field);

        // setFormErrors(prev => {
        //     const rest = { ...prev };
        //     delete rest[field];
        //     return fieldError[field] ? { ...rest, [field]: fieldError[field] } : rest;
        // });
    };




    // checkbox function
    const handleCheckboxChange = (name: string, checked: boolean, value?: string) => {
        if (value) {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }

        const fieldToValidate = name as keyof inpersonFormUserData
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

        <div className=" bg-green-600 flex items-center justify-center  h-full w-full px-4 absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]  " >
            <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-4 px-3 flex-col gap-4 rounded-md  " >
                <h3 className=" text-2xl font-semibold text-black " >Personal details</h3>

                {/* full name input  */}
                <Input
                    value={formValues.fullName}
                    type="string"
                    label="Full name"
                    name="fullName"
                    onChange={handleChange}
                    placeholder="John Ade"
                    isRequired
                />


                {/* email address input  */}
                <Input
                    value={formValues.emailAddress}
                    type="string"
                    label="Email address"
                    name="emailAddress"
                    onChange={handleChange}
                    placeholder="JohnAde@gmail.com"
                    isRequired
                />


                {/* phone number input   */}
                <Input
                    value={formValues.phoneNumber}
                    type="string"
                    label="Phone Number"
                    name="phoneNumber"
                    onChange={handleChange}
                    isRequired
                />



                {/* country input  */}
                <CustomSelect
                    name="country"
                    onChange={handleSelectChange}
                    options={countryOptions}
                    label="Country"
                    placeholder="Please select an option"
                    //  error={formErrors.country}
                    isRequired
                    value={formValues.country}
                />



                {/* Age input  */}
                <div className="w-full flex flex-col items-start gap-5 " >
                    <h1 className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" >Are you 18 years or older?  <div className=" text-red-600" >*</div></h1>


                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-stretch  "  >
                        {["yes", "no"].map((option, index) => {
                            const isChecked = formValues.isAdult === option
                            return (
                                <CustomCheckBox
                                    key={index}
                                    checked={isChecked}
                                    onCheckedChange={() => handleCheckboxChange("isAdult", true, option)}
                                    label={option.toUpperCase()}
                                    id={option}

                                />
                            )
                        })}
                    </div>
                    {/* {formErrors.reasonForJoin && (
                                <p className="text-red-500 text-xs md:text-sm ml-auto ">{formErrors.reasonForJoin}</p>
                            )} */}
                </div>


                <Button
                    label="Next"
                    type="button"
                    ariaLabel="next"
                    variant="ghost"
                    className="!bg-[#EF8F57] w-fit rounded-sm ml-auto  "
                />

            </div>
        </div>
    )
}





// Step two
interface StepTwoProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>
}
const StepTwo = ({ formValues, setFormValues }: StepTwoProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const minDate = new Date("2025-08-04");
    const maxDate = new Date("2025-08-16");



    const handleDateChange = (date: Date | null) => {
        const chosenDate = setFormValues((prev) => ({
            ...prev,
            arrivalDate: date
        }))

        setSelectedDate(date)
    };



    const handleSelectChange = (name: string, value: string) => {
        const updated = { ...formValues, [name]: value };
        setFormValues(updated);

        // const field = name as keyof userDataType;
        // const fieldError = validateUserData(updated, field);

        // setFormErrors(prev => {
        //     const rest = { ...prev };
        //     delete rest[field];
        //     return fieldError[field] ? { ...rest, [field]: fieldError[field] } : rest;
        // });
    };




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };



    // checkbox function
    const handleCheckboxChange = (name: string, checked: boolean, value?: string) => {
        if (value) {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }

        const fieldToValidate = name as keyof inpersonFormUserData
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
        <div className=" bg-green-600 flex items-center justify-center  h-full w-full px-4 absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]  " >
            <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-4 px-3 flex-col gap-4 rounded-md  " >
                <h3 className=" text-2xl font-semibold text-black " >Tour Specifics</h3>



                {/* Date input  */}
                <label htmlFor="" className="w-full" >
                    {
                        selectedDate ? (

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-dark">Selected Date:</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <div
                                        className="bg-orange-200 text-orange-500 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                    >
                                        <span>{formValues.arrivalDate?.toDateString()}</span>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedDate(null)}
                                            className="text-orange-500 hover:text-orange-700 font-bold cursor-pointer"
                                        >
                                            ×
                                        </button>
                                    </div>

                                </div>
                            </div>


                        ) :
                            (
                                <>
                                    Expected arrival date
                                    <DatePicker
                                        selected={null}
                                        onChange={handleDateChange}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        placeholderText="Click to select multiple dates"
                                        className="block w-full border rounded-lg px-4 py-3 text-lg cursor-pointer"
                                        wrapperClassName="w-full"
                                    />
                                </>
                            )
                    }

                </label>


                {/* What brings you to the tour input  */}
                <label htmlFor="reasonForTour" className="w-full " >
                    <CustomSelect
                        name="reasonForTour"
                        onChange={handleSelectChange}
                        options={whatBringsYouToTourOptions}
                        label="What brings you to the tour"
                        placeholder="Please select an option"
                        value={formValues.reasonForTour}
                    />
                </label>

                {/* The input for other reason for tour  */}
                {
                    formValues.reasonForTour === "Other" && (
                        <Input
                            value={formValues.otherReasonForTour}
                            type="string"
                            label="Other reason for joining tour"
                            name="otherReasonForTour"
                            placeholder="Please select an option"
                            onChange={handleChange}
                        />
                    )
                }




                {/* Joining as input  */}
                <label htmlFor="joiningAs" className="w-full " >
                    <CustomSelect
                        name="joiningAs"
                        onChange={handleSelectChange}
                        options={IamJoiningAsData}
                        label="I am joining as a"
                        placeholder="Please select an option"
                        value={formValues.joiningAs}
                    />
                </label>



                {/* Food options input   */}
                The checkbox for food here



                <div className="w-full flex flex-col items-start gap-5 " >
                    <h1 className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" >Are you 18 years or older?  <div className=" text-red-600" >*</div></h1>


                    <div className="flex flex-col gap-4 justify-items-stretch  "  >
                        {["Yes, I am fit to travel", " I may require special assistance (please specify below)"].map((option, index) => {
                            const isChecked = formValues.fitForTravel === option
                            return (
                                <CustomCheckBox
                                    key={index}
                                    checked={isChecked}
                                    onCheckedChange={() => handleCheckboxChange("fitForTravel", true, option)}
                                    label={option}
                                    id={option}

                                />
                            )
                        })}
                    </div>
                </div>



                {/* Special request input  */}
                <Input
                    value={formValues.specialRequest}
                    type="string"
                    label="Special requests for your tour"
                    name="specialRequest"
                    placeholder="Please select an option"
                    onChange={handleChange}
                />













                {/* The navigation buttons  */}
                <div className=" w-full flex items-center justify-between " >

                    <Button
                        label="Prev"
                        type="button"
                        ariaLabel="Previous"
                        variant="ghost"
                        className="!bg-[#EF8F57] w-fit rounded-sm "
                    />


                    <Button
                        label="Next"
                        type="button"
                        ariaLabel="next"
                        variant="ghost"
                        className="!bg-[#EF8F57] w-fit rounded-sm   "
                    />
                </div>
            </div>
        </div>
    )
}






// Step three
const StepThree = () => {
    return (
        <div className=" bg-green-600 flex items-center justify-center  h-full w-full px-4 absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[500%]  " >
            <div className=" bg-white h-fit w-full max-w-6xl  flex items-center justify-center py-4 px-3 flex-col gap-4 rounded-md" >
                3rd step

                <button> Submit</button>
            </div>
        </div>
    )
}









export default function Page() {

    const { inpersonTourPackage } = useAppContext()
    const [formValues, setFormValues] = useState<inpersonFormUserData>({
        fullName: "",
        emailAddress: "",
        country: "",
        arrivalDate: null,
        discountCode: "",
        howDidYouHear: "",
        isAdult: "",
        joiningAs: "",
        otherMessage: "",
        paymentType: "Full Payment",
        phoneNumber: "",
        preferredFood: [],
        reasonForTour: "",
        otherReasonForTour: "",
        fitForTravel: "",
        specialRequest: ""
    })

    console.log("The form values:", formValues)



    return (
        <div className="w-full min-h-screen text-black flex items-center justify-center bg-cover bg-center bg-no-repeat relative font-merienda " style={{ backgroundImage: "url('/in-person/inperson-form-bg.jpg')" }} >
            <div className="inset-0 bg-black/55 absolute h-full w-full " />



            <div className="  absolute inset-0 bg-red-600 w-full h-full px " >


                <form className=" w-full h-full bg-amber-400 relative  inset-0  flex items-center justify-center  overflow-hidden    " >

                    {/* <StepOne formValues={formValues} setFormValues={setFormValues} /> */}
                    <StepTwo formValues={formValues} setFormValues={setFormValues} />
                    {/* <StepThree /> */}

                </form>


            </div>





            {inpersonTourPackage}
        </div>
    )
}