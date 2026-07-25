import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Switch, Button, Space, Divider, Typography, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customizationSchema, type CustomizationFormData } from '../../utils/validation';
import type { AdminCustomizationItemDetailResponse } from '../../types';
import { useTimePerspectiveCategories } from '../../hooks/useTimePerspectiveCategories';

const { Text } = Typography;

const CATEGORY_OPTIONS = [
  { value: 'PAST_NEGATIVE', label: '과거부정' },
  { value: 'PAST_POSITIVE', label: '과거긍정' },
  { value: 'PRESENT_HEDONISTIC', label: '현재쾌락' },
  { value: 'PRESENT_FATALISTIC', label: '현재운명' },
  { value: 'FUTURE', label: '미래' },
];

const TYPE_LABEL: Record<string, string> = {
  THEME: '테마',
  DECORATION: '장식',
};

const DEFAULT_VALUES: CustomizationFormData = {
  name: '',
  type: 'THEME',
  description: '',
  unlockConditionType: 'TOTAL_COUNT',
  unlockConditionCount: 1,
  usesCharacterImage: false,
  images: CATEGORY_OPTIONS.map(({ value }) => ({
    category: value as CustomizationFormData['images'][number]['category'],
    image: '',
    imageWithoutBackground: '',
  })),
};

interface CustomizationFormModalProps {
  open: boolean;
  item: AdminCustomizationItemDetailResponse | null;
  onClose: () => void;
  onSubmit: (data: CustomizationFormData) => void;
  loading?: boolean;
}

