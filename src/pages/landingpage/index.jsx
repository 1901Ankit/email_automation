import React, { useEffect, useState } from "react";
import logo from "../../assests/image/wishi.png";
import people from "../../assests/image/support.webp";
import blue from "../../assests/image/banner/blue.webp";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footerfile from "../../component/footerfile";
import girl2 from "../../../src/assests/image/banner/girl2.webp";
import girl from "../../../src/assests/image/banner/girl.webp";
import Plan_ui from "../../component/planui";
import Contactui from "../../component/contactui";
import Service_ui from "../../component/serviceui";
import About_ui from "../../component/aboutui";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaClipboardList,
  FaPhoneAlt,
} from "react-icons/fa";
import instagram from "../../assests/image/social/instagram.png";
import facebook from "../../assests/image/social/facebook.png";
import linkedin from "../../assests/image/social/linkdin.png";
import skype from "../../assests/image/social/skype.png";
import sugest from "../../assests/image/sugest.png";
const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  // const links = [
  //   { name: "Home", url: "/" },
  //   { name: "About", url: "/about" },
  //   { name: "Our Services", url: "/services" },
  //   { name: "Plan", url: "/plan" },
  //   { name: "Contact", url: "/Contact" },
  // ];
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleUserClick = () => {
    navigate("/home");
  };
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

            <div>
              {user ? (
                <button
                  onClick={handleUserClick}
                  className="bg-blue-600 text-white px-3.5 py-2 rounded-full shadow-md font-semibold md:hidden"
                >
                  {user.charAt(0).toUpperCase()}
                </button>
              ) : (
                <a href="/auth">
                  <button className="px-4 py-2 border border-blue-500 text-white rounded-lg bg-blue-500 transition hover:bg-blue-700 md:hidden">
                    Login
                  </button>
                </a>
              )}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-black font-medium no-underline hover:text-blue-600">
                Home
              </button>
              <button
                className="text-black font-medium no-underline hover:text-blue-600"
                onClick={() => {
                  const aboutSection = document.getElementById("aboutui");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setTimeout(() => {
                      window.scrollBy(0, -100);
                    }, 300);
                  }
                }}
              >
                About
              </button>

              <button
                className="text-black font-medium no-underline hover:text-blue-600"
                onClick={() => {
                  const aboutSection = document.getElementById("serviceui");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setTimeout(() => {
                      window.scrollBy(0, -100);
                    }, 300);
                  }
                }}
              >
                Our Services
              </button>
              <button
                className="text-black font-medium no-underline hover:text-blue-600"
                onClick={() => {
                  const aboutSection = document.getElementById("planui");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setTimeout(() => {
                      window.scrollBy(0, -100);
                    }, 300);
                  }
                }}
              >
                Plan
              </button>
              <button
                className="text-black font-medium no-underline hover:text-blue-600"
                onClick={() => {
                  const aboutSection = document.getElementById("contactui");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setTimeout(() => {
                      window.scrollBy(0, -100);
                    }, 300);
                  }
                }}
              >
                Contact
              </button>

              <div>
                {user ? (
                  <button
                    onClick={handleUserClick}
                    className="bg-blue-600 text-white px-3.5 py-2 rounded-full shadow-md font-semibold"
                  >
                    {user.charAt(0).toUpperCase()}
                  </button>
                ) : (
                  <a href="/auth">
                    <button className="px-4 py-2 border border-blue-500 text-white rounded-lg bg-blue-500 transition hover:bg-blue-700">
                      Login
                    </button>
                  </a>
                )}
              </div>

              {/* Support Icon */}
              <a href="tel:+18002102858">
                <img src={people} alt="Support" className="w-10 h-10" />
              </a>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div
              className={`fixed top-18 left-0 h-full w-full bg-gray-100 shadow-lg z-50 transform transition-all duration-700 ease-in-out md:hidden
        ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
            >
              {/* <button
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes size={24} />
              </button> */}
              {/* Sidebar Links */}
              <div className="mt-2 cursor-pointer p-2 rounded-lg transition-all font-semibold text-xl">
                <Link
                  to="/"
                  className="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-100 transition-all text-black no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  <FaHome className="text-blue-600 text-[30px]" /> Home
                </Link>

                <button
                  className="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-100"
                  onClick={() => {
                    const aboutSection = document.getElementById("aboutui");
                    if (aboutSection) {
                      aboutSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setTimeout(() => window.scrollBy(0, -100), 300);
                    }
                    setIsOpen(false);
                  }}
                >
                  <FaInfoCircle className="text-blue-600 text-[30px]" /> About
                </button>

                <button
                  className="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-100"
                  onClick={() => {
                    const serviceSection = document.getElementById("serviceui");
                    if (serviceSection) {
                      serviceSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setTimeout(() => window.scrollBy(0, -100), 300);
                    }
                    setIsOpen(false);
                  }}
                >
                  <FaServicestack className="text-blue-600 text-[30px]" /> Our
                  Services
                </button>

                <button
                  className="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-100"
                  onClick={() => {
                    const planSection = document.getElementById("planui");
                    if (planSection) {
                      planSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setTimeout(() => window.scrollBy(0, -100), 300);
                    }
                    setIsOpen(false);
                  }}
                >
                  <FaClipboardList className="text-blue-600 text-[30px]" /> Plan
                </button>

                <button
                  className="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-100"
                  onClick={() => {
                    const contactSection = document.getElementById("contactui");
                    if (contactSection) {
                      contactSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      setTimeout(() => window.scrollBy(0, -100), 300);
                    }
                    setIsOpen(false);
                  }}
                >
                  <FaPhoneAlt className="text-blue-600 text-[30px]" /> Contact
                </button>

                <div class="p-2 border border-[#ebf4ff] bg-[#ebf4ff] transition-all duration-300 block">
                  <div class="flex flex-row justify-between items-center">
                    <div class="w-4/12">
                      <img
                        src={sugest}
                        alt="sugest"
                        loading="lazy"
                        width="864"
                        height="860"
                        decoding="async"
                        data-nimg="1"
                        class="w-full"
                      />
                    </div>
                    <div class="w-8/12">
                      <p class="text-justify">
                        <span class="text-[#338DFB] text-lg font-semibold">
                          Get 20% off
                        </span>
                        <span class="text-sm mx-2 font-semibold">
                          on our Technical Support Application for a limited
                          time! Enjoy 24/7 expert assistance and fast issue
                          resolution—sign up today!
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-around mt-5">
                  <Link to="https://www.facebook.com/wishgeekstechserve">
                    <img
                      src={facebook}
                      alt="facebook icon"
                      className="w-10 h-auto"
                    />
                  </Link>
                  <Link to="https://www.instagram.com/wishgeekstechserve">
                    <img
                      src={instagram}
                      alt="instagram icon"
                      className="w-10 h-auto"
                    />
                  </Link>
                  <Link to="https://www.linkedin.com/company/wishgeekstechserve">
                    <img
                      src={linkedin}
                      alt="linkedin icon"
                      className="w-10 h-auto"
                    />
                  </Link>
                  <Link to="skype:live:.cid.73628076fa84e06f?call">
                    <img src={skype} alt="Skype Logo" className="w-10 h-auto" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Banner Section */}
        <div className="relative h-[100vh] md:h-[450px] xl:h-[520px] w-full">
          {/* Background Image */}
          <img
            src={blue}
            className="absolute inset-0 w-full h-full object-cover object-center"
            alt="Banner"
          />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full w-full">
            <div className="container px-0 md:px-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-7 text-center text-white px-4">
                  <h1 className="mb-6 font-extrabold text-start text-3xl md:text-5xl md:w-9/12 w-full">
                    THE NEW GO -TO EMAIL PLATFORM
                  </h1>
                  <p className="md:w-9/12 w-full text-justify">
                    We provide you with RERA registration, RERA consultancy,
                    RERA implementation, RERA complaints and many more other
                    services.
                  </p>
                  <div class="flex space-x-4 mt-3">
                    <button
                      onClick={() => {
                        const aboutSection =
                          document.getElementById("contactui");
                        if (aboutSection) {
                          aboutSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                          setTimeout(() => {
                            window.scrollBy(0, -100);
                          }, 300);
                        }
                      }}
                      class="border border-blue-500 rounded-lg p-2 font-semibold flex items-center justify-center 
                    cursor-pointer bg-white text-blue-500 w-4/12 "
                    >
                      <span>Enquire </span>
                    </button>
                    <button
                      onClick={() => {
                        const aboutSection = document.getElementById("aboutui");
                        if (aboutSection) {
                          aboutSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                          setTimeout(() => {
                            window.scrollBy(0, -100);
                          }, 300);
                        }
                      }}
                      class="border border-blue-500 rounded-lg p-2 font-semibold flex items-center justify-center
                    cursor-pointer bg-transparent text-white w-4/12 "
                    >
                      <span>About us </span>
                    </button>
                  </div>
                  <p className="md:w-9/12 w-full text-justify mt-3 ">
                    We provide you with RERA registration, RERA consultancy,
                    RERA implementation.
                  </p>
                </div>

                <div className="sm:col-span-5 flex justify-end relative">
                  {/* Girl2 (Spinning Behind) */}
                  <div className="absolute inset-0 flex items-center justify-between">
                    <img
                      src={girl2}
                      className=" w-[80%] object-cover animate-[spin_12s_linear_infinite] "
                      alt="Girl2"
                      style={{
                        marginLeft: "90px",
                      }}
                    />
                  </div>

                  {/* Girl (On Top) */}
                  <img
                    src={girl}
                    className="w-full  object-cover relative z-10"
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
