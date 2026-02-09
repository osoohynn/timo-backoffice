import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import type {
  TestQuestionResponse,
  CreateTestQuestionRequest,
  UpdateTestQuestionRequest,
} from '../types';

export const testQuestionsApi = {
  getAll: async (testId: number): Promise<TestQuestionResponse[]> => {
    const response = await apiClient.get<TestQuestionResponse[]>(
      ENDPOINTS.testQuestions.base(testId)
    );
    return response.data;
  },

  create: async (testId: number, data: CreateTestQuestionRequest): Promise<void> => {
    await apiClient.post(ENDPOINTS.testQuestions.admin(testId), data);
  },

  update: async (
    testId: number,
    questionId: number,
    data: UpdateTestQuestionRequest
  ): Promise<void> => {
    await apiClient.patch(ENDPOINTS.testQuestions.adminById(testId, questionId), data);
  },

  delete: async (testId: number, questionId: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.testQuestions.adminById(testId, questionId));
  },
};
