// Product Search Class Implementation without generating product cards

class ProductSearch {
    constructor(searchInputId, productContainerId) {
        this.searchInput = document.getElementById(searchInputId);
        this.productContainer = document.getElementById(productContainerId);
        this.products = Array.from(this.productContainer.children); // Store initial product elements
        this.initSearch();
    }

    // Initialize the search event
    initSearch() {
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
    }

    // Filter products based on search query
    handleSearch() {
        const query = this.searchInput.value.toLowerCase();
        
        // Loop through all product elements and hide/show based on the search query
        this.products.forEach(product => {
            const productName = product.querySelector('.product-name').textContent.toLowerCase(); // Assuming product name has class "product-name"
            if (productName.includes(query)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
}

// Usage Example:
// Assuming the backend has already populated the #product-container with product elements

// Instantiate the ProductSearch class
const productSearch = new ProductSearch('searchBar', 'product-container');
