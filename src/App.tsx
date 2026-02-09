import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TestListPage } from './pages/test/TestListPage';
import { TestQuestionPage } from './pages/testQuestion/TestQuestionPage';
import { ReflectionQuestionPage } from './pages/reflectionQuestion/ReflectionQuestionPage';
import { FeedbackPromptPage } from './pages/feedbackPrompt/FeedbackPromptPage';
import { IntroductionPage } from './pages/introduction/IntroductionPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={koKR}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/tests" element={<TestListPage />} />
                <Route path="/test-questions" element={<TestQuestionPage />} />
                <Route path="/reflection-questions" element={<ReflectionQuestionPage />} />
                <Route path="/feedback-prompts" element={<FeedbackPromptPage />} />
                <Route path="/introductions" element={<IntroductionPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
