export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  clientId: {
    _id: string;
    name: string;
    company: string;
  };
  assignedTo: {
    _id: string;
    name: string;
    email: string;
  };
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  completedAt?: string;
  tags: string[];
  attachments: string[];
  comments: Array<{
    user: {
      _id: string;
      name: string;
    };
    content: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
} 