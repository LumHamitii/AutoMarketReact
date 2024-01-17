import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FilteredMotorcycles = () => {
  const location = useLocation();
  const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);

  const [sortedMotorcycles, setSortedMotorcycles] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedMotorcycles, setDisplayedMotorcycles] = useState([]);
  const motorcyclesPerPage = 10;

  useEffect(() => {
    const newFilteredMotorcycles = location.state?.filteredMotorcycles || [];
    setFilteredMotorcycles(newFilteredMotorcycles);
  }, [location.state]);

  useEffect(() => {
    // Sort the filtered motorcycles initially
    sortMotorcycles(filteredMotorcycles, sortOrder);
  }, [filteredMotorcycles, sortOrder]);

  useEffect(() => {
    // Update displayed motorcycles when sorted motorcycles or current page changes
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
    if (order !== sortOrder) {
      setSortOrder(order);
    }
  };

  const handleFilter = () => {
    let filteredMotorcyclesCopy = [...filteredMotorcycles];

    if (minPrice !== '') {
      filteredMotorcyclesCopy = filteredMotorcyclesCopy.filter((motorcycle) => parseFloat(motorcycle.price) >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      filteredMotorcyclesCopy = filteredMotorcyclesCopy.filter((motorcycle) => parseFloat(motorcycle.price) <= parseFloat(maxPrice));
    }
    sortMotorcycles(filteredMotorcyclesCopy, sortOrder);
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
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Filtered Motorcycle Listings</h1>
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
        {displayedMotorcycles.length === 0 ? (
          <div className="text-2xl font-bold text-center">
            The motorcycle that you are looking for is not listed for sale currently.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedMotorcycles.map((motorcycle) => (
              <Link key={motorcycle.id} to={`/motorcycle/${motorcycle.id}`} className="w-full p-4">
                <div className="border p-4 mb-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                  {motorcycle.motorcyclePhotos && motorcycle.motorcyclePhotos.length > 0 && (
                    <img
                      src={`data:${motorcycle.motorcyclePhotos[0].contentType};base64,${motorcycle.motorcyclePhotos[0].photoData}`}
                      alt={`Motorcycle Photo ${motorcycle.id}`}
                      className="w-full h-48 sm:h-64 object-cover mb-4 rounded-lg"
                    />
                  )}
                  <div className="text-base md:text-lg mb-2 font-semibold">{motorcycle.motorcycleBrand?.brandName}</div>
                  <div className="text-xs sm:text-base md:text-lg mb-2">Model: {motorcycle.motorcycleModel?.modelName}</div>
                  <div className="text-xs sm:text-base md:text-lg mb-2">Color: {motorcycle.motorcycleColor?.color}</div>
                  <div className="text-xs sm:text-base md:text-lg mb-2">Fuel Type: {motorcycle.motorcycleFuelType?.fuelType}</div>
                  <div className="text-xs sm:text-base md:text-lg mb-2">Mileage: {motorcycle.motorcycleMileage?.mileage}</div>
                  <div className="text-base md:text-lg font-bold">{motorcycle.price}€</div>
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

export default FilteredMotorcycles;
