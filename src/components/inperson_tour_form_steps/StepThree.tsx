import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import Input from "../common/Input";
import Button from "../common/Button";
import { CustomSelect } from "../common/CustomSelect";
import { howDidYouHear, preferredFoodOptions } from "@/data/data";
import { Textarea } from "../ui/textarea";
import { CustomCheckBox } from "../common/CustomCheckbox";
import toast from "react-hot-toast";



interface StepTwoProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>
    setStepFour: () => void;
    setStepTwo: () => void;
}


export const StepThree = ({ formValues, setFormValues, setStepFour, setStepTwo }: StepTwoProps) => {



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));

    };




    const handleSelectChange = (name: string, value: string) => {
        const updated = { ...formValues, [name]: value };
        setFormValues(updated);
    };



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
        if (!formValues.preferredFood || !formValues.specialRequest || !formValues.howDidYouHear || !formValues.otherMessage) {
            toast.error("All required fields must be completed!")
            return;
        }
        setStepFour()
    }





    return (
        <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-6 px-4 md:px-6 flex-col gap-7 rounded-md  " >
            <h3 className=" text-2xl font-semibold text-black " >Tour Specifics</h3>




            {/* Preferred Food Options (multiple) */}
            <div className="w-full flex flex-col items-start gap-3">
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





            {/* Special request input  */}
            <Input
                value={formValues.specialRequest}
                type="string"
                label="Special requests for your tour"
                name="specialRequest"
                placeholder="Please select an option"
                onChange={handleChange}
            />



            {/* How did you hear about Lagos Rhythm  */}
            <label htmlFor="howDidYouHear" className="w-full " >
                <CustomSelect
                    name="howDidYouHear"
                    onChange={handleSelectChange}
                    options={howDidYouHear}
                    label="How did you hear about Lagos Rhythm"
                    placeholder="Please select an option"
                    value={formValues.howDidYouHear}
                />

                {
                    formValues.howDidYouHear === "Other" && (
                        <Input
                            value={formValues.discountCode}
                            type="string"
                            label="Please enter"
                            name="discountCode"
                            onChange={handleChange}
                        />
                    )
                }
            </label>




            {/* Discount code  */}
            <label htmlFor="discountCode" className="w-full" >
                <Input
                    value={formValues.discountCode}
                    type="string"
                    label="Enter Discount Code (optional)"
                    name="discountCode"
                    placeholder="FT743JU7"
                    onChange={handleChange}
                />
            </label>



            {/* message for team  */}
            <label htmlFor="" className="w-full flex flex-col gap-4 ">
                Tell us how we can make your Lagos experience unforgettable.
                <Textarea
                    id="otherMessage"
                    name="otherMessage"
                    className="bg-white border-0 outline-0 px-5 py-8 "
                    onChange={(e) => setFormValues({
                        ...formValues,
                        otherMessage: e.target.value
                    })}
                />
            </label>



            {/* The navigation buttons  */}
            <div className=" w-full flex items-center justify-between " >

                <Button
                    label="Prev"
                    type="button"
                    ariaLabel="Previous"
                    variant="ghost"
                    className="!bg-[#EF8F57] w-fit rounded-sm"
                    onClick={() => setStepTwo()}
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

