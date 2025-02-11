import { ProductService } from "../services/ProductService.js";
import BASE_URL from "../config.js";
async function getIp() {
    const res = await fetch('https://api.ipify.org?format=json');
    const ip = await res.json();
    return ip
}
async function getLocationFromIP(ip) {
    try {

        // Send the IP to the backend
        const backendResponse = await fetch(`${BASE_URL}/api/ip/location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip: "20.74.211.96" }),
        });

        const backendData = await backendResponse.json();
        console.log('Backend Response:', backendData);
        return {
            countryName: backendData.geoInfo.country_name,
            countryCode: backendData.geoInfo.country_code
        };


    } catch (backupError) {
        console.error("Backup API Error:", backupError);

        // Return default location as a fallback
        return {
            countryName: "Unknown",
            regionCode: "Unknown"

        }
    }
}
const countryRegionMapping = {
    // Region 1 (USD-based countries)
    AS: "region-1-usd", // American Samoa
    AQ: "region-1-usd", // Antarctica
    BS: "region-1-usd", // Bahamas
    BH: "region-1-usd", // Bahrain
    BB: "region-1-usd", // Barbados
    BM: "region-1-usd", // Bermuda
    BV: "region-1-usd", // Bouvet Island
    BN: "region-1-usd", // Brunei Darussalam
    CA: "region-1-usd", // Canada
    KY: "region-1-usd", // Cayman Islands
    CN: "region-1-usd", // China
    CK: "region-1-usd", // Cook Islands
    AE: "region-1-usd", // United Arab Emirates (Dubai)
    FK: "region-1-usd", // Falkland Islands
    PF: "region-1-usd", // French Polynesia
    TF: "region-1-usd", // French Southern Territories
    GU: "region-1-usd", // Guam
    HK: "region-1-usd", // Hong Kong
    IL: "region-1-usd", // Israel
    KR: "region-1-usd", // South Korea
    KW: "region-1-usd", // Kuwait
    MO: "region-1-usd", // Macao
    MY: "region-1-usd", // Malaysia
    NZ: "region-1-usd", // New Zealand
    OM: "region-1-usd", // Oman
    PA: "region-1-usd", // Panama
    PR: "region-1-usd", // Puerto Rico
    QA: "region-1-usd", // Qatar
    SA: "region-1-usd", // Saudi Arabia
    SG: "region-1-usd", // Singapore
    TW: "region-1-usd", // Taiwan
    US: "region-1-usd", // United States

    // Region 2 (EUR/GBP/AUD-based countries)
    AX: "region-2-euro", // Åland Islands
    AD: "region-2-euro", // Andorra
    AT: "region-2-euro", // Austria
    BE: "region-2-euro", // Belgium
    HR: "region-2-euro", // Croatia
    CY: "region-2-euro", // Cyprus
    CZ: "region-2-euro", // Czech Republic
    DK: "region-2-euro", // Denmark
    EE: "region-2-euro", // Estonia
    FI: "region-2-euro", // Finland
    FR: "region-2-euro", // France
    DE: "region-2-euro", // Germany
    GR: "region-2-euro", // Greece
    HU: "region-2-euro", // Hungary
    IE: "region-2-euro", // Ireland
    IT: "region-2-euro", // Italy
    LV: "region-2-euro", // Latvia
    LI: "region-2-euro", // Liechtenstein
    LT: "region-2-euro", // Lithuania
    LU: "region-2-euro", // Luxembourg
    MT: "region-2-euro", // Malta
    MC: "region-2-euro", // Monaco
    NL: "region-2-euro", // Netherlands
    PL: "region-2-euro", // Poland
    PT: "region-2-euro", // Portugal
    RO: "region-2-euro", // Romania
    SK: "region-2-euro", // Slovakia
    SI: "region-2-euro", // Slovenia
    ES: "region-2-euro", // Spain
    SE: "region-2-euro", // Sweden
    CH: "region-2-euro", // Switzerland
    GB: "uk",           // United Kingdom (GBP)
    AU: "region-2-usd", // Australia (AUD)
    JP: "region-2-usd", // Japan (JPY)

    // Region 3 (Other or Default USD-based countries)
    IN: "india",       // India (INR)
    BR: "region-3-usd", // Brazil
    RU: "region-3-usd", // Russia
    ZA: "region-3-usd", // South Africa
    NG: "region-3-usd", // Nigeria
    MX: "region-3-usd", // Mexico
    PH: "region-3-usd", // Philippines
    PK: "region-3-usd", // Pakistan
    BD: "region-3-usd", // Bangladesh
    VN: "region-3-usd", // Vietnam

    // Default mapping for unsupported or unmapped countries
    DEFAULT: "region-3-usd"
};
function mapCountryToRegion(countryCode) {
    return countryRegionMapping[countryCode] || countryRegionMapping["DEFAULT"];
}
async function getRegion() {
    // Check if region is already cached
    const cachedRegion = localStorage.getItem('user_region');
    if (cachedRegion) {
        return cachedRegion; // Return cached region
    }
    // Fetch region if not cached
    const ipAdd = await getIp();
    const location = await getLocationFromIP(ipAdd);
    const countryCode = location.countryCode;
    const region = mapCountryToRegion(countryCode);

    // Cache the region for future use
    

    return region;
}
let region = await getRegion()
localStorage.setItem("user_region", region)
// Function to get the price for the user region
function getPriceForRegion(product) {
    return product.prices[region] || "Price not available";
}

// Region to Currency Map
const regionCurrencyMap = {
    "india": { currency: 'INR', locale: 'en-IN' },
    "region-3-usd": { currency: 'USD', locale: 'en-US' },
    "region-2-usd": { currency: 'USD', locale: 'en-US' },
    "region-2-euro": { currency: 'EUR', locale: 'de-DE' },
    "uk": { currency: 'GBP', locale: 'en-GB' },
    "region-1-usa": { currency: 'USD', locale: 'en-US' },
    "region-1-usd": { currency: 'USD', locale: 'en-US' },
};

// Function to fetch locale and currency based on region
function getLocaleAndCurrency(region) {
    const regionData = regionCurrencyMap[region];
    if (!regionData) {
        throw new Error(`Region "${region}" is not supported.`);
    }
    return regionData;
}

function formatCurrency(amount, currency, locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency
    }).format(amount);
}
const { currency, locale } = getLocaleAndCurrency(region);


// Output: $21.00


const dropdownTrigger = document.getElementById("dropdown-trigger");
const dropdownMenu = document.getElementById(
    "dropdown-menu-product-type-selection"
);
const dropdownArrow = document.getElementById("dropdown-arrow");
let products

function updateTrainingOptionPrices(products) {
    products.forEach(product => {
        // Construct the ID for the price element
        const priceId = `price-${product.name
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-")}`;

        console.log(priceId);

        // Find the price element by ID
        const priceElement = document.getElementById(priceId);

        if (priceElement) {
            // Get region-specific price
            const price = getPriceForRegion(product);
            const fomattedPrice = formatCurrency(price, currency, locale)
            console.log(fomattedPrice);
            
            // Update the price text
            priceElement.textContent = fomattedPrice;
        }
    });
}
// Function to display product details on the page
async function loadProductDetails() {
    const productData = await ProductService.getProductById();
    products = productData.training_options.filter(item =>
        item.title !== "Mock Tests" &&
        item.title !== "Online Bootcamp" &&
        item.title !== "Corporate Training"
    );
    updateTrainingOptionPrices(productData.training_options)
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
            <input type="checkbox" id="option-{{@index}}" name="product" value="{{name}}" data-price="{{price}}" style="display: none;" />
            <label for="option-{{@index}}">{{name}}</label>
          </div>
          <span>{{getPrice this}}</span> <!-- Display region-specific price -->
        </li>
      {{/each}}
    `;

    // Register a helper in Handlebars for region-specific pricing
    Handlebars.registerHelper("getPrice", function (product) {
        const price = getPriceForRegion(product);
        const formattedPrice = formatCurrency(price, currency, locale)
        return formattedPrice; // Call function to get region-based price
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
    console.log(products);

    tableBody.innerHTML = ""; // Clear existing rows
    let grandTotal = 0;

    selectedProducts.forEach((productName, index) => {
        console.log(productName);

        let price = null;
        let qty = 1;  // Default quantity

        for (let i = 0; i < products.length; i++) {
            const product = products[i];

            if (product.name === productName) {
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


