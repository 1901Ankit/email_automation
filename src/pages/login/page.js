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

const Login = () => {
  const [Username, SetUsername] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState({});
  const [showNumberField, setShowNumberField] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResetFields, setShowResetFields] = useState(false);
  const [showSignupFields, setShowSignupFields] = useState(true);
  const [showSigninFields, setShowSigninFields] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // const [first, setfirst] = useState(second)

  const navigate = useNavigate();

  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const uidID = pathParts[2];
  const token = pathParts[3];

  useEffect(() => {
    if (location.pathname.includes("/reset_password")) {
      setShowResetFields(true);
      setShowSignupFields(false);
      setShowSigninFields(false);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showNumberField) {
      setLoading(true);
      const newErrors = validateFormStep1();
      if (Object.keys(newErrors).length === 0) {
        const formData = new FormData();
        formData.append("username", Username);
        formData.append("email", email);
        formData.append("password", password);
        const res = await API.register(formData);
        toast.success(res.data.message);

        setShowNumberField(true);
      } else {
        setErrors(newErrors);
      }
      setLoading(false);
    } else if (!showOtpField) {
      const newErrors = validateFormStep2();
      if (Object.keys(newErrors).length === 0) {
        setShowOtpField(true);
      } else {
        setErrors(newErrors);
      }
    } else {
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

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const newErrors = validateSignInForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("email", signInEmail);
        formData.append("password", signInPassword);
        const res = await API.login(formData);
        sessionStorage.setItem("id", res.data.user_id);
        sessionStorage.setItem("access_token", res.data.access);
        sessionStorage.setItem("refresh_token", res.data.refresh);
        toast.success(res.data.message);
        setShow(true);
        navigate("/home");
      } catch (error) {
        console.log(error);

        toast.error(error.response.data.message);

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
        "Password must be at least 8 characters long and contain at least one letter and one number";
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
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);
    if (value && index < otp.length - 1) {
      const nextInput = document.querySelector(
        `.otp-input:nth-of-type(${index + 2})`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (!value && index > 0) {
      const prevInput = document.querySelector(
        `.otp-input:nth-of-type(${index})`
      );
      if (prevInput) {
        prevInput.focus();
      }
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
      handleSignInClick();
    } catch (error) {
      console.error(
        "Verification Error:",
        error.response ? error.response.data : error.message
      );
      toast.error(error.response.data.message);
    }
  };

  const handleResetPasswordClick = async () => {
    try {
      const formData = new FormData();
      formData.append("email", signInEmail);
      const response = await API.forgotPassword(formData);
      toast.success(response.data.message);
    } catch (error) {
      error.response.status === 400 ? toast.error(error.response.data.errors.email[0]) : toast.error(error.message);
    }

    // setShowResetFields(true);
    // setShowSignupFields(false);
    // setShowSigninFields(false);
  };

  // Resertpassword
  const handleResetPassword = async (e) => {
    e.preventDefault();
    // if (newPassword !== confirmPassword) {
    //   toast.error("Passwords do not match!");
    //   return;
    // }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("new_password1", newPassword);
      formData.append("new_password2", confirmPassword);
      const res = await API.resetPassword(formData);

      if (res.status === 200) {
        toast.success("You have successfully reset your password, Please do login now!");
        setShowResetFields(false);
        setShowSignupFields(false);
        setShowSigninFields(true);
      }
    } catch (error) {
      error.response.status == 400 ? toast.error("your link iş expired, please request a new one!") : toast.error(error.response.data.message)
      setShowResetFields(false);
      setShowSignupFields(false);
      setShowSigninFields(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid head">
        <video autoPlay={true} muted loop id="background-video">
          <source src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/1109514_1080p_Animation_1920x1080.mp4" />
        </video>

        <div
          className={`container sizeform ${isSignUp ? "right-panel-active" : ""
            }`}
          id="container"
        >
          {/* signup */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit}>
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
                  <div className="relative">
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
                    {loading ? <div role="status">
                      <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div> : " Sign up"}
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

                    <div className="otp-input-wrapper mt-4">
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
                    </div>
                  </div>
                  {errors.otp && <span className="error">{errors.otp}</span>}
                  <button
                    className="bg-[#000]  text-[14px] text-white px-4 py-2 rounded-2xl	 transition-colors duration-300 mt-3"
                    type="submit"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </form>
          </div>

          {/* signin */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignIn}>
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

                  <div className="relative mt-3">
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

                  <div className="flex justify-between mt-3">
                    <button
                      type="submit"
                      className="bg-[#000] text-[14px] text-white px-4 py-2 rounded-2xl transition-colors duration-300"
                      disabled={loading}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className="bg-[#fff] text-[14px] text-black px-4 py-2 transition-colors duration-300"
                      disabled={loading}
                      onClick={handleResetPasswordClick}
                    >
                      Reset Password
                    </button>
                  </div>
                </>
              )}

              {showResetFields && (
                <form >
                  <div className="relative mt-3">
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

                  <div className="relative mt-3">
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
                      {loading ? "Resetting..." : "Reset Password"}
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
      </div>
    </>
  );
};

export default Login;
