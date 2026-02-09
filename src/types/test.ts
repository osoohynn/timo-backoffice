export type TestType = 'ZTPI_15' | 'ZTPI_56';

export interface TestResponse {
  id: number;
  type: TestType;
  name: string;
  description: string;
  createdAt: string;
}

export interface CreateTestRequest {
  type: TestType;
  name: string;
  description: string;
}

export interface UpdateTestRequest {
  type?: TestType;
  name?: string;
  description?: string;
}
