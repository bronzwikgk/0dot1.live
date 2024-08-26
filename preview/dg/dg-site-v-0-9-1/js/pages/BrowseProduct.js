import { ProductCard } from '../components/ProductCard/ProductCard.js';
import { Pagination } from '../Utils/Pagination.js';
import { Search } from '../Utils/Search.js';

let products = [];
const pageSize = 6;
let currentPage = 1;
let totalPages = 1;

// Fetch products from the backend for a specific page
async function fetchProducts(page = 1, query) {
    console.log(query);
    let response
    const offset = (page - 1) * pageSize;
    if (query && query !== "") {
        response = await fetch(`http://localhost:3000/products?search=${encodeURIComponent(query)}&limit=${pageSize}&offset=${offset}`);
    } else {
        response = await fetch(`http://localhost:3000/products?limit=${pageSize}&offset=${offset}`);
    }
    console.log("Fetching Products");
    const data = await response.json();
    products = data.products;
    totalPages = Math.ceil(data.totalCount / pageSize);
    renderProducts();
    renderPagination();
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
    productContainer.addEventListener('click', (event) => {
        const addToCartButton = event.target.closest('.add-to-cart');
        if (addToCartButton) {
            const productId = addToCartButton.dataset.id;
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

// Initial fetch of products
fetchProducts();
