# Docker Setup for Apache AGE Viewer

This document explains how to build and run Apache AGE Viewer using Docker.

## Docker Files

1. **Dockerfile** - Development setup with hot-reload support
2. **Dockerfile.production** - Optimized multi-stage build for production
3. **docker-compose.yml** - Orchestration for different deployment scenarios

## Building the Docker Image

### Development Build
```bash
docker build -t age-viewer .
```

### Production Build
```bash
docker build -f Dockerfile.production -t age-viewer:prod .
```

## Running with Docker

### Basic Run
```bash
docker run -p 3000:3000 -p 3001:3001 age-viewer
```

### Production Run
```bash
docker run -p 3001:3001 age-viewer:prod
```

## Using Docker Compose

### Development Mode
```bash
docker-compose up age-viewer
```

### Production Mode
```bash
docker-compose --profile production up age-viewer-prod
```

### With PostgreSQL + AGE Database
```bash
docker-compose --profile with-db up
```

This will start:
- AGE Viewer on ports 3000/3001
- PostgreSQL with AGE extension on port 5455

Database connection details:
- Host: postgres-age (or localhost from host machine)
- Port: 5455
- Database: postgresDB
- Username: postgresUser
- Password: postgresPW

## Important Notes

1. The Dockerfile includes `NODE_OPTIONS=--openssl-legacy-provider` to handle OpenSSL compatibility issues with Node.js 14
2. The production Dockerfile uses a multi-stage build to reduce the final image size
3. Build dependencies (python3, make, g++) are included for node-gyp compilation
4. PM2 is installed globally for production process management

## Troubleshooting

If you encounter build errors:
1. Ensure Docker is running and you have sufficient permissions
2. Check that ports 3000, 3001, and 5455 are not already in use
3. For M1/M2 Macs, you might need to use `--platform linux/amd64` flag

## Environment Variables

You can override these environment variables:
- `NODE_ENV` - Set to 'production' for production builds
- `NODE_OPTIONS` - Already set to '--openssl-legacy-provider'