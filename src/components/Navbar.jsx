import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, UserIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const dropdownOptions = {
    search: ['Used & New Cars', 'Motorcycles', 'Trucks'],
    sell: ['Cars & Motorcycles', 'Trucks', 'Car valuation'],
    inform: ['Car-Magazine', 'Blog', 'Brands & Models'],
  };

  const renderDropdown = (dropdown) => {
    return (
      openDropdown === dropdown && (
        <ul className={`absolute ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} border rounded-md shadow-md mt-2 divide-y divide-gray-200`}>
          {dropdownOptions[dropdown].map((option, index) => (
            <li key={index}>
              <Link to={`/${option.toLowerCase().replace(/\s+/g, '-')}`} className={`block px-4 py-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                {option}
              </Link>
            </li>
          ))}
        </ul>
      )
    );
  };

  return (
    <div className={`w-screen h-[80px] z-10 fixed ${darkMode ? 'bg-gray-800' : 'bg-zinc-300'} drop-shadow-lg`}>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center mx-auto'>
          <Link to="/" className='flex items-center'>
            <img
              src="./AutoMarket.png"
              className='w-24 md:w-32 lg:w-34 xl:w-38 2xl:w-50 h-auto'
              alt="AutoMarket Logo"
            />
          </Link>
          <div className='ml-4'>
            <ul className={`hidden md:flex font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
              <li className='relative'>
              <Link
              to="#"
              onClick={(e) => {
              e.preventDefault();
              toggleDropdown('search');
              }}
             className={`flex items-center ${darkMode ? 'text-white' : 'text-black'}`}>
            Search {openDropdown === 'search' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
            </Link>

                {renderDropdown('search')}
              </li>
              <li className='relative'>
              <Link
              to="#"
              onClick={(e) => {
              e.preventDefault();
              toggleDropdown('sell');
              }}
             className={`flex items-center ${darkMode ? 'text-white' : 'text-black'}`}>
            Sell {openDropdown === 'sell' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
            </Link>
                {renderDropdown('sell')}
              </li>
              <li className='relative'>
              <Link
              to="#"
              onClick={(e) => {
              e.preventDefault();
              toggleDropdown('inform');
              }}
             className={`flex items-center ${darkMode ? 'text-white' : 'text-black'}`}>
            Inform {openDropdown === 'inform' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
            </Link>
                {renderDropdown('inform')}
              </li>
              <li><Link to="/login"><UserIcon className={`w-5 ${darkMode ? 'text-white' : 'text-black'}`}/></Link></li>
            </ul>
          </div>
        </div>
        <div className='md:hidden'>
          {isSidebarOpen ? (
            <XIcon className={`w-5 ${darkMode ? 'text-white' : 'text-black'}`} onClick={toggleSidebar} />
          ) : (
            <MenuIcon className={`w-5 ${darkMode ? 'text-white' : 'text-black'}`} onClick={toggleSidebar} />
          )}
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className='fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-75 flex items-center justify-center'
          onClick={toggleSidebar}
        >
          <div className={`w-64 ${darkMode ? 'text-white' : 'text-black'} font-extrabold text-xl`}>
            <ul className='p-4 flex flex-col items-center'>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/sell">Sell</Link></li>
              <li><Link to="/inform">Inform</Link></li>
              <li><Link to="/login"><UserIcon className={`w-7 ${darkMode ? 'text-white' : 'text-black'}`}/></Link></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
