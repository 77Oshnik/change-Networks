import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/Auth/NotFound';

const AppRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return (
    <Routes>
      <Route path="/login" element={user ? (
        <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} replace />
      ) : <LoginForm />} />
      <Route path="/admin-dashboard" element={user?.role === 'admin' ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/user-dashboard" element={user?.role === 'user' ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <TaskProvider>
      <AppRoutes />
    </TaskProvider>
  </AuthProvider>
);

export default App;