import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useAppContext } from "@/app/context/AppContext";
import React from "react";
import {useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import {tokenAbi} from "@/components/ABI/tokenAbi"





interface CryptoPaymentModalProps {
  isOpen: boolean
  onClose: () => void
}




export default function CryptoPaymentModal({ isOpen, onClose }: CryptoPaymentModalProps) {
  const { price } = useAppContext()
  // const country = userData?.country

  const recipient = "0x532C8a7EC241b2dE3ECcA942aF9706A891BfB846"
  const value = price < 1 ? "-" : price



  const {  writeContract } = useWriteContract()



const handleTransfer = () => {
  writeContract({
    address: tokenAbi.address as `0x${string}`,
    abi: tokenAbi.abi,
    functionName: "transfer",
    args: [recipient, parseEther('1')],
  })
}




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-6">

      <form className="bg-white rounded-lg p-6 w-full max-w-md flex flex-col items-start gap-1 relative">


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



        <h3 className="text-xs mb-1 text-[#EF8F57] font-bold font-merriweather">Address: {recipient} </h3>
        <h3 className="text-xs mb-1 text-[#EF8F57] font-bold font-merriweather">PRICE: {value}  USDT</h3>
        <h3 className="text-xs mb-1 text-[#EF8F57] font-bold font-merriweather">Your Address: 9849rekjerijer3049493</h3>








        <button
        onClick={handleTransfer}
        >
          Send calls
        </button>
      </form>

    </div>
  )
}