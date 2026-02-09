import { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Switch } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TestQuestionResponse } from '../../types';
import { testQuestionSchema, type TestQuestionFormData } from '../../utils/validation';
import { ZTPI_CATEGORY_OPTIONS } from '../../utils/constants';

interface TestQuestionFormModalProps {
  open: boolean;
  question: TestQuestionResponse | null;
  onClose: () => void;
  onSubmit: (data: TestQuestionFormData) => void;
  loading?: boolean;
}

export function TestQuestionFormModal({
  open,
  question,
  onClose,
  onSubmit,
  loading,
}: TestQuestionFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestQuestionFormData>({
    resolver: zodResolver(testQuestionSchema),
    defaultValues: { category: undefined, content: '', sequence: 1, isReversed: false },
  });

  useEffect(() => {
    if (open) {
      if (question) {
        reset({
          category: question.category,
          content: question.content,
          sequence: question.sequence,
          isReversed: question.isReversed,
        });
      } else {
        reset({ category: undefined, content: '', sequence: 1, isReversed: false });
      }
    }
  }, [open, question, reset]);

  return (
    <Modal
      title={question ? '문항 수정' : '문항 생성'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={loading}
      okText={question ? '수정' : '생성'}
      cancelText="취소"
      destroyOnHidden
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="카테고리"
          validateStatus={errors.category ? 'error' : ''}
          help={errors.category?.message}
        >
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="카테고리를 선택하세요"
                options={ZTPI_CATEGORY_OPTIONS}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="질문 내용"
          validateStatus={errors.content ? 'error' : ''}
          help={errors.content?.message}
        >
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={3} placeholder="질문 내용을 입력하세요" />
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
        <Form.Item label="역채점">
          <Controller
            name="isReversed"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Switch checked={value} onChange={onChange} />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
