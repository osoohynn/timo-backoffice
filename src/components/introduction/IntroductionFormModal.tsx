import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IntroductionResponse } from '../../types';
import { introductionSchema, type IntroductionFormData } from '../../utils/validation';

interface IntroductionFormModalProps {
  open: boolean;
  introduction: IntroductionResponse | null;
  onClose: () => void;
  onSubmit: (data: IntroductionFormData) => void;
  loading?: boolean;
}

export function IntroductionFormModal({
  open,
  introduction,
  onClose,
  onSubmit,
  loading,
}: IntroductionFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IntroductionFormData>({
    resolver: zodResolver(introductionSchema),
    defaultValues: { version: undefined, content: '' },
  });

  useEffect(() => {
    if (open) {
      if (introduction) {
        reset({ version: introduction.version, content: introduction.content });
      } else {
        reset({ version: undefined, content: '' });
      }
    }
  }, [open, introduction, reset]);

  return (
    <Modal
      title={introduction ? '소개글 수정' : '소개글 생성'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={loading}
      okText={introduction ? '수정' : '생성'}
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
                disabled={!!introduction}
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
              <Input.TextArea {...field} rows={10} placeholder="소개글 내용을 입력하세요" />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
