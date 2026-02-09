import { useState } from 'react';
import { Button, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/common/PageHeader';
import { TestQuestionTable } from '../../components/testQuestion/TestQuestionTable';
import { TestQuestionFormModal } from '../../components/testQuestion/TestQuestionFormModal';
import { useTests } from '../../hooks/useTests';
import {
  useTestQuestions,
  useCreateTestQuestion,
  useUpdateTestQuestion,
  useDeleteTestQuestion,
} from '../../hooks/useTestQuestions';
import type { TestQuestionResponse, ZtpiCategory } from '../../types';
import type { TestQuestionFormData } from '../../utils/validation';
import { ZTPI_CATEGORY_OPTIONS } from '../../utils/constants';

export function TestQuestionPage() {
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<ZtpiCategory | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<TestQuestionResponse | null>(null);

  const { data: tests } = useTests();
  const { data: questions, isLoading } = useTestQuestions(selectedTestId ?? 0);
  const createMutation = useCreateTestQuestion(selectedTestId ?? 0);
  const updateMutation = useUpdateTestQuestion(selectedTestId ?? 0);
  const deleteMutation = useDeleteTestQuestion(selectedTestId ?? 0);

  const filteredQuestions = categoryFilter
    ? questions?.filter((q) => q.category === categoryFilter)
    : questions;

  const handleOpenCreate = () => {
    setEditingQuestion(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (record: TestQuestionResponse) => {
    setEditingQuestion(record);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSubmit = (formData: TestQuestionFormData) => {
    if (editingQuestion) {
      updateMutation.mutate(
        { questionId: editingQuestion.id, data: formData },
        { onSuccess: handleClose }
      );
    } else {
      createMutation.mutate(formData, { onSuccess: handleClose });
    }
  };

  const testOptions = tests?.map((t) => ({ label: `${t.name} (${t.type})`, value: t.id })) || [];

  return (
    <div>
      <PageHeader
        title="검사 문항 관리"
        extra={
          selectedTestId && (
            <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
              문항 추가
            </Button>
          )
        }
      />
      <Space style={{ marginBottom: 16 }} wrap>
        <Select
          placeholder="검사를 선택하세요"
          style={{ width: 280 }}
          options={testOptions}
          onChange={(value) => {
            setSelectedTestId(value);
            setCategoryFilter(undefined);
          }}
          allowClear
        />
        {selectedTestId && (
          <Select
            placeholder="카테고리 필터"
            style={{ width: 160 }}
            options={ZTPI_CATEGORY_OPTIONS}
            onChange={(value) => setCategoryFilter(value)}
            allowClear
            value={categoryFilter}
          />
        )}
      </Space>
      {selectedTestId && (
        <TestQuestionTable
          data={filteredQuestions || []}
          loading={isLoading}
          onEdit={handleOpenEdit}
          onDelete={(questionId) => deleteMutation.mutate(questionId)}
        />
      )}
      <TestQuestionFormModal
        open={modalOpen}
        question={editingQuestion}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
