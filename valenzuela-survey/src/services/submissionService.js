import api from './api';
import firebaseService from './firebaseService';

const useFirebase = import.meta.env.VITE_USE_FIREBASE === 'true';

/**
 * submitSurvey(payload)
 * - If VITE_USE_FIREBASE=true and firebase initialized, store in Firestore
 * - Otherwise fallback to REST API (/submissions)
 */
async function submitSurvey(payload) {
  if (useFirebase) {
    try {
      return await firebaseService.submitSurvey(payload);
    } catch (err) {
      // fallback to REST if firebase fails
      // eslint-disable-next-line no-console
      console.warn('Firebase submit failed, falling back to API:', err);
    }
  }

  // Fallback: existing REST API call
  // Expectation: api.post exists and points to backend endpoint for submissions
  return api.post('/submissions', payload);
}

export const submissionService = {
  // Submit survey
  async submitSurvey(submissionData) {
    try {
      return await submitSurvey(submissionData);
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
