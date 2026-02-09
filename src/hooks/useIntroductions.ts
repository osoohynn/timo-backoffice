import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { introductionsApi } from '../api/introductions';
import type { CreateIntroductionRequest, UpdateIntroductionRequest } from '../types';

const queryKeys = {
  all: ['introductions'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
};

export function useIntroductions() {
  return useQuery({
    queryKey: queryKeys.lists(),
    queryFn: () => introductionsApi.getAll(),
  });
}

export function useCreateIntroduction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateIntroductionRequest) => introductionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('소개글이 생성되었습니다');
    },
    onError: () => {
      message.error('소개글 생성에 실패했습니다');
    },
  });
}

export function useUpdateIntroduction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ version, data }: { version: number; data: UpdateIntroductionRequest }) =>
      introductionsApi.update(version, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('소개글이 수정되었습니다');
    },
    onError: () => {
      message.error('소개글 수정에 실패했습니다');
    },
  });
}

export function useDeleteIntroduction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (version: number) => introductionsApi.delete(version),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('소개글이 삭제되었습니다');
    },
    onError: () => {
      message.error('소개글 삭제에 실패했습니다');
    },
  });
}
