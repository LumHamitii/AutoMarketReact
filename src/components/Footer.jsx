import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start">
          <img
            src="./AutoMarket.png" 
            className="w-24 md:w-32 lg:w-34 xl:w-38 2xl:w-50 h-auto mb-4"
            alt="AutoMarket Logo"
          />
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>

        <div className="flex flex-col items-center mt-4 md:mt-0">
          <p className="font-bold mb-1">Quick Links</p>
         <Link to="/used-&-new-cars"> <a href="#" className="hover:text-gray-300">Cars</a></Link>
          <a href="#" className="hover:text-gray-300">Motorcycles</a>
          <a href="#" className="hover:text-gray-300">Trucks</a>
        </div>

        <div className="flex flex-col items-center mt-4 md:mt-0">
          <p className="font-bold mb-2">Connect with Us</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
