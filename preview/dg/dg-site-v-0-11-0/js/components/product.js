// Function to fetch all products
async function fetchProducts() {
    try {
<<<<<<< HEAD
        const response = await fetch('http://68.183.94.77:4000/products');
=======
        const response = await fetch('http://localhost:4000/products');
>>>>>>> b2eed0a27df998ad5d498346afb47e34f2589846
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        console.log('Products fetched:', products);
        
        // Handle displaying products in the UI
        // For example:
        // renderProducts(products);
        
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching products. Please try again later.');
    }
}

// Function to fetch a single product by ID
async function fetchProductById(productId) {
    try {
<<<<<<< HEAD
        const response = await fetch(`http://68.183.94.77:4000/products/${productId}`);
=======
        const response = await fetch(`http://localhost:4000/products/${productId}`);
>>>>>>> b2eed0a27df998ad5d498346afb47e34f2589846
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const product = await response.json();
        console.log('Product fetched:', product);
        
        // Handle displaying product details in the UI
        // For example:
        // renderProductDetail(product);
        
    } catch (error) {
        console.error('Error fetching product:', error);
        alert('Error fetching product. Please try again later.');
    }
}

// Function to create a new product
async function createProduct(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const title = document.getElementById('product-title').value;
    const description = document.getElementById('product-description').value;
    const courseOverview = document.getElementById('product-course-overview').value;
    const targetGroup = document.getElementById('product-target-group').value;
    const conceptsCovered = document.getElementById('product-concepts-covered').value;
    const examAndPrerequisite = document.getElementById('product-exam-and-prerequisite').value;
    const image = document.getElementById('product-image').value;
    const categoryId = document.getElementById('product-category-id').value;

    try {
<<<<<<< HEAD
        const response = await fetch('http://68.183.94.77:4000/products', {
=======
        const response = await fetch('http://localhost:4000/products', {
>>>>>>> b2eed0a27df998ad5d498346afb47e34f2589846
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, courseOverview, targetGroup, conceptsCovered, examAndPrerequisite, image, categoryId }),
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }
        const newProduct = await response.json();
        console.log('Product created:', newProduct);

        // Handle successful product creation
        // For example:
        // fetchProducts(); // Refresh the product list

    } catch (error) {
        console.error('Error creating product:', error);
        alert('Error creating product. Please try again later.');
    }
}

// Function to update an existing product
async function updateProduct(productId, event) {
    event.preventDefault(); // Prevent default form submission behavior

    const title = document.getElementById('update-product-title').value;
    const description = document.getElementById('update-product-description').value;
    const courseOverview = document.getElementById('update-product-course-overview').value;
    const targetGroup = document.getElementById('update-product-target-group').value;
    const conceptsCovered = document.getElementById('update-product-concepts-covered').value;
    const examAndPrerequisite = document.getElementById('update-product-exam-and-prerequisite').value;
    const image = document.getElementById('update-product-image').value;
    const categoryId = document.getElementById('update-product-category-id').value;

    try {
<<<<<<< HEAD
        const response = await fetch(`http://68.183.94.77:4000/products/${productId}`, {
=======
        const response = await fetch(`http://localhost:4000/products/${productId}`, {
>>>>>>> b2eed0a27df998ad5d498346afb47e34f2589846
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, courseOverview, targetGroup, conceptsCovered, examAndPrerequisite, image, categoryId }),
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);

        // Handle successful product update
        // For example:
        // fetchProducts(); // Refresh the product list

    } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product. Please try again later.');
    }
}

// Function to delete a product
async function deleteProduct(productId) {
    try {
        const response = await fetch(`http://68.183.94.77:4000/products/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        console.log('Product deleted');

        // Handle successful product deletion
        // For example:
        // fetchProducts(); // Refresh the product list

    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again later.');
    }
}

// Event listeners for product forms
document.addEventListener('DOMContentLoaded', () => {
    const createForm = document.getElementById('createProductForm');
    const updateForm = document.getElementById('updateProductForm');

    if (createForm) {
        createForm.addEventListener('submit', createProduct);
    }

    if (updateForm) {
        updateForm.addEventListener('submit', (event) => {
            const productId = document.getElementById('update-product-id').value;
            updateProduct(productId, event);
        });
    }

    // Fetch products on page load
    fetchProducts();
});
