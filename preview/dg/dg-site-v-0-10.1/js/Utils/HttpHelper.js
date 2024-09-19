export class HttpService {
    constructor(baseURL = '', defaultHeaders = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = defaultHeaders;
    }

    initialize(app) {
        this.app = app;
    }

    // Core HTTP Methods with convenience functions
    async get(url, headers = {}) {
        return this.request(url, 'GET', null, headers);
    }

    async post(url, data, headers = {}) {
        return this.request(url, 'POST', data, headers);
    }

    async put(url, data, headers = {}) {
        return this.request(url, 'PUT', data, headers);
    }

    async delete(url, headers = {}) {
        return this.request(url, 'DELETE', null, headers);
    }

    // Main request method with improved error handling, global config, timeout, and request cancellation
    async request(url, method = 'GET', data = null, headers = {}, timeoutDuration = 5000) {
        // Merge global headers with request-specific headers
        headers = {
            "Content-Type": "application/json",
            'Authorization': localStorage.getItem("token") ? localStorage.getItem("token") : "",
            ...this.defaultHeaders,
            ...headers
        };

        // Prepend baseURL if provided
        url = `${this.baseURL}${url}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

        try {
            console.log(`Requesting: ${url}`);
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: method !== 'GET' ? JSON.stringify(data) : null,
                signal: controller.signal // Support for request cancellation
            });

            clearTimeout(timeoutId); // Clear timeout once request is done

            // Improved error handling
            if (!response.ok) {
                const text = await response.text();
                throw {
                    status: response.status,
                    statusText: response.statusText,
                    body: text
                };
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Request timed out or was canceled:', error);
            } else {
                console.error("Error making API request:", error);
            }
            return null;
        }
    }
}

const api = new HttpService('http://localhost:3000');

export default api