import { inpersonFormUserData } from "@/Types/inpersonFormDataType";
import Button from "../common/Button"
import { useCallback, useEffect, useState } from "react";
import { CustomCheckBox } from "../common/CustomCheckbox";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"
import { ThemeJourneyType } from "@/Types/ThemeJourneyType";
import toast from "react-hot-toast";







interface StepFourProps {
    formValues: inpersonFormUserData;
    setFormValues: React.Dispatch<React.SetStateAction<inpersonFormUserData>>;
    packageDetails: ThemeJourneyType | null;
    setStepThree: () => void;
    onSuccessfulPayment: () => Promise<boolean>;
}

export default function StepFour({ formValues, setFormValues, packageDetails, setStepThree, onSuccessfulPayment }: StepFourProps) {
    const flutterwavePublicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_API_KEY;
    const [isProcessing, setIsProcessing] = useState(false)




    if (!flutterwavePublicKey) {
        console.error("NEXT_PUBLIC_FLUTTERWAVE_API_KEY is not defined")
    }



    const convertedPrice = formValues.price ? formValues.price  : 0


    const config = {
        public_key: flutterwavePublicKey || "",
        tx_ref: `tx-${Date.now()}`,
        amount: convertedPrice,
        currency: "USD",
        payment_options: "card,mobilemoney,ussd",
        customer: {
            email: formValues.emailAddress,
            phone_number: "",
            name: formValues.fullName,
        },
        customizations: {
            title: `THEME: ${packageDetails?.title} `,
            description: packageDetails?.description ?? "",
            logo: "https://res.cloudinary.com/dwedz2laa/image/upload/v1752824400/logo_ajy1ca.png",
        },
    }


    const handleFlutterPayment = useFlutterwave(config)

    const handleFiatPayment = useCallback(() => {
        if (!flutterwavePublicKey) {
            console.error("Cannot process payment: Flutterwave API key not configured")
            return
        }

        setIsProcessing(true)
    }, [flutterwavePublicKey])



    useEffect(() => {
        if (isProcessing) {
            handleFlutterPayment({
                callback: async (response) => {
                    setIsProcessing(false)
                    closePaymentModal()

                    //  Verify status
                    if (response.status === "completed") {
                        console.log("Payment success:", response)

                        //  Submit form to Firestore
                        await onSuccessfulPayment()

                        // Optional: Redirect user to success page
                        // router.push("/success")
                    } else {
                        console.log("Payment failed:", response)
                    }
                },

                onClose: () => {
                    setIsProcessing(false)
                }
            })
        }
    }, [isProcessing, handleFlutterPayment])





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
        if (!formValues.paymentType) {
            toast.error("All required fields must be completed!")
            return;
        }
        handleFiatPayment()
    }

    return (
        <div className=" bg-[#FDF4F1] h-fit w-full max-w-2xl  flex items-center justify-center py-6 px-4 md:px-6 flex-col gap-7 rounded-md  " >
            Payment

            <div className="w-full flex flex-col items-start gap-5 " >
                <h1 className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" >Select Payment Type:</h1>


                <div className="flex flex-col  gap-4 justify-items-stretch  "  >
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
                    onClick={() => setStepThree()}
                />


                <Button
                    label="Submit"
                    type="button"
                    onClick={handleNext}
                    ariaLabel="Submit"
                    variant="ghost"
                    className="!bg-[#EF8F57] w-fit rounded-sm"
                />
            </div>
        </div>
    )
}