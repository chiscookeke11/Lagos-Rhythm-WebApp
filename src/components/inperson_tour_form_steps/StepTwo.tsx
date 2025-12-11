import { IamJoiningAsData, whatBringsYouToTourOptions } from "@/data/data";
import Button from "../common/Button";
import { CustomSelect } from "../common/CustomSelect";
import { CustomCheckBox } from "../common/CustomCheckbox";
import Input from "../common/Input";
import DatePicker from "react-datepicker";
import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import React, {useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import toast from "react-hot-toast";



interface StepTwoProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>;
    setStepOne: () => void;
    setStepThree: () => void;
}



export const StepTwo = ({ formValues, setFormValues, setStepOne, setStepThree }: StepTwoProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const minDate = new Date("2025-12-11");
    const maxDate = new Date("2025-12-26");
    const { selectedInpersonTheme } = useAppContext()



    const handleDateChange = (date: Date | null) => {
        if (!date) return;

        setSelectedDate(date)
        setFormValues({
            ...formValues,
            arrivalDate: date
        })
    };



    const handleSelectChange = (name: string, value: string) => {
        const updated = { ...formValues, [name]: value };
        setFormValues(updated);
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


      const handleNext = () => {
            if (!formValues.arrivalDate || !formValues.duration || !formValues.reasonForTour || !formValues.joiningAs || !formValues.fitForTravel ) {
                toast.error("All required fields must be completed!")
                return;
            }
            setStepThree()
        }




    return (
        <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-6 px-4 md:px-6 flex-col gap-7 rounded-md  " >
            <h3 className=" text-2xl font-semibold text-black " >Tour Specifics</h3>



            {/* Date input  */}
            <label htmlFor="" className="w-full font-lato" >
                {
                    selectedDate ? (

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-dark">Selected Date:</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div
                                    className="bg-orange-200 font-merienda text-orange-500 px-3 py-1 rounded-full text-sm flex items-center gap-2"
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
                                    id="arrivalDate"
                                    name="arrivalDate"
                                />
                            </>
                        )
                }

            </label>


            {/* duration input  */}
            <label htmlFor="duration" className="w-full " >
                <CustomSelect
                    name="duration"
                    onChange={handleSelectChange}
                    options={
                        selectedInpersonTheme === "Work & Vibe"
                            ? [
                                { label: "2 Weeks", value: "2 Weeks" },
                                { label: "1 Month", value: "1 Month" }
                            ]
                            : [
                                { label: "3 Days", value: "3 Days" },
                                { label: "5 Days", value: "5 Days" }
                            ]
                    }
                    label="How long will you be staying?"
                    placeholder="Please select an option"
                    value={formValues.duration}
                />
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
            <div className="w-full flex flex-col items-start gap-3 " >
                <h1 className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" >Are you medically and physically fit for travel and outdoor activities?<div className=" text-red-600" >*</div></h1>


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









            {/* The navigation buttons  */}
            <div className=" w-full flex items-center justify-between " >

                <Button
                    label="Prev"
                    type="button"
                    ariaLabel="Previous"
                    variant="ghost"
                    className="!bg-[#EF8F57] w-fit rounded-sm"
                    onClick={() => setStepOne()}
                />


                <Button
                    label="Next"
                    type="button"
                    ariaLabel="next"
                    variant="ghost"
                    className="!bg-[#EF8F57] w-fit rounded-sm"
                    onClick={handleNext}
                />
            </div>
        </div>
    )
}
