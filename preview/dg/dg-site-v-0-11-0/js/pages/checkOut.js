// Import necessary services
import { CartService } from "../services/CartService.js";
import { HttpService } from "../services/HttpService.js";

// Create an instance of HttpService
const httpService = new HttpService('https://68.183.94.77');

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
        const totalAmount = 100
        const email = document.getElementById("email").value; // Get email from input field
        const items = []; // Prepare the items array from the cart data

        // Ensure items are gathered from cartData or state
        const response = await httpService.post('/api/payment/createOrder', { 
            amount: totalAmount, 
            email: email, 
            items: items // Pass the items to the backend
        });

        if (response && response.success) {
            // Initialize Razorpay instance inside the function
            const options = {
                key: response.key_id, // Razorpay Key ID
                amount: response.amount * 100, // Amount in paise
                currency: 'INR',
                name: 'Your App Name',
                description: 'Payment for your order',
                order_id: response.orderId,
                handler: function (response) {
                    alert('Payment successful!');
                    // Optional: Save the payment response to your backend if needed

                    window.location.href = 'orderPlaced.html'; 
                },
                prefill: {
                    name: document.getElementById("fullName").value,
                    email: email, // Use the captured email
                    contact: "7281972289" // You can also change this to capture from another input if necessary
                },
                theme: {
                    color: '#F37254'
                }
            };

            const razorpay = new Razorpay(options); // Make sure Razorpay is available here
            razorpay.open();
        } else {
            alert('Failed to create order. Please try again.');
        }
    } catch (error) {
        console.error('Error initiating payment:', error);
        alert('Error initiating payment. Please try again.');
    }
}
