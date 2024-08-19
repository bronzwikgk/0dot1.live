let netTotal
// Get Cart Items
async function getCartItems(cartId) {
    const response = await fetch(`http://localhost:3000/cart/items/${cartId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch cart items');
    }

    return await response.json();
}

async function placeOrder(userId, paymentMethod, amount) {
    try {
        const response = await fetch('http://localhost:3000/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                paymentMethod: paymentMethod,
                amount: amount
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Order creation failed:', errorData.error);
            // Handle the error appropriately in your UI
            return;
        }

        const data = await response.json();
        console.log('Order placed successfully:', data);
        alert("Order Placed Succesfull")
        // Use the data (payment, order, transaction) as needed
        // For example, redirect the user, display a confirmation, etc.
        // Example:
        window.location.href = `./offering.html`;

    } catch (error) {
        console.error('Error placing order:', error);
        // Handle the error appropriately in your UI
    }
}

document.getElementById('placeOrderButton').addEventListener('click', async function () {
    const userId = localStorage.getItem("userId"); // Replace with actual user ID
    const paymentMethod = 'credit_card'; // Replace with the actual payment method selected by the user
    const amount = netTotal; // Replace with the actual total amount

    try {
        await placeOrder(userId, paymentMethod, amount);
        goToSection('complete', 4); // Assuming this navigates to the order completion section
    } catch (error) {
        console.error('Failed to place order:', error);
        // Optionally, display an error message to the user
    }
});

// Register Handlebars helper for total calculation
Handlebars.registerHelper('calculateTotal', function (price, quantity) {
    // Remove currency symbols and parse numbers
    const priceValue = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    return (priceValue * quantity).toFixed(2);
});

async function fetchAndRenderOrderSummary() {
    const cartId = localStorage.getItem("cartId"); // Replace with the actual cart ID you want to fetch

    try {
        // Fetch cart items
        const cartItems = await getCartItems(cartId);

        // Define totals
        const subtotal = cartItems.reduce((total, item) => {
            const priceValue = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            return total + (priceValue * item.CartItem.quantity);
        }, 0).toFixed(2);

        const shipping = 5.00; // Example static value
        const tax = (0.05 * subtotal).toFixed(2);
        const totalAmount = (parseFloat(subtotal) + shipping + parseFloat(tax)).toFixed(2);
        netTotal = totalAmount
        // Compile Handlebars template
        const template = Handlebars.compile(document.getElementById('order-summary-template').innerHTML);

        // Render HTML
        const html = template({
            items: cartItems.map(item => ({
                image: item.image || 'https://via.placeholder.com/100', // Default image if not provided
                product: item.product,
                quantity: item.CartItem.quantity,
                price: item.price
            })),
            tax: `Included (${tax})`,
            totalAmount
        });

        // Insert rendered HTML into the appropriate container
        document.getElementById('order-summary-container').innerHTML = html;
        document.getElementById('order-summary-container2').innerHTML = html;

        // Handle additional interactions, like removing items, if needed

    } catch (error) {
        console.error('Error fetching or rendering order summary:', error);
    }
}

// Call the function to fetch data and render the order summary
fetchAndRenderOrderSummary();
