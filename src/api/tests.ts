import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type { TestResponse, CreateTestRequest, UpdateTestRequest } from '../types';

export const testsApi = {
  getAll: async (): Promise<TestResponse[]> => {
    const response = await apiClient.get<TestResponse[]>(ENDPOINTS.tests.base);
    return response.data;
  },

  getById: async (testId: number): Promise<TestResponse> => {
    const response = await apiClient.get<TestResponse>(ENDPOINTS.tests.byId(testId));
    return response.data;
  },

  create: async (data: CreateTestRequest): Promise<void> => {
    await apiClient.post(ENDPOINTS.tests.admin, data);
  },

  update: async (testId: number, data: UpdateTestRequest): Promise<void> => {
    await apiClient.patch(ENDPOINTS.tests.adminById(testId), data);
  },

  delete: async (testId: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.tests.adminById(testId));
  },
};
