import React, { useState } from "react";
import logo from "../../assests/image/wishi.png";
import people from "../../assests/image/support.webp";
import blue from "../../assests/image/banner/blue.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footerfile from "../../component/footerfile";
const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Our Services", url: "/services" },
    { name: "Plan", url: "/plan" },
    { name: "Contact", url: "/Contact" },
  ];
  return (
    <div className="container-fluid max-h-[100vh] overflow-auto p-0">
      {/* Navbar */}
      <div className="container-fluid bg-white shadow-lg sticky top-0 z-50">
        <div className="container-fluid flex justify-between items-center p-2">
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img className="w-36 md:w-48" src={logo} alt="Logo" />
          </Link>

          <Link
            to="/auth"
            className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg no-underline"
          >
            Login
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.url}
                className="text-black font-medium no-underline hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/auth"
              className="px-4 py-2 border border-blue-500 text-white rounded-lg bg-blue-500 transition hover:bg-blue-700 no-underline"
            >
              Login
            </Link>

            {/* Support Icon */}
            <a href="tel:+18002102858">
              <img src={people} alt="Support" className="w-10 h-10" />
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.url}
                className="block p-4 border-b border-gray-200 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/auth"
              className="block p-4 text-center bg-blue-600 text-white"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
      {/* Banner Section */}
      <div className="relative h-[200px] md:h-[500px]">
        <img src={blue} className="w-full h-full object-cover" alt="Banner" />
        {/* <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="container">
            <div className="row">
              <div className="min-h-[100px] relative z-10 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center p-6">
                <h1 className="mb-6 font-extrabold text-xl md:text-5xl text-white">
                  Email Automation
                </h1>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <Footerfile />
    </div>
  );
};

export default Landing;
