import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { FeedbackPromptTable } from '../../components/feedbackPrompt/FeedbackPromptTable';
import { FeedbackPromptFormModal } from '../../components/feedbackPrompt/FeedbackPromptFormModal';
import {
  useFeedbackPrompts,
  useCreateFeedbackPrompt,
  useUpdateFeedbackPrompt,
  useDeleteFeedbackPrompt,
} from '../../hooks/useFeedbackPrompts';
import type { FeedbackPromptResponse } from '../../types';
import type { FeedbackPromptFormData } from '../../utils/validation';

export function FeedbackPromptPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<FeedbackPromptResponse | null>(null);

  const { data, isLoading } = useFeedbackPrompts();
  const createMutation = useCreateFeedbackPrompt();
  const updateMutation = useUpdateFeedbackPrompt();
  const deleteMutation = useDeleteFeedbackPrompt();

  const handleOpenCreate = () => {
    setEditingPrompt(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (record: FeedbackPromptResponse) => {
    setEditingPrompt(record);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingPrompt(null);
  };

  const handleSubmit = (formData: FeedbackPromptFormData) => {
    if (editingPrompt) {
      updateMutation.mutate(
        { version: editingPrompt.version, data: { content: formData.content } },
        { onSuccess: handleClose }
      );
    } else {
      createMutation.mutate(formData, { onSuccess: handleClose });
    }
  };

  return (
    <div>
      <PageHeader
        title="피드백 프롬프트 관리"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
            프롬프트 생성
          </Button>
        }
      />
      <FeedbackPromptTable
        data={data || []}
        loading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={(version) => deleteMutation.mutate(version)}
      />
      <FeedbackPromptFormModal
        open={modalOpen}
        prompt={editingPrompt}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
