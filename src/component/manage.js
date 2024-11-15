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
import { useNavigate } from "react-router-dom";

const Manage = ({ signInEmail, newDeviceInfo, loggedInDevices }) => {
  const [devices, setDevice] = useState(null);

  const navigate = useNavigate();
  const getAllDevices = async () => {
    try {
      const res = await DeviceAPI.getAllDevices();
      console.log(res.data);
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

  const handleLogoutDevice = async (id, device_name) => {
    try {
      const res = await UserAPI.logoutDevice({ device_id: id, email: signInEmail, device_name: device_name, system_info: `${browserName}, ${osName}, ${new Date().toLocaleString()}` });
      localStorage.setItem("id", res.data.user_id);
      localStorage.setItem("user", signInEmail);
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      toast.error(`Your ${device_name} removed and current device login in successfully`);
      navigate("/home");
    } catch (error) {
      toast.error(`Failed to remove this device ${device_name}, Try again later!`);
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
        <div key={index} className="w-full sm:w-1/3 flex-shrink-0 min-w-[230px] py-2 px-2">
          <div
            className="box relative flex flex-col h-full justify-start bg-white p-2 shadow-custom
             rounded-md border-t-4 border-b-4 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/70"
          >
            <div className="text-center">
              <span className="text-[#7b2cbf] font-bold text-[20px]">{item.device_name}</span>
              <div className="h-[2px] bg-[#7b2cbf] mt-1 mx-auto w-12"></div>
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
                onClick={() => handleLogoutDevice(item.device_id,item.device_name)}
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
