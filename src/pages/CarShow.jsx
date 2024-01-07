import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CarShow = () => {
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://localhost:7136/api/ApiCar');
        setCars(response.data);
        // Default sorting by price in ascending order when cars are fetched
        sortCars(response.data, 'asc');
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const sortCars = (carsToSort, order) => {
    const sorted = [...carsToSort].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    setSortedCars(sorted);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    sortCars(cars, order);
  };

  const handleFilter = () => {
    let filteredCars = [...cars];

    if (minPrice !== '') {
      filteredCars = filteredCars.filter((car) => parseFloat(car.price) >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      filteredCars = filteredCars.filter((car) => parseFloat(car.price) <= parseFloat(maxPrice));
    }

    sortCars(filteredCars, sortOrder);
  };

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />

    <div className="container mx-auto pt-20 flex-grow">
      <div className="flex items-center justify-between mb-4 md:mb-8 pt-10">
        <h1 className="text-4xl md:text-5xl font-bold">Car Listings</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="mr-2 text-lg md:text-xl">Sort by Price:</label>
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border p-2 rounded text-base md:text-lg"
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <label className="mr-2 text-lg md:text-xl">Filter by Price:</label>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border p-2 rounded text-base md:text-lg"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border p-2 rounded text-base md:text-lg"
                />
                <button onClick={handleFilter} className="bg-blue-500 text-white p-2 rounded text-base md:text-lg">
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {sortedCars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`} className="flex-grow w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="border p-4 mb-4">
              {car.photos && car.photos.length > 0 && (
                <img
                  src={`data:${car.photos[0].contentType};base64,${car.photos[0].photoData}`}
                  alt={`Car Photo ${car.id}`}
                  className="w-full h-32 object-cover mb-2"
                />
              )}
            <div className="border p-4 mb-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
              <p className="text-lg font-semibold mb-2">{car.carBrand?.brandName}</p>
              <p className="text-base md:text-lg mb-2">Model: {car.carModel?.modelName}</p>
              <p className="text-base md:text-lg mb-2">Color: {car.carColor?.color}</p>
              <p className="text-base md:text-lg mb-2">Fuel Type: {car.carFuelType?.fuelType}</p>
              <p className="text-base md:text-lg mb-2">Mileage: {car.carMileage?.mileage}</p>
              <p className="text-base md:text-lg mb-2">Location: {car.location}</p>
              <h3 className="text-xl md:text-2xl font-bold">${car.price}</h3>
            </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    
    <Footer />
  </div>
  );
};

export default CarShow;
