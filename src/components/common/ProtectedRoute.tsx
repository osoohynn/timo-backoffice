import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuthCheck } from '../../hooks/useAuth';

export function ProtectedRoute() {
  const { isLoading, isError } = useAuthCheck();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
