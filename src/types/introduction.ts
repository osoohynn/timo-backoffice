export interface IntroductionResponse {
  id: number;
  version: number;
  content: string;
  createdAt: string;
}

export interface CreateIntroductionRequest {
  version: number;
  content: string;
}

export interface UpdateIntroductionRequest {
  version?: number;
  content?: string;
}
