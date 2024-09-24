import { ProductService } from "../services/ProductService.js";

const dropdownTrigger = document.getElementById("dropdown-trigger");
const dropdownMenu = document.getElementById(
    "dropdown-menu-product-type-selection"
);
const dropdownArrow = document.getElementById("dropdown-arrow");
let products
// Function to display product details on the page
async function loadProductDetails() {
    const productData = await ProductService.getProductById();

    products = productData.options
    renderProductOptions(productData.options);
}

loadProductDetails()
// Function to render product options using Handlebars
function renderProductOptions(options) {
    // Get the Handlebars template from the script tag
    const templateSource = document.getElementById('product-type-template').innerHTML;
    const template = Handlebars.compile(templateSource);

    // Generate HTML from the template and product options data
    const html = template({ options });

    // Insert the generated HTML into the dropdown menu
    document.getElementById('dropdown-menu-product-type-selection').innerHTML = html;
    // Checkbox change event
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    console.log(checkboxes);
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            console.log("Change checkbox");

            const productName = checkbox.value;
            if (checkbox.checked) {
                selectedProducts.push(productName);
            } else {
                selectedProducts = selectedProducts.filter(
                    (p) => p !== productName
                );
            }
            updateTable();
            dropdownMenu.style.display = "none"
            dropdownTrigger.setAttribute("aria-expanded", false)
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

// Update the product table
function updateTable() {
    const tableBody = document.getElementById("product-list-body");
    const grandTotalCell = document.getElementById("grand-total");

    tableBody.innerHTML = ""; // Clear existing rows
    let grandTotal = 0;

    selectedProducts.forEach((product, index) => {
        let price = null;
        let qty = 1;  // Default quantity

        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            // Check if the product type matches
            if (product.type === product) {
                price = product.price || 0; // Set price to 0 if price field is missing
                break; // Exit loop once the product is found
            }
        }

        const row = `
<tr>
<td>${index + 1}</td>
<td>${product}</td>
<td><input type="number" value="${qty}" min="1" data-product="${product}" class="qty-input" /></td>
<td style="padding-left: var(--spacing-mid);">₹${price * qty}</td>
</tr>
`;
        tableBody.insertAdjacentHTML("beforeend", row);
        grandTotal += price * qty;
    });

    grandTotalCell.innerHTML = `Total: ₹${grandTotal}`;

    // Attach event listeners to quantity input fields
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


