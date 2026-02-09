import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type {
  FeedbackPromptResponse,
  FeedbackPromptDetailResponse,
  CreateFeedbackPromptRequest,
  UpdateFeedbackPromptRequest,
} from '../types';

export const feedbackPromptsApi = {
  getAll: async (): Promise<FeedbackPromptResponse[]> => {
    const response = await apiClient.get<FeedbackPromptResponse[]>(
      ENDPOINTS.feedbackPrompts.base
    );
    return response.data;
  },

  getByVersion: async (version: number): Promise<FeedbackPromptDetailResponse> => {
    const response = await apiClient.get<FeedbackPromptDetailResponse>(
      ENDPOINTS.feedbackPrompts.byVersion(version)
    );
    return response.data;
  },

  create: async (data: CreateFeedbackPromptRequest): Promise<void> => {
    await apiClient.post(ENDPOINTS.feedbackPrompts.base, data);
  },

  update: async (version: number, data: UpdateFeedbackPromptRequest): Promise<void> => {
    await apiClient.patch(ENDPOINTS.feedbackPrompts.byVersion(version), data);
  },

  delete: async (version: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.feedbackPrompts.byVersion(version));
  },
};
