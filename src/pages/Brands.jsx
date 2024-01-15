import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define logos for each brand
const brandLogos = {
  'Mercedes': './brands/mercedesLogo.png',
  'VW': './brands/vwLogo.png',
  'BMW': './brands/bmwLogo.png',
  'Audi': './brands/audiLogo.png',
  'Ford': './brands/fordLogo.png',
  'Opel': './brands/opel.svg',
  'Porsche': './brands/porsche.png',
  'Skoda': './brands/skoda.png',
  'Toyota': './brands/toyota.png',
  'Renault': './brands/renault.png',
  'Volvo': './brands/volvo.png',
  'Peugeot': './brands/peugot.png',
};

const Brands = () => {
  const carBrands = [
    'Mercedes',
    'VW',
    'BMW',
    'Audi',
    'Ford',
    'Opel',
    'Porsche',
    'Skoda',
    'Toyota',
    'Renault',
    'Volvo',
    'Peugeot',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow mt-24 mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
        {carBrands.map((brand, index) => (
          <Link key={index} to={`/${brand.toLowerCase()}`} className="brand-link">
            <div className="brand-wrapper">
              <div className="bg-white rounded p-4 text-center shadow-md" style={{ maxWidth: '200px', height: '300px', margin: 'auto' }}>
                <img
                  src={brandLogos[brand]}
                  alt={`${brand} logo`}
                  className="mx-auto mb-4"
                  style={{ width: '100%', height: 'auto', maxHeight: '150px' }}
                />
                <h2 className="text-xl font-bold">{brand}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Brands;
