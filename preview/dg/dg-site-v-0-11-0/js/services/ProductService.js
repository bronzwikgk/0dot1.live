import { HttpService } from "./HttpService.js";

// Create an instance of HttpService and pass it to AuthService
const httpService = new HttpService('http://localhost:4000');

export class ProductService {
    // Get products with optional search and pagination parameters
    // Get products with optional search, category, and pagination parameters
    static async getProducts({ page = 1, limit = 10, query = '', categories = [] } = {}) {
        let url = `/api/products?limit=${limit}&page=${page}`;

        // Add search query to the URL if it's provided
        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }

        // Add category filters to the URL if provided
        if (categories.length > 0) {
            url += `&category=${categories.map(encodeURIComponent).join(',')}`;
        }

        try {
            return await httpService.get(url);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }


    // Get a specific product by ID
    static async getProductById() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('productId');
        const url = `/api/products/${productId}`;
        try {
            return await httpService.get(url);
        } catch (error) {
            console.error(`Error fetching product with ID ${productId}:`, error);
            throw error;
        }
    }
}

