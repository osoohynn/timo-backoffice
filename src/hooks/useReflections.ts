import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { reflectionsApi } from '../api/reflections';

export function useDeleteReflection() {
  return useMutation({
    mutationFn: (reflectionId: number) => reflectionsApi.deleteReflection(reflectionId),
    onSuccess: () => {
      message.success('회고가 삭제되었습니다');
    },
    onError: () => {
      message.error('회고 삭제에 실패했습니다');
    },
  });
}

export function useDeleteReflectionFeedback() {
  return useMutation({
    mutationFn: (feedbackId: number) => reflectionsApi.deleteReflectionFeedback(feedbackId),
    onSuccess: () => {
      message.success('회고 피드백이 삭제되었습니다');
    },
    onError: () => {
      message.error('회고 피드백 삭제에 실패했습니다');
    },
  });
}
