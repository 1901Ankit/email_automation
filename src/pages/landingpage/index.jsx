import React, { useState } from "react";
import logo from "../../assests/image/wishi.png";
import people from "../../assests/image/support.webp";
import blue from "../../assests/image/banner/blue.webp";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footerfile from "../../component/footerfile";
import girl2 from "../../../src/assests/image/banner/girl2.webp";
import girl from "../../../src/assests/image/banner/girl.webp";
import Plan_ui from "../../component/planui";
import Contactui from "../../component/contactui";
import Service_ui from "../../component/serviceui";
import About_ui from "../../component/aboutui";
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
    <>
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
        <div className="relative h-[200px] md:h-[430px]">
          {/* Background Image */}
          <img
            src={blue}
            className="absolute inset-0 w-full h-full object-cover z-0"
            alt="Banner"
          />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full w-full">
            <div className="container px-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Text Content (4 Columns on Small Screens & Above) */}
                <div className="sm:col-span-7 text-center text-white px-4">
                  <h1 className="mb-6 font-extrabold text-start text-xl md:text-5xl w-9/12">
                    THE NEW GO -TO EMAIL PLATFORM{" "}
                  </h1>
                  <p className="w-9/12 text-justify">
                    We provide you with RERA registration, RERA consultancy,
                    RERA implementation, RERA complaints and many more other
                    services.
                  </p>
                  <div class="flex space-x-4 mt-3">
                    <button
                      class="border border-blue-500 rounded-lg p-2 font-semibold flex items-center justify-center 
                    cursor-pointer bg-white text-blue-500 w-4/12 "
                    >
                      <span>Enquire </span>
                    </button>
                    <button
                      class="border border-blue-500 rounded-lg p-2 font-semibold flex items-center justify-center
                    cursor-pointer bg-transparent text-white w-4/12 "
                    >
                      <span>About us </span>
                    </button>
                  </div>
                  <p className="w-9/12 text-justify mt-3">
                    We provide you with RERA registration, RERA consultancy,
                    RERA implementation.
                  </p>
                </div>

                <div className="sm:col-span-5 flex justify-end relative">
                  {/* Girl2 (Spinning Behind) */}
                  <div className="absolute inset-0 flex items-center justify-between">
                    <img
                      src={girl2}
                      className=" w-[95%] object-cover animate-[spin_12s_linear_infinite] "
                      alt="Girl2"
                      style={{
                        marginLeft: "90px",
                      }}
                    />
                  </div>

                  {/* Girl (On Top) */}
                  <img
                    src={girl}
                    className="w-full h-full object-cover relative z-10"
                    alt="Girl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <About_ui />
        <Service_ui />
        <Plan_ui />
        <Contactui />
        <Footerfile />
      </div>
    </>
  );
};

export default Landing;
