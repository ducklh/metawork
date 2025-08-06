import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import Button from '../common/Button';
import Input from '../common/Input';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 8px;
  color: #333;
  font-size: 28px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 32px;
  font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GoogleButton = styled(Button)`
  margin-top: 16px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e1e5e9;
  }
  
  span {
    padding: 0 16px;
    color: #666;
    font-size: 14px;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #666;
  
  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await authAPI.login(formData);
            login(response.user, response.token);
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Đã xảy ra lỗi');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
        <Container>
            <LoginCard>
                <Title>Chào mừng trở lại</Title>
                <Subtitle>Đăng nhập vào tài khoản của bạn</Subtitle>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={formData.email}
                        onChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                        label="Email"
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                        label="Mật khẩu"
                        required
                    />

                    <Button
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                    >
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </Button>
                </Form>

                <Divider>
                    <span>hoặc</span>
                </Divider>

                <GoogleButton
                    variant="google"
                    onClick={handleGoogleLogin}
                    fullWidth
                >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Đăng nhập bằng Google
                </GoogleButton>

                <SignupLink>
                    Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                </SignupLink>
            </LoginCard>
        </Container>
    );
};

export default Login;