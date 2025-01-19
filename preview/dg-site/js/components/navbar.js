document.addEventListener('DOMContentLoaded', () => {
    // Replace logout button with profile button
    const logoutButton = document.getElementById("logoutNav");
    if (logoutButton) {
        const profileButton = document.createElement("a");
        profileButton.id = "profile";
        profileButton.classList.add("mx-4")
        profileButton.href = "./userProfile.html";
        profileButton.innerHTML = `<i id="nav-icon" class="fa fa-user" aria-hidden="true"></i>`;
        logoutButton.parentNode.replaceChild(profileButton, logoutButton);
        console.log("Logout button replaced with profile button.");
    } else {
        console.warn("Logout button not found in the DOM.");
    }

    // Manage navbar visibility based on auth token
    const authToken = localStorage.getItem('token');
    const loginNav = document.getElementById('loginNav');
    const profileNav = document.getElementById('profile');

    if (loginNav && profileNav) {
        if (authToken) {
            loginNav.style.display = 'none';
            profileNav.style.display = 'block';
        } else {
            loginNav.style.display = 'block';
            profileNav.style.display = 'none';
        }
    } else {
        console.warn("'loginNav' or 'profile' element not found in the DOM.");
    }
});

// Logout function
function logout() {
    localStorage.removeItem('token');
    const loginNav = document.getElementById('loginNav');
    const profileNav = document.getElementById('profile');
    if (loginNav && profileNav) {
        loginNav.style.display = 'block';
        profileNav.style.display = 'none';
    }
    // Redirect the user
    window.location.href = './auth.html';
}
