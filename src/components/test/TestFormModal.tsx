import { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TestResponse } from '../../types';
import { testSchema, type TestFormData } from '../../utils/validation';
import { TEST_TYPE_OPTIONS } from '../../utils/constants';

interface TestFormModalProps {
  open: boolean;
  test: TestResponse | null;
  onClose: () => void;
  onSubmit: (data: TestFormData) => void;
  loading?: boolean;
}

export function TestFormModal({ open, test, onClose, onSubmit, loading }: TestFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: { type: undefined, name: '', description: '' },
  });

  useEffect(() => {
    if (open) {
      if (test) {
        reset({ type: test.type, name: test.name, description: test.description });
      } else {
        reset({ type: undefined, name: '', description: '' });
      }
    }
  }, [open, test, reset]);

  return (
    <Modal
      title={test ? '검사 수정' : '검사 생성'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={loading}
      okText={test ? '수정' : '생성'}
      cancelText="취소"
      destroyOnHidden
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="검사 유형"
          validateStatus={errors.type ? 'error' : ''}
          help={errors.type?.message}
        >
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="검사 유형을 선택하세요"
                options={TEST_TYPE_OPTIONS}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="검사명"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="검사명을 입력하세요" />
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
              <Input.TextArea {...field} rows={4} placeholder="설명을 입력하세요" />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
