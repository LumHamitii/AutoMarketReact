import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import 'fontsource-roboto';

const App = () => {
  const [latestCars, setLatestCars] = useState([]);

  useEffect(() => {
    const fetchLatestCars = async () => {
      try {
        const response = await axios.get('https://localhost:7136/api/ApiCar');
        const totalCars = response.data.length;
        const lastThreeCars = response.data.slice(totalCars - 3, totalCars);
        setLatestCars(lastThreeCars);
      } catch (error) {
        console.error('Error fetching latest cars:', error);
      }
    };

    fetchLatestCars();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-open-sans">
      <Navbar />

      {/* Hero Section */}
      <div
        className="bg-cover bg-center relative"
        style={{
          backgroundImage: "url(/highway.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="flex flex-col items-center justify-center h-full relative mt-20 mb-20">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-20">
              Welcome to AutoMarket
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-4">
              Your destination for buying and selling vehicles.
            </p>
            <p className="text-sm md:text-base lg:text-lg mb-8">
              Explore a wide range of options and find your dream car today.
            </p>
            <div className="flex space-x-4 justify-center items-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
                <a href="/register">Get Started</a>
              </button>
              <button className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded-full">
                <a href="/information">Learn More</a>
              </button>
            </div>
            <div className="mt-6">
              <img src="/heroDown.png" alt="Car Icon" className="h-20" />
            </div>
          </div>
        </div>
      </div>

     {/* Latest Cars Section */}
     <div className='mt-20 mb-10'>
        <div className="container mx-auto mt-8">
          <h2 className="text-3xl font-bold mb-4">Latest Added Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {latestCars.map((car) => (
               <Link key={car.id} to={`/car/${car.id}`} className="w-full p-4">
              <div key={car.id} className="border p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                {car.photos && car.photos.length > 0 && (
                  <img
                    src={`data:${car.photos[0].contentType};base64,${car.photos[0].photoData}`}
                    alt={`Car Photo ${car.id}`}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                )}
                <div className="text-base font-semibold mb-2">{car.carBrand?.brandName}</div>
                <div className="text-xs mb-2">Model: {car.carModel?.modelName}</div>
                <div className="text-xs mb-2">Color: {car.carColor?.color}</div>
                <div className="text-xs mb-2">Fuel Type: {car.carFuelType?.fuelType}</div>
                <div className="text-xs mb-2">Mileage: {car.carMileage?.mileage}</div>
                <div className="text-xs mb-2">Location: {car.location}</div>
                <div className="text-base font-bold">{car.price}€</div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Car Price Evaluation Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-20 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Discover Your Car's True Worth</h2>
          <p className="text-lg mb-6">
            Curious about the value of your car? Our advanced valuation tool provides accurate estimates based on market trends and your vehicle's mileage.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-8 py-4 rounded-full text-lg font-bold">
            <a href="/car-valuation">Get a Free Valuation</a>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
