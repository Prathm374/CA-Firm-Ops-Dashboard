import { Task } from '../types';

const TaskList = () => {
  // Dummy data for tasks
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Review Q4 Financial Statements',
      description: 'Complete review of ABC Corp Q4 financial statements and prepare audit report',
      status: 'completed',
      priority: 'high',
      assignedTo: 'John Doe',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Tax Return Preparation',
      description: 'Prepare individual tax returns for client XYZ Ltd',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Jane Smith',
      dueDate: '2024-01-20',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Compliance Calendar Update',
      description: 'Update compliance calendar with new regulatory deadlines',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Mike Johnson',
      dueDate: '2024-01-25',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13'
    },
    {
      id: '4',
      title: 'Client Meeting Preparation',
      description: 'Prepare presentation materials for quarterly client review meeting',
      status: 'overdue',
      priority: 'medium',
      assignedTo: 'Sarah Wilson',
      dueDate: '2024-01-10',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12'
    },
    {
      id: '5',
      title: 'Internal Audit Review',
      description: 'Conduct internal audit review for Q1 2024',
      status: 'pending',
      priority: 'low',
      assignedTo: 'David Brown',
      dueDate: '2024-02-01',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    }
  ];

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
        <button className="btn-primary">
          + Add New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select className="input-field max-w-xs">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        
        <select className="input-field max-w-xs">
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        
        <input
          type="text"
          placeholder="Search tasks..."
          className="input-field max-w-xs"
        />
      </div>

      {/* Task List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {task.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {task.assignedTo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)} mr-2`}></div>
                      <span className="text-sm text-gray-900 capitalize">
                        {task.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(task.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
          <span className="font-medium">5</span> results
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary text-sm">
            Previous
          </button>
          <button className="btn-secondary text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList; 