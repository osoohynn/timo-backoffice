export type ZtpiCategory =
  | 'PAST_NEGATIVE'
  | 'PAST_POSITIVE'
  | 'PRESENT_HEDONISTIC'
  | 'PRESENT_FATALISTIC'
  | 'FUTURE';

export interface TestQuestionResponse {
  id: number;
  testId: number;
  category: ZtpiCategory;
  content: string;
  sequence: number;
  isReversed: boolean;
  createdAt: string;
}

export interface CreateTestQuestionRequest {
  category: ZtpiCategory;
  content: string;
  sequence: number;
  isReversed: boolean;
}

export interface UpdateTestQuestionRequest {
  category?: ZtpiCategory;
  content?: string;
  sequence?: number;
  isReversed?: boolean;
}
