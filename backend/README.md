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