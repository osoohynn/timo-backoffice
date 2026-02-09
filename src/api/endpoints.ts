export const ENDPOINTS = {
  auth: {
    login: '/test-auth/login',
    reissue: '/test-auth/reissue',
    logout: '/auth/logout',
  },
  tests: {
    base: '/tests',
    byId: (testId: number) => `/tests/${testId}`,
    admin: '/admin/tests',
    adminById: (testId: number) => `/admin/tests/${testId}`,
  },
  testQuestions: {
    base: (testId: number) => `/tests/${testId}/questions`,
    admin: (testId: number) => `/admin/tests/${testId}/questions`,
    adminById: (testId: number, questionId: number) =>
      `/admin/tests/${testId}/questions/${questionId}`,
  },
  reflectionQuestions: {
    admin: '/admin/questions',
    adminById: (questionId: number) => `/admin/questions/${questionId}`,
  },
  feedbackPrompts: {
    base: '/feedback-prompts',
    byVersion: (version: number) => `/feedback-prompts/${version}`,
  },
  introductions: {
    admin: '/admin/introductions',
    adminByVersion: (version: number) => `/admin/introductions/${version}`,
  },
} as const;
