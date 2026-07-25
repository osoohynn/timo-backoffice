import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { CustomizationTable } from '../../components/customization/CustomizationTable';
import { CustomizationFormModal } from '../../components/customization/CustomizationFormModal';
import {
  useCustomizations,
  useCustomizationDetail,
  useCreateCustomization,
  useUpdateCustomization,
  useDeleteCustomization,
} from '../../hooks/useCustomizations';
import { showConfirmModal } from '../../components/common/ConfirmModal';
import type { AdminCustomizationItemResponse } from '../../types';
import type { CustomizationFormData } from '../../utils/validation';

export function CustomizationPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminCustomizationItemResponse | null>(null);

  const { data, isLoading } = useCustomizations();
  const { data: editDetail, isLoading: detailLoading } = useCustomizationDetail(
    editingItem?.id ?? null
  );
  const createMutation = useCreateCustomization();
  const updateMutation = useUpdateCustomization();
  const deleteMutation = useDeleteCustomization();

  const handleOpenCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (record: AdminCustomizationItemResponse) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = (formData: CustomizationFormData) => {
    if (editingItem) {
      updateMutation.mutate(
        { id: editingItem.id, data: formData },
        { onSuccess: handleClose }
      );
    } else {
      createMutation.mutate(formData, { onSuccess: handleClose });
    }
  };

  const handleDelete = (id: number) => {
    const item = data?.find((d) => d.id === id);
    showConfirmModal({
      title: '아이템 삭제',
      content: `"${item?.name}" 아이템을 삭제하시겠습니까?`,
      onConfirm: () => deleteMutation.mutate(id),
    });
  };

  return (
    <div>
      <PageHeader
        title="커스터마이징 아이템 관리"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
            아이템 생성
          </Button>
        }
      />
      <CustomizationTable
        data={data || []}
        loading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
      <CustomizationFormModal
        open={modalOpen}
        item={editingItem ? (editDetail ?? null) : null}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending || (!!editingItem && detailLoading)}
      />
    </div>
  );
}
