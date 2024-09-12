import { HttpService } from "./HttpService.js";
// Create an instance of HttpService and pass it to AuthService
const httpService = new HttpService('http://localhost:3000');

export class CartService {

    // Get all items from a user's cart (using cart ID or user ID, adjust based on your backend logic)
    static async getCartItems(cartId) {
        const url = `/cart/items/${cartId}`;
        try {
            return await httpService.get(url);
        } catch (error) {
            console.error(`Error fetching cart items for cart ID ${cartId}:`, error);
            throw error;
        }
    }

    // Add a new item to the cart
    static async addItemToCart(cartId, productId, quantity) {
        const url = `/cart/add`;
        const data = {
            cartId,
            productId,
            quantity
        };
        try {
            return await httpService.post(url, data);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    }

    // Create a new cart for a user
    static async createCart(userId, sessionId) {
        const url = `/cart/create`;
        const data = {
            userId,
            sessionId
        };
        try {
            return await httpService.post(url, data);
        } catch (error) {
            console.error('Error creating a new cart:', error);
            throw error;
        }
    }

    // Decrease the quantity of an item in the cart
    static async decreaseCartItem(cartId, productId, quantity) {
        const url = `/cart/decrease`;
        const data = {
            cartId,
            productId,
            quantity
        };
        try {
            return await httpService.post(url, data);
        } catch (error) {
            console.error('Error decreasing item quantity in cart:', error);
            throw error;
        }
    }

    // Remove an item from the cart
    static async removeCartItem(cartId, productId) {
        const url = `/cart/remove`;
        const data = {
            cartId,
            productId
        };
        try {
            return await httpService.delete(url, data);
        } catch (error) {
            console.error('Error removing item from cart:', error);
            throw error;
        }
    }
}
