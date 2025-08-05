import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Task } from '../types';

interface TaskFormProps {
  onSubmit: (taskData: Partial<Task>) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<Task>;
  isEditing?: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Client {
  _id: string;
  name: string;
  company: string;
}

const TaskForm = ({ onSubmit, onCancel, initialData, isEditing = false }: TaskFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    clientId: initialData?.clientId?._id || '',
    assignedTo: initialData?.assignedTo?._id || '',
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
    priority: initialData?.priority || 'medium',
    status: initialData?.status || 'pending'
  });

  // Fetch users and clients for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Fetch users
        const usersResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/users`, {
          headers
        });
        
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData.users || []);
        }

        // Fetch clients
        const clientsResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/clients`, {
          headers
        });
        
        if (clientsResponse.ok) {
          const clientsData = await clientsResponse.json();
          setClients(clientsData.clients || []);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.clientId || !formData.assignedTo || !formData.dueDate) {
        throw new Error('All required fields must be filled');
      }

      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
                required
              />
            </div>

            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                Client *
              </label>
              <select
                id="clientId"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client._id} value={client._id}>
                    {client.name} - {client.company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
                Assign To *
              </label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {isEditing && (
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEditing ? 'Update Task' : 'Create Task')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm; 