function ImagePreview({ url }: { url: string }) {
  if (!url) return null;
  return (
    <img
      src={url}
      alt="preview"
      style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4, marginTop: 4, border: '1px solid #f0f0f0', display: 'block' }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

export function CustomizationFormModal({
  open,
  item,
  onClose,
  onSubmit,
  loading,
}: CustomizationFormModalProps) {
  const isEdit = item !== null;
  const { data: tpCategories } = useTimePerspectiveCategories();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CustomizationFormData>({
    resolver: zodResolver(customizationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { fields, remove } = useFieldArray({ control, name: 'images' });
  const usesCharacterImage = useWatch({ control, name: 'usesCharacterImage' });
  const watchedImages = useWatch({ control, name: 'images' });
  const selectedType = useWatch({ control, name: 'type' });

  useEffect(() => {
    if (open) {
      if (item) {
        reset({
          name: item.name,
          type: item.type,
          description: item.description ?? '',
          unlockConditionType: item.unlockConditionType,
          unlockConditionCount: item.unlockConditionCount,
          usesCharacterImage: item.usesCharacterImage,
          images: item.images.length > 0 ? item.images : DEFAULT_VALUES.images,
        });
      } else {
        reset(DEFAULT_VALUES);
      }
    }
  }, [open, item, reset]);

  useEffect(() => {
    if (!isEdit && selectedType === 'THEME' && usesCharacterImage) {
      setValue('usesCharacterImage', false);
    }
  }, [selectedType, isEdit, usesCharacterImage, setValue]);

  useEffect(() => {
    if (!isEdit) {
      if (usesCharacterImage && tpCategories) {
        CATEGORY_OPTIONS.forEach(({ value: category }, index) => {
          const match = tpCategories.find(
            (c) => c.englishName === category && c.image
          );
          if (match?.image) {
            setValue(`images.${index}.image`, match.image);
          }
        });
      } else if (!usesCharacterImage) {
        CATEGORY_OPTIONS.forEach((_, index) => {
          setValue(`images.${index}.image`, '');
          setValue(`images.${index}.imageWithoutBackground`, '');
        });
      }
    }
  }, [usesCharacterImage, tpCategories, isEdit, setValue]);

  return (
    <Modal
      title={isEdit ? '커스터마이징 아이템 수정' : '커스터마이징 아이템 생성'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={loading}
      okText={isEdit ? '수정' : '생성'}
      cancelText="취소"
      width={680}
      destroyOnHidden
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="아이템명"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="아이템명을 입력하세요" />}
          />
        </Form.Item>

        <Space style={{ width: '100%' }} size={12}>
          <Form.Item
            label="유형"
            style={{ flex: 1, marginBottom: 0 }}
            help={!isEdit ? <Text type="secondary" style={{ fontSize: 12 }}>생성 후 변경할 수 없습니다</Text> : undefined}
            validateStatus={!isEdit && errors.type ? 'error' : ''}
          >
            {isEdit ? (
              <Tag style={{ fontSize: 14, padding: '4px 10px' }}>{TYPE_LABEL[item.type]}</Tag>
            ) : (
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: '100%' }}
                    options={[
                      { value: 'THEME', label: '테마' },
                      { value: 'DECORATION', label: '장식' },
                    ]}
                  />
                )}
              />
            )}
          </Form.Item>

          <Form.Item
            label="잠금해제 조건 유형"
            validateStatus={errors.unlockConditionType ? 'error' : ''}
            help={errors.unlockConditionType?.message}
            style={{ flex: 1, marginBottom: 0 }}
          >
            <Controller
              name="unlockConditionType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'TOTAL_COUNT', label: '총 횟수' },
                    { value: 'STREAK_COUNT', label: '연속 횟수' },
                  ]}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="조건값"
            validateStatus={errors.unlockConditionCount ? 'error' : ''}
            help={errors.unlockConditionCount?.message}
            style={{ width: 100, marginBottom: 0 }}
          >
            <Controller
              name="unlockConditionCount"
              control={control}
              render={({ field }) => (
                <InputNumber {...field} min={1} style={{ width: '100%' }} />
              )}
            />
          </Form.Item>
        </Space>

        <Form.Item label="설명" style={{ marginTop: 16 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={2} placeholder="설명을 입력하세요 (선택)" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="캐릭터 이미지 사용"
          help={
            !isEdit
              ? selectedType === 'THEME'
                ? <Text type="secondary" style={{ fontSize: 12 }}>테마 유형은 캐릭터 이미지를 사용할 수 없습니다</Text>
                : <Text type="secondary" style={{ fontSize: 12 }}>생성 후 변경할 수 없습니다</Text>
              : undefined
          }
        >
          <Controller
            name="usesCharacterImage"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onChange={field.onChange} disabled={isEdit || selectedType === 'THEME'} />
            )}
          />
        </Form.Item>

        <Divider />

        <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong>이미지 목록</Text>
          {errors.images?.root && (
            <Text type="danger" style={{ fontSize: 12 }}>{errors.images.root.message}</Text>
          )}
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{ border: '1px solid #f0f0f0', borderRadius: 8, padding: 12, marginBottom: 8 }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <Form.Item label="카테고리" style={{ width: 120, marginBottom: 0, flexShrink: 0 }}>
                {isEdit ? (
                  <Controller
                    name={`images.${index}.category`}
                    control={control}
                    render={({ field }) => (
                      <Select {...field} style={{ width: '100%' }} options={CATEGORY_OPTIONS} />
                    )}
                  />
                ) : (
                  <Text style={{ lineHeight: '32px' }}>
                    {CATEGORY_OPTIONS.find((o) => o.value === field.category)?.label ?? field.category}
                  </Text>
                )}
              </Form.Item>

              <Form.Item
                label={usesCharacterImage ? '캐릭터 이미지 URL' : '이미지 URL'}
                validateStatus={errors.images?.[index]?.image ? 'error' : ''}
                help={errors.images?.[index]?.image?.message}
                style={{ flex: 1, marginBottom: 0 }}
              >
                <Controller
                  name={`images.${index}.image`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder={usesCharacterImage ? '캐릭터 이미지 URL' : '이미지 URL을 입력하세요'} />
                  )}
                />
                <ImagePreview url={watchedImages?.[index]?.image ?? ''} />
              </Form.Item>

              {!usesCharacterImage && (
                <Form.Item
                  label="배경 없는 이미지 URL"
                  validateStatus={errors.images?.[index]?.imageWithoutBackground ? 'error' : ''}
                  help={errors.images?.[index]?.imageWithoutBackground?.message}
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  <Controller
                    name={`images.${index}.imageWithoutBackground`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="배경 없는 이미지 URL을 입력하세요" />
                    )}
                  />
                  <ImagePreview url={watchedImages?.[index]?.imageWithoutBackground ?? ''} />
                </Form.Item>
              )}

              {isEdit && (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  style={{ marginTop: 30 }}
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                />
              )}
            </div>
          </div>
        ))}

      </Form>
    </Modal>
  );
}
