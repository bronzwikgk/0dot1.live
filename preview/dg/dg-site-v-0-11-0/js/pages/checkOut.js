import { HttpService } from "../Utils/HttpHelper.js";
// Create an instance of HttpService and pass it to AuthService
const httpService = new HttpService('http://localhost:4000');

// On Checkout Page
async function initiatePayment() {
    console.log("Initiating payment...");

    try {
        const email = document.getElementById("email").value; // Get email from input field
        const cartData = await CartService.getCartItems(); // Get items from the cart
        const totalAmount = cartData.items.reduce((acc, item) => acc + item.totalPrice, 0); // Calculate total amount from cart
        const items = cartData.items.map(item => ({
            product_id: item.product_id,
            optionTitle: item.optionTitle,
            quantity: item.quantity,
            region_price: item.region_price
        }));

        // Initiate payment by calling the backend's createPayment endpoint
        const response = await httpService.post('/api/payment/createPayment', {
            amount: totalAmount,
            email: email,
            items: items // Pass the items to the backend
        });

        if (response && response.success) {
            // Initialize Razorpay instance with the response from backend
            const options = {
                key: response.key_id, // Razorpay Key ID
                amount: response.amount * 100, // Amount in paise
                currency: 'INR',
                name: 'Your App Name',
                description: 'Payment for your order',
                order_id: response.orderId,
                handler: async function (razorpayResponse) {
                    alert('Payment successful!');

                    // After successful payment, send the payment details to the backend
                    const paymentData = {
                        razorpayOrderId: razorpayResponse.razorpay_order_id,
                        razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                        razorpaySignature: razorpayResponse.razorpay_signature,
                        email: email
                    };

                    // Complete the payment and create the order
                    const orderResponse = await httpService.post('/api/payment/completePayment', paymentData);

                    if (orderResponse && orderResponse.success) {

                        alert('Payment successful! Your order has been placed.');
                        window.location.href = './orderPlaced.html'// Redirect to order confirmation page
                    } else {
                        alert('Failed to create order. Please contact support.');
                    }
                },
                prefill: {
                    name: document.getElementById("fullName").value,
                    email: email, // Use the captured email
                    contact: "7281972289" // Capture contact number from input if necessary
                },
                theme: {
                    color: '#F37254'
                }
            };

            const razorpay = new Razorpay(options); // Create a Razorpay instance
            razorpay.open(); // Open the Razorpay payment interface
        } else {
            alert('Failed to initiate payment. Please try again.');
        }
    } catch (error) {
        console.error('Error initiating payment:', error);
        alert('Error initiating payment. Please try again.');
    }
}
