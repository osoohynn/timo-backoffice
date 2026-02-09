import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type {
  PageResponse,
  PageParams,
  ReflectionQuestionResponse,
  ReflectionQuestionFilters,
  CreateReflectionQuestionRequest,
  UpdateReflectionQuestionRequest,
} from '../types';

export const reflectionQuestionsApi = {
  getAll: async (
    params: PageParams & ReflectionQuestionFilters
  ): Promise<PageResponse<ReflectionQuestionResponse>> => {
    const response = await apiClient.get<PageResponse<ReflectionQuestionResponse>>(
      ENDPOINTS.reflectionQuestions.admin,
      { params }
    );
    return response.data;
  },

  create: async (data: CreateReflectionQuestionRequest): Promise<{ id: number }> => {
    const response = await apiClient.post<{ id: number }>(
      ENDPOINTS.reflectionQuestions.admin,
      data
    );
    return response.data;
  },

  update: async (
    questionId: number,
    data: UpdateReflectionQuestionRequest
  ): Promise<void> => {
    await apiClient.patch(ENDPOINTS.reflectionQuestions.adminById(questionId), data);
  },

  delete: async (questionId: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.reflectionQuestions.adminById(questionId));
  },
};
