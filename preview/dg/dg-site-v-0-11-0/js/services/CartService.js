import { HttpService } from "./HttpService.js";
const httpService = new HttpService('https://unbelong.in');

export class CartService {
    // Get all items from a user's cart (using user ID)
    static async getCartItems() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert('You are not logged in. Please log in to view your cart.');
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
            alert('Error fetching cart items.');
            throw error;
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
                    price: region_price
                });
            }
        });

        if (selectedOptions.length === 0) {
            alert('Please select at least one product option.');
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
                    price: option.price
                });
            });
            localStorage.setItem('localCart', JSON.stringify(localCart));
            alert('Items added to local storage cart. Please log in to save them to your cart.');
            return;
        }

        // Create the data to send to the cart
        const cartData = {
            userId,
            items: selectedOptions.map(option => ({
                product_id: productId,
                optionTitle: option.optionTitle,
                quantity: option.quantity,
                region_price: option.price
            }))
        };

        try {
            // Use httpService to send the data to the backend
            const response = await httpService.post('/api/cart', cartData);

            if (!response) {
                throw new Error('Failed to add items to cart.');
            }

            alert('Items added to cart successfully!');
            this.clearCartTable();
        } catch (error) {
            console.error(error);
            alert('Error adding items to cart.');
        }
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
            alert('Local cart items added to database successfully!');
            localStorage.removeItem('localCart'); // Clear local storage after successful push
        } catch (error) {
            console.error(error);
            alert('Error adding local cart items to database.');
        }
    }

    // Remove item from cart
    static async removeCartItem(userId, productId, optionTitle) {
        const url = `/api/cart/${userId}/item/${productId}/${optionTitle}`;
        try {
            const response = await httpService.delete(url);
            alert('Item removed from cart successfully!');
            return response;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            alert('Error removing item from cart.');
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
            alert('Item quantity decreased successfully!');
            return response;
        } catch (error) {
            console.error('Error decreasing item quantity in cart:', error);
            alert('Error decreasing item quantity in cart.');
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
            alert('Cart created successfully!');
            return response;
        } catch (error) {
            console.error('Error creating a new cart:', error);
            alert('Error creating cart.');
            throw error;
        }
    }

    // Clear the cart table in the UI
    static clearCartTable() {
        const tableBody = document.querySelector('#product-list-body');
        tableBody.innerHTML = ''; // Clear all rows in the table
    }
}






// import { HttpService } from "./HttpService.js";
// // Create an instance of HttpService and pass it to AuthService
// const httpService = new HttpService('https://unbelong.in');

// export class CartService {

//     // Get all items from a user's cart (using user ID, as per the backend logic)
//     static async getCartItems() {
//         const userId = localStorage.getItem("userId")
//         const url = `/api/cart/${userId}`; // Adjust URL to use userId
//         try {
//             return await httpService.get(url); // Use the httpService to make the GET request
//         } catch (error) {
//             console.error(`Error fetching cart items for user ID ${userId}:`, error);
//             throw error;
//         }
//     }



//     // Add a new item to the cart
//     static async addItemToCart() {
//         // Get the productId from the URL query parameters
//         const urlParams = new URLSearchParams(window.location.search);
//         const productId = urlParams.get('productId');

//         const selectedOptions = [];

//         // Loop through each row in the table
//         document.querySelectorAll('#product-list-body tr').forEach((row) => {
//             const optionTitle = row.querySelector('td:nth-child(2)').textContent; // Get product type (e.g., "Book")
//             const quantity = row.querySelector('input.qty-input').value; // Get quantity
//             const region_price = row.querySelector('td:nth-child(4)').textContent

//             // Check if the product type checkbox is checked
//             const checkbox = document.querySelector(`input[name="product"][value="${optionTitle}"]`);
//             if (checkbox && checkbox.checked) {
//                 selectedOptions.push({
//                     optionTitle: optionTitle,
//                     quantity: parseInt(quantity, 10),
//                     price: region_price
//                 });
//             }
//         });

//         const userId = localStorage.getItem("userId"); // Replace with the actual logged-in user ID

//         if (selectedOptions.length === 0) {
//             alert('Please select at least one product option.');
//             return;
//         }

//         // Create the data to send to the cart
//         const cartData = {
//             userId,
//             items: selectedOptions.map(option => ({
//                 product_id: productId,
//                 optionTitle: option.optionTitle,
//                 quantity: option.quantity,
//                 region_price: option.price
//             }))
//         };
//         console.log(cartData);

//         try {
//             // Use httpService to send the data to the backend
//             const response = await httpService.post('/api/cart', cartData);

//             if (!response) {
//                 throw new Error('Failed to add items to cart.');
//             }

//             alert('Items added to cart successfully!');
//             // **Clear the table after adding to the cart**
//             CartService.clearCartTable();
//         } catch (error) {
//             console.error(error);
//             alert('Error adding items to cart.');
//         }

//     }

//     static clearCartTable() {
//         const tableBody = document.querySelector('#product-list-body');
//         tableBody.innerHTML = ''; // Clear all rows in the table


//     }


//     // Create a new cart for a user
//     static async createCart(userId, sessionId) {
//         const url = `/cart/create`;
//         const data = {
//             userId,
//             sessionId
//         };
//         try {
//             return await httpService.post(url, data);
//         } catch (error) {
//             console.error('Error creating a new cart:', error);
//             throw error;
//         }
//     }

//     // Decrease the quantity of an item in the cart
//     static async decreaseCartItem(cartId, productId, quantity) {
//         const url = `/cart/decrease`;
//         const data = {
//             cartId,
//             productId,
//             quantity
//         };
//         try {
//             return await httpService.post(url, data);
//         } catch (error) {
//             console.error('Error decreasing item quantity in cart:', error);
//             throw error;
//         }
//     }

//     // Updated function to remove item from cart
//     static async removeCartItem(userId, productId, optionTitle) {
//         const url = `/api/cart/${userId}/item/${productId}/${optionTitle}`;
//         try {
//             const response = await httpService.delete(url);
//             return response;
//         } catch (error) {
//             console.error('Error removing item from cart:', error);
//             throw error;
//         }
//     }

// }
