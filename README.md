# MetaWork - Ứng dụng Web với Authentication

Một ứng dụng web fullstack với React frontend và Node.js backend, hỗ trợ đăng ký, đăng nhập thông thường và đăng nhập bằng Google OAuth.

## 🚀 Tính năng

- ✅ Đăng ký tài khoản mới
- ✅ Đăng nhập với email/password
- ✅ Đăng nhập bằng Google OAuth 2.0
- ✅ JWT Authentication
- ✅ Dashboard sau khi đăng nhập
- ✅ Giao diện đẹp và responsive
- ✅ TypeScript support

## 🛠 Công nghệ sử dụng

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Passport.js (Google OAuth)
- bcryptjs (mã hóa mật khẩu)

### Frontend
- React 19 + TypeScript
- React Router DOM
- Styled Components
- Axios (HTTP client)
- Context API (state management)

## 📋 Yêu cầu hệ thống

- Node.js >= 16.x
- npm >= 8.x
- MongoDB (local hoặc MongoDB Atlas)
- Google OAuth credentials

## 🔧 Cài đặt và chạy dự án

### 🐳 Cách 1: Sử dụng Docker (Khuyến nghị)

#### Yêu cầu
- Docker và Docker Compose
- Google OAuth credentials

#### Thiết lập Google OAuth
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Bật Google+ API
4. Tạo OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`

#### Chạy với Docker

1. **Clone và cấu hình:**
```bash
cd metawork
cp docker.env.example .env
# Điền Google OAuth credentials vào file .env
```

2. **Chạy production mode:**
```bash
docker-compose up -d
```

3. **Chạy development mode (với hot reload):**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

4. **Xem logs:**
```bash
docker-compose logs -f
```

5. **Dừng services:**
```bash
docker-compose down
```

#### Docker Services:
- **Frontend**: http://localhost:3000 (Nginx + React)
- **Backend**: http://localhost:5000 (Node.js API)
- **MongoDB**: localhost:27017 (Database)

### 💻 Cách 2: Chạy Local (Development)

#### Yêu cầu
- Node.js >= 16.x
- MongoDB local hoặc MongoDB Atlas
- Google OAuth credentials

1. **Clone repository và cài đặt dependencies:**
```bash
cd metawork
npm run install-all
```

2. **Cấu hình Backend:**
Tạo file `.env` trong thư mục `backend/`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/metawork
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
SESSION_SECRET=your_session_secret_here
CLIENT_URL=http://localhost:3000
```

3. **Cấu hình Frontend:**
Tạo file `.env` trong thư mục `frontend/`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Khởi động MongoDB:**
```bash
mongod  # Local MongoDB
```

5. **Chạy ứng dụng:**
```bash
npm run dev  # Cả backend và frontend
```

## 📱 Sử dụng

1. Truy cập http://localhost:3000
2. Đăng ký tài khoản mới hoặc đăng nhập
3. Hoặc sử dụng "Đăng nhập bằng Google"
4. Sau khi đăng nhập thành công, bạn sẽ được chuyển đến Dashboard

## 🔐 API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/google` - Khởi tạo Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `POST /api/auth/logout` - Đăng xuất

### Request/Response Examples

#### Đăng ký
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "123456"
}
```

#### Đăng nhập
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "123456"
}
```

## 🎨 Giao diện

- Thiết kế hiện đại với gradient backgrounds
- Responsive design cho mọi thiết bị
- Form validation với thông báo lỗi
- Loading states và animations
- Google branding cho OAuth button

## 🔒 Bảo mật

- Mật khẩu được hash bằng bcrypt
- JWT tokens với expiration
- CORS protection
- Input validation
- Secure session management

## 🐳 Docker Commands

### Quản lý containers
```bash
# Xem trạng thái containers
docker-compose ps

# Xem logs của tất cả services
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Restart service
docker-compose restart backend

# Rebuild và start lại
docker-compose up -d --build

# Dừng và xóa containers
docker-compose down

# Dừng và xóa cả volumes (mất data)
docker-compose down -v
```

### Database management
```bash
# Truy cập MongoDB shell
docker exec -it metawork-mongodb-dev mongosh

# Backup database
docker exec metawork-mongodb-dev mongodump --out /backup

# Import data
docker exec -i metawork-mongodb-dev mongorestore /backup
```

### Development vs Production

**Development mode:**
- Hot reload cho cả frontend và backend
- Source code được mount vào containers
- Logs chi tiết hơn
- File: `docker-compose.dev.yml`

**Production mode:**
- Optimized builds
- Nginx cho frontend
- Health checks
- Security headers
- File: `docker-compose.yml`

## 🚧 Phát triển tiếp

- [ ] Email verification
- [ ] Password reset
- [ ] User profile management
- [ ] Role-based access control
- [ ] Social login (Facebook, GitHub)
- [ ] Two-factor authentication
- [ ] Docker production deployment
- [ ] CI/CD pipeline
- [ ] Monitoring và logging

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

Nếu có vấn đề gì, hãy tạo issue trên GitHub repository này.

---

**Lưu ý**: Đây là dự án demo, không sử dụng cho production mà không có thêm các biện pháp bảo mật và tối ưu hóa cần thiết.