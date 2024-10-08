import { HttpService } from "./HttpService.js"; // Ensure you import your HttpService class
import { CartService } from './CartService.js'; // Import CartService for pushing local cart items

class AuthService {
    constructor(httpService) {
        this.httpService = httpService;
    }

    // Login Method
    async login(email, password) {
        try {
            const response = await this.httpService.post('/api/auth/login', { email, password });

            if (!response) {
                throw new Error('Login failed');
            }

            // Assuming response contains { token, cartId, userId }
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);

            console.log('Login successful:', response);

            // Push any local cart items to the database
            await CartService.pushLocalCartToDatabase(response.userId);

            window.location.href = "./offering.html";
            return response; // Return the user data for further processing

        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error('Login failed. Please check your credentials.');
        }
    }

    // Registration Method
    async register(password, confirmPassword, email) {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        try {
            const response = await this.httpService.post('/api/auth/register', { password, email });

            if (!response) {
                throw new Error('Registration failed');
            }

            console.log('Registration successful:', response);
            window.location.href = "./checkEmail.html";
            return response; // Return the success message or user data
        } catch (error) {
            console.error('Error registering:', error);
            throw new Error('Registration failed. Please try again.');
        }
    }

    // Logout Method
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId'); // Keep this as cartId is commented out
        console.log('User logged out');
        window.location.href = "./login.html"; // Optionally redirect to login page
    }

    // Method to check if the user is authenticated
    isAuthenticated() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            // Optionally, decode the JWT and check the expiration
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    }
}

// Create an instance of HttpService and pass it to AuthService
const httpService = new HttpService('https://unbelong.in');
const authService = new AuthService(httpService);

export default authService;
