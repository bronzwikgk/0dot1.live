import { HttpService } from "./HttpService.js"; // Ensure you import your HttpService class

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
            // localStorage.setItem('cartId', response.cartId);
            localStorage.setItem('userId', response.userId);

            console.log('Login successful:', response);
            window.location.href = "./offering.html"
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
            window.location.href = "./checkEmail.html"
            return response; // Return the success message or user data
        } catch (error) {
            console.error('Error registering:', error);
            throw new Error('Registration failed. Please try again.');
        }
    }

    // Logout Method
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('cartId');
        localStorage.removeItem('userId');
        console.log('User logged out');
    }

    // Method to check if the user is authenticated
    isAuthenticated() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        // Optionally, decode the JWT and check the expiration
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
    }

}

// Create an instance of HttpService and pass it to AuthService
const httpService = new HttpService('https://68.183.94.77');
const authService = new AuthService(httpService);

export default authService;
