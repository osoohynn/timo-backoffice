import { Button, Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TestResponse } from '../../types';
import { TEST_TYPE_CONFIG } from '../../utils/constants';
import { formatDate } from '../../utils/format';
import { showConfirmModal } from '../common/ConfirmModal';

interface TestTableProps {
  data: TestResponse[];
  loading: boolean;
  onEdit: (record: TestResponse) => void;
  onDelete: (id: number) => void;
}

export function TestTable({ data, loading, onEdit, onDelete }: TestTableProps) {
  const columns: ColumnsType<TestResponse> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '유형',
      dataIndex: 'type',
      width: 140,
      render: (type: TestResponse['type']) => (
        <Tag>{TEST_TYPE_CONFIG[type].label}</Tag>
      ),
    },
    {
      title: '이름',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '설명',
      dataIndex: 'description',
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
                title: '검사 삭제',
                content: `"${record.name}" 검사를 삭제하시겠습니까?`,
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
