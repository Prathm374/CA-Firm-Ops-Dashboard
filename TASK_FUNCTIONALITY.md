# Task Management Functionality

## Overview
This document describes the Task management functionality that has been implemented for the CA Firm Operations Dashboard.

## Backend Implementation

### Task Model (`server/src/models/Task.ts`)
The Task model includes the following fields:
- `title` (required): Task title
- `description` (required): Task description
- `clientId` (required): Reference to Client model
- `assignedTo` (required): Reference to User model (who the task is assigned to)
- `dueDate` (required): Task due date
- `status`: pending, in-progress, completed, overdue
- `priority`: low, medium, high
- `createdBy` (required): Reference to User model (who created the task)
- `completedAt`: Date when task was completed
- `tags`: Array of tags
- `attachments`: Array of attachment URLs
- `comments`: Array of comment objects
- `timestamps`: createdAt, updatedAt

### API Endpoints

#### POST /api/tasks
- **Purpose**: Create a new task
- **Authentication**: Required
- **Authorization**: Admin only
- **Body**: `{ title, description, clientId, assignedTo, dueDate, priority }`

#### GET /api/tasks
- **Purpose**: Get tasks
- **Authentication**: Required
- **Authorization**: 
  - Admin: Gets all tasks
  - Staff: Gets only assigned tasks
- **Query Parameters**: `status`, `priority`, `clientId` (optional filters)

#### PUT /api/tasks/:id
- **Purpose**: Update task
- **Authentication**: Required
- **Authorization**: 
  - Admin: Can update all fields
  - Staff: Can only update status

#### DELETE /api/tasks/:id
- **Purpose**: Delete task
- **Authentication**: Required
- **Authorization**: Admin only

### Additional Endpoints

#### GET /api/users
- **Purpose**: Get users for task assignment dropdown
- **Authentication**: Required

#### GET /api/clients
- **Purpose**: Get clients for task assignment dropdown
- **Authentication**: Required

## Frontend Implementation

### TaskForm Component (`client/src/components/TaskForm.tsx`)
- Modal form for creating/editing tasks
- Controlled form with validation
- Dropdowns for client, assignee, priority, status
- Date picker for due date
- Role-based visibility (admin only for creation)

### TaskList Component (`client/src/components/TaskList.tsx`)
- Displays tasks with filtering by status and priority
- Color-coded status badges
- Role-based functionality:
  - Admin: Can create, edit, and view all tasks
  - Staff: Can only view assigned tasks and update status
- Real-time status updates for staff
- Responsive design with Tailwind CSS

### Integration
- Integrated into AdminDashboard under the "Tasks" tab
- Uses AuthContext for role-based access control
- Fetches data from backend APIs
- Handles loading states and error messages

## Role-Based Access Control

### Admin Permissions
- Create new tasks
- View all tasks
- Edit any task
- Delete tasks
- Assign tasks to any user

### Staff Permissions
- View only assigned tasks
- Update status of assigned tasks
- Cannot create, edit, or delete tasks

## Database Seeding

### Sample Data
The system includes seeders for:
- Users (admin, manager, staff roles)
- Clients (active clients with full details)
- Tasks (sample tasks with various statuses and priorities)

### Running Seeders
```bash
cd server
npm run seed
```

## Usage

1. **Start the backend server**:
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend**:
   ```bash
   cd client
   npm run dev
   ```

3. **Seed the database** (first time only):
   ```bash
   cd server
   npm run seed
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

5. **Login as admin** to access task management features

## Features

### Task Creation (Admin Only)
- Fill out task form with all required fields
- Select client from dropdown
- Assign to user from dropdown
- Set priority and due date
- Submit to create task

### Task Management
- View all tasks (admin) or assigned tasks (staff)
- Filter by status and priority
- Update task status (staff can update their assigned tasks)
- Edit task details (admin only)

### Status Tracking
- Pending: New tasks
- In Progress: Tasks being worked on
- Completed: Finished tasks
- Overdue: Tasks past due date

### Priority Levels
- High: Urgent tasks
- Medium: Normal priority
- Low: Low priority tasks

## Error Handling
- Form validation with user-friendly error messages
- API error handling with proper HTTP status codes
- Loading states for better UX
- Graceful fallbacks for missing data

## Security
- JWT authentication required for all task operations
- Role-based authorization
- Input validation and sanitization
- CORS configuration for frontend-backend communication 