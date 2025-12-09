import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import Input from "../common/Input";
import Button from "../common/Button";
import { SetStateAction } from "react";
import { CustomSelect } from "../common/CustomSelect";
import { howDidYouHear } from "@/data/data";
import { Textarea } from "../ui/textarea";



interface StepTwoProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>
    setStepTwoPositionX: React.Dispatch<SetStateAction<string>>
    stepThreePositionX: string;
    setStepThreePositionX: React.Dispatch<SetStateAction<string>>
}


export const StepThree = ({ formValues, setFormValues, setStepTwoPositionX, stepThreePositionX, setStepThreePositionX }: StepTwoProps) => {



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


    return (
        <div className={`  flex items-center justify-center  h-full w-full px-4 z-30 absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%] transition-all duration-400 ease-in-out  ${stepThreePositionX} `} >
            <div className=" bg-[#FDF4F1] h-fit w-full max-w-4xl  flex items-center justify-center py-4 px-3 flex-col gap-4 rounded-md  " >



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
                        onClick={() => {
                            setStepTwoPositionX("translate-x-[-50%]")
                        }}
                    />


                    <Button
                        label="Next"
                        type="button"
                        ariaLabel="next"
                        variant="ghost"
                        className="!bg-[#EF8F57] w-fit rounded-sm"
                        onClick={() => setStepThreePositionX("translate-x-[-500%]")}
                    />
                </div>
            </div>
        </div>
    )
}

