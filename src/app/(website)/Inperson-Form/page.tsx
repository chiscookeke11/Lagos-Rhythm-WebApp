"use client"

import { useAppContext } from "@/app/context/AppContext"
import StepFour from "@/components/inperson_tour_form_steps/StepFour";
import { StepOne } from "@/components/inperson_tour_form_steps/StepOne";
import { StepThree } from "@/components/inperson_tour_form_steps/StepThree";
import { StepTwo } from "@/components/inperson_tour_form_steps/StepTwo";
import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";


export default function Page() {

    const { inpersonTourPackage } = useAppContext()
    const [stepOnePositionX, setStepOnePositionX] = useState("translate-x-[-50%]")
    const [stepTwoPositionX, setStepTwoPositionX] = useState("translate-x-[-50%]")
    const [stepThreePositionX, setStepThreePositionX] = useState("translate-x-[-50%]")
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
        preferredFood: "",
        otherPreferredFood: "",
        reasonForTour: "",
        otherReasonForTour: "",
        fitForTravel: "",
        specialRequest: ""
    })

    console.log("The form values:", formValues)



    return (
        <div className="w-full h-[120vh] text-black flex items-center justify-center bg-cover bg-center bg-no-repeat relative font-merienda " style={{ backgroundImage: "url('/in-person/inperson-form-bg.jpg')" }} >
            <div className="inset-0 bg-black/55 absolute h-full w-full " />



            <div className="  absolute inset-0  w-full h-full  " >


                <form className=" w-full h-full  relative  inset-0  flex items-center justify-center  overflow-hidden    " >


                    <StepOne
                        formValues={formValues}
                        setFormValues={setFormValues}
                        setStepOnePositionX={setStepOnePositionX}
                        stepOnePositionX={stepOnePositionX} />

                    <StepTwo
                        formValues={formValues}
                        setFormValues={setFormValues}
                        setStepOnePositionX={setStepOnePositionX}
                        stepTwoPositionX={stepTwoPositionX}
                        setStepTwoPositionX={setStepTwoPositionX}
                    />


                    <StepThree
                        formValues={formValues}
                        setFormValues={setFormValues}
                        setStepTwoPositionX={setStepTwoPositionX}
                        stepThreePositionX={stepThreePositionX}
                        setStepThreePositionX={setStepThreePositionX}
                    />



                    <StepFour
                        formValues={formValues}
                        setFormValues={setFormValues}
                        setStepThreePositionX={setStepThreePositionX}
                    />







                </form>


            </div>




            {inpersonTourPackage}
        </div>
    )
}