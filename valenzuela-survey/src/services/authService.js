import api from './api';

export const authService = {
  // Login
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.success && response.token) {
        // Store token and user data
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        
        return {
          success: true,
          user: response.user,
          token: response.token,
        };
      }
      
      return {
        success: false,
        error: response.message || 'Login failed',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed. Please try again.',
      };
    }
  },

  // Register
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.success && response.token) {
        // Store token and user data
        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        
        return {
          success: true,
          user: response.user,
          token: response.token,
        };
      }
      
      return {
        success: false,
        error: response.message || 'Registration failed',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Registration failed. Please try again.',
      };
    }
  },

  // Logout
  logout() {
    sessionStorage.clear();
    return { success: true };
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!sessionStorage.getItem('authToken');
  },

  // Get current user
  getCurrentUser() {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },
};

export default authService;
