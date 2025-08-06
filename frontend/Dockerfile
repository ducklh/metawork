# Multi-stage build cho tối ưu kích thước image

# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci --silent

# Copy source code
COPY . .

# Build production app
RUN npm run build

# Stage 2: Production stage với Nginx
FROM nginx:1.25-alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app từ builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Tạo user non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]