
(function () {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('user_role')?.replace(/"/g, '');
    const currentPath = window.location.pathname;

    const publicPages = ['/index.html', '/register.html', '/register-success.html',"/"];
    const isPublicPage = publicPages.includes(currentPath);

    // 1. If not logged in, block private pages
    if (!token && !isPublicPage) {
        window.location.href = '/index.html';
        return;
    }

    // 2. If logged in and on a public page, redirect to dashboard
    if (token && isPublicPage) {
        if (role === 'Admin') {
            window.location.href = '/admin/dashboard-superadmin.html';
        } else if (role === 'Learner') {
            window.location.href = '/learner/dashboard-e-learner.html';
        } else {
            window.location.href = '/index.html'; // fallback
        }
    }
})();

