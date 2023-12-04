import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg bg-white border-2 border-gray-200">
        <div className="p-4 rounded-md shadow-md bg-white inset-shadow">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Create an Account</h2>
        </div>
        <form className="space-y-4">
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-400 text-gray-800 p-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-500"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600">
          <p className="mb-2">Already have an account?</p>
          <Link to="/login" className="text-gray-800 hover:underline font-semibold">
            Log in now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
