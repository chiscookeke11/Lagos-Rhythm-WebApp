import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useAppContext } from "@/app/context/AppContext";
import React from "react";
import { useSendTransaction, useWaitForTransactionReceipt, type BaseError } from 'wagmi'
import { parseEther } from 'viem'
import { useWriteContracts } from 'wagmi/experimental'
import { parseAbi } from 'viem'




interface CryptoPaymentModalProps {
  isOpen: boolean
  onClose: () => void
}




export default function CryptoPaymentModal({ isOpen, onClose }: CryptoPaymentModalProps) {
  const { price, userData } = useAppContext()
  const country = userData?.country
  const { data: hash, sendTransaction, isPending, error } = useSendTransaction()
  const to = "0x532C8a7EC241b2dE3ECcA942aF9706A891BfB846"
  const value = price < 1 ? "-" : price



  // async function submit(e: React.FormEvent<HTMLFormElement>) {
  //     e.preventDefault()
  //     const to = "0x532C8a7EC241b2dE3ECcA942aF9706A891BfB846"
  //     const value = "0.05"
  //     sendTransaction({ to, value: parseEther(value) })
  // }


  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //     useWaitForTransactionReceipt({
  //         hash,
  //     })


  const abi = parseAbi([
    'function approve(address, uint256) returns (bool)',
    'function transferFrom(address, address, uint256) returns (bool)',
  ])



  const { writeContracts } = useWriteContracts()


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



        <h3 className="text-xs mb-1 text-[#EF8F57] font-bold font-merriweather">Address: {to} </h3>
        <h3 className="text-xs mb-1 text-[#EF8F57] font-bold font-merriweather">PRICE: {value}  USDT</h3>
        <h3 className="text-xs mb-1 text-[#EF8F57] font-bold font-merriweather">Your Address: 9849rekjerijer3049493</h3>


        {/* <Button
                    disabled={isPending}
                    type="submit"
                    className="cursor-pointer w-full mx-auto bg-white text-[#EF8F57] border border-[#EF8F57] hover:bg-[#EF8F57] hover:text-white flex-1"
                >
                    {isPending ? 'Confirming...' : 'Send'}
                </Button>

                {hash && <div>Transaction Hash: {hash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>} */}
        {/* {isConfirmed && <div>Transaction confirmed.</div>}/ */}


        {/* {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )} */}





        <button
          type="button"
          onClick={() =>
            writeContracts({
              contracts: [
                {
                  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
                  abi,
                  functionName: 'approve',
                  args: [
                    '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                    BigInt(100)
                  ],
                },
                {
                  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
                  abi,
                  functionName: 'transferFrom',
                  args: [
                    '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                    '0x0000000000000000000000000000000000000000',
                    BigInt(100)
                  ],
                },
              ],
            })
          }
        >
          Send calls
        </button>
      </form>

    </div>
  )
}