import React from 'react';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200">
    <h1 className="text-6xl font-bold text-indigo-700 mb-4">404</h1>
    <p className="text-2xl text-gray-700 mb-8">Page Not Found</p>
    <a href="/login" className="text-indigo-600 hover:underline text-lg">Go to Login</a>
  </div>
);

export default NotFound; 