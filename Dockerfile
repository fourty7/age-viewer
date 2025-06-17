FROM node:14-alpine3.16

# Install pm2 globally
RUN npm install -g pm2

# Install Python and build dependencies for node-gyp
RUN apk add --no-cache python3 make g++ bash

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build-front
RUN npm run build-back

# Node 14 doesn't need the OpenSSL legacy provider flag
# ENV NODE_OPTIONS=--openssl-legacy-provider

# Expose ports
EXPOSE 3000 3001

# Start the application
CMD ["npm", "run", "start"]