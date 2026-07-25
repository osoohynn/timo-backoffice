import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
});

export const testSchema = z.object({
  type: z.enum(['ZTPI_15', 'ZTPI_56'], '검사 유형을 선택하세요'),
  name: z.string().min(1, '검사명을 입력하세요'),
  description: z.string().min(1, '설명을 입력하세요'),
});

export const testQuestionSchema = z.object({
  category: z.enum(
    ['PAST_NEGATIVE', 'PAST_POSITIVE', 'PRESENT_HEDONISTIC', 'PRESENT_FATALISTIC', 'FUTURE'],
    '카테고리를 선택하세요'
  ),
  content: z.string().min(1, '질문 내용을 입력하세요'),
  sequence: z.number({ error: '순번을 입력하세요' }).min(1, '순번은 1 이상이어야 합니다'),
  isReversed: z.boolean(),
});

export const reflectionQuestionSchema = z.object({
  category: z.enum(
    ['PAST_NEGATIVE', 'PAST_POSITIVE', 'PRESENT_HEDONISTIC', 'PRESENT_FATALISTIC', 'FUTURE'],
    '카테고리를 선택하세요'
  ),
  content: z.string().min(1, '질문 내용을 입력하세요'),
  createdBy: z.string().min(1, '작성자를 입력하세요'),
});

export const feedbackPromptSchema = z.object({
  version: z.number({ error: '버전을 입력하세요' }).min(1, '버전은 1 이상이어야 합니다'),
  content: z.string().min(1, '내용을 입력하세요'),
});

export const introductionSchema = z.object({
  version: z.number({ error: '버전을 입력하세요' }).min(1, '버전은 1 이상이어야 합니다'),
  sequence: z.number({ error: '순번을 입력하세요' }).min(1, '순번은 1 이상이어야 합니다'),
  title: z.string().min(1, '제목을 입력하세요'),
  description: z.string().min(1, '설명을 입력하세요'),
  imageUrl: z.string().min(1, '이미지 URL을 입력하세요'),
});

export const groupSchema = z.object({
  name: z.string().min(1, '그룹명을 입력하세요'),
  type: z.enum(['FRIEND', 'CHARACTER'], '그룹 유형을 선택하세요'),
  image: z.string().optional(),
});

export const timePerspectiveCategorySchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  englishName: z.string().optional(),
  characterName: z.string().optional(),
  personality: z.string().optional(),
  description: z.string().min(1, '설명을 입력하세요'),
  idealValue: z.number().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type TestFormData = z.infer<typeof testSchema>;
export type TestQuestionFormData = z.infer<typeof testQuestionSchema>;
export type ReflectionQuestionFormData = z.infer<typeof reflectionQuestionSchema>;
export type FeedbackPromptFormData = z.infer<typeof feedbackPromptSchema>;
export type IntroductionFormData = z.infer<typeof introductionSchema>;
export type GroupFormData = z.infer<typeof groupSchema>;
export type TimePerspectiveCategoryFormData = z.infer<typeof timePerspectiveCategorySchema>;

export const customizationImageSchema = z.object({
  category: z.enum(
    ['PAST_NEGATIVE', 'PAST_POSITIVE', 'PRESENT_HEDONISTIC', 'PRESENT_FATALISTIC', 'FUTURE'],
    '카테고리를 선택하세요'
  ),
  image: z.string().min(1, '이미지 URL을 입력하세요'),
  imageWithoutBackground: z.string().min(1, '배경 없는 이미지 URL을 입력하세요'),
});

export const customizationSchema = z.object({
  name: z.string().min(1, '아이템명을 입력하세요'),
  type: z.enum(['THEME', 'DECORATION'], '유형을 선택하세요'),
  description: z.string(),
  unlockConditionType: z.enum(['TOTAL_COUNT', 'STREAK_COUNT'], '조건 유형을 선택하세요'),
  unlockConditionCount: z.number({ error: '조건값을 입력하세요' }).min(1, '1 이상이어야 합니다'),
  usesCharacterImage: z.boolean(),
  images: z.array(customizationImageSchema).min(1, '이미지를 1개 이상 추가하세요'),
});

export type CustomizationFormData = z.infer<typeof customizationSchema>;
