import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Receive the data
    const nowPaymentsData = await req.json();
    console.log('Received NowPayments Webhook:', nowPaymentsData);

    // --- 2. Verify the data (CRUCIAL SECURITY STEP) ---
    // NowPayments recommends using an IPN Secret for robust verification.
    // This example uses a simpler check with the x-api-key header,
    // but for production, you should implement the IPN Secret hashing.
    //
    // How to use IPN Secret:
    // 1. Get your IPN Secret from your NowPayments dashboard.
    // 2. NowPayments sends an 'x-nowpayments-sig' header with a hash.
    // 3. You calculate your own hash using the raw request body and your IPN Secret.
    // 4. Compare your calculated hash with 'x-nowpayments-sig'. If they match, it's verified.
    //
    // For simplicity in this example, we'll check if the x-api-key header matches
    // (NowPayments often sends this for basic verification, but it's less secure than IPN Secret).
    const nowPaymentsApiKey = process.env.NOWPAYMENTS_API_KEY;
    const receivedApiKey = req.headers.get('x-api-key'); // NowPayments might send this header

    if (!nowPaymentsApiKey) {
      console.error('NOWPAYMENTS_API_KEY is not set in environment variables.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    // Basic verification: Check if the received API key matches our stored one.
    // IMPORTANT: For production, use the IPN Secret for cryptographic signature verification!
    if (receivedApiKey !== nowPaymentsApiKey) {
      console.warn('Webhook received with invalid API key:', receivedApiKey);
      return NextResponse.json({ error: 'Unauthorized: Invalid API Key' }, { status: 401 });
    }

    // --- 3. Process the data ---
    const { payment_id, order_id, payment_status,  } = nowPaymentsData;

    console.log(`Processing payment ID: ${payment_id}, Order ID: ${order_id}, Status: ${payment_status}`);

    // Here's where you would update your database based on the payment_status
    switch (payment_status) {
      case 'waiting':
        // Payment initiated, waiting for customer to send funds
        console.log(`Order ${order_id} is waiting for payment.`);
        // You might update your database to mark the order as 'pending'
        break;
      case 'finished':
        // Payment successfully received and confirmed!
        console.log(`SUCCESS! Payment ${payment_id} for order ${order_id} is FINISHED.`);
        // THIS IS WHERE YOU FULFILL THE ORDER (e.g., grant access, send product)
        // Update your database: mark order as 'paid' or 'completed'
        break;
      case 'failed':
        // Payment failed (e.g., not enough funds, expired)
        console.log(`Payment ${payment_id} for order ${order_id} FAILED.`);
        // Update your database: mark order as 'failed'
        break;
      case 'partially_paid':
        // Customer sent less than required
        console.log(`Payment ${payment_id} for order ${order_id} PARTIALLY PAID.`);
        // Handle partial payments (e.g., ask for more, refund, or cancel)
        break;
      case 'refunded':
        // Payment was refunded
        console.log(`Payment ${payment_id} for order ${order_id} REFUNDED.`);
        // Update your database: mark order as 'refunded'
        break;
      // Add other statuses as needed (e.g., 'sending', 'expired', 'overpaid')
      default:
        console.log(`Unhandled payment status: ${payment_status} for payment ${payment_id}`);
    }

    // Always respond with a 200 OK to NowPayments to acknowledge receipt
    return NextResponse.json({ message: 'Webhook received and processed successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error processing NowPayments webhook:', error);
    // Respond with a 500 error if something went wrong on your end
    return NextResponse.json({ error: 'Internal server error processing webhook.' }, { status: 500 });
  }
}
