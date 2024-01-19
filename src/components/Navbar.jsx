import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, UserIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarOpenDropdown, setSidebarOpenDropdown] = useState(null);
  const [navbarOpenDropdown, setNavbarOpenDropdown] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarDropdown = (dropdown) => {
    setSidebarOpenDropdown(sidebarOpenDropdown === dropdown ? null : dropdown);
  };

  const toggleNavbarDropdown = (dropdown) => {
    setNavbarOpenDropdown(navbarOpenDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setSidebarOpenDropdown(null);
    setNavbarOpenDropdown(null);
  };

  const dropdownOptions = {
    search: ['Used & New Cars', 'Motorcycles', 'Trucks'],
    sell: ['Cars & Motorcycles', 'Trucks', 'Car valuation'],
    inform: ['Information', 'Blog', 'Brands & Models'],
  };

  const renderDropdown = (dropdown, isOpen, setOpenDropdown) => {
    return (
      isOpen && (
        <ul className={`absolute bg-white border rounded-md shadow-md mt-2 divide-y divide-gray-200`} onClick={closeDropdowns}>
          {dropdownOptions[dropdown].map((option, index) => (
            <li key={index}>
              <Link to={`/${option.toLowerCase().replace(/\s+/g, '-')}`} className={`block px-4 py-2 text-black`}>
                {option}
              </Link>
            </li>
          ))}
        </ul>
      )
    );
  };

  return (
    <div className={`w-screen h-[80px] z-10 fixed bg-zinc-300 drop-shadow-lg`}>
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
            <ul className={`hidden md:flex font-semibold text-black`}>
              <li className='relative'>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleNavbarDropdown('search');
                  }}
                  className={`flex items-center text-black`}
                >
                  Search {navbarOpenDropdown === 'search' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
                </Link>
                {renderDropdown('search', navbarOpenDropdown === 'search', setNavbarOpenDropdown)}
              </li>
              <li className='relative'>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleNavbarDropdown('sell');
                  }}
                  className={`flex items-center text-black`}
                >
                  Sell {navbarOpenDropdown === 'sell' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
                </Link>
                {renderDropdown('sell', navbarOpenDropdown === 'sell', setNavbarOpenDropdown)}
              </li>
              <li className='relative'>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleNavbarDropdown('inform');
                  }}
                  className={`flex items-center text-black`}
                >
                  Inform {navbarOpenDropdown === 'inform' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
                </Link>
                {renderDropdown('inform', navbarOpenDropdown === 'inform', setNavbarOpenDropdown)}
              </li>
              <li><Link to="/login"><UserIcon className={`w-5 text-black`}/></Link></li>
            </ul>
          </div>
        </div>
        <div className='md:hidden'>
          {isSidebarOpen ? (
            <XIcon className={`w-5 text-black`} onClick={toggleSidebar} />
          ) : (
            <MenuIcon className={`w-5 text-black`} onClick={toggleSidebar} />
          )}
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className='fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-75 flex items-center justify-center'
          onClick={toggleSidebar}
        >
          <div className={`w-64 text-black font-extrabold text-xl`} onClick={(e) => e.stopPropagation()}>
            <ul className='p-4 flex flex-col items-center'>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); toggleSidebarDropdown('search'); }}>
                  Search {sidebarOpenDropdown === 'search' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
                </a>
                {renderDropdown('search', sidebarOpenDropdown === 'search', setSidebarOpenDropdown)}
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); toggleSidebarDropdown('sell'); }}>
                  Sell {sidebarOpenDropdown === 'sell' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
                </a>
                {renderDropdown('sell', sidebarOpenDropdown === 'sell', setSidebarOpenDropdown)}
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); toggleSidebarDropdown('inform'); }}>
                  Inform {sidebarOpenDropdown === 'inform' ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
                </a>
                {renderDropdown('inform', sidebarOpenDropdown === 'inform', setSidebarOpenDropdown)}
              </li>
              <li><Link to="/login"><UserIcon className={`w-7 text-black`}/></Link></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
