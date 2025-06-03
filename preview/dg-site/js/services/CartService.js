import { HttpService } from "./HttpService.js";
import { getSessionIdentifier } from "../Utils/session.js";
import BASE_URL from '../config.js';
const httpService = new HttpService(BASE_URL);
import loader from '../Utils/Loader.js';

export class CartService {
    // Get all items from a user's cart (using user ID)
    static async getCartItems() {
        const { type, value } = getSessionIdentifier();

        const url = `/api/cart/${type}/${value}`;

        try {
            const response = await httpService.get(url);

            if (!response) {
                throw new Error('Failed to fetch cart items.');
            }

            console.log('Cart items:', response); // Optional log
            return response;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            showMessage('Error fetching cart items.', 'tomato');
            throw error;
        }
    }
    // Send cart data to the backend using httpService
    static async sendCartData(cartData) {
        try {
            const response = await httpService.post('/api/cart', cartData);

            if (!response) {
                throw new Error('Failed to add item to cart.');
            }

            showMessage('Item added to cart successfully!', 'lightgreen');
        } catch (error) {
            console.error(error);
            showMessage('Error adding item to cart.', 'tomato');
        }
    }

    // ek
    static async addItemToCart() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('productId');
        const selectedOptions = [];

        document.querySelectorAll('#product-list-body tr').forEach((row) => {
            const optionTitle = row.querySelector('td:nth-child(2)').textContent;
            const quantity = row.querySelector('input.qty-input').value;
            const checkbox = document.querySelector(`input[name="product"][value="${optionTitle}"]`);
            if (checkbox && checkbox.checked) {
                selectedOptions.push({
                    optionTitle: optionTitle,
                    quantity: parseInt(quantity, 10),
                    region_price: localStorage.getItem("user_region")
                });
            }
        });

        if (selectedOptions.length === 0) {
            showMessage('Please select at least one product option.', 'tomato');
            return;
        }

        const { type, value } = getSessionIdentifier();

        // Add to local storage if guest
        if (type === 'guestId') {
            selectedOptions.forEach(option => {
                CartService.addToLocalStorage(productId, option.optionTitle, null, option.quantity);
            });
        }

        const cartData = {
            [type]: value,
            items: selectedOptions.map(option => ({
                product_id: productId,
                optionTitle: option.optionTitle,
                quantity: option.quantity
            }))
        };

