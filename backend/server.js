const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const config = require('./config');

// Import routes
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration (for Google OAuth)
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('✅ Kết nối MongoDB thành công');
    })
    .catch((error) => {
        console.error('❌ Lỗi kết nối MongoDB:', error);
        process.exit(1);
    });

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        message: 'Server đang hoạt động',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route không tồn tại' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Lỗi server' });
});

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📱 Frontend URL: ${config.CLIENT_URL}`);
});