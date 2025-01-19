import { CartService } from "./CartService.js";

export class UIService {
    static updateCartSummary(cartItems) {
        const subtotal = cartItems.reduce((total, item) => total + item.total, 0);
        const shipping = 5.00;
        const tax = 0.05 * subtotal;
        const total = subtotal + shipping + tax;

        document.querySelector('.card-text').textContent = `You have ${cartItems.length} items in your cart.`;
        document.querySelector('.list-unstyled').innerHTML = `
            
                        
            <li class="d-flex justify-content-between"><strong>Total:</strong> $${total.toFixed(2)}</li>
        `;
    }

    static registerHandlebarsHelpers() {
        Handlebars.registerHelper('calculateTotal', function (price, quantity) {
            return (price * quantity).toFixed(2);  // Use the actual price from the product options and multiply it by quantity
        });
    }

    static formatCurrency(amount, currency, locale = "en-US") {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency
        }).format(amount);
    }


    static async renderCartTemplate(cartData, fullCartData) {
        const cartItems = cartData.map(item => {
            // Find the selected training option within productDetails based on optionTitl       
            let itemPrice = UIService.formatCurrency(item.price, fullCartData.currency, fullCartData.locale)
            let totalItemPrice = UIService.formatCurrency(item.totalPrice, fullCartData.currency, fullCartData.locale)
            return {
                id: item.productDetails.product_id,
                name: item.productDetails.title,  // Use the product title from productDetails
                type: item.optionTitle,           // The option title (e.g., "Books", "elearning + Exam bundle")
                price: itemPrice,                     // Price based on region_price
                quantity: item.quantity,          // Quantity
                totalPrice: totalItemPrice,  // Calculate the total price for this item
                image: item.productDetails.image  // Use the image if needed in the template
            };
        });

        // Calculate subtotal by summing all item total prices
        const subtotal = cartItems.reduce((total, item) => {
            console.log(total,item.totalPrice);
            
            return total + parseFloat(item.totalPrice.replace(/[^\d.-]/g, ''));
        }, 0).toFixed(2);

        const shipping = 5.00;  // Fixed shipping cost
        const tax = (0.05 * subtotal).toFixed(2);  // 5% tax
        console.log(subtotal);
        
        const total = UIService.formatCurrency(parseFloat(subtotal).toFixed(2), fullCartData.currency, fullCartData.locale);
        console.log(total);
        

        // Compile the Handlebars template
        const template = Handlebars.compile(document.getElementById('cart-template').innerHTML);

        // Generate the HTML
        const html = template({
            cartItems,
            subtotal,
            shipping,
            tax,
            total
        });

        // Inject the HTML into the body or specific cart container
        document.body.innerHTML = html;


    }


}
