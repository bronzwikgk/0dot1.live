import { HttpService } from "../services/HttpService.js";
const httpService = new HttpService('http://localhost:3000');
async function verifyPayment() {
  console.log("Verify Pyament run");

  try {

    // Get the current URL
    const url = new URL(window.location.href);

    // Extract query parameters using URLSearchParams
    const params = new URLSearchParams(url.search);

    // Get the paymentId and amount from the URL
    const paymentId = params.get('paymentId');
    const amount = params.get('amount');
    // Retrieve userId from localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error('User ID is not available.');
    }

    // Extract paymentId from paymentResponse
    if (!paymentId) {
      throw new Error('Payment ID is missing.');
    }

    // Use HttpService to verify payment
    const response = await httpService.post('/api/checkout/payment/success', {
      razorpayOrderId: paymentId,
      userId: userId
    });

    if (response && response.message) {
      alert('Payment successful! Your order has been placed.');
      window.location.href = './orderPlaced.html'; // Redirect to order confirmation page
    } else {
      throw new Error('Payment verification failed.');
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    alert('Payment failed. Please try again.');
  }
}

document.getElementById("confirmPayment").addEventListener("click", verifyPayment)

