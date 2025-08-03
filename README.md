# CA Firm Operations Dashboard

A role-based operational dashboard for CA Firms built using the MERN stack with TypeScript and TailwindCSS. Includes task management, client portal, billing, and compliance calendar.

## 🚀 Features

- **Role-based Access Control**: Admin, Manager, and Staff roles with different permissions
- **Task Management**: Create, assign, track, and manage tasks with priority levels
- **Client Portal**: Manage client information and documents
- **Dashboard Analytics**: Real-time statistics and activity tracking
- **Modern UI**: Built with React, TypeScript, and TailwindCSS
- **RESTful API**: Express.js backend with MongoDB database
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **React Router** for navigation (planned)

### Backend
- **Node.js** with TypeScript
- **Express.js** for REST API
- **MongoDB** with Mongoose ODM
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

## 📁 Project Structure

```
ca-firm-ops-dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Layout components
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   └── package.json
├── package.json            # Root package.json (monorepo)
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### 🔐 Authentication Testing

The system comes with 6 pre-seeded test users for different roles:

| Role | Email | Password | Name |
|------|-------|----------|------|
| **Admin** | `admin@cafirm.com` | `admin123` | Admin User |
| **Admin** | `system.admin@cafirm.com` | `system123` | System Admin |
| **Manager** | `manager@cafirm.com` | `manager123` | Manager User |
| **Manager** | `senior.manager@cafirm.com` | `senior123` | Senior Manager |
| **Staff** | `staff@cafirm.com` | `staff123` | Staff User |
| **Staff** | `junior.staff@cafirm.com` | `junior123` | Junior Staff |

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ca-firm-ops-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp server/.env.example server/.env
   
   # Edit the .env file with your configuration
   # MONGODB_URI=mongodb://localhost:27017/ca-firm-dashboard
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   # Make sure MongoDB is running on your system
   # or use MongoDB Atlas for cloud database
   ```

5. **Seed the database with test users**
   ```bash
   cd server
   npm run seed
   ```

6. **Start development servers**
   ```bash
   # Start both client and server concurrently
   npm run dev
   
   # Or start them separately:
   npm run dev:client  # Frontend on http://localhost:5173
   npm run dev:server  # Backend on http://localhost:5000
   ```

7. **Test the authentication**
   ```bash
   # Run automated tests
   cd server
   node test-all-users.js
   ```

## 📋 Available Scripts

### Root (Monorepo)
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm run install:all` - Install dependencies for all packages
- `npm run clean` - Clean all node_modules and build directories

### Client
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with test users

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ca-firm-dashboard

# JWT Configuration (for future authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=debug
```

## 📊 Database Models

### User Model ✅
- Authentication with email/password
- Role-based access (admin, manager, staff)
- Profile information and avatar
- Activity tracking and last login
- Password hashing with bcrypt

## 🔌 API Endpoints

### Authentication Endpoints ✅
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:id` - Get user profile (protected)
- `PUT /api/auth/profile/:id` - Update user profile (protected)

### Health Check
- `GET /api/health` - Server health status

### Planned Endpoints
- Task management CRUD operations
- Client management CRUD operations
- Dashboard analytics and statistics

### Task Model
- Title, description, and status tracking
- Priority levels (low, medium, high)
- Assignment and due dates
- Comments and attachments
- Automatic overdue detection

### Client Model
- Contact information and company details
- Address management
- Document storage
- Assignment to staff members

## 🔐 Authentication ✅ COMPLETED

- ✅ JWT-based authentication with 24h expiry
- ✅ Role-based authorization (admin, manager, staff)
- ✅ Password hashing with bcrypt and salt
- ✅ Session management with localStorage
- ✅ Protected routes with middleware
- ✅ Login/logout functionality
- ✅ User registration and profile management

## 🎨 UI Components

### ✅ Built Components
- **LoginPage**: Modern authentication interface with error handling
- **AdminDashboard**: Main dashboard with sidebar navigation and logout
- **AuthContext**: React context for authentication state management
- **PrivateRoute**: Route protection component with role-based access
- **TaskList**: Task management with filtering and sorting (basic structure)

### 🚧 Planned Components
- Client management interface
- Billing and invoicing
- Calendar and scheduling
- Reports and analytics
- User management dashboard
- Profile settings page

## 🚧 Development Status

### ✅ Completed
- [x] Project structure setup
- [x] Frontend with React + TypeScript + TailwindCSS
- [x] Backend with Express + TypeScript
- [x] Database models (User, Task, Client)
- [x] Authentication system with JWT + bcrypt
- [x] User registration and login functionality
- [x] Role-based access control (admin, manager, staff)
- [x] Protected routes with middleware
- [x] Database seeding with test users
- [x] Frontend authentication context
- [x] Login/logout functionality
- [x] Basic UI components with authentication
- [x] Development environment configuration
- [x] API endpoints for authentication
- [x] Comprehensive testing suite

### 🚧 In Progress
- [ ] Task management API implementation
- [ ] Client management API implementation
- [ ] Dashboard analytics and statistics
- [ ] File upload functionality

### 📋 Planned
- [ ] Client management interface
- [ ] Task assignment and tracking system
- [ ] Billing and invoicing module
- [ ] Calendar and scheduling features
- [ ] Real-time notifications
- [ ] Reporting and analytics dashboard
- [ ] User management dashboard
- [ ] Profile settings and preferences
- [ ] Mobile responsiveness optimization
- [ ] Unit and integration tests
- [ ] Email notifications
- [ ] Document management system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt
- **JWT Tokens**: Secure token-based authentication with 24h expiry
- **Role-based Access**: Different permissions for admin, manager, and staff
- **Token Validation**: Automatic token verification on protected routes
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Server-side validation for all user inputs

## 🧪 Testing

### Automated Tests
- Comprehensive authentication testing suite
- All 6 user roles tested successfully
- Protected route access verification
- JWT token generation and validation tests

### Manual Testing
- Login/logout functionality
- Role-based dashboard access
- Error handling and validation
- Cross-browser compatibility

## 📚 Documentation

- `LOGIN_CREDENTIALS.md` - Complete testing guide with all user credentials
- `AUTHENTICATION_SETUP.md` - Detailed authentication system documentation

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team
4. Review the authentication documentation files

---

**Built with ❤️ for CA Firms**
