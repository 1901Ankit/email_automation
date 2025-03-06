import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assests/image/wishi.png";
import support from "../../assests/image/support.webp";
import axios from "axios";
import { toast } from "react-toastify";
const Header = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthentication());

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
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setIsAuthenticated(checkAuthentication());
  }, []);

  function checkAuthentication() {
    return !!localStorage.getItem("access_token");
  }
  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("access_token");
      const res = await axios.post(
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

      console.log(res);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.clear();
      sessionStorage.clear();
      toast.success("Logout successfully");
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
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
                <div className="absolute top-[3rem] right-0.5 bg-white shadow-md rounded-lg w-40">
                  <button
                    onClick={() => handleOptionClick("/user-profile")}
                    className={`block w-full text-left px-4 py-2 text-gray-700 ${
                      selectedOption === "/user-profile"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    User Profile
                  </button>
                  <button
                    onClick={() => handleOptionClick("/manage")}
                    className={`block w-full text-left px-4 py-2 text-gray-700 ${
                      selectedOption === "/manage"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    Manage Device
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-gray-700 ${
                      selectedOption
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    Logout Device
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
