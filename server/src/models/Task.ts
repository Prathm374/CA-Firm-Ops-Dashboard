import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  clientId: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  createdBy: mongoose.Types.ObjectId;
  completedAt?: Date;
  tags: string[];
  attachments: string[];
  comments: Array<{
    user: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client ID is required']
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task must be assigned to a user']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'overdue'],
    default: 'pending',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task must have a creator']
  },
  completedAt: {
    type: Date,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  attachments: [{
    type: String
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ clientId: 1 });
taskSchema.index({ createdBy: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ status: 1, priority: 1 });

// Virtual for checking if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  if (this.status === 'completed') return false;
  return this.dueDate < new Date();
});

// Pre-save middleware to update status to overdue if due date has passed
taskSchema.pre('save', function(next) {
  if (this.status !== 'completed' && this.dueDate < new Date()) {
    this.status = 'overdue';
  }
  next();
});

// Method to mark task as completed
taskSchema.methods.markAsCompleted = function() {
  this.status = 'completed';
  this.completedAt = new Date();
  return this.save();
};

export const Task = mongoose.model<ITask>('Task', taskSchema); 