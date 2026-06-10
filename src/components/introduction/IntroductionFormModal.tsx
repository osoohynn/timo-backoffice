import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IntroductionResponse } from '../../types';
import { introductionSchema, type IntroductionFormData } from '../../utils/validation';
import { ImageUpload } from '../common/ImageUpload';

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
    defaultValues: {
      version: undefined,
      sequence: undefined,
      title: '',
      description: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (open) {
      if (introduction) {
        reset({
          version: introduction.version,
          sequence: introduction.sequence,
          title: introduction.title,
          description: introduction.description,
          imageUrl: introduction.imageUrl,
        });
      } else {
        reset({ version: undefined, sequence: undefined, title: '', description: '', imageUrl: '' });
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
          label="순번"
          validateStatus={errors.sequence ? 'error' : ''}
          help={errors.sequence?.message}
        >
          <Controller
            name="sequence"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                style={{ width: '100%' }}
                placeholder="순번을 입력하세요"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="제목"
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} placeholder="제목을 입력하세요" />}
          />
        </Form.Item>
        <Form.Item
          label="설명"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={4} placeholder="설명을 입력하세요" />
            )}
          />
        </Form.Item>
        <Form.Item
          label="이미지"
          validateStatus={errors.imageUrl ? 'error' : ''}
          help={errors.imageUrl?.message}
        >
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <ImageUpload value={field.value} onChange={field.onChange} />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
