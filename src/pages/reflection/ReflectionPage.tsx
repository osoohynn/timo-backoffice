import { useState } from 'react';
import { Button, Divider, InputNumber, Space, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { showConfirmModal } from '../../components/common/ConfirmModal';
import {
  useDeleteReflection,
  useDeleteReflectionFeedback,
} from '../../hooks/useReflections';

const { Title, Text } = Typography;

export function ReflectionPage() {
  const [reflectionId, setReflectionId] = useState<number | null>(null);
  const [feedbackId, setFeedbackId] = useState<number | null>(null);

  const deleteReflectionMutation = useDeleteReflection();
  const deleteFeedbackMutation = useDeleteReflectionFeedback();

  const handleDeleteReflection = () => {
    if (!reflectionId) return;
    showConfirmModal({
      title: '회고 삭제',
      content: `ID ${reflectionId} 회고를 삭제하시겠습니까?`,
      onConfirm: () =>
        deleteReflectionMutation.mutate(reflectionId, {
          onSuccess: () => setReflectionId(null),
        }),
    });
  };

  const handleDeleteFeedback = () => {
    if (!feedbackId) return;
    showConfirmModal({
      title: '회고 피드백 삭제',
      content: `ID ${feedbackId} 회고 피드백을 삭제하시겠습니까?`,
      onConfirm: () =>
        deleteFeedbackMutation.mutate(feedbackId, {
          onSuccess: () => setFeedbackId(null),
        }),
    });
  };

  return (
    <div>
      <PageHeader title="회고 관리" />

      <div style={{ maxWidth: 480 }}>
        <Title level={5}>회고 삭제</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
          삭제할 회고 ID를 입력하세요
        </Text>
        <Space>
          <InputNumber
            value={reflectionId}
            onChange={(v) => setReflectionId(v)}
            min={1}
            placeholder="회고 ID"
            style={{ width: 160 }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            disabled={!reflectionId}
            loading={deleteReflectionMutation.isPending}
            onClick={handleDeleteReflection}
          >
            삭제
          </Button>
        </Space>

        <Divider />

        <Title level={5}>회고 피드백 삭제</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
          삭제할 회고 피드백 ID를 입력하세요
        </Text>
        <Space>
          <InputNumber
            value={feedbackId}
            onChange={(v) => setFeedbackId(v)}
            min={1}
            placeholder="피드백 ID"
            style={{ width: 160 }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            disabled={!feedbackId}
            loading={deleteFeedbackMutation.isPending}
            onClick={handleDeleteFeedback}
          >
            삭제
          </Button>
        </Space>
      </div>
    </div>
  );
}
