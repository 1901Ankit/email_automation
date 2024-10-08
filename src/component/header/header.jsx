import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import logo from "../../assests/image/wishi.png";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <div className="bg-white shadow-lg fixed top-0 left-0 right-0 z-40">
      <div className="container-fluid mx-auto px-4 md:px-20">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-44" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700">
              <FaPhoneAlt className="text-xl" />
              <span className="ml-2">+1 (800) 210-2858</span>
            </div>

            <div className="relative group">
              <div className="flex items-center cursor-pointer">
                {user ? (
                  <div
                    className="bg-gradient-to-r from-[#7b2cbf] to-[#7b2cbf]
             text-white px-3.5 py-2 rounded-full shadow-md font-semibold"
                  >
                    {user.charAt(0).toUpperCase() || "W"}
                  </div>
                ) : null}
              </div>

             
              <div className="hidden group-hover:block absolute top-[4.5rem] right-0.5 bg-white shadow-md rounded-lg p-2">
                <pre>{user}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
