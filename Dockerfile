# Stage 1: Build the app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and lock first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the production version
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.25-alpine

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional, see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (Vite build is now static, served by Nginx)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
