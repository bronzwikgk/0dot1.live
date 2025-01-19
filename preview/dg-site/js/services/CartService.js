import { HttpService } from "./HttpService.js";
import BASE_URL from '../config.js';
const httpService = new HttpService(BASE_URL);
import loader from '../Utils/Loader.js';

export class CartService {
    // Get all items from a user's cart (using user ID)
    static async getCartItems() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            showMessage('You are not logged in. Please log in to view your cart.', 'tomato');
            return;
        }

        const url = `/api/cart/${userId}`;
        try {
            const response = await httpService.get(url);
            if (!response) {
                throw new Error('Failed to fetch cart items.');
            }
            console.log('Cart items:', response); // Optionally log the items
            return response; // Return the fetched cart items
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

    // Add a new item to the cart
    static async addItemToCart() {
        
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('productId');
        const selectedOptions = [];

        // Loop through each row in the product table
        document.querySelectorAll('#product-list-body tr').forEach((row) => {
            const optionTitle = row.querySelector('td:nth-child(2)').textContent; // Get product type (e.g., "Book")
            const quantity = row.querySelector('input.qty-input').value; // Get quantity
            const region_price = row.querySelector('td:nth-child(4)').textContent; // Get price

            // Check if the product type checkbox is checked
            const checkbox = document.querySelector(`input[name="product"][value="${optionTitle}"]`);
            if (checkbox && checkbox.checked) {
                selectedOptions.push({
                    optionTitle: optionTitle,
                    quantity: parseInt(quantity, 10),
                     region_price:localStorage.getItem("user_region")
                });
            }
        });

        if (selectedOptions.length === 0) {
            showMessage('Please select at least one product option.', 'tomato');
            return;
        }

        const userId = localStorage.getItem("userId");

        if (!userId) {
            // Store cart items in local storage if user is not logged in
            const localCart = JSON.parse(localStorage.getItem('localCart')) || [];
            selectedOptions.forEach(option => {
                localCart.push({
                    productId,
                    optionTitle: option.optionTitle,
                    quantity: option.quantity,
                    region_price: localStorage.getItem("user_region")
                });
            });
            localStorage.setItem('localCart', JSON.stringify(localCart));
            showMessage('Items added to local storage cart. Please log in to save them to your cart.', 'lightgreen');
            return;
        }

        // Create the data to send to the cart
        const cartData = {
            userId,
            items: selectedOptions.map(option => ({
                product_id: productId,
                optionTitle: option.optionTitle,
                quantity: option.quantity,
                
            }))
        };

        try {
            loader.show()
            // Use httpService to send the data to the backend
            const response = await httpService.post('/api/cart', cartData);

            if (!response) {
                throw new Error('Failed to add items to cart.');
            }

            showMessage('Items added to cart successfully!', 'lightgreen');
            this.clearCartTable();
            loader.hide()
        } catch (error) {
            loader.hide()
            console.error(error);
            showMessage('Error adding items to cart.', 'tomato');
        }
    }
    
    // Add an item to the cart from a card view
    static async addItemToCartFromCard(event) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('productId'); // Get the productId from the URL query parameters
        const button = event.target;
        const cardBody = button.closest('.card-body');

        // Extract details from the card view
        const optionTitle = cardBody.querySelector('.card-title').textContent.trim();
        const optionSubtitle = cardBody.querySelector('.card-subtitle').textContent.trim(); // Optional field
        

        // Check if the user is logged in
        const userId = localStorage.getItem("userId");
        if (!userId) {
            // If user is not logged in, store the item in local storage
            CartService.addToLocalStorage(optionTitle, optionSubtitle);
            showMessage('Item added to local storage cart. Please log in to save it to your cart.', 'lightgreen');
            return;
        }

        // Prepare the data for the API request
        const cartData = {
            userId,
            items: [
                {
                    product_id: productId,
                    optionTitle: optionTitle,
                    quantity: 1, // Default quantity for items added via card
                    
                }
            ]
        };

        try {
            loader.show()
            // Send the data to the backend using the httpService
            const response = await httpService.post('/api/cart', cartData);

            if (!response) {
                throw new Error('Failed to add item to cart.');
            }
            loader.hide()
            showMessage('Item added to cart successfully!', 'lightgreen');
            
        } catch (error) {
            loader.hide()
            console.error('Error adding item to cart from card:', error);
            showMessage('Error adding item to cart.', 'tomato');
        }
    }


    static addToLocalStorage(optionTitle, optionSubtitle, region_price) {
        const localCart = JSON.parse(localStorage.getItem('localCart')) || [];
        localCart.push({
            productId: optionTitle, // Use optionTitle as a product identifier here
            optionTitle,
            subtitle: optionSubtitle,
            region_price: localStorage.getItem("user_region")
        });
        localStorage.setItem('localCart', JSON.stringify(localCart));
    }

    // Push local cart items to database after login
    static async pushLocalCartToDatabase(userId) {
        const localCart = JSON.parse(localStorage.getItem('localCart')) || [];
        if (localCart.length === 0) {
            return; // No items to push
        }

        const cartData = {
            userId,
            items: localCart.map(item => ({
                product_id: item.productId,
                optionTitle: item.optionTitle,
                quantity: item.quantity,
                region_price: item.price
            }))
        };

        try {
            const response = await httpService.post('/api/cart', cartData);
            if (!response) {
                throw new Error('Failed to update cart with local items.');
            }
            showMessage('Local cart items added to database successfully!', 'lightgreen');
            localStorage.removeItem('localCart'); // Clear local storage after successful push
        } catch (error) {
            console.error(error);
            showMessage('Error adding local cart items to database.', 'tomato');
        }
    }

    // Remove item from cart
    static async removeCartItem(userId, productId, optionTitle) {
        const url = `/api/cart/${userId}/item/${productId}/${optionTitle}`;
        try {
            const response = await httpService.delete(url);
            showMessage('Item removed from cart successfully!', 'lightgreen');
            return response;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            showMessage('Error removing item from cart.', 'tomato');
            throw error;
        }
    }

    // Decrease the quantity of an item in the cart
    static async decreaseCartItem(userId, productId, optionTitle) {
        const url = `/api/cart/decrease`;
        const data = {
            userId,
            productId,
            optionTitle
        };
        try {
            const response = await httpService.post(url, data);
            showMessage('Item quantity decreased successfully!', 'lightgreen');
            return response;
        } catch (error) {
            console.error('Error decreasing item quantity in cart:', error);
            showMessage('Error decreasing item quantity in cart.', 'tomato');
            throw error;
        }
    }

    // Create a new cart for a user
    static async createCart(userId) {
        const url = `/api/cart/create`;
        const data = {
            userId
        };
        try {
            const response = await httpService.post(url, data);
            showMessage('Cart created successfully!', 'lightgreen');
            return response;
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
    static async increaseCartItem(userId, productId, optionTitle) {
        const url = `/api/cart/${userId}/item/${productId}/${optionTitle}/increase`;
        console.log(userId,optionTitle,productId)
        try {
            const response = await httpService.post(url,{});
            if (!response) {
                throw new Error('Failed to increase item quantity.');
            }
            return response;
        } catch (error) {
            console.error('Error increasing item quantity:', error);
            throw error;
        }
    }

    // Decrease the quantity of an item in the cart
    static async decreaseCartItem(userId, productId, optionTitle) {
        const url = `/api/cart/${userId}/item/${productId}/${optionTitle}/decrease`;

        try {
            const response = await httpService.post(url,{});
            if (!response) {
                throw new Error('Failed to decrease item quantity.');
            }
            return response;
        } catch (error) {
            console.error('Error decreasing item quantity:', error);
            throw error;
        }
    }

    static async getCheckoutDetails() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            showMessage('You are not logged in. Please log in to view your checkout details.', 'tomato');
            return;
        }

        const url = `/api/cart/checkout/${userId}`;
        try {
            loader.show(); // Show loader while fetching data
            const response = await httpService.get(url);
            if (!response) {
                throw new Error('Failed to fetch checkout details.');
            }
            console.log('Checkout details:', response); // Log the response for debugging
            loader.hide(); // Hide loader after successful fetch
            return response; // Return the checkout details
        } catch (error) {
            loader.hide(); // Hide loader on error
            console.error('Error fetching checkout details:', error);
            showMessage('Error fetching checkout details. Please try again later.', 'tomato');
            throw error; // Rethrow the error for further handling
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