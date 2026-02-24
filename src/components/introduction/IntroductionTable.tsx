import { Button, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { IntroductionResponse } from '../../types';
import { formatDate } from '../../utils/format';
import { showConfirmModal } from '../common/ConfirmModal';

interface IntroductionTableProps {
  data: IntroductionResponse[];
  loading: boolean;
  onEdit: (record: IntroductionResponse) => void;
  onDelete: (id: number) => void;
}

export function IntroductionTable({ data, loading, onEdit, onDelete }: IntroductionTableProps) {
  const sortedData = [...data].sort((a, b) => b.version - a.version || a.sequence - b.sequence);

  const columns: ColumnsType<IntroductionResponse> = [
    {
      title: '버전',
      dataIndex: 'version',
      width: 80,
    },
    {
      title: '순번',
      dataIndex: 'sequence',
      width: 80,
    },
    {
      title: '제목',
      dataIndex: 'title',
      width: 160,
      ellipsis: true,
    },
    {
      title: '설명',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '이미지 URL',
      dataIndex: 'imageUrl',
      ellipsis: true,
    },
    {
      title: '생성일',
      dataIndex: 'createdAt',
      width: 180,
      render: (date: string) => formatDate(date),
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
                title: '소개글 삭제',
                content: `"${record.title}" 소개글을 삭제하시겠습니까?`,
                onConfirm: () => onDelete(record.id),
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
      scroll={{ x: 900 }}
      pagination={false}
    />
  );
}
