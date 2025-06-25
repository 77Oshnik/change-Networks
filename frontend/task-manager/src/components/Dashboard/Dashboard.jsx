import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart3,
  SquareMenu as Tasks,  // Note the alias
  Users,
  Plus,
  LogOut,
  Circle,
  Clock,
  CheckCircle2 as CheckCircle
} from 'lucide-react';
import api from '../../services/api';
import DashboardStats from './DashboardStats';
import TaskModal from './TaskModal';
import TasksList from './TasksList';
import UsersList from './UsersList';


const Dashboard = () => {
    const { user, logout, token } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filters, setFilters] = useState({
      status: '',
      assignee: ''
    });
  
    const isAdmin = user?.role === 'admin';
  
    // Fetch data
    const fetchTasks = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.assignee) params.append('assignee', filters.assignee);
        
        const response = await api.get(`/tasks?${params.toString()}`, token);
        setTasks(response);
      } catch (err) {
        setError('Failed to fetch tasks');
      }
    };
  
    const fetchUsers = async () => {
      if (!isAdmin) return;
      try {
        const response = await api.get('/users', token);
        setUsers(response);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
  
    const fetchStats = async () => {
      try {
        const response = await api.get('/tasks/stats', token);
        setStats(response);
      } catch (err) {
        setError('Failed to fetch statistics');
      }
    };
  
    useEffect(() => {
      fetchTasks();
      fetchStats();
      if (isAdmin) {
        fetchUsers();
      }
    }, [filters, token, isAdmin]);
  
    // Task operations
    const handleCreateTask = async (taskData) => {
      setLoading(true);
      try {
        await api.post('/tasks', taskData, token);
        setSuccess('Task created successfully');
        setShowTaskModal(false);
        fetchTasks();
        fetchStats();
      } catch (err) {
        setError('Failed to create task');
      } finally {
        setLoading(false);
      }
    };
  
    const handleUpdateTask = async (taskData) => {
      setLoading(true);
      try {
        await api.put(`/tasks/${editingTask._id}`, taskData, token);
        setSuccess('Task updated successfully');
        setShowTaskModal(false);
        setEditingTask(null);
        fetchTasks();
        fetchStats();
      } catch (err) {
        setError(err.message || 'Failed to update task');
      } finally {
        setLoading(false);
      }
    };
  
    const handleDeleteTask = async (taskId) => {
      if (!window.confirm('Are you sure you want to delete this task?')) return;
      
      setLoading(true);
      try {
        await api.delete(`/tasks/${taskId}`, token);
        setSuccess('Task deleted successfully');
        fetchTasks();
        fetchStats();
      } catch (err) {
        setError('Failed to delete task');
      } finally {
        setLoading(false);
      }
    };
  
    const handleEditTask = (task) => {
      setEditingTask(task);
      setShowTaskModal(true);
    };
  
    const handleTaskSave = (taskData) => {
      if (editingTask) {
        handleUpdateTask(taskData);
      } else {
        handleCreateTask(taskData);
      }
    };
  
    // Clear messages
    useEffect(() => {
      if (error || success) {
        const timer = setTimeout(() => {
          setError('');
          setSuccess('');
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [error, success]);
  
    const tabs = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'tasks', label: 'Tasks', icon: Tasks },
      ...(isAdmin ? [{ id: 'users', label: 'Users', icon: Users }] : [])
    ];
  
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Tasks className="w-8 h-8 text-indigo-600 mr-3" />
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Task Manager</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-base text-gray-700 font-medium">
                  Welcome, {user?.name}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                    isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user?.role}
                  </span>
                </span>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-500 hover:text-indigo-600 transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>
  
        {/* Tab Navigation */}
        <nav className="bg-white/80 shadow-sm sticky top-16 z-20 border-b border-gray-100 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-1 py-4 border-b-2 font-semibold text-base transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-700 bg-indigo-50'
                        : 'border-transparent text-gray-500 hover:text-indigo-600 hover:border-indigo-200'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
  
        {/* Main Content */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg font-medium">
              {success}
            </div>
          )}
  
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
              </h2>
              <DashboardStats stats={stats} isAdmin={isAdmin} />
            </div>
          )}
  
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Tasks</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                  {/* Filters */}
                  <div className="flex space-x-2 w-full sm:w-auto">
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                      <option value="">All Status</option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      value={filters.assignee}
                      onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                    >
                      <option value="">All Assignees</option>
                      {users.map(user => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                      ))}
                    </select>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setEditingTask(null);
                        setShowTaskModal(true);
                      }}
                      className="flex items-center px-6 py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-700 transition text-base w-full sm:w-auto justify-center"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Task
                    </button>
                  )}
                </div>
              </div>
              <TasksList
                tasks={tasks}
                onEdit={isAdmin ? handleEditTask : undefined}
                onDelete={isAdmin ? handleDeleteTask : undefined}
                canEdit={isAdmin}
                canDelete={isAdmin}
                user={user}
              />
              {/* Floating Action Button for Create Task on mobile */}
              {isAdmin && (
                <button
                  onClick={() => {
                    setEditingTask(null);
                    setShowTaskModal(true);
                  }}
                  className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 text-white rounded-full shadow-lg p-4 sm:hidden hover:from-indigo-600 hover:to-blue-700 transition"
                  title="Create Task"
                >
                  <Plus className="w-7 h-7" />
                </button>
              )}
            </div>
          )}
  
          {/* Users Tab (Admin only) */}
          {activeTab === 'users' && isAdmin && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Users Management</h2>
              <UsersList users={users} />
            </div>
          )}
        </main>
  
        {/* Task Modal */}
        <TaskModal
          isOpen={showTaskModal}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
          task={editingTask}
          onSave={handleTaskSave}
          users={users}
          isAdmin={isAdmin}
        />
      </div>
    );
  };

  export default Dashboard;
