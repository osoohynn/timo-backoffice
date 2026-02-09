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
  content: z.string().min(1, '내용을 입력하세요'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type TestFormData = z.infer<typeof testSchema>;
export type TestQuestionFormData = z.infer<typeof testQuestionSchema>;
export type ReflectionQuestionFormData = z.infer<typeof reflectionQuestionSchema>;
export type FeedbackPromptFormData = z.infer<typeof feedbackPromptSchema>;
export type IntroductionFormData = z.infer<typeof introductionSchema>;
