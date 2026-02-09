import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FeedbackPromptResponse } from '../../types';
import { feedbackPromptSchema, type FeedbackPromptFormData } from '../../utils/validation';

interface FeedbackPromptFormModalProps {
  open: boolean;
  prompt: FeedbackPromptResponse | null;
  onClose: () => void;
  onSubmit: (data: FeedbackPromptFormData) => void;
  loading?: boolean;
}

export function FeedbackPromptFormModal({
  open,
  prompt,
  onClose,
  onSubmit,
  loading,
}: FeedbackPromptFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackPromptFormData>({
    resolver: zodResolver(feedbackPromptSchema),
    defaultValues: { version: undefined, content: '' },
  });

  useEffect(() => {
    if (open) {
      if (prompt) {
        reset({ version: prompt.version, content: prompt.content });
      } else {
        reset({ version: undefined, content: '' });
      }
    }
  }, [open, prompt, reset]);

  return (
    <Modal
      title={prompt ? '프롬프트 수정' : '프롬프트 생성'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={loading}
      okText={prompt ? '수정' : '생성'}
      cancelText="취소"
      destroyOnHidden
      width={640}
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="버전"
          validateStatus={errors.version ? 'error' : ''}
          help={errors.version?.message}
        >
          <Controller
            name="version"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                style={{ width: '100%' }}
                placeholder="버전을 입력하세요"
                disabled={!!prompt}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="내용"
          validateStatus={errors.content ? 'error' : ''}
          help={errors.content?.message}
        >
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={10} placeholder="프롬프트 내용을 입력하세요" />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
