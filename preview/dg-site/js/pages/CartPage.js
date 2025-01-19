import { CartService } from '../services/CartService.js';
import { UIService } from '../services/CartUIService.js';
import loader from '../Utils/Loader.js';

document.addEventListener('DOMContentLoaded', async () => {
    const addToCartBtn = document.getElementById('addToCartBtn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('productId');

            if (!productId) {
                console.error('Product ID not found in the URL.');
                return;
            }

            try {
                loader.show()
                const cartId = localStorage.getItem('cartId') || await CartService.createCart();
                await CartService.addCartItem(cartId, productId, 1);
                loader.hide()
                showMessage('Item added to cart successfully!', 'lightgreen');
            } catch (error) {
                loader.hide()
                console.error('Error adding item to cart:', error);
                showMessage('Failed to add item to cart.', 'tomato');
            }
        });
    }

    // const cartId = localStorage.getItem('cartId');

    try {
        const cartItems = await CartService.getCartItems();
        UIService.registerHandlebarsHelpers();
        await UIService.renderCartTemplate(cartItems.items,cartItems);


        // Register event listeners for increase and decrease buttons
        document.querySelectorAll('.increase-quantity').forEach((button) => {
            button.addEventListener('click', async (event) => {
                const productId = event.target.closest('button').dataset.id;
                const optionTitle = event.target.closest('button').dataset.type;
                const userId = localStorage.getItem('userId');

                if (!userId) {
                    showMessage('Please log in to modify your cart.', 'tomato');
                    return;
                }

                try {
                    loader.show()
                    await CartService.increaseCartItem(userId, productId, optionTitle);
                    loader.hide()
                    // Update UI manually
                    // const quantityInput = document.querySelector(
                    //     `.quantity-input[data-id="${productId}"][data-type="${optionTitle}"]`
                    // );
                    // const totalCell = document.querySelector(
                    //     `.total-price[data-id="${productId}"][data-type="${optionTitle}"]`
                    // );
                    window.location.reload()
                    // const currentQuantity = parseInt(quantityInput.value, 10);
                    // const unitPrice = parseFloat(
                    //     document.querySelector(
                    //         `.unit-price[data-id="${productId}"][data-type="${optionTitle}"]`
                    //     ).textContent.replace(/[^\d.]/g, '')
                    // );

                    // // Update quantity and total price
                    // quantityInput.value = currentQuantity + 1;
                    // totalCell.textContent = `₹ ${(unitPrice * (currentQuantity + 1)).toFixed(2)}`;
                } catch (error) {
                    console.error('Error increasing item quantity:', error);
                }
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach((button) => {
            button.addEventListener('click', async (event) => {
                const productId = event.target.closest('button').dataset.id;
                const optionTitle = event.target.closest('button').dataset.type;
                const userId = localStorage.getItem('userId');

                if (!userId) {
                    showMessage('Please log in to modify your cart.', 'tomato');
                    return;
                }

                try {
                    loader.show()
                    await CartService.decreaseCartItem(userId, productId, optionTitle);
                    loader.hide()
                    // Update UI manually
                    const quantityInput = document.querySelector(
                        `.quantity-input[data-id="${productId}"][data-type="${optionTitle}"]`
                    );
                    const totalCell = document.querySelector(
                        `.total-price[data-id="${productId}"][data-type="${optionTitle}"]`
                    );

                    const currentQuantity = parseInt(quantityInput.value, 10);
                    const unitPrice = parseFloat(
                        document.querySelector(
                            `.unit-price[data-id="${productId}"][data-type="${optionTitle}"]`
                        ).textContent.replace(/[^\d.]/g, '')
                    );
                    window.location.reload()
                    if (currentQuantity > 1) {
                        // Update quantity and total price
                        quantityInput.value = currentQuantity - 1;
                        totalCell.textContent = `₹ ${(unitPrice * (currentQuantity - 1)).toFixed(2)}`;
                    } else {
                        // Remove the item from the UI if quantity becomes 0
                        const row = quantityInput.closest('tr');
                        row.parentNode.removeChild(row);
                    }
                } catch (error) {
                    console.error('Error decreasing item quantity:', error);
                }
            });
        });

    } catch (error) {
        console.error('Error fetching or rendering cart items:', error);
    }

    // Add event listeners to the remove buttons
    document.querySelectorAll(".remove-item-btn").forEach(button => {
        button.addEventListener("click", async (event) => {
            const productId = event.target.getAttribute("data-id");
            const optionTitle = event.target.getAttribute("data-type");  // this is now the optionTitle
            const userId = localStorage.getItem("userId");

            try {
                await CartService.removeCartItem(userId, productId, optionTitle);
                showMessage('Item removed successfully!', 'lightgreen');

                // Re-fetch and render the updated cart
                const updatedCart = await CartService.getCartItems();
                console.log(updatedCart);

                window.location.reload()
            } catch (error) {
                console.error("Error removing item from cart:", error);
                showMessage('Failed to remove item.', 'tomato');
            }
        });
    });
});


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