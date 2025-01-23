import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // 检查 sessionStorage 中的登录状态和用户名
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true' && 
                     sessionStorage.getItem('username');

  // 如果未登录，重定向到登录页面
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}