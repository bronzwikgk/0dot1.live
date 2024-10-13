import { ProductService } from "../services/ProductService.js";




function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // You can reverse geocode to find the region/country based on latitude and longitude
            getRegionFromCoordinates(lat, lon);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}



async function getRegionFromCoordinates(lat, lon) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    const data = await response.json();
    console.log(data.countryCode); // Use this code as your region
}



getLocation()












// Simulated function to detect user region
function detectRegion() {
    // Replace this logic with actual geolocation code if necessary
    return "India"; // Assume "India" for this example
}



// Map region to corresponding price field in product data
const regionPriceMap = {
    "India": "india_price",
    "USA": "region_1_usa",
    "Europe": "region_2_euro",
    "UK": "uk_price",
    "Region 3": "region_3_usd_price"
};

// Function to get the price for the user region
function getPriceForRegion(product) {
    const userRegion = detectRegion();

    const priceField = regionPriceMap[userRegion];
    console.log(priceField);
    
    return product[priceField] || "Price not available";
}

const dropdownTrigger = document.getElementById("dropdown-trigger");
const dropdownMenu = document.getElementById(
    "dropdown-menu-product-type-selection"
);
const dropdownArrow = document.getElementById("dropdown-arrow");
let products
// Function to display product details on the page
async function loadProductDetails() {
    const productData = await ProductService.getProductById();
    console.log("Get Product Deatils");
    

    products = productData.trainingOptions.filter(item =>
        item.title !== "Mock Tests" &&
        item.title !== "Online Bootcamp" &&
        item.title !== "Corporate Training"
    );

    renderProductOptions(products);
}

loadProductDetails()
// Function to render product options using Handlebars
// Function to render product options using Handlebars
function renderProductOptions(options) {
    // Updated template to use dynamic pricing based on user region
    const templateSource = `
      {{#each options}}
        <li class="dropdown-menu-product-type-selection-item d-flex justify-content-between">
          <div>
            <input type="checkbox" id="option-{{@index}}" name="product" value="{{title}}" data-price="{{price}}" style="display: none;" />
            <label for="option-{{@index}}">{{title}}</label>
          </div>
          <span>{{getPrice this}}</span> <!-- Display region-specific price -->
        </li>
      {{/each}}
    `;
    
    // Register a helper in Handlebars for region-specific pricing
    Handlebars.registerHelper("getPrice", function(product) {
        return getPriceForRegion(product); // Call function to get region-based price
    });

    const template = Handlebars.compile(templateSource);
    const html = template({ options });
    document.getElementById('dropdown-menu-product-type-selection').innerHTML = html;

    // Checkbox change event
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const productName = checkbox.value;
            if (checkbox.checked) {
                selectedProducts.push(productName);
            } else {
                selectedProducts = selectedProducts.filter((p) => p !== productName);
            }
            updateTable();
            dropdownMenu.style.display = "none";
            dropdownTrigger.setAttribute("aria-expanded", false);
        });
    });
}



dropdownTrigger.addEventListener("click", function () {
    const isExpanded =
        dropdownTrigger.getAttribute("aria-expanded") === "true";
    dropdownTrigger.setAttribute("aria-expanded", !isExpanded);
    dropdownMenu.style.display = isExpanded ? "none" : "block";
    dropdownArrow.classList.toggle("dropdown-open", !isExpanded);
});



let selectedProducts = [];

function updateTable() {
    const tableBody = document.getElementById("product-list-body");
    const grandTotalCell = document.getElementById("grand-total");

    tableBody.innerHTML = ""; // Clear existing rows
    let grandTotal = 0;

    selectedProducts.forEach((productName, index) => {
        let price = null;
        let qty = 1;  // Default quantity

        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            if (product.title === productName) {
                const priceString = getPriceForRegion(product).replace(/[₹$£€]/g, '');
                price = parseFloat(priceString.replace(/,/g, '')) || 0; // Set price to 0 if missing
                break;
            }
        }

        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${productName}</td>
                <td><input type="number" value="${qty}" min="1" data-product="${productName}" class="qty-input" /></td>
                <td style="padding-left: var(--spacing-mid);">₹${price * qty}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
        grandTotal += price * qty;
    });

    grandTotalCell.innerHTML = `Total: ${grandTotal}`;

    const qtyInputs = document.querySelectorAll(".qty-input");
    qtyInputs.forEach((input) => {
        input.addEventListener("input", function () {
            const product = this.getAttribute("data-product");
            const newQty = parseInt(this.value);
            products[product].qty = newQty;
            updateTable();
        });
    });
}


// Close dropdown when clicking outside
window.addEventListener("click", function (event) {
    const dropdown = document.getElementById(
        "dropdown-menu-product-type-selection"
    );
    const button = document.getElementById("dropdown-trigger");
    if (
        !button.contains(event.target) &&
        !dropdown.contains(event.target)
    ) {
        dropdown.style.display = "none";
        button.setAttribute("aria-expanded", "false");
    }
});


