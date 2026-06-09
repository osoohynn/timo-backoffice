import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type { GroupResponse, CreateGroupRequest } from '../types';

export const groupsApi = {
  getAll: async (): Promise<GroupResponse[]> => {
    const response = await apiClient.get<GroupResponse[]>(ENDPOINTS.groups.base);
    return response.data;
  },

  getById: async (id: number): Promise<GroupResponse> => {
    const response = await apiClient.get<GroupResponse>(ENDPOINTS.groups.byId(id));
    return response.data;
  },

  create: async (data: CreateGroupRequest): Promise<void> => {
    await apiClient.post(ENDPOINTS.groups.admin, data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.groups.adminById(id));
  },

  seed: async (): Promise<void> => {
    await apiClient.post(ENDPOINTS.groups.adminSeed);
  },
};
