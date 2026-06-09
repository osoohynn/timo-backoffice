import apiClient from './client';
import { ENDPOINTS } from './endpoints';

export const reflectionsApi = {
  deleteReflection: async (reflectionId: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.reflections.adminById(reflectionId));
  },

  deleteReflectionFeedback: async (feedbackId: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.reflections.adminFeedbackById(feedbackId));
  },
};
