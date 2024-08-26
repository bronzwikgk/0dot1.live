document.addEventListener('DOMContentLoaded', () => {
    const authToken = localStorage.getItem('token');

    if (authToken) {
        // User is logged in
        document.getElementById('loginNav').style.display = 'none';
        document.getElementById('logoutNav').style.display = 'block';
    } else {
        // User is not logged in
        document.getElementById('loginNav').style.display = 'block';
        document.getElementById('logoutNav').style.display = 'none';
    }
});

function logout() {
    localStorage.removeItem('token');
    // Update the navbar
    document.getElementById('loginNav').style.display = 'block';
    document.getElementById('logoutNav').style.display = 'none';

    // Optionally, you can redirect the user to a specific page
    window.location.href = './auth.html';
}
