import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User as UserIcon, Lock } from 'lucide-react';
import reactLogo from '../../assets/react.svg';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login, register, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 flex items-stretch justify-center">
      <div className="bg-white rounded-none md:rounded-2xl shadow-2xl w-full h-full max-w-none md:max-w-4xl flex flex-col md:flex-row border border-indigo-100 overflow-hidden">
        {/* Left: Welcome Message */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-indigo-200 via-blue-100 to-indigo-100 p-10 h-full">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-4 text-center">Welcome Back!</h2>
          <p className="text-gray-600 text-xl text-center max-w-xs">Manage your tasks efficiently and stay productive with your personal dashboard.</p>
        </div>
        {/* Right: Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 h-full">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight">
              {isLogin ? 'Sign In to Task Manager' : 'Create Your Account'}
            </h2>
            {!isLogin && (
              <div className="mb-5 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-indigo-400" />
                  <input
                    type="text"
                    className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your Name"
                  />
                </div>
              </div>
            )}
            <div className="mb-5 relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-indigo-400" />
                <input
                  type="email"
                  className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-5 h-5 text-indigo-400" />
                <input
                  type="password"
                  className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="Password"
                />
              </div>
            </div>
            {error && <div className="text-red-500 mb-4 text-center font-medium">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 text-white py-2.5 rounded-lg font-semibold text-lg shadow hover:from-indigo-600 hover:to-blue-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-indigo-600 hover:underline font-medium text-sm"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : 'Already have an account? Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;