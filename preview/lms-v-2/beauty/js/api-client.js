// apiClient.js
import BASE_URL from './config.js'; // You already have this in config.js

let isRefreshing = false;
let failedQueue = [];

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

function setTokens({ accessToken, refreshToken }) {
  localStorage.setItem('access_token', accessToken);
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
}

function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

// function handleUnauthorized() {
//   alert('Session expired. Please login again.');
//   clearTokens();
//   window.location.href = '/index.html';
// }

// Retry queue management
function processQueue(error, token = null) {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
}

function request(endpoint, method = 'GET', body = null, customHeaders = {}, retry = true) {
  const token = getAccessToken();
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }), // only add if NOT FormData
    ...customHeaders,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
  };

  return fetch(`${BASE_URL}${endpoint}`, options).then(async res => {
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const error = new Error(data.message || `Error ${res.status}`);
      error.status = res.status;
      throw error;
    }

    return data;
  });
}


// Token refresh logic
function handleTokenRefresh() {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  return fetch(`${BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: getRefreshToken() })
  })
    .then(res => res.json())
    .then(data => {
      if (data.accessToken) {
        setTokens(data);
        processQueue(null, data.accessToken);
        return data.accessToken;
      } else {
        throw new Error('Failed to refresh token');
      }
    })
    .catch(err => {
      processQueue(err, null);
      handleUnauthorized();
      throw err;
    })
    .finally(() => {
      isRefreshing = false;
    });
}

// Shorthand methods
export function get(endpoint, headers) {
  return request(endpoint, 'GET', null, headers);
}

export function post(endpoint, body, headers) {
  return request(endpoint, 'POST', body, headers);
}

export function put(endpoint, body, headers) {
  return request(endpoint, 'PUT', body, headers);
}

export function del(endpoint, headers) {
  return request(endpoint, 'DELETE', null, headers);
}
