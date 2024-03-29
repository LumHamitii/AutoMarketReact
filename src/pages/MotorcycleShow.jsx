// MotorcycleShow.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MotorcycleFilterComponent from '../components/MotorcycleFilterComponent';

const MotorcycleShow = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [sortedMotorcycles, setSortedMotorcycles] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedMotorcycles, setDisplayedMotorcycles] = useState([]);
  const motorcyclesPerPage = 10;

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await axios.get('https://localhost:7136/api/ApiMotorcycle');
        setMotorcycles(response.data);
        sortMotorcycles(response.data, 'asc');
      } catch (error) {
        console.error('Error fetching motorcycles:', error);
      }
    };

    fetchMotorcycles();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * motorcyclesPerPage;
    const endIndex = startIndex + motorcyclesPerPage;
    const currentMotorcycles = sortedMotorcycles.slice(startIndex, endIndex);
    setDisplayedMotorcycles(currentMotorcycles);
  }, [sortedMotorcycles, currentPage]);

  const sortMotorcycles = (motorcyclesToSort, order) => {
    const sorted = [...motorcyclesToSort].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    setSortedMotorcycles(sorted);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    sortMotorcycles(motorcycles, order);
  };

  const handleFilter = () => {
    let filteredMotorcycles = [...motorcycles];

    if (minPrice !== '') {
      filteredMotorcycles = filteredMotorcycles.filter((motorcycle) => parseFloat(motorcycle.price) >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      filteredMotorcycles = filteredMotorcycles.filter((motorcycle) => parseFloat(motorcycle.price) <= parseFloat(maxPrice));
    }

    sortMotorcycles(filteredMotorcycles, sortOrder);
  };

  const totalPages = Math.ceil(sortedMotorcycles.length / motorcyclesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto pt-10 pb-20 sm:pt-16 md:pt-20 flex-grow">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8 px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Motorcycle Listings</h1>
          <MotorcycleFilterComponent
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
          {displayedMotorcycles.map((motorcycle) => (
            <Link key={motorcycle.id} to={`/motorcycle/${motorcycle.id}`} className="w-full p-4">
              <div className="border p-4 mb-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                <img
                  src={`data:${motorcycle.motorcyclePhotos[0].contentType};base64,${motorcycle.motorcyclePhotos[0].photoData}`}
                  alt={`Motorcycle Photo ${motorcycle.id}`}
                  className="w-full h-48 sm:h-64 object-cover mb-4 rounded-lg"
                />
                <div className="text-base md:text-lg mb-2 font-semibold">{motorcycle.motorcycleBrand?.brandName}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Model: {motorcycle.motorcycleModel?.modelName}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Color: {motorcycle.motorcycleColor?.color}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Fuel Type: {motorcycle.motorcycleFuelType?.fuelType}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Mileage: {motorcycle.motorcycleMileage?.mileage}</div>
                <div className="text-xs sm:text-base md:text-lg mb-2">Location: {motorcycle.location}</div>
                <div className="text-base md:text-lg font-bold">{motorcycle.price}€</div>
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

export default MotorcycleShow;
