import { useState } from 'react';
import { Button, Input, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { ReflectionQuestionTable } from '../../components/reflectionQuestion/ReflectionQuestionTable';
import { ReflectionQuestionFormModal } from '../../components/reflectionQuestion/ReflectionQuestionFormModal';
import {
  useReflectionQuestions,
  useCreateReflectionQuestion,
  useUpdateReflectionQuestion,
  useDeleteReflectionQuestion,
} from '../../hooks/useReflectionQuestions';
import type { ReflectionQuestionResponse, ZtpiCategory } from '../../types';
import type { ReflectionQuestionFormData } from '../../utils/validation';
import { ZTPI_CATEGORY_OPTIONS } from '../../utils/constants';

const { Search } = Input;

export function ReflectionQuestionPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ZtpiCategory | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<ReflectionQuestionResponse | null>(null);

  const { data, isLoading } = useReflectionQuestions({
    page,
    size: pageSize,
    keyword: keyword || undefined,
    category: categoryFilter,
  });

  const createMutation = useCreateReflectionQuestion();
  const updateMutation = useUpdateReflectionQuestion();
  const deleteMutation = useDeleteReflectionQuestion();

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setPage(newPage - 1);
    setPageSize(newPageSize);
  };

  const handleSearch = (value: string) => {
    setKeyword(value);
    setPage(0);
  };

  const handleCategoryChange = (value: ZtpiCategory | undefined) => {
    setCategoryFilter(value);
    setPage(0);
  };

  const handleOpenCreate = () => {
    setEditingQuestion(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (record: ReflectionQuestionResponse) => {
    setEditingQuestion(record);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSubmit = (formData: ReflectionQuestionFormData) => {
    if (editingQuestion) {
      updateMutation.mutate(
        { questionId: editingQuestion.id, data: { content: formData.content, createdBy: formData.createdBy } },
        { onSuccess: handleClose }
      );
    } else {
      createMutation.mutate(formData, { onSuccess: handleClose });
    }
  };

  return (
    <div>
      <PageHeader
        title="성찰 질문 관리"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
            질문 추가
          </Button>
        }
      />
      <Space style={{ marginBottom: 16 }} wrap>
        <Search
          placeholder="키워드 검색"
          allowClear
          onSearch={handleSearch}
          style={{ width: 250 }}
        />
        <Select
          placeholder="카테고리"
          allowClear
          style={{ width: 160 }}
          options={ZTPI_CATEGORY_OPTIONS}
          onChange={handleCategoryChange}
        />
      </Space>
      <ReflectionQuestionTable
        data={data?.content || []}
        loading={isLoading}
        pagination={{
          current: page + 1,
          pageSize,
          total: data?.totalCount || 0,
        }}
        onEdit={handleOpenEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
        onPaginationChange={handlePaginationChange}
      />
      <ReflectionQuestionFormModal
        open={modalOpen}
        question={editingQuestion}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
