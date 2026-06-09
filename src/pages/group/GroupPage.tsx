import { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined, DatabaseOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { GroupTable } from '../../components/group/GroupTable';
import { GroupFormModal } from '../../components/group/GroupFormModal';
import { useGroups, useCreateGroup, useDeleteGroup, useSeedGroups } from '../../hooks/useGroups';
import { showConfirmModal } from '../../components/common/ConfirmModal';
import type { GroupFormData } from '../../utils/validation';

export function GroupPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading } = useGroups();
  const createMutation = useCreateGroup();
  const deleteMutation = useDeleteGroup();
  const seedMutation = useSeedGroups();

  const handleSubmit = (formData: GroupFormData) => {
    createMutation.mutate(
      { ...formData, image: formData.image || undefined },
      { onSuccess: () => setModalOpen(false) }
    );
  };

  const handleSeed = () => {
    showConfirmModal({
      title: '더미 데이터 시딩',
      content: '그룹 더미 데이터를 시딩하시겠습니까?',
      onConfirm: () => seedMutation.mutate(),
    });
  };

  return (
    <div>
      <PageHeader
        title="그룹 관리"
        extra={
          <Space>
            <Button
              icon={<DatabaseOutlined />}
              onClick={handleSeed}
              loading={seedMutation.isPending}
            >
              더미 데이터 시딩
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalOpen(true)}
            >
              그룹 생성
            </Button>
          </Space>
        }
      />
      <GroupTable
        data={data || []}
        loading={isLoading}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
      <GroupFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={createMutation.isPending}
      />
    </div>
  );
}
