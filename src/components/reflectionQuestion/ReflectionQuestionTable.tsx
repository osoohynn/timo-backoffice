import { Button, Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TablePaginationConfig } from 'antd';
import type { ReflectionQuestionResponse } from '../../types';
import { ZTPI_CATEGORY_CONFIG } from '../../utils/constants';
import { formatDate } from '../../utils/format';
import { showConfirmModal } from '../common/ConfirmModal';

interface ReflectionQuestionTableProps {
  data: ReflectionQuestionResponse[];
  loading: boolean;
  pagination: TablePaginationConfig;
  onEdit: (record: ReflectionQuestionResponse) => void;
  onDelete: (id: number) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
}

export function ReflectionQuestionTable({
  data,
  loading,
  pagination,
  onEdit,
  onDelete,
  onPaginationChange,
}: ReflectionQuestionTableProps) {
  const columns: ColumnsType<ReflectionQuestionResponse> = [
    {
      title: '순번',
      dataIndex: 'sequence',
      width: 80,
    },
    {
      title: '카테고리',
      dataIndex: 'category',
      width: 130,
      render: (category: ReflectionQuestionResponse['category']) => {
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
      title: '작성자',
      dataIndex: 'createdBy',
      width: 120,
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
                title: '질문 삭제',
                content: '이 질문을 삭제하시겠습니까?',
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
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showTotal: (total) => `총 ${total}건`,
        onChange: onPaginationChange,
      }}
    />
  );
}
