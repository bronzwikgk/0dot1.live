export class UIService {
    static updateCartSummary(cartItems) {
        const subtotal = cartItems.reduce((total, item) => total + item.total, 0);
        const shipping = 5.00;
        const tax = 0.05 * subtotal;
        const total = subtotal + shipping + tax;

        document.querySelector('.card-text').textContent = `You have ${cartItems.length} items in your cart.`;
        document.querySelector('.list-unstyled').innerHTML = `
            <li class="d-flex justify-content-between"><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</li>
            <li class="d-flex justify-content-between"><strong>Shipping:</strong> $${shipping.toFixed(2)}</li>
            <li class="d-flex justify-content-between"><strong>Tax:</strong> $${tax.toFixed(2)}</li>
            <li class="d-flex justify-content-between"><strong>Total:</strong> $${total.toFixed(2)}</li>
        `;
    }

    static registerHandlebarsHelpers() {
        Handlebars.registerHelper('calculateTotal', function (price, quantity) {
            return (price * quantity).toFixed(2);  // Use the actual price from the product options and multiply it by quantity
        });
    }
    

    static async renderCartTemplate(cartData) {
        console.log(cartData);
        
        const cartItems = cartData.map(item => {
            // Find the selected training option within productDetails based on optionTitle
            const selectedOption = item.productDetails.trainingOptions.find(option => option.title === item.optionTitle);
            
            // If no selectedOption is found, handle the error case gracefully (fallback or default)
            const price = parseFloat(item.region_price.replace(/[^\d.-]/g, '')); // Extract numeric price
            return {
                id:item.productDetails.product_id,
                name: item.productDetails.title,  // Use the product title from productDetails
                type: item.optionTitle,           // The option title (e.g., "Books", "elearning + Exam bundle")
                price: price,                     // Price based on region_price
                quantity: item.quantity,          // Quantity
                totalPrice: (price * item.quantity).toFixed(2),  // Calculate the total price for this item
                image: item.productDetails.image  // Use the image if needed in the template
            };
        });
    
        // Calculate subtotal by summing all item total prices
        const subtotal = cartItems.reduce((total, item) => {
            return total + parseFloat(item.totalPrice);
        }, 0).toFixed(2);
    
        const shipping = 5.00;  // Fixed shipping cost
        const tax = (0.05 * subtotal).toFixed(2);  // 5% tax
        const total = (parseFloat(subtotal) + shipping + parseFloat(tax)).toFixed(2);
    
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
