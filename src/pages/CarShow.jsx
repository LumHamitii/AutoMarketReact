// CarShow.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarFilterComponent from '../components/CarFilterComponent'; 

const CarShow = () => {
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCars, setDisplayedCars] = useState([]);
  const carsPerPage = 10;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://localhost:7136/api/ApiCar');
        setCars(response.data);
        sortCars(response.data, 'asc');
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    const currentCars = sortedCars.slice(startIndex, endIndex);
    setDisplayedCars(currentCars);
  }, [sortedCars, currentPage]);

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

  const totalPages = Math.ceil(sortedCars.length / carsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto pt-10 pb-20 sm:pt-16 md:pt-20 flex-grow">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8 px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Car Listings</h1>
          <CarFilterComponent
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            handleFilter={handleFilter}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedCars.map((car) => (
            <Link key={car.id} to={`/car/${car.id}`} className="w-full p-4">
              <div className="border p-4 mb-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                {car.photos && car.photos.length > 0 && (
                  <img
                    src={`data:${car.photos[0].contentType};base64,${car.photos[0].photoData}`}
                    alt={`Car Photo ${car.id}`}
                    className="w-full h-48 sm:h-64 object-cover mb-4 rounded-lg"
                  />
                )}
                <div className="text-base md:text-lg mb-2 font-semibold">{car.carBrand?.brandName}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Model: {car.carModel?.modelName}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Color: {car.carColor?.color}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Fuel Type: {car.carFuelType?.fuelType}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Mileage: {car.carMileage?.mileage}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Location: {car.location}</div>
                <div className="text-base md:text-lg font-bold">{car.price}€</div>
              </div>
            </Link>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-2 p-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CarShow;
