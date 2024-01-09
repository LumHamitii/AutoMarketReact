import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FilteredCars = () => {
  const location = useLocation();
  const filteredCars = location.state?.filteredCars || [];

  const [sortedCars, setSortedCars] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCars, setDisplayedCars] = useState([]);
  const carsPerPage = 10;

  useEffect(() => {
    // Sort the filtered cars initially
    sortCars(filteredCars, sortOrder);
  }, [filteredCars, sortOrder]);

  useEffect(() => {
    // Update displayed cars when sorted cars or current page changes
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
    sortCars(filteredCars, order);
  };

  const handleFilter = () => {
    let filteredCarsCopy = [...filteredCars];

    if (minPrice !== '') {
      filteredCarsCopy = filteredCarsCopy.filter((car) => parseFloat(car.price) >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      filteredCarsCopy = filteredCarsCopy.filter((car) => parseFloat(car.price) <= parseFloat(maxPrice));
    }

    sortCars(filteredCarsCopy, sortOrder);
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
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Filtered Car Listings</h1>
          <div className="flex items-center space-x-4">
            <div>
              <label className="mr-2 text-base md:text-lg">Sort by Price:</label>
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border p-2 rounded text-sm md:text-base"
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <label className="mr-2 text-base md:text-lg">Filter by Price:</label>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border p-2 rounded text-sm md:text-base"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border p-2 rounded text-sm md:text-base"
                />
                <button onClick={handleFilter} className="bg-blue-500 text-white p-2 rounded text-sm md:text-base">
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Cards */}
        {displayedCars.length === 0 ? (
          <div className="text-2xl font-bold text-center">
            The car that you are looking for is not listed for sale currently.
          </div>
        ) : (
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
                <div className="text-base md:text-lg font-bold">${car.price}</div>
              </div>
            </Link>
          ))}
        </div>
        )}
        {/* Pagination */}
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

export default FilteredCars;
