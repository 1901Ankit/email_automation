import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assests/image/wishi.png";
import support from "../../assests/image/support.webp";
const Header = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };
  return (
    <div className="bg-white shadow-lg fixed top-0 left-0 right-0 z-40">
      <div className="container-fluid">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center justify-center md:justify-start w-full">
            <img src={logo} alt="Logo" className="w-44" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                {user ? (
                  <div
                    className="bg-gradient-to-r from-[#3B82F6] to-[#3B82F6] text-white
                   px-3.5 py-2 rounded-full shadow-md font-semibold"
                  >
                    {user.charAt(0).toUpperCase() || "W"}
                  </div>
                ) : null}
              </div>
              {isOpen && (
                <div className="absolute top-[3rem] right-0.5 bg-white shadow-md rounded-lg  w-40">
                  <button
                    onClick={() => handleOptionClick("/user-profile")}
                    className="block w-full text-left px-4 py-2 text-gray-700"
                  >
                    User Profile
                  </button>
                  <button
                    onClick={() => handleOptionClick("/manage")}
                    className="block w-full text-left px-4 py-2 text-gray-700"
                  >
                    Manage Device
                  </button>
                </div>
              )}
            </div>
            <a href="tel:+18002102858">
              <img src={support} className="w-[50px] h-[35px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
