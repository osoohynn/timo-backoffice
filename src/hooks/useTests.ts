import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { testsApi } from '../api/tests';
import type { CreateTestRequest, UpdateTestRequest } from '../types';

const queryKeys = {
  all: ['tests'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: number) => [...queryKeys.details(), id] as const,
};

export function useTests() {
  return useQuery({
    queryKey: queryKeys.lists(),
    queryFn: () => testsApi.getAll(),
  });
}

export function useTest(id: number) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => testsApi.getById(id),
    enabled: id > 0,
  });
}

export function useCreateTest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTestRequest) => testsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('검사가 생성되었습니다');
    },
    onError: () => {
      message.error('검사 생성에 실패했습니다');
    },
  });
}

export function useUpdateTest(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTestRequest) => testsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      message.success('검사가 수정되었습니다');
    },
    onError: () => {
      message.error('검사 수정에 실패했습니다');
    },
  });
}

export function useDeleteTest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => testsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('검사가 삭제되었습니다');
    },
    onError: () => {
      message.error('검사 삭제에 실패했습니다');
    },
  });
}
