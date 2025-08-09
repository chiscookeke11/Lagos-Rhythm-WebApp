"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from 'react-hot-toast';


export default function CreatePaymentButton() {
    const [amount, setAmount] = useState('10.00');
    const [loading, setLoading] = useState(false);


    const handleCreatePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    order_id: `order_${Date.now()}`, // Generate a unique order ID
                    order_description: `Payment for item X`,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast("Payment Creation Failed")
                return;
            }

            // Assuming NowPayments returns a payment_url to redirect the user
            if (data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                toast.success(
                    "Payment Created",);
                console.log("NowPayments Payment Data:", data);
                // You might display a QR code or address here if not redirecting
            }

        } catch (error) {
            console.error('Client-side error creating payment:', error);
            toast("Could not connect to the server to create payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>Initiate a payment using USDT on TRON via NowPayments.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g., 10.00"
                        step="0.01"
                    />
                </div>
                <Button onClick={handleCreatePayment} disabled={loading}>
                    {loading ? 'Processing...' : 'Pay with NowPayments (USDT TRC-20)'}
                </Button>
            </CardContent>
        </Card>
    );
}
