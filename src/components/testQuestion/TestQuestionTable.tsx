import { Button, Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TestQuestionResponse } from '../../types';
import { ZTPI_CATEGORY_CONFIG } from '../../utils/constants';
import { showConfirmModal } from '../common/ConfirmModal';

interface TestQuestionTableProps {
  data: TestQuestionResponse[];
  loading: boolean;
  onEdit: (record: TestQuestionResponse) => void;
  onDelete: (questionId: number) => void;
}

export function TestQuestionTable({ data, loading, onEdit, onDelete }: TestQuestionTableProps) {
  const columns: ColumnsType<TestQuestionResponse> = [
    {
      title: '순번',
      dataIndex: 'sequence',
      width: 80,
      sorter: (a, b) => a.sequence - b.sequence,
      defaultSortOrder: 'ascend',
    },
    {
      title: '카테고리',
      dataIndex: 'category',
      width: 130,
      render: (category: TestQuestionResponse['category']) => {
        const config = ZTPI_CATEGORY_CONFIG[category];
        return <Tag color={config.color}>{config.label}</Tag>;
      },
    },
    {
      title: '내용',
      dataIndex: 'content',
      ellipsis: true,
    },
    {
      title: '역채점',
      dataIndex: 'isReversed',
      width: 80,
      render: (isReversed: boolean) => (
        <Tag color={isReversed ? 'red' : 'default'}>{isReversed ? 'Y' : 'N'}</Tag>
      ),
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
                title: '문항 삭제',
                content: `${record.sequence}번 문항을 삭제하시겠습니까?`,
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
      dataSource={data}
      rowKey="id"
      loading={loading}
      scroll={{ x: 600 }}
      pagination={false}
    />
  );
}
