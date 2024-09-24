import { CartService } from '../services/CartService.js';
import { ProductService } from '../services/ProductService.js';

// Add event listener to the "Add To Cart" button
document.querySelector('#add_to_cart_btn').addEventListener('click', async () => {
    CartService.addItemToCart()
});

