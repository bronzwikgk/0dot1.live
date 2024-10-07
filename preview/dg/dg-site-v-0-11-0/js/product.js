let products = [];
const pageSize = 6;
let currentPage = 1;
let totalPages = 1;

// Fetch products from the backend for a specific page
async function fetchProducts(page = 1) {
    console.log("Fething Products");
    const offset = (page - 1) * pageSize;
    const response = await fetch(`https://68.183.94.77/products?limit=${pageSize}&offset=${offset}`);
    const data = await response.json();
    products = data.products;
    totalPages = Math.ceil(data.totalCount / pageSize);
    console.log(products);
    renderProducts();
    renderPagination();
}

// Function to fetch products with search query
async function searchProducts(query, page = 1) {
    try {
        const offset = (page - 1) * pageSize;
        const response = await fetch(`https://68.183.94.77/products?search=${encodeURIComponent(query)}&limit=${pageSize}&offset=${offset}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Search results:', products);
        products = data.products;
        totalPages = Math.ceil(data.totalCount / pageSize);
        renderProducts();
        renderPagination();
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching products. Please try again later.');
    }
}

// Render products on the current page
function renderProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const truncatedDescription = truncateDescription(product.description);

        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card shadow-sm h-100" style="display: flex; flex-direction: column;">
                    <div style="width: 100%; height: 200px; display: flex; justify-content: center; align-items: center;">
                        <img class="p-3" style="max-width: 100%; max-height: 100%; object-fit: contain;" src="${product.image}" alt="">
                    </div>
                    <div class="card-body" style="flex-grow: 1">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${truncatedDescription}</p>
                    </div>
                    <div class="card-footer" style="margin-top: auto; display: flex; justify-content: space-between;">
                        <a href="./page-dg-app-course-detail-page-dev-shiv.html?productId=${product.id}" class="btn btn-light">Know More</a>
                        <a href="#" class="btn btn-light">Add to cart</a>
                    </div>
                </div>
            </div>`;
        productContainer.innerHTML += productCard;
    });
}
// Function to handle search icon click
function handleSearch() {
    const searchQuery = document.getElementById('searchBar').value.trim();
    if (searchQuery) {
        searchProducts(searchQuery);
    }
}

// Render pagination controls
function renderPagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';
    ;

    if (totalPages <= 1) return;

    const createButton = (text, pageNumber, isDisabled = false) => {
        const button = document.createElement('button');
        button.className = `btn ${isDisabled ? 'btn-secondary' : 'btn-primary'} mx-1`;
        button.textContent = text;
        button.disabled = isDisabled;
        button.onclick = () => {
            if (!isDisabled) {
                currentPage = pageNumber;
                fetchProducts(currentPage);
            }
        };
        return button;
    };

    // Create Previous button
    paginationContainer.appendChild(createButton('Previous', currentPage - 1, currentPage === 1));

    // Create page number buttons
    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.appendChild(createButton(i, i, i === currentPage));
    }

    // Create Next button
    paginationContainer.appendChild(createButton('Next', currentPage + 1, currentPage === totalPages));
}

// Truncate description if it's too long
function truncateDescription(description, maxLength = 100) {
    if (description.length <= maxLength) {
        return description;
    }
    return description.slice(0, maxLength) + '...';
}
const searchIcon = document.getElementById('searchIcon');
if (searchIcon) {
    searchIcon.addEventListener('click', handleSearch);
}

// Initial fetch
fetchProducts();
