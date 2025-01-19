// cartApi.js

// Delete a Product
async function deleteProduct(productId) {
    const response = await fetch(`https://unbelong.in/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete the product');
    }

    return await response.json();
}

// Get Cart Items
async function getCartItems(cartId) {
    const response = await fetch(`https://unbelong.in/cart/items/${cartId}`, {
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

// Add Cart Item
async function addCartItem(cartId, productId, quantity) {
    const response = await fetch(`https://unbelong.in/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cartId: cartId,
            productId: productId,
            quantity: quantity
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to add item to the cart');
    }

    return await response.json();
}

// Create Cart
// Function to generate a unique session ID
function generateSessionId() {
    return 'session-' + Math.random().toString(36).substr(2, 9);
}

// Create Cart Function
async function createCart() {
    // Check for userId or sessionId in local storage
    let userId = localStorage.getItem('userId');
    let sessionId = localStorage.getItem('sessionId');

    // If userId exists, prefer it over sessionId
    if (userId) {
        sessionId = null;
    } else if (!sessionId) {
        // If neither userId nor sessionId exists, create a new sessionId
        sessionId = generateSessionId();
        localStorage.setItem('sessionId', sessionId);
    }

    // Prepare the body of the request based on available data
    const requestBody = userId
        ? { userId: parseInt(userId) }
        : { sessionId: sessionId };

    const response = await fetch(`https://unbelong.in/cart/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error('Failed to create the cart');
    }

    let data = await response.json();
    localStorage.setItem("cartId", data.id)

}

// Decrease Cart Item Quantity
async function decreaseCartItem(cartId, productId, quantity) {
    const response = await fetch(`https://unbelong.in/cart/decrease`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cartId: cartId,
            productId: productId,
            quantity: quantity
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to decrease item quantity in the cart');
    }

    return await response.json();
}

// Remove Cart Item
async function removeCartItem(cartId, productId) {
    const response = await fetch(`https://unbelong.in/cart/remove`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cartId: cartId,
            productId: productId
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to remove item from the cart');
    }

    return await response.json();
}

// Import Handlebars if needed, for example with ES6 modules:
// import Handlebars from 'handlebars';



// Update Cart Summary
function updateCartSummary(cartItems) {
    const subtotal = cartItems.reduce((total, item) => total + item.total, 0);
    const shipping = 5.00; // Replace with your logic or API call
    const tax = 0.05 * subtotal; // Example tax calculation
    const total = subtotal + shipping + tax;

    document.querySelector('.card-text').textContent = `You have ${cartItems.length} items in your cart.`;
    document.querySelector('.list-unstyled').innerHTML = `
        <li class="d-flex justify-content-between"><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</li>
        <li class="d-flex justify-content-between"><strong>Shipping:</strong> $${shipping.toFixed(2)}</li>
        <li class="d-flex justify-content-between"><strong>Tax:</strong> $${tax.toFixed(2)}</li>
        <li class="d-flex justify-content-between"><strong>Total:</strong> $${total.toFixed(2)}</li>
    `;
}




document.addEventListener('DOMContentLoaded', async () => {
    const addToCartBtn = document.getElementById('addToCartBtn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', async () => {
            // Extract productId from URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('productId');

            // Ensure productId exists before proceeding
            if (!productId) {
                console.error('Product ID not found in the URL.');
                return;
            }

            const cartId = localStorage.getItem('cartId');
            const quantity = 1; // Default quantity for adding to cart

            try {
                if (!cartId) {
                    await createCart();
                }

                const updatedCartId = localStorage.getItem('cartId');
                await addCartItem(updatedCartId, productId, quantity);
                alert('Item added to cart successfully!');
            } catch (error) {
                console.error('Error adding item to cart:', error);
                alert('Failed to add item to cart.');
            }
        });

    }


    const cartId = localStorage.getItem("cartId"); // Replace with the actual cart ID you want to fetch

    // Register Handlebars helper for total calculation
    Handlebars.registerHelper('calculateTotal', function (price, quantity) {
        // Remove currency symbols and parse numbers
        const priceValue = parseFloat(price.replace(/[^0-9.-]+/g, ""));
        return (priceValue * quantity).toFixed(2);
    });


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
        const total = (parseFloat(subtotal) + shipping + parseFloat(tax)).toFixed(2);

        // Compile Handlebars template
        const template = Handlebars.compile(document.getElementById('cart-template').innerHTML);

        // Render HTML
        const html = template({
            cartItems,
            subtotal,
            shipping,
            tax,
            total
        });
        document.body.innerHTML = html; // Replace with appropriate container if not whole page

        // Handle Remove button click
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-id');
                removeCartItem(itemId);
            });
        });

    } catch (error) {
        console.error('Error fetching or rendering cart items:', error);
    }


});

