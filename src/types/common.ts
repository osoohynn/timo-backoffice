export interface PageResponse<T> {
  content: T[];
  totalCount: number;
  page: number;
  size: number;
}

export interface PageParams {
  page?: number;
  size?: number;
}
