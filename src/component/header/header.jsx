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
            <div className="flex items-center cursor-pointer group">
              {user ? (
                <div
                  className="bg-gradient-to-r from-[#7b2cbf] to-[#7b2cbf]
                   text-white px-3.5 py-2 rounded-full shadow-md font-semibold"
                >
                  {user.charAt(0).toUpperCase() || "W"}
                </div>
              ) : null}
              {/* <div className=" hidden group-hover:flex absolute top-20 right-0 border shadow-lg rounded px-4 py-1 items-center "> */}
                <pre className="hidden group-hover:flex absolute top-[3.75rem] right-0.5">{user}</pre>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
