import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, task, onSave, users, isAdmin }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      status: 'To Do',
      priority: 'Medium',
      assignedTo: '',
      dueDate: ''
    });
    const [formError, setFormError] = useState('');

    useEffect(() => {
      if (task) {
        setFormData({
          title: task.title || '',
          description: task.description || '',
          status: task.status || 'To Do',
          priority: task.priority || 'Medium',
          assignedTo: task.assignedTo?._id || '',
          dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
        });
      } else {
        setFormData({
          title: '',
          description: '',
          status: 'To Do',
          priority: 'Medium',
          assignedTo: '',
          dueDate: ''
        });
      }
      setFormError('');
    }, [task]);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Simple validation
      if (isAdmin && (!formData.title.trim() || !formData.description.trim() || !formData.assignedTo)) {
        setFormError('Please fill in all required fields.');
        return;
      }
      setFormError('');
      onSave(formData);
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-blue-100 to-indigo-200 bg-opacity-80 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative border border-indigo-100 max-h-screen flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-indigo-600 focus:outline-none"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="p-8 bg-indigo-50 rounded-t-2xl overflow-y-auto flex-1 min-h-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="text-sm text-gray-500 mb-6 text-center">
              {task ? 'Update the details of your task below.' : 'Fill in the details to create a new task.'}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {isAdmin && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Task title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the task..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Assign To <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                        value={formData.assignedTo}
                        onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                      >
                        <option value="">Select User</option>
                        {users.map(user => (
                          <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Due Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              {formError && <div className="text-red-500 text-center font-medium">{formError}</div>}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow text-base"
                >
                  {task ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default TaskModal;