import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { testQuestionsApi } from '../api/testQuestions';
import type { CreateTestQuestionRequest, UpdateTestQuestionRequest } from '../types';

const queryKeys = {
  all: ['testQuestions'] as const,
  list: (testId: number) => [...queryKeys.all, testId] as const,
};

export function useTestQuestions(testId: number) {
  return useQuery({
    queryKey: queryKeys.list(testId),
    queryFn: () => testQuestionsApi.getAll(testId),
    enabled: testId > 0,
  });
}

export function useCreateTestQuestion(testId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTestQuestionRequest) => testQuestionsApi.create(testId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list(testId) });
      message.success('문항이 생성되었습니다');
    },
    onError: () => {
      message.error('문항 생성에 실패했습니다');
    },
  });
}

export function useUpdateTestQuestion(testId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ questionId, data }: { questionId: number; data: UpdateTestQuestionRequest }) =>
      testQuestionsApi.update(testId, questionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list(testId) });
      message.success('문항이 수정되었습니다');
    },
    onError: () => {
      message.error('문항 수정에 실패했습니다');
    },
  });
}

export function useDeleteTestQuestion(testId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questionId: number) => testQuestionsApi.delete(testId, questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list(testId) });
      message.success('문항이 삭제되었습니다');
    },
    onError: () => {
      message.error('문항 삭제에 실패했습니다');
    },
  });
}
