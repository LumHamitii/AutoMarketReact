import React, { useState, useEffect } from 'react';
import usedCarData from '../data/usedcar.json';
import Fuse from 'fuse.js';
import { TailSpin } from 'react-loader-spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CarValuation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mileage, setMileage] = useState('');
  const [evaluatedPrice, setEvaluatedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate a loading delay
    if (isLoading) {
      const timeout = setTimeout(() => {
        // Replace with your actual logic for price estimation
        handleEvaluateClick();
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMileageChange = (event) => {
    setMileage(event.target.value);
  };

  const handleEvaluateClick = async () => {
    try {
      setIsLoading(true);

      // Ensure that both model and year are present in the search term
      if (searchTerm.trim() === '' || !/(\b\d{4}\b)/.test(searchTerm)) {
        console.warn('Search term is not specific enough. Please include both model and year.');
        setEvaluatedPrice(null); // Reset the evaluated price
        return;
      }

      // Fuzzy search for the car model with improved specificity
      const fuse = new Fuse(usedCarData, {
        keys: ['Car Model'],
        includeScore: true,
        threshold: 0.4, // Adjust the threshold as needed
      });

      const result = fuse.search(searchTerm);

      if (result.length > 0) {
        // Filter out results with a score higher than 0.2
        const filteredResults = result.filter((item) => item.score <= 0.2);

        // If there are filtered results, use the best match
        const carData = filteredResults.length > 0 ? filteredResults[0].item : result[0].item;

        // Extract base price from the car data
        const basePrice = parseFloat(carData["Old Price"].replace(/[^\d.]/g, '')); // Assuming Old Price is the base price

        // Adjust the price based on mileage
        const mileageFactor = 0.1;
        const evaluatedPriceInEGP = basePrice - mileage * mileageFactor;

        // Convert the price to Euro based on the conversion rate
        const conversionRate = 0.030;
        const evaluatedPriceInEuro = evaluatedPriceInEGP * conversionRate;

        setEvaluatedPrice(evaluatedPriceInEuro.toFixed(2)); // Limiting to 2 decimal places
      } else {
        console.warn('No matching car model found in the dataset.');
        setEvaluatedPrice(null); // Reset the evaluated price
      }
    } catch (error) {
      console.error('Error evaluating car price:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow mt-24">
        <div className="max-w-md mx-auto p-6 bg-gradient-to-b from-blue-500 to-blue-800 rounded-md shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-4 text-center animate__animated animate__fadeIn animate__delay-1s">
             Car Valuation
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200">Car Model:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              className="mt-1 p-2 border border-gray-300 rounded-md text-black w-full focus:outline-none focus:border-blue-300 transition-all duration-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200">Mileage (in km):</label>
            <input
              type="number"
              value={mileage}
              onChange={handleMileageChange}
              className="mt-1 p-2 border border-gray-300 text-black rounded-md w-full focus:outline-none focus:border-blue-300 transition-all duration-300"
            />
          </div>
          <button
            type="button"
            onClick={handleEvaluateClick}
            className={`bg-yellow-400 text-gray-800 p-2 rounded-md w-full ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300'
            } animate__animated animate__fadeIn animate__delay-2s`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <TailSpin color="#333" size={20} />
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              'Get Valuation'
            )}
          </button>
  
          {evaluatedPrice !== null && !isLoading && (
            <div className="mt-4 animate__animated animate__fadeIn animate__delay-3s">
              <h3 className="text-lg font-semibold text-center">Estimated Value</h3>
              <p className="text-2xl font-bold text-center">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(evaluatedPrice)}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarValuation;
