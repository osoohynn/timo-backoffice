import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type { LoginRequest } from '../types';

export const authApi = {
  login: async (data: LoginRequest): Promise<void> => {
    await apiClient.post(ENDPOINTS.auth.login, data);
  },

  reissue: async (): Promise<void> => {
    await apiClient.post(ENDPOINTS.auth.reissue);
  },

  logout: async (): Promise<void> => {
    await apiClient.post(ENDPOINTS.auth.logout);
  },

  me: async () => {
    const response = await apiClient.get(ENDPOINTS.auth.me);
    return response.data;
  },
};
