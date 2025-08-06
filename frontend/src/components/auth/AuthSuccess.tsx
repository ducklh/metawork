import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
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

const Title = styled.h2`
  color: #333;
  margin-bottom: 16px;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 0;
`;

const AuthSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login, checkAuth } = useAuth();

    useEffect(() => {
        const handleAuthSuccess = async () => {
            const token = searchParams.get('token');

            if (token) {
                // Store token temporarily
                localStorage.setItem('token', token);

                // Check auth to get user data
                await checkAuth();

                // Navigate to dashboard
                navigate('/dashboard');
            } else {
                // No token, redirect to login
                navigate('/login');
            }
        };

        handleAuthSuccess();
    }, [searchParams, navigate, checkAuth]);

    return (
        <Container>
            <Card>
                <Spinner />
                <Title>Đang xử lý...</Title>
                <Message>Vui lòng chờ trong giây lát</Message>
            </Card>
        </Container>
    );
};

export default AuthSuccess;