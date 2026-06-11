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

# --- Production Stage (Node.js) ---
FROM node:20-alpine

WORKDIR /app

# Copy package JSON files and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built assets and compiled server file
COPY --from=builder /app/dist ./dist

# Set production environment variable
ENV NODE_ENV=production

# Expose port 8007 for the backend server
EXPOSE 8007

# Run the compiled backend Express/Node application
CMD ["node", "dist/server.cjs"]
