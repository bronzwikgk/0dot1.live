import { HttpService } from "./HttpService.js";

// Create an instance of HttpService and pass it to AuthService
const httpService = new HttpService('http://localhost:3000');

export class ProductService {
    // Get products with optional search and pagination parameters
    static async getProducts({ page = 1, limit = 10, query = '' } = {}) {
        const offset = (page - 1) * limit;
        let url = `/api/products?limit=${limit}&offset=${offset}`;

        // Add search query to the URL if it's provided
        if (query) {
            url += `&search=${encodeURIComponent(query)}`;
        }

        try {
            return await httpService.get(url);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    // Get a specific product by ID
    static async getProductById(id) {
        const url = `/products/${id}`;
        try {
            return await httpService.get(url);
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            throw error;
        }
    }
}

