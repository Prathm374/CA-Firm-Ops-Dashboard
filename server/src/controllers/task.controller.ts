import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { Client } from '../models/Client';

interface AuthRequest extends Request {
  user?: any;
}

// Create new task (admin only)
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, clientId, assignedTo, dueDate, priority } = req.body;
    const createdBy = req.user._id;

    // Validate required fields
    if (!title || !description || !clientId || !assignedTo || !dueDate) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Check if assigned user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(404).json({ message: 'Assigned user not found' });
    }

    const task = new Task({
      title,
      description,
      clientId,
      assignedTo,
      dueDate,
      priority: priority || 'medium',
      createdBy
    });

    await task.save();

    // Populate references for response
    await task.populate([
      { path: 'assignedTo', select: 'name email' },
      { path: 'createdBy', select: 'name email' },
      { path: 'clientId', select: 'name company' }
    ]);

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Get tasks (admin gets all, staff gets assigned)
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { status, priority, clientId } = req.query;
    const user = req.user;

    let query: any = {};

    // Role-based filtering
    if (user.role === 'staff') {
      query.assignedTo = user._id;
    }

    // Apply filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (clientId) query.clientId = clientId;

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('clientId', 'name company')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Tasks retrieved successfully',
      tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
};

// Get single task
export const getTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const task = await Task.findById(id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('clientId', 'name company');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user has access to this task
    if (user.role === 'staff' && task.assignedTo.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      message: 'Task retrieved successfully',
      task
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Error retrieving task' });
  }
};

// Update task
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const updateData = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check permissions
    if (user.role === 'staff' && task.assignedTo.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Staff can only update status and add comments
    if (user.role === 'staff') {
      const allowedUpdates = ['status'];
      const filteredData: any = {};
      
      allowedUpdates.forEach(field => {
        if (updateData[field] !== undefined) {
          filteredData[field] = updateData[field];
        }
      });

      // If status is being updated to completed, set completedAt
      if (filteredData.status === 'completed') {
        filteredData.completedAt = new Date();
      }

      Object.assign(task, filteredData);
    } else {
      // Admin can update all fields
      Object.assign(task, updateData);
    }

    await task.save();

    // Populate references for response
    await task.populate([
      { path: 'assignedTo', select: 'name email' },
      { path: 'createdBy', select: 'name email' },
      { path: 'clientId', select: 'name company' }
    ]);

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Delete task (admin only)
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(id);

    res.json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
}; 