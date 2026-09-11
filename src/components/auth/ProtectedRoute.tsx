import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowGuest?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowGuest = true,
}) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#F8FAFC',
        color: '#64748B',
        fontSize: '14px',
        fontWeight: 600
      }}>
        인증 정보를 확인하는 중입니다...
      </div>
    );
  }

  const isGuest = localStorage.getItem('wavescan_guest') === 'true';

  if (!isLoggedIn) {
    if (!allowGuest || !isGuest) {
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
