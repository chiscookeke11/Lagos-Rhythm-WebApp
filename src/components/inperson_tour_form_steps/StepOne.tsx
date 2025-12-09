import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import Input from "../common/Input";
import { CustomSelect } from "../common/CustomSelect";
import { countryOptions } from "@/data/countryList";
import { CustomCheckBox } from "../common/CustomCheckbox";
import Button from "../common/Button";
import React, { SetStateAction} from "react";




interface StepOneProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>
    stepOnePositionX: string;
    setStepOnePositionX: React.Dispatch<SetStateAction<string>>
}



export const StepOne = ({ formValues, setFormValues, stepOnePositionX, setStepOnePositionX }: StepOneProps) => {



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

        <div className={`  flex items-center justify-center  h-full w-full px-4 z-50 absolute top-[50%] left-[50%]  translate-y-[-50%] transition-all duration-400 ease-in-out ${stepOnePositionX} `} >
            <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-6 px-4 md:px-6 flex-col gap-4 rounded-md  " >
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
                    onClick={() => setStepOnePositionX("translate-x-[-400%]") }
                />

            </div>
        </div>
    )
}
