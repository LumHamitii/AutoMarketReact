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
import MotorcycleDetails from './pages/MotorcycleDetails';
import Brands from './pages/Brands';
import MercedesModels from './pages/MercedesModels';
import SellCar from './pages/SellCar';
import MotorcycleFilter from './pages/MotorcycleFilter';
import FilteredMotorcycles from './pages/FilteredMotorcycles';
import TruckShow from './pages/TruckShow';
import TruckFilter from './pages/TruckFilter';
import FilteredTrucks from './pages/FilteredTrucks';
import TruckDetails from './pages/TruckDetails';
import TruckListings from './pages/TruckListings';
import Information from './pages/Information';
const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/car-valuation" element={<CarValuation />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cars-listing" element={<CarListings />} />
      <Route path="/trucks-listing" element={<TruckListings />} />
      <Route path="/used-&-new-cars" element={<CarFilter />} />
      <Route path="/motorcycles" element={<MotorcycleFilter />} />
      <Route path="/trucks" element={<TruckFilter />} />
      <Route path="/filtered-cars" element={<FilteredCars />} />
      <Route path="/filtered-motorcycles" element={<FilteredMotorcycles />} />
      <Route path="/filtered-trucks" element={<FilteredTrucks />} />
      <Route path="/all-cars" element={<CarShow />} />
      <Route path="/all-trucks" element={<TruckShow />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/motorcycle-listing" element={<MotorcycleListings />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/all-motorcycles" element={<MotorcycleShow />} />
      <Route path="/brands-&-models" element={<Brands />} />
      <Route path="/motorcycle/:id" element={<MotorcycleDetails />} />
      <Route path="/truck/:id" element={<TruckDetails />} />
      <Route path="/mercedes" element={<MercedesModels />} />
      <Route path="cars-&-motorcycles" element={<SellCar />} />
      <Route path="information" element={<Information />} />

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
