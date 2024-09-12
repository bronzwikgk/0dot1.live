export class ProductCard {
    constructor(product) {
        this.product = product;
    }

    render() {
        const truncatedDescription = this.truncateDescription(this.product.description);
        return `
            <div class="col-md-4 mb-4">
                <div class="card shadow-sm h-100" style="display: flex; flex-direction: column;">
                    <div style="width: 100%; height: 200px; display: flex; justify-content: center; align-items: center;">
                        <img class="p-3" style="max-width: 100%; max-height: 100%; object-fit: contain;" src="${this.product.image}" alt="${this.product.title}">
                    </div>
                    <div class="card-body" style="flex-grow: 1">
                        <h5 class="card-title">${this.product.title}</h5>
                        <p class="card-text">${truncatedDescription}</p>
                    </div>
                    <div class="card-footer" style="margin-top: auto; display: flex; justify-content: space-between;">
                        <a href="./page-dg-app-course-detail-page-dev-shiv.html?productId=${this.product.id}" class="btn btn-light">Know More</a>
                        <a class="btn btn-light add-to-cart" data-id="${this.product.id}">Add to cart</a>
                    </div>
                </div>
            </div>
        `;
    }

    truncateDescription(description, maxLength = 100) {
        if (description.length <= maxLength) return description;
        return description.slice(0, maxLength) + '...';
    }
}


// Dynamically add product cards to the page
export function displayProducts(productsObj) {
    const container = document.querySelector('#product-list');
    console.log(productsObj);
    productsObj.products.forEach(product => {
        const productCard = new ProductCard(product);
        container.innerHTML += productCard.render();
    });
}
