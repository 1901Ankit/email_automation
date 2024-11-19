import React, { useEffect, useState } from "react";
import {
  browserName,
  browserVersion,
  osName,
  osVersion,
  deviceType,
} from "react-device-detect";
import { toast } from "react-toastify";
import * as DeviceAPI from "../api/user_profile";
import * as UserAPI from "../api/user";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import * as TokenAPI from "../api/user_profile"

const Manage = ({ signInEmail, newDeviceInfo, loggedInDevices }) => {
  const [devices, setDevice] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const getAllDevices = async () => {
    try {
      const res = await DeviceAPI.getAllDevices();
      setDevice(res.data.logged_in_devices);
    } catch (error) {
      toast.error("Failed to fetch devices, Try again later!");
      navigate("/")
    }
  }
  useEffect(() => {
    if (loggedInDevices?.length > 0) {
      setDevice(loggedInDevices)
    } else {
      getAllDevices()
    }
  }, [])

  const isTokenBlackListed = async (user) => {
    const formData = new FormData();
    formData.append("refresh_token", localStorage.getItem("refresh_token"));
    try {
      const response = await TokenAPI.isTokenBlackListed(formData);
      console.log(response);
      if (response.data.success) {

      } else {
        throw new Error("Token is not blacklisted")
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    }
  }

  const handleLogoutDevice = async (id, device_name) => {

    try {
      if (location.pathname == "/manage") {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/logout/`,
          { device_id: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        toast.success("device removed successfully")
        isTokenBlackListed()
        getAllDevices()

      } else {
        const res = await UserAPI.logoutDevice({ device_id: id, email: signInEmail, device_name: device_name, system_info: `${browserName}, ${osName}, ${new Date().toLocaleString()}` });
        localStorage.setItem("id", res.data.user_id);
        localStorage.setItem("device_id", res.data.device_id);
        localStorage.setItem("user", signInEmail);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        toast.error(`Your ${device_name} removed and current device login in successfully`);

      }
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.message || `Something went wrong Try again later!`);
    }
  }



  const renderPlans = () => {
    return devices?.map((item, index) => {
      const { device_name, system_info } = item

      const systemInfo = system_info.split(',');
      const browserName = systemInfo[0] || 'Unknown Browser';
      const operatingSystem = systemInfo[1] || 'Unknown OS';
      const loginTime = systemInfo[2] || 'Unknown Time';

      return (
        <div key={index} className={`w-full sm:w-1/3 flex-shrink-0 min-w-[230px] py-2 px-2 ${location.pathname == "/manage" && "mt-20"}`}>

          <div
            className="box relative flex flex-col h-full justify-start bg-white p-2 shadow-custom
             rounded-md border-t-4 border-b-4 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/70"
          >
            {localStorage.getItem("device_id") == item.device_id && (<span className=" absolute text-sm text-green-500 font-semibold">Current</span>)}
            <div className="text-center">
              <span className="text-[#7b2cbf] font-bold text-[20px]">Device{index + 1}</span>
              <div className="h-[2px] bg-[#7b2cbf] mt-1 mx-auto w-[4.30rem]"></div>
            </div>

            <ol className="mt-3 text-gray-700 space-y-1 text-sm">
              <li>Browser Name: {browserName}</li>
              <li>Operating System: {operatingSystem}</li>
              <li>Login Time: {loginTime}</li>
            </ol>

            <div className="flex-grow"></div>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleLogoutDevice(item.device_id, item.device_name)}
                className="font-montserrat text-[#f7fff7] border-none rounded-lg py-1 px-3 cursor-pointer inline-flex items-center bg-[#7b2cbf]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 max-h-[100vh] overflow-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center text-[#7b2cbf] text-wrap">
        Please log out from any of your logged-in devices
      </h1>

      <div className="flex flex-nowrap justify-center overflow-x-auto pricing">
        {renderPlans()}
      </div>
    </div>

  );
};

export default Manage;
