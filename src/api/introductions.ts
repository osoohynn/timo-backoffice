import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type {
  IntroductionResponse,
  CreateIntroductionRequest,
  UpdateIntroductionRequest,
} from '../types';

export const introductionsApi = {
  getAll: async (): Promise<IntroductionResponse[]> => {
    const response = await apiClient.get<IntroductionResponse[]>(
      ENDPOINTS.introductions.admin
    );
    return response.data;
  },

  create: async (data: CreateIntroductionRequest): Promise<void> => {
    await apiClient.post(ENDPOINTS.introductions.admin, data);
  },

  update: async (version: number, data: UpdateIntroductionRequest): Promise<void> => {
    await apiClient.patch(ENDPOINTS.introductions.adminByVersion(version), data);
  },

  delete: async (version: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.introductions.adminByVersion(version));
  },
};