        try {
            loader.show();
            const response = await httpService.post('/api/cart', cartData);
            if (!response) throw new Error('Failed to add items to cart.');
            showMessage('Items added to cart successfully!', 'lightgreen');
            this.clearCartTable();
            loader.hide();
        } catch (error) {
            loader.hide();
            console.error(error);
            showMessage('Error adding items to cart.', 'tomato');
        }
    }

    // ek
    static async addItemToCartFromCard(event) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('productId');
        const button = event.target;
        const cardBody = button.closest('.card-body');

        const optionTitle = cardBody.querySelector('.card-title').textContent.trim();
        const optionSubtitle = cardBody.querySelector('.card-subtitle')?.textContent.trim();

        const { type, value } = getSessionIdentifier();

        if (type === 'guestId') {
            CartService.addToLocalStorage(productId, optionTitle, optionSubtitle, 1);
        }

        const cartData = {
            [type]: value,
            items: [
                {
                    product_id: productId,
                    optionTitle: optionTitle,
                    quantity: 1
                }
            ]
        };

        try {
            loader.show();
            const response = await httpService.post('/api/cart', cartData);
            if (!response) throw new Error('Failed to add item to cart.');
            loader.hide();
            showMessage('Item added to cart successfully!', 'lightgreen');
        } catch (error) {
            loader.hide();
            console.error('Error adding item to cart from card:', error);
            showMessage('Error adding item to cart.', 'tomato');
        }
    }

    // ek
    static addToLocalStorage(productId, optionTitle, optionSubtitle, quantity = 1) {
        const localCart = JSON.parse(localStorage.getItem('localCart')) || [];

        localCart.push({
            productId,
            optionTitle,
            subtitle: optionSubtitle,
            quantity,
            region_price: localStorage.getItem("user_region")
        });

        localStorage.setItem('localCart', JSON.stringify(localCart));
    }


    // Push local cart items to database after login
    // ek
    static async pushLocalCartToDatabase(userId) {
        const localCart = JSON.parse(localStorage.getItem('localCart')) || [];
        if (localCart.length === 0) return;

        const cartData = {
            userId,
            items: localCart.map(item => ({
                product_id: item.productId,
                optionTitle: item.optionTitle,
                quantity: item.quantity || 1,
                region_price: item.region_price || localStorage.getItem("user_region")
            }))
        };

        try {
            const response = await httpService.post('/api/cart', cartData);
            if (!response) {
                throw new Error('Failed to update cart with local items.');
            }
            showMessage('Local cart items added to database successfully!', 'lightgreen');
            localStorage.removeItem('localCart');
        } catch (error) {
            console.error(error);
            showMessage('Error adding local cart items to database.', 'tomato');
        }
    }

    static async removeCartItem(productId, optionTitle) {
        const { type, value } = getSessionIdentifier();
        const url = `/api/cart/${type}/${value}/item/${productId}/${optionTitle}`;

        try {
            const response = await httpService.delete(url);

            // Also remove from localStorage if guest
            if (type === 'guestId') {
                const localCart = JSON.parse(localStorage.getItem('localCart')) || [];
                const updatedCart = localCart.filter(
                    item => item.productId !== productId || item.optionTitle !== optionTitle
                );
                localStorage.setItem('localCart', JSON.stringify(updatedCart));
            }

            showMessage('Item removed from cart successfully!', 'lightgreen');
            return response;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            showMessage('Error removing item from cart.', 'tomato');
            throw error;
        }
    }

    // Decrease the quantity of an item in the cart
    // ek
    static async decreaseCartItem(productId, optionTitle) {
        const { type, value } = getSessionIdentifier();

        const url = `/api/cart/decrease`;
        const data = {
            [type]: value,
            productId,
            optionTitle
        };

        try {
            const response = await httpService.post(url, data);

            // Also update localStorage if guest
            if (type === 'guestId') {
                let localCart = JSON.parse(localStorage.getItem('localCart')) || [];
                localCart = localCart.map(item => {
                    if (item.productId === productId && item.optionTitle === optionTitle) {
                        item.quantity = Math.max((item.quantity || 1) - 1, 1); // Prevent going below 1
                    }
                    return item;
                });
                localStorage.setItem('localCart', JSON.stringify(localCart));
            }

            showMessage('Item quantity decreased successfully!', 'lightgreen');
            return response;
        } catch (error) {
            console.error('Error decreasing item quantity in cart:', error);
            showMessage('Error decreasing item quantity in cart.', 'tomato');
            throw error;
        }
    }


    // Create a new cart for a user
    static async createCart() {
        const { type, value } = getSessionIdentifier();

        const url = `/api/cart/create`;
        const data = {
            [type]: value
        };

        try {
            const response = await httpService.post(url, data);

            if (!response || !response.cartId) {
                throw new Error('Cart creation failed or cartId missing.');
            }

            // Store returned cart ID in localStorage for reuse
            localStorage.setItem('cartId', response.cartId);
            showMessage('Cart created successfully!', 'lightgreen');
            return response.cartId;
        } catch (error) {
            console.error('Error creating a new cart:', error);
            showMessage('Error creating cart.', 'tomato');
            throw error;
        }
    }

    // Clear the cart table in the UI
    static clearCartTable() {
        const tableBody = document.querySelector('#product-list-body');
        tableBody.innerHTML = ''; // Clear all rows in the table
    }

    static async increaseCartItem(productId, optionTitle) {
        const { type, value } = getSessionIdentifier();

        const url = `/api/cart/${type}/${value}/item/${productId}/${optionTitle}/increase`;

        try {
            const response = await httpService.post(url, {});
            if (!response) {
                throw new Error('Failed to increase item quantity.');
            }

            // Update localCart if guest
            if (type === 'guestId') {
                let localCart = JSON.parse(localStorage.getItem('localCart')) || [];
                localCart = localCart.map(item => {
                    if (item.productId === productId && item.optionTitle === optionTitle) {
                        item.quantity = (item.quantity || 1) + 1;
                    }
                    return item;
                });
                localStorage.setItem('localCart', JSON.stringify(localCart));
            }

            return response;
        } catch (error) {
            console.error('Error increasing item quantity:', error);
            throw error;
        }
    }

    // Decrease the quantity of an item in the cart
    // ek
    static async decreaseCartItem(productId, optionTitle) {
        const { type, value } = getSessionIdentifier();

        const url = `/api/cart/${type}/${value}/item/${productId}/${optionTitle}/decrease`;

        try {
            const response = await httpService.post(url, {});
            if (!response) {
                throw new Error('Failed to decrease item quantity.');
            }

            // Update localCart if guest
            if (type === 'guestId') {
                let localCart = JSON.parse(localStorage.getItem('localCart')) || [];
                localCart = localCart.map(item => {
                    if (item.productId === productId && item.optionTitle === optionTitle) {
                        item.quantity = Math.max((item.quantity || 1) - 1, 1); // Don't go below 1
                    }
                    return item;
                });
                localStorage.setItem('localCart', JSON.stringify(localCart));
            }

            return response;
        } catch (error) {
            console.error('Error decreasing item quantity:', error);
            throw error;
        }
    }


    // Fetch checkout details for the cart
    static async getCheckoutDetails() {
        const { type, value } = getSessionIdentifier();

        const url = `/api/cart/checkout/${type}/${value}`;

        try {
            loader.show(); // Show loader while fetching data
            const response = await httpService.get(url);

            if (!response) {
                throw new Error('Failed to fetch checkout details.');
            }

            console.log('Checkout details:', response);
            loader.hide();
            return response;
        } catch (error) {
            loader.hide();
            console.error('Error fetching checkout details:', error);
            showMessage('Error fetching checkout details. Please try again later.', 'tomato');
            throw error;
        }
    }

}


// Function to create and display messages dynamically
function showMessage(message, color) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '10%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.backgroundColor = color;
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '15px 40px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000';
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 2000);
}

//   showMessage('', 'lightgreen');
//   showMessage('', 'tomato');