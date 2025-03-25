import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "./Login.css";
import wish from "../../assests/image/wishi.png";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import { toast } from "react-toastify";
import * as API from "../../api/user";
import {
  browserName,
  browserVersion,
  osName,
  osVersion,
  deviceType,
} from "react-device-detect";
import Manage from "../../component/manage";
import { cls } from "react-image-crop";

const Login = () => {
  const [Username, SetUsername] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [show2fa, setShow2fa] = useState(false);
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const otpLength = 6; // Define the OTP length
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [errors, setErrors] = useState({});
  const [showNumberField, setShowNumberField] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    signIn: false,
    reset: false,
  });
  const [showResetFields, setShowResetFields] = useState(false);
  const [showSignupFields, setShowSignupFields] = useState(true);
  const [showSigninFields, setShowSigninFields] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [loginTime, setLoginTime] = useState("");
  const [loggedInDevices, setLoggedInDevices] = useState();

  const navigate = useNavigate();
  const { uidID, token } = useParams();
  const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname.includes("/reset_password")) {
  //     setShowResetFields(true);
  //     setShowSignupFields(false);
  //     setShowSigninFields(false);
  //   }
  // }, [location]);

  useEffect(() => {
    if (location.pathname.startsWith("/reset_password/")) {
      setShowResetFields(true);
      setShowSignupFields(false);
      setShowSigninFields(false);
    }
  }, [location.pathname]);
  

  useEffect(() => {
    if (uidID && token) {
      setShowResetFields(true);
      setShowSignupFields(false);
      setShowSigninFields(false);
    }
  }, [uidID, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!showNumberField) {
      setLoading(true);
      const newErrors = validateFormStep1();
      if (Object.keys(newErrors).length === 0) {
        try {
          const formData = new FormData();
          formData.append("username", Username);
          formData.append("email", email);
          formData.append("password", password);
          const systemInfo = `${browserName}, ${osName}, ${new Date().toLocaleString()}`;
          formData.append("system_info", systemInfo);
          const res = await API.register(formData);

          toast.success(res.data.message);
          setShowNumberField(true);
        } catch (error) {
          if (error.response.data?.error === "User already exists") {
            toast.error("User already exists. Please sign in.");
          } else {
            toast.error(error.response.data?.message || "Something went wrong. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      } else {
        setErrors(newErrors);
        setLoading(false);
      }
    } else if (!showOtpField) {
      const newErrors = validateFormStep2();
      if (Object.keys(newErrors).length === 0) {
        setShowOtpField(true);
      } else {
        setErrors(newErrors);
      }
    }
  };

  const validateFormStep1 = () => {
    const newErrors = {};
    const UsernamePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!Username.match(UsernamePattern)) {
      newErrors.Username = "Name must contain only letters and spaces";
    }
    if (!email.match(emailPattern)) {
      newErrors.email = "Email is not valid";
    }
    if (!password.match(passwordPattern)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character";
    }
    return newErrors;
  };
  const validateFormStep2 = () => {
    const newErrors = {};
    if (otp.some((digit) => digit === "")) {
      newErrors.otp = "Please fill out all OTP fields";
    }
    return newErrors;
  };
  // Update these functions to properly handle the toggle between sign-up and sign-in

  const handleSignUpClick = () => {
    // Set the main toggle state
    setIsSignUp(true);

    // Reset all form states
    setShowNumberField(false);
    setShowOtpField(false);
    setShow2fa(false);

    // Reset all form data
    SetUsername("");
    setEmail("");
    setPassword("");
    setOtp(new Array(6).fill(""));
    setErrors({});

    // Make sure the right forms are visible
    setShowSignupFields(true);
    setShowSigninFields(false);
    setShowResetFields(false);
  };

  const handleSignInClick = () => {
    // Set the main toggle state
    setIsSignUp(false);

    // Reset all form states
    setShowNumberField(false);
    setShowOtpField(false);
    setShow2fa(false);

    // Reset all form data
    setSignInEmail("");
    setSignInPassword("");
    setOtp(new Array(6).fill(""));
    setSignInErrors({});

    // Make sure the right forms are visible
    setShowSignupFields(false);
    setShowSigninFields(true);
    setShowResetFields(false);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();

    const newErrors = validateSignInForm();

    if (Object.keys(newErrors).length === 0) {
      setLoadingStates({ ...loadingStates, signIn: true });
      setLoading(true);

      try {
        setSignInErrors({ api: "" });
        const formData = new FormData();
        formData.append("email", signInEmail);
        formData.append("password", signInPassword);
        const systemInfo = `${browserName}, ${osName}, ${new Date().toLocaleString()}`;
        formData.append("system_info", systemInfo);
        // Perform login request
        const fromurl = localStorage.getItem("from_home");
        const res = await API.login(formData);
        if (res.data.user_id) {
          localStorage.setItem("id", res.data.user_id);
          localStorage.setItem("device_id", res.data.device_id);
          localStorage.setItem("user", signInEmail);
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);

          toast.success(res.data.message);

          if (res?.data?.redirect !== "home") {
            setShowSigninFields(false);
            setShowOtpField(false);
            setShowNumberField(true);
            setShow2fa(true);
            // Clear any previous OTP entries
            setLoading(false);
            setLoadingStates({ ...loadingStates, signIn: false });
            setOtp(new Array(6).fill(""));
          } else {
            setShow(true);
            if (fromurl) {
              navigate("/subscribe-plan");
              localStorage.removeItem("from_home");
            } else {
              navigate("/home");
            }

          }
        } else {
          toast.warning("Device limit exceeded!");
          setLoggedInDevices(res.data.logged_in_devices);
          setIsModalOpen(true);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setLoadingStates({ ...loadingStates, signIn: false });
        setLoading(false);
        setSignInErrors({
          api:
            error.response?.data?.message ||
            "Sign-in failed. Please check your credentials.",
        });
      }
    } else {
      setSignInErrors(newErrors);
    }
  };
  const validateSignInForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!signInEmail.match(emailPattern)) {
      newErrors.email = "Email is not valid";
    }
    if (!signInPassword.match(passwordPattern)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one letter, one special character and one number";
    }
    return newErrors;
  };
  const handleEmailChange = (e) => {
    setSignInEmail(e.target.value);
    if (signInErrors.email) {
      setSignInErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setSignInPassword(e.target.value);
    if (signInErrors.password) {
      setSignInErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };
  // otp
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return; // Allow only numbers

    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    // Move to the next input if a digit is entered
    if (value && index < otpLength - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", Number(otpValue));
    try {
      const response = await API.verifyOtp(formData);

      toast.success(response.data.message);
      setShow2fa(false);
      handleSignInClick();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleTwoStepVerifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join(""); // Ensure otp is an array of digits
    if (!otpValue || !signInEmail) {
      toast.error("Email and OTP are required.");
      return;
    }

    const formData = new FormData();
    formData.append("email", signInEmail);
    formData.append("otp", otpValue); // No need for Number() if it's already a string

    const systemInfo = `${browserName}, ${osName}, ${new Date().toLocaleString()}`;
    formData.append("system_info", systemInfo);

    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/2FA-otp/`,
        data: formData, // ✅ Use `data`, not `body`
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
      localStorage.setItem("id", response.data.user_id);
      localStorage.setItem("device_id", response.data.device_id);
      localStorage.setItem("user", signInEmail);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      toast.success(response.data.message);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!");
      } else {
        toast.error("Network error! Please try again.");
      }
    }
  };

  const handleResetPasswordClick = async () => {
    try {
      if (signInEmail == "") {
        toast.error("Please enter your email");
        return;
      }
      const formData = new FormData();
      formData.append("email", signInEmail);
      const response = await API.forgotPassword(formData);
      toast.success(response.data.message);
      setSignInEmail("");
    } catch (error) {
      console.log("error", error);

      error.response.status === 400
        ? toast.error(error.response.data.errors.email[0])
        : toast.error(error.message);
    }
  };
  // Resertpassword
  const handleResetPassword = async (e) => {
    setLoadingStates({ ...loadingStates, reset: true });
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("new_password1", newPassword);
      formData.append("new_password2", confirmPassword);
      const res = await API.resetPassword(uidID, token, formData);

      if (res.status === 200) {
        toast.success(
          "You have successfully reset your password, Please do login now!"
        );
        window.location.replace("/");
      }
    } catch (error) {
      error.response.status == 400
        ? toast.error("your link iş expired, please request a new one!")
        : toast.error(error.response.data.message);
      setShowResetFields(false);
      setShowSignupFields(false);
      setShowSigninFields(true);
    }
    setTimeout(() => {
      setLoadingStates({ ...loadingStates, reset: false });
    }, 2000);
  };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

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
    setOtp([
      ...pasteArray,
      ...new Array(otpLength - pasteArray.length).fill(""),
    ]);

    // Focus on the last filled input
    document
      .getElementById(`otp-input-${Math.min(pasteArray.length, otpLength) - 1}`)
      ?.focus();
  };

  return (
    <>
      <div className="container-fluid head p-0">
        <video
          autoPlay={true}
          loop
          muted
          playsInline
          controlsList="nodownload noplaybackrate nofullscreen"
          id="background-video"
        >
          <source src="https://emailbulkshoot.s3.ap-southeast-2.amazonaws.com/icon_1.mp4" />
        </video>
        <div
          className={`container sizeform ${isSignUp ? "right-panel-active" : ""
            }`}
          id="container"
        >
          {/* signup */}
          <div className="form-container sign-up-container">
            <form
              onSubmit={handleSubmit}
              className="bg-white flex flex-col items-center justify-center p-2 md:p-8"
            >
              <Link href="/">
                <img
                  src={wish}
                  alt="Description of image"
                  className=""
                  style={{ width: "100%" }}
                />
              </Link>
              {showSignupFields && !showNumberField && (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    className="block w-full mt-3 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:outline-none focus:ring-0"
                    value={Username}
                    onChange={(e) => SetUsername(e.target.value)}
                  />
                  {errors.Username && (
                    <span className="error">{errors.Username}</span>
                  )}
                  <input
                    type="email"
                    placeholder="Email"
                    className="block w-full mt-3 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:outline-none focus:ring-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                  <div className="relative w-full">
                    <input
                      placeholder="Password"
                      className="block w-full mt-3 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:outline-none focus:ring-0"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer ${errors.password ? "mb-4" : "mt-3"
                        }`}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                    </button>
                    {errors.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-[#000]  text-[14px] text-white px-4 py-2 rounded-2xl	 transition-colors duration-300 mt-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      " Sign up"
                    )}
                  </button>
                </>
              )}

              {showNumberField && !showOtpField && (
                <>
                  <div className="otp-verification-container">
                    <h1 className="otp-instruction">
                      {" "}
                      An OTP has been sent to your email.
                    </h1>
                    <p className="otpverif">Please enter the OTP to verify.</p>
                    <div className="otp-input-wrapper mt-4 flex gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          maxLength="1"
                          pattern="[0-9]*"
                          autoComplete="off"
                          className="otp-input w-12 h-12 text-center border border-black rounded"
                          type="text"
                          value={otp[index] || ""}
                          onChange={(e) => handleOtpChange(e, index)}
                          onFocus={(e) => e.target.select()}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onPaste={handlePaste}
                        />
                      ))}
                    </div>
                  </div>
                  {errors.otp && <span className="error">{errors.otp}</span>}
                  {showNumberField && (
                    <div className="flex items-center justify-between  w-full">
                      <button
                        className="bg-[#000]  text-[14px] text-white px-4 py-2 rounded-2xl	 transition-colors duration-300 mt-3"
                        type="submit"
                        onClick={handleVerifyOtp}
                      >
                        {loading ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Verify OTP"
                        )}
                      </button>
                      <button
                        type="button"
                        className="bg-[#000] text-[14px] text-white px-4 py-2 rounded-2xl transition-colors duration-300 mt-3"
                        onClick={() => {
                          setShowSignupFields(true);
                          setShowNumberField(false);
                        }}
                      >
                        Back
                      </button>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>

          {/* signin */}
          <div className="form-container sign-in-container">
            <form
              onSubmit={handleSignIn}
              className="bg-white flex flex-col items-center justify-center p-2 md:p-8"
            >
              <img
                src={wish}
                alt="Description of image"
                className=""
                style={{ width: "100%" }}
              />
              {showSigninFields && (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`block w-full mt-3 border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 focus:outline-none focus:ring-0 ${signInErrors.email ? "mb-0" : ""
                      }`}
                    value={signInEmail}
                    onChange={handleEmailChange}
                  />
                  {signInErrors.email && (
                    <div className="error mt-2">{signInErrors.email}</div>
                  )}

                  <div className="relative mt-3 w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className={`block w-full border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 pr-10 focus:outline-none focus:ring-0 ${signInErrors.password ? "mb-0" : ""
                        }`}
                      value={signInPassword}
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer ${signInErrors.password ? "mb-4" : "mt-2"
                        }`}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {signInErrors.password && (
                      <div className="error mt-2">{signInErrors.password}</div>
                    )}
                  </div>

                  {signInErrors.api && (
                    <div className="error mt-2">{signInErrors.api}</div>
                  )}

                  <div className="w-full items-center mt-3 flex flex-col md:flex-row md:justify-between">
                    <button
                      type="submit"
                      className="bg-[#000] text-[13px] text-white px-4 py-2 rounded-2xl transition-colors duration-300"
                      disabled={loading}
                    >
                      {loadingStates.signIn ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        " Sign In"
                      )}
                    </button>
                    <button
                      type="button"
                      className="bg-[#fff] text-[14px] text-black md:px-4 py-2 transition-colors duration-300"
                      disabled={loading}
                      onClick={handleResetPasswordClick}
                    >
                      Reset Password
                    </button>
                  </div>
                </>
              )}

              {showNumberField && !showOtpField && show2fa && (
                <>
                  <div className="otp-verification-container">
                    <h1 className="otp-instruction mt-3">
                      {" "}
                      An OTP has been sent to your email.
                    </h1>
                    <p className="otpverif">Please enter the OTP to verify.</p>

                    {/* <div className="otp-input-wrapper mt-4">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <input
                          key={index}
                          maxLength="1"
                          pattern="[0-9]*"
                          autoComplete="off"
                          className="otp-input"
                          type="text"
                          value={otp[index] || ""}
                          onChange={(e) => handleOtpChange(e, index)}
                          onFocus={(e) => e.target.select()}
                        />
                      ))}
                      <svg
                        viewBox="0 0 240 1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="240"
                          y2="0"
                          stroke="#3e3e3e"
                          strokeWidth="5"
                          strokeDasharray="44,22"
                        />
                      </svg>
                    </div> */}
                    <div className="otp-input-wrapper mt-4 flex gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          maxLength="1"
                          pattern="[0-9]*"
                          autoComplete="off"
                          className="otp-input w-12 h-12 text-center border border-black rounded"
                          type="text"
                          value={otp[index] || ""}
                          onChange={(e) => handleOtpChange(e, index)}
                          onFocus={(e) => e.target.select()}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onPaste={handlePaste}
                        />
                      ))}
                    </div>
                  </div>

                  {errors.otp && <span className="error">{errors.otp}</span>}
                  {showNumberField && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-3">
                      <button
                        className="bg-[#000] text-[14px] text-white px-4 py-2 rounded-2xl transition-colors duration-300 "
                        type="submit"
                        onClick={handleTwoStepVerifyOtp}
                      >
                        {loading ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Verify OTP"
                        )}
                      </button>

                      <button
                        type="button"
                        className="bg-[#000] text-[14px] text-white px-4 py-2 rounded-2xl transition-colors duration-300 "
                        onClick={() => {
                          setShowSignupFields(true);
                          setShowNumberField(false);
                        }}
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                </>
              )}
              {showResetFields && (
                <form className="w-full">
                  <div className="relative mt-3 w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      className="block w-full border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 pr-10 focus:outline-none focus:ring-0"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer mt-3"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div className="relative mt-3 w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="block w-full border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 pr-10 focus:outline-none focus:ring-0"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer mt-3"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div className="flex justify-between mt-3">
                    <button
                      onClick={handleResetPassword}
                      className="bg-[#000] text-[14px] text-white px-4 py-2 rounded-2xl transition-colors duration-300"
                      disabled={loading}
                    >
                      {loadingStates.reset ? "Verify..." : "Reset"}
                    </button>
                  </div>
                </form>
              )}
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="createaccount">Welcome Back!</h1>
                <p className="keepcon">
                  To keep connected with us please login with your personal info
                </p>

                <button className="ghost" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="createaccount">Hello, Explorer!</h1>
                <p className="keepcon">
                  Enter your personal details and start your journey with us
                </p>

                <button className="ghost" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Component */}
        {isModalOpen && loggedInDevices.length > 0 && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg md:p-8 p-0 w-full md:w-[70%] ">
              <Manage
                signInEmail={signInEmail}
                newDeviceInfo={deviceInfo}
                loggedInDevices={loggedInDevices}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
