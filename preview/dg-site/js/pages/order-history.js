import BASE_URL from "../config.js";


document.addEventListener("DOMContentLoaded", () => {


    async function displayOrderHistory() {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            console.error("User ID or Token not found in local storage.");
            return;
        }

        try {
            const apiUrl = `${BASE_URL}/api/orders-history/history/${userId}`;
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch order history. HTTP Status: ${response.status}`
                );
            }

            const { orders, success } = await response.json();

            if (!success || !orders || orders.length === 0) {
                document.getElementById(
                    "orderHistoryTable"
                ).innerHTML = `<tr><td colspan="6" class="text-center">No order history available.</td></tr>`;
                return;
            }

            const orderTableBody = document.getElementById("orderHistoryTable");
            orderTableBody.innerHTML = "";

            orders.forEach((order) => {
                const orderRow = document.createElement("tr");
                orderRow.innerHTML = `
            <td>${order._id}</td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            <td>${order.items
                        .map((item) => `${item.optionTitle} (x${item.quantity})`)
                        .join(", ")}</td>
            <td>₹${order.total.toFixed(2)}</td>
            <td>${order.paymentStatus}</td>
            <td>${order.status}</td>
            <td>
      <a href="./orderPlaced.html?orderId=${order._id
                    }" class="btn btn-sm btn-primary">View Order</a>
    </td>
          `;
                orderTableBody.appendChild(orderRow);
            });
        } catch (error) {
            console.error("Error fetching order history:", error);
            alert(
                "An error occurred while fetching order history. Please try again later."
            );
        }
    }

    // Automatically fetch order history on page load
    displayOrderHistory();
});



