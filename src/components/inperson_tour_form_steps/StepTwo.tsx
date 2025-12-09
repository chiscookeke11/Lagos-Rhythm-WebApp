import { IamJoiningAsData, preferredFoodOptions, whatBringsYouToTourOptions } from "@/data/data";
import Button from "../common/Button";
import { CustomSelect } from "../common/CustomSelect";
import { CustomCheckBox } from "../common/CustomCheckbox";
import Input from "../common/Input";
import DatePicker from "react-datepicker";
import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import React, { SetStateAction, useState } from "react";



interface StepTwoProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>;
    setStepOnePositionX: React.Dispatch<SetStateAction<string>>;
    stepTwoPositionX: string;
    setStepTwoPositionX: React.Dispatch<SetStateAction<string>>
}



export const StepTwo = ({ formValues, setFormValues, setStepOnePositionX, stepTwoPositionX, setStepTwoPositionX }: StepTwoProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const minDate = new Date("2025-08-04");
    const maxDate = new Date("2025-08-16");



    const handleDateChange = (date: Date | null) => {
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
    const handleCheckboxChange = (
        name: keyof inpersonFormUserData,
        checked: boolean,
        value: string
    ) => {
        if (Array.isArray(formValues[name])) {
            // Handle multiple checkboxes (array field)
            const previousValues = formValues[name] as string[];

            const updatedValues = checked
                ? [...previousValues, value]                // add value
                : previousValues.filter((item) => item !== value); // remove value

            setFormValues({
                ...formValues,
                [name]: updatedValues
            });

        } else {
            // Single checkbox selection
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };




    return (
        <div className={` flex items-center justify-center  h-full w-full px-4 z-40 absolute top-[50%] left-[50%] translate-y-[-50%] transition-all duration-400 ease-in-out ${stepTwoPositionX}  `} >
            <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-6 px-4 md:px-6 flex-col gap-4 rounded-md  " >
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
                <div className="w-full flex flex-col items-start gap-5 " >
                    <h1 className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" >Preferred Food Options:<div className=" text-red-600" >*</div></h1>


                    <div className="flex flex-wrap gap-4 justify-items-stretch  "  >
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







                {/* Preferred Food Options (multiple) */}
                <div className="w-full flex flex-col items-start gap-5">
                    <h1 className="text-[#000000] font-medium text-base font-lato flex items-start gap-1">
                        Preferred Food Options:
                        <div className="text-red-600">*</div>
                    </h1>

                    <div className="flex flex-wrap gap-4">
                        {preferredFoodOptions.map((option, index) => {
                            const isChecked = formValues.preferredFood.includes(option.label);

                            return (
                                <CustomCheckBox
                                    key={index}
                                    checked={isChecked}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange("preferredFood", checked, option.label)
                                    }
                                    label={option.label}
                                    id={option.label}
                                />
                            );
                        })}
                    </div>


                    {
                        formValues.preferredFood === "Other (please specify)" && (
                            <Input
                                value={formValues.otherPreferredFood}
                                label="Please enter option"
                                type="string"
                                name="otherPreferredFood"
                                onChange={handleChange}
                            />
                        )
                    }
                </div>


















                {/* The navigation buttons  */}
                <div className=" w-full flex items-center justify-between " >

                    <Button
                        label="Prev"
                        type="button"
                        ariaLabel="Previous"
                        variant="ghost"
                        className="!bg-[#EF8F57] w-fit rounded-sm"
                        onClick={() => {
                            setStepOnePositionX("translate-x-[-50%]")
                        }}
                    />


                    <Button
                        label="Next"
                        type="button"
                        ariaLabel="next"
                        variant="ghost"
                        className="!bg-[#EF8F57] w-fit rounded-sm"
                        onClick={() => {
                            setStepTwoPositionX("translate-x-[-500%]")
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
