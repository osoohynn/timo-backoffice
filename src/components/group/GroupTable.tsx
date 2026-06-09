import { Button, Space, Table, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { GroupResponse } from '../../types';
import { showConfirmModal } from '../common/ConfirmModal';

interface GroupTableProps {
  data: GroupResponse[];
  loading: boolean;
  onDelete: (id: number) => void;
}

const GROUP_TYPE_LABEL: Record<string, string> = {
  FRIEND: '친구',
  CHARACTER: '캐릭터',
};

export function GroupTable({ data, loading, onDelete }: GroupTableProps) {
  const columns: ColumnsType<GroupResponse> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '유형',
      dataIndex: 'type',
      width: 120,
      render: (type: string) => <Tag>{GROUP_TYPE_LABEL[type] ?? type}</Tag>,
    },
    {
      title: '이름',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '이미지',
      dataIndex: 'image',
      ellipsis: true,
      render: (image?: string) => image || '-',
    },
    {
      title: '액션',
      width: 80,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              showConfirmModal({
                title: '그룹 삭제',
                content: `"${record.name}" 그룹을 삭제하시겠습니까?`,
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
      scroll={{ x: 500 }}
      pagination={false}
    />
  );
}
