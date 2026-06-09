import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type {
  TimePerspectiveCategoryResponse,
  CreateTimePerspectiveCategoryRequest,
  UpdateTimePerspectiveCategoryRequest,
} from '../types';

export const timePerspectiveCategoriesApi = {
  getAll: async (): Promise<TimePerspectiveCategoryResponse[]> => {
    const response = await apiClient.get<TimePerspectiveCategoryResponse[]>(
      ENDPOINTS.timePerspectiveCategories.base
    );
    return response.data;
  },

  getById: async (id: number): Promise<TimePerspectiveCategoryResponse> => {
    const response = await apiClient.get<TimePerspectiveCategoryResponse>(
      ENDPOINTS.timePerspectiveCategories.byId(id)
    );
    return response.data;
  },

  create: async (data: CreateTimePerspectiveCategoryRequest): Promise<void> => {
    await apiClient.post(ENDPOINTS.timePerspectiveCategories.admin, data);
  },

  update: async (id: number, data: UpdateTimePerspectiveCategoryRequest): Promise<void> => {
    await apiClient.patch(ENDPOINTS.timePerspectiveCategories.adminById(id), data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.timePerspectiveCategories.adminById(id));
  },
};
