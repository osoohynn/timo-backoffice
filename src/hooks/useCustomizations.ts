import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { customizationsApi } from '../api/customizations';
import type { CreateCustomizationItemRequest, UpdateCustomizationItemRequest } from '../types';

const queryKeys = {
  all: ['customizations'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: number) => [...queryKeys.details(), id] as const,
};

export function useCustomizations() {
  return useQuery({
    queryKey: queryKeys.lists(),
    queryFn: () => customizationsApi.getAll(),
  });
}

export function useCustomizationDetail(id: number | null) {
  return useQuery({
    queryKey: queryKeys.detail(id!),
    queryFn: () => customizationsApi.getById(id!),
    enabled: id !== null,
  });
}

export function useCreateCustomization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCustomizationItemRequest) => customizationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('아이템이 생성되었습니다');
    },
    onError: () => {
      message.error('아이템 생성에 실패했습니다');
    },
  });
}

export function useUpdateCustomization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCustomizationItemRequest }) =>
      customizationsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('아이템이 수정되었습니다');
    },
    onError: () => {
      message.error('아이템 수정에 실패했습니다');
    },
  });
}

export function useDeleteCustomization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => customizationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('아이템이 삭제되었습니다');
    },
    onError: () => {
      message.error('아이템 삭제에 실패했습니다');
    },
  });
}
