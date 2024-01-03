// Admin.jsx
import React from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Welcome to the Admin Panel</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;
