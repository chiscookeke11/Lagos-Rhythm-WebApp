// components/PaymentModal.tsx
"use client"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: () => void
}

export default function PaymentModal({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const handlePayment = async () => {
    try {
      // Here you integrate your payment API (e.g., Paystack/Stripe/NowPayments)
      // Simulating payment delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate payment success
      onPaymentSuccess()
      onClose()
    } catch (error) {
      console.error(error)
      onClose()
    }
  }

  const flutterwavePublicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_API_KEY

  if (!flutterwavePublicKey) {
    console.error("NEXT_PUBLIC_FLUTTERWAVE_API_KEY is not defined")
  }

  const config = {
    public_key: flutterwavePublicKey || "", // Provide fallback empty string to satisfy TypeScript
    tx_ref: Date.now().toLocaleString(),
    amount: 800,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "chiscookeke11@gmail.com",
      phone_number: "09036531295",
      name: "Okeke Chinedu Emmanuel",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md flex flex-col items-start gap-1">
        <Button
          type="button"
          onClick={onClose}
          variant="destructive"
          size="icon"
          className="ml-auto"
          aria-label="Close modal"
        >
          <X />
        </Button>
        <h2 className="text-lg font-bold">Complete Your Payment</h2>
        <p className="mb-4">Please proceed to payment to confirm your booking.</p>
        <div className="flex gap-3 w-full items-center justify-center">
          <Button
            type="button"
            onClick={handlePayment}
            className="bg-[#EF8F57] hover:bg-[#EF8F57]/90 w-full"
            aria-label="Pay with Crypto"
          >
            Pay with Crypto
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (!flutterwavePublicKey) {
                console.error("Cannot process payment: Flutterwave API key not configured")
                return
              }
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response)
                  closePaymentModal()
                },
                onClose: () => {},
              })
            }}
            className="bg-[#EF8F57] hover:bg-[#EF8F57]/90 w-full"
            aria-label="Pay with Fiat"
          >
            Pay with Fiat
          </Button>
        </div>
      </div>
    </div>
  )
}
