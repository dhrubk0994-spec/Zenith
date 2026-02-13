
import { CartItem } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

/**
 * PRODUCTION FLOW:
 * 1. Call our backend to create a Razorpay Order
 * 2. Use the returned order_id to open the checkout
 */
export const initiatePayment = async (
  totalAmount: number, 
  items: CartItem[], 
  onSuccess: (response: any) => void
) => {
  try {
    // Step 1: Request Order ID from our secure backend
    const serverResponse = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount, items })
    });
    
    const orderData = await serverResponse.json();

    if (!orderData.id) throw new Error("Failed to create order");

    // Step 2: Open Razorpay Modal
    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Public Key
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Zenith Atelier",
      description: "Peak of Elegance Purchase",
      order_id: orderData.id, // Use the real ID from server
      handler: function (response: any) {
        // response.razorpay_payment_id
        // response.razorpay_order_id
        // response.razorpay_signature
        onSuccess(response);
      },
      prefill: {
        name: "Zenith Client",
        email: "client@zenith.luxury"
      },
      theme: {
        color: "#D4AF37"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment Initialization Error:", error);
    alert("The payment gateway is temporarily unavailable. Please try again later.");
  }
};
