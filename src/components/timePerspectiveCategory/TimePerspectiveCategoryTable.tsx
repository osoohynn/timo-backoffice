import { Button, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TimePerspectiveCategoryResponse } from '../../types';
import { showConfirmModal } from '../common/ConfirmModal';

interface TimePerspectiveCategoryTableProps {
  data: TimePerspectiveCategoryResponse[];
  loading: boolean;
  onEdit: (record: TimePerspectiveCategoryResponse) => void;
  onDelete: (id: number) => void;
}

export function TimePerspectiveCategoryTable({
  data,
  loading,
  onEdit,
  onDelete,
}: TimePerspectiveCategoryTableProps) {
  const columns: ColumnsType<TimePerspectiveCategoryResponse> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '이름',
      dataIndex: 'name',
      width: 140,
    },
    {
      title: '영문명',
      dataIndex: 'englishName',
      width: 160,
      render: (v?: string) => v || '-',
    },
    {
      title: '캐릭터명',
      dataIndex: 'characterName',
      width: 140,
      render: (v?: string) => v || '-',
    },
    {
      title: '설명',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '이상값',
      dataIndex: 'idealValue',
      width: 100,
      render: (v?: number) => (v != null ? v : '-'),
    },
    {
      title: '액션',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              showConfirmModal({
                title: '카테고리 삭제',
                content: `"${record.name}" 카테고리를 삭제하시겠습니까?`,
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
      scroll={{ x: 800 }}
      pagination={false}
    />
  );
}
