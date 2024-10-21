import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
    else {
      navigate('/'); // Redirect to homepage if the search is empty
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Logo and Toggle Button */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-white font-bold text-xl">MovieDB</h1>
          <button
            className="text-white md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Links */}
        <ul
          className={`w-full md:w-auto flex-col md:flex-row md:flex md:space-x-6 space-y-4 md:space-y-0 text-white mt-4 md:mt-0 transition-transform duration-300 ${
            isMenuOpen ? 'flex' : 'hidden'
          }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-orange-500 ${isActive ? 'text-orange-500' : ''}`
              }
            >
              Popular Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                `hover:text-orange-500 ${isActive ? 'text-orange-500' : ''}`
              }
            >
              Upcoming Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/toprated"
              className={({ isActive }) =>
                `hover:text-orange-500 ${isActive ? 'text-orange-500' : ''}`
              }
            >
              Top-rated Movies
            </NavLink>
          </li>
        </ul>

        {/* Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full md:w-auto space-x-2 mt-4 md:mt-0"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Movies..."
            className="w-full md:w-auto px-4 py-2 text-black rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            Search
          </button>
        </form>
      </nav>
    </header>
  );
}

export default Header;
