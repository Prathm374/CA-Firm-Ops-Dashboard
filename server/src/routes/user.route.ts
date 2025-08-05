import express from 'express';
import { verifyToken } from '../utils/auth.middleware';
import { getUsers } from '../controllers/user.controller';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Get all users (for task assignment dropdown)
router.get('/', getUsers);

export default router; 