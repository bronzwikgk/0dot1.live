// Import necessary services
import { CartService } from "../services/CartService.js";
import { HttpService } from "../services/HttpService.js";
import { getSessionIdentifier } from "../Utils/session.js";
import BASE_URL from "../config.js";


// Create an instance of HttpService
const httpService = new HttpService(BASE_URL);

// Cookie Functions
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Save form data to cookies
function saveFormDataToCookies(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
        const cookieName = `${formId}-${input.id}`;
        setCookie(cookieName, input.value, 365); // Save each input value in cookies for 365 days
    });
}

function loadFormDataFromCookies(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
        const cookieName = `${formId}-${input.id}`;
        const value = getCookie(cookieName);
        if (value) {
            console.log(`Auto-filling ${cookieName} with value: ${value}`); // Debug log
            input.value = value; // Populate the input with the saved value
        } else {
            console.log(`No cookie found for ${cookieName}`); // Debug log
        }
    });
}


// Utility function to strip non-numeric characters from prices
function parsePrice(price) {
    return parseFloat(price.replace(/[^\d.-]/g, ''));  // Remove any currency symbol and commas
}
function formatCurrency(amount, currency, locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency
    }).format(amount);
}


function updateOrderSummary(cartData) {
    const subtotal = cartData.subtotal; // Total price before tax
    const tax = cartData.totalTax; // GST
    const grandTotal = cartData.total; // Total price including tax

    // Update the billing details in the UI
    document.getElementById('total-price').innerHTML = `<strong>${formatCurrency(subtotal,cartData.currency,cartData.locale)}</strong>`;
    if(localStorage.getItem("user_region") === "india"){
        document.getElementById('gst-box').innerHTML = `<p class="mb-0"><small>GST (18.00%)</small></p><small>${formatCurrency(tax,cartData.currency,cartData.locale)}</small>`;
        
         
    }
    
    document.getElementById('grand-total').textContent = `${formatCurrency(grandTotal,cartData.currency,cartData.locale)}`;
}


// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
    let hasBook
    try {
        // Fetch and render cart items when the page loads

        const checkoutDetails = await CartService.getCheckoutDetails();
        console.log(checkoutDetails);
        hasBook = checkoutDetails.items.some((item) => item.optionTitle === "Books");
        
        if (checkoutDetails) {
            // Populate UI with checkout details
            renderCartItems(checkoutDetails); // Populate items
            updateOrderSummary(checkoutDetails);    // Update totals
        }
    } catch (error) {
        console.error('Error fetching cart data:', error);
        showMessage('Failed to load cart data. Please try again later.', 'tomato');
        
    }

    

    const billingForm = document.getElementById("billing-form");
    const shippingForm = document.getElementById("shipping-form");
    const placeOrderButton = document.getElementById("place-order");
    loadFormDataFromCookies("billing-form");

    // Show or hide the shipping form based on whether a book is in the cart
    const shippingInfoCard = document.getElementById("shipping-info-card");
    if (hasBook) {
      shippingInfoCard.classList.remove("d-none");
      loadFormDataFromCookies("shipping-form");
    } else {
      shippingInfoCard.classList.add("d-none");
    }
  
    // Function to validate form fields
    function validateForm(form) {
      const inputs = form.querySelectorAll("input[required]");
      for (const input of inputs) {
        if (!input.value.trim()) {
          return false;
        }
      }
      return true;
    }
  
    // Function to handle form validation and button state
    function handleValidation() {
      const isBillingValid = validateForm(billingForm);
      const isShippingValid = hasBook ? validateForm(shippingForm) : true;
  
      if (isBillingValid && isShippingValid) {
        placeOrderButton.disabled = false;
      } else {
        placeOrderButton.disabled = true;
      }
    }
  
    // Add input event listeners for real-time validation
    billingForm.addEventListener("input", handleValidation);
    if (hasBook) {
      shippingForm.addEventListener("input", handleValidation);
    }
  
    // Initial validation check
    handleValidation();
  
     // Handle the "Place Your Order" button click event
     document.getElementById("place-order").addEventListener("click", () => {
        // Save form data to cookies on placing the order
        saveFormDataToCookies("billing-form");
        if (hasBook) {
            saveFormDataToCookies("shipping-form");
        }
        initiatePayment();
    });
});

// Render cart items dynamically using Handlebars.js
function renderCartItems(cartData) {
    const templateSource = document.getElementById("cart-items-template").innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template({ cartItems: cartData.items });
    document.getElementById("product-list").innerHTML = html;
}

// Calculate and update subtotal, shipping, tax, and total amounts
function calculateTotals(cartData) {
    let subtotal = cartData.items.reduce((acc, item) => acc + item.totalPrice, 0);
    let shipping = 50; // Flat shipping rate
    let tax = subtotal * 0.05; // 5% tax
    let total = subtotal + shipping + tax;

    document.getElementById("subtotal").textContent = `₹${subtotal}`;
    document.getElementById("tax").textContent = `₹${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `₹${total.toFixed(2)}`;
}

// On Checkout Page
// ek
async function initiatePayment() {
    console.log("Initiating payment...");

    try {
        const { type, value } = getSessionIdentifier(); // Get userId or guestId
        const totalAmount = document.getElementById("grand-total").textContent.replace(/[^\d.-]/g, '');

        // Prepare payload
        const payload = {
            amount: parseFloat(totalAmount),
            [type]: value
        };

        // Attach guestInfo if type is guestId
        if (type === "guestId") {
            payload.guestInfo = {
                name: document.getElementById("billingFullName").value,
                email: document.getElementById("billingEmail").value,
                phone: document.getElementById("billingPhone").value,
                address: document.getElementById("billingAddress")?.value || ""
            };
        }

        const orderResponse = await httpService.post('/api/order/create', payload);

        if (orderResponse && orderResponse.data) {
            const options = {
                key: orderResponse.data.key_id,
                amount: orderResponse.data.amount,
                currency: orderResponse.data.currency,
                name: 'Ducisgroup',
                description: 'Payment for your order',
                order_id: orderResponse.data.id,
                handler: async function (razorpayResponse) {
                    showMessage('Payment successful!', 'lightgreen');

                    const verifyPayload = {
                        razorpay_order_id: razorpayResponse.razorpay_order_id,
                        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                        razorpay_signature: razorpayResponse.razorpay_signature,
                        [type]: value,
                        orderId: orderResponse.orderId
                    };

                    const verificationRes = await httpService.post('/api/payment/verify', verifyPayload);

                    if (verificationRes && verificationRes.success) {
                        showMessage('Order placed successfully!', 'lightgreen');
                        window.location.href = `./orderPlaced.html?orderId=${verificationRes.order._id}`;
                    } else {
                        showMessage('Failed to place order. Please contact support.', 'tomato');
                    }
                },
                prefill: {
                    name: document.getElementById("billingFullName").value,
                    email: document.getElementById("billingEmail").value,
                    contact: document.getElementById("billingPhone").value
                },
                theme: {
                    color: '#F37254'
                }
            };

            const razorpay = new Razorpay(options);
            razorpay.open();
        } else {
            showMessage('Failed to initiate payment. Please try again.', 'tomato');
        }
    } catch (error) {
        console.error('Error initiating payment:', error);
        showMessage('Error initiating payment. Please try again.', 'tomato');
    }
}


// Function to create and display messages dynamically
function showMessage(message, color) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.backgroundColor = color;
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '15px 30px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000';
    document.body.appendChild(messageDiv);
  
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 2000);
  }
