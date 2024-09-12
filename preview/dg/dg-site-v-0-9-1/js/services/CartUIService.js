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
            const priceValue = parseFloat(price.replace(/[^0-9.-]+/g, ""));
            return (priceValue * quantity).toFixed(2);
        });
    }

    static async renderCartTemplate(cartItems) {
        const subtotal = cartItems.reduce((total, item) => {
            const priceValue = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            return total + (priceValue * item.CartItem.quantity);
        }, 0).toFixed(2);

        const shipping = 5.00;
        const tax = (0.05 * subtotal).toFixed(2);
        const total = (parseFloat(subtotal) + shipping + parseFloat(tax)).toFixed(2);

        const template = Handlebars.compile(document.getElementById('cart-template').innerHTML);

        const html = template({
            cartItems,
            subtotal,
            shipping,
            tax,
            total
        });

        document.body.innerHTML = html;
    }
}
