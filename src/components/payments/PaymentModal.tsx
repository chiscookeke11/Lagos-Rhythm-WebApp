// components/PaymentModal.tsx
"use client"

import React from "react"
import Button from "@/components/common/Button"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: () => void
}

export default function PaymentModal({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  if (!isOpen) return null

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Complete Your Payment</h2>
        <p className="mb-4">Please proceed to payment to confirm your booking.</p>
        <div className="flex gap-3">
          <Button ariaLabel="cancel" type="button" label="Cancel" onClick={onClose} variant="primary" className="!bg-[red]" />
          <Button ariaLabel="Pay now" type="button" label="Pay Now" onClick={handlePayment} variant="primary" className="!bg-[red]"/>
        </div>
      </div>
    </div>
  )
}
