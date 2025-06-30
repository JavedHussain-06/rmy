import  { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {name: "On Map", path: "/on-map"},
    {name: "Annual Pass", path: "/annual-pass"},
    {name: "Annual ", path: "/annual"},
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-around
      items-center h-20">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600 flex ">
        <img className="h-[50px] w-[50px] object-contain rounded-full mr-3" src="/assets/rmy.png" alt="logo" />
          <span className="mt-2">RajmargYatra</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600 transition duration-200"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}    
            className="text-2xl text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? "×" : "≡"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-base ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-700"
                } hover:text-blue-600`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
