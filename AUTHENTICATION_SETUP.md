# Authentication System Setup

This document outlines the authentication system implementation for the CA Firm Operations Dashboard.

## Backend Authentication (Server)

### Dependencies Installed
- `jsonwebtoken` - For JWT token generation and verification
- `bcryptjs` - For password hashing
- `@types/jsonwebtoken` - TypeScript types for JWT
- `@types/bcryptjs` - TypeScript types for bcrypt

### Files Created/Modified

#### 1. Authentication Middleware (`server/src/utils/auth.middleware.ts`)
- `verifyToken` - Middleware to verify JWT tokens
- `requireRole` - Middleware to check user roles

#### 2. Authentication Controller (`server/src/controllers/auth.controller.ts`)
- `register` - User registration with password hashing
- `login` - User login with JWT token generation
- `getProfile` - Get user profile (protected route)
- `updateProfile` - Update user profile (protected route)

#### 3. Authentication Routes (`server/src/routes/auth.route.ts`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:id` - Get user profile (protected)
- `PUT /api/auth/profile/:id` - Update user profile (protected)

#### 4. Server Configuration (`server/src/index.ts`)
- Added auth routes to the main server
- Environment variables for JWT secret

### Environment Variables (server/.env)
```
PORT=5000
MONGODB_URI=DEMO_URI
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## Frontend Authentication (Client)

### Files Created/Modified

#### 1. Authentication Context (`client/src/contexts/AuthContext.tsx`)
- `AuthProvider` - React context provider for authentication state
- `useAuth` - Hook to access authentication context
- Automatic token storage in localStorage
- Token validation on app load

#### 2. Private Route Component (`client/src/components/PrivateRoute.tsx`)
- Route protection based on authentication status
- Role-based access control
- Loading states during authentication checks

#### 3. Updated Login Page (`client/src/pages/LoginPage.tsx`)
- Connected to backend authentication API
- Error handling and display
- Loading states during login

#### 4. Updated App Component (`client/src/App.tsx`)
- Wrapped with AuthProvider
- Protected routes with PrivateRoute
- Automatic redirect to login for unauthenticated users

#### 5. Updated Admin Dashboard (`client/src/pages/AdminDashboard.tsx`)
- Integrated with AuthContext
- Added logout functionality
- User profile display from authentication state

### Environment Variables (client/.env)
```
VITE_API_URL=http://localhost:5000
```

## User Model Enhancements

The User model already includes:
- Role field: `'admin' | 'manager' | 'staff'`
- Password hashing with bcrypt
- Email validation
- Basic validation for required fields

## API Endpoints

### Public Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Protected Endpoints
- `GET /api/auth/profile/:id` - Get user profile
- `PUT /api/auth/profile/:id` - Update user profile

## Usage

### Starting the Backend
```bash
cd server
npm run dev
```

### Starting the Frontend
```bash
cd client
npm run dev
```

### Testing Authentication
1. Start both server and client
2. Navigate to the login page
3. Register a new user or login with existing credentials
4. Verify protected routes are accessible
5. Test logout functionality

### Test Script
Run the test script to verify authentication endpoints:
```bash
cd server
node test-auth.js
```

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Tokens**: Secure token-based authentication
3. **Role-based Access**: Different user roles with appropriate permissions
4. **Token Validation**: Automatic token verification on protected routes
5. **Secure Storage**: Tokens stored in localStorage with proper cleanup

## Next Steps

1. Add password reset functionality
2. Implement email verification
3. Add session management
4. Implement refresh tokens
5. Add rate limiting for authentication endpoints
6. Add audit logging for authentication events 