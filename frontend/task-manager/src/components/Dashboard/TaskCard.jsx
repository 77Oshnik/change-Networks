import { User, Calendar, Edit3, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, canEdit, canDelete, user }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'To Do': return 'bg-yellow-100 text-yellow-800';
        case 'In Progress': return 'bg-orange-100 text-orange-800';
        case 'Done': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'High': return 'bg-red-100 text-red-800';
        case 'Medium': return 'bg-blue-100 text-blue-800';
        case 'Low': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
  
    const isAssignedToUser = task.assignedTo && user && task.assignedTo._id === user.id;
    const canEditTask = canEdit || isAssignedToUser;
  
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-900 truncate max-w-xs">{task.title}</h3>
          <div className="flex space-x-2">
            {canEditTask && (
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-indigo-600"
                title="Edit Task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => onDelete(task._id)}
                className="p-1 text-gray-400 hover:text-red-600"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
  
        <p className="text-gray-700 mb-4 min-h-[48px]">{task.description}</p>
  
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>{task.status}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>{task.priority}</span>
        </div>
  
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span className="font-medium text-gray-700">{task.assignedTo ? task.assignedTo.name : 'Unassigned'}</span>
          </div>
          {task.dueDate && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

export default TaskCard;