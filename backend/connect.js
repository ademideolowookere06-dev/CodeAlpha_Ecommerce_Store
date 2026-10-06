
const API_URL = "http://127.0.0.1:5000";

async function sendOrderToBackend(orderData) {
    try {
        const response = await fetch(`${API_URL}/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Order failed");
        }

        alert(
            `Order received successfully!\nYour Order ID is: ${result.order_id}`
        );

        return result;

    } catch (error) {
        console.error("Order error:", error);

        alert(
            "Unable to submit your order. Please try again."
        );

        return null;
    }
}
