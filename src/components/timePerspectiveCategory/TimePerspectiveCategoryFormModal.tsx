import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TimePerspectiveCategoryResponse } from '../../types';
import {
  timePerspectiveCategorySchema,
  type TimePerspectiveCategoryFormData,
} from '../../utils/validation';

interface TimePerspectiveCategoryFormModalProps {
  open: boolean;
  category: TimePerspectiveCategoryResponse | null;
  onClose: () => void;
  onSubmit: (data: TimePerspectiveCategoryFormData) => void;
  loading?: boolean;
}

export function TimePerspectiveCategoryFormModal({
  open,
  category,
  onClose,
  onSubmit,
  loading,
}: TimePerspectiveCategoryFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TimePerspectiveCategoryFormData>({
    resolver: zodResolver(timePerspectiveCategorySchema),
    defaultValues: {
      name: '',
      englishName: '',
      characterName: '',
      personality: '',
      description: '',
      idealValue: undefined,
    },
  });

  useEffect(() => {
    if (open) {
      if (category) {
        reset({
          name: category.name,
          englishName: category.englishName ?? '',
          characterName: category.characterName ?? '',
          personality: category.personality ?? '',
          description: category.description,
          idealValue: category.idealValue,
        });
      } else {
        reset({
          name: '',
          englishName: '',
          characterName: '',
          personality: '',
          description: '',
          idealValue: undefined,
        });
      }
    }
  }, [open, category, reset]);

  return (
    <Modal
      title={category ? '카테고리 수정' : '카테고리 생성'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={loading}
      okText={category ? '수정' : '생성'}
      cancelText="취소"
      destroyOnHidden
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="이름"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="이름을 입력하세요" />}
          />
        </Form.Item>
        <Form.Item label="영문명">
          <Controller
            name="englishName"
            control={control}
            render={({ field }) => <Input {...field} placeholder="영문명을 입력하세요 (선택)" />}
          />
        </Form.Item>
        <Form.Item label="캐릭터명">
          <Controller
            name="characterName"
            control={control}
            render={({ field }) => <Input {...field} placeholder="캐릭터명을 입력하세요 (선택)" />}
          />
        </Form.Item>
        <Form.Item label="성격">
          <Controller
            name="personality"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={2} placeholder="성격을 입력하세요 (선택)" />
            )}
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
              <Input.TextArea {...field} rows={3} placeholder="설명을 입력하세요" />
            )}
          />
        </Form.Item>
        <Form.Item label="이상값">
          <Controller
            name="idealValue"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                style={{ width: '100%' }}
                step={0.01}
                placeholder="이상값을 입력하세요 (선택)"
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
