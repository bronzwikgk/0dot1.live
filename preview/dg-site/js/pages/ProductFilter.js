// Product Filter Class Implementation

class ProductFilter {
    constructor(formId, productContainerId) {
        this.form = document.getElementById(formId);
        this.productContainer = document.getElementById(productContainerId);
        
        // Error handling in case the form or product container isn't found
        if (!this.form || !this.productContainer) {
            console.error("Form or Product Container not found. Please check the provided IDs.");
            return;
            
        }
        
        this.products = Array.from(this.productContainer.children); // Use existing product elements from the DOM
        this.initFilter();
    }

    // Initialize the filter method to listen for changes in checkboxes
    initFilter() {
        const checkboxes = this.form.querySelectorAll('input[type="checkbox"]');
        
        if (checkboxes.length === 0) {
            console.error("No checkboxes found in the form.");
            return;
        }

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', this.handleFilter.bind(this));
        });
    }

    // Filter products based on selected checkboxes
    handleFilter() {
        const selectedCategories = Array.from(this.form.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        // If no categories are selected, show all products
        if (selectedCategories.length === 0) {
            this.displayProducts(this.products);
        } else {
            const filteredProducts = this.products.filter(product => {
                const productCategory = product.getAttribute('data-category');
                return selectedCategories.includes(productCategory);
            });
            this.displayProducts(filteredProducts);
        }
    }

    // Display products in the main container
    displayProducts(products) {
        this.productContainer.innerHTML = ''; // Clear the container
        if (products.length === 0) {
            this.productContainer.innerHTML = '<p>No products found</p>';
        } else {
            products.forEach(product => {
                this.productContainer.appendChild(product); // Re-append the existing product elements
            });
        }
    }
}

// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Make sure the IDs match with your HTML
    const productFilter = new ProductFilter('filterForm', 'product-container');
});
