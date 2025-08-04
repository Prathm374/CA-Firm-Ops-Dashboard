# CA Firm Operations Dashboard

A role-based operational dashboard for CA Firms built using the MERN stack with TypeScript and TailwindCSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CA-Firm-Ops-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   - The `.env` file is already configured in the server directory
   - Default configuration:
     - Server: http://localhost:5000
     - Client: http://localhost:5173
     - MongoDB: mongodb://localhost:27017/ca-firm-dashboard

4. **Seed the database with test users**
   ```bash
   cd server
   npm run seed
   ```

5. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both the client and server concurrently.

## 🔐 Login Credentials

The following test users are available after running the seeder:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@cafirm.com | admin123 |
| Manager | manager@cafirm.com | manager123 |
| Staff | staff@cafirm.com | staff123 |
| Senior Manager | senior.manager@cafirm.com | senior123 |
| Junior Staff | junior.staff@cafirm.com | junior123 |
| System Admin | system.admin@cafirm.com | system123 |

## 🏗️ Project Structure

```
CA-Firm-Ops-Dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── seeders/        # Database seeders
│   │   └── utils/          # Utility functions
│   └── package.json
└── package.json            # Root package.json
```

## 🛠️ Available Scripts

### Root Directory
- `npm run dev` - Start both client and server in development mode
- `npm run install:all` - Install dependencies for all packages
- `npm run build` - Build both client and server for production
- `npm run clean` - Clean all node_modules and build directories

### Client Directory
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server Directory
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with test users

## 🔧 Environment Variables

### Server (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ca-firm-dashboard
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🎨 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Responsive Design**: Built with TailwindCSS for mobile-first design
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean, professional dashboard interface
- **Role-based Dashboard**: Different views for admin, manager, and staff roles

## 🚧 Current Status

- ✅ Authentication system
- ✅ User management
- ✅ Role-based access control
- ✅ Responsive dashboard UI
- ✅ MongoDB integration
- 🚧 Task management (in development)
- 🚧 Client management (in development)
- 🚧 Reporting system (in development)

## 🐛 Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure the `.env` file is in the server directory
   - Check that the file has no extra spaces or hidden characters

2. **MongoDB connection issues**
   - Make sure MongoDB is running locally
   - Check the connection string in the `.env` file

3. **Port conflicts**
   - Change the PORT in the server `.env` file
   - Update the CORS_ORIGIN accordingly

4. **Build errors**
   - Run `npm run clean` and then `npm run install:all`
   - Check TypeScript configuration files

## 📝 Development Notes

- The app uses React 19 with Vite for fast development
- Backend uses Express with TypeScript and Mongoose
- Authentication is handled with JWT tokens
- CORS is configured for local development
- All passwords are hashed using bcrypt

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
