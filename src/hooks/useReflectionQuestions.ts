import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { reflectionQuestionsApi } from '../api/reflectionQuestions';
import type {
  PageParams,
  ReflectionQuestionFilters,
  CreateReflectionQuestionRequest,
  UpdateReflectionQuestionRequest,
} from '../types';

const queryKeys = {
  all: ['reflectionQuestions'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (params: PageParams & ReflectionQuestionFilters) =>
    [...queryKeys.lists(), params] as const,
};

export function useReflectionQuestions(params: PageParams & ReflectionQuestionFilters) {
  return useQuery({
    queryKey: queryKeys.list(params),
    queryFn: () => reflectionQuestionsApi.getAll(params),
  });
}

export function useCreateReflectionQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReflectionQuestionRequest) => reflectionQuestionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('질문이 생성되었습니다');
    },
    onError: () => {
      message.error('질문 생성에 실패했습니다');
    },
  });
}

export function useUpdateReflectionQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ questionId, data }: { questionId: number; data: UpdateReflectionQuestionRequest }) =>
      reflectionQuestionsApi.update(questionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('질문이 수정되었습니다');
    },
    onError: () => {
      message.error('질문 수정에 실패했습니다');
    },
  });
}

export function useDeleteReflectionQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questionId: number) => reflectionQuestionsApi.delete(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('질문이 삭제되었습니다');
    },
    onError: () => {
      message.error('질문 삭제에 실패했습니다');
    },
  });
}
