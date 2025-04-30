function updateProfileInfo() {
    // Get user info from localStorage
    const userName = JSON.parse(localStorage.getItem('user_name')) || 'Guest User';
    const userEmail = JSON.parse(localStorage.getItem('user_email')) || 'guest@example.com';

    // Find profile elements
    const profileNameElements = document.querySelectorAll('.profile-name');
    const profileEmailElements = document.querySelectorAll('.profile-email');

    // Update all instances of name and email
    profileNameElements.forEach(element => {
        element.textContent = userName;
    });

    profileEmailElements.forEach(element => {
        element.textContent = userEmail;
    });
}



// Export for use in other files
export { updateProfileInfo };