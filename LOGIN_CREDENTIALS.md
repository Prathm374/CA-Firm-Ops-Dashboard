# Login Credentials & Testing Guide

## 🎯 Available User Accounts

The database has been seeded with 6 different user accounts representing all user roles in the CA Firm Operations Dashboard.

### 👑 Admin Users
| Name | Email | Password | Role |
|------|-------|----------|------|
| Admin User | `admin@cafirm.com` | `admin123` | admin |
| System Admin | `system.admin@cafirm.com` | `system123` | admin |

### 👔 Manager Users
| Name | Email | Password | Role |
|------|-------|----------|------|
| Manager User | `manager@cafirm.com` | `manager123` | manager |
| Senior Manager | `senior.manager@cafirm.com` | `senior123` | manager |

### 👨‍💼 Staff Users
| Name | Email | Password | Role |
|------|-------|----------|------|
| Staff User | `staff@cafirm.com` | `staff123` | staff |
| Junior Staff | `junior.staff@cafirm.com` | `junior123` | staff |

## 🧪 Testing Results

✅ **All 6 users can successfully login**  
✅ **All users can access protected routes**  
✅ **JWT tokens are generated correctly**  
✅ **Role-based authentication works**  
✅ **Password hashing is working**  

## 🚀 How to Test

### 1. Start the Backend Server
```bash
cd server
npm run dev
```

### 2. Start the Frontend Client
```bash
cd client
npm run dev
```

### 3. Test Login in Browser
1. Navigate to `http://localhost:5173` (or your frontend URL)
2. Use any of the credentials above to login
3. Verify that you can access the dashboard
4. Test the logout functionality

### 4. Test API Endpoints
```bash
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cafirm.com","password":"admin123"}'

# Test protected route with token
curl -X GET http://localhost:5000/api/auth/profile/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Run Automated Tests
```bash
cd server
node test-all-users.js
```

## 🔧 Database Seeding

To re-seed the database with fresh data:

```bash
cd server
npm run seed
```

This will:
- Clear all existing users
- Create 6 new users with different roles
- Hash all passwords securely
- Display login credentials

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt
- **JWT Tokens**: Secure token-based authentication with 24h expiry
- **Role-based Access**: Different permissions for admin, manager, and staff
- **Token Validation**: Automatic verification on protected routes
- **Account Status**: Users can be deactivated if needed

## 📋 User Roles & Permissions

### Admin Role
- Full system access
- Can manage all users
- Can access all features
- Can view system settings

### Manager Role
- Can manage staff and clients
- Can view reports and analytics
- Can assign tasks
- Limited system settings access

### Staff Role
- Basic dashboard access
- Can view assigned tasks
- Can update task status
- Limited to assigned clients

## 🐛 Troubleshooting

### If login fails:
1. Check if the server is running on port 5000
2. Verify MongoDB connection
3. Check browser console for errors
4. Ensure CORS is properly configured

### If database connection fails:
1. Check your MongoDB URI in `.env` file
2. Ensure MongoDB is running
3. Verify network connectivity

### If frontend can't connect to backend:
1. Check if backend is running on port 5000
2. Verify `VITE_API_URL` in client `.env`
3. Check browser console for CORS errors

## 📞 Support

If you encounter any issues:
1. Check the server logs for errors
2. Verify all environment variables are set
3. Ensure MongoDB is accessible
4. Test API endpoints directly with curl or Postman 