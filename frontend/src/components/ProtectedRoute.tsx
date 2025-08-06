import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoadingCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 0 auto 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #666;
  margin: 0;
`;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { state } = useAuth();
    const location = useLocation();

    // Show loading while checking authentication
    if (state.isLoading) {
        return (
            <LoadingContainer>
                <LoadingCard>
                    <Spinner />
                    <LoadingText>Đang kiểm tra xác thực...</LoadingText>
                </LoadingCard>
            </LoadingContainer>
        );
    }

    // Redirect to login if not authenticated
    if (!state.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render protected content
    return <>{children}</>;
};

export default ProtectedRoute;