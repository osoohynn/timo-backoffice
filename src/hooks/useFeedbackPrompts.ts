import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { feedbackPromptsApi } from '../api/feedbackPrompts';
import type { CreateFeedbackPromptRequest, UpdateFeedbackPromptRequest } from '../types';

const queryKeys = {
  all: ['feedbackPrompts'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
};

export function useFeedbackPrompts() {
  return useQuery({
    queryKey: queryKeys.lists(),
    queryFn: () => feedbackPromptsApi.getAll(),
  });
}

export function useCreateFeedbackPrompt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFeedbackPromptRequest) => feedbackPromptsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('프롬프트가 생성되었습니다');
    },
    onError: () => {
      message.error('프롬프트 생성에 실패했습니다');
    },
  });
}

export function useUpdateFeedbackPrompt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ version, data }: { version: number; data: UpdateFeedbackPromptRequest }) =>
      feedbackPromptsApi.update(version, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('프롬프트가 수정되었습니다');
    },
    onError: () => {
      message.error('프롬프트 수정에 실패했습니다');
    },
  });
}

export function useDeleteFeedbackPrompt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (version: number) => feedbackPromptsApi.delete(version),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('프롬프트가 삭제되었습니다');
    },
    onError: () => {
      message.error('프롬프트 삭제에 실패했습니다');
    },
  });
}
