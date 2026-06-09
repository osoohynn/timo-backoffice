export interface TimePerspectiveCategoryResponse {
  id: number;
  name: string;
  englishName?: string;
  characterName?: string;
  personality?: string;
  description: string;
  idealValue?: number;
}

export interface CreateTimePerspectiveCategoryRequest {
  name: string;
  englishName?: string;
  characterName?: string;
  personality?: string;
  description: string;
  idealValue?: number;
}

export interface UpdateTimePerspectiveCategoryRequest {
  name: string;
  englishName?: string;
  characterName?: string;
  personality?: string;
  description: string;
  idealValue?: number;
}
