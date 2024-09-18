import { ProductCard } from '../components/ProductCard/ProductCard.js';
import { Pagination } from '../Utils/Pagination.js';
import { Search } from '../Utils/Search.js';
import { ProductService } from '../services/ProductService.js';
import { CartService } from '../services/CartService.js';

// Define page size globally or pass it as a parameter
let products = [];
const pageSize = 6;
let currentPage = 1;
let totalPages = 1;

// Fetch products from the backend for a specific page
async function fetchProducts(page = 1, query = '',categories=[]) {
    try {
        console.log('Query:', query);

        // Call the ProductService to get products with search and pagination
        const data = await ProductService.getProducts({ page, limit: pageSize, query ,categories});

        console.log("Fetching Products");

        // Update products and total pages using the fetched data
        products = data.products;
        totalPages = data.totalPages;

        // Render the products and pagination controls
        renderProducts();
        renderPagination();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


// Render products on the current page
function renderProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = new ProductCard(product);
        productContainer.innerHTML += productCard.render();
    });

    // Event Delegation for Add to Cart
    productContainer.addEventListener('click', async (event) => {
        const addToCartButton = event.target.closest('.add-to-cart');
        if (addToCartButton) {
            const productId = addToCartButton.dataset.id;
            let cartId = localStorage.getItem("cartId")
            await CartService.addItemToCart(cartId, productId, 1)
            console.log(`Product ${productId} added to cart`);
            // Add your add-to-cart logic here
        }
    });
}

// Render pagination controls
function renderPagination() {
    const pagination = new Pagination(totalPages, currentPage, (page) => {
        currentPage = page;
        fetchProducts(currentPage);
    });
    pagination.render();
}

// Handle search
function handleSearch(query) {
    fetchProducts(1, query);
}

// Initialize the search component
const search = new Search(handleSearch);
search.render();

const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="category"]');


const getSelectedCategories = () => {
    return Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
};

    // Handle category filter changes (on checkbox click)
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            fetchProducts(currentPage,null,getSelectedCategories())
        });
    });


// Initial fetch of products
fetchProducts();
