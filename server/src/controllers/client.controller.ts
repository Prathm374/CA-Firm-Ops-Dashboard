import { Request, Response } from 'express';
import { Client } from '../models/Client';

// Get all clients (for task assignment dropdown)
export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find({ status: 'active' })
      .select('name company')
      .sort({ name: 1 });

    res.json({
      message: 'Clients retrieved successfully',
      clients
    });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ message: 'Error retrieving clients' });
  }
}; 