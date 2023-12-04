import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7136/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorResponse = await response.json().catch(() => ({}));
        const errorMessage = errorResponse.message || 'Authentication failed';
        throw new Error(`Authentication failed: ${errorMessage}`);
      }

      setError(null);
      navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Incorrect email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-100 p-8 rounded-lg shadow-xl border-2 border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Page</h1>
        <form className="space-y-4">
          <div className="relative">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-3 border rounded bg-gray-100"
            />
          </div>
          <div className="relative">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-3 border rounded bg-gray-100"
            />
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={loginData.rememberMe}
              onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
              className="mr-2"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
