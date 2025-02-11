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

const Manage = ({ signInEmail, newDeviceInfo, loggedInDevices }) => {
  const [devices, setDevice] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const getAllDevices = async () => {
    try {
      const res = await DeviceAPI.getAllDevices();
      setDevice(res.data.logged_in_devices);
    } catch (error) {
      toast.error("Failed to fetch devices, Try again later!");
      navigate("/");
    }
  };

  useEffect(() => {
    if (loggedInDevices?.length > 0) {
      setDevice(loggedInDevices);
    } else {
      getAllDevices();
    }
  }, [loggedInDevices]);

  const handleLogoutClick = (device_id) => {
    setSelectedDeviceId(device_id);
    setShowOtpModal(true);
  };

  const handleOtpChange = (e, index) => {
    let newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleVerifyOtp = async () => {
    try {
      const enteredOtp = otp.join(""); // OTP ko ek string me convert karna
      const res = await UserAPI.verifyOtp({
        device_id: selectedDeviceId,
        otp: enteredOtp,
      });

      if (res.data.success) {
        toast.success("OTP verified! Logging out...");
        await handleLogoutDevice(selectedDeviceId);
      } else {
        toast.error("Invalid OTP, please try again!");
      }
    } catch (error) {
      toast.error("OTP verification failed!");
    }
  };

  const handleLogoutDevice = async (id) => {
    try {
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

      toast.success("Device removed successfully");
      if (id == localStorage.getItem("device_id")) {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
        return;
      }
      getAllDevices();
      setShowOtpModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message || `Something went wrong, Try again later!`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="container mx-auto px-1 max-h-[100vh] overflow-auto">
      <h1 className="text-3xl font-bold uppercase mt-28 p-3">
        Logged-in Devices
      </h1>

      <div className="flex flex-nowrap overflow-x-auto pricing mt-10">
        {devices?.map((item, index) => {
          const { device_name, system_info } = item;

          const systemInfo = system_info?.split(","); // Split the system_info string by commas
          const browserName = systemInfo?.[0] || "Unknown Browser";
          const operatingSystem = systemInfo?.[1] || "Unknown OS";
          const loginDate = systemInfo?.[2] || "Unknown Date";
          const loginTime = systemInfo?.[3] || "Unknown Time";

          return (
            <div
              key={index}
              className="flex-shrink-0 min-w-[230px] px-2 max-h-[100vh] overflow-auto"
            >
              <div className="box relative flex flex-col h-full justify-start bg-white p-2 shadow-custom rounded-md border-t-4 border-b-4 border-[#7b2cbf] shadow-md shadow-[#7b2cbf]/70">
                {localStorage.getItem("device_id") == item.device_id && (
                  <span className="absolute text-sm text-green-500 font-semibold">
                    Current
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-center">Device {index + 1}</h3>
                  <ol className="mt-3 text-gray-700 space-y-1 text-sm">
                    <li>
                      <strong>Browser Name:</strong> {browserName}
                    </li>
                    <li>
                      <strong>Operating System:</strong> {operatingSystem}
                    </li>
                    <li>
                      <strong>Login Date:</strong> {loginDate}
                    </li>
                    <li>
                      <strong>Login Time:</strong> {loginTime}
                    </li>
                  </ol>
                </div>

                <div className="flex-grow"></div>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleLogoutClick(item.device_id)}
                    className="font-montserrat text-[#f7fff7] border-none rounded-lg py-1 px-3 cursor-pointer inline-flex items-center bg-[#7b2cbf]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-lg font-semibold text-gray-700">
              An OTP has been sent to your email.
            </h1>
            <p className="text-gray-600 text-sm">Please enter the OTP to verify.</p>
            <div className="flex justify-center space-x-2 mt-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  maxLength="1"
                  pattern="[0-9]*"
                  autoComplete="off"
                  className="otp-input border border-gray-400 rounded-md w-10 h-10 text-center"
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="bg-[#7b2cbf] text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              Verify
            </button>
            <button
              onClick={() => setShowOtpModal(false)}
              className="text-gray-600 mt-2 block"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
