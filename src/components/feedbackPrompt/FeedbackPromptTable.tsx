import { Button, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { FeedbackPromptResponse } from '../../types';
import { showConfirmModal } from '../common/ConfirmModal';

interface FeedbackPromptTableProps {
  data: FeedbackPromptResponse[];
  loading: boolean;
  onEdit: (record: FeedbackPromptResponse) => void;
  onDelete: (version: number) => void;
}

export function FeedbackPromptTable({ data, loading, onEdit, onDelete }: FeedbackPromptTableProps) {
  const sortedData = [...data].sort((a, b) => b.version - a.version);

  const columns: ColumnsType<FeedbackPromptResponse> = [
    {
      title: '버전',
      dataIndex: 'version',
      width: 100,
    },
    {
      title: '내용',
      dataIndex: 'content',
      ellipsis: true,
    },
    {
      title: '액션',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              showConfirmModal({
                title: '프롬프트 삭제',
                content: `버전 ${record.version} 프롬프트를 삭제하시겠습니까?`,
                onConfirm: () => onDelete(record.version),
              })
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={sortedData}
      rowKey="id"
      loading={loading}
      scroll={{ x: 600 }}
      pagination={false}
    />
  );
}
