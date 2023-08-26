import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-semibold">Todo App</a>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className={`hidden md:flex space-x-4 ${isMenuOpen ? 'flex-col' : ''}`}>
          <a href="#" className="text-white hover:underline">Home</a>
          <a href="#" className="text-white hover:underline">About</a>
          <a href="#" className="text-white hover:underline">Services</a>
          <a href="#" className="text-white hover:underline">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
