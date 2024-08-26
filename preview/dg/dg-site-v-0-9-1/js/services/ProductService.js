import  HttpService  from './HttpService.js';

export class ProductService {
    static async getProducts() {
        const url = '/products';
        return await HttpService.get(url);
    }

    static async getProductById(id) {
        const url = `/api/products/${id}`;
        return await HttpService.get(url);
    }
}
