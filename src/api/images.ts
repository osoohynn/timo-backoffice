import apiClient from './client';
import { ENDPOINTS } from './endpoints';

export const imagesApi = {
  upload: async (file: File): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    const { data } = await apiClient.post<{ url: string }>(
      ENDPOINTS.images.upload,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data.url;
  },
};
