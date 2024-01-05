// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CarValuation from './pages/CarValuation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Admin from './pages/Admin';
import CarListings from './pages/CarListings';
import CarShow from './pages/CarShow';
import CarDetails from './pages/CarDetails';
import MotorcycleListings from './pages/MotorcycleListings';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/car-valuation" element={<CarValuation />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cars" element={<CarListings />} />
      <Route path="/used-&-new-cars" element={<CarShow />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/motorcycles" element={<MotorcycleListings />} />

      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

root.render(
  <Router>
    <AuthProvider>
      
      <AppRouter />
    </AuthProvider>
  </Router>
);
