import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarFilterComponent from '../components/CarFilterComponent';

const FilteredTrucks = () => {
  const location = useLocation();
  const [filteredTrucks, setFilteredTrucks] = useState([]);

  const [sortedTrucks, setSortedTrucks] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTrucks, setDisplayedTrucks] = useState([]);
  const trucksPerPage = 10;

  useEffect(() => {
    const newFilteredTrucks = location.state?.filteredTrucks || [];
    setFilteredTrucks(newFilteredTrucks);
  }, [location.state]);

  useEffect(() => {
    // Sort the filtered trucks initially
    sortTrucks(filteredTrucks, sortOrder);
  }, [filteredTrucks, sortOrder]);

  useEffect(() => {
    // Update displayed trucks when sorted trucks or current page changes
    const startIndex = (currentPage - 1) * trucksPerPage;
    const endIndex = startIndex + trucksPerPage;
    const currentTrucks = sortedTrucks.slice(startIndex, endIndex);
    setDisplayedTrucks(currentTrucks);
  }, [sortedTrucks, currentPage]);

  const sortTrucks = (trucksToSort, order) => {
    const sorted = [...trucksToSort].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    setSortedTrucks(sorted);
  };

  const handleSortChange = (order) => {
    if (order !== sortOrder) {
      setSortOrder(order);
    }
  };

  const handleFilter = () => {
    let filteredTrucksCopy = [...filteredTrucks];

    if (minPrice !== '') {
      filteredTrucksCopy = filteredTrucksCopy.filter(
        (truck) => parseFloat(truck.price) >= parseFloat(minPrice)
      );
    }

    if (maxPrice !== '') {
      filteredTrucksCopy = filteredTrucksCopy.filter(
        (truck) => parseFloat(truck.price) <= parseFloat(maxPrice)
      );
    }
    sortTrucks(filteredTrucksCopy, sortOrder);
  };

  const totalPages = Math.ceil(sortedTrucks.length / trucksPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto pt-10 pb-20 sm:pt-16 md:pt-20 flex-grow">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8 px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Filtered Truck Listings</h1>
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
        {/* Cards */}
        {displayedTrucks.length === 0 ? (
          <div className="text-2xl font-bold text-center">
            The truck that you are looking for is not listed for sale currently.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedTrucks.map((truck) => (
              <Link key={truck.id} to={`/truck/${truck.id}`} className="w-full p-4">
                <div className="border p-4 mb-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                  {truck.truckPhotos && truck.truckPhotos.length > 0 && (
                    <img
                      src={`data:${truck.truckPhotos[0].contentType};base64,${truck.truckPhotos[0].photoData}`}
                      alt={`Truck Photo ${truck.id}`}
                      className="w-full h-48 sm:h-64 object-cover mb-4 rounded-lg"
                    />
                  )}
                  <div className="text-base md:text-lg mb-2 font-semibold">{truck.truckBrand?.brandName}</div>
                  <div className="text-xs sm:text-base md:text-lg mb-2">Model: {truck.truckModel?.modelName}</div>
                  <div className="text-xs sm:text-base md:text-lg mb-2">Color: {truck.truckColor?.color}</div>
                  <div className="text-xs sm:text-base md:text-lg mb-2">
                    Transmission: {truck.truckTransmissionType?.transmissionType}
                  </div>
                  <div className="text-base md:text-lg font-bold">{truck.price}€</div>
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
                className={`mx-2 p-2 rounded ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
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

export default FilteredTrucks;
