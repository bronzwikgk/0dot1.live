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
        await UIService.renderCartTemplate(cartItems);
    } catch (error) {
        console.error('Error fetching or rendering cart items:', error);
    }
});
