import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 top-0 left-0 w-full bg-white text-black shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <img
          src="https://res.cloudinary.com/drld1bejg/image/upload/v1737982529/Tic-Tac-Slam/zkjqxlyg77vxpajcahrr.png"
          alt="Logo"
          className="w-20 h-20"
        />

        {/* Burger Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu state
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" : "hidden md:block "
          } absolute md:static top-[7.1rem] left-0 w-full md:w-auto   md:bg-transparent p-4 md:p-0 md:flex space-y-2 md:space-y-0 md:space-x-4`}
        >
          <a
            href="/"
            className="block text-white text-center md:inline-block hover:underline"
          >
            Home
          </a>
          <a
            href="/about"
            className="block text-white text-center md:inline-block hover:underline"
          >
            About
          </a>
          <a
            href="/contact"
            className="block text-white text-center md:inline-block hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
