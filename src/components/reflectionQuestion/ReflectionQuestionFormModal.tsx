import { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ReflectionQuestionResponse } from '../../types';
import { reflectionQuestionSchema, type ReflectionQuestionFormData } from '../../utils/validation';
import { ZTPI_CATEGORY_OPTIONS } from '../../utils/constants';

interface ReflectionQuestionFormModalProps {
  open: boolean;
  question: ReflectionQuestionResponse | null;
  onClose: () => void;
  onSubmit: (data: ReflectionQuestionFormData) => void;
  loading?: boolean;
}

export function ReflectionQuestionFormModal({
  open,
  question,
  onClose,
  onSubmit,
  loading,
}: ReflectionQuestionFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReflectionQuestionFormData>({
    resolver: zodResolver(reflectionQuestionSchema),
    defaultValues: { category: undefined, content: '', createdBy: '' },
  });

  useEffect(() => {
    if (open) {
      if (question) {
        reset({
          category: question.category,
          content: question.content,
          createdBy: question.createdBy,
        });
      } else {
        reset({ category: undefined, content: '', createdBy: '' });
      }
    }
  }, [open, question, reset]);

  return (
    <Modal
      title={question ? '성찰 질문 수정' : '성찰 질문 생성'}
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
                disabled={!!question}
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
              <Input.TextArea {...field} rows={4} placeholder="질문 내용을 입력하세요" />
            )}
          />
        </Form.Item>
        <Form.Item
          label="작성자"
          validateStatus={errors.createdBy ? 'error' : ''}
          help={errors.createdBy?.message}
        >
          <Controller
            name="createdBy"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="작성자를 입력하세요" />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
