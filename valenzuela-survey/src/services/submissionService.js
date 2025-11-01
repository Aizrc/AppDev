import api from './api';

export const submissionService = {
  // Submit survey
  async submitSurvey(submissionData) {
    try {
      return await api.post('/submissions', submissionData, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to submit survey');
    }
  },

  // Get all submissions (Admin only)
  async getAllSubmissions() {
    try {
      return await api.get('/submissions', true);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch submissions');
    }
  },

  // Get user submissions
  async getUserSubmissions(userId) {
    try {
      return await api.get(`/submissions/user/${userId}`, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user submissions');
    }
  },

  // Get submission by ID
  async getSubmissionById(id) {
    try {
      return await api.get(`/submissions/${id}`, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch submission');
    }
  },
};

export default submissionService;
