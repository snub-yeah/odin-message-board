# Build stage
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm run install-all

# Copy project files
COPY . .

# Build the client
RUN npm run build

# Production stage
FROM node:18-slim

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/build ./client/build
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Start the server
CMD ["npm", "run", "start-prod"] 