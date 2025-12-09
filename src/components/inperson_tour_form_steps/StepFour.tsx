import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import Button from "../common/Button"
import { SetStateAction } from "react";
import { CustomCheckBox } from "../common/CustomCheckbox";






interface StepFourProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>;
    setStepThreePositionX: React.Dispatch<SetStateAction<string>>;
}

export default function StepFour({ formValues, setFormValues, setStepThreePositionX }: StepFourProps) {


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
        <div className={`flex items-center justify-center z-10  h-full w-full px-4 absolute top-[50%] left-[50%]  translate-y-[-50%] -translate-x-1/2 `} >
            <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-4 px-3 flex-col gap-4 rounded-md  " >

                Payment

                <div className="w-full flex flex-col items-start gap-5 " >
                    <h1 className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" >Select Payment Type:</h1>


                    <div className="flex flex-wrap gap-4 justify-items-stretch  "  >
                        {["Full Payment", "Deposit (50%)"].map((option, index) => {
                            const isChecked = formValues.paymentType === option
                            return (
                                <CustomCheckBox
                                    key={index}
                                    checked={isChecked}
                                    onCheckedChange={() => handleCheckboxChange("paymentType", true, option)}
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
                        onClick={() => {
                            setStepThreePositionX("translate-x-[-50%]")
                        }}
                    />


                    <Button
                        label="Submit"
                        type="submit"
                        ariaLabel="Submit"
                        variant="ghost"
                        className="!bg-[#EF8F57] w-fit rounded-sm"
                    />
                </div>
            </div>
        </div>
    )
}