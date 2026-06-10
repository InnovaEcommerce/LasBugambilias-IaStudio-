# --- Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package JSON files. Using wildcard allows copying package-lock.json if it exists, without failing if it is missing.
COPY package*.json ./

# Install dependencies. Using npm install is highly compatible for automated deploy environments.
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the production optimized bundle (outputs to /app/dist)
RUN npm run build

# --- Production Station (Nginx) ---
FROM nginx:alpine

# Copy custom Nginx configuration to support SPA routing & custom port
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Clean default nginx public files and replace with built statics from builder stage
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8007 exactly as requested
EXPOSE 8007

# Run Nginx on the foreground
CMD ["nginx", "-g", "daemon off;"]
