document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    const username = sessionStorage.getItem('username');
    console.log('Loaded username from sessionStorage:', username);

    if (username) {
        document.getElementById('username').textContent = username;
    } else {
        console.log('Username not found in sessionStorage');
        document.getElementById('username').textContent = 'Username not found';
    }
});
