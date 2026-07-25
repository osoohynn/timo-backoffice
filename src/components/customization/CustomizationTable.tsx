import { Button, Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { AdminCustomizationItemResponse } from '../../types';
import { showConfirmModal } from '../common/ConfirmModal';

interface CustomizationTableProps {
  data: AdminCustomizationItemResponse[];
  loading: boolean;
  onEdit: (record: AdminCustomizationItemResponse) => void;
  onDelete: (id: number) => void;
}

const TYPE_LABEL: Record<string, string> = {
  THEME: '테마',
  DECORATION: '장식',
};

const CONDITION_TYPE_LABEL: Record<string, string> = {
  TOTAL_COUNT: '총 횟수',
  STREAK_COUNT: '연속 횟수',
};

export function CustomizationTable({ data, loading, onEdit, onDelete }: CustomizationTableProps) {
  const columns: ColumnsType<AdminCustomizationItemResponse> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 70,
    },
    {
      title: '이름',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '유형',
      dataIndex: 'type',
      width: 90,
      render: (type: string) => <Tag>{TYPE_LABEL[type] ?? type}</Tag>,
    },
    {
      title: '설명',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '잠금해제 조건',
      dataIndex: 'unlockConditionType',
      width: 130,
      render: (type: string) => CONDITION_TYPE_LABEL[type] ?? type,
    },
    {
      title: '조건값',
      dataIndex: 'unlockConditionCount',
      width: 80,
    },
    {
      title: '캐릭터 이미지',
      dataIndex: 'usesCharacterImage',
      width: 110,
      render: (val: boolean) => (val ? '사용' : '-'),
    },
    {
      title: '액션',
      width: 90,
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
                title: '아이템 삭제',
                content: `"${record.name}" 아이템을 삭제하시겠습니까?`,
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
