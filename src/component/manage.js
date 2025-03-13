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
import { FaChrome, FaFirefox, FaEdge, FaSafari, FaOpera } from "react-icons/fa";
import { FaBrave } from "react-icons/fa6";

import { ChevronUp, LogOut } from "lucide-react";
const Manage = ({ signInEmail, newDeviceInfo, loggedInDevices }) => {
  const [devices, setDevice] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
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
      const enteredOtp = otp.join("");
      let system_info = devices.map((device) => {
        if (device.device_id == selectedDeviceId) {
          return device;
        }
      })[0]["system_info"];

      const formData = new FormData();
      formData.append("device_id", selectedDeviceId);
      // formData.append("system_info", system_info);
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
        if (localStorage.getItem("from_home")) {
          navigate("/subscribe-plan");
          localStorage.removeItem("from_home");
        } else {
          navigate("/home");
        }
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
      console.log("Handle_Dd", res);
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
  const browserIcons = {
    Chrome: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="38"
        height="38"
        viewBox="0 0 48 48"
      >
        <path
          fill="#4caf50"
          d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
        ></path>
        <path
          fill="#ffc107"
          d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"
        ></path>
        <path
          fill="#4caf50"
          d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
        ></path>
        <path
          fill="#ffc107"
          d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"
        ></path>
        <path
          fill="#f44336"
          d="M41.84,15H24v13l-3-1L7.16,13.26H7.14C10.68,7.69,16.91,4,24,4C31.8,4,38.55,8.48,41.84,15z"
        ></path>
        <path
          fill="#dd2c00"
          d="M7.158,13.264l8.843,14.862L21,27L7.158,13.264z"
        ></path>
        <path
          fill="#558b2f"
          d="M23.157,44l8.934-16.059L28,25L23.157,44z"
        ></path>
        <path fill="#f9a825" d="M41.865,15H24l-1.579,4.58L41.865,15z"></path>
        <path
          fill="#fff"
          d="M33,24c0,4.969-4.031,9-9,9s-9-4.031-9-9s4.031-9,9-9S33,19.031,33,24z"
        ></path>
        <path
          fill="#2196f3"
          d="M31,24c0,3.867-3.133,7-7,7s-7-3.133-7-7s3.133-7,7-7S31,20.133,31,24z"
        ></path>
      </svg>
    ),
    Edge: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="38"
        height="38"
        viewBox="0 0 48 48"
      >
        <path
          fill="#1e88e5"
          d="M40.69,35.42c-9.15,11.88-21.41,8.8-26.23,6.1 c-7.35-4.11-12.5-13.68-9.44-23.25c0.9-2.82,2.27-5.23,3.98-7.23c1.67,0.13,3.65,0.13,6-0.04c14-1,18,11,17,14 c-0.51,1.53-2.32,2.02-3.97,2.13c0.16-0.22,0.36-0.54,0.64-1.02c0.87-1.54,0.98-4.49-1.73-6.27c-2.61-1.7-5.43-0.65-6.88,1.28 c-1.45,1.92-0.88,4.81-0.37,6.09c2.2,5.52,6.26,6.95,9.02,7.78c2.76,0.83,6.86,0.71,9.05-0.19c2.18-0.91,2.8-1.43,3.22-0.97 C41.41,34.29,41.11,34.82,40.69,35.42z"
        ></path>
        <path
          fill="#0d47a1"
          d="M40.732,35.42c-3.48,4.52-7.41,6.87-11.21,7.91 c-0.03,0.01-0.06,0.01-0.08,0.02c-2.2,0.42-3.95,0.08-5.85-0.29c-3.09-0.6-7.35-4.01-8.38-10.18c-0.88-5.31,1.63-9.81,5.59-12.54 c-0.26,0.24-0.49,0.5-0.7,0.78c-1.45,1.92-0.88,4.81-0.37,6.09c2.2,5.52,6.26,6.95,9.02,7.78c2.76,0.83,6.86,0.71,9.05-0.19 c2.18-0.91,2.8-1.43,3.22-0.97C41.452,34.29,41.152,34.82,40.732,35.42z"
        ></path>
        <path
          fill="#00e5ff"
          d="M26.94,4.25c0.02,0.26,0.03,0.54,0.03,0.81c0,3.78-1.75,7.14-4.48,9.32 c-1.02-0.52-2.21-0.94-3.65-1.22c-4.07-0.78-10.63,1.1-13.3,5.77c-0.88,1.53-1.25,3.1-1.41,4.55c0.04-1.71,0.33-3.46,0.89-5.21 C8.31,8.01,17.86,3.05,26.94,4.25z"
        ></path>
        <path
          fill="#00e676"
          d="M41.4,27.89c-2.76,2.78-6.27,2.86-8.67,2.73 c-2.41-0.12-3.59-0.82-4.69-1.5c-1.11-0.69-0.48-1.37-0.37-1.52c0.11-0.15,0.38-0.41,1-1.49c0.29-0.51,0.5-1.18,0.54-1.91 c4.62-3.43,7.96-8.49,9.16-14.34c2.92,2.95,4.3,6.21,4.79,7.61C44.04,19.99,44.71,24.56,41.4,27.89z"
        ></path>
        <path
          fill="#1de9b6"
          d="M38.37,9.85v0.01c-1.2,5.85-4.54,10.91-9.16,14.34c0.03-0.42,0-0.87-0.1-1.32 c0-0.02-0.01-0.04-0.01-0.05c-0.25-1.47-0.99-3.33-2.22-4.77c-1.22-1.44-2.52-2.73-4.39-3.68c2.73-2.18,4.48-5.54,4.48-9.32 c0-0.27-0.01-0.55-0.03-0.81c0.4,0.05,0.79,0.11,1.19,0.19C32.74,5.33,36.04,7.49,38.37,9.85z"
        ></path>
      </svg>
    ),
    Safari: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="38"
        height="38"
        viewBox="0 0 48 48"
      >
        <path
          fill="#cfd8dc"
          d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
        ></path>
        <path
          fill="#448aff"
          d="M41,24c0,9.391-7.609,17-17,17S7,33.391,7,24S14.609,7,24,7S41,14.609,41,24z"
        ></path>
        <path
          fill="#ff3d00"
          d="M21.898,21.898l4.203,4.203l9.199-13.402L21.898,21.898z"
        ></path>
        <path
          fill="#bf360c"
          d="M24,24l11.301-11.301l-9.199,13.402L24,24z"
        ></path>
        <path
          fill="#fff"
          d="M21.898,21.898l-9.199,13.402l13.402-9.199L21.898,21.898z"
        ></path>
        <path
          fill="#bdbdbd"
          d="M24,24L12.699,35.301l13.402-9.199L24,24z"
        ></path>
        <path
          fill="#bbdefb"
          d="M17.102,10.699c0.598-0.301,1.199-0.598,1.797-0.801l1.203,2.703l-1.801,0.797L17.102,10.699z M36,25h2.898c0-0.301,0.102-0.699,0.102-1s0-0.699-0.102-1H36V25z M12.699,14.102l2.102,2.098l1.398-1.398l-2.098-2.102C13.602,13.199,13.199,13.602,12.699,14.102z M25,9.102C24.699,9,24.301,9,24,9s-0.699,0-1,0.102V12h2V9.102z M30.398,10.5c-0.598-0.301-1.199-0.5-1.898-0.699l-1.102,2.801l1.902,0.699L30.398,10.5z M12.5,20.5l0.699-1.898L10.5,17.5c-0.301,0.602-0.5,1.199-0.699,1.898L12.5,20.5z M12,23H9.102C9,23.301,9,23.699,9,24s0,0.699,0.102,1H12V23z M35.5,27.5l-0.699,1.898L37.5,30.5c0.301-0.602,0.5-1.199,0.699-1.898L35.5,27.5z M38.102,18.898c-0.203-0.598-0.5-1.199-0.801-1.797l-2.699,1.199l0.797,1.801L38.102,18.898z M35.301,33.898l-2.102-2.098l-1.398,1.398l2.098,2.102C34.398,34.801,34.801,34.398,35.301,33.898z M13.398,29.699l-0.797-1.801l-2.703,1.203c0.203,0.598,0.5,1.199,0.801,1.797L13.398,29.699z M29.699,34.602l-1.801,0.797l1.203,2.703c0.598-0.203,1.199-0.5,1.797-0.801L29.699,34.602z M20.5,35.5l-1.898-0.699L17.5,37.5c0.602,0.301,1.199,0.5,1.898,0.699L20.5,35.5z M25,38.898V36h-2v2.898c0.301,0,0.699,0.102,1,0.102S24.699,39,25,38.898z"
        ></path>
      </svg>
    ),
    Opera: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="38"
        height="38"
        viewBox="0 0 48 48"
      >
        <linearGradient
          id="hfKXkbqna8MdQfFQjwgvwa_kvKGyuXKveWM_gr1"
          x1="24"
          x2="24"
          y1="43.978"
          y2="3.691"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#b31523"></stop>
          <stop offset=".492" stop-color="#e52030"></stop>
          <stop offset="1" stop-color="#ee3d4a"></stop>
        </linearGradient>
        <path
          fill="url(#hfKXkbqna8MdQfFQjwgvwa_kvKGyuXKveWM_gr1)"
          d="M24,6C14.052,6,6,14.052,6,24s8.052,18,18,18s18-8.052,18-18S33.948,6,24,6z M24,37.5	c-4.737,0-9-6.206-9-13.5s4.263-13.5,9-13.5s9,6.206,9,13.5S28.737,37.5,24,37.5z"
        ></path>
        <linearGradient
          id="hfKXkbqna8MdQfFQjwgvwb_kvKGyuXKveWM_gr2"
          x1="30.794"
          x2="30.794"
          y1="5.435"
          y2="55.952"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#b31523"></stop>
          <stop offset=".492" stop-color="#e52030"></stop>
          <stop offset="1" stop-color="#ee3d4a"></stop>
        </linearGradient>
        <path
          fill="url(#hfKXkbqna8MdQfFQjwgvwb_kvKGyuXKveWM_gr2)"
          d="M35.308,10c-1.936-1.326-4.207-2.2-6.571-2.2c-3.553,0-6.772,1.782-9.149,4.571	C20.916,11.193,22.429,10.5,24,10.5c4.737,0,9,6.206,9,13.5s-4.263,13.5-9,13.5c-1.571,0-3.084-0.693-4.413-1.871	c2.378,2.789,5.596,4.571,9.149,4.571c2.363,0,4.635-0.875,6.57-2.2C39.387,34.702,42,29.661,42,24	C42,18.34,39.387,13.299,35.308,10z"
        ></path>
      </svg>
    ),
    Brave: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="38"
        height="38"
        viewBox="0 0 48 48"
      >
        <path
          fill="#ff651f"
          d="M41,13l1,4l-4.09,16.35c-0.59,2.35-2.01,4.41-4.01,5.79l-8.19,5.68c-0.51,0.36-1.11,0.53-1.71,0.53	c-0.6,0-1.2-0.17-1.71-0.53l-8.19-5.68c-2-1.38-3.42-3.44-4.01-5.79L6,17l1-4l-1-2l3.25-3.25c1.05-1.05,2.6-1.44,4.02-0.99	c0.04,0.01,0.07,0.02,0.1,0.03L14,7l4-4h12l4,4l0.65-0.22c0.83-0.28,1.7-0.27,2.5,0c0.58,0.19,1.13,0.51,1.58,0.95	c0.01,0.01,0.01,0.01,0.02,0.02L42,11L41,13z"
        ></path>
        <path
          fill="#f4592b"
          d="M38.73,7.73L33,11l-9,2l-9-3l-2.07-2.07c-0.56-0.56-1.41-0.74-2.15-0.44L8.67,8.33l0.58-0.58	c1.05-1.05,2.6-1.44,4.02-0.99c0.04,0.01,0.07,0.02,0.1,0.03L14,7l4-4h12l4,4l0.65-0.22c0.83-0.28,1.7-0.27,2.5,0	C37.73,6.97,38.28,7.29,38.73,7.73z"
        ></path>
        <path
          fill="#fff"
          d="M32.51,23.49c-0.3,0.3-0.38,0.77-0.19,1.15l0.34,0.68c0.22,0.45,0.34,0.94,0.34,1.44	c0,0.8-0.29,1.57-0.83,2.16l-0.66,0.74c-0.32,0.21-0.72,0.23-1.04,0.05l-5.23-2.88c-0.59-0.4-0.6-1.27-0.01-1.66l3.91-2.66	c0.48-0.28,0.63-0.89,0.35-1.37l-1.9-3.16C27.28,17.46,27.45,17.24,28,17l6-3h-5l-3,0.75c-0.55,0.14-0.87,0.7-0.72,1.24l1.46,5.09	c0.14,0.51-0.14,1.05-0.65,1.22l-1.47,0.49c-0.21,0.07-0.41,0.11-0.62,0.11c-0.21,0-0.42-0.04-0.63-0.11l-1.46-0.49	c-0.51-0.17-0.79-0.71-0.65-1.22l1.46-5.09c0.15-0.54-0.17-1.1-0.72-1.24L19,14h-5l6,3c0.55,0.24,0.72,0.46,0.41,0.98l-1.9,3.16	c-0.28,0.48-0.13,1.09,0.35,1.37l3.91,2.66c0.59,0.39,0.58,1.26-0.01,1.66l-5.23,2.88c-0.32,0.18-0.72,0.16-1.04-0.05l-0.66-0.74	C15.29,28.33,15,27.56,15,26.76c0-0.5,0.12-0.99,0.34-1.44l0.34-0.68c0.19-0.38,0.11-0.85-0.19-1.15l-4.09-4.83	c-0.83-0.99-0.94-2.41-0.26-3.51l3.4-5.54c0.27-0.36,0.75-0.49,1.17-0.33l2.62,1.05c0.48,0.19,0.99,0.29,1.49,0.29	c0.61,0,1.23-0.14,1.79-0.42c0.75-0.38,1.57-0.57,2.39-0.57s1.64,0.19,2.39,0.57c1.03,0.51,2.22,0.56,3.28,0.13l2.62-1.05	c0.42-0.16,0.9-0.03,1.17,0.33l3.4,5.54c0.68,1.1,0.57,2.52-0.26,3.51L32.51,23.49z"
        ></path>
        <path
          fill="#fff"
          d="M29.51,32.49l-4.8,3.8c-0.19,0.19-0.45,0.29-0.71,0.29s-0.52-0.1-0.71-0.29l-4.8-3.8	c-0.24-0.24-0.17-0.65,0.13-0.8l4.93-2.47c0.14-0.07,0.29-0.1,0.45-0.1s0.31,0.03,0.45,0.1l4.93,2.47	C29.68,31.84,29.75,32.25,29.51,32.49z"
        ></path>
        <path
          fill="#ed4d01"
          d="M41,13l1,4l-4.09,16.35c-0.59,2.35-2.01,4.41-4.01,5.79l-8.19,5.68c-0.51,0.36-1.11,0.53-1.71,0.53	V10.36L25,12h7v-2l5.15-3.22c0.59,0.19,1.15,0.52,1.6,0.97L42,11L41,13z"
        ></path>
        <path
          fill="#f5f5f5"
          d="M32.51,23.49c-0.3,0.3-0.38,0.77-0.19,1.15l0.34,0.68c0.22,0.45,0.34,0.94,0.34,1.44	c0,0.8-0.29,1.57-0.83,2.16l-0.66,0.74c-0.32,0.21-0.72,0.23-1.04,0.05l-5.23-2.88c-0.59-0.4-0.6-1.27-0.01-1.66l3.91-2.66	c0.48-0.28,0.63-0.89,0.35-1.37l-1.9-3.16C27.28,17.46,27.45,17.24,28,17l6-3h-5l-3,0.75c-0.55,0.14-0.87,0.7-0.72,1.24l1.46,5.09	c0.14,0.51-0.14,1.05-0.65,1.22l-1.47,0.49c-0.21,0.07-0.41,0.11-0.62,0.11V9.63c0.82,0,1.64,0.19,2.39,0.57	c1.03,0.51,2.22,0.56,3.28,0.13l2.62-1.05c0.42-0.16,0.9-0.03,1.17,0.33l3.4,5.54c0.68,1.1,0.57,2.52-0.26,3.51L32.51,23.49z"
        ></path>
        <path
          fill="#f5f5f5"
          d="M29.51,32.49l-4.8,3.8c-0.19,0.19-0.45,0.29-0.71,0.29v-7.46c0.16,0,0.31,0.03,0.45,0.1l4.93,2.47	C29.68,31.84,29.75,32.25,29.51,32.49z"
        ></path>
      </svg>
    ),
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
    setOtp(
      pasteArray.concat(new Array(otpLength - pasteArray.length).fill(""))
    );
    const lastFilledIndex = pasteArray.length - 1;
    if (lastFilledIndex >= 0) {
      document.getElementById(`otp-input-${lastFilledIndex}`).focus();
    }
  };

  return (
    <div className="container mx-auto px-4 max-h-[100vh] overflow-auto py-2">
      <h1 className="text-3xl font-bold uppercase  p-3 mt-24">
        Logged-in Devices
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pricing">
        {devices?.map((item, index) => {
          const { device_name, system_info } = item;

          const systemInfo = system_info?.split(",");
          const browserName = systemInfo?.[0] || "Unknown Browser";
          const operatingSystem = systemInfo?.[1] || "Unknown OS";
          const loginDate = systemInfo?.[2] || "Unknown Date";
          const loginTime = systemInfo?.[3] || "Unknown Time";

          return (
            <div
              key={index}
              className="flex-shrink-0 min-w-[230px] px-2 max-h-[100vh] overflow-auto"
            >
              <div className="box flex flex-col justify-between h-full bg-white  shadow-custom rounded-md border-t-8 border-b-8 border-[#3B82F6] shadow-md shadow-[#3B82F6]/90">
                <div className="flex items-center justify-between space-x-4">
                  {/* Device Icon & Info */}
                  <div className="flex items-center space-x-3">
                    <div className="p-2">
                      <div className="flex items-center space-x-2">
                        {browserIcons[browserName] && browserIcons[browserName]}
                        <span className="text-sm text-gray-600 font-bold">
                          {browserName}
                        </span>
                        {localStorage.getItem("device_id") ==
                          item.device_id && (
                          <span className=" text-green-500 text-sm font-bold px-2 py-0.5 rounded-md">
                            Current
                          </span>
                        )}
                      </div>

                      <ol className="mt-3 text-gray-700 space-y-1 text-sm ">
                        <li className="text-sm text-gray-600 font-bold">
                          Browser Name:{" "}
                          <span className="font-medium">{browserName}</span>
                        </li>
                        <li className="text-sm text-gray-600 font-bold">
                          Operating System:{" "}
                          <span className="font-medium">{operatingSystem}</span>
                        </li>
                        <li className="text-sm text-gray-600 font-bold">
                          Login Date:{" "}
                          <span className="font-medium">{loginDate}</span>
                        </li>
                        <li className="text-sm text-gray-600 font-bold">
                          Login Time:{" "}
                          <span className="font-medium">{loginTime}</span>
                        </li>
                      </ol>
                    </div>
                    {/* Logout Button */}
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => handleLogoutClick(item.device_id)}
                    className="border border-blue-500 rounded-lg p-2 font-semibold flex items-center justify-center
                  cursor-pointer bg-[#3A81F4] text-white  mb-2"
                  >
                    Logout Device
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
