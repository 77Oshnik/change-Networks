import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const data = await api.get(`/tasks?${params.toString()}`);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await api.get('/tasks/stats');
      setStats(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.get('/users');
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const createTask = async (taskData) => {
    try {
      await api.post('/tasks', taskData);
      await fetchTasks();
      await fetchStats();
    } catch (err) {
      throw err;
    }
  };

  // Similar update/delete functions...

  return (
    <TaskContext.Provider value={{
      tasks,
      stats,
      users,
      loading,
      error,
      fetchTasks,
      fetchStats,
      fetchUsers,
      createTask
      // Add other task operations...
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};