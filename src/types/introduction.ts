export interface IntroductionResponse {
  id: number;
  version: number;
  sequence: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface CreateIntroductionRequest {
  version: number;
  sequence: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface UpdateIntroductionRequest {
  version?: number;
  sequence?: number;
  title?: string;
  description?: string;
  imageUrl?: string;
}
