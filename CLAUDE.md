# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Apache AGE Viewer is a web-based visualization tool for Apache AGE (A Graph Extension for PostgreSQL). It provides a React frontend and Node.js/Express backend to visualize and interact with graph data stored in PostgreSQL databases with the AGE extension.

## Common Development Commands

### Initial Setup
```bash
npm run setup          # Install all dependencies (root, frontend, and backend)
npm run setup-front    # Install only frontend dependencies
npm run setup-backend  # Install only backend dependencies
```

### Development
```bash
npm run start          # Run both frontend and backend in parallel (frontend on :3000, backend on :3001)
npm run front          # Run only frontend dev server
npm run backend        # Run only backend server
```

### Building
```bash
npm run build-front    # Build frontend for production
npm run build-back     # Build backend with Babel
npm run deploy         # Build frontend and start backend
```

### Testing
```bash
# Backend tests (from backend directory)
cd backend
npm test                    # Run all backend tests with Mocha
npm run test:ageParsing    # Run specific AGE parsing tests

# Frontend tests (from frontend directory)
cd frontend
npm test                   # Run React tests with react-scripts
```

### Backend Development Mode
```bash
cd backend
npm run start:dev      # Start with nodemon for auto-reload
npm run start:production   # Run production build
```

### Linting
The frontend uses ESLint with Airbnb style guide. Run from frontend directory:
```bash
cd frontend
npx eslint src/       # Check linting errors
```

## Architecture Overview

### Backend Architecture
The backend follows MVC pattern with clear separation of concerns:

- **Controllers** (`/backend/src/controllers/`): Handle HTTP requests and responses
- **Services** (`/backend/src/services/`): Business logic layer
- **Models** (`/backend/src/models/`): Data models and database interactions
- **Routes** (`/backend/src/routes/`): Express route definitions

Key backend components:
- **AGType Parser**: Custom ANTLR4 grammar for parsing Apache AGE's data types (`/backend/src/tools/AGEParser/`)
- **SQL Flavors**: Version-specific SQL queries for PostgreSQL 11-15 (`/backend/src/tools/sqlFlavorManager/`)
- **Database Service**: Manages PostgreSQL connections and query execution
- **Cypher Service**: Handles Cypher query execution and result processing

### Frontend Architecture
React application with Redux for state management:

- **Features** (`/frontend/src/features/`): Redux slices for different features
  - `database/`: Database connection management
  - `cypher/`: Cypher query execution
  - `graph/`: Graph visualization state
  - `modal/`: Modal dialogs state
  - `alerts/`: Alert notifications

- **Components** (`/frontend/src/components/`): Reusable UI components
  - `cytoscape/`: Graph visualization using Cytoscape.js
  - `editor/`: CodeMirror-based query editor
  - `frame/`: Query result frames (graph/table/text views)
  - `sidebar/`: Database and graph management sidebar

- **Pages** (`/frontend/src/pages/`): Main application pages

### Key Technical Details

1. **Graph Visualization**: Uses Cytoscape.js with multiple layout algorithms (dagre, cola, cose-bilkent, etc.)
2. **Database Support**: PostgreSQL versions 11-15 with AGE extension
3. **Query Language**: Supports Cypher queries through Apache AGE
4. **Session Management**: Express sessions for maintaining database connections
5. **CSV Import**: Supports loading graph data from CSV files

### Testing Infrastructure

Backend tests require a PostgreSQL database with AGE extension:
- Test database configuration in `/backend/test/testDB.js`
- Docker setup available for test environment
- Test data and queries in `/backend/test/test-data/` and `/backend/test/test-queries/`

### Production Deployment

- PM2 configuration in `ecosystem.config.js` for process management
- Docker support with `Dockerfile` using Node 14 Alpine
- Frontend builds to static files served by backend in production