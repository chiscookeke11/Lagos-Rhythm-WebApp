import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import Input from "../common/Input";
import { CustomSelect } from "../common/CustomSelect";
import { countryOptions } from "@/data/countryList";
import { CustomCheckBox } from "../common/CustomCheckbox";
import Button from "../common/Button";
import React from "react";
import toast from "react-hot-toast";




interface StepOneProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>
    setStepTwo: () => void
}



export const StepOne = ({ formValues, setFormValues, setStepTwo }: StepOneProps) => {



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };



    // select change function
    const handleSelectChange = (name: string, value: string) => {
        const updated = { ...formValues, [name]: value };
        setFormValues(updated);
    };




    // checkbox function
    const handleCheckboxChange = (name: string, checked: boolean, value?: string) => {
        if (value) {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };


    const handleNext = () => {
        if (!formValues.fullName || !formValues.emailAddress || !formValues.country || !formValues.isAdult ) {
            toast.error("All required fields must be completed!")
            return;
        }
        setStepTwo()
    }


    return (
        <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-6 px-4 md:px-6 flex-col gap-7 rounded-md  " >
            <h3 className=" text-2xl font-semibold text-black " >Personal details</h3>

            {/* full name input  */}
            <Input
                value={formValues.fullName}
                type="text"
                label="Full name"
                name="fullName"
                onChange={handleChange}
                placeholder="John Ade"
                isRequired
            />


            {/* email address input  */}
            <Input
                value={formValues.emailAddress}
                type="text"
                label="Email address"
                name="emailAddress"
                onChange={handleChange}
                placeholder="JohnAde@gmail.com"
                isRequired
            />


            {/* phone number input   */}
            <Input
                value={formValues.phoneNumber}
                type="text"
                label="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
            />



            {/* country input  */}
            <CustomSelect
                name="country"
                onChange={handleSelectChange}
                options={countryOptions}
                label="Country"
                placeholder="Please select an option"
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
            </div>


            <Button
                label="Next"
                type="button"
                ariaLabel="next"
                variant="ghost"
                className="!bg-[#EF8F57] w-fit rounded-sm ml-auto  "
                onClick={handleNext}
            />

        </div>
    )
}
