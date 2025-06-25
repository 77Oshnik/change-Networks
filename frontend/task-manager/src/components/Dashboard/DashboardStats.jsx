import { 
  ClipboardList as Tasks,  // 'Tasks' icon is actually called 'ClipboardList'
  Circle,
  Clock,
  CheckCircle2 as CheckCircle
} from 'lucide-react';

const DashboardStats = ({ stats, isAdmin = false }) => {
    const totalTasks = stats?.totalTasks || 0;
    const statusCounts = stats?.statusCounts || {};
    const assignmentStats = stats?.assignmentStats || [];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Tasks className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-semibold text-gray-900">{totalTasks}</p>
            </div>
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Circle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">To Do</p>
              <p className="text-2xl font-semibold text-gray-900">{statusCounts['To Do'] || 0}</p>
            </div>
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">{statusCounts['In Progress'] || 0}</p>
            </div>
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Done</p>
              <p className="text-2xl font-semibold text-gray-900">{statusCounts['Done'] || 0}</p>
            </div>
          </div>
        </div>
  
        {isAdmin && assignmentStats.length > 0 && (
          <div className="md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Assignment Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {assignmentStats.map((stat) => (
                <div key={stat._id} className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-xl font-semibold text-gray-900">{stat.count}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
export default DashboardStats;