import React, { useEffect, useState } from "react";
import * as API from "../../src/api/user_profile";
import TwoFAStatus from "./twofa";

const User_profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [Toggle, setToggle] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          setError("Access token not found!");
          setLoading(false);
          return;
        }

        const response = await API.getAllUserProfile({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          user: localStorage.getItem("id"),
        });
         console.log("Uset", response);
        if (response.data) {
          setUserData(response.data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        setUserData(null);
        setError("Failed to fetch data: " + (error.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container-fluid mx-auto pt-28 pb-10 px-4 max-h-[100vh] overflow-auto">
      <div className="">
        <div className="p-2">
          <h1 className="text-3xl font-bold uppercase"> User Profile</h1>
        </div>{" "}
        {error && <div className="text-red-500">{error}</div>}
        {loading && !error && (
          <div className="loders">
            <div id="loader"></div>
          </div>
        )}
        {!loading && !error && userData ? (
          <div className="md:p-6 p-0 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-lg font-semibold">Username:</label>
                <input
                  type="text"
                  value={userData.username}
                  readOnly
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-lg font-semibold">Email Count:</label>
                <input
                  type="text"
                  value={userData.email_count}
                  readOnly
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-lg font-semibold">Plan Name:</label>
                <input
                  type="text"
                  value={userData.plan_name ? userData.plan_name : "Trial"}
                  readOnly
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-lg font-semibold">Plan Status:</label>
                <input
                  type="text"
                  value={
                    userData.plan_status ? userData.plan_status : "Expired"
                  }
                  readOnly
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>

              <div>
                <label className="text-lg font-semibold">
                  {" "}
                  Plan Start Date:
                </label>
                <input
                  type="text"
                  value={
                    userData.plan_start_date
                      ? new Date(userData.plan_start_date).toLocaleDateString()
                      : "N/A"
                  }
                  readOnly
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-lg font-semibold">
                  Plan Expiry Date & Time:
                </label>
                <input
                  type="text"
                  value={
                    userData.plan_expiry_date
                      ? `${new Date(
                          userData.plan_expiry_date
                        ).toLocaleDateString()} (${new Date(
                          userData.plan_expiry_date
                        ).toLocaleTimeString()})`
                      : "N/A"
                  }
                  readOnly
                  className="block w-full mt-1 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:border-blue-500 transition-colors duration-300 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border border-gray-300 rounded-md mt-6 p-3">
              <h3 className="text-sm	md:text-xl font-semibold text-gray-800">
                Two-Factor Authentication (2FA)
              </h3>
              <div className="">
                <TwoFAStatus />
              </div>
            </div>
          </div>
        ) : null}
        {!loading && !userData && !error && (
          <div className="text-gray-500">No data available</div>
        )}
      </div>
    </div>
  );
};

export default User_profile;
