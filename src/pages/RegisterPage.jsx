import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      if (!password || password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
  
      if (!/(?=.*[A-Z])/.test(password)) {
        setError('Password must contain at least one uppercase letter.');
        return;
      }
  
      if (!/\d/.test(password)) {
        setError('Password must contain at least one number.');
        return;
      }
  
      if (!/(?=.*[!@#$%^&*()_+.])/.test(password)) {
        setError('Password must contain at least one special character.');
        return;
      }
  
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
  
      const response = await axios.post('https://localhost:7136/api/Register', {
        email: email,
        password: password,
        confirmPassword: confirmPassword
      });
  
      console.log(response.data);
      window.location.href = '/login';
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred during registration.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gray-100 p-8 rounded-lg shadow-xl border-2 border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center">Register Page</h1>
        <form className="space-y-4">
          <div className="relative">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100"
            />
          </div>
          <div className="relative">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100"
            />
          </div>
          <div className="relative">
            <label className="block mb-2">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded bg-gray-100"
            />
          </div>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
          >
            Register
          </button>
          <Link to="/login" className="text-blue-500 hover:underline">
            Already have an account? Login here.
          </Link>
        </form>

        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default RegisterPage;
