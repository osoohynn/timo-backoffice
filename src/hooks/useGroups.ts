import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { groupsApi } from '../api/groups';
import type { CreateGroupRequest } from '../types';

const queryKeys = {
  all: ['groups'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: number) => [...queryKeys.details(), id] as const,
};

export function useGroups() {
  return useQuery({
    queryKey: queryKeys.lists(),
    queryFn: () => groupsApi.getAll(),
  });
}

export function useGroup(id: number) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => groupsApi.getById(id),
    enabled: id > 0,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateGroupRequest) => groupsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('그룹이 생성되었습니다');
    },
    onError: () => {
      message.error('그룹 생성에 실패했습니다');
    },
  });
}

export function useSeedGroups() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => groupsApi.seed(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
      message.success('더미 데이터가 시딩되었습니다');
    },
    onError: () => {
      message.error('시딩에 실패했습니다');
    },
  });
}
