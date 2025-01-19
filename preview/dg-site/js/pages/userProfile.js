import BASE_URL from "../config.js";

async function displayUserDetails() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID not found in local storage.");
    return;
  }

  try {
    const apiUrl = `${BASE_URL}/api/auth/user/${userId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 404) {
      console.error(
        "User not found. Check if the user ID exists in the database."
      );
      return;
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user details. HTTP Status: ${response.status}`
      );
    }

    const { user, success } = await response.json();

    if (!success || !user) {
      console.error(
        "Failed to retrieve user details. Ensure the user exists."
      );
      return;
    }

    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userContact").textContent = user.phone;
    document.getElementById("userAddress").textContent = user.country;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

window.addEventListener("DOMContentLoaded", displayUserDetails);

