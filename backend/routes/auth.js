const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const { generateToken, authenticateToken } = require('../middleware/auth');
const config = require('../config');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'Đăng ký thành công',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Vui lòng điền email và mật khẩu' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Check if user registered with Google
        if (user.googleId && !user.password) {
            return res.status(400).json({ message: 'Tài khoản này được đăng ký bằng Google. Vui lòng đăng nhập bằng Google.' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    async (req, res) => {
        try {
            // Generate JWT token
            const token = generateToken(req.user._id);

            // Redirect to frontend with token
            res.redirect(`${config.CLIENT_URL}/auth/success?token=${token}`);
        } catch (error) {
            console.error('Google callback error:', error);
            res.redirect(`${config.CLIENT_URL}/auth/error`);
        }
    }
);

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                avatar: req.user.avatar,
                isVerified: req.user.isVerified
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Logout route (optional - mainly for session-based auth)
router.post('/logout', (req, res) => {
    res.json({ message: 'Đăng xuất thành công' });
});

module.exports = router;