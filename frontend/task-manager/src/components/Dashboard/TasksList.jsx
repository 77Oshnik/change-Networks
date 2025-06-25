import TaskCard from './TaskCard';
import { 
  ClipboardList as Tasks,  // 'Tasks' icon is actually called 'ClipboardList'
  Circle,
  Clock,
  CheckCircle2 as CheckCircle
} from 'lucide-react';

const TasksList = ({ tasks, onEdit, onDelete, canEdit, canDelete, user }) => {
    if (tasks.length === 0) {
      return (
        <div className="text-center py-12">
          <Tasks className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No tasks found</p>
        </div>
      );
    }
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            canEdit={canEdit}
            canDelete={canDelete}
            user={user}
          />
        ))}
      </div>
    );
  };

  export default TasksList;