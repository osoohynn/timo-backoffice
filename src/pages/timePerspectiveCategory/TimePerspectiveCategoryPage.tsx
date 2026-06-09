import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { TimePerspectiveCategoryTable } from '../../components/timePerspectiveCategory/TimePerspectiveCategoryTable';
import { TimePerspectiveCategoryFormModal } from '../../components/timePerspectiveCategory/TimePerspectiveCategoryFormModal';
import {
  useTimePerspectiveCategories,
  useCreateTimePerspectiveCategory,
  useUpdateTimePerspectiveCategory,
  useDeleteTimePerspectiveCategory,
} from '../../hooks/useTimePerspectiveCategories';
import type { TimePerspectiveCategoryResponse } from '../../types';
import type { TimePerspectiveCategoryFormData } from '../../utils/validation';

export function TimePerspectiveCategoryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<TimePerspectiveCategoryResponse | null>(null);

  const { data, isLoading } = useTimePerspectiveCategories();
  const createMutation = useCreateTimePerspectiveCategory();
  const updateMutation = useUpdateTimePerspectiveCategory(editingCategory?.id ?? 0);
  const deleteMutation = useDeleteTimePerspectiveCategory();

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (record: TimePerspectiveCategoryResponse) => {
    setEditingCategory(record);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = (formData: TimePerspectiveCategoryFormData) => {
    const payload = {
      ...formData,
      englishName: formData.englishName || undefined,
      characterName: formData.characterName || undefined,
      personality: formData.personality || undefined,
    };

    if (editingCategory) {
      updateMutation.mutate(payload, { onSuccess: handleClose });
    } else {
      createMutation.mutate(payload, { onSuccess: handleClose });
    }
  };

  return (
    <div>
      <PageHeader
        title="시간관점 카테고리 관리"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
            카테고리 생성
          </Button>
        }
      />
      <TimePerspectiveCategoryTable
        data={data || []}
        loading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
      <TimePerspectiveCategoryFormModal
        open={modalOpen}
        category={editingCategory}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
