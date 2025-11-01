import { API_BASE_URL } from '../utils/constants';

// API Helper class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from sessionStorage
  getAuthToken() {
    return sessionStorage.getItem('authToken');
  }

  // Common headers
  getHeaders(includeAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Generic request handler
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: this.getHeaders(options.authenticated),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, authenticated = false) {
    return this.request(endpoint, {
      method: 'GET',
      authenticated,
    });
  }

  // POST request
  async post(endpoint, data, authenticated = false) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      authenticated,
    });
  }

  // PUT request
  async put(endpoint, data, authenticated = false) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      authenticated,
    });
  }

  // DELETE request
  async delete(endpoint, authenticated = false) {
    return this.request(endpoint, {
      method: 'DELETE',
      authenticated,
    });
  }
}

export default new ApiService();
