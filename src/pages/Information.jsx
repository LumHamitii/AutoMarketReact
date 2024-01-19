import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Information = () => {
  return (
    
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow pt-10'>
        <section className='bg-gray-100 py-12'>
          <div className='container mx-auto text-center'>
            <h1 className='text-4xl font-bold mb-4'>Welcome to Our AutoMarket</h1>
            <p className='text-gray-600'>
              Discover a wide range of vehicles including cars, motorcycles, and trucks at
              competitive prices. We are passionate about delivering quality vehicles to our
              customers.
            </p>
          </div>
        </section>

        <section className='py-16'>
          <div className='container mx-auto flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2'>
              <img
                src='./about-us.jpg' 
                alt='About Us'
                className='rounded-md shadow-lg'
              />
            </div>
            <div className='md:w-1/2 mt-8 md:mt-0 md:ml-8'>
              <h2 className='text-3xl font-bold mb-4'>Our Mission</h2>
              <p className='text-gray-600'>
                At AutoMarket, our mission is to provide our customers with the best selection of
                vehicles, excellent customer service, and a seamless buying experience. Whether
                you're looking for a reliable car, a powerful motorcycle, or a sturdy truck, we have
                it all.
              </p>
            </div>
          </div>
        </section>

        <section className='bg-gray-100 py-12'>
          <div className='container mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-4'>Why Choose Us?</h2>
            <p className='text-gray-600'>
              With a commitment to quality and customer satisfaction, AutoMarket stands out for
              several reasons:
            </p>
            <ul className='grid grid-cols-2 gap-4 text-left'>
          <li className='flex items-center'>
            <svg
              className='w-5 h-5 text-green-500 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M5 13l4 4L19 7'
              ></path>
            </svg>
            Extensive selection of vehicles
          </li>
          <li className='flex items-center'>
            <svg
              className='w-5 h-5 text-green-500 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M5 13l4 4L19 7'
              ></path>
            </svg>
            Competitive pricing
          </li>
          <li className='flex items-center'>
            <svg
              className='w-5 h-5 text-green-500 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M5 13l4 4L19 7'
              ></path>
            </svg>
            Knowledgeable and friendly staff
          </li>
          <li className='flex items-center'>
            <svg
              className='w-5 h-5 text-green-500 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M5 13l4 4L19 7'
              ></path>
            </svg>
            Transparent and hassle-free buying process
          </li>
        </ul>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Information;
