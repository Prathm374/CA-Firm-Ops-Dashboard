import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/auth.controller';
import { verifyToken } from '../utils/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile/:id', verifyToken, getProfile);
router.put('/profile/:id', verifyToken, updateProfile);

export default router; 