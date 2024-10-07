// Function to handle user login
async function loginUser(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://68.183.94.77/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Login successful', data);

        // Handle successful login (e.g., redirect to another page or save token)
        // For example:
        localStorage.setItem('token', data.token);
        localStorage.setItem("cartId",data.cartId);
        localStorage.setItem("userId",data.userId)
        window.location.href = './offering.html';

    } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
}

// Function to handle user registration
async function registerUser(event) {
    event.preventDefault(); // Prevent default form submission behavior

    
    const password = document.getElementById('reg-password').value;
    const email = document.getElementById('reg-email').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please check and try again.');
        return;
    }

    try {
        const response = await fetch('https://68.183.94.77/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, email }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        console.log(data);
        if (data.message === "User registered successfully. Please check your email to verify your account.") {
            console.log('Registration successful');
            document.getElementById("login-form-container").style.display = "block";
            document.getElementById("signup-form-container").style.display = "none";
        }

        // Handle successful registration (e.g., redirect to login page)
        // For example:
        // window.location.href = 'login.html';

    } catch (error) {
        console.error('Error registering:', error);
        alert('Registration failed. Please check your details and try again.');
    }
}

// Event listeners for login and registration forms
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }
});
