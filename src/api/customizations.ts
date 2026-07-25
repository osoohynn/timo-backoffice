import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type {
  AdminCustomizationItemResponse,
  AdminCustomizationItemDetailResponse,
  CreateCustomizationItemRequest,
  UpdateCustomizationItemRequest,
} from '../types';

export const customizationsApi = {
  getAll: async (): Promise<AdminCustomizationItemResponse[]> => {
    const response = await apiClient.get<AdminCustomizationItemResponse[]>(ENDPOINTS.customizations.admin);
    return response.data;
  },

  getById: async (id: number): Promise<AdminCustomizationItemDetailResponse> => {
    const response = await apiClient.get<AdminCustomizationItemDetailResponse>(ENDPOINTS.customizations.adminById(id));
    return response.data;
  },

  create: async (data: CreateCustomizationItemRequest): Promise<void> => {
    await apiClient.post(ENDPOINTS.customizations.admin, data);
  },

  update: async (id: number, data: UpdateCustomizationItemRequest): Promise<void> => {
    await apiClient.patch(ENDPOINTS.customizations.adminById(id), data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.customizations.adminById(id));
  },
};
