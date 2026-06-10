export const ENDPOINTS = {
  auth: {
    login: '/test-auth/login',
    reissue: '/test-auth/reissue',
    logout: '/auth/logout',
    me: '/users/me',
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
    base: '/introductions',
    admin: '/admin/introductions',
    adminById: (id: number) => `/admin/introductions/${id}`,
  },
  groups: {
    base: '/groups',
    byId: (id: number) => `/groups/${id}`,
    admin: '/admin/groups',
    adminById: (id: number) => `/admin/groups/${id}`,
    adminSeed: '/admin/groups/seed',
  },
  reflections: {
    adminById: (id: number) => `/admin/reflections/${id}`,
    adminFeedbackById: (id: number) => `/admin/reflection-feedbacks/${id}`,
  },
  timePerspectiveCategories: {
    base: '/time-perspective-categories',
    byId: (id: number) => `/time-perspective-categories/${id}`,
    admin: '/admin/time-perspective-categories',
    adminById: (id: number) => `/admin/time-perspective-categories/${id}`,
  },
  images: {
    upload: '/images',
  },
} as const;
