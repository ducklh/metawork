require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/metawork',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_this_in_production',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'your_google_client_id_here',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret_here',
    SESSION_SECRET: process.env.SESSION_SECRET || 'your_session_secret_here_change_this_in_production',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000'
};