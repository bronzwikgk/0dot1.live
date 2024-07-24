
const products = [
    { title: "Agile Scrum Workshop", description: "A 2-day course covering the principles and process theory underpinning the mechanics, rules, and roles of the Scrum framework.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
    { title: "Peoplecert SCRUM Master 1", description: "This course confirms that a candidate has sufficient knowledge and understanding of the Scrum framework.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
    { title: "Peoplecert SCRUM Master 2", description: "Advanced skills, practices, and knowledge about the Scrum framework for a leading member of a Scrum Team.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
    { title: "Peoplecert SCRUM PRODUCT OWNER I", description: "Covers the fundamental knowledge and skills required for a candidate to build their knowledge and skills regarding Scrum principles and practices.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
    { title: "Peoplecert SCRUM PRODUCT OWNER II", description: "More advanced skills, practices, and knowledge about the Scrum framework.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
    { title: "Peoplecert SCRUM Developer", description: "Covers the fundamental knowledge required for a candidate to build their knowledge and skills regarding Scrum principles and practices.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
    { title: "Prince2 ® Agile Foundation", description: "Helps professionals deliver agile projects by tailoring PRINCE2 management controls with a broad toolset of agile delivery techniques and frameworks.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
    { title: "Prince2 ® Agile Practitioner", description: "Demonstrates that you can apply and tailor PRINCE2 Agile in a scenario situation.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
    { title: "Prince2 ® Foundation", description: "Provides common processes, management products, roles, and language for use throughout an organization’s projects.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
    { title: "Prince2 ® Practitioner", description: "Builds on the knowledge that participants have gained in the PRINCE2 Foundation course and focuses on applying and tailoring PRINCE2.", imgSrc: "https://cdn-icons-png.flaticon.com/128/2436/2436874.png" },
];

const cardsPerPage = 6;
let currentPage = 1;

function renderProducts(page) {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    currentProducts.forEach(product => {
        const productCard = `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100" style="display: flex; flex-direction: column">
          <img class="p-3" style="width: 100px" src="${product.imgSrc}" alt="">
          <div class="card-body" style="flex-grow: 1">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
          </div>
          <div class="card-footer" style="margin-top: auto; display: flex; justify-content: space-between;">
            <a href="./shiv-pages/page-dg-site-offering-product.html" type="button" class="btn btn-light">Know More</button>
          </div>
        </div>
      </div>`;
        productContainer.innerHTML += productCard;
    });
}

function renderPagination() {
    const totalPages = Math.ceil(products.length / cardsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const prevPageItem = document.createElement('li');
    prevPageItem.classList.add('page-item');
    if (currentPage === 1) {
        prevPageItem.classList.add('disabled');
    }
    prevPageItem.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevPageItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderProducts(currentPage);
            renderPagination();
        }
    });
    paginationContainer.appendChild(prevPageItem);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) {
            pageItem.classList.add('active');
        }
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderProducts(currentPage);
            renderPagination();
        });
        paginationContainer.appendChild(pageItem);
    }

    const nextPageItem = document.createElement('li');
    nextPageItem.classList.add('page-item');
    if (currentPage === totalPages) {
        nextPageItem.classList.add('disabled');
    }
    nextPageItem.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextPageItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts(currentPage);
            renderPagination();
        }
    });
    paginationContainer.appendChild(nextPageItem);
}

renderProducts(currentPage);
renderPagination();
