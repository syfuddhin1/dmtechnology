# DM Technology Application Documentation

## Overview

This application is a user management system with an admin panel, built using Next.js and MongoDB. It provides functionality for user registration, authentication, and an admin dashboard for monitoring user statistics.

## Features

1. User Registration
2. User Authentication
3. Admin Dashboard
4. User Search and Filtering
5. User Activity Tracking

## Tech Stack

- Frontend: Next.js, React
- Backend: Next.js API Routes (Server-side rendering)
- Database: MongoDB
- Authentication: NextAuth.js
- Styling: Tailwind CSS

## Key Components

### 1. User Registration (`app/(auth)/registration/page.js`)

- Allows new users to register with email, name, code, and password
- Performs client-side form validation
- Sends registration data to the server for processing

### 2. User Authentication

- Implemented using NextAuth.js
- Supports credential-based authentication (email and password)

### 3. Admin Dashboard (`app/admin/page.js`)

- Displays total user count, recently updated users, and super admin list
- Fetches user data from the server

### 4. User Search and Filtering (`app/admin/_component/FilterForm.js`)

- Allows admins to search and filter users by name or zone
- Updates URL parameters for persistent filtering

### 5. User Data Management (`lib/index.js`)

- Server-side functions for user registration, login, and data retrieval
- Interacts with MongoDB for data storage and retrieval

## Setup and Configuration

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`:
   - `AUTH_SECRET`: Secret key for NextAuth.js
   - `MONGODB_URI`: MongoDB connection string
   - `ENVIRONMENT`: Application environment (e.g., 'dm')
4. Run the development server: `npm run dev`

## API Routes

- `/api/auth/*`: NextAuth.js authentication routes
- `/api/users`: User management routes (creation, retrieval)
- `/api/admin`: Admin-specific data retrieval routes

## Security Considerations

- Passwords are hashed using bcrypt before storage
- Authentication is handled securely through NextAuth.js
- Environment variables are used for sensitive information

## Future Improvements

- Implement email verification for new user registrations
- Add more detailed user activity tracking
- Enhance admin capabilities (e.g., user management, role assignment)
- Implement more robust error handling and user feedback
