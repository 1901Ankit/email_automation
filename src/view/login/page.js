import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF,  FaLinkedinIn } from "react-icons/fa";
import "./Login.css";
import wish from "../../image/wishi.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [showNumberField, setShowNumberField] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState({});
  const navigate = useNavigate();

  const API_URL = "http://127.0.0.1:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showNumberField) {
      const newErrors = validateFormStep1();
      if (Object.keys(newErrors).length === 0) {
        setShowNumberField(true);
      } else {
        setErrors(newErrors);
      }
    } else if (!showOtpField) {
      const newErrors = validateFormStep2();
      if (Object.keys(newErrors).length === 0) {
        setShowOtpField(true);
      } else {
        setErrors(newErrors);
      }
    } else {
      console.log("Form submitted:", { name, email, password, number, otp });
    }
  };

  const validateFormStep1 = () => {
    const newErrors = {};
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!name.match(namePattern)) {
      newErrors.name = "Name must contain only letters and spaces";
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
    const numberPattern = /^\+?[1-9]\d{1,14}$/;

    if (!number.match(numberPattern)) {
      newErrors.number = "Please enter a valid phone number with country code.";
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
        const response = await axios.post(API_URL, {
          email: signInEmail,
          password: signInPassword,
        });
        console.log("Sign In Response:", response.data);

        if (response.status === 200) {
          // Assuming login is successful
          navigate("/home");
        }
      } catch (error) {
        console.error("Sign In Error:", error.response?.data || error.message);
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
  return (
    <>
      <div className="container-fluid head">
        <video autoPlay={true} muted loop id="background-video">
          <source src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/1109514_1080p_Animation_1920x1080.mp4" />
        </video>

        <div
          className={`container sizeform ${
            isSignUp ? "right-panel-active" : ""
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

              {!showNumberField && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    className="inputfiled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}

                  <input
                    type="email"
                    placeholder="Email"
                    className="inputfiled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}

                  <input
                    placeholder="Password"
                    className="inputfiled"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}

                  <button type="submit" className="buttonsign mt-3">
                    Next Step
                  </button>
                </>
              )}

              {showNumberField && !showOtpField && (
                <>
                  <PhoneInput
                    country={"us"}
                    value={number}
                    onChange={(phone) => {
                      if (phone.length <= 12) {
                        setNumber(phone);
                      }
                    }}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    containerClass="inputfiles"
                  />
                  {errors.number && (
                    <span className="error">{errors.number}</span>
                  )}
                  <button type="submit" className="buttonsign mt-3">
                    Get OTP
                  </button>
                </>
              )}

              {showOtpField && (
                <>
                  <div className="otp-input-wrapper">
                    <input
                      maxLength="4"
                      pattern="[0-9]*"
                      autoComplete="off"
                      className="mt-2"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <svg viewBox="0 0 240 1" xmlns="http://www.w3.org/2000/svg">
                      <line
                        x1="0"
                        y1="0"
                        x2="240"
                        y2="0"
                        stroke="#3e3e3e"
                        strokeWidth="2"
                        strokeDasharray="44,22"
                      />
                    </svg>
                  </div>

                  <button type="submit" className="buttonsign mt-5">
                    Sign Up
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

              <input
                type="email"
                placeholder="Email"
                className="inputfiled"
                value={signInEmail}
                onChange={handleEmailChange}
              />
              {signInErrors.email && (
                <div className="error">{signInErrors.email}</div>
              )}

              <input
                type="password"
                placeholder="Password"
                className="inputfiled"
                value={signInPassword}
                onChange={handlePasswordChange}
              />
              {signInErrors.password && (
                <div className="error">{signInErrors.password}</div>
              )}

              {signInErrors.api && (
                <div className="error mt-2">{signInErrors.api}</div>
              )}

              <button type="submit" className="buttonsign mt-3">
                Sign In
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="createaccount">Welcome Back!</h1>
                <p className="keepcon">
                  To keep connected with us please login with your personal info
                </p>
                <div className="social-container">
                  <Link to={"#"} className="facebook">
                    <FaFacebookF className="" />
                  </Link>
                  <Link to={"#"} className="googleplus">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                      />
                      <path
                        fill="#FF3D00"
                        d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                      />
                    </svg>
                  </Link>
                  <Link to={"#"} className="linkdin">
                    <FaLinkedinIn />
                  </Link>
                </div>
                <button className="ghost" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="createaccount">Hello, Explorer!</h1>
                <p className="keepcon">
                  Enter your personal details and start your journey with us
                </p>
                <div className="social-container">
                  <Link to={"#"} className="facebook">
                    <FaFacebookF className="" />
                  </Link>
                  <Link to={"#"} className="googleplus">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                      />
                      <path
                        fill="#FF3D00"
                        d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                      />
                    </svg>
                  </Link>
                  <Link to={"#"} className="linkdin">
                    <FaLinkedinIn />
                  </Link>
                </div>
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
