import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type { LoginRequest, TokenResponse } from '../types';

export const authApi = {
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>(ENDPOINTS.auth.login, data);
    return response.data;
  },

  reissue: async (refreshToken: string): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>(ENDPOINTS.auth.reissue, {
      refreshToken,
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(ENDPOINTS.auth.logout);
  },
};
