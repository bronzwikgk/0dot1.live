export function logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');

    if (window.showToast) {
        showToast('You have been logged out.', 'info');
    }

    setTimeout(() => window.location.href = '/index.html', 1000); // Adjust login path as needed
}

// Auto-bind logout button if present
export function setupLogout() {
    const logoutBtn = document.getElementById('signout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
}
