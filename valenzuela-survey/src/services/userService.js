import api from './api';

export const userService = {
  // Get all users (Admin only)
  async getAllUsers() {
    try {
      return await api.get('/users', true);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      return await api.get(`/users/${id}`, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user');
    }
  },

  // Update user
  async updateUser(id, userData) {
    try {
      return await api.put(`/users/${id}`, userData, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to update user');
    }
  },

  // Delete user (Super Admin only)
  async deleteUser(id) {
    try {
      return await api.delete(`/users/${id}`, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user');
    }
  },
};

export default userService;
