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
import CarFilter from './pages/CarFilter';
import CarShow from './pages/CarShow';
import CarDetails from './pages/CarDetails';
import MotorcycleListings from './pages/MotorcycleListings';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import CreateBlog from './pages/CreateBlog';
import FilteredCars from './pages/FilteredCars';
import MotorcycleShow from './pages/MotorcycleShow';
const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/car-valuation" element={<CarValuation />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cars" element={<CarListings />} />
      <Route path="/used-&-new-cars" element={<CarFilter />} />
      <Route path="/filtered-cars" element={<FilteredCars />} />
      <Route path="/all-used-&-new-cars" element={<CarShow />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/motorcycle-listing" element={<MotorcycleListings />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/motorcycles" element={<MotorcycleShow />} />

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
