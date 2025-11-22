"use client"

import { useAppContext } from "@/app/context/AppContext"
import Button from "@/components/common/Button";
import { CustomCheckBox } from "@/components/common/CustomCheckbox";
import { CustomSelect } from "@/components/common/CustomSelect";
import Input from "@/components/common/Input";
import { countryOptions } from "@/data/countryList";
import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import { useState } from "react";





// Step one
const StepOne = () => {
    const [formValues, setFormValues] = useState<inpersonFormUserData>({
        fullName: "",
        emailAddress: "",
        country: "",
        arrivalDate: null,
        discountCode: "",
        howDidYouHere: "",
        isAdult: "",
        joiningAs: "",
        otherMessage: "",
        paymentType: "Full Payment",
        phoneNumber: "",
        preferredFood: "",
        reasonForTour: "",
        specialRequest: ""
    })






    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // const updated = { ...userData, [name]: value };
        // setUserData(updated);

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
const StepTwo = () => {
    return (
        <div className=" bg-green-600 flex items-center justify-center  h-full w-full px-4 absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]  " >
            <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-4 px-3 flex-col gap-4 rounded-md  " >
                <h3 className=" text-2xl font-semibold text-black " >Tour Specifics</h3>




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



    return (
        <div className="w-full min-h-screen text-black flex items-center justify-center bg-cover bg-center bg-no-repeat relative font-merienda " style={{ backgroundImage: "url('/in-person/inperson-form-bg.jpg')" }} >
            <div className="inset-0 bg-black/55 absolute h-full w-full " />



            <div className="  absolute inset-0 bg-red-600 w-full h-full px " >


                <form className=" w-full h-full bg-amber-400 relative  inset-0  flex items-center justify-center  overflow-hidden    " >

                    {/* <StepOne /> */}
                    <StepTwo />
                    <StepThree />

                </form>


            </div>





            {inpersonTourPackage}
        </div>
    )
}