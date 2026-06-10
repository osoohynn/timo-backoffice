import { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { groupSchema, type GroupFormData } from '../../utils/validation';
import { GROUP_TYPE_OPTIONS } from '../../utils/constants';
import { ImageUpload } from '../common/ImageUpload';

interface GroupFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: GroupFormData) => void;
  loading?: boolean;
}

export function GroupFormModal({ open, onClose, onSubmit, loading }: GroupFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: { name: '', type: undefined, image: '' },
  });

  useEffect(() => {
    if (open) {
      reset({ name: '', type: undefined, image: '' });
    }
  }, [open, reset]);

  return (
    <Modal
      title="그룹 생성"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={loading}
      okText="생성"
      cancelText="취소"
      destroyOnHidden
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="그룹 유형"
          validateStatus={errors.type ? 'error' : ''}
          help={errors.type?.message}
        >
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="그룹 유형을 선택하세요"
                options={GROUP_TYPE_OPTIONS}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="그룹명"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="그룹명을 입력하세요" />
            )}
          />
        </Form.Item>
        <Form.Item label="이미지 (선택)">
          <Controller
            name="image"
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
