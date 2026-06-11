# --- Step 1: Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install both general dependencies and devDependencies (like esbuild, typescript, etc.)
RUN npm install

# Copy all project source code
COPY . .

# Run compilation scripts:
# 1) Vite compiles frontend to /app/dist
# 2) esbuild bundles server.ts into /app/dist/server.cjs
RUN npm run build

# --- Step 2: Production Run Stage ---
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment flags
ENV NODE_ENV=production

# Copy package descriptors for production dependency install
COPY package*.json ./

# Only install runtime production dependencies to keep the image slim
RUN npm install --omit=dev

# Copy the compiles from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000 (standard server port)
EXPOSE 3000

# Start Express server using the start script (which runs node dist/server.cjs)
CMD ["npm", "run", "start"]
