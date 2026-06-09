import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { GroupResponse } from '../../types';

interface GroupTableProps {
  data: GroupResponse[];
  loading: boolean;
}

const GROUP_TYPE_LABEL: Record<string, string> = {
  FRIEND: '친구',
  CHARACTER: '캐릭터',
};

export function GroupTable({ data, loading }: GroupTableProps) {
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
