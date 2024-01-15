import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SellCar = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 text-white">
      <Navbar />
      <div className="flex-grow main-content p-6 text-center">
        <div className="max-w-2xl mx-auto mt-20">
          <h1 className="text-5xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s">
             Ready to Upgrade Your Ride?
          </h1>
          <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-2s">
            Sell your car with us and make room for your next adventure! Join now and unlock exclusive benefits.
          </p>
          <div className="space-y-4 animate__animated animate__fadeIn animate__delay-3s">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
              <Link to="/login">Let's Get Started</Link>
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
              <Link to="/register">Join Now</Link>
            </button>
          </div>
          <p className="text-gray-300 text-sm mt-4 animate__animated animate__fadeIn animate__delay-4s">
            New to us? It only takes a minute to create an account!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellCar;
