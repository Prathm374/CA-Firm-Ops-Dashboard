import express from 'express';
import { verifyToken, requireRole } from '../utils/auth.middleware';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Create task (admin only)
router.post('/', requireRole(['admin']), createTask);

// Get all tasks (admin gets all, staff gets assigned)
router.get('/', getTasks);

// Get single task
router.get('/:id', getTask);

// Update task
router.put('/:id', updateTask);

// Delete task (admin only)
router.delete('/:id', requireRole(['admin']), deleteTask);

export default router; 