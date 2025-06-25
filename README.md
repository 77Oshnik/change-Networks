# Backend - Task Manager API

This is the backend for the Task Manager application, built with Node.js, Express, and MongoDB.

## Features
- User authentication (JWT-based)
- Task CRUD operations
- Admin and user roles
- RESTful API

## Project Structure
```
backend/
  config/         # Database configuration
  controller/     # Route controllers
  middleware/     # Custom middleware (e.g., auth)
  models/         # Mongoose models
  routes/         # API route definitions
  createAdmin.js  # Script to create an admin user
  index.js        # Entry point
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the backend directory with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Scripts
- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (if configured)

## API Endpoints
- `/api/auth` - Authentication routes
- `/api/users` - User management
- `/api/tasks` - Task management

---

For more details, see the code in each directory. 
# Frontend - Task Manager

This is the frontend for the Task Manager application, built with React and Vite.

## Features
- User authentication (login/logout)
- Dashboard with task statistics
- Task management (create, update, delete)
- User management (admin only)
- Responsive UI

## Project Structure
```
frontend/task-manager/
  public/           # Static assets
  src/
    assets/        # Images and icons
    components/    # React components
    context/       # React context providers
    services/      # API service functions
    utils/         # Utility functions/constants
    App.jsx        # Main app component
    main.jsx       # Entry point
  package.json     # Project metadata and scripts
  vite.config.js   # Vite configuration
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The app will be available at `http://localhost:5173` by default.

## Scripts
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

---

Make sure the backend server is running for API requests to work.
