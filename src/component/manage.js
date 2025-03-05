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
 
import { ChevronUp, LogOut } from "lucide-react";
const Manage = ({ signInEmail, newDeviceInfo, loggedInDevices }) => {
  const [devices, setDevice] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const otpLength = 6; // Define length safely
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
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

  const handleLogoutClick = async (device_id) => {
    try {
      await UserAPI.logoutOTPSend({ device_id: device_id });
      setSelectedDeviceId(device_id);
      setShowOtpModal(true);
      toast.success("OTP send to you, please verify to procced!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
  
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  

  const handleVerifyOtp = async () => {
    try {
      debugger;
      const enteredOtp = otp.join("");
      let system_info = devices.map((device) => {
        if (device.device_id == selectedDeviceId) {
          return device;
        }
      })[0]["system_info"];

      const formData = new FormData();
      formData.append("device_id", selectedDeviceId);
      formData.append("system_info", system_info);
      formData.append("otp", enteredOtp);

      const res = await UserAPI.logoutOTP(formData);
      console.log(res.data);


      if (res.data.success) {
        toast.success("OTP verified! Logging out...");
          localStorage.setItem("id", res.data.user_id);
          localStorage.setItem("device_id", res.data.device_id);
          localStorage.setItem("user", signInEmail);
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          navigate("/home");
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
console.log("Handle_Dd",res);
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

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasteData)) return; 
    const pasteArray = pasteData.slice(0, otpLength).split("");
    setOtp(pasteArray.concat(new Array(otpLength - pasteArray.length).fill(""))); 
    const lastFilledIndex = pasteArray.length - 1;
    if (lastFilledIndex >= 0) {
      document.getElementById(`otp-input-${lastFilledIndex}`).focus();
    }
  };


  return (
    <div className="container-fluid mx-auto px-4 max-h-[100vh] overflow-auto py-2">
      <h1 className="text-3xl font-bold uppercase mt-28 p-3">
        Logged-in Devices
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pricing">
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
  <div className="border border-blue-300 rounded-lg p-4 w-full max-w-md mx-auto bg-white shadow-md">
    <div className="flex items-center justify-between space-x-4">
      {/* Device Icon & Info */}
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full shadow-md">
          <img
            src="https://cdn.pixabay.com/photo/2016/04/13/14/27/google-chrome-1326908_1280.png" // Replace with actual icon path
            alt="Device Icon"
            className="w-10 h-10 object-contain"
          />
        </div>

        <div className="p-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-800">{operatingSystem}</span>
            {localStorage.getItem("device_id") == item.device_id && (
              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-md">
                Current
              </span>
            )}
          </div>
          <div className="mt-1 space-y-1">
            <p className="text-sm text-gray-600">{browserName}</p>
            <p className="text-sm text-gray-600">{item.device_name}</p>
            <p className="text-sm text-gray-600">{loginDate} at {loginTime}</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={() => handleLogoutClick(item.device_id)}
          className="p-2 rounded-full text-red-500 hover:bg-red-100 transition duration-200"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
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
            <p className="text-gray-600 text-sm">
              Please enter the OTP to verify.
            </p>
            {/* <div className="flex justify-center space-x-2 mt-4">
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
            </div> */}
         <div className="otp-input-wrapper mt-4 flex gap-2">
    {otp.map((digit, index) => (
      <input
        key={index}
        id={`otp-input-${index}`}
        maxLength="1"
        pattern="[0-9]*"
        autoComplete="off"
        className="otp-input w-12 h-12 text-center border border-gray-300 rounded"
        type="text"
        value={digit}
        onChange={(e) => handleOtpChange(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        onPaste={handlePaste} // 👈 OTP paste support added

      />
    ))}
  </div>

            <button
              onClick={handleVerifyOtp}
              className="bg-[#3B82F6] text-white font-bold py-2 px-4 rounded-md mt-4"
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
