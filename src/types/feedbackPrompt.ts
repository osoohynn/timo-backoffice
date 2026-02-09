export interface FeedbackPromptResponse {
  id: number;
  version: number;
  content: string;
}

export interface FeedbackPromptDetailResponse {
  id: number;
  version: number;
  content: string;
  createdAt: string;
}

export interface CreateFeedbackPromptRequest {
  version: number;
  content: string;
}

export interface UpdateFeedbackPromptRequest {
  content: string;
}
