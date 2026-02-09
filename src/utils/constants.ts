import type { ZtpiCategory, TestType } from '../types';

export const ZTPI_CATEGORY_CONFIG: Record<
  ZtpiCategory,
  { color: string; label: string }
> = {
  PAST_NEGATIVE: { color: 'red', label: '과거 부정' },
  PAST_POSITIVE: { color: 'green', label: '과거 긍정' },
  PRESENT_HEDONISTIC: { color: 'orange', label: '현재 쾌락' },
  PRESENT_FATALISTIC: { color: 'purple', label: '현재 운명' },
  FUTURE: { color: 'blue', label: '미래' },
};

export const TEST_TYPE_CONFIG: Record<TestType, { label: string }> = {
  ZTPI_15: { label: 'ZTPI 15문항' },
  ZTPI_56: { label: 'ZTPI 56문항' },
};

export const ZTPI_CATEGORY_OPTIONS = Object.entries(ZTPI_CATEGORY_CONFIG).map(
  ([value, { label }]) => ({ label, value })
);

export const TEST_TYPE_OPTIONS = Object.entries(TEST_TYPE_CONFIG).map(
  ([value, { label }]) => ({ label, value })
);
