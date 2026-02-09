import type { ZtpiCategory } from './testQuestion';

export interface ReflectionQuestionResponse {
  id: number;
  sequence: number;
  category: ZtpiCategory;
  content: string;
  createdBy: string;
  createdAt: string;
}

export interface CreateReflectionQuestionRequest {
  category: ZtpiCategory;
  content: string;
  createdBy: string;
}

export interface UpdateReflectionQuestionRequest {
  content?: string;
  createdBy?: string;
}

export interface ReflectionQuestionFilters {
  keyword?: string;
  category?: ZtpiCategory;
}
