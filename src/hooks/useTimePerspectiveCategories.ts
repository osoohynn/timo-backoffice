import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { timePerspectiveCategoriesApi } from '../api/timePerspectiveCategories';
import type {
  CreateTimePerspectiveCategoryRequest,
  UpdateTimePerspectiveCategoryRequest,
} from '../types';

const queryKeys = {
  all: ['timePerspectiveCategories'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: number) => [...queryKeys.details(), id] as const,
};

export function useTimePerspectiveCategories() {
  return useQuery({
    queryKey: queryKeys.lists(),
    queryFn: () => timePerspectiveCategoriesApi.getAll(),
  });
}

export function useTimePerspectiveCategory(id: number) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => timePerspectiveCategoriesApi.getById(id),
    enabled: id > 0,
  });
}

export function useCreateTimePerspectiveCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTimePerspectiveCategoryRequest) =>
      timePerspectiveCategoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('카테고리가 생성되었습니다');
    },
    onError: () => {
      message.error('카테고리 생성에 실패했습니다');
    },
  });
}

export function useUpdateTimePerspectiveCategory(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTimePerspectiveCategoryRequest) =>
      timePerspectiveCategoriesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(id) });
      message.success('카테고리가 수정되었습니다');
    },
    onError: () => {
      message.error('카테고리 수정에 실패했습니다');
    },
  });
}

export function useDeleteTimePerspectiveCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => timePerspectiveCategoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('카테고리가 삭제되었습니다');
    },
    onError: () => {
      message.error('카테고리 삭제에 실패했습니다');
    },
  });
}
