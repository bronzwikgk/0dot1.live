import { CartService } from '../services/CartService.js';
import { UIService } from '../services/CartUIService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const addToCartBtn = document.getElementById('addToCartBtn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('productId');

            if (!productId) {
                console.error('Product ID not found in the URL.');
                return;
            }

            try {
                const cartId = localStorage.getItem('cartId') || await CartService.createCart();
                await CartService.addCartItem(cartId, productId, 1);
                alert('Item added to cart successfully!');
            } catch (error) {
                console.error('Error adding item to cart:', error);
                alert('Failed to add item to cart.');
            }
        });
    }

    // const cartId = localStorage.getItem('cartId');

    try {
        const cartItems = await CartService.getCartItems();
        console.log(cartItems);
        UIService.registerHandlebarsHelpers();
        await UIService.renderCartTemplate(cartItems.items);
    } catch (error) {
        console.error('Error fetching or rendering cart items:', error);
    }

    // Add event listeners to the remove buttons
    document.querySelectorAll(".remove-item-btn").forEach(button => {
        button.addEventListener("click", async (event) => {
            const productId = event.target.getAttribute("data-id");
            const optionTitle = event.target.getAttribute("data-type");  // this is now the optionTitle
            const userId = localStorage.getItem("userId");

            try {
                await CartService.removeCartItem(userId, productId, optionTitle);
                alert("Item removed successfully!");

                // Re-fetch and render the updated cart
                const updatedCart = await CartService.getCartItems();
                console.log(updatedCart);
                
                window.location.reload()
            } catch (error) {
                console.error("Error removing item from cart:", error);
                alert("Failed to remove item.");
            }
        });
    });



});


