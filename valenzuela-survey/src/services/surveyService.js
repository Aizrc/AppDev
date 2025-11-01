import api from './api';

export const surveyService = {
  // Get all active surveys
  async getAllSurveys() {
    try {
      return await api.get('/surveys');
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch surveys');
    }
  },

  // Get survey by ID
  async getSurveyById(id) {
    try {
      return await api.get(`/surveys/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch survey');
    }
  },

  // Get survey questions
  async getSurveyQuestions(id) {
    try {
      return await api.get(`/surveys/${id}/questions`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch questions');
    }
  },

  // Create survey (Admin only)
  async createSurvey(surveyData) {
    try {
      return await api.post('/surveys', surveyData, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to create survey');
    }
  },

  // Update survey (Admin only)
  async updateSurvey(id, surveyData) {
    try {
      return await api.put(`/surveys/${id}`, surveyData, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to update survey');
    }
  },

  // Delete survey (Admin only)
  async deleteSurvey(id) {
    try {
      return await api.delete(`/surveys/${id}`, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete survey');
    }
  },

  // Add question to survey (Admin only)
  async addQuestion(surveyId, questionData) {
    try {
      return await api.post(`/surveys/${surveyId}/questions`, questionData, true);
    } catch (error) {
      throw new Error(error.message || 'Failed to add question');
    }
  },
};

export default surveyService;
