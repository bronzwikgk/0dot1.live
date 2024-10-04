// Import necessary services
import { CartService } from "../services/CartService.js";
import { HttpService } from "../services/HttpService.js";

// Create an instance of HttpService


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
    // document.getElementById("place-order").addEventListener("click", async () => {
    //     try {
    //         const shippingInfo = getShippingInfo();
    //         const totalAmount = document.getElementById("total").textContent.replace('₹', '');

    //         const response = await CartService.placeOrder(shippingInfo, totalAmount);

    //         if (response.success) {
    //             alert("Order placed successfully!");
    //             window.location.href = `/order/${response.orderId}`;
    //         } else {
    //             alert('Error placing order. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Error placing order:', error);
    //         alert('Failed to place the order.');
    //     }
    // });
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

const httpService = new HttpService('http://localhost:3007');

// On Checkout Page
async function initiatePayment() {
    console.log("Initiating payment...");

    try {
        const totalAmount = document.getElementById("total").textContent.replace('₹', '');
        const response = await httpService.post('/api/payment/createOrder', { amount: 100 });

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
                    email: "customer@example.com",
                    contact: "7281972289"
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

document.getElementById("place-order").addEventListener("click", initiatePayment);
