import { Request, Response } from 'express';
import { User } from '../models/User';

// Get all users (for task assignment dropdown)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isActive: true })
      .select('name email role')
      .sort({ name: 1 });

    res.json({
      message: 'Users retrieved successfully',
      users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
}; 