import api from './api';

export const suggestionService = {
  // Create suggestion
  async createSuggestion(suggestionData) {
    try {
      return await api.post('/suggestions', suggestionData, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to submit suggestion');
    }
  },

  // Get all suggestions (Admin only)
  async getAllSuggestions() {
    try {
      return await api.get('/suggestions', true);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch suggestions');
    }
  },

  // Get user suggestions
  async getUserSuggestions(userId) {
    try {
      return await api.get(`/suggestions/user/${userId}`, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user suggestions');
    }
  },
};

export default suggestionService;
