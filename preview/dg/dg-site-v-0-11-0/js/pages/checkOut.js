// Import necessary services
import { CartService } from "../services/CartService.js";
import { HttpService } from "../services/HttpService.js";


// Create an instance of HttpService
const httpService = new HttpService('https://unbelong.in');


// Utility function to strip non-numeric characters from prices
function parsePrice(price) {
    return parseFloat(price.replace(/[^\d.-]/g, ''));  // Remove any currency symbol and commas
}

// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch and render cart items when the page loads
        const cartData = await CartService.getCartItems();
        console.log(cartData);

        renderCartItems(cartData);
        calculateTotals(cartData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        alert('Failed to load cart data. Please try again later.');
    }

    // Handle the "Place Your Order" button click event
    document.getElementById("place-order").addEventListener("click", initiatePayment);
});

// Render cart items dynamically using Handlebars.js
function renderCartItems(cartData) {
    const templateSource = document.getElementById("cart-items-template").innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template({ cartItems: cartData.items });
    document.getElementById("product-list").innerHTML = html;
}

// Calculate and update subtotal, shipping, tax, and total amounts
function calculateTotals(cartData) {
    let subtotal = cartData.items.reduce((acc, item) => acc + item.totalPrice, 0);
    let shipping = 50; // Flat shipping rate
    let tax = subtotal * 0.05; // 5% tax
    let total = subtotal + shipping + tax;

    document.getElementById("subtotal").textContent = `₹${subtotal}`;
    document.getElementById("tax").textContent = `₹${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `₹${total.toFixed(2)}`;
}

// On Checkout Page
async function initiatePayment() {
    console.log("Initiating payment...");

    try {
        const email = document.getElementById("email").value; // Get email from input field
        const cartData = await CartService.getCartItems(); // Get items from the cart
        const totalAmount = document.getElementById("total").textContent.replace(/[^\d.-]/g, ''); // Calculate total amount from cart
        const items = cartData.items.map(item => ({
            product_id: item.product_id,
            optionTitle: item.optionTitle,
            quantity: item.quantity,
            region_price: parseFloat(item.region_price.replace(/[^\d.-]/g, '')),
            totalPrice: parseFloat(item.region_price.replace(/[^\d.-]/g, '')) * item.quantity // Calculate totalPrice for each item
        }));

        // Send the items with the totalPrice to the backend
        const orderResponse = await httpService.post('/api/payment/order', {
            amount: parseFloat(totalAmount),  // Amount in rupees
            userId: localStorage.getItem("userId"), // Fetch the userId from local storage
            items: items // Pass the items with totalPrice to the backend
        });

        if (orderResponse && orderResponse.data) {
            // Step 2: Initialize Razorpay instance with the order details from backend
            const options = {
                key: orderResponse.data.key_id, // Razorpay Key ID
                amount: orderResponse.data.amount, // Amount in paise
                currency: 'INR',
                name: 'Ducisgroup',
                description: 'Payment for your order',
                order_id: orderResponse.data.id, // Razorpay order ID
                handler: async function (razorpayResponse) {
                    alert('Payment successful!');

                    // After successful payment, verify the payment on the backend
                    const paymentVerificationResponse = await httpService.post('/api/payment/verify', {
                        razorpay_order_id: razorpayResponse.razorpay_order_id,
                        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                        razorpay_signature: razorpayResponse.razorpay_signature,
                        userId: localStorage.getItem("userId"), // Pass the userId for verification
                        orderId: orderResponse.orderId, // Pass the order ID from backend
                    });

                    if (paymentVerificationResponse && paymentVerificationResponse.success) {
                        const orderId = paymentVerificationResponse.order._id; // Assuming the response includes the order object
                        alert('Order placed successfully!');
                        window.location.href = `./orderPlaced.html?orderId=${paymentVerificationResponse.order._id}`; // Redirect with orderId in query string
                    } else {
                        alert('Failed to place order. Please contact support.');
                    }

                },
                prefill: {
                    name: document.getElementById("fullName").value,
                    email: email, // Use the captured email
                    contact: "7281972289" // Capture contact number if necessary
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
