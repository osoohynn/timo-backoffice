import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { IntroductionTable } from '../../components/introduction/IntroductionTable';
import { IntroductionFormModal } from '../../components/introduction/IntroductionFormModal';
import {
  useIntroductions,
  useCreateIntroduction,
  useUpdateIntroduction,
  useDeleteIntroduction,
} from '../../hooks/useIntroductions';
import type { IntroductionResponse } from '../../types';
import type { IntroductionFormData } from '../../utils/validation';

export function IntroductionPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIntroduction, setEditingIntroduction] = useState<IntroductionResponse | null>(null);

  const { data, isLoading } = useIntroductions();
  const createMutation = useCreateIntroduction();
  const updateMutation = useUpdateIntroduction();
  const deleteMutation = useDeleteIntroduction();

  const handleOpenCreate = () => {
    setEditingIntroduction(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (record: IntroductionResponse) => {
    setEditingIntroduction(record);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingIntroduction(null);
  };

  const handleSubmit = (formData: IntroductionFormData) => {
    if (editingIntroduction) {
      updateMutation.mutate(
        { version: editingIntroduction.version, data: formData },
        { onSuccess: handleClose }
      );
    } else {
      createMutation.mutate(formData, { onSuccess: handleClose });
    }
  };

  return (
    <div>
      <PageHeader
        title="소개글 관리"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
            소개글 생성
          </Button>
        }
      />
      <IntroductionTable
        data={data || []}
        loading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={(version) => deleteMutation.mutate(version)}
      />
      <IntroductionFormModal
        open={modalOpen}
        introduction={editingIntroduction}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
