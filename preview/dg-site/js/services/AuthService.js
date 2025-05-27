import { HttpService } from "./HttpService.js";
import { CartService } from './CartService.js';
import BASE_URL from '../config.js';
import loader from '../Utils/Loader.js';

class AuthService {
    constructor(httpService) {
        this.httpService = httpService;
    }

    // Helper function to clear authentication data
    clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('cartId');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
    }

    // Store token in localStorage or sessionStorage
    storeToken(token, userId, cartId, rememberMe = false) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('cartId', cartId);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
    }

    // Store token in cookies for 365 days
    storeTokenInCookie(token) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 365);
        document.cookie = `token=${token}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Strict`;
    }

    // Retrieve token from cookies
    getTokenFromCookie() {
        const nameEQ = 'token=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Clear token from cookies
    clearTokenFromCookie() {
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict`;
    }

    // Check if user is authenticated using cookies
    checkAuthFromCookies() {
        const token = this.getTokenFromCookie();
        if (token) {
            console.log('User is authenticated using token from cookies.');

            // Validate the token with the backend
            this.validateToken(token)
                .then((isValid) => {
                    if (isValid) {
                        console.log('Token validated successfully.');
                        // Optional: Redirect to dashboard or keep user logged in
                    } else {
                        console.log('Token validation failed. Logging out.');
                        this.logout();
                    }
                })
                .catch((error) => {
                    console.error('Error validating token:', error);
                    this.logout();
                });
        } else {
            console.log('No valid token found in cookies.');
            // Optional: Redirect to login page
            window.location.href = './auth.html';
        }
    }

    // Backend token validation
    async validateToken(token) {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/validate-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data.success || false;
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
        }
    }

    // Login Method
    async login(email, password) {
        // Validate input data
        if (!email || !password) {
            showMessage('Email and password are required.', 'tomato');
            throw new Error('Missing required fields: email or password');
        }

        const loginData = { email, password };

        try {
            loader.show();
            // Make the POST request using fetch
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            loader.hide();

            // Parse the response JSON
            const responseData = await response.json();

            // Check if the response is successful
            if (response.ok) {
                const { token, userId, cardId } = responseData;

                if (token && userId) {
                    console.log('Login successful:', responseData);

                    // Store the token in localStorage and cookies
                    this.storeToken(token, userId, cardId); // Store in localStorage
                    this.storeTokenInCookie(token); // Store in cookies

                    await CartService.pushLocalCartToDatabase(userId);

                    // Show success message and redirect
                    var messageDiv = document.createElement('div');
                    messageDiv.id = 'login-message';
                    messageDiv.textContent = 'Login successful! Redirecting...';
                    messageDiv.style.position = 'fixed';
                    messageDiv.style.top = '50%';
                    messageDiv.style.left = '50%';
                    messageDiv.style.transform = 'translate(-50%, -50%)';
                    messageDiv.style.backgroundColor = 'lightgreen';
                    messageDiv.style.padding = '40px';
                    messageDiv.style.borderRadius = '5px';
                    messageDiv.style.zIndex = '1000'; // Ensure it's on top
                    document.body.appendChild(messageDiv);

                    setTimeout(() => {
                        document.body.removeChild(messageDiv);
                        window.location.href = "./shop.html";
                    }, 1500);

                    return responseData;
                } else {
                    throw new Error('Invalid response format. Token or userId missing.');
                }
            } else {
                // Handle non-200 responses
                throw new Error(responseData.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            loader.hide();
            console.error('Error during login:', error);
            showMessage(error.message || 'An unexpected error occurred. Please try again later.', 'tomato');
            throw error;
        }
    }

    // Registration Method
    async register(name, country, phone, password, confirmPassword, email, termsAccepted) {
        // Validate input data
        if (!name || !country || !phone || !email || !password || !confirmPassword) {
            showMessage('All fields are required.', 'tomato');
            throw new Error('Missing required fields');
        }

        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', 'tomato');
            throw new Error('Passwords do not match');
        }

        if (!termsAccepted) {
            showMessage('You must accept the terms and conditions to register.', 'tomato');
            throw new Error('Terms not accepted');
        }

        const registrationData = { name, country, phone, password, email, termsAccepted };

        try {
            loader.show();
            // Make the POST request using fetch
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });
            loader.hide();

            // Check if the response is successful
            const responseData = await response.json();

            if (response.ok) {
                if (responseData.message === "Registration successful. Check your email to verify your account.") {
                    console.log('Registration successful:', responseData);
                    showMessage('Registration successful! Please check your email.', 'lightgreen');
                    window.location.href = "./checkEmail.html";
                    return responseData;
                } else {
                    throw new Error(responseData.message || 'Unexpected response from the server.');
                }
            } else {
                // Handle non-200 responses
                throw new Error(responseData.message || 'Registration failed. Please try again later.');
            }
        } catch (error) {
            loader.hide();
            console.error('Error during registration:', error);
            showMessage(error.message || 'An unexpected error occurred. Please try again later.', 'tomato');
            throw error;
        }
    }

    logout() {
        this.clearAuthData(); // Clear localStorage
    
        // Clear token from cookies
        this.clearTokenFromCookie();
        if (!this.getTokenFromCookie()) {
            console.log('Cookie cleared successfully.');
        } else {
            console.error('Failed to clear cookie.');
        }
    
        console.log('User logged out');
        window.location.href = "./html/auth.html"; // Redirect to login
    }

    clearTokenFromCookie() {
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; Secure`;
    }
    
    // Check if user is authenticated
    isAuthenticated() {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } catch (error) {
            console.error('Invalid token:', error);
            this.clearAuthData();
            return false;
        }
    }
}

// Function to create and display messages dynamically
function showMessage(message, color) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.backgroundColor = color;
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '15px 30px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000';
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 2000);
}

const httpService = new HttpService(BASE_URL);
const authService = new AuthService(httpService);

export default authService;
