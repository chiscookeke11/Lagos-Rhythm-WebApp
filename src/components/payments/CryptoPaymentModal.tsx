import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useAppContext } from "@/app/context/AppContext";




interface CryptoPaymentModalProps {
    isOpen: boolean
    onClose: () => void
}


export default function CryptoPaymentModal({ isOpen, onClose }: CryptoPaymentModalProps) {
    const { price, userData } = useAppContext()
    const country = userData?.country






    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-6">

            <div className="bg-white rounded-lg p-6 w-full max-w-md flex flex-col items-start gap-1 relative">


                <Button
                    type="button"
                    onClick={onClose}
                    variant="destructive"
                    size="icon"
                    className="ml-auto cursor-pointer"
                    aria-label="Close modal"
                >
                    <X />
                </Button>
                <h2 className="text-xl font-bold mx-auto font-merriweather">Complete Your Payment</h2>
                <p className="mb-2 mx-auto font-lato">Please proceed to pay with crypto</p>



                <h3 className="text-sm mb-1 text-[#EF8F57] font-bold font-merriweather">Address: 9849rekjerijer3049493</h3>
                <h3 className="text-sm mb-1 text-[#EF8F57] font-bold font-merriweather">PRICE: {price < 1 ? "-" : price} {country === "Nigeria" ? "NGN" : "USD"}</h3>
                <h3 className="text-sm mb-1 text-[#EF8F57] font-bold font-merriweather">Your Address: 9849rekjerijer3049493</h3>


                <Button

                    className="cursor-pointer w-full mx-auto bg-white text-[#EF8F57] border border-[#EF8F57] hover:bg-[#EF8F57] hover:text-white flex-1"
                >
                    Send
                </Button>
            </div>

        </div>
    )
}