import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../assests/image/wishi.png";
import support from "../../assests/image/support.webp";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (path) => {
    setSelectedOption(path);
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("access_token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/logout/`,
        {
          refresh: localStorage.getItem("refresh_token"),
          device_id: localStorage.getItem("device_id"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      localStorage.clear();
      sessionStorage.clear();
      toast.success("Logout successfully");
      setUser(null);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const handleNavigateToAbout = () => {
    navigate("/");
    setTimeout(() => {
      const aboutSection = document.getElementById("aboutui");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };
  const handleNavigateToService = () => {
    navigate("/");
    setTimeout(() => {
      const serviceSection = document.getElementById("serviceui");
      if (serviceSection) {
        serviceSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };
  const handleNavigateToContact = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contactui");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  return (
    <div className="bg-white shadow-lg fixed top-0 left-0 right-0 z-40">
      <div className="container-fluid">
        <div className="flex  items-center justify-evenly py-2 md:justify-between pl-8 md:pl-0">
          <div>
            <img src={logo} alt="Logo" className="w-44" />
          </div>
          <div className="items-center justify-between flex gap-3 ">
            <div className="hidden md:flex  space-x-6">
              <a href="/" className="no-underline">
                <button className="text-black font-medium hover:text-blue-600 hidden md:block">
                  Home
                </button>
              </a>
              <button
                className="text-black font-medium hover:text-blue-600 hidden md:block"
                onClick={handleNavigateToAbout}
              >
                About
              </button>

              <button
                className="text-black font-medium hover:text-blue-600 hidden md:block"
                onClick={handleNavigateToService}
              >
                Services
              </button>
              <button
                className="text-black font-medium hover:text-blue-600 hidden md:block"
                onClick={handleNavigateToContact}
              >
                Contact
              </button>
            </div>

            {/* User Dropdown (Always Visible) */}
            {user && (
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="bg-blue-600 text-white px-3.5 py-2 rounded-full shadow-md font-semibold">
                    {user.charAt(0).toUpperCase()}
                  </div>
                </div>

                {isOpen && (
                  <div className="absolute top-12 right-0 bg-white shadow-md rounded-lg w-40">
                    <button
                      onClick={() => handleOptionClick("/user-profile")}
                      className={`block w-full text-left px-4 py-2 text-gray-700 font-semibold ${
                        selectedOption === "/user-profile"
                          ? "bg-transparent text-black"
                          : "hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      User Profile
                    </button>
                    <button
                      onClick={() => handleOptionClick("/manage")}
                      className={`block w-full text-left px-4 py-2 text-gray-700 font-semibold ${
                        selectedOption === "/manage"
                          ? "bg-transparent text-black"
                          : "hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      Manage Device
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Support Icon (Always Visible) */}
            <a href="tel:+18002102858">
              <img src={support} alt="Support" className="w-[30px] h-[30px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
