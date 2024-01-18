import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

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
          <p className="text-sm">&copy;{new Date().getFullYear()} AutoMarket. All rights reserved.</p>
        </div>

        <div className="flex flex-col items-center mt-4 md:mt-0">
          <p className="font-bold mb-1">Quick Links</p>
          <Link to="/all-cars" className="hover:text-gray-300">Cars</Link>
          <a href="all-motorcycles" className="hover:text-gray-300">Motorcycles</a>
          <a href="all-trucks" className="hover:text-gray-300">Trucks</a>
        </div>

        <div className="flex flex-col items-center mt-4 md:mt-0">
          <p className="font-bold mb-2">Connect with Us</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
