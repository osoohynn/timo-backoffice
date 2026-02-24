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
      ENDPOINTS.introductions.base
    );
    return response.data;
  },

  create: async (data: CreateIntroductionRequest): Promise<void> => {
    await apiClient.post(ENDPOINTS.introductions.admin, data);
  },

  update: async (id: number, data: UpdateIntroductionRequest): Promise<void> => {
    await apiClient.patch(ENDPOINTS.introductions.adminById(id), data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.introductions.adminById(id));
  },
};
