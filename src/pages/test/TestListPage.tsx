import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { TestTable } from '../../components/test/TestTable';
import { TestFormModal } from '../../components/test/TestFormModal';
import { useTests, useCreateTest, useUpdateTest, useDeleteTest } from '../../hooks/useTests';
import type { TestResponse } from '../../types';
import type { TestFormData } from '../../utils/validation';

export function TestListPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<TestResponse | null>(null);

  const { data, isLoading } = useTests();
  const createMutation = useCreateTest();
  const updateMutation = useUpdateTest(editingTest?.id ?? 0);
  const deleteMutation = useDeleteTest();

  const handleOpenCreate = () => {
    setEditingTest(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (record: TestResponse) => {
    setEditingTest(record);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingTest(null);
  };

  const handleSubmit = (formData: TestFormData) => {
    if (editingTest) {
      updateMutation.mutate(formData, { onSuccess: handleClose });
    } else {
      createMutation.mutate(formData, { onSuccess: handleClose });
    }
  };

  return (
    <div>
      <PageHeader
        title="검사 관리"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
            검사 생성
          </Button>
        }
      />
      <TestTable
        data={data || []}
        loading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
      <TestFormModal
        open={modalOpen}
        test={editingTest}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
