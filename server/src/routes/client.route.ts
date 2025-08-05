import express from 'express';
import { verifyToken } from '../utils/auth.middleware';
import { getClients } from '../controllers/client.controller';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Get all clients (for task assignment dropdown)
router.get('/', getClients);

export default router; 