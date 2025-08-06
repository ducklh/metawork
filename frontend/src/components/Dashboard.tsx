import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import Button from './common/Button';

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const Header = styled.header`
  background: white;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: #667eea;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.div<{ src?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.src ? `url(${props.src})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #333;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const WelcomeCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const WelcomeTitle = styled.h2`
  color: #333;
  font-size: 32px;
  margin-bottom: 16px;
`;

const WelcomeMessage = styled.p`
  color: #666;
  font-size: 18px;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 16px;
`;

const Dashboard: React.FC = () => {
    const { state, logout } = useAuth();
    const { user } = state;

    const handleLogout = () => {
        logout();
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Container>
            <Header>
                <Nav>
                    <Logo>MetaWork</Logo>
                    <UserInfo>
                        <Avatar src={user?.avatar}>
                            {!user?.avatar && user?.name && getInitials(user.name)}
                        </Avatar>
                        <UserName>{user?.name}</UserName>
                        <Button variant="secondary" onClick={handleLogout}>
                            Đăng xuất
                        </Button>
                    </UserInfo>
                </Nav>
            </Header>

            <Main>
                <WelcomeCard>
                    <WelcomeTitle>Chào mừng, {user?.name}! 👋</WelcomeTitle>
                    <WelcomeMessage>
                        Bạn đã đăng nhập thành công vào hệ thống MetaWork.
                        Đây là trang dashboard của bạn, nơi bạn có thể quản lý tài khoản và xem thông tin cá nhân.
                    </WelcomeMessage>

                    <div>
                        <strong>Email:</strong> {user?.email}
                    </div>
                    {user?.isVerified && (
                        <div style={{ marginTop: '8px', color: '#28a745' }}>
                            ✅ Tài khoản đã được xác thực
                        </div>
                    )}
                </WelcomeCard>

                <StatsGrid>
                    <StatCard>
                        <StatNumber>1</StatNumber>
                        <StatLabel>Tài khoản hoạt động</StatLabel>
                    </StatCard>

                    <StatCard>
                        <StatNumber>0</StatNumber>
                        <StatLabel>Dự án</StatLabel>
                    </StatCard>

                    <StatCard>
                        <StatNumber>0</StatNumber>
                        <StatLabel>Nhiệm vụ</StatLabel>
                    </StatCard>
                </StatsGrid>
            </Main>
        </Container>
    );
};

export default Dashboard;