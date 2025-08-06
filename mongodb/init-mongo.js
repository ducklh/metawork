// MongoDB initialization script
// Chạy khi MongoDB container khởi động lần đầu

print('Starting MongoDB initialization...');

// Tạo database metawork
db = db.getSiblingDB('metawork');

// Tạo user cho application
db.createUser({
    user: 'metawork_user',
    pwd: 'metawork_password',
    roles: [
        {
            role: 'readWrite',
            db: 'metawork'
        }
    ]
});

// Tạo indexes cho performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "googleId": 1 }, { sparse: true, unique: true });

// Insert sample data (optional)
print('Creating sample collections...');

// Tạo collection users (sẽ được tạo tự động khi có data)
db.createCollection('users');

print('MongoDB initialization completed successfully!');

// Log thông tin
print('Database: metawork');
print('User: metawork_user');
print('Collections created: users');
print('Indexes created: email (unique), googleId (unique, sparse)');